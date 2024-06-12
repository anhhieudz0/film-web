import HeaderTemplate from "@/components/Templates/Header";
import CustomPlayer from "@/components/common/CustomPlayer";
import FilmsService from "@/services/film.service";
import { Films, Item } from "@/types/films.type";
import { Tag, Typography } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const WatchMovie: NextPage = () => {
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
  }, [router.query]);

  const _infoWatch = useMemo(
    () =>
      filmInfo?.episodes
        ?.find(
          (item) =>
            item.server_name ===
            `${router.query?.sever_name}`?.replace("_", " #")
        )
        ?.server_data?.find((s) => s.name === router.query?.episode),
    [router.query, filmInfo]
  );
  console.log(router.query?.episode === _infoWatch?.name);
  return (
    <div className="text-white">
      <HeaderTemplate
        path={data?.seoOnPage.og_url.slice(4) as string}
        title={data?.seoOnPage.titleHead as string}
        description={data?.seoOnPage.descriptionHead as string}
        thumbnail={data?.seoOnPage.og_image[0] as string}
      />
      {filmInfo && _infoWatch && (
        <CustomPlayer
          url={_infoWatch?.link_m3u8 as string}
          poster={`https://img.ophim.live/uploads/movies/${filmInfo?.poster_url}`}
        />
      )}
      <Typography className="text-white text-2xl">{filmInfo?.name}</Typography>
      <div className="text-white">
        {filmInfo?.episodes?.map((e, index) => (
          <div>
            <div>{e.server_name}</div>
            {e.server_data?.map((s) => (
              <Tag
                onClick={() => {
                  router.push(
                    `/xem-phim/${
                      filmInfo?.slug
                    }?sever_name=${e.server_name.replace(" #", "_")}&episode=${
                      s.name
                    }`
                  );
                }}
                className="min-w-8 text-center cursor-pointer mb-1"
                color={
                  router.query?.episode === s?.name ? "#4ADE81" : "default"
                }
                bordered
              >
                {s.name}
              </Tag>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default WatchMovie;
