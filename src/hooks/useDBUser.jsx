import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

const useDbUser = () => {
  return useContext(UserContext);
};

export default useDbUser;
