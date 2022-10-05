import { Global, Module } from "@nestjs/common";
// import { PrismaModule } from "../prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
// import { forwardRef } from "@nestjs/common";
import { JwtStrategy } from "./strategy";
// @Global()
@Module({ 
    imports:[JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy],
    exports: [JwtModule],
})
export class AuthModule {}