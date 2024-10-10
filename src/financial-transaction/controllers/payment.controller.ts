import { Body, Controller, Post, UseGuards,Req, HttpStatus, Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { Request } from "express";
import { AuthJwtGuard as AppAuthJwtGuard } from "src/application/guards"
import { CreateFinancialTransactionDTO } from "../dtos"
import { PaymentService } from "../services"
import { OrangeMoneyUpdateFinancialTransactionStatus } from "../dtos/orange-money-update-financial-transaction.dto";

@Controller("payment")
export class PaymentController
{
    constructor(private paymentService:PaymentService){}

    // @UseGuards(AppAuthJwtGuard)
    @Post("pay")    
    async makePayment(@Req() request:Request, @Body() createFinancialTransactionDTO:CreateFinancialTransactionDTO)
    {
        let data=await this.paymentService.makePayment(createFinancialTransactionDTO)
        return {
            statusCode:HttpStatus.CREATED,
            message:"Payment initiated with success",
            data
        }        
    }

    @Post("orange-money-notify-payment")    
    async orangeMoneyNotifyPayment(@Req() request:Request, @Body() orangeMoneyUpdateFinancialTransactionStatus)
    {
        //OrangeMoneyUpdateFinancialTransactionStatus
        console.log("orangeMoneyUpdateFinancialTransactionStatus ", orangeMoneyUpdateFinancialTransactionStatus)
        let data=await this.paymentService.updatePayementStatus(orangeMoneyUpdateFinancialTransactionStatus.payToken,orangeMoneyUpdateFinancialTransactionStatus.status)
        return {
            statusCode:HttpStatus.CREATED,
            message:"Payment initiated with success",
            data
        }        
    }

    // @UseGuards(AppAuthJwtGuard)
    @Get("check/:ref")    
    async checkPayment(@Req() request:Request, @Param("ref") ref:string)
    {
        console.log("Ref ",ref)
        let data=await this.paymentService.checkPayment(ref)
        return {
            statusCode:HttpStatus.OK,
            message:"Payment details",
            data
        }        
    }
}