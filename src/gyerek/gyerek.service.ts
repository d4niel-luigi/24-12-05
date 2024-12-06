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
    const child = await this.db.gyerek.findUnique({
      where: { id: childId },
      include: { jatekok: true },
    });
   
    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found.`);
    }
   
    if (!child.jovolte) {
      throw new Error(`Child ID ${childId} is marked as "not good" and cannot receive toys.`);
    }
   
    if (child.jatekok.length > 0) {
      throw new Error(`Child ID ${childId} already has a toy assigned.`);
    }
   
    const toy = await this.db.jatek.findUnique({
      where: { id: toyId },
    });
   
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${toyId} not found.`);
    }
   
    return this.db.gyerek.update({
      where: { id: childId },
      data: {
        jatekok: {
          connect: { id: toyId },
        },
      },
    });
  }
  
  
  async removeToyFromChild(childId: number, toyId: number): Promise<any> {
    const child = await this.db.gyerek.findUnique({
      where: { id: childId },
      include: { jatekok: true },
    });
   
    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found.`);
    }
   
    const toy = child.jatekok.find((j) => j.id === toyId);
   
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${toyId} not assigned to child ID ${childId}.`);
    }
   
    return this.db.gyerek.update({
      where: { id: childId },
      data: {
        jatekok: {
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
