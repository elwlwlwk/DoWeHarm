import { selector } from "recoil";
import { receptionBookState } from "./atoms";

export const waitingListState = selector({
  key: "waitingList",
  get: ({ get }) => {
    const receptionBook = get(receptionBookState);
    return receptionBook.waitings;
  },
});

export const completedListState = selector({
  key: "completedList",
  get: ({ get }) => {
    const receptionBook = get(receptionBookState);
    return receptionBook.completed;
  },
});
