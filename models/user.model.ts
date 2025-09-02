import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const pdfSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  title: { type: String, required: true },
  summary: { type: String },
  pyqs: { type: [String], default: [] },
  uploadedAt: { type: Date, default: Date.now },
});

export interface IUser extends Document {
  email: string;
  password: string;
  username?: string;
  pdfs: {
    filename: string;
    title: string;
    summary?: string;
    pyqs?: string[];
    uploadedAt: Date;
  }[];
  isValidPassword(password: string): Promise<boolean>;
  generateJWT(): string;
}

export interface IUserModel extends Model<IUser> {
  hashPassword(password: string): Promise<string>;
}

const userSchema = new mongoose.Schema<IUser, IUserModel>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: [50, "Email must not be longer than 50 characters"],
  },
  password: {
    type: String,
    select: false,
  },
  username: {
    type: String,
  },
  pdfs: [pdfSchema],
});

userSchema.statics.hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  return jwt.sign({ email: this.email, id: this._id }, "nnanna", {
    expiresIn: "24h",
  });
};

const User =
  (mongoose.models.user as IUserModel) ||
  mongoose.model<IUser, IUserModel>("user", userSchema);

export default User;
