"use client";
import React, { useState } from "react";
import { Input, Popover } from "antd";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import { categories, country } from "@/constants/data";
import SearchComponent from "../common/SearchComponent";
import { useRouter } from "next/router";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const router = useRouter();
  return (
    <div
      className={
        true ? "dark h-full shadow-sm shadow-green-200" : "h-full shadow-md"
      }
    >
      <div className=" bg-white dark:bg-[#111111] text-black dark:text-white">
        <div className="max-w-[1364px] m-auto h-full flex flex-wrap items-center justify-between p-4 gap-5 m-w">
          <div className="flex flex-wrap gap-5">
            <img
              src="/vercel.svg"
              className="w-24 bg-white p-2 rounded-md cursor-auto m-auto"
              onClick={() => router.push("/")}
            />
            <SearchComponent />
          </div>
          <div className="flex flex-wrap gap-5">
            <Link
              href={"/danh-sach/phim-bo"}
              className="dark:text-white text-nowrap font-semibold hover:!text-green-400"
            >
              Phim Bộ
            </Link>
            <Link
              href={"/danh-sach/phim-le"}
              className="dark:text-white text-nowrap font-semibold hover:!text-green-400"
            >
              Phim Lẻ
            </Link>
            <Link
              href={"/danh-sach/shows"}
              className="dark:text-white text-nowrap font-semibold hover:!text-green-400"
            >
              Shows
            </Link>
            <Link
              href={"/danh-sach/hoat-hinh"}
              className="dark:text-white text-nowrap font-semibold hover:!text-green-400"
            >
              Hoạt Hình
            </Link>
            <Popover
              className="flex gap-1 items-center dark:text-white text-nowrap font-semibold hover:!text-green-400"
              content={
                <div className="grid grid-cols-3 gap-5 rounded-lg shadow-lg">
                  {categories.map((c) => (
                    <a
                      onClick={() => window.document.body.click()}
                      key={c.slug}
                      href={`/the-loai/${c.slug}`}
                      className="!text-white text-center text-nowrap font-semibold hover:!text-green-400"
                    >
                      {c.name}
                    </a>
                  ))}
                </div>
              }
              overlayInnerStyle={{ backgroundColor: "#1A1A1A" }}
            >
              Thể loại <BsChevronDown />
            </Popover>
            <Popover
              className="flex gap-1 items-center dark:text-white text-nowrap font-semibold hover:!text-green-400"
              content={
                <div className="grid grid-cols-3 gap-5 rounded-lg shadow-lg">
                  {country.map((c) => (
                    <a
                      key={c.slug}
                      href={`/quoc-gia/${c.slug}`}
                      className="!text-white text-center text-nowrap font-semibold hover:!text-green-400"
                    >
                      {c.name}
                    </a>
                  ))}
                </div>
              }
              overlayInnerStyle={{ backgroundColor: "#1A1A1A" }}
            >
              Quốc gia <BsChevronDown />
            </Popover>
            <Link
              href={"/danh-sach/sap-chieu"}
              className="dark:text-white text-nowrap font-semibold hover:!text-green-400"
            >
              Sắp Chiếu
            </Link>
            <Link
              href={"/danh-sach/subteam"}
              className="dark:text-white text-nowrap font-semibold hover:!text-green-400"
            >
              SubTeam
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
