import { NextRequest } from "next/server";
import { Property_schema } from "./upload-properties"

import { z, ZodType } from "zod";
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "@/src/lib/firebase";
import { NextApiRequest } from "next";
import { toast } from "@/src/hooks/use-toast";


export const User_schema:ZodType =z.object({
    userID: z.string(),
    userName: z.string(),
    userImageUrl: z.string(),
    location: z.string(),
    properties: Property_schema.array(),
    favourites: z.string().array(),
})

export type User = z.infer<typeof User_schema>; // This will infer the TypeScript type from the Zod schema

interface custom extends NextRequest {
    userID: string;
    userName: string;
    userImageUrl: string;
    location: string;
    properties: typeof Property_schema[];
    favourites: string[];
}

// This is a Next.js API route that handles user creation
// It uses Firebase Firestore to store user data
// and Zod for input validation
// The route is defined as a POST request
// The request body should contain user data in JSON format
// The user data is validated using Zod schema
// If the validation fails, a 400 response is returned with the error message
// If the validation succeeds, the user data is saved to Firestore
// and a 200 response is returned with the user data
export async function Create_user_in_db(req:User) {
   try{ 
    // Parse the request body using Zod schema
    // This will validate the input and return an error if the validation fails
    const parsedBody = User_schema.safeParse(req);

    if (!parsedBody.success) {
        return new Response(JSON.stringify(parsedBody.error), { status: 400 });
    }

    const user = parsedBody.data;

    // Here you would typically save the user to a database
    const userReference =doc(firestoreDb, "users",user.userID);
    const docSnap = await getDoc(userReference);
    if (!docSnap.exists()) {
    await setDoc(userReference, {
        userID: user.userID,
        userName: user.userName,
        userImageUrl: user.userImageUrl,
        location: user.location,
        properties: user.properties,
        favourites: user.favourites,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),});

        toast({
            title: "Account Created 🎉",
            description: "Welcome! Your account was created successfully.",
        })
    }
            else {
                toast({
                  title: "Welcome back 👋",
                  description: "You are now signed in.",
                });
              }

    return new Response(JSON.stringify(user), { status: 200 });
   }catch(error){
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ error: "Error creating user" }), { status: 500 });
   }
}

//update user uploaded properties
export async function Update_user_properties(userID:string, propertyID:string) {
    try {
        const userReference = doc(firestoreDb, "users",userID);
        const docSnap = await getDoc(userReference);
        const updatedData={
            properties:arrayUnion(propertyID),
        }
        
        updateDoc(userReference, updatedData)
        
    } catch (error) {
        console.error("Error updating user properties:", error);
    }
}

//get logged in user
export async function Get_logged_in_user_listed_properties(userID: string ){
    try{
        const userReference = doc(firestoreDb, 'users', userID)
        const docSnap = await getDoc(userReference);
        if (docSnap.exists()){
            const promises = (docSnap.data().properties).map(async (propertyID: string) => {
                const propertyReference = doc(firestoreDb, 'properties', propertyID);
                const propertySnap = await getDoc(propertyReference);
                if (propertySnap.exists()) {
                    return propertySnap.data();
                } else {
                    console.log("No such document!");
                }
            }
            );
            return Promise.all(promises);
        }
    }catch(error){
        console.log('unable to retrieve user data from firestore')
    }
}
