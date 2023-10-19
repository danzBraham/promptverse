import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
  prompt: {
    type: String,
    required: [true, "Please provide prompt"],
  },
  tag: {
    type: String,
    required: [true, "Please provide tag"],
  },
});

export default models.Prompt || model("Prompt", PromptSchema);
