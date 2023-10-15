import { Entity, Column, ManyToOne } from "typeorm"
import {AbstractEntity} from "../../common/abstract.entity";
import {UserEntity} from "../user/user.entity";
import {InvoiceStatus} from "../../constants";
import {UseDto} from "../../decorators";
import {InvoiceDto} from "./dto/invoice.dto";



@Entity({name:'invoices'})
@UseDto(InvoiceDto)
export class InvoiceEntity extends AbstractEntity{
  @Column({nullable:false, type:"float"})
  amount!: number

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status!: InvoiceStatus

  @Column({nullable:false, type:"date"})
  dueDate!: Date

  @Column({nullable: false, type:"char"})
  receivingAddress!: string

  @ManyToOne(()=>UserEntity, (user)=>user.incomingInvoices)
  employer!: UserEntity;

  @ManyToOne(() => UserEntity, (user)=>user.outgoingInvoices)
  sender!: UserEntity;

  @Column({nullable:false, type:"varchar"})
  paymentLink!: string

  // @Column({nullable:false, type:"varchar"})
  // invoiceId

  @Column({nullable:true, type:"varchar"})
  description?: string


}

// TODO: Link with Contract?
