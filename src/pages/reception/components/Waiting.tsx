import { useRecoilValue } from "recoil";
import { ReceptionTabBody } from "../styled";
import { waitingListState } from "../../../recoil/reception/selectors";
import { authInfoState } from "../../../recoil/auth/atoms";
import { Table } from "antd";
import { ColumnType } from "antd/es/table/interface";
import { AnyObject } from "antd/es/_util/type";
import { calcAge, getSex } from "../../../utils";
import { ReputationAction } from "./ReputationAction";

const columns = [
  {
    title: "#",
    dataIndex: "index",
    key: "index",
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
    title: "Reg Time",
    dataIndex: "regTime",
    key: "regTime",
  },
] satisfies ColumnType<AnyObject>[];

export const Waiting = () => {
  const { isRater } = useRecoilValue(authInfoState);
  const waitings = useRecoilValue(waitingListState);

  const dataSource = [...waitings]
    .sort(
      (a, b) =>
        new Date(a.regDateTime).getTime() - new Date(b.regDateTime).getTime()
    )
    .map((waiting, idx) => {
      return {
        key: idx,
        index: idx + 1,
        name: waiting.name,
        age: calcAge(waiting.socialNum1),
        sex: getSex(waiting.socialNum2 ?? ""),
        regTime: new Date(waiting.regDateTime).toLocaleTimeString(),
        reputation: <ReputationAction reception={waiting} />,
      };
    });

  return (
    <ReceptionTabBody>
      <Table
        columns={
          isRater
            ? ([
                ...columns,
                {
                  title: "Reputation",
                  dataIndex: "reputation",
                  key: "reputation",
                },
              ] satisfies ColumnType<AnyObject>[])
            : columns
        }
        dataSource={dataSource}
      />
    </ReceptionTabBody>
  );
};
