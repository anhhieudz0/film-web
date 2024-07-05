import HeaderTemplate from "@/components/Templates/Header";
import EnhancedButton from "@/components/common/EnhancedButton";
import { Tabs } from "antd";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Sheet } from "react-modal-sheet";
import { BsCalendar2Date } from "react-icons/bs";
interface TvChannel {
  id: number;
  title: string;
  url: string;
  tvid: string;
  tvgroup: string;
  tvlogo: string;
  "group-logo": string;
  radio?: string;
}

interface TvGroup {
  tvgroup: string;
  groupLogo: string;
  quantity: number;
}

const WatchTV: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const [tvList, setTvList] = useState<TvChannel[]>([]);
  const [tvGroup, setTvGroup] = useState<TvGroup[]>([]);
  const [playing, setPlaying] = useState(false);
  const [info, setInfo] = useState<TvChannel | undefined>();
  const [isOpen, setOpen] = useState(false);
  const [idTv, setIdTv] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get<TvChannel[]>("/data/iptv.json");

    const groupCounts = data.reduce<Record<string, TvGroup>>(
      (acc: any, channel: any) => {
        const group = channel.tvgroup;
        const logo = channel["group-logo"] || "";

        if (!acc[group]) {
          acc[group] = { tvgroup: group, groupLogo: logo, quantity: 0 };
        }

        acc[group].quantity += 1;

        return acc;
      },
      {}
    );

    // Chuyển đổi đối tượng thành một mảng
    const groups = Object.values(groupCounts);
    setTvGroup(groups as any);
    setTvList(data);
  };

  useEffect(() => {
    fetchData();
  }, [router.pathname]);

  useEffect(() => {
    setInfo(undefined);
    if (tvList.length === 0) return;

    if (!query.channel) {
      setInfo(tvList[0]);
    } else {
      const _info = tvList.find((tv) => tv.tvid === (query.channel as string));
      setInfo(_info);
    }
  }, [router.pathname, query, tvList]);

  const RenderTvGroup = ({ data }: { data: TvGroup[] }) => {
    const allGroups = [
      {
        tvgroup: "Tất cả",
        groupLogo: "",
        quantity: tvList.length,
      },
      ...data,
    ];

    return (
      <Tabs
        defaultActiveKey={(query.tvGroup as string) || "Tất cả"}
        tabPosition="top"
        animated={{ inkBar: false, tabPane: true }}
        type="line"
        items={allGroups.map((group, index) => {
          const channels =
            group.tvgroup !== "Tất cả"
              ? tvList.filter((tv) => tv.tvgroup === group.tvgroup)
              : tvList;

          return {
            label: group.tvgroup,
            key: group.tvgroup,
            children: (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-3 px-3">
                {channels.map((channel) => (
                  <EnhancedButton
                    key={channel.tvid}
                    styleBody={{
                      width: "100%",
                      height: 150,
                      background: "#ffffff",
                      borderRadius: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                    onClick={() =>
                      setTimeout(() => {
                        router.push(
                          `/xem-tv?tvGroup=${group.tvgroup}&channel=${channel.tvid}`
                        );
                      }, 300)
                    }
                  >
                    {query.channel === channel.tvid && (
                      <div className="absolute top-3 right-2 w-4 h-4 rounded-full bg-green-500 animate-bounce" />
                    )}
                    <img src={channel.tvlogo} alt="" className="w-[50%]" />
                  </EnhancedButton>
                ))}
              </div>
            ),
          };
        })}
      />
    );
  };

  return (
    <>
      {tvList.length > 0 && (
        <>
          <HeaderTemplate
            path={router.asPath}
            title={info?.title ?? ""}
            description={info?.title ?? ""}
            thumbnail={info?.tvlogo ?? ""}
            ico={info?.tvlogo ?? ""}
          />
          {info && (
            <>
              <ReactPlayer
                controls
                url={info.url}
                width="100%"
                style={{
                  background:
                    info.radio === "true"
                      ? `url(/images/poster-default.jpg)`
                      : "",
                  backgroundSize: "cover",
                  backgroundColor: "#111111",
                  maxHeight: "50svh",
                }}
                onReady={() => setTimeout(() => setPlaying(true), 1000)}
                playing={playing}
                config={{
                  file: {
                    forceVideo: true,
                    forceAudio: true,
                  },
                }}
              />

              <span className="!text-xl !text-green-500 !font-semibold p-3 flex gap-3 items-center">
                {info.title}
                <BsCalendar2Date
                  className="text-white text-2xl"
                  onClick={() => {
                    setIdTv(info.tvid);
                    setOpen(true);
                  }}
                />
              </span>
            </>
          )}
          <RenderTvGroup data={tvGroup} />
        </>
      )}
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <iframe
              id="iframe-schedule"
              width="100%"
              height="100%"
              src={
                "http://www.radiovietnamonline.com/api/schedule?imgNm=" + idTv
              }
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default WatchTV;
