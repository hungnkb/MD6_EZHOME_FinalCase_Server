import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReviewSchema } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private reviewRepository: Repository<ReviewSchema>,
  ) {}
  async create(body): Promise<Object> {
    console.log(body, 11);
    return this.reviewRepository.save(body);
  }
  async findByKeyword(keyword): Promise<Object> {
    if (keyword.idReview) {
      return this.findByIdReview(keyword.idReview);
    } else if (keyword.idUser) {
      return this.findByIdUser(keyword.idUser);
    } else if (keyword.idHome) {
      return this.findByIdHome(keyword.idHome);
    }
    return this.findAll();
  }
  async findAll() {
    return this.reviewRepository
      .createQueryBuilder('reviews')
      .select([
        'reviews',
        'users.idUser',
        'users.email',
        'users.image',
        'homes.title',
        'homes.idHome',
      ])
      .leftJoin('reviews.idUser', 'users')
      .leftJoin('reviews.idHome', 'homes')
      .getMany();
  }

    async findByIdUser(idUser: number): Promise<Object> {
        // return this.orderRepository.find({
        //     relations: ['idUser', 'idHome'],
        //     loadRelationIds: true,
        //     where: {
        //         idUser
        //     }
        // })
        return this.reviewRepository
            .createQueryBuilder('reviews')
            .where({idUser})
            .select([
                'reviews',
                'users.email',
                'users.image',
                'users.idUser',
                'homes.idHome',
                'homes.title',
            ])
            .leftJoin('reviews.idHome', 'homes.idHome')
            .leftJoin('reviews.idUser', 'users.idUser')
            .getMany()
    }
    async findByIdHome(idHome: number): Promise<Object> {
        // return this.orderRepository.find({
        //     relations: ['idUser', 'idHome'],
        //     loadRelationIds: true,
        //     where: {
        //         idHome
        //     }
        // })
        return this.reviewRepository
            .createQueryBuilder('reviews')
            .where({idHome})
            .select([
                'reviews',
                'users.email',
                'users.image',
                'users.idUser',
                'homes.idHome',
                'homes.title',
            ])
            .leftJoin('reviews.idHome', 'homes')
            .leftJoin('reviews.idUser', 'users')
            .getMany()
    }

    async findByIdReview(idReview: number): Promise<any> {
        // return this.orderRepository.findOneOrFail({
        //     relations: ['users', 'homes'],
        //     loadRelationIds: true,
        //     where: {
        //         idOrder
        //     },
        // });
        return this.reviewRepository
            .createQueryBuilder('reviews')
            .where({idReview})
            .select([
                'reviews',
                'users.email',
                'users.image',
                'users.idUser',
                'homes.idHome',
                'homes.title',
            ])
            .leftJoin('reviews.idHome', 'homes')
            .leftJoin('reviews.idUser', 'users')
            .getOne()
    }
}
