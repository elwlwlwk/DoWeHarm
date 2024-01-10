import {
  ReceptionBook,
  ReceptionLog,
  ReceptionLogResponse,
  ReceptionRow,
} from "./types";
import CryptoJS from "crypto-js";

const { VITE_API_HOST } = import.meta.env;

class ReceptionService {
  host: string;
  receptionLogs: ReceptionLog[] = [];
  reception: ReceptionBook;
  constructor(host: string) {
    this.host = host;
    this.reception = {
      waitings: [],
      completed: [],
    };
  }

  async newReception(
    authToken: string,
    receptionKey: string,
    name: string,
    socialNum1: string,
    socialNum2: string
  ) {
    await this.postReceptionLog(authToken, receptionKey, {
      action: "recept",
      name,
      socialNum1,
      socialNum2,
      regDateTime: new Date().toISOString(),
    } satisfies ReceptionLog);
    await this.syncReceptionBook(authToken, receptionKey);
  }

  async completeReception(
    authToken: string,
    receptionKey: string,
    name: string,
    socialNum1: string,
    socialNum2: string
  ) {
    await this.postReceptionLog(authToken, receptionKey, {
      action: "complete",
      name,
      socialNum1,
      socialNum2,
      regDateTime: new Date().toISOString(),
    } satisfies ReceptionLog);
    await this.syncReceptionBook(authToken, receptionKey);
  }

  async postReceptionLog(
    authToken: string,
    receptionKey: string,
    receptionLog: ReceptionLog
  ): Promise<void> {
    try {
      await fetch(`${this.host}/api/reception`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          data: CryptoJS.AES.encrypt(
            JSON.stringify(receptionLog),
            receptionKey
          ).toString(),
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async fetchReceptionLogs(
    authToken: string,
    receptionKey: string
  ): Promise<ReceptionLog[]> {
    try {
      const response = await fetch(`${this.host}/api/reception`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const receptionLogs = (await response.json()) as ReceptionLogResponse[];

      // if (receptionLogs.length === this.receptionLogs.length)
      //   return this.receptionLogs;

      this.receptionLogs = receptionLogs.map((receptionLog) => {
        try {
          const data = JSON.parse(
            CryptoJS.AES.decrypt(receptionLog.data, receptionKey).toString(
              CryptoJS.enc.Utf8
            )
          ) as ReceptionLog;
          return { ...data };
        } catch (e) {
          console.error(e);
          return {
            action: "invalid",
            name: "",
            socialNum1: "",
            socialNum2: "",
            regDateTime: "",
          };
        }
      }) satisfies ReceptionLog[];
      return this.receptionLogs;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async syncReceptionBook(
    authToken: string,
    receptionKey: string
  ): Promise<ReceptionBook> {
    //fetch and rebuild reception data from reception logs
    const receptionLogs = await this.fetchReceptionLogs(
      authToken,
      receptionKey
    );
    const reception: ReceptionBook = {
      waitings: [],
      completed: [],
    };

    receptionLogs.forEach((receptionLog) => {
      if (receptionLog.action === "recept") {
        reception.waitings.push(receptionLog);
      } else if (receptionLog.action === "complete") {
        reception.waitings = reception.waitings.filter(
          (waiting) => !this.isSameRecption(waiting, receptionLog)
        );
        reception.completed.push(receptionLog);
      } else if (receptionLog.action === "cancel") {
        reception.waitings = reception.waitings.filter(
          (waiting) => !this.isSameRecption(waiting, receptionLog)
        );
      }
    });

    this.reception = reception;

    return reception;
  }

  isSameRecption(
    a: Omit<ReceptionRow, "regDateTime">,
    b: Omit<ReceptionRow, "regDateTime">
  ): boolean {
    return (
      a.name === b.name &&
      a.socialNum1 === b.socialNum1 &&
      a.socialNum2 === b.socialNum2
    );
  }
}

export const receptionService = new ReceptionService(VITE_API_HOST ?? "");
