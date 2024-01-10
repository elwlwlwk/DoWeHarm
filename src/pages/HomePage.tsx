import { useRecoilState } from "recoil";
import { ReceptionPage } from "./reception/ReceptionPage";
import { useInterval } from "usehooks-ts";
import { receptionService } from "../service/ReceptionService";
import { authService } from "../service/AuthService";
import { receptionBookState } from "../recoil/reception/atoms";

export const HomePage = () => {
  const [, setReceptionBook] = useRecoilState(receptionBookState);
  useInterval(async () => {
    const receptionBook = await receptionService.syncReceptionBook(
      authService.getAuthToken(),
      authService.getReceptionKey()
    );
    setReceptionBook(receptionBook);
  }, 1000);

  return <ReceptionPage />;
};
