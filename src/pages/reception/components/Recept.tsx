import { Button, Form, Input } from "antd";
import { ReceptionTabBody } from "../styled";
import { useEffect } from "react";
import { receptionService } from "../../../service/ReceptionService";
import { authService } from "../../../service/AuthService";

export const Recept = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, []);

  return (
    <ReceptionTabBody>
      <Form
        form={form}
        name="recept"
        requiredMark={false}
        onFinish={async (params: {
          name: string;
          socialNum1: string;
          socialNum2: string;
        }) => {
          try {
            const { name, socialNum1, socialNum2 } = params;
            await receptionService.newReception(
              authService.getAuthToken(),
              authService.getReceptionKey(),
              name,
              socialNum1,
              socialNum2
            );
            form.resetFields();
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <Form.Item
          name="name"
          label="성함"
          rules={[{ required: true, message: "성함을 입력해주세요." }]}
        >
          <Input />
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
            <Input />
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
            <Input />
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
