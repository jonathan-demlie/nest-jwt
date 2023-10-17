import { request } from "http";
import { UsersService } from "./users.service";
import { Response, Request } from "express";
import { Controller, Get, Req, Res } from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(private readonly userSevice: UsersService) { }

    @Get()
    async getAllUsers(@Req() request: Request, @Res() response: Response): Promise<any> {


        try {

            const result = await this.userSevice.getAllUser();
            return response.status(200).json({
                status: 'ok!',
                message: 'sent successfully',
                result: result,
            })


        } catch (err) {
            return response.status(500).json({
                status: 'Ok!',
                message: 'internal server error',
            })

        }
    }
}