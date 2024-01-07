import { Tabs } from "antd";
import { Recept } from "./Recept";
import { Waiting } from "./Waiting";
import { Completed } from "./Completed";

export const ReceptionTabs = () => {
  return (
    <Tabs
      items={[
        {
          key: "reception",
          label: "Reception",
          children: <Recept />,
        },
        {
          key: "waiting",
          label: "Waiting",
          children: <Waiting />,
        },
        {
          key: "completed",
          label: "Completed",
          children: <Completed />,
        },
      ]}
    />
  );
};
