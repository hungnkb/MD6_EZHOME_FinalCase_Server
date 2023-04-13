import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHomeDto } from './dto/home.dto';
import { UserSchema } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { HomeSchema } from './entities/home.entity';

@Injectable()
export class HomeService {
  constructor(
    @Inject('HOME_REPOSITORY')
    private homeRepository: Repository<HomeSchema>,
    private userService: UserService,
  ) {}

  async create(body: CreateHomeDto): Promise<Object> {
    let {
      title,
      price,
      address,
      bathrooms,
      bedrooms,
      description,
      email,
      idCategory,
    } = body;
    let user = await this.userService.findByKeyword(email);
    if (!user || user.role != 'host') {
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }
    let newHome = await this.homeRepository
      .createQueryBuilder()
      .insert()
      .into(HomeSchema)
      .values({
        title,
        price,
        address,
        bathrooms,
        bedrooms,
        description,
        idCategory: parseInt(idCategory),
        idUser: user.idUser,
      })
      .execute();

    return newHome;
  }

  async findByKeyword(keyword): Promise<HomeSchema[] | undefined> {
    if (keyword.idUser) {
      return this.findByIdUser(keyword.idUser);
    } else if (keyword.idHome) {
      return this.findByIdHome(keyword.idHome);
    }
    return this.findAll();
  }

  async findByIdHome(idHome: string) {
    return this.homeRepository
      .createQueryBuilder('homes')
      .select([
        'homes',
        'users.idUser',
        'users.email',
        'users.phone',
        'users.image',
        'categories.categoryName',
      ])
      .leftJoin('homes.idUser', 'users')
      .leftJoin('homes.idCategory', 'categories')
      .where('idHome = :id', { id: idHome })
      .getMany();
  }

  async findByIdUser(idUser: string) {
    return this.homeRepository
      .createQueryBuilder('homes')
      .select([
        'homes',
        'users.idUser',
        'users.email',
        'users.phone',
        'users.image',
      ])
      .leftJoin('homes.idUser', 'users')
      .where('homes.idUser = :id', { id: idUser })
      .getMany();
  }

  async findAll() {
    return this.homeRepository
      .createQueryBuilder('homes')
      .select([
        'homes',
        'users.idUser.idUser',
        'users.idUser.email',
        'users.idUser.phone',
        'users.idUser.image',
      ])
      .leftJoin('homes.idUser', 'users.idUser')
      .leftJoinAndSelect('homes.idCategory', 'categories.idCateogry')
      .getMany();
  }
}
