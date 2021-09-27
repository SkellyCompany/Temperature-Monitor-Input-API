import { HumidityRecordDTO } from '../../domain/dtos/humidity-record.dto';
import { HumidityRecord, HumidityRecordDocument } from '../../domain/schemas/humidity-record.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientMqtt } from '@nestjs/microservices';

@Injectable()
export class HumidityService {
	constructor(
		@Inject('MQTT_CLIENT') private client: ClientMqtt,
		@InjectModel(HumidityRecord.name) private humidityRecordModel: Model<HumidityRecordDocument>
	) { }

	insertRecord(humidityRecordDto: HumidityRecordDTO): Promise<HumidityRecord> {
		const createdHumidityRecord = new this.humidityRecordModel(humidityRecordDto);
		this.client.emit('humidity/newInsert', JSON.stringify(createdHumidityRecord));
		return createdHumidityRecord.save()
	}
}
