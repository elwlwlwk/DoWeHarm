import { atom } from "recoil";
import { ReceptionRow } from "../../service/types";

export const selectedReceptionState = atom<ReceptionRow | null>({
  key: "personSelected",
  default: null,
});
