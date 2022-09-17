import { Heading, Link, Wrap, WrapItem } from "@chakra-ui/react";
import { NextPage } from "next";
import { Card } from "../../../../components/Card";
import { Layout } from "../../../../components/Layout";
import { useGetGoogleCalendarsQuery } from "../../../../generated/graphql";
import NextLink from "next/link";
import { useIsAdminPage } from "../../../../utils/useIsAdminPage";

const AdminLoadEvents: NextPage = () => {
  useIsAdminPage();
  const [{ data }] = useGetGoogleCalendarsQuery();
  return (
    <Layout>
      <Heading color="#ddd">Načítať udalosti</Heading>
      <Wrap>
        {data?.getGoogleCalendars.map((item, index) => (
          <WrapItem key={index}>
            <Card>
              <NextLink
                href={`/admin/events/load/calendar?id=${item.id}&name=${item.name}`}
              >
                <Link color="#ddd">{item.name}</Link>
              </NextLink>
            </Card>
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  );
};

export default AdminLoadEvents;
