import { NextPage } from "next";
import { Layout } from "../../../components/Layout";
import { PostForm } from "../../../components/PostForm";

const CreatePost: NextPage = () => {
  return (
    <Layout>
      <PostForm />
    </Layout>
  );
};

export default CreatePost;
