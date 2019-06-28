import { IsString, IsNumber } from 'class-validator';

export class CreateItemDto{
    @IsString()
    readonly name: string;
    @IsString()
    readonly description: string;
    @IsNumber()
    readonly qty: number;
}