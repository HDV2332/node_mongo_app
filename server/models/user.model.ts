import mongoose from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);


// !TODO: refactor
// userSchema.pre("save", async function (next: any) {
//   const user = this;
//   if (!user.isModified("password")) return next();

//   try {
//     const salt = await genSalt();
//     user.password = await hash(user.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

userSchema.methods.comparePassword = async function (password: any) {
  return compare(password?.toString(), this.password);
};

export default mongoose.model("User", userSchema);
