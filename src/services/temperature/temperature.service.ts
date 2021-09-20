import { TemperatureRecordDTO } from './../../dtos/temperature-record.dto';
import { TemperatureRecord, TemperatureRecordDocument } from './../../schemas/temperature-record.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TemperatureService {
	constructor(
		@InjectModel(TemperatureRecord.name) private temperatureRecordModel: Model<TemperatureRecordDocument>
	) { }

	async insertRecord(temperatureRecordDto: TemperatureRecordDTO): Promise<TemperatureRecord> {
		const createdTemperatureRecord = new this.temperatureRecordModel(temperatureRecordDto);
		return createdTemperatureRecord.save()
	}
}
