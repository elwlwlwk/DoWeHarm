import { Button, Flex, Modal } from "antd";
import { ReceptionRow } from "../../../service/types";
import { useState } from "react";
import { calcAge, getSex } from "../../../utils";

import { Reputation } from "./Reputation";
import { receptionService } from "../../../service/ReceptionService";
import { authService } from "../../../service/AuthService";

interface ReputationProps {
  reception: ReceptionRow;
}

export const ReputationAction = ({ reception }: ReputationProps) => {
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
        View
      </Button>
      <Button
        onClick={() => {
          receptionService.completeReception(
            authService.getAuthToken(),
            reception.name,
            reception.socialNum1,
            reception.socialNum2
          );
        }}
      >
        Remove
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
        <Reputation
          reception={reception}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </Flex>
  );
};
