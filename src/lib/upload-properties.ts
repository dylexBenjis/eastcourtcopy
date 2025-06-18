import { z } from "zod";
import { User_schema } from "./user";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "@/src/lib/firebase";
import { NextApiRequest } from "next";
import { toast } from "@/src/hooks/use-toast";


const PropertyLabel= z.enum(["FOR_RENT", "FOR_SALE"]);

export const Property_schema =z.object( {
    id       :        z.string().optional(),   //@id @default(uuid())
    title    :        z.string().optional(),
    description  :    z.string().optional(),
    price    :       z.number().optional(), // e.g. 1000000
    propertyType:    z.string().optional(),  // e.g. "apartment", "house", "land"
    label    :        z.string().optional(), // Enum for property label
    address:       z.string().optional(), // Address of the property
    // location :        z.string().optional(), // Array of strings for location
    parking:        z.string().optional(), // Optional field
    bedrooms   :     z.string().optional(), // Optional field
    bathrooms  :    z.string().optional(), // Optional field
    areaSqFt   :   z.string().optional(), // Optional field
    images     :   z.array(z.string()).optional(), // URLs of uploaded images
    userId    :       z.string().optional(), // @relation(fields: [userId], references: [id])
    createdAt       :z.string().optional(),// @default(now())
    updatedAt       :z.string().optional(),// @updatedAt
  });

export type Property = z.infer<typeof Property_schema>; // This will infer the TypeScript type from the Zod schema


export async function Create_new_property(req:Property) {
    try{ 
        // Parse the request body using Zod schema
        // This will validate the input and return an error if the validation fails
        const parsedBody = Property_schema.safeParse(req)
        console.log('parsedBody', parsedBody);
    
        if (!parsedBody.success) {
            return new Response(JSON.stringify(parsedBody.error), { status: 400 });
        }
    
        const property = parsedBody.data;
    
        // Here you would typically save the property to a database
        console.log('saving to db', property);

        //get lat and lon before saving to db
        // const axios = require('axios').default;
        // const location = property.location;
        // const locationResponse = await axios.get(`https://us1.locationiq.com/v1/search?key=pk.5b2b044697e1f607aaa7303dde49e1e7&q=${location}&format=json&`).then((response: any) => {return response.data[0]});
        // const lat = locationResponse.lat;
        // const long = locationResponse.lon;
        // console.log('lat', lat, 'long', long, 'locationResponse', locationResponse);

        const propertyReference = await addDoc(collection(firestoreDb, "properties"), {
                title: property.title,
                description: property.description,
                price: property.price,
                propertyType: property.propertyType,
                label: property.label,
                parking: property.parking,
                address: property.address,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                areaSqFt: property.areaSqFt,
                images: property.images,
                userId: property.userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                });
            
            // Update the document with the ID
                await updateDoc(propertyReference, {
                    id: propertyReference.id
                  });
    
            toast({
                title: "Property Created 🎉",
                description: "Your property was created successfully.",
            })
        console.log('propertyReference', propertyReference);
        // Return the ID of the newly created property
        return propertyReference.id;
    }catch (error) {
        console.error("Error creating new property:", error);
    }

}