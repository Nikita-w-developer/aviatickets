import React from "react";
import Main from "./pages/Main";
import { useGetFlightOffersQuery } from "./redux/Slices/apiSlice";

const App = () => {
  const { data } = useGetFlightOffersQuery({
    originLocationCode: "LAX",
    destinationLocationCode: "NYC",
    departureDate: "2025-01-15",
    adults: 1,
  });
  console.log(data);
  return (
    <div>
      <Main />
    </div>
  );
};

export default App;
