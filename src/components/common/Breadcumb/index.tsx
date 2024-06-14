import { BreadCrumb as BreadCrumbType } from "@/types/breakCumb.type";
import { Breadcrumb } from "antd";
import React from "react";
interface Props {
  data: BreadCrumbType[];
}
const BreadCrumbComponent = (props: Props) => {
  const { data } = props;
  if (!data) {
    return <></>;
  }

  return (
    <div>
      <Breadcrumb
        className="px-4 py-2"
        separator=">"
        items={[
          {
            title: "Trang chủ",
            href: "/",
          },
          ...data?.map((item) => ({ title: item.name, href: item.slug })),
        ]}
      />
    </div>
  );
};

export default BreadCrumbComponent;
