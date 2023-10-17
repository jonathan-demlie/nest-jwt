import { PrismaService } from "src/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt_strategy";
import { UsersService } from "src/users/users.service";
import { Module } from "@nestjs/common";

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, UsersService],
})
export class AuthModule{}