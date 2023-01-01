/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ApiConstant, AppConstant, PathConstant } from "const";
import Cookie from "js-cookie";
import { AccountService } from "services";
import { useRouter } from "next/router";
import { AccountClass } from "models";

/* ------------- Initial State ------------- */
const INITIAL_STATE = {} as AuthContextProps;

const AuthContext = createContext(INITIAL_STATE);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: ProviderProps) => {
  const hasToken = Boolean(Cookie.get(AppConstant.KEY_TOKEN));
  const [accountInfo, setAccountInfo] = useState<AccountClass>(
    {} as AccountClass
  );

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const hasAccount = useMemo(
    () => hasToken && Boolean(Object.values(accountInfo).length),
    [accountInfo, hasToken]
  );

  const handleLogout = () => {
    Cookie.remove(AppConstant.KEY_TOKEN);
    router.push(PathConstant.ROOT);
  };

  const handleLogin = async (
    data: DataProps,
    getError?: (msg: string) => void
  ) => {
    try {
      const response: any = await AccountService.login(data);
      if (response.status === ApiConstant.STT_OK) {
        const responseData = response.data;

        Cookie.set(AppConstant.KEY_TOKEN, responseData.token);

        setAccountInfo({
          ...responseData,
        });
        setIsOpen(false)
      } else {
        if (getError instanceof Function) {
          getError(response.data.message);
        }
      }
    } catch (error: any) {
      if (getError instanceof Function) {
        getError(error.message);
      }
    }
  };

  const getSelf = async () => {
    try {
      const response: any = await AccountService.getSelfAccount();
      if (response.status === ApiConstant.STT_OK) {
        const responseData = response.data;

        setAccountInfo({
          ...responseData,
        });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (hasToken) {
      getSelf();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        accountInfo,
        hasAccount,
        getSelf,
        setIsOpen,
        isOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

type DataProps = {
  email: string;
  password: string;
};

type AuthContextProps = {
  handleLogin: (data: DataProps, getError?: (msg: string) => void) => void;
  handleLogout: () => void;
  accountInfo: AccountClass;
  hasAccount: boolean;
  getSelf: () => void;
  setIsOpen: (value: any) => void;
  isOpen: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};
