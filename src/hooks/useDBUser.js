import { useQuery } from "@tanstack/react-query";
import axiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useDbUser = () => {
  const { user } = useAuth();

  const {
    data: dbUser,
    isLoading: dbLoading,
    refetch: refetchUser,
  } = useQuery(
    ["dbUser", user?.email],
    async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/users?email=${user.email}`);
      return res.data[0]; // should return the first user matching the email
    },
    {
      enabled: !!user?.email,
    }
  );

  return { dbUser, dbLoading, refetchUser };
};

export default useDbUser;
