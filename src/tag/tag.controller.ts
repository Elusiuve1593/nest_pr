import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { Tag } from './schema/tag.schema';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  createTag(@Body() tag: TagDto): Promise<Tag> {
    return this.tagService.createTag(tag);
  }

  @Get()
  findAll(): Promise<TagDto[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  @Put(':id')
  updateTag(@Param('id') id: string, @Body() tag: TagDto): Promise<Tag> {
    return this.tagService.updateTag(id, tag);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: string): Promise<Tag> {
    return this.tagService.deleteTag(id);
  }
}
