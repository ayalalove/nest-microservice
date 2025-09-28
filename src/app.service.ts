// import { Injectable, Logger, NotFoundException } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { UpdateRecordDto } from './dto/update-record.dto';
// import axios from 'axios';

// @Injectable()
// export class AppService {
//   private prisma = new PrismaClient();
//   private readonly logger = new Logger(AppService.name);

//   constructor() {
//     setInterval(
//       () => {
//         this.runCronJob();
//       },
//       5 * 60 * 1000
//     );
//   }

//   async getStatus() {
//     try {
//       await this.prisma.$queryRaw`SELECT 1`;
//       return { status: 'OK' };
//     } catch (error) {
//       return { status: 'DB Error', error: error.message };
//     }
//   }

//   async updateRecord(dto: UpdateRecordDto) {
//     try {
//       console.log('Updating record with ID:', dto.id);
//       console.log('Incoming DTO:', dto);

//       const existing = await this.prisma.record.findUnique({
//         where: { id: dto.id },
//       });

//       const dataToSave = {
//         name: dto.name,
//         create_date: new Date(dto.create_date),
//         latitude: dto.location.latitude,
//         longitude: dto.location.longitude,
//         alerts: dto.alerts,
//         status: dto.status,
//         description: dto.description,
//       };

//       if (existing) {
//         return await this.prisma.record.update({
//           where: { id: dto.id },
//           data: dataToSave,
//         });
//       } else {
//         return await this.prisma.record.create({
//           data: {
//             id: dto.id,
//             ...dataToSave,
//           },
//         });
//       }
//     } catch (error) {
//       throw new NotFoundException(`Record update failed: ${error.message}`);
//     }
//   }

//   async getAllRecords() {
//     return await this.prisma.record.findMany();
//   }

//   async sendToExternalApi(record: UpdateRecordDto) {
//     const responses = [];

//     for (const alertId of record.alerts) {
//       try {
//         const payload = {
//           ...record,
//           alert: alertId,
//           create_date: new Date(
//             new Date(record.create_date).getTime() + 3 * 60 * 60 * 1000
//           ),
//         };

//         const res = await axios.post('https://httpbin.org/post', payload);

//         this.logger.log(`Alert ${alertId} sent successfully: ${res.status}`);

//         responses.push(res.data);
//       } catch (error) {
//         this.logger.error(`Failed to send alert ${alertId}: ${error.message}`);
//       }
//     }

//     return responses;
//   }

//    async runCronJob() {
//     this.logger.log('Running cronjob: updating records...');

//     const now = new Date();

//     const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
//     const openToActive = await this.prisma.record.updateMany({
//       where: {
//         status: 1,
//         updatedAt: { lt: oneHourAgo },
//       },
//       data: { status: 2 },
//     });
//     if (openToActive.count > 0)
//       this.logger.log(`Updated ${openToActive.count} records from open → active`);

//     const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
//     const toClosed = await this.prisma.record.updateMany({
//       where: {
//         updatedAt: { lt: twentyFourHoursAgo },
//         status: { not: 5 },
//       },
//       data: { status: 5 },
//     });
//     if (toClosed.count > 0)
//       this.logger.log(`Updated ${toClosed.count} records to close`);
//   }
// }

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateRecordDto } from './dto/update-record.dto';
import axios from 'axios';

@Injectable()
export class AppService {
  private prisma = new PrismaClient();
  private readonly logger = new Logger(AppService.name);

  constructor() {
    setInterval(
      () => {
        this.runCronJob();
      },
      5 * 60 * 1000
    );
  }

  async getStatus() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      this.logger.log('Service status: OK');
      return { status: 'OK' };
    } catch (error) {
      this.logger.error(`DB check failed: ${error.message}`);
      return { status: 'DB Error', error: error.message };
    }
  }

  async updateRecord(dto: UpdateRecordDto) {
    try {
      this.logger.log(`Updating record with ID: ${dto.id}`);
      this.logger.debug(`Incoming DTO: ${JSON.stringify(dto)}`);

      const existing = await this.prisma.record.findUnique({
        where: { id: dto.id },
      });

      const dataToSave = {
        name: dto.name,
        create_date: new Date(dto.create_date),
        latitude: dto.location.latitude,
        longitude: dto.location.longitude,
        alerts: dto.alerts,
        status: dto.status,
        description: dto.description,
      };

      if (existing) {
        return await this.prisma.record.update({
          where: { id: dto.id },
          data: dataToSave,
        });
      } else {
        return await this.prisma.record.create({
          data: { id: dto.id, ...dataToSave },
        });
      }
    } catch (error) {
      this.logger.error(`Record update failed: ${error.message}`);
      throw new NotFoundException(`Record update failed: ${error.message}`);
    }
  }

  async getAllRecords() {
    this.logger.log('Fetching all records...');
    return await this.prisma.record.findMany();
  }

  async sendToExternalApi(record: UpdateRecordDto) {
    const responses = [];

    for (const alertId of record.alerts) {
      try {
        const payload = {
          ...record,
          alert: alertId,
          create_date: new Date(
            new Date(record.create_date).getTime() + 3 * 60 * 60 * 1000
          ),
        };

        const res = await axios.post('https://httpbin.org/post', payload);
        this.logger.log(`Alert ${alertId} sent successfully: ${res.status}`);
        responses.push(res.data);
      } catch (error) {
        this.logger.error(`Failed to send alert ${alertId}: ${error.message}`);
      }
    }

    return responses;
  }

  async runCronJob() {
    this.logger.log('Running cronjob: updating records...');

    const now = new Date();

    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const openToActive = await this.prisma.record.updateMany({
      where: {
        status: 1,
        updatedAt: { lt: oneHourAgo },
      },
      data: { status: 2 },
    });
    if (openToActive.count > 0)
      this.logger.log(`Updated ${openToActive.count} records from פתוח → פעיל`);

    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const toClosed = await this.prisma.record.updateMany({
      where: {
        updatedAt: { lt: twentyFourHoursAgo },
        status: { not: 5 },
      },
      data: { status: 5 },
    });
    if (toClosed.count > 0)
      this.logger.log(`Updated ${toClosed.count} records to סגור`);
  }
}
