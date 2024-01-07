import { useRecoilState, useRecoilValue } from "recoil";
import { authInfoState } from "../recoil/auth/atoms";
import { ReceptionPage } from "./reception/ReceptionPage";
import { useInterval } from "usehooks-ts";
import { receptionService } from "../service/ReceptionService";
import { authService } from "../service/AuthService";
import { receptionBookState } from "../recoil/reception/atoms";
import { WorkPage } from "./work/WorkPage";

export const HomePage = () => {
  const [, setReceptionBook] = useRecoilState(receptionBookState);
  useInterval(async () => {
    const receptionBook = await receptionService.syncReceptionBook(
      authService.getAuthToken()
    );
    setReceptionBook(receptionBook);
  }, 1000);

  return <ReceptionPage />;
};
