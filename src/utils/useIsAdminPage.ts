import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ROLES, ROLE_LEVELS } from "../types/roles";
import { hasPermission } from "./hasPermission";

export const useIsAdminPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/404");
    }
    if (session && !hasPermission(session.user.role as ROLES, ROLES.EDITOR)) {
      router.push("/404");
    }
  }, []);
};
