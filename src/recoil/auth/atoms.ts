import { atom } from "recoil";
import { AuthInfo } from "../../service/types";

export const checkSigninState = atom({
  key: "checkSignin",
  default: true,
});

export const isSigninState = atom({
  key: "isSignin",
  default: false,
});

export const authInfoState = atom<AuthInfo>({
  key: "auth",
  default: {
    id: "",
    isRater: false,
  },
});
