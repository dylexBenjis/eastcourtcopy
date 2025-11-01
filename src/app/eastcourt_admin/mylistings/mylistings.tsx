"use client";
import Image from "next/image";
import {
  Bath,
  Bed,
  Building,
  Edit,
  Grid2x2Check,
  Heart,
  MapPin,
  MoreHorizontal,
  Trash,
  User,
} from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { ActiveTab_Context } from "@/src/components/activeTab-provider";
import { Key, useContext, useEffect, useState } from "react";
import { Get_logged_in_user_listed_properties } from "@/src/lib/user";
// Update the import path if the file is located elsewhere, for example:
import { AuthState_Context } from "@/src/lib/auth_state";
// Or, if the file does not exist, create 'auth_state.ts' in '../../lib/' with the following content:
// export const AuthState_Context = React.createContext({ user: null, loading: false });
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
import Property_card from "@/src//components/property_card";
import {
  Approve_property,
  Approved_property,
  delete_property,
  Property,
} from "@/src/lib/upload-properties";
import { getApprovedListings, getListings } from "@/src/lib/get_listings";
import { AuthForm } from "@/src/components/auth-form";
import { useRouter } from "next/navigation";
import { Edit_listing_Context } from "@/src/components/edit-listing-provider";

export function MyListings() {
  // Sample listings data
  interface Listing {
    id: string;
    title: string;
    price: number;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    type: string;
    images: object[];
    saved?: boolean;
    inquired?: boolean;
    status?: string;
    views?: number;
    inquiries?: number;
  }

  const [myListings, setMyListings] = useState<Property[]>([]);
  const [approved_Listings, setApprovedListings] = useState<
    Approved_property[]
  >([]);
  const [gettingListings, setGettingListings] = useState(true);
  const { user, loading } = useContext(AuthState_Context);
  console.log(user, loading);
  //fetch listings from firestore if not in session storage and
  const get_Listings = async () => {
    try {
      console.log("entered getListings");
      const listings = await getListings();
      // console.log('listings', listings);
      sessionStorage.setItem("my-listings", JSON.stringify(listings));
      localStorage.setItem("my-listings", JSON.stringify(listings));

      const stored_listings = JSON.parse(
        sessionStorage.getItem("my-listings") || "[]"
      );
      console.log(
        stored_listings,
        stored_listings?.length,
        sessionStorage.getItem("my-listings")
      );

      if (stored_listings?.length >= 1) {
        setMyListings(stored_listings);
      }
      setGettingListings(false);
    } catch (e) {
      setGettingListings(false);
      console.log("error getting listings from firestore", e);
    }
  };
  useEffect(() => {
    console.log(myListings);
  }, [myListings]);
  //fetch listings from firestore if not in session storage and
  const get_ApprovedListings = async () => {
    try {
      const listings = await getApprovedListings();
      // console.log('listings', listings);
      sessionStorage.setItem("approved-listings", JSON.stringify(listings));
      const stored_listings = JSON.parse(
        sessionStorage.getItem("approved-listings") || "[]"
      );
      if (stored_listings) {
        setApprovedListings(stored_listings);
      }
      setGettingListings(false);
    } catch (e) {
      setGettingListings(false);
      console.log("error getting listings from firestore");
    }
  };

  // Fetch listings from session storage or firestore
  useEffect(() => {
    const stored_listings = sessionStorage.getItem("my-listings");
    const fetchListings = async () => {
      try {
        if (stored_listings) {
          console.log("no need fetching", myListings, stored_listings);
          const parsedListings = JSON.parse(stored_listings);
          setMyListings(parsedListings);
          setGettingListings(false);
          console.log(parsedListings, "my listings");
        } else {
          setGettingListings(true);
        }
      } catch (error) {
        console.log("error getting from session storage", error);
      }
    };

    const stored_approved_listings =
      sessionStorage.getItem("approved-listings");
    const fetch_ApprovedListings = async () => {
      try {
        if (stored_approved_listings) {
          console.log(
            "no need fetching",
            approved_Listings,
            stored_approved_listings
          );
          const parsedListings = JSON.parse(stored_approved_listings);
          setApprovedListings(parsedListings);
          setGettingListings(false);
          console.log(parsedListings, "my listings");
        } else {
          setGettingListings(true);
        }
      } catch (error) {
        console.log("error getting from session storage", error);
      }
    };

    fetchListings();
    fetch_ApprovedListings();

    get_Listings();
    get_ApprovedListings();
  }, [user, loading]);

  //router
  const router = useRouter();

  //getting edit listing context functions to update the listing to be edited and if the listing is approved
  const { setEdit_list, setEdit_list_approved, edit_list } =
    useContext(Edit_listing_Context);

  useEffect(() => {
    console.log(user, edit_list);
  }, []);

  const handleEdit_approved = (listing: Approved_property) => {
    console.log(listing);
    setEdit_list?.(listing);
    setEdit_list_approved?.(true);
    router.push("/eastcourt_admin/editing_property");
    console.log("done handleEdit", edit_list);
  };
  const handleEdit_unapproved = (listing: Property) => {
    console.log(listing);
    setEdit_list?.(listing);
    setEdit_list_approved?.(false);
    router.push("/eastcourt_admin/editing_property");
    console.log("done handleEdit", edit_list);
  };

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8 max-w-[1200px]">
      <h1 className="mb-6 text-3xl font-bold">My Dashboard</h1>

      <Tabs defaultValue={"approved"} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="approved">Approved Listings</TabsTrigger>
          <TabsTrigger value="unapproved">Unapproved Listings</TabsTrigger>
          <TabsTrigger value="all">All Listings</TabsTrigger>
        </TabsList>

        <TabsContent value="approved">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties You're Selling</h2>
            <Button
              onClick={() => {
                router.push("/eastcourt_admin/post_property");
              }}
            >
              Post New Property
            </Button>
          </div>

          {user ? (
            !gettingListings ? (
              approved_Listings?.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    You haven't approved any properties for sale or rent yet.
                  </p>
                  <Button>Post Your First Property</Button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {approved_Listings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        {!listing.images || listing.images.length == 0 ? (
                          <Image
                            src={"/placeholder.svg"}
                            alt={""}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src={
                              listing.images[0].imageUrl || "/placeholder.svg"
                            }
                            alt={listing.images[0].imageUrl || "Property image"}
                            fill
                            className="object-cover"
                          />
                        )}

                        <Badge className="absolute right-2 top-2 bg-primary">
                          &#x20A6; {(listing.price ?? 0).toLocaleString()}
                        </Badge>
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex items-center justify-between">
                          <h3 className="line-clamp-1 text-xl font-semibold">
                            {listing.title}
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="flex items-center text-destructive"
                                onClick={async () => {
                                  await delete_property(listing.id ?? "", true);
                                  sessionStorage.removeItem(
                                    "approved-listings"
                                  );
                                  get_ApprovedListings();
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Listing
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground ">
                          <MapPin className="mr-1 h-3 w-3" />
                          <p className="line-clamp-1">{listing.address}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center text-sm">
                              <Bed className="mr-1 h-3 w-3" />
                              {listing.bedrooms} bd
                            </span>
                            <span className="flex items-center text-sm">
                              <Bath className="mr-1 h-3 w-3" />
                              {listing.bathrooms} ba
                            </span>
                            <span className="flex items-center text-sm">
                              <Building className="mr-1 h-3 w-3" />
                              {listing.areaSqFt} sqft
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit_approved(listing)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full"
                          asChild
                        >
                          <Link href={`/eastcourt_admin/${listing.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              <div>loading...</div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <AuthForm type="login" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="unapproved">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Properties Pending To Be Approved
            </h2>
            <Button
              onClick={() => {
                router.push("/eastcourt_admin/post_property");
              }}
            >
              Post New Property
            </Button>
          </div>

          {user ? (
            !gettingListings ? (
              myListings?.length === 0 ? (
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
                        {!listing.images || listing.images.length === 0 ? (
                          <Image
                            src={"/placeholder.svg"}
                            alt={""}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Image
                            src={
                              listing.images[0]?.imageUrl ?? "/placeholder.svg"
                            }
                            alt={
                              listing.images[0]?.imageUrl || "/placeholder.svg"
                            }
                            fill
                            className="object-cover"
                          />
                        )}

                        <Badge className="absolute right-2 top-2 bg-primary">
                          &#x20A6; {(listing.price ?? 0).toLocaleString()}
                        </Badge>
                      </div>
                      <CardHeader className="p-4 pb-0">
                        <div className="flex items-center justify-between">
                          <h3 className="line-clamp-1 text-xl font-semibold">
                            {listing.title}
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="flex items-center"
                                onClick={async () => {
                                  await Approve_property(listing.id ?? "");
                                  sessionStorage.removeItem("my-listings");
                                  get_Listings();
                                }}
                              >
                                <Grid2x2Check className="mr-2 h-4 w-4" />
                                Approve Listing
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center text-destructive"
                                onClick={async () => {
                                  await delete_property(listing.id ?? "");
                                  sessionStorage.removeItem("my-listings");
                                  get_Listings();
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Listing
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground ">
                          <MapPin className="mr-1 h-3 w-3" />
                          <p className="line-clamp-1">{listing.address}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center text-sm">
                              <Bed className="mr-1 h-3 w-3" />
                              {listing.bedrooms} bd
                            </span>
                            <span className="flex items-center text-sm">
                              <Bath className="mr-1 h-3 w-3" />
                              {listing.bathrooms} ba
                            </span>
                            <span className="flex items-center text-sm">
                              <Building className="mr-1 h-3 w-3" />
                              {listing.areaSqFt} sqft
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit_unapproved(listing)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full"
                          asChild
                        >
                          <Link href={`/${listing.id}`}>View Details</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )
            ) : (
              <div>loading...</div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <AuthForm type="login" />
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {/* <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Properties You're Selling</h2>
            <Button onClick={()=>{if(setActiveTab) setActiveTab('post')}}>Post New Property</Button>
          </div> */}

          {user ? (
            !gettingListings ? (
              approved_Listings?.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <h3 className="mb-2 text-lg font-medium">No listings yet</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    You haven't posted any properties for sale or rent yet.
                  </p>
                  <Button>Post Your First Property</Button>
                </div>
              ) : (
                <div className="gap-5">
                  <section className="flex flex-col gap-2">
                    {" "}
                    <h2 className="text-xl font-semibold">
                      {" "}
                      Approved Properties.{" "}
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {approved_Listings.map((listing) => (
                        <Card key={listing.id} className="overflow-hidden">
                          <div className="relative h-48 w-full">
                            {!listing.images || listing.images.length == 0 ? (
                              <Image
                                src={"/placeholder.svg"}
                                alt={""}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src={
                                  listing.images[0].imageUrl ||
                                  "/placeholder.svg"
                                }
                                alt={
                                  listing.images[0].imageUrl ||
                                  "/placeholder.svg"
                                }
                                fill
                                className="object-cover"
                              />
                            )}
                            {/* <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge> */}
                            <Badge className="absolute right-2 top-2 bg-primary">
                              &#x20A6; {(listing.price ?? 0).toLocaleString()}
                            </Badge>
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <div className="flex items-center justify-between">
                              <h3 className="line-clamp-1 text-xl font-semibold">
                                {listing.title}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {/* <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Listing
                        </DropdownMenuItem> */}
                                  <DropdownMenuItem
                                    className="flex items-center text-destructive"
                                    onClick={async () => {
                                      await delete_property(
                                        listing.id ?? "",
                                        true
                                      );
                                      sessionStorage.removeItem(
                                        "approved-listings"
                                      );
                                      get_ApprovedListings();
                                    }}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Listing
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <p className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="mr-1 h-3 w-3" />
                              <p className="line-clamp-1">{listing.address}</p>
                            </p>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="flex items-center text-sm">
                                  <Bed className="mr-1 h-3 w-3" />
                                  {listing.bedrooms} bd
                                </span>
                                <span className="flex items-center text-sm">
                                  <Bath className="mr-1 h-3 w-3" />
                                  {listing.bathrooms} ba
                                </span>
                                <span className="flex items-center text-sm">
                                  <Building className="mr-1 h-3 w-3" />
                                  {listing.areaSqFt} sqft
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit_approved(listing)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full"
                              asChild
                            >
                              <Link href={`/${listing.id}`}>View Details</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </section>
                  <section className="flex flex-col gap-2 mt-8">
                    <h2 className="text-xl font-semibold">
                      {" "}
                      Pending To Be Approved Properties.{" "}
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {myListings.map((listing) => (
                        <Card key={listing.id} className="overflow-hidden">
                          <div className="relative h-48 w-full">
                            {!listing.images || listing.images.length == 0 ? (
                              <Image
                                src={"/placeholder.svg"}
                                alt={""}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src={
                                  listing.images[0].imageUrl ||
                                  "/placeholder.svg"
                                }
                                alt={
                                  listing.images[0].imageUrl ||
                                  "/placeholder.svg"
                                }
                                fill
                                className="object-cover"
                              />
                            )}
                            {/* <Badge
                    className={`absolute left-2 top-2 ${
                      listing.status === "Active"
                        ? "bg-green-500"
                        : listing.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {listing.status}
                  </Badge> */}
                            <Badge className="absolute right-2 top-2 bg-primary">
                              &#x20A6;{(listing.price ?? 0).toLocaleString()}
                            </Badge>
                          </div>
                          <CardHeader className="p-4 pb-0">
                            <div className="flex items-center justify-between">
                              <h3 className="line-clamp-1 text-xl font-semibold">
                                {listing.title}
                              </h3>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="flex items-center"
                                    onClick={async () => {
                                      await Approve_property(listing.id ?? "");
                                      sessionStorage.removeItem("my-listings");
                                      get_Listings();
                                    }}
                                  >
                                    <Grid2x2Check className="mr-2 h-4 w-4" />
                                    Approve Listing
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="flex items-center text-destructive"
                                    onClick={async () => {
                                      await delete_property(listing.id ?? "");
                                      sessionStorage.removeItem("my-listings");
                                      get_Listings();
                                    }}
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete Listing
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground ">
                              <MapPin className="mr-1 h-3 w-3" />
                              <p className="line-clamp-1">{listing.address}</p>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="flex items-center text-sm">
                                  <Bed className="mr-1 h-3 w-3" />
                                  {listing.bedrooms} bd
                                </span>
                                <span className="flex items-center text-sm">
                                  <Bath className="mr-1 h-3 w-3" />
                                  {listing.bathrooms} ba
                                </span>
                                <span className="flex items-center text-sm">
                                  <Building className="mr-1 h-3 w-3" />
                                  {listing.areaSqFt} sqft
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit_unapproved(listing)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              className="hover:bg-gray-900 dark:hover:bg-gray-200 w-full"
                              asChild
                            >
                              <Link href={`/${listing.id}`}>View Details</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </section>
                </div>
              )
            ) : (
              <div>loading...</div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mb-2 text-lg font-medium">No listings</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                You are not Signed in
              </p>
              <AuthForm type="login" />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
