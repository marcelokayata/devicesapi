import { HttpException, Injectable, BadRequestException } from '@nestjs/common';
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
    throw new HttpException('Device not found', 404);
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.deviceModel.findById(id).exec();

    if (!device) {
      throw new BadRequestException('Device not found');
    }

    if (device.state === 'in-use') {
      if (updateDeviceDto.name || updateDeviceDto.brand) {
        throw new BadRequestException(
          'Cannot update name or brand while the device is in use',
        );
      }
    }

    return this.deviceModel.findByIdAndUpdate(id, updateDeviceDto, {
      new: true,
    });
  }

  async remove(id: string) {
    const device = await this.deviceModel.findById(id).exec();

    if (!device) {
      throw new HttpException('Device not found', 404);
    }

    if (device.state === 'in-use') {
      throw new BadRequestException('Cannot delete a device that is in use');
    }

    return this.deviceModel.findByIdAndDelete(id);
  }
}
