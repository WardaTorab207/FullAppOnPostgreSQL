import "reflect-metadata";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user";

const userRepo = AppDataSource.getRepository(User);

export const userController = {
    getAllUsers : async (req: Request, res: Response) => {
  try {
    const users = await userRepo
      .createQueryBuilder("user")
      .orderBy("user.id", "ASC")
      .getMany();

    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
},

 getUserById : async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
},

createUser : async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existing = await userRepo
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = userRepo.create({ firstName, lastName, email, password });
    const savedUser = await userRepo.save(newUser);

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error" });
  }
},

updateUser : async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.email = email ?? user.email;
    user.password = password ?? user.password;

    const updatedUser = await userRepo.save(user);
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error" });
  }
},

 deleteUser : async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepo.remove(user);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error" });
  }
},
};




