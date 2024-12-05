import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { GyerekService } from './gyerek.service';
import { CreateGyerekDto } from './dto/create-Gyerek.dto';
import { UpdateGyerekDto } from './dto/update-Gyerek.dto';

@Controller('gyerek')
export class GyerekController {
  constructor(private readonly GyerekService: GyerekService) {}

  @Post()
  create(@Body() CreateGyerekDto: CreateGyerekDto) {
    return this.GyerekService.create(CreateGyerekDto);
  }

  @Get()
  findAll() {
    return this.GyerekService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const gyerek = await this.GyerekService.findOne(+id);
    if(!gyerek){
      throw new NotFoundException('Nincs ilyen id-val rendelkező gyerek!')
    }
    return gyerek;
  }
  
  @Put(':childId/jatek/:toyId')
 async addToyToChild(@Param('childId') childId: number, @Param('toyId') toyId: number) {
    const ajandek = await this.GyerekService.addToyToChild(childId, toyId)
    if (!ajandek) {
      throw new Error('Failed to add játék to Gyerek.');
    }
    return ajandek
  }
 
  @Delete(':childId/toys/:toyId')
  removeToyFromChild(@Param('childId') childId: number, @Param('toyId') toyId: number) {
    return this.GyerekService.removeToyFromChild(childId, toyId);
  }

  @Delete(':id')
  async  remove(@Param('id') id: string) {
    if (!await this.GyerekService.remove(+id)){
      throw new  NotFoundException('Nincs ilyen id-val rendelkező gyerek!')
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateGyerekDto: UpdateGyerekDto) {
    const gyerek = await this.GyerekService.update(+id, UpdateGyerekDto);
    if(!gyerek){
      throw new NotFoundException('Nincs ilyen id-val rendelkező játék!')
    }
    return gyerek;
  }
}
