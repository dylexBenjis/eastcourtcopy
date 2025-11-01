"use client"

import React, { useEffect } from "react"
import {put} from '@vercel/blob'
import { useContext, useState } from "react"
import { Building2, ChevronsUpDown, Upload, UserCheck } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Textarea } from "@/src/components/ui/textarea"
import { Create_new_property } from "../../lib/upload-properties"
import { AuthState_Context } from "../../lib/auth_state"
import { Update_user_properties } from "../../lib/user"
import { getBlobToken } from "../actions/actions"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "../../components/ui/command"

import { toast } from "../../hooks/use-toast"
import { ActiveTab_Context } from "../../components/activeTab-provider"

export function PostProperty() {

  type imageProps={
    file:File;
    imageUrls: string;
    name: string;
  }
    //select role

  const roles =[{
    value:'landlord',
    label:'Landlord',
    icon: Building2,
    description:'Property owner'
  },
  {
    value:'agent',
    label:'Agent',
    icon: UserCheck,
    description:''
  }]
  const [images, setImages] = useState<imageProps[]>([])
  const [uploading, setUploading] = useState<boolean>()  
  const [listingType, setListingType] = useState("sale")

  //location type
    const [locationType, setLocationType] = useState("coordinate")

const [selectedRole, setSelectedRole] = useState<string>('');
const selectedRoleData = roles.find((role)=>{
  role.value === selectedRole
})

  //user
  const {user, loading} = useContext(AuthState_Context);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => {return file})
      const imageUrls = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      const uuid = self.crypto.randomUUID()
        // .map((file) => URL.createObjectURL(file))
      setImages([...images, ...imageUrls.map((url, index) => ({ name: `${uuid}${newImages[index].name}`, imageUrls: url, file: newImages[index] }))])

      console.log("Selected images:", newImages)
    }     
     e.target.value = ""; // Clear the input value to allow re-uploading the same file;
  }
  useEffect(()=>{
    // Find the first image
    const imageIndex = images.findIndex(image =>
      image.file.type.startsWith("image/")
    );

    if (imageIndex > 0) {
      // Swap the first file with the first image
      const temp = images[0];
      images[0] = images[imageIndex];
      images[imageIndex] = temp;
    }
      console.log("Images:", images,)
    },) 

    
    const[bedrooms, setBedrooms]= useState<string>('0')
    const[bathrooms, setBathrooms]= useState<string>('0')
    const[property_type, setPropertyType]= useState<string>('')
    const[rent_period, setRentPeriod]= useState<string>('monthly')

    const formRef = React.useRef<HTMLFormElement>(null)
    // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    setUploading(true);

    var newImageArray:any=[]
    if(images.length === 0){
      console.log("No images selected")
      
    }else {
      try{      for(const image of images){
        const token = await getBlobToken();

        //upload image to vercel blob
    if(image.file.type.startsWith('image/')) {
      const uploadedImages = await put(image.name, image.file, { access: 'public', token: token });
      console.log("Uploaded Images:", uploadedImages)
      newImageArray.push({filename: `${image.name}${uploadedImages.pathname}`, imageUrls: uploadedImages.url, type: 'image'})}

      //upload video to cloudinary
      
    if(image.file.type.startsWith('video/')) {
      const videoFormData = new FormData();
      videoFormData.append("file", image.file)
      videoFormData.append("upload_preset", "pnbiwcfw");
      for (const [key, value] of videoFormData.entries()) {
        console.log(`FormData entry: ${key}:`, value)
      }
      const res = await fetch(
      'https://api.cloudinary.com/v1_1/dgfgdtgkt/video/upload',
      {
        method: 'POST',
        body: videoFormData,
      }
    );
    const uploadedImages = await res.json() 
    console.log("Uploaded Images:", uploadedImages)
      newImageArray.push({filename: `${image.name}${uploadedImages.url}`, imageUrls: uploadedImages.url, type: 'video'})}
      console.log("newImageArray", newImageArray)
    }}catch(error){console.log("Error uploading image:", error)}}
    

    // Handle form submission logic here
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement)?.value;
    const price = (form.elements.namedItem("price") as HTMLInputElement)?.value;
    const description = (form.elements.namedItem("description") as HTMLTextAreaElement)?.value;
    const sqft = (form.elements.namedItem("sqft") as HTMLInputElement)?.value;
    const parking = (form.elements.namedItem("parking") as HTMLInputElement)?.value;
    const address = (form.elements.namedItem("address") as HTMLInputElement)?.value;
    const city = (form.elements.namedItem("city") as HTMLInputElement)?.value;
    const state = (form.elements.namedItem("state") as HTMLInputElement)?.value;
    const zip = (form.elements.namedItem("zip") as HTMLInputElement)?.value;
    const country = (form.elements.namedItem("country") as HTMLInputElement)?.value;
    const long = (form.elements.namedItem("long") as HTMLInputElement)?.value;
    const lat = (form.elements.namedItem("lat") as HTMLInputElement)?.value;
    const role = (form.elements.namedItem("role") as HTMLInputElement).value;


    const propertyData = {
      title,
      description,
      role: role,
      price: parseInt(price),
      property_type,
      rent_period,
      label: listingType === "sale" ? "FOR__SALE" : "FOR_RENT",
    location: lat===undefined?`${address}, ${city}, ${state}, ${zip}, ${country}`:`${lat},${long}`,
      address:`${address}, ${city}, ${state}, ${zip}, ${country}`,
      // location:`${city}, ${state}, ${zip}, ${country}`,
      parking: parking,
      // userId: user?.uid, // Replace with actual user ID
      bedrooms,
      bathrooms,
      areaSqFt: sqft,
      images: newImageArray.map((image: { imageUrls: string; type: string } ) => ({imageUrl: image.imageUrls, type: image.type})), // Use the uploaded image URLs
    }
    
    console.log("Property Data:", propertyData)
    // Here you would typically send the propertyData to your backend or API
    try{
      const new_property = await Create_new_property({...propertyData});

        //@ts-ignore
      if (new_property) {
      sessionStorage.removeItem('my-listings')

    } }
    catch(error){console.log('error uploading to firebase')}
    console.log("Form submitted");
      setUploading(false);
      window.scrollTo({top:0,behavior:'smooth'});
      formRef.current?.reset(); // Reset the form after submission if formRef.current is not null
      setImages([]);
      setSelectedRole(''); 
      setModalOpen(true)

  }

useEffect(() => {console.log(selectedRole, 'selected role')}, [])

  //handle select images button click
  const imageInputRef = React.useRef<HTMLInputElement>(null)
  const handleButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click()
    }
  }




const [modalOpen, setModalOpen] = useState<boolean>(true);
const {activeTab} = useContext(ActiveTab_Context);
useEffect(()=>{
  if(modalOpen&&activeTab=='post'){
    document.body.classList.add('overflow-hidden');
  }
  else{
    document.body.classList.remove('overflow-hidden')
  }
  return () => {
    document.body.classList.remove('overflow-hidden');
  };
},[activeTab, modalOpen]);



const [open, setOpen] = useState<boolean>(false)


//remove image or video file
const removeImage = (index: number) => {
  setImages((prevImages) => prevImages.filter((_, i) => i !== index));
}

  return (
    <div className="relative container px-4 py-6 md:px-6 md:py-8 ">
      
    {/*choose role ui*/}
      {modalOpen&&
      <div className='fixed inset-0 flex justify-center items-center h-screen z-[999] bg-black/80 '>
        <div className='flex justify-center flex-col h-auto p-8 border-[1px] rounded-sm border-gray-500 bg-[background]'>
          <div className='flex text-center flex-col gap-2'>
            <h2 className="font-bold text-xl">Select Role</h2>
            <p>Choose how you will like to continue</p>
          </div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant='outline' role='combobox' className='w-full justify-between h-12'>
                {selectedRoleData?(
                  <div className='flex items-center gap-2'>
                  <selectedRoleData.icon className='h-4 w-4'/>
                  <span>{selectedRoleData.label}</span>
                  </div>
                ):(
                  'select role'
                )}
                <ChevronsUpDown className= 'ml-2 h-4 w-4 shrink-0 opacity-50'/>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandList>
                  <CommandEmpty>no role</CommandEmpty>
                  <CommandGroup>
                    {
                      roles.map((role)=> {
                        return (<CommandItem 
                           key={role.value} 
                          value={role.label} 
                          onSelect={(currentValue: React.SetStateAction<string>)=>{
                            setSelectedRole(currentValue===selectedRole?'':currentValue); setOpen(false); setModalOpen(false)
                          }}
                          className="cursor-pointer">
                            <role.icon className='w-5 h-5'/>                        
                            <span>{role.label}</span>

                        </CommandItem>)
                      })
                    }
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      }

    {/*post property ui*/}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Post a Property</h1>
        <p className="text-muted-foreground">Fill in the details to list your property</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <form className="space-y-8" onSubmit={handleSubmit} ref={formRef}>
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Role</Label>
                  <Input id="role" value={selectedRole} readOnly/>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input id="title" placeholder="e.g. Modern Apartment with City View"/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (&#x20A6;)</Label>
                  <Input id="price" type="number" placeholder="e.g. 350000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Listing Type</Label>
                <RadioGroup defaultValue="sale" className="flex gap-4" onValueChange={setListingType}>
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

              {listingType === "rent" && (
                <div className="space-y-2">
                  <Label htmlFor="rent-period">Rent Period</Label>
                  <Select  value={rent_period} onValueChange={(value)=>{
                    setRentPeriod(value)
                  }}>
                    <SelectTrigger id="rent-period">
                      <SelectValue placeholder="Select period" />
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
                  <Select value={property_type} onValueChange={(value)=>{
                    setPropertyType(value)
                  }}>
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
                  <Select value={bedrooms} onValueChange={(value)=>{
                    setBedrooms(value)
                  }}>
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
                  <Select  value={bathrooms} onValueChange={(value)=>{
                    setBathrooms(value)
                  }}>
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
                  <Input id="sqft" type="number" placeholder="e.g. 1500" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* <div className="space-y-2">
                  <Label htmlFor="year-built">Year Built</Label>
                  <Input id="year-built" type="number" placeholder="e.g. 2010" />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="parking">Parking Spaces</Label>
                  <Select>
                    <SelectTrigger id="parking">
                      <SelectValue placeholder="Select number" />
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
                <Label>Include coordinate for precise location on google map</Label>
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

                {/* <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Apt</Label>
                  <Input id="unit" placeholder="Apartment or unit number" />
                </div> *

                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input id="latitude" placeholder="latitude" />
                </div>

              </div>} */}
                
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Street address" />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Apt</Label>
                  <Input id="unit" placeholder="Apartment or unit number" />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State/Province" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">Zip/Postal Code</Label>
                  <Input id="zip" placeholder="Zip/Postal code" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="Country" />
                </div>
              </div>
                              <div className="space-y-2">
                  <Label htmlFor="long">Longitude</Label>
                  <Input id="longitude" placeholder="longitude" />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="unit">Unit/Apt</Label>
                  <Input id="unit" placeholder="Apartment or unit number" />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="lat">Latitude</Label>
                  <Input id="latitude" placeholder="latitude" />
                </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Files</h2>
              <div className="grid gap-4">
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">Upload Property Images/Videos</h3>
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
                    <Button variant='secondary' type='button' className="cursor-pointer" onClick={()=>{handleButtonClick()}}>
                      Select files
                    </Button>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((image, index) => (
                      <div key={index} className="flex relative aspect-square rounded-md">
                        {image.file.type.startsWith('image/')&&<img
                          src={image.imageUrls || "/placeholder.svg"}
                          alt={`Property image ${index + 1}`}
                          className="h-full w-full rounded-md object-contain"
                        />}
                        {image.file.type.startsWith('video/')&&(<video
                          src={image.imageUrls}
                          controls
                          autoPlay
                          className="h-full w-full rounded-md"
                          muted
                        />)}
                        <button type='button' onClick={()=>{removeImage(index)}} className="absolute cursor-pointer justify-center items-center right-1 bg-red-600 h-[25px] w-[25px] rounded-full text-white">x</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button variant="outline" type="reset" onClick={() => {window.scrollTo({top:0,behavior:'smooth'});setImages([]); setSelectedRole(''); setModalOpen(true)}}>
                Reset
              </Button>
              <Button type="submit">{uploading?'Submitting':'Submit'} Listing</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
