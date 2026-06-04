import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);


export const Subscription = mongoose.model("Subscription",subscriptionSchema);