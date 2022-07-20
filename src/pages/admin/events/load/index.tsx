import { Heading, Link, Wrap, WrapItem } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { Card } from "../../../../components/Card";
import { Layout } from "../../../../components/Layout";
import { useGetGoogleCalendarsQuery } from "../../../../generated/graphql";
import NextLink from "next/link";

const AdminLoadEvents: NextPage = () => {
  const [{ data }] = useGetGoogleCalendarsQuery();
  return (
    <Layout>
      <Heading>Načítať udalosti</Heading>
      <Wrap>
        {data?.getGoogleCalendars.map((item, index) => (
          <WrapItem>
            <Card>
              <NextLink
                href={`/admin/events/load/calendar?id=${item.id}&name=${item.name}`}
              >
                <Link>{item.name}</Link>
              </NextLink>
            </Card>
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  );
};

export default AdminLoadEvents;
