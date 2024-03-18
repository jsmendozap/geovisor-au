import "@carbon/charts-react/styles.css";
import Header from "./components/Header";
import LeafletMap from "./components/LeafletMap";
import Sidebar from "./components/Sidebar";
import GoogleFontLoader from "react-google-font-loader";

function App() {
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
      <div
        className="grid grid-cols-[28%_72%]"
        style={{ height: "calc(100vh - 45px)" }}
      >
        <Sidebar />
        <LeafletMap />
      </div>
    </div>
  );
}

export default App;
