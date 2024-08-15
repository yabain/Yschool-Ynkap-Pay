import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService
{
    constructor( private jwtService:JwtService){}
    
    createApiKey(app)
    {
        const payload = {clientId:app.clientId,sub:app._id}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}