import { EnvConstant } from "const";
import { AppService } from "services";

const useCheckout = () => {
  const handleCheckout = async (
    token: any,
    total: number,
    packageId: string,
    onSuccess: (data: any) => void
  ) => {
    try {
      const res = await AppService.postCheckout(token, total, packageId);

      onSuccess(res.data);
    } catch (error) {
      EnvConstant.IS_DEV && console.log(error);
    }
  };
  return handleCheckout;
};

export default useCheckout;
