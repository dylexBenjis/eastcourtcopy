import { z } from "zod";
import { User_schema } from "./user";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "@/src/lib/firebase";
import { NextApiRequest } from "next";
import { toast } from "@/src/hooks/use-toast";


const PropertyLabel= z.enum(["FOR_RENT", "FOR_SALE"]);

export const Property_schema =z.object( {
    id       :        z.string().optional(),   //@id @default(uuid())
    title    :        z.string().optional(),
    description  :    z.string().optional(),
    price    :       z.number().optional(), // e.g. 1000000
    property_type:    z.string().optional(),  // e.g. "apartment", "house", "land"
    rent_period: z.string().optional(),
    label    :        z.string().optional(), // Enum for property label
    address:       z.string().optional(), // Address of the property
    location:       z.string().optional(), // Address of the property
    role :        z.string().optional(), // strings for role of property poster
    parking:        z.string().optional(), // Optional field
    bedrooms   :     z.string().optional(), // Optional field
    bathrooms  :    z.string().optional(), // Optional field
    areaSqFt   :   z.string().optional(), // Optional field
    images     :   z.array(z.object({imageUrl: z.string().optional(), type: z.string().optional()})).optional(), // URLs of uploaded images
    // user    :       User_schema.optional(), // @relation(fields: [userId], references: [id])
    createdAt       :z.string().optional(),// @default(now())
    updatedAt       :z.string().optional(),// @updatedAt
  });

export type Property = z.infer<typeof Property_schema>; // This will infer the TypeScript type from the Zod schema

export type Approved_property = z.infer<typeof Property_schema>; // This will infer the TypeScript type from the Zod schema and add userId

//create new property
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
                property_type: property.property_type,
                rent_period: property.rent_period,
                label: property.label,
                parking: property.parking,
                address: property.address,
                location: property.location,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                areaSqFt: property.areaSqFt,
                images: property.images,
                role: property.role,
                // userId: property.userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                });
            
            // Update the document with the ID
                await updateDoc(propertyReference, {
                    id: propertyReference.id
                  });
    
            toast({
                title: "Property Received 🎉",
                description: "Your property was been received successfully.",
            })
        console.log('propertyReference', propertyReference);
        // Return the ID of the newly created property
        return propertyReference.id;
    }catch (error) {
        console.error("Error creating new property:", error);
    }

}

//approve property
export async function Approve_property(propertyId: string) {
    try {
        // Get the property document reference
        const propertyRef = doc(firestoreDb, "properties", propertyId);
        
        // Get the property document
        const propertyDoc = await getDoc(propertyRef);
        
        if (!propertyDoc.exists()) {
            throw new Error("Property not found");
        }
        
        // Get the property data
        const propertyData = propertyDoc.data() as Property;
        
        // Create a new approved property object
        const approvedProperty: Approved_property = {
            ...propertyData,
            // userId: userId, // Add the userId that approved to the approved property
            id: propertyId, // Ensure the id is set
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        
        // Save the approved property to the database
        await setDoc(doc(firestoreDb, "approved_properties", propertyId), approvedProperty);
        
        // Optionally, you can delete the original property document if needed
        await deleteDoc(propertyRef);

                    toast({
                title: "Property Approved 🎉",
                description: "Your property was been approved successfully.",
            })


        
        return approvedProperty;
    } catch (error) {
        console.error("Error approving property:", error);
    }
}

//update property
const UpdatePropertyReqSchema = z.object({
    property: Property_schema,
    approved: z.boolean(),
});

export async function Update_new_property(req: { property: Property, approved: boolean }) {
    try {
        // Parse the request body using Zod schema
        // This will validate the input and return an error if the validation fails
        const parsedBody = UpdatePropertyReqSchema.safeParse(req);
        console.log('parsedBody', parsedBody);

        if (!parsedBody.success) {
            return new Response(JSON.stringify(parsedBody.error), { status: 400 });
        }

        const data = parsedBody.data;

        // Here you would typically save the property to a database
        console.log('updating in db', data.property);

        //get lat and lon before saving to db
        // const axios = require('axios').default;
        // const location = property.location;
        // const locationResponse = await axios.get(`https://us1.locationiq.com/v1/search?key=pk.5b2b044697e1f607aaa7303dde49e1e7&q=${location}&format=json&`).then((response: any) => {return response.data[0]});
        // const lat = locationResponse.lat;
        // const long = locationResponse.lon;
        // console.log('lat', lat, 'long', long, 'locationResponse', locationResponse);

            
            // Update the document with the ID
            if(data.approved==true){
                await updateDoc( doc(firestoreDb, "approved_properties", `${data.property.id}`   ), {
                    ...data.property,
                    // userId: property.userId,
                    updatedAt: new Date().toISOString(),
                  });}
                  if(data.approved==false){
                await updateDoc( doc(firestoreDb, "properties", `${data.property.id}`   ), {
                    ...data.property,
                    // userId: property.userId,
                    updatedAt: new Date().toISOString(),
                  });}
    
            toast({
                title: "Property Updated 🎉",
                description: "Your property was been updated successfully.",
            })
        console.log('propertyReference');
        // Return the ID of the newly updated property
        return 'successful';
    }catch (error) {
        console.error("Error creating new property:", error);
    }

}

export async function delete_property(propertyId: string, approved?: boolean) {
    try {
        // Get the property document reference

        if(approved) {
        const propertyRef = doc(firestoreDb, "approved_properties", propertyId);
            
        // Delete the property document
        await deleteDoc(propertyRef);
        }
        else {
            const propertyRef = doc(firestoreDb, "properties", propertyId);
            
        // Delete the property document
        await deleteDoc(propertyRef);
        }


        toast({
            title: "Property Deleted 🎉",
            description: "Your property was been deleted successfully.",
        });

        return 'successful';
    } catch (error) {
        console.error("Error deleting property:", error);
    }
}