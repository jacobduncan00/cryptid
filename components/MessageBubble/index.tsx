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
  return (
    <VStack w={"full"}>
      <Text align={"center"}>{timeStamp}</Text>
      {align === "left" ? (
        <HStack>
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
          <Wrap>
            <WrapItem>
              <Avatar name={name} bg={color} />
            </WrapItem>
          </Wrap>
        </HStack>
      ) : (
        <HStack>
          <Wrap>
            <WrapItem>
              <Avatar name={name} bg={color} />
            </WrapItem>
          </Wrap>
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
        </HStack>
      )}
    </VStack>
  );
}
