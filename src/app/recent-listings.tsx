"use client"

import { Fragment, useContext, useEffect, useState } from "react"
import Image from "next/image"
import { Bath, Bed, Building, ChevronDown, MapPin, Router, Search } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Slider } from "@/src/components/ui/slider"
import { Badge } from "@/src/components/ui/badge"
import Property_card from "@/src/components/property_card"
import { ActiveTab_Context } from "../components/activeTab-provider"
import { AuthState_Context } from "../lib/auth_state"
import Browse_Properties from "./properties/browse-properties"
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { firestoreDb } from "../lib/firebase";
import { Property } from "../lib/upload-properties"
import { toast } from "../hooks/use-toast"
import PropertyCardSkeleton from "../components/property_card_skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"





export function RecentListings() {
  const [priceRange, setPriceRange] = useState([50000, 500000])
  const [expanded, setExpanded] = useState(false)


  //skeleton card
  const [expectedListings, setExpectedListings] = useState(0);


  //activetab context
  const {setActiveTab}=useContext(ActiveTab_Context)

  //user
  const {user, loading} = useContext(AuthState_Context)


  //fetch recent listings from the database
  const [recent_listing, setRecentListings] = useState<Property[]>([])
  const [recent_listings_loading, setRecentListingsLoading] = useState(true)
  const [lastVisible, setLastVisible] = useState<Property>({}); // To store the last fetched document
const [docincrement, setDocIncrement] = useState(5); // Number of documents to fetch in each batch
const [nextBatch, setNextBatch] = useState(false); // To track if it's the next batch
  const [hasMore, setHasMore] = useState(true); 
  const [showBrowseLink, setShowBrowseLink] = useState(false); 

  const router = useRouter();
  
async function Get_recent_listings() {
    try {

      setRecentListingsLoading(true)
        const document_size = 10; // Number of documents to fetch
        const listingsRef = collection(firestoreDb, "approved_properties");
        
        let q;   
        
        if (nextBatch) {
          // If it's the next batch, start from the last visible document
          q = query(listingsRef, orderBy("createdAt", "desc"), startAfter(lastVisible), limit(document_size + docincrement));
        } else {
          // Otherwise, fetch the first batch
          q = query(listingsRef, orderBy("createdAt", "desc"), limit(document_size));
        }

        console.log('q', q);
      
        // Fetch the query snapshot
        const querySnapshot = await getDocs(q);

        console.log('querySnapshot', querySnapshot);

        
        // Check if the query returned documents
        if (!querySnapshot.empty) {
          // Extract full document data
          const listings: Property[] = [];
          querySnapshot.forEach((doc) => {
            listings.push({ id: doc.id, ...doc.data() } as Property);
        });
      console.log('listings', listings);
          // Update the state with the fetched properties
          setRecentListings(prev => (nextBatch ? [...prev, ...listings] : listings));
      
          // Update the last fetched document for pagination
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);

          // Check if there are more properties to fetch (i.e., if we have 5 documents in this batch)
          setHasMore(listings.length >= (document_size));
          console.log(hasMore, 'hasMore');
          setDocIncrement(docincrement + 5); // Increment the document size for the next batch
          setExpectedListings(docincrement+document_size)
        } else {
          toast({title: 'all properties has been loaded', variant: 'default'});
          // No more properties to load
          setHasMore(false);
        }
      
        setRecentListingsLoading(false);
        setNextBatch(true); // Set to true for the next batch
    } catch (error) {
        console.error("Error fetching listings:", error);
        return [];
    }
}

useEffect(() => {
  Get_recent_listings()}, [])

  useEffect(() => {console.log('rr',recent_listing, 'hasmore', hasMore)}, [recent_listing])



  return (
    <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(recent_listing.length === 0)?
          (Array.from({length:5}).map((_, index)=>(<PropertyCardSkeleton key={index}/>))):(recent_listing.map((listing, index) => (
              <Fragment key={index}>
              <Property_card listing={listing}/>
              </Fragment>
            )))}
            {recent_listings_loading && Array.from({ length: expectedListings }).map((_, index) => (<PropertyCardSkeleton key={index} />))}
        </div>
        <div className="mt-6 flex justify-center">
         {showBrowseLink?
          (<Button onClick={(()=>{router.push('/properties')})}>View more Properties</Button>) : 
          (hasMore&&<Button variant="outline" onClick={()=>{Get_recent_listings(); 
      setShowBrowseLink(true)}}>View more Properties</Button>)}
        </div>
        </>

  )
}
