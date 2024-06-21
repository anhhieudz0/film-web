import { FC } from "react";
import Head from "next/head";

interface Props {
  thumbnail: string;
  description: string;
  title: string;
  path: string;
}

const HeaderTemplate: FC<Props> = ({ thumbnail, description, title, path }) => {
  const baseUrl = process.browser
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL || "";
  let thumbnailPath = "";
  switch (true) {
    case thumbnail?.includes("/uploads/movies/"):
      thumbnailPath = thumbnail?.replace("thumb.", "poster.");
      break;

    case thumbnail?.includes("movies/"):
      thumbnailPath = "/uploads/" + thumbnail?.replace("thumb.", "poster.");
      break;

    default:
      thumbnailPath =
        "/uploads/movies/" + thumbnail?.replace("thumb.", "poster.");
      break;
  }
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="revisit-after" content="1 days" />
      <meta name="description" content={description} />
      <meta name="author" content="quytphim.vercel.app" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`http://img.ophim1.com${thumbnailPath}`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`http://img.ophim1.com${thumbnailPath}`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="quytphim.vercel.app" />
      <meta property="og:url" content={`${baseUrl}${path}`} />
      <meta property="og:locale" content="vi_VN" />
      <meta itemProp="name" content={description} />
      <meta itemProp="description" content={description} />
      <meta name="image" content={`http://img.ophim1.com${thumbnailPath}`} />
      <link rel="canonical" href={`${baseUrl}${path}`} />
      <link rel="alternate" href={`${baseUrl}${path}`} hrefLang="vi-vn" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <meta name="theme-color" content="#111111" />
    </Head>
  );
};

export default HeaderTemplate;
