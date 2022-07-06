import { getSession } from "next-auth/react";
import { ROLES } from "../types/roles";

export const adminPageCheck = async () => {
  const session = await getSession();
  if (session?.user.role == ROLES.EDITOR || session?.user.role == ROLES.ADMIN) {
    return {};
  } else {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
