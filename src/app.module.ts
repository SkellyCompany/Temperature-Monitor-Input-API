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
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // MONGODB
    MongooseModule.forRoot(
      'mongodb+srv://skelly:SKELLYskelly11!@cluster0.vr2pa.mongodb.net/TemperatureMonitor?retryWrites=true&w=majority'
    ),
    MongooseModule.forFeature(
      [
        { name: TemperatureRecord.name, schema: TemperatureRecordSchema },
        { name: HumidityRecord.name, schema: HumidityRecordSchema }
      ]
    ),

    // HiveMQ
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: 'mqtts://c858b836a97a4d2ca9327bfa2eb51fb6.s1.eu.hivemq.cloud',
          port: 8883,
          username: 'skelly',
          password: 'SKELLYskelly11!'
        },
      },
    ]),
  ],
  controllers: [AppController, TemperatureController, HumidityController],
  providers: [AppService, TemperatureService, HumidityService],
})
export class AppModule { }
