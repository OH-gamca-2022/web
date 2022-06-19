import axios from "axios";
import NextAuth from "next-auth/next";
import AzureADProvider from "next-auth/providers/azure-ad";
import { getDataSource } from "../../../../lib/TypeORM";
import { User } from "../../../entities/User";

const dataSource = getDataSource();

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
      if (user.email && user.name) {
        const existingUser = await dataSource.getRepository(User).findOne({
          where: { email: user.email },
        });
        console.log(existingUser);
        if (!existingUser) {
          console.log("not existing user", account);
          const departmentResponse = await axios
            .get("https://graph.microsoft.com/v1.0/me?$select=department", {
              headers: { Authorization: `Bearer ${account.access_token}` },
            })
            .catch((error) => {
              console.log("error response", error.response);
            });
          if (departmentResponse?.data) {
            console.log("department", departmentResponse.data.department);
            dataSource
              .createQueryBuilder()
              .insert()
              .into(User)
              .values({
                email: user.email,
                name: user.name,
                class: departmentResponse.data.department,
              })
              .execute();
          }
        }
      }

      return true;
    },
  },
});
