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
     * Loggin Token usage
     * The "result" object that comes back from stream text has usage property.
     * However, since we are streaming the response, so usage information is only
     * available after the stream completes.
     *
     * Thus, we need to handle it asynchronously.
     */
    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens, //Number of tokens we send
        outputTokens: usage.outputTokens, //Output tokens the model generated
        totalTokens: usage.totalTokens, // Sum of input and output tokens
      });
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
