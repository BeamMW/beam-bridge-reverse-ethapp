import React, { useEffect } from "react";

import { actions as sharedActions, selectors as sharedSelectors } from "@app/shared/store";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate, useRoutes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import "./styles";
import { ROUTES_PATH } from "@app/shared/constants";
import {
  MainPage,
  Receive,
  Send,
  Connect
} from "@app/containers/Main/containers";

const routes = (isConnected: boolean) => [
  {
    path: ROUTES_PATH.MAIN.BASE,
    element: !isConnected ? <Connect/> : <MainPage />,
  },
  {
    path: ROUTES_PATH.MAIN.SEND_BY_ADDRESS,
    element: !isConnected ? <Connect/> : <Send />,
  },
  {
    path: ROUTES_PATH.MAIN.RECEIVE,
    element: !isConnected ? <Connect/> : <Receive />,
  },
  {
    path: ROUTES_PATH.MAIN.SEND,
    element: !isConnected ? <Connect/> : <Send />,
  },
  {
    path: ROUTES_PATH.MAIN.CONNECT,
    element: !isConnected ? <Connect /> : <Navigate to={ROUTES_PATH.MAIN.BASE} />,
  }
];

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateURL = useSelector(sharedSelectors.selectRouterLink());

  const { isConnected } = useAccount();
  const content = useRoutes(routes(isConnected));

  useEffect(() => {
    dispatch(sharedActions.setIsAppConnected(isConnected));
  }, [isConnected]);

  useEffect(() => {
    if (navigateURL) {
      navigate(navigateURL);
      dispatch(sharedActions.navigate(""));
    }
  }, [navigateURL, dispatch, navigate]);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          color: "white",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      {content}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        toastStyle={{
          textAlign: "center",
          background: "#22536C",
          color: "white",
          width: "90%",
          margin: "0 auto 36px",
          borderRadius: "10px",
        }}
      />
    </ChakraProvider>
  );
};

export default App;
