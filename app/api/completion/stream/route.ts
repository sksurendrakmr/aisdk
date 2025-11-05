import { openai } from "@ai-sdk/openai";
import { streamText } from "ai"; //streamText is a function designed specifically for streaming responses.
export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    //we will not await on streamText response.
    const result = streamText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });
    /**
     * toUIMessageStreamResponse -> Create an HTTP response that
     * streams that the data in the format that the UI can understand.
     */
    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response("Failed to stream text", { status: 500 });
  }
}
