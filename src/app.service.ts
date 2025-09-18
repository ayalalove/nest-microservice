
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MockPrismaService } from './mock-prisma.service';
import { UpdateRecordDto } from './dto/update-record.dto';

@Injectable()
export class AppService {
  constructor(@Inject('PrismaService') private prisma: MockPrismaService) {}

  async getStatus() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'OK' };
    } catch (error) {
      return { status: 'DB Error', error: error.message };
    }
  }


  // async updateRecord(data: UpdateRecordDto) {
  //   const existing = await this.prisma.recordFindUnique({ where: { id: data.id } });

  //   if (existing) {
  //     return await this.prisma.recordUpdate({
  //       where: { id: data.id },
  //       data,
  //     });
  //   } else {
  //     return await this.prisma.recordCreate(data);
  //   }
  // }


  async updateRecord(data: any) {
  try {
    const existing = await this.prisma.recordFindUnique({ where: { id: data.id } });

    if (existing) {
      return await this.prisma.recordUpdate({
        where: { id: data.id },
        data,
      });
    } else {
      return await this.prisma.recordCreate(data);
    }
  } catch (error) {
    throw new NotFoundException(`Record update failed: ${error.message}`);
  }
}


  async getAllRecords() {
  return await this.prisma.records;
}

}
