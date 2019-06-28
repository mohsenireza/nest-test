import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { loginDto } from '../auth/dto/login.dto';
import { Payload } from '../types/payload';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        console.log("find all users")
        return await this.userModel.find();
    }

    async findOne(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id })
    }

    async findOneByPayload(payload: Payload) {
        const { username } = payload;
        return await this.userModel.findOne({ username });
    }

    async findOneByLogin(loginDto: loginDto) {
        const {username, password} = loginDto;
        const user = await this.userModel.findOne({username: username});
        if(!user) {
            throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
        }
        //TODO: hash password
        if(user.password === password) {
            return user;
        }
        else {
            throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
        }
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    async update(id: string, item: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, item, { new: true });
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id);
    }
}
