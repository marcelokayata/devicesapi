import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { Device, DeviceSchema } from 'src/schemas/Devices.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
      { name: Device.name, schema: DeviceSchema } ]),],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
