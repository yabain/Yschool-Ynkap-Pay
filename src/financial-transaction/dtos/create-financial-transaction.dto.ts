import { Type } from "class-transformer";
import {MaxLength,Min,IsEnum,IsNumberString,IsMongoId, MinLength,IsString,IsOptional,IsUrl,IsNotEmpty, IsJSON, IsNumber, IsDefined, IsNotEmptyObject } from "class-validator";
import { Application } from "src/application/models";
import { FinancialTransactionType, PaymentStrategyType, PaymentMoneyCode } from "src/financial-payment/enum";
import { Wallet } from "src/wallet/models";
import { IsValidAmount } from "../decorators/decrease-amount.decorator";
import { FinancialTransactionState } from "../enum";
import { UserRefDTO } from "./user-ref.dto";
import { ApiProperty } from "@nestjs/swagger";



export class CreateFinancialTransactionDTO
{

    @ApiProperty({
        description:"Montant du paiement"
    })
    @Min(1)
    @IsNumber({},{message:"Montant de la transaction invalide"})
    // @IsValidAmount()
    amount:number;

    @ApiProperty({
        description:"Type de transaction; Dépot ou Retrait"
    })
    @IsNotEmpty()
    @IsEnum(FinancialTransactionType)
    type:FinancialTransactionType;
    
   
    @ApiProperty({
        description:"Methode de paiement"
    })
    @IsNotEmpty()
    @IsEnum(PaymentStrategyType,{message:"Mode de paiement non supporté"})
    paymentMode:PaymentStrategyType;

    @ApiProperty({
        description:"Etat de la transaction. Optionnel pour le cas d'une initialisation de la transaction"
    })
    @IsOptional()
    @IsEnum(FinancialTransactionState)
    state:FinancialTransactionState;

    @ApiProperty({
        description:"Monaie supporté : XAF, XOF, EUR, $"
    })
    @IsEnum(PaymentMoneyCode,{message:"Monaie non pris en charge"})
    moneyCode:PaymentMoneyCode;

    @ApiProperty({
        description:"Information sur le payeur"
    })
    @IsDefined()
    @IsNotEmptyObject({}, {message:"Information sur l'utilisateur invalide"})
    @Type(()=> UserRefDTO)
    userRef;

    @ApiProperty({
        description:"Message affiché comme justificatif de la transaction"
    })
    @IsString({message:"Raison du transfert non fournis"})
    raison:string

    //Invalidate
    application:Application;

    wallet:Wallet;


}