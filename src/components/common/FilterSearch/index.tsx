import { categories, country } from "@/constants/data";
import { Params } from "@/types/params.type";
import { Button, Select } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const FilterSearch = () => {
  const router = useRouter();
  const { query } = router;
  let yearOptions = [];
  for (let year = 1900; year <= dayjs().year(); year++) {
    yearOptions.push({ label: `${year}`, value: `${year}` });
  }
  const [filter, setFilter] = useState<Partial<Params>>({
    category: `${router.asPath
      .replaceAll("/", "")
      .replace("[slug]", "")}`?.includes("the-loai")
      ? (query.slug as string)
      : (query.category as string) || "",
    sort_field: (query.sort_field as string) || "_id",
    year: (query.year as string) || "",
    country: `${router.asPath
      .replaceAll("/", "")
      .replace("[slug]", "")}`?.includes("quoc-gia")
      ? (query.slug as string)
      : (query.country as string) || "",
    type_slug: `${router.asPath
      .replaceAll("/", "")
      .replace("[slug]", "")}`?.includes("danh-sach")
      ? (query.slug as string)
      : "phim-moi",
  });
  const onFilter = () => {
    if (query.slug) {
      const url = buildQueryParams();
      router.replace(url, url, { scroll: false, shallow: true });
    }
  };

  const buildQueryParams = () => {
    const { type_slug, category, country, year, sort_field } = filter || {};
    const queryParams = [
      { key: "category", value: category },
      { key: "country", value: country },
      { key: "year", value: year },
      { key: "sort_field", value: sort_field },
    ];

    const queryString = queryParams
      .filter((param) => param.value != null)
      .map((param) => `${param.key}=${param.value}`)
      .join("&");

    return `/danh-sach/${type_slug}/?page=1&${queryString}`;
  };

  useEffect(() => {
    setFilter({
      category: `${router.asPath
        .replaceAll("/", "")
        .replace("[slug]", "")}`?.includes("the-loai")
        ? (query.slug as string)
        : (query.category as string) || "",
      sort_field: (query.sort_field as string) || "_id",
      year: (query.year as string) || "",
      country: `${router.asPath
        .replaceAll("/", "")
        .replace("[slug]", "")}`?.includes("quoc-gia")
        ? (query.slug as string)
        : (query.country as string) || "",
      type_slug: `${router.asPath
        .replaceAll("/", "")
        .replace("[slug]", "")}`?.includes("danh-sach")
        ? (query.slug as string)
        : "phim-moi",
    });
  }, [query]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 my-5">
      <div>
        <Select
          className="w-full"
          id="sort_field"
          defaultValue={"phim-moi"}
          value={filter.sort_field}
          options={[
            { label: "Thời gian đăng", value: "_id" },
            { label: "Thời gian cập nhật", value: "modified.time" },
            { label: "Năm sản xuất", value: "year" },
          ]}
          onChange={(e) => setFilter((prev) => ({ ...prev, sort_field: e }))}
        />
      </div>
      <div>
        <Select
          className="w-full"
          defaultValue={"phim-moi"}
          value={filter.type_slug}
          onChange={(e) => setFilter((prev) => ({ ...prev, type_slug: e }))}
          id="type"
        >
          <Select.Option value="phim-moi">Phim Mới</Select.Option>
          <Select.Option value="phim-bo">Phim Bộ</Select.Option>
          <Select.Option value="phim-le">Phim Lẻ</Select.Option>
          <Select.Option value="tv-shows">TV Shows</Select.Option>
          <Select.Option value="hoat-hinh">Hoạt Hình</Select.Option>
          <Select.Option value="phim-vietsub">Phim Vietsub</Select.Option>
          <Select.Option value="phim-thuyet-minh">
            Phim Thuyết Minh
          </Select.Option>
          <Select.Option value="phim-long-tieng">Phim Lồng Tiếng</Select.Option>
          <Select.Option value="phim-bo-dang-chieu">
            Phim Bộ Đang Chiếu
          </Select.Option>
          <Select.Option value="phim-bo-hoan-thanh">Phim Trọn Bộ</Select.Option>
          <Select.Option value="phim-sap-chieu">Phim Sắp Chiếu</Select.Option>
          <Select.Option value="subteam">Subteam</Select.Option>
        </Select>
      </div>
      <div>
        <Select
          id="category"
          options={[
            { label: "Toàn bộ Thể loại", value: "" },
            ...categories.map((c) => ({ label: c.name, value: c.slug })),
          ]}
          defaultValue={""}
          className="w-full"
          onChange={(e) => setFilter((prev) => ({ ...prev, category: e }))}
          value={filter.category}
        />
      </div>
      <div>
        <Select
          id="country"
          options={[
            { label: "Toàn bộ Quốc gia", value: "" },
            ...country.map((c) => ({ label: c.name, value: c.slug })),
          ]}
          defaultValue={""}
          className="w-full"
          onChange={(e) => setFilter((prev) => ({ ...prev, country: e }))}
          value={filter.country}
        />
      </div>
      <div>
        <Select
          id="year"
          options={[
            { label: "Toàn bộ Năm", value: "" },
            ...yearOptions.reverse(),
          ]}
          defaultValue={""}
          className="w-full"
          onChange={(e) => setFilter((prev) => ({ ...prev, year: e }))}
          value={filter.year}
        />
      </div>
      <div>
        <Button className="w-full" type="primary" onClick={onFilter}>
          Duyệt phim
        </Button>
      </div>
    </div>
  );
};

export default FilterSearch;
