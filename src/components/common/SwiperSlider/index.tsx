import { Item } from "@/types/films.type";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/router";
import React from "react";
import EnhancedButton from "../EnhancedButton";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

interface Props {
  data: Item[];
}
const SwiperSlider = (props: Props) => {
  const { data } = props;
  const router = useRouter();

  return (
    <div className="bg-gray-900 mb-16">
      <div className="w-full m-auto">
        <Swiper
          spaceBetween={30}
          effect="fade"
          loop={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<img loading="lazy" src="https://ophim17.cc/_next/image?url=https://img.ophim.live/uploads/movies/${data[index].poster_url}&w=192&q=75" class="${className} custom-dot"/>`;
            },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="mySwiper"
        >
          {data &&
            data?.map((item) => (
              <EnhancedButton>
                <SwiperSlide
                  onClick={() => {
                    router.push(item.slug);
                  }}
                  key={item.slug}
                >
                  <div
                    style={{
                      backgroundImage: !/Mobi|Android|iPhone/i.test(
                        navigator.userAgent
                      )
                        ? `url(https://img.ophim.live/uploads/movies/${item.poster_url})`
                        : `url(https://ophim17.cc/_next/image?url=https://img.ophim.live/uploads/movies/${item.poster_url}&w=384&q=75)`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="relative cursor-pointer box-border max-h-[242px] min-h-[242px] md:max-h-[675px] md:min-h-[675px]"
                  >
                    <div className="absolute -bottom-1 left-0 right-0 text-center bg-[#1A1A1A] py-1 bg-opacity-10">
                      <h1 className="md:!text-3xl !text-xl font-semibold text-white pb-1 line-clamp-2">
                        {item.name}
                      </h1>
                      <div className="flex justify-center gap-3 mb-2">
                        <div className="bg-orange-500 rounded-md px-1.5 py-0.5 text-white text-xs">
                          Tmdb{" "}
                          <span className="text-white">
                            {item.tmdb.vote_average?.toFixed(1)}
                          </span>
                        </div>
                        <div className="bg-white rounded-md px-1.5 py-0.5 text-black text-xs">
                          {item.country.map((e) => e.name).join(", ")}
                        </div>
                        <div className="bg-red-500 rounded-md px-1.5 py-0.5 text-white text-xs">
                          {item.episode_current}
                        </div>
                        <div className="bg-green-500 rounded-md px-1.5 py-0.5 text-white text-xs">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </EnhancedButton>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlider;
