import { Tabs } from "antd";
import { WorkMain } from "./WorkMain";

export const WorkTabs = () => {
  return (
    <Tabs
      items={[
        {
          key: "main",
          label: "Main",
          children: <WorkMain />,
        },
        {
          key: "history",
          label: "History",
          children: <div>history</div>,
        },
      ]}
    />
  );
};
