import { Module } from '@nestjs/common';
import { ConstructorService } from './constructor.service';

@Module({
  controllers: [],
  providers: [ConstructorService],
})
export class ConstructorModule {}
