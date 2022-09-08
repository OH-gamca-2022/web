import { Box, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Gallery from "react-photo-gallery";
import { Layout } from "../../components/Layout";
import { useGetPhotosFromAlbumQuery } from "../../generated/graphql";

const Album: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [nextPageToken, setNextPageToken] = useState<string | null>("");
  const [{ data, error }] = useGetPhotosFromAlbumQuery({
    variables: { albumId: id as string, nextPageToken: nextPageToken },
    pause: !id || typeof id !== "string",
  });
  const loader = useRef(null);

  //skopirovane z internetu - zistuje ked pouzivatel dosiel na koniec stranky
  const handleObserver = useCallback(
    (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setNextPageToken(data?.getPhotosFromAlbum.nextPageToken || null);
      }
    },
    [data]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    });
    if (loader.current) observer.observe(loader.current);
  });

  useEffect(() => {
    console.log("data", data, error);
  });

  if (!data) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <Gallery
        photos={
          data?.getPhotosFromAlbum.photos.map((item) => {
            return {
              src: item.baseUrl,
              height: item.height,
              width: item.width,
            };
          }) || []
        }
      />
      <div ref={loader}></div>
    </Layout>
  );
};

export default Album;
