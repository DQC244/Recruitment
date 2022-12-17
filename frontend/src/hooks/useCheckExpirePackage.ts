import { ApiConstant } from "const";
import { AppService } from "services";

const useCheckExpirePackage = () => {
  const handleCheckExpirePackage = async () => {
    try {
      const res = await AppService.checkExpirePackage();
      if (res.status === ApiConstant.STT_OK) {
        return res.data;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return handleCheckExpirePackage;
};

export default useCheckExpirePackage;
