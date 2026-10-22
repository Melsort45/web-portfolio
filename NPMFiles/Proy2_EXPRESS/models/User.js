import mongoose from "mongoose";

const USER_ROLES = ["User", "Admin", "Superuser"];

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: "user",
  }
},
{
    timestamps: true, strict: true
});

export const User = mongoose.model("User", UserSchema);