import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
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
} from "lucide-react";
import { GetStaticPaths, GetStaticProps } from "next";
import { firestoreDb } from "@/src/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import { Key } from "react";
import EmblaCarousel from "@/src/components/carousel-ui/emblacarousel";

//define dynamic paths
export async function generateStaticParams() {
  const snapshot = await getDocs(
    collection(firestoreDb, "approved_properties")
  );
  const paths = snapshot.docs.map((doc) => ({
    params: doc.id,
  }));

  return paths.map((element) => ({
    id: element.params,
  }));
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // fetch data based on id
  const docRef = doc(firestoreDb, "approved_properties", id);
  const docSnap = await getDoc(docRef);
  var property: any;
  var docSnap2: any;
  if (!docSnap.exists()) {
    const docRef2 = doc(firestoreDb, "properties", id);
    docSnap2 = await getDoc(docRef2);
    if (!docSnap2.exists()) {
      return <div>Property not found</div>;
    }
  }
  if (docSnap.exists()) {
    property = docSnap.data();
  } else if (docSnap2.exists()) {
    property = docSnap2.data();
  }

  //fetch user data based on property.id
  // const userRef = doc(firestoreDb, "users", property.userId);
  // const userSnap = await getDoc(userRef);
  // if (!userSnap.exists()) {
  //   return <div>User not found</div>
  // }
  // const user = userSnap.data();

  return (
    <div className=" flex justify-center min-h-screen w-screen mt-10">
      <div className="container lg:max-w-[1200px] px-5">
        {/* Property Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-2xl md:text-3xl font-bold">
              &#x20A6; {property.price.toLocaleString()}
            </span>
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

        <div className="flex w-full justify-center mb-5">
          <EmblaCarousel slides={property.images} />
        </div>

        {/* Property Overview */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10 w-full">
          <Card className=" lg:w-[calc(60%)]">
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

              <div>
                <div className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Property Description
                  </h3>
                  <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                    {property.description}
                  </p>
                </div>
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
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              {" "}
              <div>
                <div className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Location & Nearby
                  </h3>
                  <div className="aspect-video bg-muted rounded-lg mb-6 overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${property.location}&output=embed`}
                    ></iframe>
                  </div>
                  <h4 className="font-medium mb-3">Address</h4>
                  <div className="flex">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {property.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
