// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const queryParams: any = req.query;

    const url = `https://ophim16.cc/_next/data/Y8LCjUe8gNGFgL03cKgEY/tim-kiem.json?${new URLSearchParams(
      queryParams,
    )}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "*/*",
        "accept-language": "vi,ja;q=0.9,en;q=0.8,en-US;q=0.7",
        cookie:
          "_ga=GA1.1.2045850180.1717122387; _ga_09ECCB0VBM=GS1.1.1717404809.3.0.1717404809.0.0.0; Hm_lvt_897d214a44ba6264c573fb99dd199636=1717122387,1717404810; Hm_lpvt_897d214a44ba6264c573fb99dd199636=1717404810",
        referer: "https://ophim16.cc/",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    res.status(200).json(data.pageProps);
  } catch (error: any) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" } as any);
  }
}
