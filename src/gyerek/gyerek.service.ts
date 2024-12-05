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
  async addToyToChild(childId: number, toyId: number): Promise<any> {
    try {

      const child = await this.db.gyerek.findUnique({
        where: { id: childId },
        include: { jatek: true },
      });
  
      if (!child) {
        throw new NotFoundException(`Gyerek with ID ${childId} not found.`);
      }
  

      const toy = await this.db.jatek.findUnique({
        where: { id: toyId },
      });
  
      if (!toy) {
        throw new NotFoundException(`Játék with ID ${toyId} not found.`);
      }
  
      await this.db.gyerek.update({
        where: { id: childId },
        data: {
          jatek: {
            connect: { id: toyId },
          },
        },
      });
  
      return {
        message: 'Játék successfully added to gyerek.',
        childId,
        toyId,
      };
    } catch (error) {
      console.error('Error adding toy to child:', error);
  
      if (error instanceof NotFoundException) {
        throw error; 
      }
  
      throw new Error('Failed to add játék to gyerek.');
    }
  }
 
  
  async removeToyFromChild(childId: number, toyId: number) {
    return this.db.gyerek.update({
      where: { id: childId },
      data: {
        jatek: {
          disconnect: { id: toyId },
        },
      },
    });
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
