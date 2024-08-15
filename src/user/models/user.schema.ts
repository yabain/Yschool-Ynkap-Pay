import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { PERMISSIONS } from "../enum";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema({
    toObject: {
        transform: function (doc, ret) {
          delete ret.password;
          delete ret.__v;
        }
      },
      toJSON: {
        transform: function (doc, ret) {
          delete ret.password;
          delete ret.__v;

        }
      }
})
export class User
{
    @Prop({required:true,default:""})
    firstName:string;

    @Prop({required:true,default:""})
    lastName:string;

    @Prop({
        required:true,
        default:"",
    })
    password:string;

    @Prop({
        required:true,
        unique:true,
        match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    })
    email:string;

    @Prop({required:true,default:false})
    emailConfirmed:boolean;

    @Prop({default:""})
    profilePicture:string;

    @Prop({default:""})
    country:string;

    @Prop({default:""})
    location:string;

    @Prop({require:true,enum:PERMISSIONS,default:PERMISSIONS.USER})
    permissions:string;

    @Prop({default:Date.now(),required:true})
    createdAt:Date
}

export const UserSchema = SchemaFactory.createForClass(User)