import { MaxLength,MinLength,IsOptional,IsUrl,IsNotEmpty,IsString, Matches } from "class-validator";


export class CreateUserDTO
{
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(65)
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @MinLength(4)
    @IsString()
    @MaxLength(65)
    lastName:string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    password:string;

    @IsNotEmpty()
    @IsString()
    @Matches("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
    email:string;

    
    @IsOptional()
    @IsString()
    @IsUrl()
    profilePicture:string;

    @IsOptional()
    @MinLength(4)
    @IsString()
    country:string;

    @IsOptional()
    @MinLength(4)
    @IsString()
    location:string;

}