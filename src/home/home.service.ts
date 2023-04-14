import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHomeDto } from './dto/home.dto';
import { UserSchema } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { HomeSchema } from './entities/home.entity';
import { CloudinaryService, OtherService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class HomeService {
  constructor(
    @Inject('HOME_REPOSITORY')
    private homeRepository: Repository<HomeSchema>,
    private userService: UserService,
    private imageService: OtherService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(body: CreateHomeDto): Promise<Object> {
    console.log(body);
    
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
    console.log('files', files);
    
    
    let user = await this.userService.findByKeyword(email);
    
    if (!user || user.role != 'host') {
      throw new HttpException('Unauthorized', HttpStatus.BAD_REQUEST);
    }

    let newFiles: object[];

    // for (let i=0; i < files.length; i++) {
      
    //   if (newFile) {newFiles.push(newFile)}
    // }
    let newFile = await this.cloudinaryService.uploadImage(files[0])
    console.log(3333, newFile);
    
    console.log(1111, files);
    
    console.log(2222,newFiles);
    
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

  async uploadImage(files: Array<Express.Multer.File>): Promise<Object> {
    let newFiles = [];
     for (let i=0; i < files.length; i++) {
      let newFile = await this.cloudinaryService.uploadImage(files[i]);
      if (newFile) {newFiles.push(newFile)}; // thêm cập nhật db
    }
    return newFiles
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
