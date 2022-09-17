import { NextPage } from "next";
import { useRouter } from "next/router";
import { EventForm } from "../../../../components/EventForm";
import { Layout } from "../../../../components/Layout";
import { useIsAdminPage } from "../../../../utils/useIsAdminPage";

const AdminLoadEvent: NextPage = () => {
  useIsAdminPage();
  const router = useRouter();
  const { googleId, calendarId, tagId } = router.query;

  return (
    <Layout>
      <EventForm
        googleId={googleId as string}
        calendarId={calendarId as string}
        tagId={typeof tagId == "string" ? tagId : undefined}
      />
    </Layout>
  );
};

export default AdminLoadEvent;
