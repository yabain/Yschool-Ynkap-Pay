import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as mongoose from "mongoose"
import { ApplicationService } from "./application.service";
import { ConfigService } from "@nestjs/config";



@Injectable()
export class InitDataService implements OnApplicationBootstrap
{
    constructor(
        private applicationService:ApplicationService,
        private configService:ConfigService
    ){}


    async onApplicationBootstrap():Promise<any> {
        if(!(await this.applicationService.findOneByField({name:this.configService.get("DEFAULT_YSCHOOL_APPLICATION_NAME")})))
        {
            this.applicationService.create({
                name:"Y-School",
                urlToCallBack:null,
            })
        }        
    }
}
