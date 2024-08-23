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
    @IsNumber({},{message:"Montant de la transaction invalide"})
    // @IsValidAmount()
    amount:number;

    @IsNotEmpty()
    @IsEnum(FinancialTransactionType)
    type:FinancialTransactionType;
    
   
    @IsNotEmpty()
    @IsEnum(PaymentStrategyType,{message:"Mode de paiement non supporté"})
    paymentMode:PaymentStrategyType;

    @IsOptional()
    @IsEnum(FinancialTransactionState)
    state:FinancialTransactionState;

    @IsEnum(PaymentMoneyCode,{message:"Monai non pris en charge"})
    moneyCode:PaymentMoneyCode;

    @IsDefined()
    @IsNotEmptyObject({}, {message:"Information sur l'utilisateur invalide"})
    @Type(()=> UserRefDTO)
    userRef;

    @IsString({message:"Raison du transfert non fournis"})
    raison:string

    //Invalidate
    application:Application;

    wallet:Wallet;


}