import { Prop } from '@nestjs/mongoose/dist/decorators/prop.decorator';
import { Schema } from '@nestjs/mongoose/dist/decorators/schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose/dist/factories/schema.factory';
import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema()
export class Tag {
  @Prop({ required: true })
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
