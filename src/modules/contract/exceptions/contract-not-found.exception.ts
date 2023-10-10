import { NotFoundException } from '@nestjs/common';

export class ContractNotFoundException extends NotFoundException {
  constructor(error?: string) {
    super('error.contractNotFound', error);
  }
}
