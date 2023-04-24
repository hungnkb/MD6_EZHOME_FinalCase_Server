import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io'

@WebSocketGateway({
  namespace: '/notifications'
})
export class NotificationGateway {
  @WebSocketServer() wss: Server;

  @SubscribeMessage('send')
  handleMessage(client: any, payload: any): string {
    this.wss.emit('getNotification', payload)
    return 
  }
}
