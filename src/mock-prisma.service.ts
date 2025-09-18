import { Injectable } from '@nestjs/common';

@Injectable()
export class MockPrismaService {
  records = [
    {
      id: 1,
      name: 'Record1',
      create_date: new Date(),
      location: { latitude: 32.0853, longitude: 34.7818 },
      alerts: [101, 102],
      status: 1,
      description: 'Test record',
    },
  ];

  record = this.records[0];

  recordFindUnique({ where }: { where: { id: number } }) {
    return this.records.find(r => r.id === where.id);
  }

  recordCreate(data: any) {
    this.records.push(data);
    return data;
  }

  recordUpdate({ where, data }: { where: { id: number }; data: any }) {
    const record = this.records.find(r => r.id === where.id);
    if (record) Object.assign(record, data);
    return record;
  }



  async $queryRaw(query: TemplateStringsArray) {
    return 1;
  }
}
