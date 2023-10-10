import {
  Body,
  Controller,
  // Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  // Put,
  Query,
} from '@nestjs/common';
import {
  // ApiAcceptedResponse,
  ApiCreatedResponse,
  // ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { type PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import { ApiPageOkResponse, Auth, AuthUser } from '../../decorators';
import { UserEntity } from '../user/user.entity';
import { ContractService } from './contract.service';
import { ContractDto } from './dtos/contract.dto';
import { ContractPageOptionsDto } from './dtos/contract-page-options.dto';
import { CreateContractDto } from './dtos/create-contract.dto';

@Controller('contracts')
@ApiTags('contracts')
export class ContractController {
  constructor(private contractService: ContractService) {}

  @Post()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: ContractDto })
  async createContract(
    @Body() createContractDto: CreateContractDto,
    @AuthUser() user: UserEntity,
  ) {
    const contractEntity = await this.contractService.createContract(
      user.id,
      createContractDto,
    );

    return contractEntity.toDto();
  }

  @Get()
  @Auth([RoleType.USER])
  @ApiPageOkResponse({ type: ContractDto })
  async getContracts(
    @Query() contractsPageOptionsDto: ContractPageOptionsDto,
  ): Promise<PageDto<ContractDto>> {
    return this.contractService.getAllContract(contractsPageOptionsDto);
  }

  //   @Get(':id')
  //   @Auth([])
  //   @HttpCode(HttpStatus.OK)
  //   @ApiOkResponse({ type: ContractDto })
  //   async getSinglePost(@UUIDParam('id') id: Uuid): Promise<ContractDto> {
  //     const entity = await this.contractService.getSingleContract(id);

  //     return entity.toDto();
  //   }
}
