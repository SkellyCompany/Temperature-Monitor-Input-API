import { HumidityRecordDTO } from './../../dtos/humidity-record.dto';
import { HumidityService } from './../../services/humidity/humidity.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('humidity')
export class HumidityController {
	constructor(private readonly service: HumidityService) { }

	@Post()
	insert(@Body() dto: HumidityRecordDTO) {
		return this.service.insertRecord(dto);
	}
}
