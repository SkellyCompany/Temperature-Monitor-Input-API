import { TemperatureRecordDTO } from '../../domain/dtos/temperature-record.dto';
import { TemperatureRecord, TemperatureRecordDocument } from '../../domain/schemas/temperature-record.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientMqtt } from '@nestjs/microservices';

@Injectable()
export class TemperatureService {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		@InjectModel(TemperatureRecord.name) private temperatureRecordModel: Model<TemperatureRecordDocument>
	) { }

	insertRecord(temperatureRecordDto: TemperatureRecordDTO): Promise<TemperatureRecord> {
		const createdTemperatureRecord = new this.temperatureRecordModel(temperatureRecordDto);
		this.client.emit('temperature/newInsert', JSON.stringify(createdTemperatureRecord));
		return createdTemperatureRecord.save()
	}
}
