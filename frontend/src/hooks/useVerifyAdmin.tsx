import { ApiConstant } from "const";
import { AccountService } from "services";

const useVerifyAdmin = () => {
  const handleVerifyService = async () => {
    try {
      const res = await AccountService.verifyAdmin();
      if (res.status === ApiConstant.STT_OK) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  return handleVerifyService;
};

export default useVerifyAdmin;
