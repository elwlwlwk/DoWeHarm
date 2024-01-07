import { useRecoilValue } from "recoil";
import { ReceptionTabBody } from "../styled";
import { completedListState } from "../../../recoil/reception/selectors";
import { AnyObject } from "antd/es/_util/type";
import Table, { ColumnType } from "antd/es/table";
import { calcAge, getSex } from "../../../utils";
import { SecondReputationAction } from "./SecondReputationAction";

const columns = [
  {
    title: "Reg Time",
    dataIndex: "regTime",
    key: "regTime",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "",
    dataIndex: "reputation",
    key: "reputation",
  },
] satisfies ColumnType<AnyObject>[];

export const Completed = () => {
  const completedList = useRecoilValue(completedListState);
  const dataSource = completedList.map((completed) => ({
    regTime: new Date(completed.regDateTime).toLocaleString(),
    name: completed.name,
    age: calcAge(completed.socialNum1),
    sex: getSex(completed.socialNum2 ?? ""),
    reputation: <SecondReputationAction reception={completed} />,
  })) satisfies AnyObject[];
  return (
    <ReceptionTabBody>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </ReceptionTabBody>
  );
};
