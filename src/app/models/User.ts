import bcrypt from "bcrypt";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (pass: string) {
          return pass.length >= 6;
        },
        message: "Password must be at least 6 characters",
      },
    },
    image: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    phoneNumber: { type: String },
    postalCode: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//encript password before saving
UserSchema.post("validate", function (user) {
  const notHashed = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashed, salt);
});

//check if model exist, if not create a new schema
export const User = models?.User || model("User", UserSchema);
