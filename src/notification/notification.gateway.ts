import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway({
  namespace: '/notifications',
})
export class NotificationGateway {
  constructor(private notificationService: NotificationService) { }

  @WebSocketServer() wss: Server;

  @SubscribeMessage('send')
  async handleMessage(client: any, payload: any) {
    this.wss.emit('getNotification', payload);
    await this.notificationService.create({ message: payload.message, dataUrl: payload.dataUrl, idUser: payload.idReciever })
    return;
  }
}
