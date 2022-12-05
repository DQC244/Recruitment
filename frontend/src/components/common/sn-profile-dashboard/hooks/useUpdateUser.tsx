import { ApiConstant } from "const";
import { AccountService } from "services";

const useUpdateUser = () => {
  const handleUpdateUser = async (data: AccountService.UpdateUSerProps) => {
    try {
      const response: any = await AccountService.handleUpdateUser(data);
      if (response.status === ApiConstant.STT_OK) {
        return { isSuccess: true, message: "" };
      } else {
        return { isSuccess: false, message: response.data.message };
      }
    } catch (error: any) {
      return { isSuccess: false, message: error.message };
    }
  };
  return handleUpdateUser;
};

export default useUpdateUser;
