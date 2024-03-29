import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHomeDto } from './dto/home.dto';
import { Repository } from 'typeorm';
import { HomeSchema } from './entities/home.entity';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { HomeImageSchema } from './entities/homeImage.entity';
import { CouponService } from 'src/modules/coupon/coupon.service';
import { classToPlain } from 'class-transformer';
import { HttpStatusCode } from 'axios';
import { UserService } from '../user/user.service';

@Injectable()
export class HomeService {
  constructor(
    @Inject('HOME_REPOSITORY')
    private homeRepository: Repository<HomeSchema>,
    @Inject('HOMEIMAGE_REPOSITORY')
    private homeImageRepository: Repository<HomeImageSchema>,
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
    private couponService: CouponService,
  ) {}

  async create(body: CreateHomeDto): Promise<HomeSchema> {
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

    const user = await this.userService.findByKeyword(email);

    if (!user || user.role != 'host') {
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }
    const newHome = new HomeSchema();
    newHome.title = title;
    newHome.price = price;
    newHome.address = address;
    newHome.bathrooms = bathrooms;
    newHome.bedrooms = bedrooms;
    newHome.description = description;
    newHome.idCategory = Number(idCategory);
    newHome.idUser = user.idUser;
    const newHomeSaved = await newHome.save();
    for (let i = 0; i < files.length; i++) {
      this.homeImageRepository
        .createQueryBuilder()
        .insert()
        .into(HomeImageSchema)
        .values({
          urlHomeImage: files[i],
          idHome: newHomeSaved,
        })
        .execute();
    }

    return newHome;
  }

  async uploadImage(files: Array<Express.Multer.File>) {
    const newFiles = [];
    for (let i = 0; i < files.length; i++) {
      const newFile = await this.cloudinaryService.uploadImage(files[i]);
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
    return this.findAll(keyword.page);
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
        'coupons',
        'coupons.isDeleted',
        'orders.checkin',
        'orders.checkout',
        'homes.idCoupon',
      ])
      .leftJoin('homes.idUser', 'users')
      .leftJoin('homes.idCategory', 'categories')
      .leftJoin('homes.images', 'homeImages')
      .leftJoin('homes.orders', 'orders')
      .leftJoin('homes.idCoupon', 'coupons')
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
        .leftJoinAndSelect('homes.idCoupon', 'coupons')
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
      .leftJoinAndSelect('homes.idCoupon', 'coupons')
      .where('homes.idUser = :id', { id: idUser })
      .leftJoinAndSelect('homes.orders', 'orders')
      .leftJoinAndSelect('orders.idUser', 'customers')
      .leftJoin('orders.idHome', 'home')
      .getMany();
  }

  async searchHome(keyword: any): Promise<any> {
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

  async findAll(page: number): Promise<HomeSchema[]> {
    const itemsPerPage = 12;
    let skip = 0;
    if (page > 0) {
      skip = (page - 1) * 12;
    }

    return this.homeRepository
      .createQueryBuilder('homes')
      .select([
        'homes',
        'coupons',
        'users.idUser.idUser',
        'users.idUser.email',
        'users.idUser.phone',
        'users.idUser.image',
        'homeImages.urlHomeImage',
      ])
      .leftJoin('homes.idUser', 'users.idUser')
      .leftJoinAndSelect('homes.idCategory', 'categories.idCateogry')
      .leftJoin('homes.idCoupon', 'coupons')
      .leftJoin('homes.images', 'homeImages')
      .orderBy('homes.idHome', 'DESC')
      .skip(skip)
      .take(itemsPerPage)
      .getMany();
  }

  async updateStatus(idHome: number, status: boolean): Promise<any> {
    return this.homeRepository
      .createQueryBuilder()
      .update(HomeSchema)
      .set({
        status,
      })
      .where('idHome = :id', { id: idHome })
      .execute();
  }

  async getrevenue(query) {
    if (query.month && query.year) {
      return this.homeRepository
        .createQueryBuilder('homes')
        .select('homes.title')
        .addSelect('SUM(orders.charged)', 'revenue')
        .innerJoin('orders', 'orders', 'homes.idHome = orders.home')
        .where('homes.idUser = :userId', { userId: query.idUser })
        .andWhere('orders.checkin >= :startDate', {
          startDate: `${query.year}-${query.month}-01`,
        })
        .andWhere('orders.checkin <= :endDate', {
          endDate: `${query.year}-${query.month}-30`,
        })
        .groupBy('homes.idHome')
        .getRawMany();
    } else {
      const getMonth = new Date();
      const currentMonth = getMonth.getMonth() + 1;
      const getYear = new Date().getFullYear();
      return this.homeRepository
        .createQueryBuilder('homes')
        .select('homes.title')
        .addSelect('SUM(orders.charged)', 'revenue')
        .innerJoin('orders', 'orders', 'homes.idHome = orders.home')
        .where('homes.idUser = :userId', { userId: query.idUser })
        .andWhere('orders.checkin >= :startDate', {
          startDate: `${getYear}-${currentMonth}-01`,
        })
        .andWhere('orders.checkin <= :endDate', {
          endDate: `${getYear}-${currentMonth}-30`,
        })
        .groupBy('homes.idHome')
        .getRawMany();
    }
  }

  async getTop(): Promise<any> {
    return this.homeRepository
      .createQueryBuilder('homes')
      .leftJoin('homes.orders', 'orders')
      .leftJoin('homes.idCategory', 'categories')
      .leftJoin('homes.images', 'images')
      .select([
        'homes',
        'orders',
        'COUNT(orders.idOrder) as countOrder',
        'categories.categoryName',
        'images',
      ])
      .groupBy('homes.idHome')
      .orderBy('countOrder', 'DESC')
      .limit(5)
      .getMany();
  }

  async patch(body: any): Promise<any> {
    if (body.idCoupon) {
      return this.updateCoupon(body);
    } else if (body.price) {
      return this.updatePrice(body);
    }
  }

  async updatePrice({ price, idHome }) {
    console.log(price, idHome);
    return this.homeRepository.update({ idHome }, { price });
  }

  async updateCoupon(body: any) {
    if (body.idCoupon > 0) {
      const coupon = await this.couponService.findByKeyword(body);
      const couponObj = classToPlain(coupon);

      const dateNow = new Date();
      const now = dateNow.getTime();
      const endDate = new Date(couponObj.endDate);
      const end = endDate.getTime();
      if (now > end) {
        throw new HttpException('Coupon is expired', HttpStatus.BAD_REQUEST);
      }
      await this.homeRepository.update(
        { idHome: body.idHome },
        { idCoupon: body.idCoupon },
      );
    } else {
      await this.homeRepository.update(
        { idHome: body.idHome },
        { idCoupon: null },
      );
    }
    return HttpStatusCode.Accepted;
  }
}
