import { UserRole } from "../../../src/model/User";

export class AuthenticatorMock {
  
  public generateToken = jest
    .fn((input: AuthenticationData): string => {
      return "token";
    })

  public getData = jest
    .fn((token: string): AuthenticationData => {

      return {
        id: "1",
        role: "ADMIN"
      }

    })
}

export interface AuthenticationData {
  id: string;
  role?: string;
}