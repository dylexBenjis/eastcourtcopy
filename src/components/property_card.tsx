'use client'
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bath, Bed, Building, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Key, useContext } from "react";
import { ActiveTab_Context } from "./activeTab-provider";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Link from "next/link";

const Property_card = ({listing}:any)=>{


  //activetab context
  const {setActiveTab}=useContext(ActiveTab_Context)

    console.log(listing.price,listing.price.toLocaleString())
    return(
    <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
         {listing.images==undefined?<Image src={"/placeholder.svg"} alt={listing.title} fill className="object-cover" />
    : <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.title} fill className="object-cover" />
         
}
          <Badge className="absolute right-2 top-2 bg-primary px-2 py-1">&#x20A6; {listing.price.toLocaleString()}</Badge>
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
                {listing.beds}
              </span>
              <span className="flex items-center text-sm">
                <Bath className="mr-1 h-3 w-3" />
                {listing.baths}
              </span>
              <span className="flex items-center text-sm">
                <Building className="mr-1 h-3 w-3" />
                {listing.sqft} sqft
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="hover:bg-gray-200 dark:hover:bg-gray-800 w-full" asChild>
              <Link href={`/${listing.id}`}>View Details</Link>
          </Button>
        </CardFooter>
      </Card>)
}

export default Property_card;