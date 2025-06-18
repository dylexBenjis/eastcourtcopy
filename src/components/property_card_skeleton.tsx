"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Bath, Bed, Building, MapPin } from "lucide-react"

const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-800 animate-pulse">
        {/* Price badge skeleton */}
        <div className="absolute right-2 top-2 h-6 w-24 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      </div>

      <CardHeader className="p-4 pb-0">
        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        {/* Location skeleton */}
        <div className="flex items-center mt-2">
          <MapPin className="mr-1 h-3 w-3 text-gray-300 dark:text-gray-700" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Beds skeleton */}
            <span className="flex items-center">
              <Bed className="mr-1 h-3 w-3 text-gray-300 dark:text-gray-700" />
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </span>
            {/* Baths skeleton */}
            <span className="flex items-center">
              <Bath className="mr-1 h-3 w-3 text-gray-300 dark:text-gray-700" />
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </span>
            {/* Sqft skeleton */}
            <span className="flex items-center">
              <Building className="mr-1 h-3 w-3 text-gray-300 dark:text-gray-700" />
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Button skeleton */}
        <div className="h-9 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  )
}

export default PropertyCardSkeleton
