import { openai } from "@ai-sdk/openai"; //
import { generateText } from "ai"; //responsible for generating text
export async function POST(request: Request) {
  try {
    const { promt } = await request.json();
    /**
     * generateText() return a promise that resolves to an
     * object containing the generated text.
     */
    const { text } = await generateText({
      model: openai("gpt-4.1-nano"),
      prompt: promt,
    });
    return Response.json({ text });
  } catch (error) {
    return Response.json({ error: "Failed to generate text", status: 500 });
  }
}
