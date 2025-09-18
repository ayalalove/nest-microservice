import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateRecordDto, UpdateRecordSchema } from './dto/update-record.dto';
import { UpdateDto } from './dto/update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus() {
    return this.appService.getStatus();
  }

  @Post('update')
  async updateRecord(@Body() body: UpdateDto): Promise<any> {
    const result = UpdateRecordSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }

    const dto: UpdateRecordDto = result.data;

    return this.appService.updateRecord(dto);
  }

  @Get('records')
  getAllRecords() {
    return this.appService.getAllRecords();
  }
}
