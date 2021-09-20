import { TemperatureRecordDTO } from './../../dtos/temperature-record.dto';
import { TemperatureService } from './../../services/temperature/temperature.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('temperature')
export class TemperatureController {
	constructor(private readonly service: TemperatureService) { }

	@Post()
	insert(@Body() dto: TemperatureRecordDTO) {
		return this.service.insertRecord(dto);
	}
}
