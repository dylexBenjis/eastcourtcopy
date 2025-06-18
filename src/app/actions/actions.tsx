// 'use server'

// import { put } from "@vercel/blob"

// export async function PUT(req: Request) {

//   const formData = await req.formData(); // Get the form data


//   const file = formData.get('file'); // Get the file from the form data
//   const name = formData.get('name'); // Get the file name

//   if (!file || !name) {
//     throw new Error('File or name is missing');
//   }

//   try {
//     const blob = await put(name as string, file as Blob, { access: 'public' });
//     return blob; // Return the blob URL or other necessary information
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw new Error("Failed to upload image");
//   }
// }

'use server';

export async function getBlobToken() {
  return process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN;
}