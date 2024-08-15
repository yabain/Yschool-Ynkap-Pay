import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common"
import { Request } from "express";
import { UserJwtAuthGuard } from "src/user/guards";
import { CreateAppDTO } from "../dtos";
import { AuthBasicGuard } from "../guards/auth-basic.guard";
import { ApplicationService, AuthService } from "../services";


@Controller("apps")
export class ApplicationController
{
    constructor(private appService:ApplicationService,private appAuthService:AuthService){}

    // @UseGuards(UserJwtAuthGuard)
// :   @Post('create')
    async createApp(@Req() request:Request, @Body() createAppDTO:CreateAppDTO)
    {
        
        return {
            statusCode:HttpStatus.CREATED,
            message:"The application was created successfully",
            data: await this.appService.create(createAppDTO,request.user)
        }
    }
}