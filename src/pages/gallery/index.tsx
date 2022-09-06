import { Wrap, WrapItem, Image, Text, Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { useGetAlbumsQuery } from "../../generated/graphql";

const Gallery: NextPage = () => {
  const router = useRouter();
  const [{ data }] = useGetAlbumsQuery();
  return (
    <Layout>
      <Wrap>
        {data?.getAlbums.map((item, index) => (
          <WrapItem key={index}>
            <a
              onClick={() => {
                router.push(`gallery/${item.id}`);
              }}
            >
              <Box>
                <Image
                  src={item.coverPhotoBaseUrl}
                  height={150}
                  mb={2}
                  borderRadius={10}
                />
                <Text fontWeight={"bold"}>{item.title}</Text>
              </Box>
            </a>
          </WrapItem>
        ))}
      </Wrap>
    </Layout>
  );
};

export default Gallery;
