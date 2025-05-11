import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceDto } from './create-device.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {
    @IsNotEmpty()
    @IsString()
    name?: string

    @IsNotEmpty()
    @IsString()
    brand?: string

    @IsNotEmpty()
    @IsString()
    state?: string
}
