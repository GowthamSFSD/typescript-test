import openai from "../../config/openAi";

export const askGPT = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4.1", 
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message?.content;
};
