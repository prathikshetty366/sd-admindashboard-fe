import "@/styles/globals.css";
import { ToastContainer } from "react-toastify"; // Import Toastify to show notifications globally
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import ApplicationLayout from "@/components/ApplicationLayout/ApplicationLayout"; // Assuming this is your layout
import Head from "next/head";
import { ThemeProvider } from "@/context/ThemeContext";
import { store, persistor } from "@/app/store/index"; // Import your store and persistor
import { Provider } from "react-redux"; // Import Redux Provider
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate to load persisted state
import { isAuthenticated } from "@/utils/cookies";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Viewport Meta Tag */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.75, maximum-scale=0.75, user-scalable=no"
        />
      </Head>

      {/* Wrapping the app with Provider and PersistGate */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <ApplicationLayout>
              <Component {...pageProps} />
            </ApplicationLayout>
          </ThemeProvider>

          {/* Toast container globally available for toasts */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
