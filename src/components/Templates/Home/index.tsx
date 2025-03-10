import React, { useEffect, useState } from "react";
import TitleWithSeeAll from "@/components/common/TitleWithSeeAll";
import CardItem from "@/components/common/CardItem";
import { Films, Item } from "@/types/films.type";
import FilmsService from "@/services/film.service";
import SwiperSlider from "@/components/common/SwiperSlider";

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
    const _data = data?.items;
    return (
      <div className="mt-8 px-4 md:px-0">
        {_data?.length > 0 && <TitleWithSeeAll title={title} path={path} />}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5 h-full">
          {_data?.length > 0 &&
            _data?.map((item) => (
              <div key={item._id}>
                <CardItem data={item} />
              </div>
            ))}
        </div>
      </div>
    );
  };
  return (
    <div>
      {/* <HeaderTemplate
        path={phimMoi?.seoOnPage.og_url.slice(4) as string}
        title={phimMoi?.seoOnPage.titleHead as string}
        description={phimMoi?.seoOnPage.descriptionHead as string}
        thumbnail={phimMoi?.seoOnPage.og_image[0] as string}
      /> */}
      <>
        <SwiperSlider data={phimMoi?.items.slice(0, 10) as Item[]} />
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
