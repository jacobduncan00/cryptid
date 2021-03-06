import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";
import ThemeButton from "../components/ThemeButton";

export default function Homepage() {
  return (
    <>
      <ThemeButton />
      <Head>
        <title>Cryptid</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Cryptid
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                chat without worry
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              Cryptid is a chatroom web application that allows you to chat with
              friends securely via end-to-end encrypted messages
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Link href="/create/credentials">
                <Button
                  rounded={"full"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Create Room
                </Button>
              </Link>
              <Link href="/browse/rooms">
                <Button rounded={"full"}>Find Rooms</Button>
              </Link>
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
