import { Type } from "class-transformer";
import {MaxLength,Min,IsEnum,IsNumberString,IsMongoId, MinLength,IsString,IsOptional,IsUrl,IsNotEmpty, IsJSON, IsNumber, IsDefined, IsNotEmptyObject } from "class-validator";
import { Application } from "src/application/models";
import { FinancialTransactionType, PaymentStrategyType, PaymentMoneyCode } from "src/financial-payment/enum";
import { Wallet } from "src/wallet/models";
import { IsValidAmount } from "../decorators/decrease-amount.decorator";
import { FinancialTransactionState } from "../enum";
import { UserRefDTO } from "./user-ref.dto";



export class CreateFinancialTransactionDTO
{

    @Min(1)
    @IsNumber()
    // @IsValidAmount()
    amount:number;

    @IsNotEmpty()
    @IsEnum(FinancialTransactionType)
    type:FinancialTransactionType;
    
   
    @IsNotEmpty()
    @IsEnum(PaymentStrategyType)
    paymentMode:PaymentStrategyType;

    @IsOptional()
    @IsEnum(FinancialTransactionState)
    state:FinancialTransactionState;

    @IsEnum(PaymentMoneyCode)
    moneyCode:PaymentMoneyCode;

    @IsDefined()
    @IsNotEmptyObject()
    @Type(()=> UserRefDTO)
    userRef;

    @IsString()
    raison:string

    //Invalidate
    application:Application;

    wallet:Wallet;


}