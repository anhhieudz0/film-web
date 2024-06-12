import HeaderTemplate from "@/components/Templates/Header";
import CustomPlayer from "@/components/common/CustomPlayer";
import FilmsService from "@/services/film.service";
import { Films, Item } from "@/types/films.type";
import { Tag, Typography } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Preview: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<Films>();
  const [filmInfo, setFilmInfo] = useState<Item>();
  const fetchData = async () => {
    try {
      const data = await FilmsService.getFilmDetail(
        router.query.slug as string,
        {}
      );
      setData(data.data.data);
      const filmInfo = data.data.data.item;
      setFilmInfo(filmInfo);
    } catch (error) {}
  };
  useEffect(() => {
    if (router.query.slug) fetchData();
  }, [router.query.slug]);
  return (
    <>
      <HeaderTemplate
        path={data?.seoOnPage.og_url.slice(4) as string}
        title={data?.seoOnPage.titleHead as string}
        description={data?.seoOnPage.descriptionHead as string}
        thumbnail={data?.seoOnPage.og_image[0] as string}
      />
      <div className="w-full max-h-[675px] min-h-[675px] relative cursor-pointer">
        <img
          src={`https://img.ophim.live/uploads/movies/${filmInfo?.poster_url}`}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="text-white bg-[#252525] p-4 my-3">
          <Typography className="text-white text-2xl">
            {filmInfo?.name}
          </Typography>
          {filmInfo?.episodes?.[0].server_data?.[0]?.link_m3u8 &&
            filmInfo?.episodes?.map((e, index) => (
              <div key={index}>
                <div className="text-red-500 mb-3">{e.server_name}</div>
                {e.server_data?.map((s) => (
                  <Tag
                    onClick={() => {
                      router.push(
                        `/xem-phim/${
                          filmInfo?.slug
                        }?sever_name=${e.server_name.replace(
                          " #",
                          "_"
                        )}&episode=${s.name}`
                      );
                    }}
                    className="min-w-10 text-center mb-3"
                    // color="#4ADE81"
                    bordered
                  >
                    {s.name}
                  </Tag>
                ))}
              </div>
            ))}
        </div>
        <div className="text-white bg-[#252525] p-4 ">
          <div className="flex gap-5 justify-between border-1 border-white">
            <div>
              <p className="mb-3">
                Đang phát:
                <span className="text-red-500">
                  {filmInfo?.status === "trailer"
                    ? " Trailer"
                    : ` ${filmInfo?.lang} ${filmInfo?.quality}`}
                </span>
              </p>
              <p>
                Thể loại:
                <span className="text-gray-500">
                  {` ${filmInfo?.category.map((c) => c.name).join(", ")}`}
                </span>
              </p>
            </div>
            <div>
              <p className="mb-3">
                Năm phát hành:
                <span className="text-gray-500"> {filmInfo?.year}</span>
              </p>
              <p>
                Đạo diễn:
                <span className="text-gray-500">
                  {`${filmInfo?.director.map((c) => c).join(", ")}`}
                </span>
              </p>
            </div>
            <div>
              <p className="mb-3">
                Quốc gia:
                <span className="text-gray-500">
                  {` ${filmInfo?.country.map((c) => c.name).join(", ")}`}
                </span>
              </p>
              <p className="mb-3">
                Thời lượng:
                <span className="text-gray-500">
                  {` ${filmInfo?.episode_total} tập`}
                </span>
              </p>
              <p>
                Diễn viên:
                <span className="text-gray-500">
                  {` ${filmInfo?.actor.map((c) => c).join(", ")}`}
                </span>
              </p>
            </div>
          </div>
          <div
            className="flex gap-5 justify-between border-b-0 border-white mt-5"
            dangerouslySetInnerHTML={{ __html: filmInfo?.content as string }}
          />
          {!!filmInfo?.trailer_url && (
            <ReactPlayer
              controls
              url={filmInfo.trailer_url}
              width="100%"
              style={{ backgroundColor: "#111111", marginTop: 10 }}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Preview;
