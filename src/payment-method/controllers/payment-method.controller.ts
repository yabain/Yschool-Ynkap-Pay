import { Controller,Post,Delete, Param, UseGuards,Body, HttpStatus, Req } from "@nestjs/common"
import { Request } from "express";
import { ObjectIDValidationPipe } from "src/shared/pipes";
import { UserAuthGuard } from "src/user/guards";
import { CreateCardPaymentMethodDTO } from "../dtos/create-card-payment-method.dto";
import { CardPaymentMethodService } from "../services";

@UseGuards(UserAuthGuard)
@Controller("payment-method")
export class PaymentMethodController
{
    constructor(private cardPaymentMethodService:CardPaymentMethodService){}

    @Post("card")
    async addCardPaymentMethod(@Req() request:Request, @Body() createCardPaymentMethodDTO:CreateCardPaymentMethodDTO)
    {
        return {
            statusCode:HttpStatus.CREATED,
            message:"The new payment card has been successfully added",
            data:await this.cardPaymentMethodService.create(createCardPaymentMethodDTO,request.user)
        }
    }

    @Post("mobile")
    async addMobilePaymentMethod()
    {

    }

    @Delete("/:id")
    async deletePaymentMethod(@Param("id",ObjectIDValidationPipe) id:string)
    {
        return {
            statusCode:HttpStatus.OK,
            message:"The payment card has been successfully deleted",
            data:await this.cardPaymentMethodService.delete(id)
        }
    }

}