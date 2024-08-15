import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDTO } from "../dtos/login-user.dto";
import { UserSchema } from "../models";
import { PasswordUtil } from "../utils";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService
{
  constructor(private usersService:UsersService, private jwtService:JwtService){}

  async validateUser(loginUserDTO:LoginUserDTO)
  {
    const user = await this.usersService.findOneByField({email:loginUserDTO.email});
    if(user && PasswordUtil.compare(user.password,loginUserDTO.password)) return user;

    return null;
  }

  login(user)
  {
    const payload = {email:user.email, permissions:[user.permissions],sub:user._id}
    return {
        access_token: this.jwtService.sign(payload)
    }
  }
}