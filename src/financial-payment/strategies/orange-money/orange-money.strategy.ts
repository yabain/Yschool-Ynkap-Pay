import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { catchError, from, map, switchMap, tap } from "rxjs";
import { PaymentMethodStrategy } from "src/financial-payment/interfaces";
import { FinancialTransactionState, FinancialTransactionErrorType } from "src/financial-transaction/enum";
import { FinancialTransaction } from "src/financial-transaction/models";
import { ERROR_CODE } from "src/shared/config/errors";
import { Injectable } from "@nestjs/common";
import { StrategyResponseStatus } from "../strategy-response-status.enum";
import { UtilStrategyFunc } from "../util-strategy-func";

@Injectable()
export class OrangeMoneyStrategyPayment implements PaymentMethodStrategy
{
    constructor(private configService:ConfigService,private readonly httpService:HttpService){}
        
    getToken():Promise<string>
    {
        return new Promise((resolve,reject)=>{
            this.httpService.request({
                url:`${this.configService.get<string>("OM_API_PATH")}/token`,
                method:"post",
                headers:{
                    Authorization:`Basic ${Buffer.from(`${this.configService.get<string>("OM_API_USERNAME")}:${this.configService.get<string>("OM_API_PASSWORD")}`).toString("base64")}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data:"grant_type=client_credentials"
            })
            .pipe(
                map(response => response.data)
            )
            .subscribe(
                (data)=> resolve(data.access_token),
                (error)=> reject(error)
            )
        })
    }


    buy(financialTransaction: FinancialTransaction): Promise<any> {
        // console.log("Financial ",financialTransaction)
        return new Promise((resolve,reject)=>{
            let token="";
            this.getToken()
            .then((result)=>{
                token = result;
                let mPayToken = ""
                
                this.httpService.request({
                    url:`${this.configService.get<string>("OM_API_PATH")}/omcoreapis/1.0.2/mp/init`,
                    method:"post",
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "X-AUTH-TOKEN": this.configService.get("OM_API_X_AUTH_TOKEN"),
                    }})
                    .pipe(
                        switchMap((result)=>{
                            mPayToken = result.data.data.payToken;

                            return this.httpService.request(
                            {
                                url:`${this.configService.get<string>("OM_API_PATH")}/omcoreapis/1.0.2/mp/pay `,
                                method:"post",
                                headers:{
                                    "Authorization": `Bearer ${token}`,
                                    "X-AUTH-TOKEN": this.configService.get("OM_API_X_AUTH_TOKEN"),
                                },
                                data:{
                                    "notifUrl":`${this.configService.get("HOST_URL")}/orange-money-notify-payment`,
                                    "channelUserMsisdn":this.configService.get("OM_API_CHANNELUSERMSISDN"),
                                    "amount": `${financialTransaction.amount}`,
                                    "subscriberMsisdn":financialTransaction.userRef.account,
                                    "pin":this.configService.get("OM_API_PIN"),
                                    "orderId": financialTransaction.ref,
                                    "description":financialTransaction.raison,
                                    "payToken":result.data.data.payToken
                                }
                            })
                        })
                    )
                .subscribe(
                    (data)=>{
                        console.log("data ",data)
                        resolve({ error:FinancialTransactionErrorType.NO_ERROR,token:mPayToken })
                    },
                    (error)=>{
                        // console.log("Response Data",error.response.data)
                        if(error.response.data && error.response.data.data.status=="FAILED")
                        {
                            return resolve({error:FinancialTransactionErrorType.INSUFFICIENT_AMOUNT_ERROR})
                        }
                        reject(error)
                    }
                )
            })
            .catch((error)=>  reject(error))
        }) 
    }

    openUserPrompt(financialTransaction)
    {
        this.httpService.request({
            url:`${this.configService.get<string>("OM_API_PATH")}/mp/push/${financialTransaction.token}`,
        })
    }

    check(financialTransaction: FinancialTransaction) {
        return new Promise((resolve,reject)=>{
            let token="";
            this.getToken()
            .then((result)=>{
                token = result;
                
                return this.httpService.axiosRef.request({
                    url:`${this.configService.get<string>("OM_API_PATH")}/omcoreapis/1.0.2/mp/paymentstatus/${financialTransaction.ref}`,
                    method:"get",
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "X-AUTH-TOKEN": this.configService.get("OM_API_X_AUTH_TOKEN"),
                }})})
            .then((response)=>{
                resolve({...UtilStrategyFunc.getResponseStatus(response.data) })
            }).catch( (error)=>
                {
                    // console.log("Error found ",error.response,error.response.status)
                    let resultCode = null;
                    switch(error.status)
                    {
                        case 400:
                            return resolve({...UtilStrategyFunc.getResponseStatus(error.data)});
                        case 404:
                            resultCode=ERROR_CODE.RESSOURCE_NOT_FOUND_ERROR;
                            break;
                        default:
                            resultCode=ERROR_CODE.UNKNOW_ERROR;
                    }
                    reject(resultCode)
                }
            )
        }) 
    }
    withdrawal(financialTransaction: FinancialTransaction) {
        throw new Error("Method not implemented.");
    }
    checkWithdrawal(financialTransaction: FinancialTransaction) {
        throw new Error("Method not implemented.");
    }
 
    cancel(financialTransaction: FinancialTransaction): Promise<any> {
        throw new Error("Method not implemented.");
    }

    
    
    


}