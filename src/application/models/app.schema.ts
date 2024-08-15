import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { uid } from "rand-token";
import { v4 as uuidv4 } from 'uuid';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { User } from '../../user/models';

export type ApplicationDocument =   HydratedDocument<Application>;

@Schema({
    toObject: {
        transform: function (doc, ret) {
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            ret.owner=ret.owner._id;
            delete ret.__v;

        }
    }
})
export class Application extends Document
{

    @Prop({required:true,unique:true})
    name:string;

    @Prop({default:""})
    urlToCallBack:string;

    @Prop({default:uuidv4(),required:true})
    clientId:string;

    @Prop({default:uid(256),required:true})
    privateKey:string;
    
    @Prop({default:Date.now(),required:true})
    createdAt:Date
}

export const ApplicationSchema = SchemaFactory.createForClass(Application)

