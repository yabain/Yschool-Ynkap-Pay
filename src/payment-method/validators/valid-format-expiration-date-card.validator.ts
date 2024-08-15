import { Injectable } from "@nestjs/common"
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({name:"IsValidFormatExpirationDateCard", async:true})
@Injectable()
export class ValidFormatExpirationDateCardValidator implements ValidatorConstraintInterface
{
    validate(value: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return /^[0-9]{2}[./-][0-9]{2}$/.test(value);
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "The format of your card's expiration date is invalid";
    }
    
}