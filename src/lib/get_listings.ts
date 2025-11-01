import { collection, Firestore, getDocs } from "firebase/firestore";
import { firestoreDb } from "./firebase";

export async function getListings(){
   try{
    const querySnapshot = await getDocs(collection(firestoreDb, "properties"));
    var result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data() });})
      
    console.log("Fetched listings from Firestore", result);
      return result;
   }catch(error) {
    console.error("Error fetching listings:", error);
    return false;
   }
}

export async function getApprovedListings(){
   try{
    const querySnapshot = await getDocs(collection(firestoreDb, "approved_properties"));
    var result: any[] = [];
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data() });})
      
    console.log("Fetched listings from Firestore", result);
      return result;
   }catch(error) {
    console.error("Error fetching listings:", error);
    return false;
   }
}