import { ReactNode } from "react";

export interface registrationPayloadParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}
