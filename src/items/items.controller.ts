import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import {CreateItemDto as CreateItemDto} from './dto/create-item.dto'
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { type } from 'os';
import { CustomPipe } from './pipes/customPipe';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}

    // @Get()
    // @UseGuards(RoleGuard)
    // @Roles('admin')
    // findAll(): Promise<Item[]> {
    //     return this.itemService.findAll();
    // }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(): Promise<Item[]> {
        return this.itemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Item> {
        return this.itemService.findOne(id);
    }

    @Post()
    //@UsePipes(new CustomPipe(), new ValidationPipe())
    create(@Body(new CustomPipe(), new ValidationPipe()) createItemDto: CreateItemDto): Promise<Item>{
        return this.itemService.create(createItemDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Item> {
        return this.itemService.delete(id);
    }

    @Put(':id')
    @UsePipes(new CustomPipe(), new ValidationPipe())
    update(@Param('id') id, @Body() updateItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.update(id, updateItemDto);
    }
}
