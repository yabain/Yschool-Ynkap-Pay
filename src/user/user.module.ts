import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers";
import { User, UserSchema } from "./models";
import { AuthService, UsersService } from "./services";
import { AuthLocalStrategy } from "./strategies";
import { PasswordUtil } from "./utils";
import { JWT_CONSTANT } from "src/shared/config";
import { AuthJwtStrategy } from "./strategies/auth-jwt.strategy";


@Module({
    imports:[
        MongooseModule.forFeatureAsync([
        {
            name:User.name,
            useFactory: ()=>{
                const schema = UserSchema
                schema.pre("save",function (next){
                    this.password=PasswordUtil.hash(this.password)
                    next();
                })
                return schema;
            }
        }]),
        PassportModule,
        JwtModule.register({
            secret:JWT_CONSTANT.secret,
            signOptions: { expiresIn: JWT_CONSTANT.expiresIn }
        })
    ],
    controllers:[AuthController],
    providers:[UsersService,AuthService,AuthLocalStrategy,AuthJwtStrategy],
    exports:[UsersService,AuthService,AuthJwtStrategy,JwtModule]
})
export class UserModule{}