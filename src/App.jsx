import React from "react";
import Main from "./pages/Main";
import Info from "./pages/Info";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
const App = () => {
  const { props } = useSelector((state) => state.propsReducer);
  const i = props?.id;
  console.log(props);
  return (
    <Routes>
      <Route path="/*" element={<Main />}></Route>
      <Route path={`/info/${i}`} element={<Info />}></Route>
    </Routes>
  );
};

export default App;
