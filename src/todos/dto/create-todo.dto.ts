import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoDto {

    @IsString()
     @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
