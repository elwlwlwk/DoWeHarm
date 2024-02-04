import { useEffect } from "react";
import "./App.css";
import { router } from "./router";
import { RouterProvider } from "react-router";
import { authService } from "./service/AuthService";
import { useRecoilState } from "recoil";
import {
  authInfoState,
  checkSigninState,
  isSigninState,
} from "./recoil/auth/atoms";
import { message } from "antd";
import React from "react";

export const NotiContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  notify: (_: string | React.ReactElement) => {},
});

function App() {
  const [api, contextHolder] = message.useMessage();

  const notify = (message: string | React.ReactElement) => {
    api.open({
      content: message,
      className: "doweharm_message",
    });
  };

  const [checkSignin, setCheckSignin] = useRecoilState(checkSigninState);
  const [isSignin, setIsSignin] = useRecoilState(isSigninState);
  const [, setAuthInfoState] = useRecoilState(authInfoState);
  useEffect(() => {
    const checkSignin = async () => {
      const isSignin = await authService.isSignin();
      if (isSignin.success) {
        setIsSignin(true);
        setAuthInfoState({
          id: isSignin.data.id,
          isRater: isSignin.data?.isRater ?? false,
        });
      }
      setCheckSignin(false);
    };
    checkSignin();
  }, [checkSignin, setCheckSignin, setIsSignin]);

  if (!checkSignin && !isSignin) {
    router.navigate("/signin");
  }

  return (
    <>
      {contextHolder}
      <NotiContext.Provider value={{ notify }}>
        {checkSignin ? <div>Loading</div> : <RouterProvider router={router} />}
      </NotiContext.Provider>
    </>
  );
}

export default App;
