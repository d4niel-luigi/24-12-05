import { Injectable } from '@nestjs/common';
import { CreateJatekDto } from './dto/create-jatek.dto';
import { UpdateJatekDto } from './dto/update-jatek.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JatekService {
  constructor(private readonly db: PrismaService){}
  
  create(createJatekDto: CreateJatekDto) {
    return this.db.jatek.create({
     data: createJatekDto
  })
  }

  findAll() {
    return this.db.jatek.findMany();
  }

  findOne(id: number) {
    return this.db.jatek.findUnique({where: {id: id}});
  }

  async update(id: number, updateJatekDto: UpdateJatekDto) {
    try{
      return await this.db.jatek.update({
        data: updateJatekDto,
        where: {id}
      })
  } catch{
    return undefined;
  }
 }
  async remove(id: number) {
    try{
      await this.db.jatek.delete({
        where: {id}
      })
      return true;
    }catch{
      return false
    }
  }
}
