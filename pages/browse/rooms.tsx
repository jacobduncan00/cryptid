import useSWR from "swr";
import {
  Text,
  Heading,
  Flex,
  Spinner,
  Stack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Rooms = () => {
  const { data, error } = useSWR("/api/getOpenRoomRequest", fetcher);
  console.log(data?.rooms);
  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Flex p={8} flex={1} align={"center"} justify={"center"} minH={"100vh"}>
        <Spinner color="blue.400" size="xl" />
      </Flex>
    );
  return (
    <div>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
          <Text color={"blue.400"} as={"span"}>
            Find <Text as="u">{data.roomLen}</Text> Open Rooms
          </Text>
        </Heading>
      </Flex>
      <Flex
        minH={"20vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          {Array(data.roomLen)
            .fill(0)
            .map(() => (
              <Box
                rounded={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
                w={500}
              >
                <Stack align={"left"}>
                  <Heading fontSize={"2xl"}>Room #{data.roomLen}</Heading>
                </Stack>
              </Box>
            ))}
        </Stack>
      </Flex>
    </div>
  );
};

export default Rooms;
