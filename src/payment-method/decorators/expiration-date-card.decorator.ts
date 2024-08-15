import { registerDecorator, ValidationArguments } from "class-validator";

export function IsExpirationDateCard<T>(validationOption?:ValidationArguments):(object:T,propertyName:string)=>void
{
    return (object:T,propertyName:string):void=>{
        // registerDecorator({
        //     name:"IsExpirationDateCard",
        //     target:object.constructor,
        //     propertyName,
        //     constraints:[],
        //     options:validationOption,
        //     // validator:
        // })
    }
}