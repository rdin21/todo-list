import { useLayoutEffect, useState } from "react";

interface IUseLengthTimeLineReturn {
  length: string;
  setLength: (theme: string) => void;
}

const defaultLength = "all";

export const useLengthTimeLine = (): IUseLengthTimeLineReturn => {
  const [length, setLength] = useState<string>(
    localStorage.getItem("length_line") || defaultLength
  );

  useLayoutEffect(() => {
    localStorage.setItem("length_line", length);
  }, [length]);

  return { length, setLength };
};
