import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./components/App/App";
// import { Toaster } from "react-hot-toast";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <Toaster />
//     </QueryClientProvider>
//   </React.StrictMode>
// );
