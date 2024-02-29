import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schema/tag.schema';
import { Model } from 'mongoose';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private readonly tagModel: Model<Tag>) {}

  async createTag(tag: TagDto): Promise<Tag> {
    return await this.tagModel.create(tag);
  }

  async findAll(): Promise<TagDto[]> {
    return await this.tagModel.find();
  }

  async findOne(id: string): Promise<Tag> {
    return await this.tagModel.findById(id);
  }

  async updateTag(id: string, tag: TagDto): Promise<Tag> {
    return await this.tagModel.findByIdAndUpdate(id, tag);
  }

  async deleteTag(id: string): Promise<Tag> {
    return await this.tagModel.findByIdAndDelete(id);
  }
}
