import { ApiConstant } from "const";
import { useAuthContext } from "context";
import { AccountService } from "services";

const useUpdateUser = () => {
  const { getSelf } = useAuthContext();

  const handleUpdateUser = async (data: AccountService.UpdateUSerProps) => {
    try {
      const response: any = await AccountService.handleUpdateUser(data);
      if (response.status === ApiConstant.STT_OK) {
        getSelf();

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
