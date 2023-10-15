import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {InvoiceEntity} from "./invoice.entity";
import {PaymentLinkGeneratorController} from "./invoice.controller";






@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  providers:[],
  controllers: [PaymentLinkGeneratorController]
})
export class InvoiceModule{}
