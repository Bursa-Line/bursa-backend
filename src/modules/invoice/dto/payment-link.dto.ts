import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";



export class PaymentLinkDto{
    @ApiProperty()
    @IsNotEmpty()
    destinationAddress!: string;


    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount!: number;


    @IsString()
    @ApiPropertyOptional()
    description?: string;

    @IsString()
    @ApiPropertyOptional()
    memo?: string;

    // constructor(
    //   destinationAddress: string,
    // amount: number,
    // description: string="",
    // memo: string="") {
    // this.amount = amount
    // this.destinationAddress = destinationAddress
    // this.description = description
    // this.memo = memo
    // }
}
