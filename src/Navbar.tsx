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
  const [isSignin, setIsSignin] = useRecoilState(isSigninState);
  return (
    isSignin && (
      <div>
        <Button
          onClick={() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("receptionKey");
            setIsSignin(false);
            setAuthInfoState({ id: "", isRater: false });
            setCheckSignin(true);
          }}
        >
          Signout
        </Button>
      </div>
    )
  );
};
