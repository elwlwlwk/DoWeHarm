import { UploadFile } from "antd";
import {
  zSigninResponse,
  type AuthInfo,
  type ErrorResponse,
  zAuthInfo,
  zErrorResponse,
} from "./types";
const { VITE_API_HOST } = import.meta.env;
import CryptoJS from "crypto-js";
import { readFile } from "../utils";

class AuthService {
  host: string;
  user: string;
  isRater: boolean;
  salt = "?&np=n]V8#/;nBK?{zk+DYai1+-7&]";
  constructor(host: string) {
    this.host = host;
    this.user = "";
    this.isRater = false;
  }

  private hash(strToHash: string): string {
    return CryptoJS.SHA512(
      CryptoJS.SHA512(strToHash + this.salt) + this.salt
    ).toString();
  }

  async signin(
    id: string,
    password: string,
    receptionKey: string
  ): Promise<AuthInfo> {
    try {
      const response = await fetch(`${this.host}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password: this.hash(password),
          receptionKey: this.hash(receptionKey),
        }),
      });
      if (!response.ok) {
        const { message } = zErrorResponse.parse(await response.json());
        throw new Error(message as string);
      }

      const { token, message } = zSigninResponse.parse(await response.json());
      localStorage.setItem("authToken", token);
      localStorage.setItem("receptionKey", receptionKey);
      return { ...message };
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async signup(
    id: string,
    raterPassword: string,
    password: string,
    receptionKey: string,
    email: string,
    attachments: File[],
    memo: string
  ): Promise<undefined> {
    try {
      const attachmentData = await Promise.all(
        attachments.map(async (file) => {
          const fileData = await readFile(file);
          return {
            name: file.name,
            data: fileData,
          };
        })
      );
      const body = {
        id,
        password: this.hash(password),
        raterPassword: this.hash(raterPassword),
        receptionKey: this.hash(receptionKey),
        email,
        attachment: attachmentData,
        memo,
      };
      const response = await fetch(`${this.host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error("Signup failed");
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async isSignin(): Promise<
    { success: true; data: AuthInfo } | { success: false }
  > {
    const token = localStorage.getItem("authToken");
    if (!token) return { success: false };

    const response = await fetch(`${this.host}/api/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const authData = zAuthInfo.parse(await response.json());
      this.user = authData.id;
      this.isRater = authData.isRater;
      return { success: true, data: authData };
    } else {
      return { success: false };
    }
  }

  getAuthToken(): string {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token");
    return token;
  }

  getReceptionKey(): string {
    const receptionKey = localStorage.getItem("receptionKey");
    if (!receptionKey) throw new Error("No reception key");
    return receptionKey;
  }
}

export const authService = new AuthService(VITE_API_HOST ?? "");
