import { NextPage } from "next";
import { CipherForm } from "../../../components/CipherForm";
import { Layout } from "../../../components/Layout";

const createCipher: NextPage = () => {
  return (
    <Layout>
      <CipherForm />
    </Layout>
  );
};

export default createCipher;
