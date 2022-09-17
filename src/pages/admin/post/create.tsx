import { NextPage } from "next";
import { Layout } from "../../../components/Layout";
import { PostForm } from "../../../components/PostForm";
import { useIsAdminPage } from "../../../utils/useIsAdminPage";

const CreatePost: NextPage = () => {
  useIsAdminPage();
  return (
    <Layout>
      <PostForm />
    </Layout>
  );
};

export default CreatePost;
