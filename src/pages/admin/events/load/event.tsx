import { NextPage } from "next";
import { useRouter } from "next/router";
import { EventForm } from "../../../../components/EventForm";
import { Layout } from "../../../../components/Layout";

const AdminLoadEvent: NextPage = () => {
  const router = useRouter();
  const { googleId, calendarId } = router.query;
  return (
    <Layout>
      <EventForm
        googleId={googleId as string}
        calendarId={calendarId as string}
      />
    </Layout>
  );
};

export default AdminLoadEvent;
