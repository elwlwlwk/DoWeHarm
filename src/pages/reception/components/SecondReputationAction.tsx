import { Button, Flex, Modal } from "antd";
import { ReceptionRow } from "../../../service/types";
import { useState } from "react";
import { calcAge, getSex } from "../../../utils";

import { SecondReputation } from "./SecondReputation";

interface SecondReputationProps {
  reception: ReceptionRow;
}

export const SecondReputationAction = ({
  reception,
}: SecondReputationProps) => {
  const { name, socialNum1, socialNum2 } = reception;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Flex gap="small" wrap="wrap">
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        2nd Rating
      </Button>
      <Modal
        key={`Modal-${isModalOpen}`}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        centered
        title={`${name}(${calcAge(socialNum1)} ${getSex(socialNum2 ?? "")})`}
        footer={null}
      >
        <SecondReputation
          reception={reception}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </Flex>
  );
};
