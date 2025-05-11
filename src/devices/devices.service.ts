import { HttpException, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from 'src/schemas/Devices.schema';
import { Model } from 'mongoose';

@Injectable()
export class DevicesService {
  constructor(@InjectModel(Device.name) private deviceModel:Model<Device>) {}
  create(createDeviceDto: CreateDeviceDto) {
    const newDevice = new this.deviceModel(createDeviceDto);
    return newDevice.save();
  }

  findAll() {
    return this.deviceModel.find();
  }

  async findOne(id: string) {
    const device = await this.deviceModel.findById(id).exec();
    if (device) return device;
    return new HttpException('Device not found', 404);
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto);
  }

  remove(id: string) {
    return this.deviceModel.findByIdAndDelete(id);
  }
}
