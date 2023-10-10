import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

import { type PageDto } from '../../common/dto/page.dto';
import { CreateContractCommand } from './commands/create-contract.command';
import { ContractEntity } from './contract.entity';
import { type ContractDto } from './dtos/contract.dto';
import { type ContractPageOptionsDto } from './dtos/contract-page-options.dto';
import { CreateContractDto } from './dtos/create-contract.dto';
import { ContractNotFoundException } from './exceptions/contract-not-found.exception';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(ContractEntity)
    private contractRepository: Repository<ContractEntity>,
    private commandBus: CommandBus,
  ) {}

  @Transactional()
  createContract(
    userId: Uuid,
    createContractDto: CreateContractDto,
  ): Promise<ContractEntity> {
    return this.commandBus.execute<CreateContractCommand, ContractEntity>(
      new CreateContractCommand(userId, createContractDto),
    );
  }

  async getAllContract(
    postPageOptionsDto: ContractPageOptionsDto,
  ): Promise<PageDto<ContractDto>> {
    const queryBuilder = this.contractRepository.createQueryBuilder('post');
    const [items, pageMetaDto] =
      await queryBuilder.paginate(postPageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getSingleContract(id: Uuid): Promise<ContractEntity> {
    const queryBuilder = this.contractRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id });

    const contractEntity = await queryBuilder.getOne();

    if (!contractEntity) {
      throw new ContractNotFoundException();
    }

    return contractEntity;
  }
}
