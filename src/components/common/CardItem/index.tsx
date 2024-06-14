import { Item } from "@/types/films.type";
import { useRouter } from "next/router";
import React from "react";
import { BsPlayCircle } from "react-icons/bs";

interface Props {
  data: Item;
}

const CardItem = (props: Props) => {
  const { data } = props;
  const defaultImageUrl = "/images/poster-default.jpg"; // Ensure this path is correct
  const router = useRouter();
  return (
    <div
      className="relative h-full rounded-md overflow-hidden group cursor-pointer shadow-sm shadow-green-50"
      onClick={() => {
        router.push("/" + data.slug);
      }}
    >
      <img
        src={
          `https://img.ophim.live/uploads/movies/${data.thumb_url}` ||
          defaultImageUrl
        }
        alt={data.name}
        loading="lazy"
        className="object-cover h-full w-full md:group-hover:scale-125 transition duration-75"
        onError={(e) => {
          e.currentTarget.src = defaultImageUrl;
          e.currentTarget.onerror = null; // Prevent infinite loop if default image also fails
        }}
        onClick={() => {
          router.push("/" + data.slug);
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        onClick={() => {
          router.push("/" + data.slug);
        }}
      >
        <BsPlayCircle
          className="text-white opacity-0 md:group-hover:opacity-100 transition duration-500 bg-green-500 rounded-full cursor-pointer"
          size={50}
          onClick={() => {
            router.push("/" + data.slug);
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-70  text-white  text-ellipsis overflow-hidden  ">
        {data.name}
      </div>
      <div className="absolute top-0 left-0 text-white p-1.5 bg-[#DE1A1F] text-sm rounded-br-lg">
        {data.lang} {data.quality}
      </div>
    </div>
  );
};

export default CardItem;
