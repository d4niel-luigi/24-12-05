import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGyerekDto } from './dto/create-gyerek.dto';
import { UpdateGyerekDto } from './dto/update-gyerek.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GyerekService {
  constructor(private readonly db: PrismaService){}
  create(createGyerekDto: CreateGyerekDto) {
    return 'This action adds a new gyerek';
  }

  findAll() {
    return this.db.gyerek.findMany();
  }

  findOne(id: number) {
    return this.db.gyerek.findUnique({where: {id: id}});
  }
  async addToyToChild(gyerekId: number, jatekId: number) {
    try {
      const gyerek = await this.db.gyerek.findUnique({
        where: { id: gyerekId },
        include: { jatekok: true },
      });
  
      const jatek = await this.db.jatek.findUnique({
        where: { id: jatekId },
      });
  
      if (!gyerek || !jatek) {
        return null;
      }
  
      await this.db.gyerek.update({
        where: { id: gyerekId },
        data: {
          jatekok: {
            connect: { id: jatekId },
          },
        },
      });
  
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  async removeToyFromChild(gyerekId: number, jatekId: number) {
    try {
      const gyerek = await this.db.gyerek.findUnique({
        where: { id: gyerekId },
        include: { jatekok: true },
      });
  
      const jatek = await this.db.jatek.findUnique({
        where: { id: jatekId },
      });
  
      if (!gyerek || !jatek) {
        return null;
      }
  
      await this.db.gyerek.update({
        where: { id: gyerekId },
        data: {
          jatekok: {
            disconnect: { id: jatekId },
          },
        },
      });
  
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async update(id: number, updateGyerekDto: UpdateGyerekDto) {
    try{
      return await this.db.gyerek.update({
        data: updateGyerekDto,
        where: {id}
      })
  } catch{
    return undefined;
  }
 }

 async remove(id: number) {
  try{
    await this.db.gyerek.delete({
      where: {id}
    })
    return true;
  }catch{
    return false
  }
}
}
