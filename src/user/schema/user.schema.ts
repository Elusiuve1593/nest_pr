import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserBody {
  @Prop({ required: false })
  userName?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({
    required: true,
    unique: true,
    set: (value: string) => bcrypt.hashSync(value, 10),
  })
  password: string;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: [UserBody], required: true })
  user: UserBody[];
}

export const UserSchema = SchemaFactory.createForClass(User);
