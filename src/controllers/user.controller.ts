import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;
  const user = await User.create({ username, email });
  res.status(201).json(user);
};


