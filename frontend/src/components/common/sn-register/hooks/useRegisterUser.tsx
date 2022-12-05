import { ApiConstant } from "const";
import { AccountService } from "services";

const useRegisterUser = () => {
  const handleRegister = async (data: AccountService.registerUserProps) => {
    try {
      const response: any = await AccountService.registerUser(data);

      if (response.status === ApiConstant.STT_OK) {
        return { isSuccess: true, message: "" };
      } else return { isSuccess: false, message: response.data.message };
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  };

  return handleRegister;
};

export default useRegisterUser;
