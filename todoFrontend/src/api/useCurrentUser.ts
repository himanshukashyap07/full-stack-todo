import { useQuery } from "@tanstack/react-query";
import {api} from "./axiosInstance";

export type CurrentUser = {
  id: string;
  username: string;
  email: string;
};
const Header = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
}

const fetchCurrentUser = async (): Promise<CurrentUser> => {
  const { data } = await api.get("/user/current-user",Header);
  return data.data;
  
};

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });
}