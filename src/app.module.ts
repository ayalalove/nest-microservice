

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService,} from './app.service';
import { MockPrismaService } from './mock-prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'PrismaService', useClass: MockPrismaService }, 
  ],
})
export class AppModule {}
