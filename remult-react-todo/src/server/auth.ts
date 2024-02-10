import express, { Router } from "express";
import { remult } from "remult";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT token creation
import { User } from "../shared/User";

const userRepo = remult.repo(User);

export const auth = Router();

auth.use(express.json());

auth.post("/api/signIn", async (req, res) => {
  const { userName, password } = req.body; // Get username and password from the request body

  try {
    const user = await userRepo.findOne({
      where: { userName },
    });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, "yourSecretKey", {
          expiresIn: "1h", // Set expiration time for the token
        });

        // Store the token in the session
        req.session!["user"] = {
          id: user.id,
          userName: user.userName,
          token,
        };

        res.json({ userId: user.id, userName: user.userName, token });
      } else {
        res.status(401).json("Invalid username or password");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json("Internal server error");
  }
});

auth.post("/api/signOut", (req, res) => {
  req.session!.user = null;
  res.json("Signed out");
});

auth.get("/api/currentUser", (req, res) => {
  res.json(req.session!.user);
});
