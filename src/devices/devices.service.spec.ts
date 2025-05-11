import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from './devices.service';
import { getModelToken } from '@nestjs/mongoose';
import { Device } from '../schemas/Devices.schema';
import { BadRequestException, HttpException } from '@nestjs/common';

describe('DevicesService', () => {
  let service: DevicesService;
  let mockDeviceModel: any;

  const mockDevice = {
    _id: '1',
    name: 'Device 1',
    brand: 'Brand A',
    state: 'available',
    creation_time: new Date(),
  };

  const mockDeviceModelMethods = {
    save: jest.fn().mockResolvedValue(mockDevice),
    find: jest.fn().mockResolvedValue([mockDevice]),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockDevice), // Mock exec() for findById
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({ ...mockDevice, name: 'Updated Device' }),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockDevice),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: getModelToken(Device.name),
          useValue: {
            find: mockDeviceModelMethods.find,
            findById: mockDeviceModelMethods.findById,
            findByIdAndUpdate: mockDeviceModelMethods.findByIdAndUpdate,
            findByIdAndDelete: mockDeviceModelMethods.findByIdAndDelete,
            save: jest.fn().mockImplementation(() => mockDeviceModelMethods.save()),
          },
        },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    mockDeviceModel = module.get(getModelToken(Device.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a single device if found', async () => {
      const result = await service.findOne('1');
      expect(mockDeviceModel.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockDevice);
    });

    it('should throw an HttpException if device is not found', async () => {
      mockDeviceModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null), // Mock exec() to return null
      });
      await expect(service.findOne('1')).rejects.toThrow(HttpException);
    });
  });

  describe('findAll', () => {
    it('should return an array of devices', async () => {
      const result = await service.findAll();
      expect(mockDeviceModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockDevice]);
    });
  });

  describe('update', () => {
    it('should update a device if not in use', async () => {
      const updateDeviceDto = { name: 'Updated Device' };
      const result = await service.update('1', updateDeviceDto);
      expect(mockDeviceModel.findById).toHaveBeenCalledWith('1');
      expect(mockDeviceModel.findByIdAndUpdate).toHaveBeenCalledWith('1', updateDeviceDto, { new: true });
      expect(result).toEqual({ ...mockDevice, name: 'Updated Device' });
    });

    it('should throw BadRequestException if device is in use and name or brand is updated', async () => {
      mockDeviceModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue({ ...mockDevice, state: 'in-use' }),
      });
      const updateDeviceDto = { name: 'Updated Device' };
      await expect(service.update('1', updateDeviceDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a device if not in use', async () => {
      const result = await service.remove('1');
      expect(mockDeviceModel.findById).toHaveBeenCalledWith('1');
      expect(mockDeviceModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockDevice);
    });

    it('should throw an HttpException if device is not found', async () => {
    mockDeviceModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null), // Mock exec() to return null
    });
    await expect(service.findOne('1')).rejects.toThrow(HttpException);
  });
  });
});