import { Injectable } from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { ApplicationService } from "src/application/services";
import { WalletService } from "src/wallet/services";
import { CreateFinancialTransactionDTO } from "../dtos";
import { FinancialTransaction, FinancialTransactionDocument } from "../models";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class FinancialTransactionService
{
    constructor(
        @InjectModel(FinancialTransaction.name) private financialTransactionModel:Model<FinancialTransactionDocument>,
        @InjectConnection() private readonly connection:mongoose.Connection,
        private applicationService:ApplicationService,
        private walletService:WalletService,
        private configService:ConfigService
    ){}

    async create(createFinancialTransactionDTO:CreateFinancialTransactionDTO,session)
    {
        createFinancialTransactionDTO.application= await this.applicationService.findOneByField({name:this.configService.get("DEFAULT_YSCHOOL_APPLICATION_NAME")})
        createFinancialTransactionDTO.wallet=await this.walletService.findOneByField({application:createFinancialTransactionDTO.application.id});

        return new this.financialTransactionModel(createFinancialTransactionDTO).save({session})     
    }

    async findAll(): Promise<FinancialTransactionDocument[]>
    {
        return this.financialTransactionModel.find().exec();
    }

 
    async findByField(userObj:Record<string,any>):Promise<FinancialTransactionDocument[]>
    {
        return this.financialTransactionModel.find<FinancialTransactionDocument>(userObj).exec()
    }

    async findOneByField(userObj:Record<string,any>):Promise<FinancialTransactionDocument>
    {
        return this.financialTransactionModel.findOne<FinancialTransactionDocument>(userObj).exec()
    }

    async update(filter:Record<string,any>,toUpdate:Record<string,any>,session=null)
    {
        return this.financialTransactionModel.findOneAndUpdate(filter,toUpdate,{session,new:true});
    }
}