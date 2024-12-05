import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { JatekService } from './jatek.service';
import { CreateJatekDto } from './dto/create-jatek.dto';
import { UpdateJatekDto } from './dto/update-jatek.dto';

@Controller('jatek')
export class JatekController {
  constructor(private readonly JatekService: JatekService) {}

  @Post()
  create(@Body() CreateJatekDto: CreateJatekDto) {
    return this.JatekService.create(CreateJatekDto);
  }

  @Get()
  findAll() {
    return this.JatekService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const jatek = await this.JatekService.findOne(+id);
    if(!jatek){
      throw new NotFoundException('Nincs ilyen id-val rendelkező játék!')
    }
    return jatek;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateJatekDto: UpdateJatekDto) {
    const jatek = await this.JatekService.update(+id, UpdateJatekDto);
    if(!jatek){
      throw new NotFoundException('Nincs ilyen id-val rendelkező játék!')
    }
    return jatek;
  }

  @Delete(':id')
  async  remove(@Param('id') id: string) {
    if (!await this.JatekService.remove(+id)){
      throw new  NotFoundException('Nincs ilyen id-val rendelkező játék!')
    }
  }
}
