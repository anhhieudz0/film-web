import HeaderTemplate from "@/components/Templates/Header";
import BreadCrumbComponent from "@/components/common/Breadcumb";
import CardItem from "@/components/common/CardItem";
import FilterSearch from "@/components/common/FilterSearch";
import FilmsService from "@/services/film.service";
import { BreadCrumb } from "@/types/breakCumb.type";
import { Films } from "@/types/films.type";
import { Pagination, Typography } from "antd";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Country: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const [data, setData] = useState<Films>();
  const [page, setPage] = useState<number>();
  const fetchData = async () => {
    try {
      setData(undefined);
      const res = await FilmsService.getListFilmByCountry(
        query.slug as string,
        {
          page,
          sort_field: query.sort_field as string,
          category: query.category as string,
          country: query.country as string,
          year: query.year as string,
        }
      );
      setData(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (query.slug) {
      fetchData();
    }
  }, [query, page]);

  useEffect(() => {
    if (query.slug && page) {
      const url = "/quoc-gia/" + query.slug + buildQueryParams();
      router.replace(url, url, { scroll: false, shallow: true });
    }
  }, [page]);

  const buildQueryParams = () => {
    return `?page=${page}&category=${query?.category || ""}&country=${
      query?.country || ""
    }&year=${query?.year || ""}&sort_field=${query?.sort_field || ""}`;
  };

  useEffect(() => {
    if (query.page) {
      setPage(Number(query.page));
    } else {
      setPage(1);
    }
  }, [query]);

  return (
    <>
      <HeaderTemplate
        path={data?.seoOnPage.og_url.slice(4) as string}
        title={data?.seoOnPage.titleHead as string}
        description={data?.seoOnPage.descriptionHead as string}
        thumbnail={data?.seoOnPage.og_image[0] as string}
      />
      <div className="px-4 md:px-0 mt-4">
        {data && (
          <BreadCrumbComponent data={data?.breadCrumb as BreadCrumb[]} />
        )}
        {data && <FilterSearch />}
        <Typography className="text-xl text-green-500 font-semibold underline underline-offset-8 cursor-pointer hover:text-green-400">
          {data?.titlePage}
        </Typography>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-5">
          {data?.items?.map((item) => (
            <CardItem key={item._id} data={item} />
          ))}
        </div>
        <div className="my-4 flex justify-center">
          {data && data?.params?.pagination?.totalItems > 24 && (
            <Pagination
              total={data?.params?.pagination?.totalItems}
              onChange={(page) => setPage(page)}
              style={{ color: "white" }}
              pageSize={24}
              current={page}
              showSizeChanger={false}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Country;
