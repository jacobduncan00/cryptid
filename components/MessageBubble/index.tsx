import {
  Stack,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

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
    <VStack w={"full"} align={align}>
      <Text align={"left"}>{timeStamp}</Text>
      <HStack>
        <Wrap>
          <WrapItem>
            <Avatar name={name} bg={color} />
          </WrapItem>
        </Wrap>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Text>{message}</Text>
        </Stack>
      </HStack>
    </VStack>
  );
}
