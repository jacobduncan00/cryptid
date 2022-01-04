import {
  Stack,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Avatar, Wrap, WrapItem, Flex } from "@chakra-ui/react";

type Props = {
  align: string;
  name: string;
  message: string;
  timeStamp: string;
  color: string;
};

export default function MessageBubble({
  align,
  name,
  message,
  timeStamp,
  color,
}: Props): JSX.Element {
  const MessageDisplayRight = () => {
    if (align === "right") {
      return (
        <Wrap>
          <WrapItem>
            <Avatar name={name} bg={color} />
          </WrapItem>
        </Wrap>
      );
    }
  };

  const MessageDisplayLeft = () => {
    if (align === "left") {
      return (
        <Wrap>
          <WrapItem>
            <Avatar name={name} bg={color} />
          </WrapItem>
        </Wrap>
      );
    }
  };

  return (
    <VStack w={"full"}>
      <Text align={"center"}>{timeStamp}</Text>
      <HStack>
        {MessageDisplayRight}
        <Stack
          spacing={4}
          w={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Text>{message}</Text>
        </Stack>
        {MessageDisplayLeft}
      </HStack>
    </VStack>
  );
}
