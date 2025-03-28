import { Item } from "@/types/films.type";
import { useRouter } from "next/router";
import React from "react";
import { BsPlayCircle } from "react-icons/bs";
import EnhancedButton from "../EnhancedButton";

interface Props {
  data: Item;
}

const CardItem = (props: Props) => {
  const { data } = props;
  const defaultImageUrl = "/images/card_image_default.jpg"; // Ensure this path is correct
  const router = useRouter();
  return (
    <EnhancedButton>
      <div
        className="relative h-full min-h-[280px] rounded-md overflow-hidden group cursor-pointer shadow-sm shadow-green-50"
        onClick={() => {
          router.push("/" + data.slug);
        }}
      >
        <img
          src={
            `https://ophim17.cc/_next/image?url=https://img.ophim.live/uploads/movies/${data.thumb_url}&w=192&q=75` ||
            defaultImageUrl
          }
          style={{
            backgroundImage: `url(${defaultImageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          alt={data.name}
          className="object-cover h-full w-full md:group-hover:scale-125 transition duration-75 min-h-[300px]"
          onError={(e) => {
            e.currentTarget.src = defaultImageUrl;
            e.currentTarget.onerror = null;
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
        <div className="absolute bottom-0 left-0 right-0 px-3 py-1 bg-black bg-opacity-40  text-white  line-clamp-2">
          {data.name}
        </div>
        <div className="absolute top-0 left-0 text-white p-1.5 bg-[#DE1A1F] text-sm rounded-br-lg">
          {data.lang} {data.quality}
        </div>
      </div>
    </EnhancedButton>
  );
};

export default CardItem;
