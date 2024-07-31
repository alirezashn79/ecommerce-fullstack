import { models, model, Schema } from "mongoose";
import { zDiscountSchema } from "schemas/discount";
import { TypeOf } from "zod";

type TDiscountModel = TypeOf<typeof zDiscountSchema>;

const schema = new Schema<TDiscountModel>(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUse: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const discountModel =
  models.Discount || model<TDiscountModel>("Discount", schema);

export default discountModel;
