"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { fetchInitialUser } from "./user/userThunks";
import { useEffect } from "react";
import { fetchRate } from "./rateSlice";
// A component to dispatch the initial user fetch

const FetchUserAndRate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialUser());
    dispatch(fetchRate());
  }, [dispatch]);

  return null;
};

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <FetchUserAndRate />
      {children}
    </Provider>
  );
};

export default Providers;
