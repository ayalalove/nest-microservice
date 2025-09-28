// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Get,
//   Post,
// } from '@nestjs/common';
// import { AppService } from './app.service';
// import { UpdateRecordDto, UpdateRecordSchema } from './dto/update-record.dto';
// import { ApiBody } from '@nestjs/swagger';
// import { UpdateDto } from './dto/update.dto';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get('status')
//   getStatus() {
//     return this.appService.getStatus();
//   }

//   @Post('update')
//   @ApiBody({ type: UpdateDto })
//   async updateRecord(@Body() body: any): Promise<any> {
//     console.log('Incoming request body:', body);

//     const result = UpdateRecordSchema.safeParse(body);
//     if (!result.success) {
//       console.error('Validation failed:', result.error.errors);
//       throw new BadRequestException(result.error.errors);
//     }

//     const dto: UpdateRecordDto = result.data;

//     const updated = await this.appService.updateRecord(dto);

//     await this.appService.sendToExternalApi(dto);

//     return updated;
//   }

//   @Get('records')
//   getAllRecords() {
//     return this.appService.getAllRecords();
//   }

//   @Get('cron/run')
//   async runCronJobManually() {
//     return await this.appService.runCronJob();
//   }
// }

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UpdateRecordDto, UpdateRecordSchema } from './dto/update-record.dto';
import { ApiBody } from '@nestjs/swagger';
import { UpdateDto } from './dto/update.dto';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get('status')
  getStatus() {
    this.logger.log('Checking service status...');
    return this.appService.getStatus();
  }

  @Post('update')
  @ApiBody({ type: UpdateDto })
  async updateRecord(@Body() body: any): Promise<any> {
    this.logger.log(`Incoming request: ${JSON.stringify(body)}`);

    const result = UpdateRecordSchema.safeParse(body);
    if (!result.success) {
      this.logger.error(`Validation failed: ${JSON.stringify(result.error.errors)}`);
      throw new BadRequestException(result.error.errors);
    }

    const dto: UpdateRecordDto = result.data;

    this.logger.log(`Updating record ID ${dto.id}`);
    const updated = await this.appService.updateRecord(dto);

    this.logger.log(`Sending record ID ${dto.id} to external API`);
    await this.appService.sendToExternalApi(dto);

    return updated;
  }

  @Get('records')
  getAllRecords() {
    this.logger.log('Fetching all records...');
    return this.appService.getAllRecords();
  }

  @Get('cron/run')
  async runCronJobManually() {
    this.logger.log('Manually triggering cronjob...');
    return await this.appService.runCronJob();
  }
}