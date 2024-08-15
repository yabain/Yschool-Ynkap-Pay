import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { UsersService } from "src/user/services";
import { CreateCardPaymentMethodDTO } from "../dtos/create-card-payment-method.dto";
import { CardMethodPayment, CardMethodPaymentDocument } from "../models";

@Injectable()
export class CardPaymentMethodService
{
    constructor(
        @InjectModel(CardMethodPayment.name) private cardMethodPaymentModel:Model<CardMethodPaymentDocument>,
        private usersService:UsersService,
        @InjectConnection() private readonly connection:mongoose.Connection
    ){}

    async create(createCardPaymentMethodDTO:CreateCardPaymentMethodDTO,user):Promise<CardMethodPaymentDocument>
    {
        createCardPaymentMethodDTO.owner=await this.usersService.findOneByField({email:user.email});
        if(!createCardPaymentMethodDTO.owner) throw new NotFoundException();
        return await new this.cardMethodPaymentModel(createCardPaymentMethodDTO).save()
    }

    async update(filter:Record<string,any>,toUpdate:Record<string,any>,session=null)
    {
        return this.cardMethodPaymentModel.findOneAndUpdate(filter,toUpdate,{session,new:true});
    }

    async delete(cardPaymentID:string):Promise<CardMethodPaymentDocument>
    {
        return this.update({"_id":cardPaymentID},{isDeleted:true})
    }
}