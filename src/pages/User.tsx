import React from "react";
import { useAppSelector } from "../hooks/redux";
import { IUserState } from "../types/TypeState";
import { TUserFromAccessToken } from "../types/TypeUser";
import { selectUser } from "../store/selectors";
import Header from "../components/Header/Header";

function User(): JSX.Element {
  const { data } = useAppSelector<IUserState>(selectUser);
  const user = data as TUserFromAccessToken;
  console.log(user);

  return (
    <div className="container">
      <Header />
      <h1>{user.id}</h1>
      <h1>{user.name}</h1>
      <h1>{user.lastname}</h1>
      <h1>{user.email}</h1>
    </div>
  );
}

export default User;
