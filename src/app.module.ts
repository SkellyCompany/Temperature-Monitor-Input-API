import { HumidityService } from './infrastructure/services/humidity.service';
import { TemperatureService } from './infrastructure/services/temperature.service';
import { HumidityRecord, HumidityRecordSchema } from './domain/schemas/humidity-record.schema';
import { TemperatureRecord, TemperatureRecordSchema } from './domain/schemas/temperature-record.schema';
import { Module } from '@nestjs/common';
import { AppController } from './entry/http/app.controller';
import { AppService } from './infrastructure/services/app.service';
import { TemperatureController } from './entry/http/temperature.controller';
import { HumidityController } from './entry/http/humidity.controller';
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
