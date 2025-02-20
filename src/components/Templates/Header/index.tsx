import { FC } from "react";
import Head from "next/head";

interface Props {
  thumbnail: string;
  description: string;
  title: string;
  path: string;
  ico?: string;
}

const HeaderTemplate: FC<Props> = ({
  thumbnail,
  description,
  title,
  path,
  ico,
}) => {
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
      <link rel="shortcut icon" href={ico || "/favicon.ico"} type="image/png" />
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
        content={`https://ophim17.cc/_next/image?url=http://img.ophim.live${thumbnailPath}&w=192&q=75`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`https://ophim17.cc/_next/image?url=http://img.ophim.live${thumbnailPath}&w=192&q=75`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="quytphim.vercel.app" />
      <meta property="og:url" content={`${baseUrl}${path}`} />
      <meta property="og:locale" content="vi_VN" />
      <meta itemProp="name" content={description} />
      <meta itemProp="description" content={description} />
      <meta name="image" content={`https://ophim17.cc/_next/image?url=http://img.ophim.live${thumbnailPath}&w=192&q=75`} />
      <link rel="canonical" href={`${baseUrl}${path}`} />
      <link rel="alternate" href={`${baseUrl}${path}`} hrefLang="vi-vn" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <meta name="theme-color" content="#111111" />
      
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_16_Pro_Max_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_16_Pro_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/iPhone_11__iPhone_XR_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/13__iPad_Pro_M4_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/12.9__iPad_Pro_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/11__iPad_Pro_M4_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/10.9__iPad_Air_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/10.5__iPad_Air_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/10.2__iPad_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        href="/splash_screens/8.3__iPad_Mini_landscape.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_16_Pro_Max_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_16_Pro_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/iPhone_11__iPhone_XR_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        href="/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/13__iPad_Pro_M4_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/12.9__iPad_Pro_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/11__iPad_Pro_M4_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/10.9__iPad_Air_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/10.5__iPad_Air_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/10.2__iPad_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
      />
      <link
        rel="apple-touch-startup-image"
        media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        href="/splash_screens/8.3__iPad_Mini_portrait.png"
      ></link>
    </Head>
  );
};

export default HeaderTemplate;
