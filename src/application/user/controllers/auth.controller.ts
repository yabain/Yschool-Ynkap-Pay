import { Body, Controller,HttpCode,HttpStatus,Post, Req, UseGuards,Get } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDTO } from "../dtos";
import { UserAuthGuard, UserJwtAuthGuard } from "../guards";
import { AuthService, UsersService } from "../services";

@Controller("user/auth")
export class AuthController
{
    constructor(private readonly usersService:UsersService, private authService:AuthService){}

    @Post("register")
    async register(@Body() createUserDTO:CreateUserDTO)
    {
        let userCreated=await this.usersService.create(createUserDTO)
        return {
            statusCode:201,
            message:"User Created",
            data:userCreated
        };
    }

    @UseGuards(UserAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post("login")    
    async login(@Req() request:Request)
    {
        return {
            statusCode:HttpStatus.OK,
            message:"Authentication Success",
            data:{
                ...this.authService.login(request.user),
                user:request.user

            }
        }
    }

    @UseGuards(UserJwtAuthGuard)
    @Get("refresh")
    async refreshToken()
    {

    }

    @UseGuards(UserJwtAuthGuard)
    @Get("logout")
    async logout()
    {

    }
}