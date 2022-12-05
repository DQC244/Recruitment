import { ApiConstant } from "const";
import { AccountService } from "services";

const useChangePassword = () => {
  const handleChangePassword = async (
    data: AccountService.ChangePasswordProps
  ) => {
    try {
      const response: any = await AccountService.changePassword(data);
      if (response.status === ApiConstant.STT_OK) {
        return { isSuccess: true, message: "" };
      } else {
        return { isSuccess: false, message: response.data.message };
      }
    } catch (error) {
      return { isSuccess: false, message: "Something went wrong!" };
    }
  };
  return handleChangePassword;
};

export default useChangePassword;
