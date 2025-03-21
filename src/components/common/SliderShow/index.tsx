import { Item } from "@/types/films.type";
import { Carousel } from "antd";
import { useRouter } from "next/router";
import React from "react";
import EnhancedButton from "../EnhancedButton";
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
              <EnhancedButton key={item._id}>
                <div
                  className="w-full max-h-[242px] min-h-[242px] md:max-h-[675px] md:min-h-[675px] relative cursor-pointer box-border"
                  onClick={() => {
                    router.push(item.slug);
                  }}
                >
                  <img
                    src={`https://ophim17.cc/_next/image?url=https://img.ophim.live/uploads/movies/${item.poster_url}&w=384&q=75`}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{
                      backgroundImage: `url(/images/poster-default.jpg)`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <div className="!absolute bottom-0 left-0 !right-0 p-3 !bg-black !bg-opacity-70  !text-white  !text-ellipsis !overflow-hidden  md:!text-3xl !text-2xl">
                    {item.name}
                  </div>
                  <div className="absolute top-0 left-0 text-white p-1.5 bg-[#DE1A1F] text-sm rounded-br-lg">
                    {item.lang} {item.quality}
                  </div>
                </div>
              </EnhancedButton>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SliderShow;
