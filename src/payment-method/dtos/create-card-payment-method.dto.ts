import { IsString, IsNotEmpty, MaxLength, IsOptional, MinLength, IsEmail, IsPhoneNumber, IsPostalCode, Validate, IsCreditCard } from "class-validator";
import { User } from "src/user/models";
import { ExpiredCardValidator, ValidFormatExpirationDateCardValidator } from "../validators";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCardPaymentMethodDTO
{
    @ApiProperty({
        type:String,        
    })
    @IsString()
    @IsNotEmpty()
    @IsCreditCard()
    number:string

    @ApiProperty({
        type:Date
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    @Validate(ValidFormatExpirationDateCardValidator)
    @Validate(ExpiredCardValidator)
    expirationDate:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    ownerName:string;


    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    fulnameFacturation:string;

    @IsOptional()
    @MinLength(4)
    @IsString()
    companyFacturation:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    countryFacturation:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    addressFacturation:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    cityFacturation:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(65)
    regionFacturation:string;

    @IsString()
    @IsNotEmpty()
    @IsPostalCode()
    postalCodeFacturation:string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumberFacturation:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailFacturation:string;

    owner:User
}