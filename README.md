## Streaming Text Responses

AI models can be slow, especially when generating longer responses.
Users might be staring at a loading spinner for 5, 10 even 20 seconds which is not a great experience.

Instead of waiting for the entire response, we can start showing text as soon as the AI starts generting it

It's like the difference between downloading a movie completely before watching it vs streaming it on Youtube or Netflix

With streaming, the user sees progress immediately which makes the app feel much faster and more responsive.

## Models and Providers

An AI model is - a program that has been trained on a set of data - to recognize patterns - make predictions - without human interventions
A really smart assistent who has read millions of books and can now help us write, analyze or create based on all that knowledge.

## Types of AI Models

1.  **Text generation models (Language models):**
    They process and generate human-like text, perfect for everything from writing and anlysis to conversation and code.

    <h6>Large Language Models(LLMs)**</h6>

    They're "large" because they were trained on absolutely massive amounts of text data.

2.  **Embedding models:**
    <p>Instead of generting text, they convert text into numbers - specially, vectors that capture the meaning of the text.</p>

    <p>Imaging if we could turn the meaning of a sentence into a set of coordinates on a map. Similar meanings would be close together on that map.</p>

    <p>We might not use these directly as often, but they are working behing the scenes in features like content recommendations</p>

3.  **Image models**
    These either generate images from text descriptions or analyze existing images
    E.g. Midjourney, Dall-E and Flux

    Perfect for generating product images, analyzing uploaded photos, or creating visual content on the fly

4.  **Multi-modal models**
    - The swiss Army knives of the AI World.
    - These can handle multiple types of input and output.
    - Feed them text, images or sometimes even audio, and they will process it all.
    - They're incredibly versatile but often come with higher costs.
      E.g. GPT-4, Claude-4, and Gemini fall into this category

<h2>Model Characteristics</h2>

1. **Context Widow:**

   - How much information a modal can process in a single conversation.
   - Think of it as the model's working memory.
   - Some models can only handle a few pages of text at once, while others can process entire books.
   - If we are building a document analysis app, we will want a model with a large context window.
   - For simple Q&A or basic Chat, a model with a smaller context window works just fine.

2. **Intelligence**

   - Determines how well a model understands nuance, follows complex instructions, and generates high-quality output
   - Less capable models are great for straightforward tasks like answering FAQs, categorizing text or following templates.
   - When we need creativity, complex-problem solving or understanding context and subtext, we reach for the more cabable models.
   - Always match the model to our task complexity.

3. **Speed**

   - All about response time.
   - If users are waiting for a response, like in a chat interface, we need speed.
   - If we are generating reports in the background, use a slower model with better quality

4. **Cost**
   - Faster, smarter, larger context window models cost more.
   - Use the cheaper models during development.

<h3>
    <u>Choosing the right models</u>
</h3>

- For real time features like autocomplete or a simple chat interface, speed is king. Users expect instant responses so pict a fast model, even if it's not the smartest.

- For generting content, quality beats speed. Users will wait an extra second or two for better writing so pick a more intelligent model.

- For analyzing documents, we need a large context window to fit everything, Don't try to squeeze a large PDF through a small model.

- Always test and experiment with different models to find the right balance for your use case.

> [!TIP]
> Start cheap, monitor usage, upgrade and optimize based on actual needs.

## Providers

> Who creates and maintains these models.

- If models are cars, providers are the manufacturers.
- Companies like OpenAI, Anthropic, Google etc are like Ford, BMW and Mercedes of the AI world.
- Each providers invests hundreds or millions in research, has their own approach and offers different strengths.

## Tokens

> [!IMPORTANT]
> Understanding Tokens is crucial for building cost effective AI applications.

A token is the basic unit of text that the model processes.

They can be whole words, parts of words, individual characters, or even punctuation marks.

Depending on the context and the model we are using, the same word might be tokenized differently.

Token is a chunk of text with no specific length.
Approximate, 1 token equals about 4 characters in english text.

**Why Token Matters?**
They directly impact the application in three different ways.

- How much text we can process at once.(Every Model has a maximum token limit and if we hit that limit we can't process any other text.)
- How much the API calls will cost.
- The quality of the results. (If we send too many tokens, we might overwhelm the model with information and the model might not have enough context to a good response)

**Context Window**

- Every Model has a context window which represents how much information a model can proces in a single conversation (short-term memory)

_GPT-4.1-nano can handle upto 1 million tokens in a single conversation_

1 million tokens are roughly 2500 to 3000 pages of text. That's equivalent to feeding the entire Lord of the Rings trilogy to the model at once.

> [!IMPORTANT]
> When we hit that limit, older information starts getting pushed out to make room for new stuff.

Imagine the model's memory as a whiteboard: as we keep writing, we eventually run out of space, so we have to erase the oldest notes to add new ones.

**Input vs Output tokens**

- Input tokens are everything we send to the model.
- Output tokens are everything the model generates in response.

Why does this distinction matters?

- Different models have different input/output token limits.
- Input and output tokens often have different pricing.
- Understanding this helps us optimize the API costs.

AI SDK automatically includes some system tokens for formatting and context. (useful for cost optimization)

> [!NOTE]
> Token is the currency of AI. Every requests cost token and tokens cost money.

## Completions With AI

- Each prompt is treated as a competely independent request.
- Kind of browsing the web in incognito mode.
- The AI starts fresh every time, with zero memory of our last message.

**Chat with AI**

- To build a proper conversational experience, we need to maintain an ordered history of all messages and include that history with every new prompt.

The AI SDK makes it super simple.

## Tailoring AI responses based on specific application needs.

**Prompt Engineering**

- Prompt engineering is the practice of crafting instructions to get better, more appropriate outputs from AI models.
- It's not about changing the AI model itself. It's about guiding it to produce responses that fit our application perfectly.

E.g. We have a brilliant chef who can cook anything

- "make lunch" vs
- "prepare a Thai red curry and sticky rice for someone who likes mild heat"

**Why is Prompt Engineering important?**
Good prmopt Engineering:

- ensure responses match your users needs and knowledge level
- creates consistency, so similar questions get similar types of responses
- can actually reduce costs by encouraging more concise response that user fewer tokens

With Good prompt, AI naturally responds in the right way for our applications.

**Prompt Engineering Techniques**

1. System Prompts

   - They are special instructions that shape how the AI behaves throughout an entire conversation.
     (System messages are like setting the rules of the board games before anyone play. It sent the
     context of the entire conversation but user never sees it)

   - Trade off - The System prompt is send with every single request, adding to the token counts.

2. Few-shot learning
   - Sometimes telling the AI what to do isn't enough.
   - It's helpful to get the response in a specific format.

**Prompt engineering best practices**

- Start simple and iterate
- be specific but not overly restrictive
- consider your audience
- monitor costs
- test edge cases
- document what works
