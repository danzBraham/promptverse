import { connectToDB } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const GET = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: id }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch all prompts" }),
      { status: 500 },
    );
  }
};
