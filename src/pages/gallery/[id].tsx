import { Box, Button, Flex, Spinner, Image } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";
import { Layout } from "../../components/Layout";
import {
  PhotoFragment,
  useGetPhotosFromAlbumQuery,
} from "../../generated/graphql";

const Album: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [nextPageToken, setNextPageToken] = useState<string | null>("");
  const [photos, setPhotos] = useState<PhotoFragment[][]>([]);
  const [{ data, error, fetching }] = useGetPhotosFromAlbumQuery({
    variables: { albumId: id as string, nextPageToken: nextPageToken },
    pause: !id || typeof id !== "string",
  });

  useEffect(() => {
    console.log("data", data, error);
    console.log(photos.flat());
  });

  useEffect(() => {
    console.log(photos);
    if (!photos || photos.length == 0) {
      console.log("here");
      console.log(data?.getPhotosFromAlbum.photos);
      setPhotos(
        data?.getPhotosFromAlbum.photos ? [data?.getPhotosFromAlbum.photos] : []
      );
      setNextPageToken(data?.getPhotosFromAlbum.nextPageToken || null);
    }
  }, [data]);

  const openLightbox = useCallback((_event: any, { index }: any) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  if (!data) {
    return <Layout>Loading...</Layout>;
  }

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <Layout>
      {photos.map((page, index) => (
        <Gallery
          onClick={openLightbox}
          key={index}
          photos={
            page.map((item) => {
              return {
                src: item.baseUrl,
                height: item.height,
                width: item.width,
              };
            }) || []
          }
        />
      ))}
      {/* @ts-ignore */}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.flat().map((x) => ({
                ...x,
                source: x.baseUrl,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
      {nextPageToken && (
        <Flex width={"100%"} alignItems="center" justifyContent="center" p={5}>
          <Button
            onClick={() => {
              console.log(nextPageToken);
              if (nextPageToken) {
                setPhotos([...photos, data.getPhotosFromAlbum.photos]);
                setNextPageToken(data.getPhotosFromAlbum.nextPageToken || null);
              }
            }}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default Album;
