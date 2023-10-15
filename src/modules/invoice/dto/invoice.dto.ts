import {AbstractDto} from "../../../common/dto/abstract.dto";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {InvoiceEntity} from "../invoice.entity";
import {InvoiceStatus} from "../../../constants";


export class InvoiceDto extends AbstractDto{

  @ApiProperty()
  amount!: number;

  @ApiProperty({enum: InvoiceStatus})
  status!: InvoiceStatus

  @ApiPropertyOptional()
  description?: string

  @ApiProperty()
  dueDate!: Date

  @ApiProperty()
  employer!: string

  @ApiProperty()
  sender!: string

  @ApiProperty()
  paymentLink!: string

  constructor(invoiceEntity: InvoiceEntity) {
    super(invoiceEntity);
  }

}
