// SearchComponent.tsx
import React, { useState, useEffect } from "react";
import { Empty, Input, Spin, Tag } from "antd";
import { useDebounce } from "@/hooks/useDebounce";
import FilmsService from "@/services/film.service";
import { Item } from "@/types/films.type";
import { useRouter } from "next/router";

const { Search } = Input;

interface SearchComponentProps {
  apiEndpoint?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ apiEndpoint }) => {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 500); // Delay 500ms
  const [items, setItems] = useState<Item[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const defaultImageUrl = "/images/card_image_default.jpg"; // Ensure this path is correct


  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await FilmsService.getSearchFilm({
        keyword: debouncedSearch,
      });
      setItems(response.data.data.items);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debouncedSearch) {
      fetchItems();
    } else {
      setItems([]);
    }
  }, [debouncedSearch]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="relative">
      <Search
        placeholder="Tìm kiếm phim..."
        onSearch={() => {
          if (search) {
            router.push("/tim-kiem/" + search);
            setIsFocused(false);
            setSearch("");
          }
        }}
        onChange={(e) => handleSearch(e.target.value)}
        value={search}
        enterButton
        size="large"
        className="md:!w-96 !w-[92vw]"
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 100);
        }}
      />
      {isFocused && (
        <div
          className={` w-full absolute !z-[999999] top-12 bg-[#111111] p-4 grid grid-cols-1 gap-3 rounded-b-md shadow-sm shadow-green-400 max-h-[70vh] overflow-hidden ${
            !loading ? "overflow-y-scroll " : ""
          }`}
        >
          {items && items.length > 0 ? (
            items.map((item) => (
              <div
                key={item._id}
                className="flex rounded-md shadow-sm shadow-green-400 gap-2  max-h-[120px] overflow-hidden hover:shadow-green-500 hover:bg-gray-900 cursor-pointer"
                onClick={() => {
                  router.push("/" + item.slug);
                  setIsFocused(false);
                  setSearch("");
                }}
              >
                <img
                  src={`http://img.ophim1.com/uploads/movies/${item.thumb_url}`}
                  alt="thumb"
                  className="w-20 h-full object-cover"
                  style={{
                    backgroundImage:
                     `url(${defaultImageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  onError={(e) => {
                    e.currentTarget.src = defaultImageUrl;
                    e.currentTarget.onerror = null;
                  }}
                />
                <div className="p-2 flex flex-col justify-between text-sm">
                  <p>{item.name}</p>
                  <p>
                    Quốc gia: {item?.country?.map((c) => c.name)?.join(", ")}
                  </p>
                  <p>
                    {item.time} | {item.quality} | {item.lang}
                  </p>
                  <p>{item.category.slice(3).map((c) => c.name).join(" | ")}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-row justify-center items-center">
              <Empty
                description={<p className="!text-white">Không có dữ liệu</p>}
              />
            </div>
          )}
          {loading && (
            <div className="absolute flex items-center justify-center bg-white top-0 left-0 right-0 bottom-0 bg-opacity-60">
              <Spin size="large" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
