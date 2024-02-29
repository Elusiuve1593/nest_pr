import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: CreateUserDto): Promise<User> {
    const existMail: CreateUserDto | null =
      await this.userService.findUserByEmail(userDto.user[0].email);

    if (existMail) {
      throw new HttpException(
        `The ${existMail.user[0].email} has already exist!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.createUser(userDto);
  }

  @Post('login')
  async loginUser(@Body() loginUser: CreateUserDto): Promise<any> {
    return this.userService.loginUser(
      loginUser.user[0].email,
      loginUser.user[0].password,
    );
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
