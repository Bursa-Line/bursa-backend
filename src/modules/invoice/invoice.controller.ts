import {
  Body,
  Controller, HttpCode, HttpStatus,
  Post,

} from '@nestjs/common';

import {PaymentLinkDto} from "./dto/payment-link.dto";


import {
  ApiTags,
} from '@nestjs/swagger';
import {SolanapayService} from "./solanapay.service";
// import {Auth} from "../../decorators";


@Controller("paymentLink")
@ApiTags("paymentLink")
export class PaymentLinkGeneratorController{
  constructor() {
  }

  @Post()
  // @Auth([], {public:true})
  @HttpCode(HttpStatus.CREATED)
  generateLink(@Body() paymentLinkDto: PaymentLinkDto){
    const solanaPay = new SolanapayService(paymentLinkDto.destinationAddress, paymentLinkDto.amount, paymentLinkDto.description, paymentLinkDto.memo)
    const paymentObject = solanaPay.generatePaymentLink()
    return {"url": paymentObject.href}

  }

}
