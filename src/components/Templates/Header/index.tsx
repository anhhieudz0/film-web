import { FC } from "react";
import Head from "next/head";

interface Props {
  thumbnail: string;
  description: string;
  title: string;
  path: string;
}

const HeaderTemplate: FC<Props> = (props) => {
  const { thumbnail, description, title, path } = props;
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="revisit-after" content="1 days" />
      <meta name="ROBOTS" content="index,follow,noodp" />
      <meta name="googlebot" content="index,follow" />
      <meta name="BingBOT" content="index,follow" />
      <meta name="yahooBOT" content="index,follow" />
      <meta name="slurp" content="index,follow" />
      <meta name="msnbot" content="index,follow" />
      <meta http-equiv="content-language" content="vi" />
      <meta name="description" content={description} />
      <meta name="keywords" content="" />
      <meta name="author" content="OPhim8.CC" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`http://img.ophim1.com${thumbnail}`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`http://img.ophim1.com${thumbnail}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="OPhim8.CC" />
      <meta property="og:url" content={`${window.location.host}${path}`} />
      <meta property="og:locale" content="vi_VN" />
      <meta itemProp="name" content={description} />
      <meta itemProp="description" content={description} />
      <meta name="image" content={`http://img.ophim1.com${thumbnail}`} />
      <link rel="canonical" href={`${window.location.host}${path}`} />
      <link
        rel="alternate"
        href={`${window.location.host}${path}`}
        hrefLang="vi-vn"
      />
      <meta property="fb:admins" content="" />
      <meta property="fb:app_id" content="" />
      <link rel="manifest" href="/manifest.json" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <link rel="apple-touch-icon" href="/logo.png" />
      <meta name="theme-color" content="#042940" />
    </Head>
  );
};

export default HeaderTemplate;
