import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { askGPT } from "./chat.service";

export const makeFoodController = asyncHandler(
  async (req: Request, res: Response) => {
    const { recipe, cuisine, member } = req.body;
    const location: string = "India";

    const prompt = `
  Give me a detailed recipe for "${recipe}" in ${cuisine} cuisine, tailored for someone in ${location}.
  Respond only with a valid JSON object (no code block formatting). Include:
  - Ingredients in ${location} measurements
  - Step-by-step instructions
  Make it suitable for ${member} people.
  `;

    const reply = await askGPT(prompt);

    if (!reply) {
      res.status(500).json({ error: "No recipe received." });
      return; 
    }

    const cleaned = reply
      .trim()
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();

    try {
      const parsedRecipe = JSON.parse(cleaned);
      res.status(200).json({ recipe: parsedRecipe });
    } catch (error) {
      console.error("Failed to parse recipe:", error);
      res.status(200).json({ raw: reply });
    }
  }
);
