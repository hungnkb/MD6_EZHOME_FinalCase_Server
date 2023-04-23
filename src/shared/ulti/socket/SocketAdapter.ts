import { IoAdapter } from "@nestjs/platform-socket.io";

export class SocketAdapter extends IoAdapter {
    createIOServer(
        port: number,
        options?: {
            namespace?: string;
            server?: any;
        },
    ) {
        const server = super.createIOServer(port, {
            ...options,
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        });
        return server;
    }
}