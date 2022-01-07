import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  VStack,
  Button,
  Heading,
  useColorModeValue,
  Checkbox,
  FormErrorMessage,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

const getNextAvailRoomID = () => {
  // return the id of the next available room
  return 1;
};

export default function Credentials() {
  const router = useRouter();
  let { roomID }: any = router.query;
  let nextID;
  if (!roomID) {
    nextID = getNextAvailRoomID();
  }
  const [name, setName] = useState<string>("");
  const [nameChangeCounter, setNameChangeCounter] = useState<number>(0);
  const [privateRoom, setPrivateRoom] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#FF0000");

  const isNameError = name === "" && nameChangeCounter > 0;

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Appearance Settings</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={500}
        >
          <Stack spacing={4}>
            <FormControl id="name" isInvalid={isNameError}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameChangeCounter(nameChangeCounter + 1);
                }}
              />
              {isNameError && (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="color">
              <HStack>
                <VStack marginRight={"20"}>
                  <FormLabel>Color</FormLabel>
                  <HexColorPicker color={color} onChange={setColor} />
                </VStack>
                <VStack>
                  <FormLabel>Private Room</FormLabel>
                  <Checkbox
                    type="checkbox"
                    onClick={() => setPrivateRoom(!privateRoom)}
                  ></Checkbox>
                </VStack>
              </HStack>
            </FormControl>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            />
            {roomID ? (
              <Link href={`/room/${roomID}?name=${name}&color=${color}`}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Join Room
                </Button>
              </Link>
            ) : (
              <Link
                href={`/room/${nextID}?name=${name}&color=${color.substring(
                  1,
                  color.length
                )}`}
              >
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Create Room
                </Button>
              </Link>
            )}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
