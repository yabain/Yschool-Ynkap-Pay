import { Injectable } from "@nestjs/common"
import mongoose,{ Model } from "mongoose"
import { InjectModel } from "@nestjs/mongoose";
import { WalletDocument } from "../models";
import { Application } from "src/application/models";


@Injectable()
export class WalletService
{
    constructor(@InjectModel('Wallet') private walletModel:Model<WalletDocument>){}

    getInstance(jsonObj)
    {
        return new this.walletModel(jsonObj)
    }

    async update(filter:Record<string,any>,toUpdate:Record<string,any>,session=null)
    {
        return this.walletModel.findOneAndUpdate(filter,toUpdate,{session,new:true});
    }

    create(application:Application,transaction: mongoose.ClientSession | null = null)
    {
        return new this.walletModel({
            amount:0,
            app:application
        }).save({session:transaction})
    }

    async findOneByField(walletObj:Record<string,any>):Promise<WalletDocument>
    {
        return this.walletModel.findOne<WalletDocument>(walletObj).exec()
    }

    async increaseWallet(walletID,amount:number,session=null):Promise<WalletDocument>
    {
        let wallet = await this.findOneByField({"_id":walletID});
        return this.update({"_id":walletID},{amount:wallet.amount+amount},session)
    }
    
    async decreaseWallet(walletID,amount:number,session=null):Promise<WalletDocument>
    {
        let wallet = await this.findOneByField({"_id":walletID});
        if(wallet.amount<amount) return null;
        return this.update({"_id":walletID},{amount:wallet.amount-amount},session)
    }
}