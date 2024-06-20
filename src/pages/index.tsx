// Import React và các thành phần cần thiết
import React from "react";
import HomeTemplate from "@/components/Templates/Home";
import { GetServerSideProps, NextPage } from "next";
import { SEOOnPage } from "@/types/seoOnPage.type";
import HeaderTemplate from "@/components/Templates/Header";

// Định nghĩa hàm getServerSideProps để fetch dữ liệu
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.query;
    // Fetch data from external API
    const res = await fetch(
      `${
        process?.env?.NEXT_PUBLIC_FE_URL || "https://quytphim.vercel.app"
      }/api/danh-sach/phim-moi.json`,
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

// Định nghĩa component Home nhận props seo và render UI tương ứng
const Home: NextPage<{ seo: SEOOnPage }> = ({ seo }) => {
  return (
    <>
      <HeaderTemplate
        path={seo?.og_url as string}
        title={seo?.titleHead as string}
        description={seo?.descriptionHead as string}
        thumbnail={seo?.og_image[0] as string}
      />
      <HomeTemplate />
    </>
  );
};

// Export component Home
export default Home;
