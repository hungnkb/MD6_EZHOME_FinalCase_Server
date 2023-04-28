import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NotificationSchema, NotificationStatus } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<NotificationSchema>,
  ) { }

  async create({ message, dataUrl, idUser }): Promise<NotificationSchema> {
    const newNotification = { message, dataUrl, user: idUser };
    return this.notificationRepository.save(newNotification);
  }

  async findByIdUser({ idUser, page }): Promise<any> {
    const itemPerPage = 5;

    if (page > 0) {
      const skip = (page - 1) * itemPerPage;

      const result = await this.notificationRepository
        .createQueryBuilder()
        .where('user = :id', { id: Number(idUser) })
        .skip(skip)
        .take(5)
        .orderBy('createdAt', 'DESC')
        .getMany();

      const total = await this.findTotalUnseen(idUser);

      return { result, total }
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }

  async findTotalUnseen(idUser: number) {
    const result = await this.notificationRepository
      .createQueryBuilder('notifications')
      .where('user = :id', { id: Number(idUser) })
      .andWhere('notifications.status = :status', {status: NotificationStatus._UNSEEN})
      .getMany();
    const total = result.length
    return total;
  }

  async updateStatus(idNotification: any): Promise<any> {
    return this.notificationRepository.update(idNotification, {
      status: NotificationStatus._SEEN,
    });
  }
}
