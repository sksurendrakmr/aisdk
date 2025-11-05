import { openai } from "@ai-sdk/openai";
import {
  UIMessage,
  InferUITools,
  UIDataTypes,
  streamText,
  convertToModelMessages,
  tool,
  stepCountIs, // This helper functions let us control how many steps the AI can take.
} from "ai";
import { z } from "zod";

/**
 * zod helps us define what input the tools expect in a type safe way.
 */

const tools = {
  getWeather: tool({
    description: "Get the wheather for the location", //This is short description of the tool including details on how and when it can be used by the model
    inputSchema: z.object({
      city: z.string().describe("The city to get the wheather for"),
    }), //AI modal is use this to generate the input of this tool.
    execute: async ({ city }) => {
      //Function that will be called with the arguments specified in the input schema.
      return "70F and cloudy";
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;
export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    const result = streamText({
      model: openai("gpt-5-nano"),
      tools,
      stopWhen: stepCountIs(2),
      messages: [
        {
          role: "system",
          content:
            "You are a helpful coding assistant. Keep responses under 3 sentences and focus on practicals example",
        },
        ...convertToModelMessages(messages),
      ],
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
