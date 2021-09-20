import { HumidityService } from './services/humidity/humidity.service';
import { TemperatureService } from './services/temperature/temperature.service';
import { HumidityRecord, HumidityRecordSchema } from './schemas/humidity-record.schema';
import { TemperatureRecord, TemperatureRecordSchema } from './schemas/temperature-record.schema';
import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { TemperatureController } from './controllers/temperature/temperature.controller';
import { HumidityController } from './controllers/humidity/humidity.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://skelly:SKELLYskelly11!@cluster0.vr2pa.mongodb.net/TemperatureMonitor?retryWrites=true&w=majority'
    ),
    MongooseModule.forFeature(
      [
        { name: TemperatureRecord.name, schema: TemperatureRecordSchema },
        { name: HumidityRecord.name, schema: HumidityRecordSchema }
      ])],
  controllers: [AppController, TemperatureController, HumidityController],
  providers: [AppService, TemperatureService, HumidityService],
})
export class AppModule { }
