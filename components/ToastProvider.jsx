"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => (
  <Toaster
    position="top-center"
    containerStyle={{
      zIndex: 999999,
    }}
    toastOptions={{
      duration: 2000,
      style: {
        background: "#dcfce7",
        color: "#166534",
        fontWeight: 600,
      },
      success: {
        iconTheme: {
          primary: "#16a34a",
          secondary: "#dcfce7",
        },
      },
    }}
  />
);

export default ToastProvider;
