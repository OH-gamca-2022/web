import { Box, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { Layout } from "../../components/Layout";
import { useGetPhotosFromAlbumQuery } from "../../generated/graphql";

const Album: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [offset, setOffset] = useState(0);
  const [{ data }] = useGetPhotosFromAlbumQuery({
    variables: { albumId: id as string, offset, limit: 3 },
    pause: !id || typeof id !== "string",
  });
  useEffect(() => {
    console.log(data);
  });
  return (
    <Layout>
      <Gallery
        photos={
          data?.getPhotosFromAlbum.map((item) => {
            return {
              src: item.baseUrl,
              height: item.height,
              width: item.width,
            };
          }) || []
        }
      />
      <Button
        onClick={() => {
          setOffset(data?.getPhotosFromAlbum.length || 0);
        }}
      >
        Load more
      </Button>
    </Layout>
  );
};

export default Album;
