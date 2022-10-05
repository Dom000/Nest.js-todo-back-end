import { Transform } from "class-transformer";
import { IsEmail,IsNotEmpty,IsNumberString,IsString } from "class-validator";

export default class SignupDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    // @IsNumberString()
    @Transform(({ value }) => String(value))
    password:  string;

    @IsNotEmpty()
    @IsString()
    name: string;
}