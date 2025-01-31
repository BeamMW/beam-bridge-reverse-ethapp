import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Window, ConnectButtonWithModal } from "@app/shared/components";
import { IconMetamask } from "@app/shared/icons";
import { ROUTES } from "@app/shared/constants";
import { Text, VStack } from "@chakra-ui/react";


import { selectPopupsState } from "../../store/selectors";
import { setIsLocked } from "../../store/actions";

const Connect: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const popupsState = useSelector(selectPopupsState());

  // const connectToMetamask = () => {
  //   if (window.ethereum) {
  //       if (localStorage.getItem("locked")) {
  //         localStorage.removeItem("locked");
  //         dispatch(setIsLocked(false));
  //         navigate(ROUTES.MAIN.BASE);
  //       }
  //       window.ethereum
  //           .request({ method: "eth_requestAccounts" })
  //           .then(() => console.log("success!"))
  //   } else {
  //       localStorage.setItem("wasReloaded", "1");
  //       window.location.reload();
  //   }
  // }

  return (
    <Window state="content">
      <VStack height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={"56px"} fontWeight={"900"} textAlign={"center"}>
          WBEAM (Ethereum) ={">"} BEAM Bridge
        </Text>
        <Text textAlign={"center"} fontSize={"24px"} fontWeight={"bold"} mt={"30px"}>
          Transfer ETH and BEAM.<br/>
          More tokens coming soon!
        </Text>
        <ConnectButtonWithModal></ConnectButtonWithModal>
      </VStack>
    </Window>
  );
};

export default Connect;
