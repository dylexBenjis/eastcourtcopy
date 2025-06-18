"use client"
import Image from "next/image"
import { Bath, Bed, Building, Edit, Eye, Heart, MapPin, MoreHorizontal, Trash, User } from "lucide-react"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { ActiveTab_Context } from "../components/activeTab-provider"
import { Key, useContext, useEffect, useState } from "react"
import {Get_logged_in_user_listed_properties } from "../lib/user"
import { AuthState_Context} from "../lib/auth_state"
import Link from "next/link"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import Property_card from "../components/property_card"

export function MyListings({ activeTab = "listings" }) {
  // Sample listings data
  interface Listing {
    id: number;
    title: string;
    price: number;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    images: string[];
    saved?: boolean;
    inquired?: boolean;
    status?: string;
    views?: number;
    inquiries?: number;
  }
  
  const [myListings, setMyListings] = useState<Listing[]>([])
  const [gettingListings, setGettingListings] = useState(true)
    const {user, loading} = useContext(AuthState_Context)
 

  useEffect(()=>{


  const stored_listings = sessionStorage.getItem('my-listings');
const fetchListings = async () => {
  try{if (stored_listings) {
    console.log('no need fetching', myListings, stored_listings);
    const parsedListings = JSON.parse(stored_listings);
    setMyListings(parsedListings);
    setGettingListings(false);
    console.log(parsedListings, 'my listings');
  } else {
    setGettingListings(true);
  }
}catch(error){
  console.log('error getting from session storage', error)
}};

fetchListings();

//fetch user listings from firestore
//if user is logged in and no listings in session storage
const fetchUser = async () => {

  if(stored_listings === null){
    try{
      console.log('fetching data')
      const loggedin_user = await Get_logged_in_user_listed_properties(user?.uid)
      if(loggedin_user) {
        sessionStorage.setItem('my-listings',JSON.stringify(loggedin_user));
        const stored_listings = sessionStorage.getItem('my-listings');
        if(stored_listings) setMyListings(JSON.parse(stored_listings))
        setGettingListings(false)}
      console.log(user?.uid, 'my listings', loggedin_user);
  }
    catch(e){
      setGettingListings(false)
      console.log('error getting user from firestore')
    }
  }}
  fetchUser();
  },[user?.uid])

  const interestedListings = [
    {
      id: 3,
      title: "Luxury Penthouse",
      price: 750000,
      location: "Marina District, San Francisco",
      beds: 3,
      baths: 3.5,
      sqft: 2000,
      type: "Penthouse",
      image: "/placeholder.svg?height=300&width=400",
      saved: true,
      inquired: true,
    },
    {
      id: 4,
      title: "Cozy Studio in Historic Building",
      price: 220000,
      location: "Old Town, Chicago",
      beds: 1,
      baths: 1,
      sqft: 650,
      type: "Studio",
      image: "/placeholder.svg?height=300&width=400",
      saved: true,
      inquired: false,
    },
    {
      id: 5,
      title: "Waterfront Condo",
      price: 520000,
      location: "Harbor View, Seattle",
      beds: 2,
      baths: 2,
      sqft: 1400,
      type: "Condo",
      image: "/placeholder.svg?height=300&width=400",
      saved: true,
      inquired: true,
    },
  ]

  //header activetab context
  const { setActiveTab} = useContext(ActiveTab_Context);

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 max-w-[1200px]">
      <h1 className="mb-6 text-3xl font-bold">My Dashboard</h1>

      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="approved">Approved Listings</TabsTrigger>
          <TabsTrigger value="unapproved">Unapproved Listings</TabsTrigger>
          <TabsTrigger value="all">All Listings</TabsTrigger>

        </TabsList>

        <TabsContent value="approved">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties You're Selling</h2>
            <Button onClick={()=>{if(setActiveTab) setActiveTab('post')}}>Post New Property</Button>
          </div>

          {user?(!gettingListings ? (myListings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You haven't posted any properties for sale or rent yet.
              </p>
              <Button>Post Your First Property</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {myListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                {listing.images==undefined?<Image src={"/placeholder.svg"} alt={listing.title} fill className="object-cover" />
    : <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
         
}
                  <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge>
                  <Badge className="absolute right-2 top-2 bg-primary">${listing.price.toLocaleString()}</Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-xl font-semibold">{listing.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="flex items-center text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.location}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.beds} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.baths} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    {/* <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {listing.views} views
                    </span> */}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />Edit
                  </Button>
                  <Button size='sm' className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full" asChild>
              <Link href={`/${listing.id}`}>View Details</Link>
          </Button>
                </CardFooter>
              </Card>
              ))} 
            </div>
          )):(<div>loading...</div>)):(
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <Button onClick={()=>{ if(setActiveTab) setActiveTab('signin')}}>Click here to Sign in</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unapproved">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties You're Interested In</h2>
          </div>

          {interestedListings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No saved properties</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You haven't saved any properties or made inquiries yet.
              </p>
              <Button>Browse Properties</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {interestedListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      fill
                      className="object-cover"
                    />
                    {listing.saved && (
                      <Badge className="absolute left-2 top-2 bg-red-500">
                        <Heart className="mr-1 h-3 w-3 fill-current" />
                        Saved
                      </Badge>
                    )}
                    <Badge className="absolute right-2 top-2 bg-primary">${listing.price.toLocaleString()}</Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <h3 className="line-clamp-1 text-xl font-semibold">{listing.title}</h3>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-1 h-3 w-3" />
                      {listing.location}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center text-sm">
                          <Bed className="mr-1 h-3 w-3" />
                          {listing.beds} bd
                        </span>
                        <span className="flex items-center text-sm">
                          <Bath className="mr-1 h-3 w-3" />
                          {listing.baths} ba
                        </span>
                        <span className="flex items-center text-sm">
                          <Building className="mr-1 h-3 w-3" />
                          {listing.sqft} sqft
                        </span>
                      </div>
                    </div>
                    {listing.inquired && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          Inquiry Sent
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                    <Button variant="outline" size="sm">
                      {listing.inquired ? "Message" : "Contact Agent"}
                    </Button>
                    <Button size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {/* <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties You're Selling</h2>
            <Button onClick={()=>{if(setActiveTab) setActiveTab('post')}}>Post New Property</Button>
          </div> */}

          {user?(!gettingListings ? (myListings?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You haven't posted any properties for sale or rent yet.
              </p>
              <Button>Post Your First Property</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {myListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                {listing.images==undefined?<Image src={"/placeholder.svg"} alt={listing.title} fill className="object-cover" />
    : <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
         
}
                  <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge>
                  <Badge className="absolute right-2 top-2 bg-primary">${listing.price.toLocaleString()}</Badge>
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 text-xl font-semibold">{listing.title}</h3>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {/* <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem> */}
                        <DropdownMenuItem className="flex items-center text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    {listing.location}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-sm">
                        <Bed className="mr-1 h-3 w-3" />
                        {listing.beds} bd
                      </span>
                      <span className="flex items-center text-sm">
                        <Bath className="mr-1 h-3 w-3" />
                        {listing.baths} ba
                      </span>
                      <span className="flex items-center text-sm">
                        <Building className="mr-1 h-3 w-3" />
                        {listing.sqft} sqft
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    {/* <span className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {listing.views} views
                    </span> */}
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />Edit
                  </Button>
                  <Button size='sm' className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full" asChild>
              <Link href={`/${listing.id}`}>View Details</Link>
          </Button>
                </CardFooter>
              </Card>
              ))} 
            </div>
          )):(<div>loading...</div>)):(
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <Button onClick={()=>{ if(setActiveTab) setActiveTab('signin')}}>Click here to Sign in</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
