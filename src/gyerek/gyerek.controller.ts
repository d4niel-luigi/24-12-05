import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { GyerekService } from './gyerek.service';
import { CreateGyerekDto } from './dto/create-Gyerek.dto';
import { UpdateGyerekDto } from './dto/update-Gyerek.dto';
import { ApiResponse, ApiParam, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Gyerek } from './entities/gyerek.entity';

@Controller('Gyerek')
@ApiBearerAuth()
export class GyerekController {
  constructor(private readonly GyerekService: GyerekService) {}

   /**
   * Creates a new child entry in the catalog
   * 
   * @param id The unique ID of the child
   * @param createGyerekDto The data to be created
   * @returns JSON response 
   */
   @Patch(':id')
   @ApiParam({
     name: "id",
     type: "number",
     description: 'The unique ID of the child'
   })
   @ApiResponse({ status: 200, description: 'child created successfully' })
   @ApiBadRequestResponse({ description: 'The supplied data was invalid' })
   @Post()
   create(@Body() createGyerekDto: CreateGyerekDto) {
    return this.GyerekService.create(createGyerekDto);
  }

   /**
   * Retrieves all child entries in the catalog
   * 
   * @returns JSON response
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Retrice all childs' })
  @ApiBadRequestResponse({ description: 'The supplied data was invalid' })
  findAll() {
    return this.GyerekService.findAll();
  }

  /**
   * Retrieves a specific child by ID
   * 
   * @param id The unique ID of the child
   * @returns JSON response
   */
  @Get(':id')
  @ApiParam({
    name: "id",
    type: "number",
    description: 'The unique ID of the child'
  })
  @ApiResponse({ status: 200, description: 'Retrice all childs' })
  @ApiBadRequestResponse({ description: 'child not found or invalid ID' })
  findOne(@Param('id') id: string) {
    return this.GyerekService.findOne(+id);
  }

  /**
   * Modifies the details of an existing child
   * 
   * @param id The unique ID of the child
   * @param updatechildtalogDto The data to modify
   * @returns JSON response 
   */
  @Patch(':id')
  @ApiParam({
    name: "id",
    type: "number",
    description: 'The unique ID of the child'
  })
  @ApiResponse({ status: 200, description: 'The modified data of the phone' })
  @ApiBadRequestResponse({ description: 'The supplied data was invalid' })
  update(@Param('id') id: string, @Body() updateGyerekDto: UpdateGyerekDto) {
    return this.GyerekService.update(+id, updateGyerekDto);
  }

   /**
   * Deletes a child entry by ID
   * 
   * @param id The unique ID of the child
   * @returns JSON response
   */
   @Delete(':id')
   @ApiParam({ 
    name: 'id', 
    type: 'number', 
    description: 'The unique ID of the child' })
  @ApiParam({ name: 'id', type: 'int', description: 'The unique ID of the child' })
  @ApiResponse({ status: 200, description: 'child deleted successfully' })
  @ApiBadRequestResponse({ description: 'child not found or invalid ID' })
  remove(@Param('id') id: string) {
    return this.GyerekService.remove(+id);
  }
}
