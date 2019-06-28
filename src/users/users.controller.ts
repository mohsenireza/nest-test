import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<User> {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.userService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateUserDto: CreateUserDto): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }
}
