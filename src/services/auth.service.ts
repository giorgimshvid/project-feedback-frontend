import axios from "axios";

export const authService = {
  logout: async () => {
    // ბექენდის logout ენდფოინთი ქუქის გასასუფთავებლად
    const response = await axios.post(
      "/api/auth/logout",
      {},
      { withCredentials: true },
    );
    return response.data;
  },
};
