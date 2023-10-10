import { ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { DynamicTranslate } from '../../../decorators';
import { type ContractEntity } from '../contract.entity';

export class ContractDto extends AbstractDto {
  @ApiPropertyOptional()
  @DynamicTranslate()
  employerId?: string;

  @ApiPropertyOptional()
  contractName?: string;

  @ApiPropertyOptional()
  scopeOfWork?: string;

  @ApiPropertyOptional()
  terminationDays?: number;

  @ApiPropertyOptional()
  role?: string;

  @ApiPropertyOptional()
  currency?: string;

  @ApiPropertyOptional()
  payAmount?: number;

  @ApiPropertyOptional()
  startDate?: Date;

  constructor(contractEntity: ContractEntity) {
    super(contractEntity);
  }
}
