import {
  CommandHandler,
  type ICommand,
  type ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContractEntity } from '../contract.entity';
import { type CreateContractDto } from '../dtos/create-contract.dto';

export class CreateContractCommand implements ICommand {
  constructor(
    public readonly userId: Uuid,
    public readonly createContractDto: CreateContractDto,
  ) {}
}

@CommandHandler(CreateContractCommand)
export class CreateContractHandler
  implements ICommandHandler<CreateContractCommand, ContractEntity>
{
  constructor(
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
  ) {}

  async execute(command: CreateContractCommand) {
    const { userId } = command;
    const contractEntity = this.contractRepository.create({ userId });

    await this.contractRepository.save(contractEntity);

    return contractEntity;
  }
}
