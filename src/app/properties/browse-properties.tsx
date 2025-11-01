"use client";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Hotel, Search } from "lucide-react";
import { MapPin } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { RecentListings } from "../recent-listings";

const Browse_Properties = () => {
  const [priceRange, setPriceRange] = useState([50000, 500000]);

  return (
    <div className="my-5">
      <section className="mb-10 rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-center">
          <h2 className="text-2xl font-bold">
            Explore The Listings and Find Your Dream Property
          </h2>
          {/* <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="flex items-center gap-1">
          {expanded ? "Less filters" : "More filters"}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </Button> */}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="space-y-2 w-full">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="City, neighborhood, or address"
                className="pl-8"
              />
            </div>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="property_type">Property Type</Label>
            <div className="relative">
              <Hotel className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="property_type"
                placeholder="Rent or Sale"
                className="pl-8"
              />
            </div>
          </div>
          {/* 
        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider
              defaultValue={[0, 1000000]}
              max={1000000000}
              min={0}
              step={10000}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div> */}

          <div className="mt-6 flex justify-center">
            <Button className="gap-2 flex">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <RecentListings />
    </div>
  );
};
export default Browse_Properties;
