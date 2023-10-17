import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from "src/prisma.service";


export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly prismaService:PrismaService ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderBearerToken(),
            ignoreExpiration: false,
            secretOrkey: process.env.JWT_SECRET,
        })
    }
    async validate(payload:{username:string}){
        const users = await  this.prismaService.users.findUnique({
            where: {
                username: payload.username,
            }
        })
        return users;
    }
}