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
  
  @Put(':gyerekId/jatek/:jatekId')
  async addToyToChild(@Param('gyerekId') gyerekId: string, @Param('jatekId') jatekId: string) {
    const result = await this.GyerekService.addToyToChild(+gyerekId, +jatekId);
    if (!result) {
      throw new NotFoundException('Nincs ilyen ID-val rendelkező gyerek vagy játék!');
    }
    return result;
  }
  @Delete(':gyerekId/jatek/:jatekId')
  async removeToyFromChild(@Param('gyerekId') gyerekId: string, @Param('jatekId') jatekId: string) {
    const result = await this.GyerekService.removeToyFromChild(+gyerekId, +jatekId);
    if (!result) {
      throw new NotFoundException('Nincs ilyen ID-val rendelkező gyerek vagy játék!');
    }
    return result;
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
