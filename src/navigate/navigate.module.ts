import { Module } from '@nestjs/common';
import { NavigateService } from './navigate.service';
import { NavigateController } from './navigate.controller';

@Module({
  imports: [],
  controllers: [NavigateController],
  providers: [NavigateService],
})
export class NavigateModule {}
