import { Box, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import { Layout } from "../../components/Layout";
import {
  useChangeRoleOfUserMutation,
  useGetAllUsersQuery,
  UserFragment,
} from "../../generated/graphql";
import { useIsAdminPage } from "../../utils/useIsAdminPage";

const AdminUsers: NextPage = () => {
  useIsAdminPage();
  const [{ data }] = useGetAllUsersQuery();
  const [{ fetching: changeRoleFetching }, changeRoleOfUser] =
    useChangeRoleOfUserMutation();

  createTheme("myDark", {
    text: {
      primary: "#bbb",
      secondary: "#2aa198",
    },
    background: {
      default: "#040f1a",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#30363d",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
    button: {
      default: "#ccc",
      hover: "rgba(0,0,0,.08)",
      focus: "rgba(255,255,255,.12)",
      disabled: "#444",
    },
  });

  const columns: TableColumn<UserFragment>[] = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Rola",
      cell: (row) => (
        <Button
          size={"sm"}
          isLoading={changeRoleFetching}
          colorScheme={row.role == "EDITOR" ? "gray" : "blue"}
          color="#222"
          onClick={() => {
            if (row.role !== "ADMIN") {
              changeRoleOfUser({
                userId: row.id,
                role: row.role == "EDITOR" ? "USER" : "EDITOR",
              });
            }
          }}
        >
          {row.role}
        </Button>
      ),
      center: true,
    },
  ];

  return (
    <Layout>
      <DataTable
        style={{ backgroundColor: "#040f1a" }}
        columns={columns}
        data={data?.getAllUsers as UserFragment[]}
        responsive={false}
        theme="myDark"
        pagination
        paginationPerPage={50}
        paginationRowsPerPageOptions={[20, 50, 100]}
      />
    </Layout>
  );
};

export default AdminUsers;
