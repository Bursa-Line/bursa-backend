import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateContractHandler } from './commands/create-contract.command';
import { ContractController } from './contract.controller';
import { ContractEntity } from './contract.entity';
import { ContractService } from './contract.service';

// import { GetPostHandler } from './queries/get-post.query';

const handlers = [CreateContractHandler]; // GetContractHandler

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  providers: [ContractService, ...handlers],
  controllers: [ContractController],
})
export class ContractModule {}
