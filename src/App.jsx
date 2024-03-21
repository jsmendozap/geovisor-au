import "@carbon/charts-react/styles.css";
import Header from "./components/Header";
import LeafletMap from "./components/LeafletMap";
import Sidebar from "./components/Sidebar";
import GoogleFontLoader from "react-google-font-loader";
import React, { useState } from "react";

export const DataContext = React.createContext();

function App() {
  const [data, setData] = useState(null);

  return (
    <div>
      <GoogleFontLoader
        fonts={[
          {
            font: "Bree Serif",
            weights: [400, 700],
          },
          {
            font: "Inclusive Sans",
            weights: [400],
          },
          {
            font: "Mukta",
            weights: [200],
          },
          {
            font: "Oleo Script",
            weights: [400],
          },
        ]}
      />
      <Header />
      <DataContext.Provider value={[data, setData]}>
        <div
          className="grid grid-cols-[28%_72%]"
          style={{ height: "calc(100vh - 45px)" }}
        >
          <Sidebar />
          <LeafletMap />
        </div>
      </DataContext.Provider>
    </div>
  );
}

export default App;
