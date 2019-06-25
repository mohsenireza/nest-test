import { Controller, Get, Post, Put, Delete, Body, Param} from '@nestjs/common';
import {CreateItemDto as CreateItemDto} from './dto/create-item.dto'
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}

    @Get()
    findAll(): Promise<Item[]> {
        return this.itemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Item> {
        return this.itemService.findOne(id);
    }

    @Post()
    create(@Body() createItemDto: CreateItemDto): Promise<Item>{
        return this.itemService.create(createItemDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Item> {
        return this.itemService.delete(id);
    }

    @Put(':id')
    update(@Param('id') id, @Body() updateItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.update(id, updateItemDto);
    }
}
