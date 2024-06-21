import { Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface Props {
  title?: string;
  path?: string;
}
const TitleWithSeeAll = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-end ">
      <Typography
        className="!text-xl !text-green-500 !font-semibold !underline !underline-offset-8 !cursor-pointer hover:text-green-400"
        onClick={() => {
          props.path && router.push(props.path);
        }}
      >
        {props.title?.toLocaleUpperCase()}
      </Typography>
      {props.path && (
        <Link
          href={props.path}
          className="text-sm font-semibold bg-green-500 rounded-md text-white py-1 px-2 hover:bg-green-400"
        >
          Xem tất cả
        </Link>
      )}
    </div>
  );
};

export default TitleWithSeeAll;
