import axios from "axios";
import NextAuth from "next-auth/next";
import AzureADProvider from "next-auth/providers/azure-ad";

export default NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: { params: { scope: "openid email profile User.Read" } },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //console.log(account, profile, credentials);
      let department;
      await axios
        .get("https://graph.microsoft.com/v1.0/me?$select=department", {
          headers: { Authorization: `Bearer ${account.access_token}` },
        })
        .then((response) => {
          department = response.data.department;
        })
        .catch((error) => {
          console.log("error response", error.response);
        });
      console.log("department", department);
      return true;
    },
  },
});
