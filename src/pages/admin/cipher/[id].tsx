import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CipherForm } from "../../../components/CipherForm";
import { Layout } from "../../../components/Layout";
import { useIsAdminPage } from "../../../utils/useIsAdminPage";

const Cipher = () => {
  useIsAdminPage();
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return (
      <Layout>
        <Heading color="#ccc">Clanok nebol najdeny</Heading>
      </Layout>
    );
  }

  return (
    <Layout>
      <CipherForm id={id as string} />
    </Layout>
  );
};

export default Cipher;
