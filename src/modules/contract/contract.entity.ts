import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '../../common/abstract.entity';
import { FrequencyType } from '../../constants';
import { UserEntity } from '../../modules/user/user.entity';
import { type ContractDto } from './dtos/contract.dto';

@Entity({ name: 'contracts' })
export class ContractEntity extends AbstractEntity<ContractDto> {
  @Column({ type: 'uuid' })
  userId!: Uuid;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  employerId!: UserEntity;

  @Column('text')
  contractName!: string;

  @Column('text')
  scopeOfWork!: string;

  @Column('integer')
  terminationDays!: number;

  @Column({ type: 'enum', enum: FrequencyType, default: FrequencyType.MONTHLY })
  role!: FrequencyType;

  @Column('text')
  currency!: string;

  @Column('decimal')
  payAmount!: number;

  @Column('date')
  startDate!: Date;
}
