import { PrismaClient } from '@prisma/client';
import { INestApplication, OnModuleInit } from '@nestjs/common';

export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {}

    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
}
