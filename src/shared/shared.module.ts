import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import configuration from "./config/configuration";
import { SecurityModule } from "./security/security.module";

@Module({
    imports:[
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal:true
          }),
          MongooseModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:async (configService:ConfigService)=>({
              uri:configService.get<string>("mongoURI")
            })
          }),
        SecurityModule
    ],
    exports:[
        SecurityModule,
        ConfigModule,
        MongooseModule
    ]
})
export class SharedModule{}