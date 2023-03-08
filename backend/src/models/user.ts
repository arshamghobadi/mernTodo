import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, select: false, unique: true },
    password: { type: String, required: true, select: false, unique: true },
    email: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>('user', userSchema);
