import { ConflictException, Injectable } from "@nestjs/common";
import { Users } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }
    async getAllUser(): Promise<Users[]> {
        return this.prisma.users.findMany()
    }

    async createUser(data: Users): Promise<Users> {
        const exsistingUser = await this.prisma.users.findUnique({
            where: {
                username: data.username
            }

        })
        if (exsistingUser) {
            throw new ConflictException('username already exists');
        }
        return this.prisma.users.create({
            data
        })
    }
}