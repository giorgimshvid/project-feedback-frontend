import { RouterProvider } from "react-router-dom";
import "./App.css";
import { appRouter } from "./routes/AppRoutes";
import useAuthInit from "./hooks/useAuthInit";

function App() {
  useAuthInit();

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
