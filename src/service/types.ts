import { z } from "zod";

export const zErrorResponse = z.object({
  message: z.string(),
});

export type ErrorResponse = z.infer<typeof zErrorResponse>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorResponse(obj: any): obj is ErrorResponse {
  return obj.message !== undefined;
}

export const zAuthInfo = z.object({
  id: z.string(),
  isRater: z.boolean(),
});

export type AuthInfo = z.infer<typeof zAuthInfo>;

export const zSigninResponse = z.object({
  token: z.string(),
  message: zAuthInfo,
});

export type SigninResponse = z.infer<typeof zSigninResponse>;

export interface ReceptionResponse {
  encryptedReception: string;
}

export interface ReceptionBook {
  waitings: ReceptionRow[];
  completed: ReceptionRow[];
}

export interface ReceptionRow {
  name: string;
  socialNum1: string;
  socialNum2: string;
  regDateTime: string;
}

export interface MaskedReceptionRow extends Omit<ReceptionRow, "socialNum2"> {
  socialNum2?: string;
}

export interface ReceptionLogResponse {
  data: string;
  logDttm: string;
}

export interface ReceptionLog extends ReceptionRow {
  action: "recept" | "complete" | "cancel" | "invalid";
}

export interface ReputationRow {
  rater: string;
  character: number;
  revisit: number;
  comment?: string;
}

export interface PersonReputation {
  reputationLog: ReputationRow[];
}

export interface ReputationRequest extends ReputationRow {}
