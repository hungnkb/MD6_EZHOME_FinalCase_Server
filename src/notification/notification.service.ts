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
    const newNotification = { message, dataUrl, user: idUser }
    return this.notificationRepository.save(newNotification);
  }

  async findByIdUser({idUser, page}): Promise<any> {
    const itemPerPage = 5;
    
    if (page > 0) {
      const skip = (page - 1) * itemPerPage;   
      
      return this.notificationRepository
      .createQueryBuilder()
      .where('user = :id', {id: idUser})
      .skip(skip)
      .take(5)
      .getMany()
      // find({
      //   where: { user: parseInt(idUser) },
      //   skip: skip,
      //   take: itemPerPage,
      // });
    }
    throw new HttpException('Bad request', HttpStatus.BAD_REQUEST)
  }

  async updateStatus(idNotification: any): Promise<any> {
    return this.notificationRepository.update(
      idNotification, {
      status: NotificationStatus._SEEN
    });
  }
}
