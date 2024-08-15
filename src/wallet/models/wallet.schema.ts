import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Application } from "src/application/models";
import { User } from "src/user/models";

export type WalletDocument =  Wallet & Document;


@Schema({
    toObject: {
        transform: function (doc, ret) {
            ret.app=ret.app._id
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            ret.app=ret.app._id
            delete ret.__v;

        }
    }
})
export class Wallet
{
    @Prop({required:true,default:0})
    amount:number;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Application",required:true})
    app:Application;
    
    @Prop({default:Date.now(),required:true})
    createdAt:Date
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)
