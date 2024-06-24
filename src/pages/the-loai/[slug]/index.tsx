import HeaderTemplate from "@/components/Templates/Header";
import BreadCrumbComponent from "@/components/common/Breadcumb";
import CardItem from "@/components/common/CardItem";
import FilterSearch from "@/components/common/FilterSearch";
import FilmsService from "@/services/film.service";
import { BreadCrumb } from "@/types/breakCumb.type";
import { Films } from "@/types/films.type";
import { SEOOnPage } from "@/types/seoOnPage.type";
import { Empty, Pagination, Typography } from "antd";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    let path = "";
    const resolvedUrl = context?.resolvedUrl?.replace(
      "/the-loai/",
      "/api/the-loai/",
    );
    switch (true) {
      case resolvedUrl?.includes("?"):
        path = resolvedUrl?.replace("?", ".json?");
        break;

      default:
        path = resolvedUrl + ".json";
        break;
    }
    // Fetch data from external API
    const res = await fetch(
      `${
        process?.env?.NEXT_PUBLIC_FE_URL || "https://quytphim.vercel.app"
      }${path}`,
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
const Category: NextPage<{ seo: SEOOnPage }> = ({ seo }) => {
  const router = useRouter();
  const { query } = router;
  const [data, setData] = useState<Films>();
  const [page, setPage] = useState<number>(1);
  const fetchData = async () => {
    try {
      setData(undefined);
      const res = await FilmsService.getListFilmByCategory(
        query.slug as string,
        {
          page,
          sort_field: query.sort_field as string,
          category: query.category as string,
          country: query.country as string,
          year: query.year as string,
        },
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
      const url = "/the-loai/" + query.slug + buildQueryParams();
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
        path={seo?.og_url as string}
        title={seo?.titleHead as string}
        description={seo?.descriptionHead as string}
        thumbnail={seo?.og_image[0] as string}
      />
      <div className="px-4 mt-4">
        {data && (
          <BreadCrumbComponent data={data?.breadCrumb as BreadCrumb[]} />
        )}
        {data && <FilterSearch />}
        <Typography className="!text-xl !text-green-500 !font-semibold !underline !underline-offset-8 !cursor-pointer hover:!text-green-400">
          {data?.titlePage}
        </Typography>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-3 mt-5">
          {data?.items?.map((item) => <CardItem key={item._id} data={item} />)}
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
          {data?.items?.length === 0 && (
            <div className="flex flex-row justify-center items-center">
              <Empty
                description={<p className="!text-white">Không có dữ liệu</p>}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Category;
