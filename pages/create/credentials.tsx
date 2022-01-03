import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const getNextAvailRoomID = () => {
  // return the id of the next available room
  return 1;
};

export default function Credentials() {
  const nextID = getNextAvailRoomID();
  const [name, setName] = useState<string>("Test");
  const [color, setColor] = useState<string>("FF0000");
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Chat Settings</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={500}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="color">
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </FormControl>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            />
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              <Link href={`/room/${nextID}?name=${name}&color=${color}`}>
                Create Room
              </Link>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
