import { ROLES, ROLE_LEVELS } from "../types/roles";

export const hasPermission = (permission: ROLES, required: ROLES) => {
  return ROLE_LEVELS[permission] >= ROLE_LEVELS[required];
};
