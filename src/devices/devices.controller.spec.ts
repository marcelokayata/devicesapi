import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Device } from '../schemas/Devices.schema';

describe('DevicesController', () => {
  let devicesController: DevicesController;
  let devicesService: DevicesService;

  const mockDevice = {
    _id: '1',
    name: 'Device 1',
    brand: 'Brand A',
    state: 'available',
    creation_time: new Date(),
  };

  const mockDevicesService = {
    findAll: jest.fn().mockResolvedValue([mockDevice]),
    findOne: jest.fn().mockResolvedValue(mockDevice),
    create: jest.fn().mockResolvedValue(mockDevice),
    update: jest.fn().mockResolvedValue({ ...mockDevice, name: 'Updated Device' }),
    remove: jest.fn().mockResolvedValue(mockDevice),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        {
          provide: DevicesService,
          useValue: mockDevicesService,
        },
      ],
    }).compile();

    devicesController = module.get<DevicesController>(DevicesController);
    devicesService = module.get<DevicesService>(DevicesService);
  });

  it('should be defined', () => {
    expect(devicesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of devices', async () => {
      const result = await devicesController.findAll();
      expect(result).toEqual([mockDevice]);
      expect(devicesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single device', async () => {
      const result = await devicesController.findOne('1');
      expect(result).toEqual(mockDevice);
      expect(devicesService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new device', async () => {
      const createDeviceDto = { name: 'Device 1', brand: 'Brand A', state: 'available' };
      const result = await devicesController.create(createDeviceDto);
      expect(result).toEqual(mockDevice);
      expect(devicesService.create).toHaveBeenCalledWith(createDeviceDto);
    });
  });

  describe('update', () => {
    it('should update a device', async () => {
      const updateDeviceDto = { name: 'Updated Device' };
      const result = await devicesController.update('1', updateDeviceDto);
      expect(result).toEqual({ ...mockDevice, name: 'Updated Device' });
      expect(devicesService.update).toHaveBeenCalledWith('1', updateDeviceDto);
    });
  });

  describe('remove', () => {
    it('should remove a device', async () => {
      const result = await devicesController.remove('1');
      expect(result).toEqual(mockDevice);
      expect(devicesService.remove).toHaveBeenCalledWith('1');
    });
  });
});