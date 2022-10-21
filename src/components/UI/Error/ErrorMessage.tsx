import React from "react";
import s from "./Error.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ErrorMessage({ errorObject }: { errorObject: any }): JSX.Element | null {
  if (errorObject) {
    if ("message" in errorObject.data) {
      // eslint-disable-next-line no-console
      console.error(errorObject);
      return <div className={s.error_message}>{errorObject.data.message}</div>;
    }
  }
  return null;
}

export default ErrorMessage;
