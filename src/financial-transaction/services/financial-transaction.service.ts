import { Injectable } from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ApplicationService } from "src/application/services";
import { WalletService } from "src/wallet/services";
import { CreateFinancialTransactionDTO } from "../dtos";
import { FinancialTransaction, FinancialTransactionDocument } from "../models";
import { ConfigService } from "@nestjs/config";
import { DataBaseService } from "src/shared/database";

@Injectable()
export class FinancialTransactionService extends DataBaseService<FinancialTransactionDocument>
{
    constructor(
        @InjectModel(FinancialTransaction.name)  financialTransactionModel:Model<FinancialTransactionDocument>,
        @InjectConnection() connection:mongoose.Connection,
        private applicationService:ApplicationService,
        private walletService:WalletService,
        private configService:ConfigService
    ){
        super(financialTransactionModel,connection,[])
    }

    async createNewFinancialTransaction(createFinancialTransactionDTO:CreateFinancialTransactionDTO,session)
    {
        createFinancialTransactionDTO.application= await this.applicationService.findOneByField({name:this.configService.get("DEFAULT_YSCHOOL_APPLICATION_NAME")})
        createFinancialTransactionDTO.wallet=await this.walletService.findOneByField({application:createFinancialTransactionDTO.application.id});

        return this.create(createFinancialTransactionDTO,session)     
    }

}