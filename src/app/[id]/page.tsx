import Image from "next/image"
import Link from "next/link"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Share2,
  Car,
  Trees,
  Utensils,
  Wifi,
  School,
  ShoppingBag,
  Dumbbell,
} from "lucide-react"
import { GetStaticPaths, GetStaticProps } from "next"
import { firestoreDb } from "@/src/lib/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/src/components/ui/carousel"
import { Key } from "react"

//define dynamic paths
export async function generateStaticParams() {
    const snapshot = await getDocs(collection(firestoreDb, 'properties'));
    const paths = snapshot.docs.map((doc) => ({
      params: doc.id ,
    }))
   
    return paths.map((element) => ({
      id: element.params,
    }))
  }


 


export default async function PropertyDetailsPage({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {

    const { id } = await params

    // fetch data based on id
    const docRef = doc(firestoreDb, "properties", id); 
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return <div>Property not found</div>
        }
    const property = docSnap.data();

  //fetch user data based on property.id
  const userRef = doc(firestoreDb, "users", property.userId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    return <div>User not found</div>
  }
  const user = userSnap.data();



  return (
      <div className=" flex justify-center min-h-screen w-screen mt-10"><div className="container lg:max-w-[1200px]">
      {/* Property Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="text-2xl md:text-3xl font-bold">&#x20A6; {property.price.toLocaleString()}</span>
          <div className="flex gap-2">
            <Button size="icon" variant="outline">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Button size="icon" variant="outline">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share property</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Property Images */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 md:row-span-2">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Property main image"
            width={800}
            height={600}
            className="rounded-lg object-cover w-full h-full"
            priority
          />
        </div>
        <div>
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Property image 2"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div>
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Property image 3"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div>
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Property image 4"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
        <div className="relative">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="Property image 5"
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-full"
          />
          <Button variant="secondary" className="absolute bottom-4 right-4">
            View all 12 photos
          </Button>
        </div>
      </div> */}


      <div className="flex w-full justify-center m-10">
      <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {property.images.map((image:string, index:Key) => (
          <CarouselItem key={index}>
            <div className="p-1">
                  <Image src={image} alt={image} height={600} width={800} className=" object-contain"/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel></div>
      

      {/* Property Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div className="flex gap-1 items-center">
                  <p className="font-medium">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div className="flex gap-1 items-center">
                    <p className="font-medium">3.5</p>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Maximize2 className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div className="flex gap-1 items-center">
                    <p className="font-medium">3,250</p>
                    <p className="text-sm text-muted-foreground">Square Feet</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div className="flex gap-1 items-center">
                    <p className="font-medium">{property.bedrooms}</p>
                    <p className="text-sm text-muted-foreground">Garage</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="description">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  {/* <TabsTrigger value="features">Features</TabsTrigger> */}
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Property Description</h3>
                  <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                    {property.description}
                  </p>
                </TabsContent>
                {/* <TabsContent value="features" className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Property Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Smart Home System</span>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Gourmet Kitchen</span>
                    </div>
                    <div className="flex items-center">
                      <Trees className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Landscaped Garden</span>
                    </div>
                    <div className="flex items-center">
                      <Dumbbell className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Home Gym</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Infinity Pool</span>
                    </div>
                    <div className="flex items-center">
                      <Car className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Electric Car Charging</span>
                    </div>
                    <div className="flex items-center">
                      <Maximize2 className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>Walk-in Closets</span>
                    </div>
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 mr-3 text-muted-foreground" />
                      <span>High-Speed Internet</span>
                    </div>
                  </div>
                </TabsContent> */}
                <TabsContent value="location" className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Location & Nearby</h3>
                  <div className="aspect-video bg-muted rounded-lg mb-6 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{border: 0}}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${property.address}&output=embed`}>
                  </iframe>
                  </div>
                  <h4 className="font-medium mb-3">Address</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                      </div>
                    </div>
                    {/* <div className="flex items-center">
                      <ShoppingBag className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Malibu Country Mart</p>
                        <p className="text-sm text-muted-foreground">1.2 miles</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Utensils className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Nobu Malibu</p>
                        <p className="text-sm text-muted-foreground">1.5 miles</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Trees className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Malibu Beach</p>
                        <p className="text-sm text-muted-foreground">0.3 miles</p>
                      </div>
                    </div> */}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Contact Agent Card */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                {user.userImageUrl?<Image
                  src={user.userImageUrl}
                  alt="Real estate agent"
                  width={80}
                  height={80}
                  className="rounded-full"
                />:<Image
                  src="/placeholder.svg"
                  alt="Real estate agent"
                  width={80}
                  height={80}
                  className="rounded-full"
                />}
                <div>
                  <h3 className="font-semibold">{user.userName}</h3>
                  <p className="text-sm text-muted-foreground">Luxury Property Specialist</p>
                  <p className="text-sm">License #01234567</p>
                </div>
              </div>
              <div className="space-y-4">
                <Button className="w-full">Contact Agent</Button>
                {/* <Button variant="outline" className="w-full">
                  Schedule a Tour
                </Button>
                <Button variant="outline" className="w-full">
                  Request More Info
                </Button> */}
              </div>
              <Separator className="my-6" />
              {/* <div className="space-y-4">
                <h4 className="font-medium">Mortgage Estimate</h4>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span>$1,960,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Down Payment (20%)</span>
                  <span>$490,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span>5.25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Term</span>
                  <span>30 years</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Est. Monthly Payment</span>
                  <span>$10,825</span>
                </div>
                <Button variant="link" className="w-full p-0">
                  Get Pre-Approved
                </Button>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative">
                <Image
                  src={`/placeholder.svg?height=250&width=400&text=Property ${i}`}
                  alt={`Similar property ${i}`}
                  width={400}
                  height={250}
                  className="w-full object-cover"
                />
                <Badge className="absolute top-3 left-3">For Sale</Badge>
                <Button size="icon" variant="ghost" className="absolute top-3 right-3 bg-background/80 rounded-full">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-1">
                  <Link href="#" className="hover:underline">
                    {i === 1 ? "Beachfront Condo" : i === 2 ? "Modern Hillside Home" : "Luxury Penthouse"}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {i === 1 ? "Malibu, CA" : i === 2 ? "Beverly Hills, CA" : "Santa Monica, CA"}
                </p>
                <p className="font-bold mb-3">${i === 1 ? "1,850,000" : i === 2 ? "3,200,000" : "2,750,000"}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{i === 1 ? "2" : i === 2 ? "5" : "3"}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{i === 1 ? "2" : i === 2 ? "4.5" : "3"}</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize2 className="h-4 w-4 mr-1" />
                    <span>{i === 1 ? "1,200" : i === 2 ? "4,500" : "2,800"} sq ft</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div></div>
  )
}
