import { Button, Form, Input } from "antd";
import { MainLayout } from "./MainLayout";
import { authService } from "../service/AuthService";
import { useRecoilState } from "recoil";
import { authInfoState, checkSigninState } from "../recoil/auth/atoms";
import { useContext, useState } from "react";
import { NotiContext } from "../App";
import { ErrorMessage } from "../styles";
import { isErrorResponse } from "../service/types";
import { Link } from "react-router-dom";

export const SigninPage = () => {
  const { notify } = useContext(NotiContext);

  const [, setCheckSignin] = useRecoilState(checkSigninState);
  const [, setAuthInfoState] = useRecoilState(authInfoState);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [receptionKey, setReceptionKey] = useState("");
  return (
    <MainLayout>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={async () => {
          try {
            const authInfo = await authService.signin(
              id,
              password,
              receptionKey
            );
            setAuthInfoState(authInfo);
            setCheckSignin(true);
          } catch (e) {
            if (isErrorResponse(e)) {
              notify(<ErrorMessage>{e.message}</ErrorMessage>);
            }
            console.error(e);
          }
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Reception Key"
          name="receptionKey"
          rules={[
            { required: true, message: "Please input your reception key!" },
          ]}
        >
          <Input.Password
            onChange={(e) => {
              setReceptionKey(e.target.value);
            }}
          />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          // wrapperCol={{ offset: 8, span: 16 }}
          style={{ display: "inline-block" }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Link to={"/signup"}>Signup</Link>
    </MainLayout>
  );
};
