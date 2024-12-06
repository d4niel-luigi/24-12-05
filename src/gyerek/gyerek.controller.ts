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
  
  @Put(':childId/toys/:toyId')
  async addToyToChild(
    @Param('childId') childId: string,
    @Param('toyId') toyId: string,
  ) {
    const childIdNum = parseInt(childId, 10);
    const toyIdNum = parseInt(toyId, 10);
   
    const response = await this.GyerekService.addToyToChild(childIdNum, toyIdNum);
    if (!response) {
      throw new NotFoundException(`Failed to add toy ID ${toyId} to child ID ${childId}`);
    }
    return response;
   
  
  }
  @Delete(':childId/toys/:toyId')
  async removeToyFromChild(
    @Param('childId') childId: string,
    @Param('toyId') toyId: string,
  ) {
    const childIdNum = parseInt(childId, 10);
    const toyIdNum = parseInt(toyId, 10);
   
    const response = await this.GyerekService.removeToyFromChild(childIdNum, toyIdNum);
    if (!response) {
      throw new NotFoundException(`Failed to remove toy ID ${toyId} from child ID ${childId}`);
    }
    return response;
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
