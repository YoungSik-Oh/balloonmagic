import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/@database/entity/user.entity';
import { Repository } from 'typeorm';
import { UserRegistVo } from './vo/user-regist.vo';
import e from 'express';
import { UserUpdateVo } from './vo/user-update.vo';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async userLogin({ id, pwd }): Promise<User> {
    const user: User = await this.userRepository
      .findOneOrFail({
        where: {
          userID: id,
        },
      })
      .catch((error) => {
        this.logger.log(error);
        throw new BadRequestException(
          `${id}는 존재하지 않는 아이디 입니다. 다시 확인해 주세요.`
        );
      });

    const validatePassword = await bcrypt.compare(pwd, user.pwd);

    if (!user || !validatePassword) {
      throw new BadRequestException(
        '비밀번호가 일치하지 않거나 유저가 존재하지 않습니다.'
      );
    }

    return user;
  }

  async getAllUsers(pagination: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, pagination, {});
  }

  async fildOneUser(uuid: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { uuid } }).catch(() => {
      throw new NotFoundException('조회된 고객이 없습니다.');
    });
  }

  async createUser(registData: UserRegistVo): Promise<User> {
    const { userID, name, pwd, email, phone, authority } = registData;
    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(pwd, salt);

    const saveData = this.userRepository.create({
      userID: userID,
      name: name,
      pwd: hashedPwd,
      email: email,
      phone: phone,
      authority: authority,
      registAt: new Date().toJSON(),
    });
    return this.userRepository.save(saveData);
  }

  async updateUser(uuid: string, updateData: UserUpdateVo): Promise<User> {
    const findUser = await this.fildOneUser(uuid);
    const { email, phone, authority, name, pwd } = updateData;
    const salt = await bcrypt.genSalt();
    let hashedPwd = '';
    if (pwd) {
      hashedPwd = await bcrypt.hash(pwd, salt);
    }
    await this.userRepository.update(findUser.uuid, {
      name: name,
      pwd: pwd ? hashedPwd : findUser.pwd,
      email: email,
      phone: phone,
      authority: authority,
      updateAt: new Date().toJSON(),
    });

    return this.fildOneUser(uuid);
  }

  async deleteUser(uuid: string): Promise<User> {
    const findUser = await this.fildOneUser(uuid);
    return this.userRepository.remove(findUser);
  }
}
