import {MaxLength, MinLength,IsString,IsOptional,IsUrl,IsNotEmpty } from "class-validator";

export class CreateAppDTO
{
    @MinLength(5, {
        message: 'Application name is too short',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    name:string;

    @IsOptional()
    @IsUrl({
        message:"UrlToCallBack must be a valid url endpoint"
    })
    @IsString()
    urlToCallBack:string;
}