"use client"

import { Fragment, useContext, useEffect, useState } from "react"
import Image from "next/image"
import { Bath, Bed, Building, ChevronDown, MapPin, Search } from "lucide-react"

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
import Browse_Properties from "./browse-properties"
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { firestoreDb } from "../lib/firebase";
import { Property } from "../lib/upload-properties"
import { toast } from "../hooks/use-toast"
import PropertyCardSkeleton from "../components/property_card_skeleton"





export function HomePage() {
  const [priceRange, setPriceRange] = useState([50000, 500000])
  const [expanded, setExpanded] = useState(false)


  // Sample featured listings data
  const featuredListings = [
    {
      id: 1,
      title: "Modern Apartment with City View",
      price: 350000,
      location: "Downtown, New York",
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: "Apartment",
      image: ["/placeholder.svg?height=300&width=400"],
      featured: true,
    },
    {
      id: 2,
      title: "Spacious Family Home",
      price: 450000,
      location: "Suburbia, California",
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: "House",
      image: ["/placeholder.svg?height=300&width=400"],
      featured: true,
    },
    {
      id: 3,
      title: "Luxury Penthouse",
      price: 750000,
      location: "Marina District, San Francisco",
      beds: 3,
      baths: 3.5,
      sqft: 2000,
      type: "Penthouse",
      image: ["/placeholder.svg?height=300&width=400"],
      featured: true,
    },
    ,
  ]

  //skeleton card
  const [expectedListings, setExpectedListings] = useState(0);


  //activetab context
  const {setActiveTab}=useContext(ActiveTab_Context)

  //user
  const {user, loading} = useContext(AuthState_Context)


  //fetch recent listings from the database
  const [recent_listing, setRecentListings] = useState<Property[]>([])
  const [recent_listings_loading, setRecentListingsLoading] = useState(false)
  const [lastVisible, setLastVisible] = useState<Property>({}); // To store the last fetched document
const [docincrement, setDocIncrement] = useState(5); // Number of documents to fetch in each batch
const [nextBatch, setNextBatch] = useState(false); // To track if it's the next batch
  const [hasMore, setHasMore] = useState(true); 
async function Get_recent_listings() {
    try {
      setRecentListingsLoading(true)
        const document_size = 10; // Number of documents to fetch
        const listingsRef = collection(firestoreDb, "properties");
        
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
          toast({title: 'no more properties to load', variant: 'destructive'});
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
    <div className=" md:py-8">

{!user&&<div className="relative h-[calc(100vh/1.75)] bg-[url(/p3.webp)] bg-center bg-no-repeat bg-cover w-screen flex justify-center items-center">
<div className='absolute inset-0 bg-black bg-opacity-40'></div>
  <div className='relative z-10 flex flex-col gap-5 max-w-[768px] text-center text-white'>
  <h1  className="text-5xl font-bold">Welcome to Eastcourt,<br/> where you can submit and find a property suited for you.</h1>
  <p className="text-lg "><span  onClick={()=>{if(setActiveTab)setActiveTab('post')}} className="cursor-pointer text-blue-500 hover:text-blue-700">Click here</span> to submit properties or scroll down to start viewing properties close to you.</p>
</div>
</div>}

{/*browse properties */}
{/* 
<Browse_Properties/> */}

      {/* Featured Listings */}
      {/* <section className="mb-10 mt-10">
        <h2 className="mb-6 text-2xl font-bold">Featured Listings</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings
            .filter((listing) => listing.featured)
            .map((listing, index) => (
              <Fragment key={index}>
              <Property_card listing={listing}/>
              </Fragment>            ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="outline">View All Properties</Button>
        </div>
      </section> */}


  <div className='flex justify-center py-10'>
         {/* Recent Listings */}
      <section className='lg:w-[1200px] max-w-[1200px] container'>
        <h2 className="mb-6 text-2xl font-bold">Recently Listed Properties</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {recent_listing.map((listing, index) => (
              <Fragment key={index}>
              <Property_card listing={listing}/>
              </Fragment>
            ))}
            {recent_listings_loading && Array.from({ length: expectedListings }).map((_, index) => (<PropertyCardSkeleton key={index} />))}
        </div>
        <div className="mt-6 flex justify-center">
          {hasMore&&<Button variant="outline" onClick={()=>{Get_recent_listings()}}>View All Properties</Button>}
        </div>
      </section></div>

    </div>
  )
}
