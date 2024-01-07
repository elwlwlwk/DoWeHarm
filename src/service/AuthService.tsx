import { AuthInfo, ErrorResponse, SigninResponse } from "./types";
const { VITE_API_HOST } = import.meta.env;
import CryptoJS from "crypto-js";

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
      if (response.status !== 200) {
        const { message } = (await response.json()) as ErrorResponse;
        throw new Error(message as string);
      }

      const { token, message } = (await response.json()) as SigninResponse;
      localStorage.setItem("authToken", token);
      return { ...message };
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async signup(
    id: string,
    password: string,
    raterPassword: string,
    receptionKey: string
  ): Promise<undefined> {
    try {
      const response = await fetch(`${this.host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password: this.hash(password),
          raterPassword: this.hash(raterPassword),
          receptionKey: this.hash(receptionKey),
          email: "",
        }),
      });
      if (response.status !== 200) {
        throw new Error("Signup failed");
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async isSignin(): Promise<{ success: boolean; data: AuthInfo }> {
    const token = localStorage.getItem("authToken");
    if (!token) return { success: false, data: {} as AuthInfo };

    const response = await fetch(`${this.host}/api/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const authData = (await response.json()) as AuthInfo;
      this.user = authData.id;
      this.isRater = authData.isRater;
      return { success: true, data: authData };
    } else {
      return { success: false, data: {} as AuthInfo };
    }
  }

  getAuthToken(): string {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No token");
    return token;
  }
}

export const authService = new AuthService(VITE_API_HOST ?? "");
