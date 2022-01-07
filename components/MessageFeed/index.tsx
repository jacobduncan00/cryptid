import { Flex, useColorModeValue, VStack } from "@chakra-ui/react";

type Props = {
  messages: JSX.Element[];
};

export default function MessageFeed({ messages }: Props): JSX.Element {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <VStack>{messages}</VStack>
    </Flex>
  );
}
