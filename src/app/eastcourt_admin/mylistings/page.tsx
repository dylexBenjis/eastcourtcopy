import { MyListings } from "./mylistings";

export default function Page() {
  return (
    <div className=" flex justify-center w-screen">
      <div className=" lg:w-[1200px] max-w-[1200px] container">
        <MyListings />
      </div>
    </div>
  );
}
