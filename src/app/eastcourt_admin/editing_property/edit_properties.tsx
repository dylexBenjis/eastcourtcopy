"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Edit_listing_Context } from "@/src/components/edit-listing-provider";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { Upload } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { SheetTitle } from "@/src/components/ui/sheet";
import { getBlobToken } from "../../actions/actions";
import { del, put } from "@vercel/blob";
import { Property, Update_new_property } from "@/src/lib/upload-properties";
import { PrevButton } from "@/src/components/carousel-ui/emblacarousel-buttons";
import CryptoJs from "crypto-js";

const Edit_Properties = () => {
  //get listing and approved from editlisting context
  const { edit_list, approved } = useContext(Edit_listing_Context);

  console.log(edit_list);
  //set states
  const [title, setTitle] = useState(edit_list.title);
  const [role, setRole] = useState(edit_list.role);
  const [price, setPrice] = useState(edit_list.price);
  const [label, setLabel] = useState(edit_list.label);
  const [labelValue, setLabelValue] = useState<string>("");

  const [bedrooms, setBedrooms] = useState(edit_list.bedrooms);
  const [bathrooms, setBathrooms] = useState(edit_list.bathrooms);
  const [property_type, setPropertyType] = useState(edit_list.property_type);
  const [rent_period, setRentPeriod] = useState(edit_list.rent_period);
  const [description, setDescription] = useState(edit_list.description);
  const [sqft, setSQFT] = useState(edit_list.areaSqFt);
  const [parking, setParking] = useState(edit_list.parking);
  const [address, setAddress] = useState(edit_list.address);
  const [location, setLocation] = useState(edit_list.location);
  const [files, setFiles] = useState<
    | {
        type?: string | undefined;
        imageUrl?: string | undefined;
      }[]
    | undefined
  >(edit_list.images);
  const [new_files, setNewFiles] = useState<
    {
      file: File;
      imageUrls: string;
      name: string;
    }[]
  >([]);
  const [deletedFiles, setDeletedFiles] = useState<
    {
      type?: string | undefined;
      imageUrl?: string | undefined;
    }[]
  >([]);
  useEffect(() => {
    console.log(files);
    if (label == "FOR_SALE") {
      setLabelValue("sale");
    } else {
      setLabelValue("rent");
    }
  }, []);

  //handle select images button click
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  //form reference
  const formRef = useRef<HTMLFormElement>(null);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => {
        return file;
      });
      const imageUrls = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      const uuid = self.crypto.randomUUID();
      // .map((file) => URL.createObjectURL(file))
      setNewFiles([
        ...new_files,
        ...imageUrls.map((url, index) => ({
          name: `${uuid}${newImages[index].name}`,
          imageUrls: url,
          file: newImages[index],
        })),
      ]);
    }
    e.target.value = ""; // Clear the input value to allow re-uploading the same file;
  };
  useEffect(() => {
    // Find the first image
    const imageIndex = new_files.findIndex((image) =>
      image.file.type.startsWith("image/")
    );

    if (imageIndex > 0) {
      // Swap the first file with the first image
      const temp = new_files[0];
      new_files[0] = new_files[imageIndex];
      new_files[imageIndex] = temp;
    }
    console.log("Images:", new_files, "dbimage:", edit_list.images);
  });

  //remove new image or video file
  const remove_newImage = (index: number) => {
    setNewFiles((prevImages) => prevImages?.filter((_, i) => i !== index));
  };

  //remove image or video file
  const removeImage = (index: number) => {
    if (files) {
      setDeletedFiles([...deletedFiles, files[index]]);
    }
    setFiles((prevImages) => prevImages?.filter((_, i) => i !== index));
  };

  //work on both new and old property image and video files
  const [updatedFiles, setUpdatedFiles] = useState<
    { type?: string | undefined; imageUrl?: string | undefined }[]
  >([]);

  const [propertyData, setPropertyData] = useState<Property>({});
  const check_changes = () => {
    setPropertyData({ id: edit_list.id });

    if (title !== edit_list.title) {
      setPropertyData((prev) => ({ ...prev, title }));
    }
    if (description !== edit_list.description) {
      setPropertyData((prev) => ({ ...prev, description }));
    }
    if (role !== edit_list.role) {
      setPropertyData((prev) => ({ ...prev, role }));
    }
    if (price !== edit_list.price) {
      setPropertyData((prev) => ({ ...prev, price }));
    }
    if (property_type !== edit_list.property_type) {
      setPropertyData((prev) => ({ ...prev, property_type }));
    }
    if (rent_period !== edit_list.rent_period) {
      setPropertyData((prev) => ({ ...prev, rent_period }));
    }
    if (label !== edit_list.label) {
      if (labelValue === "sale") {
        setPropertyData((prev) => ({ ...prev, label: "FOR__SALE" }));
      } else {
        setPropertyData((prev) => ({ ...prev, label: "FOR_RENT" }));
      }
    }
    if (location !== edit_list.location) {
      setPropertyData((prev) => ({ ...prev, location }));
    }
    if (address !== edit_list.address) {
      setPropertyData((prev) => ({ ...prev, address }));
    }
    if (parking !== edit_list.parking) {
      setPropertyData((prev) => ({ ...prev, parking }));
    }
    if (bedrooms !== edit_list.bedrooms) {
      setPropertyData((prev) => ({ ...prev, bedrooms }));
    }
    if (bathrooms !== edit_list.bathrooms) {
      setPropertyData((prev) => ({ ...prev, bathrooms }));
    }
    if (sqft !== edit_list.areaSqFt) {
      setPropertyData((prev) => ({ ...prev, areaSqFt: sqft }));
    }
    if (updatedFiles !== edit_list.images) {
      setPropertyData((prev) => ({ ...prev, images: [...updatedFiles] }));
    }
    return "propertydata is set";
  };
  useEffect(() => {
    if (files) {
      setUpdatedFiles([...files]);
    }
    console.log(
      "updatedfiles",
      updatedFiles,
      "files",
      files,
      "property",
      propertyData
    );
  }, [files]);

  useEffect(() => {
    check_changes();
  }, [
    title,
    description,
    role,
    price,
    property_type,
    rent_period,
    labelValue,
    location,
    address,
    parking,
    bedrooms,
    bathrooms,
    sqft,
    updatedFiles,
  ]);
  useEffect(() => {
    console.log(
      "updatedfiles",
      updatedFiles,
      "files",
      files,
      "property",
      propertyData,
      "del:",
      deletedFiles
    );
  }, [propertyData]);

  const handlePropertyUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // if(images.length === 0){
    //   console.log("No images selected")

    // }else {
    //   try{      for(const image of images){
    //     const token = await getBlobToken();

    //     //upload image to vercel blob
    // if(image.file.type.startsWith('image/')) {
    //   const uploadedImages = await put(image.name, image.file, { access: 'public', token: token });
    //   console.log("Uploaded Images:", uploadedImages)
    //   newImageArray.push({filename: `${image.name}${uploadedImages.pathname}`, imageUrls: uploadedImages.url, type: 'image'})}

    //   //upload video to cloudinary

    // if(image.file.type.startsWith('video/')) {
    //   const videoFormData = new FormData();
    //   videoFormData.append("file", image.file)
    //   videoFormData.append("upload_preset", "pnbiwcfw");
    //   for (const [key, value] of videoFormData.entries()) {
    //     console.log(`FormData entry: ${key}:`, value)
    //   }
    //   const res = await fetch(
    //   'https://api.cloudinary.com/v1_1/dgfgdtgkt/video/upload',
    //   {
    //     method: 'POST',
    //     body: videoFormData,
    //   }
    // );
    // const uploadedImages = await res.json()
    // console.log("Uploaded Images:", uploadedImages)
    //   newImageArray.push({filename: `${image.name}${uploadedImages.url}`, imageUrls: uploadedImages.url, type: 'video'})}
    //   console.log("newImageArray", newImageArray)
    // }}catch(error){console.log("Error uploading image:", error)}}

    // Handle form submission logic here
    const form = e.target as HTMLFormElement;

    var newImageArray: { type: string; imageUrls: string; filename: string }[] =
      [];

    var updatedPropertyData: Property = {};
    if (new_files.length === 0) {
      console.log("No images selected");
    } else {
      try {
        for (const image of new_files) {
          const token = await getBlobToken();

          //upload image to vercel blob
          if (image.file.type.startsWith("image/")) {
            const uploadedImages = await put(image.name, image.file, {
              access: "public",
              token: token,
            });
            console.log("Uploaded Images:", uploadedImages);
            newImageArray.push({
              filename: `${image.name}${uploadedImages.pathname}`,
              imageUrls: uploadedImages.url,
              type: "image",
            });
            updatedPropertyData = {
              ...propertyData,
              images: [
                ...(propertyData.images ?? []),
                { imageUrl: uploadedImages.url, type: "image" },
              ],
            };
            setPropertyData((prev) => ({
              ...prev,
              images: [
                ...(prev.images ?? []),
                { imageUrl: uploadedImages.url, type: "image" },
              ],
            }));
          }
          //upload video to cloudinary

          if (image.file.type.startsWith("video/")) {
            const videoFormData = new FormData();
            videoFormData.append("file", image.file);
            videoFormData.append("upload_preset", "pnbiwcfw");
            for (const [key, value] of videoFormData.entries()) {
              console.log(`FormData entry: ${key}:`, value);
            }
            const res = await fetch(
              "https://api.cloudinary.com/v1_1/dgfgdtgkt/video/upload",
              {
                method: "POST",
                body: videoFormData,
              }
            );
            const uploadedImages = await res.json();
            console.log("Uploaded Images:", uploadedImages);
            newImageArray.push({
              filename: `${image.name}${uploadedImages.pathname}`,
              imageUrls: uploadedImages.url,
              type: "video",
            });
            updatedPropertyData = {
              ...propertyData,
              images: [
                ...(propertyData.images ?? []),
                { imageUrl: uploadedImages.url, type: "video" },
              ],
            };
            setPropertyData((prev) => ({
              ...prev,
              images: [
                ...(prev.images ?? []),
                { imageUrl: uploadedImages.url, type: "video" },
              ],
            }));
          }
          console.log(
            "newImageArray",
            newImageArray,
            propertyData,
            updatedPropertyData
          );
        }
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }

    // const propertyData= {
    //   id: edit_list.id,
    //   title,
    //   description,
    //   role: role,
    //   price: price,
    //   property_type,
    //   rent_period,
    // label: labelValue === "sale" ? "FOR__SALE" : "FOR_RENT",
    // location: location,
    //   address:address,
    //   // location:`${city}, ${state}, ${zip}, ${country}`,
    //   parking: parking,
    //   // userId: user?.uid, // Replace with actual user ID
    //   bedrooms,
    //   bathrooms,
    //   areaSqFt: sqft,
    //   images: newImageArray.map((image: { imageUrls: string; type: string } ) => ({imageUrl: image.imageUrls, type: image.type})), // Use the uploaded image URLs
    // }
    console.log("Property Data:", updatedPropertyData);
    // Here you would typically send the propertyData to your backend or API
    try {
      let new_property: any = undefined;
      if (Object.keys(updatedPropertyData).length === 0) {
        console.log("enetereddds");
        new_property = await Update_new_property({
          property: { ...propertyData },
          approved,
        });
      } else {
        new_property = await Update_new_property({
          property: { ...updatedPropertyData },
          approved,
        });
      }

      //@ts-ignore
      if (new_property) {
        console.log(new_property, deletedFiles);
        sessionStorage.removeItem("my-listings");
        if (deletedFiles.length > 0) {
          deletedFiles.forEach(async (file: any) => {
            if (file.type == "image") {
              const token = await getBlobToken();
              await del(file.imageUrl, { token: token });
            }
            if (file.type == "video") {
              try {
                const videoFormData = new FormData();
                const public_id = file.imageUrl
                  .split("/upload/")[1]
                  .replace(/^v\d+\//, "")
                  .replace(/\.[^.]+$/, "");
                const timestamp = Math.floor(Date.now() / 1000).toString();
                const signature = CryptoJs.SHA1(
                  `public_id=${public_id}&timestamp=${timestamp}-yEDk8Wiv9DGfqXdRWUaeV1m0-U`
                ).toString();

                videoFormData.append("public_id", public_id);
                videoFormData.append("api_key", "382255278373657");
                videoFormData.append("timestamp", timestamp);
                videoFormData.append("signature", signature);
                videoFormData.append("resource_type", "video");

                for (const [key, value] of videoFormData.entries()) {
                  console.log(`FormData entry: ${key}:`, value);
                }
                const res = await fetch(
                  "https://api.cloudinary.com/v1_1/dgfgdtgkt/video/destroy",
                  {
                    method: "POST",
                    body: videoFormData,
                  }
                );

                const deleted = await res.json();
                console.log(deleted, "deleted");
                setDeletedFiles([]);
              } catch (error) {
                console.log("error deleting video from cloudinary", error);
              }
            }
          });
        }
      }
    } catch (error) {
      console.log("error uploading to firebase");
    }
    console.log("Form submitted");
  };

  return (
    <div className="my-5">
      {edit_list && (
        <div className="relative container px-4 py-6 md:px-6 md:py-8 ">
          {/*post property ui*/}
          <div className="mb-6">
            <h1
              className="text-3xl font-bold"
              onClick={() => {
                console.log(edit_list);
              }}
            >
              Editing a Property
            </h1>
            <p className="text-muted-foreground">
              Edit the details of this property - {edit_list.title}
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form
                className="space-y-8"
                onSubmit={handlePropertyUpdate}
                ref={formRef}
              >
                Basic Information
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role {role}</Label>

                      <Select
                        value={role}
                        onValueChange={(value) => {
                          setRole(value);
                        }}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder={role} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Agent">Agent</SelectItem>
                          <SelectItem value="Landlord">Landlord</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Property Title</Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                        placeholder="e.g. Modern Apartment with City View"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price (&#x20A6;)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(event) => {
                          setPrice(parseInt(event.target.value));
                        }}
                        placeholder="e.g. 350000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Listing Type</Label>
                    <RadioGroup
                      defaultValue={label == "FOR_SALE" ? "sale" : "rent"}
                      className="flex gap-4"
                      onValueChange={(value) => {
                        setLabelValue(value);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sale" id="sale" />
                        <Label htmlFor="sale" className="cursor-pointer">
                          For Sale
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="rent" id="rent" />
                        <Label htmlFor="rent" className="cursor-pointer">
                          For Rent
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {labelValue === "rent" && (
                    <div className="space-y-2">
                      <Label htmlFor="rent-period">Rent Period</Label>
                      <Select
                        value={rent_period}
                        onValueChange={(value) => {
                          setRentPeriod(value);
                        }}
                      >
                        <SelectTrigger id="rent-period">
                          <SelectValue placeholder={rent_period} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(event) => {
                        setDescription(event?.target.value);
                      }}
                      placeholder="Describe your property in detail..."
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
                {/* Property Details */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Property Details</h2>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="property-type">Property Type</Label>
                      <Select
                        value={property_type}
                        onValueChange={(value) => {
                          setPropertyType(value);
                        }}
                      >
                        <SelectTrigger id="property-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select
                        value={bedrooms}
                        onValueChange={(value) => {
                          setBedrooms(value);
                        }}
                      >
                        <SelectTrigger id="bedrooms">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select
                        value={bathrooms}
                        onValueChange={(value) => {
                          setBathrooms(value);
                        }}
                      >
                        <SelectTrigger id="bathrooms">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sqft">Square Feet</Label>
                      <Input
                        id="sqft"
                        type="number"
                        value={sqft}
                        onChange={(event) => {
                          setSQFT(event?.target.value);
                        }}
                        placeholder="e.g. 1500"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* <div className="space-y-2">
                  <Label htmlFor="year-built">Year Built</Label>
                  <Input id="year-built" type="number" placeholder="e.g. 2010" />
                </div> */}

                    <div className="space-y-2">
                      <Label htmlFor="parking">Parking Spaces</Label>
                      <Select
                        value={parking}
                        onValueChange={(value) => {
                          setParking(value);
                        }}
                      >
                        <SelectTrigger id="parking">
                          <SelectValue placeholder={parking} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">none</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                {/* Location */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Location</h2>

                  <div className="space-y-2">
                    <Label>
                      Include coordinate in order to get precise location on
                      google map
                    </Label>
                    {/* <RadioGroup defaultValue="coordinate" className="flex gap-4" onValueChange={setLocationType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="coordinate" id="coordinate" />
                    <Label htmlFor="coordinate" className="cursor-pointer">
                      Coordinate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="address" id="address" />
                    <Label htmlFor="address" className="cursor-pointer">
                      Address
                    </Label>
                  </div>
                </RadioGroup> */}
                  </div>

                  {/* {locationType==='coordinate'&&<div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="long">Longitude</Label>
                  <Input id="longitude" placeholder="longitude" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Apt</Label>
                  <Input id="unit" placeholder="Apartment or unit number" />
                </div> */}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address*</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(event) => {
                          setAddress(event.target.value);
                        }}
                        placeholder="Street address"
                      />
                    </div>

                    {/* <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Apt</Label>
                  <Input id="unit" placeholder="Apartment or unit number" />
                </div> */}

                    {/* <div className="space-y-2">
                  <Label htmlFor="city">City*</Label>
                  <Input id="city" placeholder="City" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State*</Label>
                  <Input id="state" placeholder="State/Province" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code*</Label>
                  <Input id="zip" placeholder="Zip/Postal code" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country*</Label>
                  <Input id="country" placeholder="Country" />
                </div> */}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="long">Latitude, Longitude</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(event) => {
                          setLocation(event.target.value);
                        }}
                        placeholder="latitude, longitude"
                      />
                    </div>

                    {/* <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Apt</Label>
                  <Input id="unit" placeholder="Apartment or unit number" />
                </div> */}
                  </div>
                </div>
                {/* Images */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Files</h2>
                  <div className="grid gap-4">
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                      <h3 className="mb-2 text-lg font-medium">
                        Upload Property Images/Videos
                      </h3>
                      {/* <p className="mb-4 text-sm text-muted-foreground">
                    Drag and drop your images here or click to browse
                  </p> */}
                      <Input
                        id="images"
                        type="file"
                        ref={imageInputRef}
                        multiple
                        accept="image/*, video/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Button
                        variant="secondary"
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                          handleButtonClick();
                        }}
                      >
                        Select files
                      </Button>
                    </div>
                    {new_files.length > 0 && (
                      <div className="border rounded-lg border-dashed border-green-700 h-auto w-auto p-8 ring-2 ring-orange-800/50">
                        <div>New Files to be included in property's asset</div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 mt-3">
                          {new_files.map((image, index: number) => (
                            <div
                              key={index}
                              className="flex relative aspect-square rounded-md"
                            >
                              {image.file &&
                                image.file.type.startsWith("image/") && (
                                  <img
                                    src={image.imageUrls || "/placeholder.svg"}
                                    alt={`Property image ${index + 1}`}
                                    className="h-full w-full rounded-md object-contain"
                                  />
                                )}
                              {image.file &&
                                image.file.type.startsWith("video") && (
                                  <video
                                    src={image.imageUrls}
                                    controls
                                    autoPlay
                                    className="h-full w-full rounded-md"
                                    muted
                                  />
                                )}
                              <button
                                type="button"
                                onClick={() => {
                                  remove_newImage(index);
                                }}
                                className="absolute cursor-pointer justify-center items-center right-1 bg-red-600 h-[25px] w-[25px] rounded-full text-white"
                              >
                                x
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {files && (
                      <>
                        <div>Previous Files in property's asset</div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                          {files.map((image: any, index: any) => (
                            <div
                              key={index}
                              className="flex relative aspect-square rounded-md"
                            >
                              {image.type && image.type.startsWith("image") && (
                                <img
                                  src={image.imageUrl || "/placeholder.svg"}
                                  alt={`Property image ${index + 1}`}
                                  className="h-full w-full rounded-md object-contain"
                                />
                              )}
                              {image.type && image.type.startsWith("video") && (
                                <video
                                  src={image.imageUrl}
                                  controls
                                  autoPlay
                                  className="h-full w-full rounded-md"
                                  muted
                                />
                              )}
                              <button
                                type="button"
                                onClick={() => {
                                  removeImage(index);
                                }}
                                className="absolute cursor-pointer justify-center items-center right-1 bg-red-600 h-[25px] w-[25px] rounded-full text-white"
                              >
                                x
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* Update */}
                <div className="flex justify-center gap-4">
                  <Button type="submit">{"Update"} Listing</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
export default Edit_Properties;
