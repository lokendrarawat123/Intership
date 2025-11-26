import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App } from "./App.jsx";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
