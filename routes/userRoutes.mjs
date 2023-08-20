import { Router } from "express";
import User from "../models/user.mjs";
import { connection } from "../config/mongoClient.mjs"

const userRoutes = Router();

userRoutes.post('/createUser', async (request, response) => {
    try {
        const { email, displayName, uid } = await request.body;
        console.log(`email: ${email}, displayName: ${displayName}, uid: ${uid}`)
        const newUser = new User({
            email,
            displayName,
            uid,
        });
        const userDb = await connection.useDb("messageDB");
        const userBase = await userDb.collection("users");
        let result = await userBase.insertOne(newUser);
        response.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        response.status(500).json({ error: "User registration failed", details: error.message });
    }
});

export default userRoutes;