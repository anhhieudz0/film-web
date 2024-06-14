import React, { useEffect, useState } from "react";
import HeaderTemplate from "../Header";
import { Skeleton } from "antd";
import SliderShow from "@/components/common/SliderShow";
import TitleWithSeeAll from "@/components/common/TitleWithSeeAll";
import CardItem from "@/components/common/CardItem";
import { Films, Item } from "@/types/films.type";
import FilmsService from "@/services/film.service";

const HomeTemplate = () => {
  const [phimLe, setPhimLe] = useState<Films>();
  const [phimBo, setPhimBo] = useState<Films>();
  const [phimMoi, setPhimMoi] = useState<Films>();
  const [phimSapChieu, setPhimSapChieu] = useState<Films>();
  const [tvShow, setTvShow] = useState<Films>();
  const fetchData = async () => {
    try {
      const [phimLe, phimBo, phimMoi, sapChieu, tvShow] = await Promise.all([
        FilmsService.getListFilm("phim-le", {}),
        FilmsService.getListFilm("phim-bo", {}),
        FilmsService.getListFilm("phim-moi", {}),

        FilmsService.getListFilm("phim-sap-chieu", {}),
        FilmsService.getListFilm("tv-shows", {}),
      ]);
      setPhimLe(phimLe.data.data);
      setPhimBo(phimBo.data.data);
      setPhimMoi(phimMoi.data.data);
      setPhimSapChieu(sapChieu.data.data);
      setTvShow(tvShow.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  const ListFilmSection = ({
    data,
    title,
    path,
  }: {
    data: Films;
    title: any;
    path: any;
  }) => {
    const _data = data?.items?.slice(0, 15);
    const _dummy = new Array(10).fill("");
    return (
      <div className="mt-8 px-4 md:px-0">
        <TitleWithSeeAll title={title} path={path} />
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-5">
          {_data?.length > 0
            ? _data?.map((item, index) => (
                <div
                  key={item._id}
                  className={index === 0 ? "col-span-2 md:row-span-2" : ""}
                >
                  <CardItem data={item} />
                </div>
              ))
            : _dummy.map((item, index) => (
                <div key={index}>
                  <Skeleton.Image active className="!w-full min-h-[280px]" />
                </div>
              ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      <HeaderTemplate
        path={phimMoi?.seoOnPage.og_url.slice(4) as string}
        title={phimMoi?.seoOnPage.titleHead as string}
        description={phimMoi?.seoOnPage.descriptionHead as string}
        thumbnail={phimMoi?.seoOnPage.og_image[0] as string}
      />
      <>
        {phimMoi && phimMoi?.items?.length > 0 ? (
          <SliderShow data={phimMoi?.items.slice(0, 5) as Item[]} />
        ) : (
          <Skeleton.Image active className="!w-full !h-[200px]" />
        )}
      </>
      <ListFilmSection
        data={phimMoi as Films}
        title="PHIM MỚI CẬP NHẬT"
        path="/danh-sach/phim-moi"
      />
      <ListFilmSection
        data={phimLe as Films}
        title="PHIM LẺ MỚI CẬP NHẬT"
        path="/danh-sach/phim-le"
      />
      <ListFilmSection
        data={phimBo as Films}
        title="PHIM BỘ MỚI CẬP NHẬT"
        path="/danh-sach/phim-bo"
      />
      <ListFilmSection
        data={phimSapChieu as Films}
        title="PHIM SẮP CHIẾU"
        path="/danh-sach/phim-sap-chieu"
      />
      <ListFilmSection
        data={tvShow as Films}
        title="TV SHOW"
        path="/danh-sach/tv-show"
      />
    </div>
  );
};

export default HomeTemplate;
