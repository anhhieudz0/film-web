import HeaderTemplate from "@/components/Templates/Header";
import BreadCrumbComponent from "@/components/common/Breadcumb";
import CardItem from "@/components/common/CardItem";
import CustomPlayer from "@/components/common/CustomPlayer";
import ShareButton from "@/components/common/ShareButton";
import FilmsService from "@/services/film.service";
import { BreadCrumb } from "@/types/breakCumb.type";
import { Films, Item } from "@/types/films.type";
import { SEOOnPage } from "@/types/seoOnPage.type";
import { Rate, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.query;
    // Fetch data from external API
    const res = await fetch(
      `${
        process?.env?.NEXT_PUBLIC_FE_URL || "https://quytphim.vercel.app"
      }/api/phim/${slug}.json`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data from API. Status: ${res.status}`);
    }

    const data = await res.json();

    // Pass data to the page via props
    return { props: { seo: data.data.seoOnPage } };
  } catch (error) {
    console.error("Error fetching data:", error);

    // Return an empty object or handle the error as needed
    return { props: {} };
  }
};
const WatchMovie: NextPage<{ seo: SEOOnPage }> = ({ seo }) => {
  const router = useRouter();
  const [data, setData] = useState<Films>();
  const [filmInfo, setFilmInfo] = useState<Item>();
  const [dataRecommend, setDataRecommend] = useState<Films>();

  const fetchData = async () => {
    try {
      setData(undefined);
      const data = await FilmsService.getFilmDetail(
        router.query.slug as string,
        {}
      );
      setData(data.data.data);
      const filmInfo = data.data.data.item;
      setFilmInfo(filmInfo);
    } catch (error) {}
  };

  const getRandomSlugPart = (
    breadCrumbArray: BreadCrumb[],
    includeString: string
  ) => {
    const filteredArray = breadCrumbArray.filter((breadCrumb) =>
      breadCrumb.slug?.includes(includeString)
    );

    if (filteredArray.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * filteredArray.length);
    return filteredArray[randomIndex]?.slug?.split("/")[2];
  };

  const fetchRecommend = async () => {
    try {
      setDataRecommend(undefined);
      const breadCrumbArray = data?.breadCrumb || [];

      const listFilmSlug = getRandomSlugPart(breadCrumbArray, "/danh-sach/");
      const countrySlug = getRandomSlugPart(breadCrumbArray, "/quoc-gia/");
      const categorySlug = getRandomSlugPart(breadCrumbArray, "/the-loai/");

      if (!listFilmSlug) {
        console.error("No valid list film slug found");
        return;
      }

      const res = await FilmsService.getListFilm(listFilmSlug, {
        country: countrySlug as string,
        category: categorySlug as string,
      });

      setDataRecommend(res.data.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    if (router.query.slug) fetchData();
  }, [router.query]);

  useEffect(() => {
    if (data) fetchRecommend();
  }, [data]);

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

  return (
    <>
      {filmInfo && (
        <div className="text-white">
          <HeaderTemplate
            path={`xem-${seo?.og_url}` as string}
            title={seo?.titleHead as string}
            description={seo?.descriptionHead as string}
            thumbnail={seo?.og_image[0] as string}
          />
          {filmInfo && (
            <BreadCrumbComponent data={data?.breadCrumb as BreadCrumb[]} />
          )}
          {filmInfo && _infoWatch && (
            <div>
              <CustomPlayer
                url={_infoWatch?.link_m3u8 as string}
                poster={`https://img.ophim.live/uploads/movies/${filmInfo?.poster_url}`}
              />
            </div>
          )}
          <div className="text-white p-4 pb-0">
            <Typography className="!text-white !text-2xl !mb-1">
              {filmInfo?.name}{" "}
              {router.query?.episode?.includes("Full")
                ? ""
                : "tập " + router.query?.episode}
              {` (${filmInfo?.origin_name})`}
            </Typography>
            <ShareButton
              text={filmInfo?.content as string}
              title={filmInfo?.name as string}
            />
          </div>
          <div className="text-white bg-[#252525] p-4 my-3">
            {filmInfo?.episodes?.[0].server_data?.[0]?.link_m3u8 &&
              filmInfo?.episodes?.map((e, index) => (
                <div key={index}>
                  <div className="mb-3">
                    SERVER:
                    <span className="text-red-500 mb-3">
                      {" "}
                      {e.server_name}
                    </span>{" "}
                  </div>
                  {e.server_data
                    ?.sort((a, b) => Number(a.name) - Number(b.name))
                    ?.map((s) => (
                      <Tag
                        key={s.link_m3u8}
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
                        className="min-w-10 text-center mb-3 hover:!bg-[#4ADE81] cursor-pointer"
                        color={
                          router.query?.episode === s?.name &&
                          e.server_name.replace(" #", "_") ===
                            router.query?.sever_name
                            ? "#4ADE81"
                            : "default"
                        }
                        bordered
                      >
                        {s.name}
                      </Tag>
                    ))}
                </div>
              ))}
          </div>
          <div className="text-white bg-[#252525] p-4 ">
            <div className="flex flex-wrap gap-1 items-center mb-1">
              Đánh giá:{" "}
              <Rate
                allowHalf
                count={10}
                disabled
                value={filmInfo?.tmdb?.vote_average || 0}
              />
              {` (${filmInfo?.tmdb?.vote_average?.toFixed(1)} điểm / ${
                filmInfo?.view
              } lượt vote)`}
            </div>

            <p className="mb-1">
              Đang phát:
              <span className="text-red-500">
                {filmInfo?.status === "trailer"
                  ? " Trailer"
                  : ` ${filmInfo?.lang} ${filmInfo?.quality}`}
              </span>
            </p>
            <p className="mb-1">
              Tình trạng:
              <span className="text-red-500"> {filmInfo?.episode_current}</span>
            </p>
            <p className="mb-1">
              Ngày cập nhật:{" "}
              <span className="text-green-500">
                {dayjs(filmInfo?.modified?.time).format("DD-MM-YYYY HH:mm:ss")}
              </span>
            </p>
            <p className="mb-1">
              Thời lượng:
              <span className="text-green-500">
                {` ${filmInfo?.episode_total} `}
                {filmInfo?.time && `(${filmInfo?.time})`}
              </span>
            </p>
            <p className="mb-1">
              Thể loại:{` `}
              <span className="text-green-500">
                {filmInfo?.category.map((c, index) => (
                  <span key={c.id}>
                    <Link href={"/the-loai/" + c.slug}>{c.name}</Link>
                    {index < filmInfo.category.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </p>
            <p className="mb-1">
              Năm phát hành:
              <span className="text-green-500"> {filmInfo?.year}</span>
            </p>
            <p className="mb-1">
              Đạo diễn:
              <span className="text-green-500">
                {` ${filmInfo?.director.map((c) => c).join(", ")}`}
              </span>
            </p>
            <p className="mb-1">
              Quốc gia:{` `}
              <span className="text-green-500">
                {filmInfo?.country.map((c, index) => (
                  <span key={c.id}>
                    <Link href={"/quoc-gia/" + c.slug}>{c.name}</Link>
                    {index < filmInfo.country.length - 1 && ", "}
                  </span>
                ))}
              </span>
            </p>
            <p className="mb-1">
              Diễn viên:
              <span className="text-green-500">
                {` ${filmInfo?.actor.map((c) => c).join(", ")}`}
              </span>
            </p>
          </div>
          <div className="text-white bg-[#252525] p-4 my-3">
            <div
              className="flex gap-5 justify-between border-b-0 border-white"
              dangerouslySetInnerHTML={{ __html: filmInfo?.content as string }}
            />
            {!!filmInfo?.trailer_url && (
              <div id="trailer">
                <ReactPlayer
                  controls
                  url={filmInfo.trailer_url}
                  width="100%"
                  style={{ backgroundColor: "#111111", marginTop: 10 }}
                />
              </div>
            )}
          </div>
          <div className="text-white bg-[#252525] p-4 my-3">
            <Typography className="!text-xl !text-green-500 !font-semibold !underline !underline-offset-8 !cursor-pointer hover:!text-green-400">
              {dataRecommend?.titlePage || "Phim liên quan"}
            </Typography>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-5 mt-5">
              {dataRecommend?.items
                ?.filter((e) => e._id !== filmInfo?._id)
                ?.slice(1)
                ?.map((item) => (
                  <div key={item?._id} className="">
                    <CardItem data={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default WatchMovie;
