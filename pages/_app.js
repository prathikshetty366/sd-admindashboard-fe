import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/app/store/index";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import '../styles/global.scss'

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Garage Dashboard</title>
          <meta name="description" content="Garage Dashboard" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon/favicon.ico" />
        </Head>
        {/* <Navbar />
        <Sidebar /> */}
        <Component {...pageProps} />
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
  );
}

export default MyApp;
