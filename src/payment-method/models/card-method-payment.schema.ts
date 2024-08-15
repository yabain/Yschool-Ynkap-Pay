import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/models";

export type CardMethodPaymentDocument = CardMethodPayment & Document;

@Schema({
    toObject:{
        transform(doc, ret, options) {
            ret.owner=ret.owner._id;
            delete ret.__v
            delete ret.isDeleted

        },
    },
    toJSON:{
        transform(doc, ret, options) {
            ret.owner=ret.owner._id;
            delete ret.__v
            delete ret.isDeleted
        },
    }
})
export class CardMethodPayment
{
    @Prop({required:true,unique:true})
    number:string

    @Prop({required:true})
    expirationDate:string;

    @Prop({required:true})
    ownerName:string;

    @Prop({required:true,type:mongoose.Schema.Types.ObjectId,ref:User.name})
    owner:User

    @Prop({default:Date.now(),required:true})
    createdAt:Date;

    @Prop({required:true})
    fulnameFacturation:string;

    @Prop({required:true,default:""})
    companyFacturation:string;

    @Prop({required:true})
    countryFacturation:string;

    @Prop({required:true})
    addressFacturation:string;

    @Prop({required:true})
    cityFacturation:string;

    @Prop({required:true})
    regionFacturation:string;

    @Prop({required:true})
    postalCodeFacturation:string;

    @Prop({required:true})
    phoneNumberFacturation:string;

    @Prop({required:true})
    emailFacturation:string;

    @Prop({default:false})
    isDeleted:boolean;
}

export const CardMethodPaymentSchema = SchemaFactory.createForClass(CardMethodPayment)