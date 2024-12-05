import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GyerekModule } from './gyerek/gyerek.module';
import { JatekModule } from './jatek/jatek.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [GyerekModule, JatekModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
