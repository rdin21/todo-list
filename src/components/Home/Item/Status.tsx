import React from "react";
import s from "../Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Status({ status }: { status: null | boolean }): JSX.Element {
  return (
    <>
      <div
        className={s.ready}
        style={{ visibility: status === null ? "hidden" : status ? "inherit" : "hidden" }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </div>
      <div
        className={s.not_ready}
        style={{ visibility: status === null ? "hidden" : status ? "hidden" : "inherit" }}
      >
        &times;
      </div>
    </>
  );
}
