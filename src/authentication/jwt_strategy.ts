import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, // Corrected property name
        });
    }

    async validate(payload: { username: string }) {
        const user = await this.prismaService.users.findUnique({
            where: {
                username: payload.username,
            }
        });
        return user;
    }
}
