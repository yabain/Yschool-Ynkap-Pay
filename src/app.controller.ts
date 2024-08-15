import { Controller,Get } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Controller()
export class AppController
{
    constructor(private configService:ConfigService){}
    @Get()
    get()
    {
        return `Yaba-In Payment Gateway API (Y-Nkap) ${this.configService.get<string>("NODE_ENV")} Version 1.0.0`
    }
}