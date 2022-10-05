import { JwtService } from "@nestjs/jwt";
import { ForbiddenException, forwardRef, Inject, Injectable, ParseFloatPipe } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { SignupDto, LoginDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { config } from "process";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
    async signin(dto: LoginDto) {

        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email,
                },
            });

            if (!user) {
                return new ForbiddenException("invalid email address");
            }

            const isValid = await argon.verify(user.password, dto.password);

            if (!isValid) {
                return new ForbiddenException("invalid password");
            }

            // delete user.password;
            return this.generateToken(user.id, user.email);
        } catch (error) {
            throw error.message;
        }

    }

    async signup(dto: SignupDto) {
        try {

            const hashedPassword = await argon.hash(dto.password);
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword,

                },

            });
            // delete user.password;
            return this.generateToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("email already exists");
                }
            } else {
                throw new Error("something went wrong");
            }
        }
    }

    async generateToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email: email,
        };

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "60m",
            secret: this.config.get("JWT_SECRET"),
        });

        return {
            access_token: token,
        }
    }

}