import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store.ts";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer
          toastStyle={{ backgroundColor: "#add8e6", color: "white" }}
        />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
