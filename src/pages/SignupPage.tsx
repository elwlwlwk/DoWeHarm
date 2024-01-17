import { Button, Form, Input, Upload } from "antd";
import { MainLayout } from "./MainLayout";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { UploadFile } from "antd/es/upload";
import { authService } from "../service/AuthService";

export const SignupPage = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <MainLayout>
      <Form
        name="signup"
        labelCol={{ span: 6 }}
        style={{ minWidth: 600 }}
        onFinish={async (values: {
          userId: string;
          raterPassword: string;
          raterPasswordConfirm: string;
          receptionPassword: string;
          receptionPasswordConfirm: string;
          receptionKey: string;
          receptionKeyConfirm: string;
          email: string;
          attachment: UploadFile[];
          memo: string;
        }) => {
          authService.signup(
            values.userId,
            values.raterPassword,
            values.receptionPassword,
            values.receptionKey,
            values.email,
            fileList as unknown as File[],
            values.memo
          );
        }}
      >
        <Form.Item label="아이디" name="userId" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="평가자 비밀번호"
          tooltip="평가자용 비밀번호입니다. 해당 비밀번호로 로그인하면 평가 조회 및
            등록이 가능합니다."
          name="raterPassword"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="평가자 비밀번호 확인"
          name="raterPasswordConfirm"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("raterPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="접수자 비밀번호"
          tooltip="접수자용 비밀번호입니다. 해당 비밀번호로 로그인하면 접수만이 가능합니다."
          name="receptionPassword"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="접수자 비밀번호 확인"
          name="receptionPasswordConfirm"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("receptionPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="접수 암호화키"
          tooltip="접수 내역 암호화키 입니다. 접수 내용은 해당 키로 암호화되어 타인은 조회할 수 없습니다."
          name="receptionKey"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="접수 암호화키 확인"
          name="receptionKeyConfirm"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("receptionKey") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("비밀번호가 일치하지 않습니다.")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="이메일" name="email" required>
          <Input />
        </Form.Item>

        <Form.Item
          label="첨부"
          name="attachment"
          required
          rules={[
            {
              validator: (_, { fileList }: { fileList: File[] }) => {
                if (fileList.length > 5)
                  Promise.reject(new Error("최대 5개까지 첨부할 수 있습니다."));

                if (
                  fileList.reduce(
                    (prev, curr) => prev && curr.size <= 1024 * 1024,
                    true
                  ) === false
                )
                  Promise.reject("파일 크기는 1MB 이하여야 합니다.");

                Promise.resolve();
              },
            },
          ]}
        >
          <Upload
            fileList={fileList}
            beforeUpload={(file: UploadFile) => {
              setFileList((prev) => [...prev, file]);
            }}
            onRemove={(file: UploadFile) => {
              setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
            }}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="메모" name="memo">
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};
