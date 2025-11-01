"use client";
import React, { createContext, useContext, useState } from "react";
import { Approved_property } from "../lib/upload-properties";

export const Edit_listing_Context = createContext<{
  edit_list: Approved_property;
  approved: boolean;
  setEdit_list?: React.Dispatch<React.SetStateAction<{}>>;
  setEdit_list_approved?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});
const Edit_listing_Provider = ({ children }: any) => {
  const [edit_list, setEdit_list] = useState<Approved_property>({});
  const [approved, setEdit_list_approved] = useState<boolean>(false);

  return (
    <Edit_listing_Context.Provider
      value={{ edit_list, setEdit_list, approved, setEdit_list_approved }}
    >
      {children}
    </Edit_listing_Context.Provider>
  );
};
export default Edit_listing_Provider;
