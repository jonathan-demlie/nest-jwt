import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from "./dto/register-user.dto";
import { Users } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UsersService
        ) {}

    async login(loginDto: LoginDto): Promise<any> {
        const { username, password } = loginDto;
        const user = await this.prismaService.users.findUnique({
            where: { username }
        })
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            throw new NotFoundException('Invalid Password');
        }
        return {
            token: this.jwtService.sign({ username })
        };
    }

    async register(createDto: RegisterUsersDto): Promise<any> {
        const hashedPassword = await bcrypt.hash(createDto.password, 10);

        // Use the Prisma-generated Users model to create a new user
        const user = await this.prismaService.users.create({
            data: {
                name: createDto.name,
                email: createDto.email,
                username: createDto.username,
                password: hashedPassword,
            }
        });

        return {
            token: this.jwtService.sign({ username: user.username })
        };
    }
}
