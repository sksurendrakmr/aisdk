import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { recipeSchema } from "./Schema";

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();

    const result = streamObject({
      model: openai("gpt-4.1-nano"),
      prompt: `Generate a recipe for ${dish}`,
      schema: recipeSchema,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    return new Response("Failed to generate recipe", { status: 500 });
  }
}
