import { Route, Routes } from "react-router-dom";
import Property from "./pages/PropertySearchPage";
import Application from "./pages/ApplicationPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Property" element={<Property />}></Route>
        <Route path="/Application" element={<Application />}></Route>
      </Routes>
    </div>
  );
}

export default App;
