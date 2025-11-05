import { openai } from "@ai-sdk/openai";
import { UIMessage, streamText, convertToModelMessages } from "ai";
export async function POST(req: Request) {
  /**
   * Unlike with previous implementation, we got a single prompt
   * in the request body.
   *
   * Here, we need to get an array of messsages from request body.
   *
   * messages will an array containing the entire conversation history
   *
   * convertToModelMessages() -> this helper function strips away UI specific
   * metadata like timestamps and converts messages into format the AI model expects.
   */
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const result = streamText({
      model: openai("gpt-5-nano"),
      messages: convertToModelMessages(messages),
    });

    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
