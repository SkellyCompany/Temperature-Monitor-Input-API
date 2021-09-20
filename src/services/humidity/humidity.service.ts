import { HumidityRecordDTO } from './../../dtos/humidity-record.dto';
import { HumidityRecord, HumidityRecordDocument } from './../../schemas/humidity-record.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HumidityService {
	constructor(
		@InjectModel(HumidityRecord.name) private humidityRecordModel: Model<HumidityRecordDocument>
	) { }

	async insertRecord(humidityRecordDto: HumidityRecordDTO): Promise<HumidityRecord> {
		const createdHumidityRecord = new this.humidityRecordModel(humidityRecordDto);
		return createdHumidityRecord.save()
	}
}
