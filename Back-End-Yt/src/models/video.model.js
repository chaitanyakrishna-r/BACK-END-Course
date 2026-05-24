import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    description: {
        type:String,
    },
    duration:{
        type: Number, //cloudinary or aws will by default provide duration of videos
        required: true,
    },
    isPublished:{
        type: Boolena,
        default: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    engagements: {
      likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
      dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);


//same like pre and post middleware mongoose also allow to add plugin
//Agrregation is nothing but a advaced .find not just it search it also process data etc 

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
