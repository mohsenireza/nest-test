import { IsString, IsNotEmpty } from 'class-validator';

export class registerDto{
    @IsString()
    @IsNotEmpty()
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}