import { PartialType } from "@nestjs/mapped-types";
import { CreateCardPaymentMethodDTO } from "./create-card-payment-method.dto";

export class UpdateCardPaymentMethodDTO extends PartialType(CreateCardPaymentMethodDTO){}