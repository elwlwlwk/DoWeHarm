import { useRecoilState } from "recoil";
import { ReceptionPage } from "./reception/ReceptionPage";
import { useInterval } from "usehooks-ts";
import { receptionService } from "../service/ReceptionService";
import { authService } from "../service/AuthService";
import { receptionBookState } from "../recoil/reception/atoms";

export const HomePage = () => {
  const [receptionBook, setReceptionBook] = useRecoilState(receptionBookState);
  useInterval(async () => {
    const newReceptionBook = await receptionService.syncReceptionBook(
      authService.getAuthToken(),
      authService.getReceptionKey()
    );
    if (JSON.stringify(receptionBook) === JSON.stringify(newReceptionBook))
      return;
    setReceptionBook(newReceptionBook);
  }, 1000);

  return <ReceptionPage />;
};
