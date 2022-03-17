import { useEffect } from "react";
function useShowErrorInConsole(...error: any): void {
  console.log(error);

  useEffect(() => {
    error.forEach((err: any) => {
      // eslint-disable-next-line no-console
      if (err) console.log(err);
    });
  }, [error]);
}

export default useShowErrorInConsole;
