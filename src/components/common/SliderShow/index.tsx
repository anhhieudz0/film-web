import { Item } from "@/types/films.type";
import { Carousel } from "antd";
import { useRouter } from "next/router";
import React from "react";
interface Props {
  data: Item[];
}
const SliderShow = (props: Props) => {
  const { data } = props;
  const router = useRouter();

  return (
    <div className="bg-gray-900">
      <div className="w-full m-auto">
        <Carousel autoplay effect="scrollx" arrows>
          {data &&
            data?.map((item) => (
              <div
                key={item._id}
                className="w-full md:max-h-[675px] md:min-h-[675px]  relative cursor-pointer"
                onClick={() => {
                  router.push(item.slug);
                }}
              >
                <img
                  src={`https://img.ophim.live/uploads/movies/${item.poster_url}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black bg-opacity-70  text-white  text-ellipsis overflow-hidden  text-3xl">
                  {item.name}
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SliderShow;
