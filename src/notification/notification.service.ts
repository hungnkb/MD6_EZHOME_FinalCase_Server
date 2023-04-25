import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotificationSchema } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<NotificationSchema>,
  ) { }

  async create({ message, dataUrl, idUser }) {
    return this.notificationRepository.save({
      message,
      dataUrl,
      user: idUser,
    });
  }

  async findByIdUser(idUser: number): Promise<any> {
    return this.notificationRepository.find({
      where: { user: idUser }
    });
  }
}
