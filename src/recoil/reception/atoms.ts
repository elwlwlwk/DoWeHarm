import { atom } from "recoil";
import { ReceptionBook } from "../../service/types";

export const receptionBookState = atom<ReceptionBook>({
  key: "receptionBook",
  default: {
    waitings: [],
    completed: [],
  },
});
