// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#00b96b",
  },
  components: {
    Button: {
      colorPrimary: "#00b96b",
      algorithm: true,
    },
    Input: {
      colorPrimary: "#00b96b",
      algorithm: false,
    },
    Breadcrumb: {
      linkColor: "#97B2C8",
      separatorColor: "#97B2C8",
      lastItemColor: "#00b96b",
      linkHoverColor: "#ffffff",
    },
    Carousel: {
      arrowSize: 40,
      arrowOffset: 20,
    },
    Tabs: {
      cardBg: "#ffffff",
      itemColor: "#ffffff",
    },
  },
};

export default theme;
