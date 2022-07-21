import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { EventForm } from "../../../components/EventForm";
import { Layout } from "../../../components/Layout";

const AdminLoadEvent: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id);
  });
  return (
    <Layout>
      <EventForm id={id as string} />
    </Layout>
  );
};

export default AdminLoadEvent;
