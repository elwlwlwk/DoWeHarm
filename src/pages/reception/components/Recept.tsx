import { Button, Form, Input } from "antd";
import { ReceptionTabBody } from "../styled";
import { useEffect, useState } from "react";
import { receptionService } from "../../../service/ReceptionService";
import { authService } from "../../../service/AuthService";

export const Recept = () => {
  const [name, setName] = useState("");
  const [socialNum1, setSocialNum1] = useState("");
  const [socialNum2, setSocialNum2] = useState("");

  useEffect(() => {
    return () => {
      setName("");
      setSocialNum1("");
      setSocialNum2("");
    };
  }, []);

  return (
    <ReceptionTabBody>
      <Form
        name="recept"
        requiredMark={false}
        onFinish={async () => {
          await receptionService.newReception(
            authService.getAuthToken(),
            name,
            socialNum1,
            socialNum2
          );
        }}
      >
        <Form.Item
          name="name"
          label="성함"
          rules={[{ required: true, message: "성함을 입력해주세요." }]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="주민번호">
          <Form.Item
            name="socialNumber1"
            style={{ display: "inline-block" }}
            rules={[
              {
                required: true,
                message: "주민등록번호 앞자리를 입력해주세요.",
              },
            ]}
          >
            <Input onChange={(e) => setSocialNum1(e.target.value)} />
          </Form.Item>
          <span>-</span>
          <Form.Item
            name="socialNumber2"
            style={{ display: "inline-block" }}
            rules={[
              {
                required: true,
                message: "주민등록번호 뒷자리를 입력해주세요.",
              },
            ]}
          >
            <Input onChange={(e) => setSocialNum2(e.target.value)} />
          </Form.Item>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            접수
          </Button>
        </Form.Item>
      </Form>
    </ReceptionTabBody>
  );
};
