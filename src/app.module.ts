import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DevicesModule } from './devices/devices.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/crud-mongo"),
    UsersModule,
    DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
