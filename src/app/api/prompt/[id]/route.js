import { connectToDB } from "@/utils/database";
import Prompt from "@/models/Prompt";

export const GET = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return new Response(
        JSON.stringify({ status: "failed", message: "Prompt not found" }),
        {
          status: 404,
        },
      );
    }

    return new Response(JSON.stringify({ status: "success", data: prompt }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "failed", message: "Failed to fetch prompt" }),
      {
        status: 500,
      },
    );
  }
};

export const PATCH = async (req, { params: { id } }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response(
        JSON.stringify({ status: "failed", message: "Prompt not found" }),
        {
          status: 404,
        },
      );
    }
    existingPrompt;

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(
      JSON.stringify({ status: "success", data: existingPrompt }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "failed", message: "Failed to update prompt" }),
      {
        status: 500,
      },
    );
  }
};

export const DELETE = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(id);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Prompt deleted successfully",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: "failed",
        message: "Failed to delete prompt",
      }),
      { status: 200 },
    );
  }
};
