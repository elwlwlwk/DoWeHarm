import { Button } from "antd";
import { useRecoilState } from "recoil";
import {
  checkSigninState,
  authInfoState,
  isSigninState,
} from "./recoil/auth/atoms";

export const Navbar = () => {
  const [, setCheckSignin] = useRecoilState(checkSigninState);
  const [, setAuthInfoState] = useRecoilState(authInfoState);
  const [, setIsSignin] = useRecoilState(isSigninState);
  return (
    <div>
      <Button
        onClick={() => {
          localStorage.removeItem("authToken");
          setIsSignin(false);
          setAuthInfoState({ isRater: false });
          setCheckSignin(true);
        }}
      >
        Signout
      </Button>
    </div>
  );
};