import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose";
import { EncryptionSecurityService } from "src/shared/security";
import { SharedModule } from "src/shared/shared.module";
import { UserModule } from "src/user/user.module";
import { CardMethodPayment, CardMethodPaymentSchema } from "./models";
import { CardPaymentMethodService } from "./services";

@Module({
    controllers:[],
    imports:[
        SharedModule,
        MongooseModule.forFeatureAsync([
            {
                name:CardMethodPayment.name,
                useFactory:(encryptionSecurityService:EncryptionSecurityService)=>{
                    const schema = CardMethodPaymentSchema;
                    schema.pre("save",function(next){
                        this.number=encryptionSecurityService.cipher(this.number);
                        next();
                    })
                    return schema;
                },
                inject:[EncryptionSecurityService],
                imports:[SharedModule]
            }
        ]),
        UserModule
    ],
    providers:[
        CardPaymentMethodService
    ],
    exports:[]
})
export class PaymentMethodModule{}