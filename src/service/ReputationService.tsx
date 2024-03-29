import {
  ErrorResponse,
  PersonReputation,
  ReceptionRow,
  ReputationRequest,
} from "./types";
import CryptoJS from "crypto-js";

const { VITE_API_HOST } = import.meta.env;

class ReputationService {
  host: string;
  constructor(host: string) {
    this.host = host;
  }

  async getReputation(
    authToken: string,
    reception: ReceptionRow
  ): Promise<PersonReputation> {
    const key = `${reception.name}-${reception.socialNum1}-${reception.socialNum2}`;
    const hashedKey = CryptoJS.SHA256(key).toString();
    const resp = await fetch(`${this.host}/api/reputation/${hashedKey}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!resp.ok) {
      throw new Error("No reputation");
    }
    const reputationResp = await resp.json();
    return reputationResp as PersonReputation;
  }

  async postReputation(
    authToken: string,
    reception: ReceptionRow,
    myReputation: ReputationRequest,
    options: { isSecondReputation?: boolean; isSkip?: boolean } = {}
  ): Promise<PersonReputation> {
    const { isSecondReputation, isSkip } = options;
    const key = `${reception.name}-${reception.socialNum1}-${reception.socialNum2}`;
    const hashedKey = CryptoJS.SHA256(key).toString();
    const resp = await fetch(`${this.host}/api/reputation/${hashedKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        reputation: myReputation,
        isSecondReputation,
        isSkip,
      }),
    });
    if (!resp.ok) {
      throw (await resp.json()) as ErrorResponse;
    }
    const reputationResp = await resp.json();
    return reputationResp satisfies PersonReputation;
  }
}

export const reputationService = new ReputationService(VITE_API_HOST ?? "");
