import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotificationSchema, NotificationStatus } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<NotificationSchema>,
  ) { }

  async create({ message, dataUrl, idUser }): Promise<NotificationSchema> {
    const newNotification = { message, dataUrl, user: idUser }
    return this.notificationRepository.save(newNotification);
  }

  async findByIdUser(idUser: number): Promise<any> {    
    return this.notificationRepository.find({
      where: { user: idUser }
    });
  }

  async updateStatus(idNotification: number): Promise<any> {
    console.log(idNotification);
    
    return this.notificationRepository.
      createQueryBuilder()
      .update(NotificationSchema)
      .set({ status: 'seen' })
      .where('idNotification = :id', { id: idNotification })
      .execute();
  }
}
