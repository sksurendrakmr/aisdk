import { openai } from "@ai-sdk/openai";
import {
  UIMessage,
  InferUITools,
  UIDataTypes,
  streamText,
  convertToModelMessages,
  tool,
  stepCountIs,
} from "ai";
import { z } from "zod";

const tools = {
  getLocation: tool({
    description: "Get the location of a user",
    inputSchema: z.object({
      name: z.string().describe("The name of the user"),
    }),
    execute: async ({ name }) => {
      return "Bangalore";
    },
  }),
  getWeather: tool({
    description: "Get the wheather for the location",
    inputSchema: z.object({
      city: z.string().describe("The city to get the wheather for"),
    }),
    execute: async ({ city }) => {
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
      stopWhen: stepCountIs(3),
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
