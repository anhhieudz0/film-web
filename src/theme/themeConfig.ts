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
  },
};

export default theme;
