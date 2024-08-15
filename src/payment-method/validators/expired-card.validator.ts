import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";

export class ExpiredCardValidator implements ValidatorConstraintInterface
{
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        let found= value.match(/^([0-1][0-9])[./-]([0-9]{2})$/);
        if(!found) return false;
        try {
            return new Date()<=new Date(parseInt(found[1])-1,parseInt(found[2]));
        } catch (error) {
            return false;
        }
        
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "Card expired";
    }
    
}