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

type Room = {
  rooms: Array<string>;
  roomLen: number;
};

type RoomPayload = {
  room?: Room;
};

const Rooms = () => {
  const { data, error } = useSWR<Room>("/api/getOpenRoomRequest", fetcher);

  const rooms = () => {
    return data?.rooms.forEach((room) => {
      const roomParsed = JSON.parse(room);
      return (
        <Box
          rounded={"lg"}
          bg={"gray.700"}
          boxShadow={"lg"}
          p={8}
          key={room}
          w={500}
        >
          <Stack align={"left"}>
            <Heading fontSize={"2xl"}>{roomParsed.roomID}</Heading>
          </Stack>
        </Box>
      );
    });
  };
  // if (error)
  //   return (
  //     <Flex p={8} flex={1} align={"center"} justify={"center"} minH={"100vh"}>
  //       <Spinner color="blue.400" size="xl" />
  //     </Flex>
  //   );
  return (
    <div>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
          <Text color={"blue.400"} as={"span"}>
            Find <Text as="u">{data?.roomLen || "0️⃣"}</Text> Open Rooms
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
          {rooms}
          <div>HELLO WORLD</div>
        </Stack>
      </Flex>
    </div>
  );
};

export default Rooms;
