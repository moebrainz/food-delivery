import mongoose, { model, models, Schema } from "mongoose";

const MenuItemSchema = new Schema(
  {
    image: { type: String },
    itemName: { type: String },
    itemCategoryId: { type: mongoose.Types.ObjectId },
    itemDescription: { type: String },
    itemPrice: { type: Number },
  },
  { timestamps: true }
);

//check if model exist, if not create a new schema
export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema);
