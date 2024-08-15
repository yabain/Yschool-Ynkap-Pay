import { IsString } from "class-validator";

export class UserRefDTO
{
    @IsString()
    fullName:String;

    @IsString()
    account: String | Record<string,any>
}