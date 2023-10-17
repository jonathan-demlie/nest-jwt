import { Controller, Post, Req, Res, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login-user.dto";
import { Request , Response } from "express";

@Controller()
export class AuthController {
    constructor (private readonly authService: AuthService){}
        @Post()
        async login(@Req() request:Request, @Res() response:Response, @Body() loginDto:LoginDto):Promise<any>{
try{
    const result = await  this.authService.login(loginDto);
    return response.status(200).json({
        status: 'Ok!',
        message: 'successfully loggesin',
        result: result,
    })

}
catch(err){
    return response.status(500).json({
        status: 'Ok!',
        message: 'Internal server error',
    })

}
        }
    }
