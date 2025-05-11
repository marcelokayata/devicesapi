import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    brand: string

    @IsNotEmpty()
    @IsString()
    state: string
}
