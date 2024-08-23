import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDTO, LoginUserDTO } from "../dtos";
import { User, UserDocument } from "../models";

@Injectable()
export class UsersService
{
    constructor(@InjectModel('User') private userModel:Model<UserDocument>){}

    async create(createUserDTO: CreateUserDTO):Promise<UserDocument>
    {
        return new this.userModel(createUserDTO).save();
    }

    async findAll(): Promise<UserDocument[]>
    {
        return this.userModel.find().exec();
    }

 
    async findByField(userObj:Record<string,any>):Promise<UserDocument[]>
    {
        return this.userModel.find<UserDocument>(userObj).exec()
    }

    async findOneByField(userObj:Record<string,any>):Promise<UserDocument>
    {
        return this.userModel.findOne<UserDocument>(userObj).exec()
    }
    
}