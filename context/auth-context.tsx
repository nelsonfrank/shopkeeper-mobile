import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AuthProviderProps,
  registrationPayloadParams,
} from "@/types/auth-context.types";
import axios from "axios";
import { ACCESS_TOKEN_KEY, BASE_URL, REFRESH_TOKEN_KEY } from "@/constants/Api";
import SecureStore from "expo-secure-store";

export interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (registrationPayload: registrationPayloadParams) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export interface AuthResponseType {
  access_token: string;
  refresh_token: string;
}
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    refreshToken: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    refreshToken: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const { accessToken, refreshToken } = await retriveAccessToken();

      if (accessToken && refreshToken) {
        setAccessToken({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    };

    loadToken();
  }, []);

  const storeAccessToken = async (data: AuthResponseType) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.access_token);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refresh_token);
  };

  const retriveAccessToken = async () => {
    try {
      const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return { error: true, msg: error };
    }
  };

  const setAccessToken = async (data: AuthResponseType) => {
    setAuthState({
      token: data.access_token,
      refreshToken: data.refresh_token,
      authenticated: true,
    });

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.access_token}`;
  };

  const onRegister = async (signupPayload: registrationPayloadParams) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/signup`,
        signupPayload
      );
      const { access_token, refresh_token, ...remains } = data;
      await setAccessToken({ access_token, refresh_token });
      await storeAccessToken({ access_token, refresh_token });

      return { data: remains, message: "Account registered successfully!" };
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const onLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      await setAccessToken(data);
      await storeAccessToken(data);
    } catch (error) {
      return { error: true, msg: error };
    }
  };

  const onLogout = async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister,
    onLogin,
    onLogout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
