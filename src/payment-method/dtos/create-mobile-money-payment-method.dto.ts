import { IsString, IsNotEmpty, MaxLength, IsOptional, MinLength, IsEmail, IsPhoneNumber, IsPostalCode, Validate, IsCreditCard } from "class-validator";
import { User } from "src/user/models";
import { ExpiredCardValidator, ValidFormatExpirationDateCardValidator } from "../validators";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMobileMoneyPaymentMethodDTO
{
    @ApiProperty({
        type:String,        
    })
    @IsString()
    phoneNumber:string

    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    ownerName:string;

}