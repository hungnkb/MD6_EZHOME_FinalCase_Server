import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHomeDto } from './dto/home.dto';
import { UserSchema } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { HomeSchema } from './entities/home.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { HomeImageSchema } from './entities/homeImage.entity';
import { log } from 'console';

@Injectable()
export class HomeService {
  constructor(
    @Inject('HOME_REPOSITORY')
    private homeRepository: Repository<HomeSchema>,
    @Inject('HOMEIMAGE_REPOSITORY')
    private homeImageRepository: Repository<HomeImageSchema>,
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(body: CreateHomeDto): Promise<Object> {
    const {
      title,
      price,
      address,
      bathrooms,
      bedrooms,
      description,
      email,
      idCategory,
      files,
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

    for (let i = 0; i < files.length; i++) {
      this.homeImageRepository
        .createQueryBuilder()
        .insert()
        .into(HomeImageSchema)
        .values({
          urlHomeImage: files[i],
          idHome: newHome.identifiers[0].idHome,
        })
        .execute();
    }

    return newHome;
  }

  async uploadImage(files: Array<Express.Multer.File>): Promise<Object> {
    let newFiles = [];
    for (let i = 0; i < files.length; i++) {
      let newFile = await this.cloudinaryService.uploadImage(files[i]);
      if (newFile) {
        newFiles.push(newFile);
      }
    }
    return newFiles;
  }

  async findByKeyword(keyword): Promise<HomeSchema[] | undefined> {
    if (keyword.idUser) {
      return this.findByIdUser(keyword.idUser, keyword.status);
    } else if (keyword.idHome) {
      return this.findByIdHome(keyword.idHome);
    } else if (
      keyword.address ||
      keyword.bathrooms ||
      keyword.bedrooms ||
      keyword.minPrice ||
      (keyword.checkin && keyword.checkout)
    ) {
      return this.searchHome(keyword);
    }
    return this.findAll();
  }

  async findByIdHome(idHome: number): Promise<HomeSchema[]> {
    return this.homeRepository
      .createQueryBuilder('homes')
      .select([
        'homes',
        'users.idUser',
        'users.email',
        'users.phone',
        'categories.categoryName',
        'homeImages.urlHomeImage',
        'orders.checkin',
        'orders.checkout',
      ])
      .leftJoin('homes.idUser', 'users')
      .leftJoin('homes.idCategory', 'categories')
      .leftJoin('homes.images', 'homeImages')
      .leftJoin('homes.orders', 'orders')
      .where('homes.idHome = :id', { id: idHome })
      .getMany();
  }

  async findByIdUser(idUser: string, status: string) {
    if (status) {
      return this.homeRepository
        .createQueryBuilder('homes')
        .select([
          'homes',
          'users.idUser',
          'users.email',
          'users.phone',
          'categories.categoryName',
          'homeImages.urlHomeImage',
          'home.title',
          'home.address',
          'orders.status',
        ])
        .leftJoin('homes.idUser', 'users')
        .leftJoin('homes.idCategory', 'categories')
        .leftJoin('homes.images', 'homeImages')
        .where('homes.idUser = :id', { id: idUser })
        .leftJoinAndSelect('homes.orders', 'orders')
        .leftJoinAndSelect('orders.idUser', 'customers')
        .leftJoin('orders.idHome', 'home')
        .andWhere('orders.status = :status', { status: `${status}` })
        .getMany();
    }
    return this.homeRepository
      .createQueryBuilder('homes')
      .select([
        'homes',
        'users.idUser',
        'users.email',
        'users.phone',
        'categories.categoryName',
        'homeImages.urlHomeImage',
        'home.title',
        'home.address',
      ])
      .leftJoin('homes.idUser', 'users')
      .leftJoin('homes.idCategory', 'categories')
      .leftJoin('homes.images', 'homeImages')
      .where('homes.idUser = :id', { id: idUser })
      .leftJoinAndSelect('homes.orders', 'orders')
      .leftJoinAndSelect('orders.idUser', 'customers')
      .leftJoin('orders.idHome', 'home')
      .getMany();
  }

  async searchHome(keyword): Promise<any> {
    const {
      address,
      bedrooms,
      bathrooms,
      checkin,
      checkout,
      minPrice,
      maxPrice,
    } = keyword;
    const trimAddress = address ? address.replace(/ /g, '') : '';

    return this.homeRepository
      .createQueryBuilder('homes')
      .select([
        'homes',
        'users.idUser.idUser',
        'users.idUser.email',
        'users.idUser.phone',
        'users.idUser.image',
        'homeImages.urlHomeImage',
      ])
      .where(
        address
          ? "REPLACE(homes.address, ' ', '') LIKE '%' :address '%'"
          : '1=1',
        { address: trimAddress },
      )
      .andWhere(bathrooms ? 'homes.bathrooms = :bathrooms' : '1=1', {
        bathrooms,
      })
      .andWhere(bedrooms ? 'homes.bedrooms = :bathrooms' : '1=1', { bedrooms })
      .andWhere(minPrice ? 'homes.price >= :minPrice' : '1=1', {
        minPrice: Number(minPrice),
      })
      .andWhere(maxPrice ? 'homes.price <= :maxPrice' : '1=1', {
        maxPrice: Number(maxPrice),
      })
      .leftJoin('homes.idUser', 'users.idUser')
      .leftJoinAndSelect('homes.idCategory', 'categories.idCateogry')
      .leftJoin('homes.images', 'homeImages')
      .leftJoinAndSelect('homes.orders', 'orders')
      .groupBy('homes.idHome')
      .having(
        checkout
          ? 'orders.checkin >= CAST(:checkout as date) OR orders.checkin IS NULL'
          : '1=1',
        { checkout },
      )
      .andHaving(
        checkin
          ? 'orders.checkout <= CAST(:checkin as date) OR orders.checkout IS NULL'
          : '1=1',
        { checkin },
      )
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
        'homeImages.urlHomeImage',
      ])
      .leftJoin('homes.idUser', 'users.idUser')
      .leftJoinAndSelect('homes.idCategory', 'categories.idCateogry')
      .leftJoin('homes.images', 'homeImages')
      .getMany();
  }

  async updateStatus(idHome: number, status: boolean) {
    return this.homeRepository
      .createQueryBuilder()
      .update(HomeSchema)
      .set({
        status,
      })
      .where('idHome = :id', { id: idHome })
      .execute();
  }
}
