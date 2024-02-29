import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.userModel.create(user);
  }

  async loginUser(email: string, pass: string): Promise<CreateUserDto | null> {
    const user = await this.userModel.findOne({ 'user.email': email });

    if (!user) {
      throw new NotFoundException(`User with ${email} is not found`);
    }

    const comparePass = await this.bcrypt.comparePassword(
      pass,
      user.user[0].password,
    );

    if (!comparePass) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user._id, userName: user.user[0].userName };

    return {
      ...user.toJSON(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findUserByEmail(email: string): Promise<CreateUserDto | null> {
    return await this.userModel.findOne({ 'user.email': email });
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUser(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
