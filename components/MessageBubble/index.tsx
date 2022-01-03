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
  name: string;
  message: string;
  timeStamp: string;
  color: string;
};

export default function MessageBubble({
  name,
  message,
  timeStamp,
  color,
}: Props): JSX.Element {
  return (
    <VStack w={"full"}>
      <Text align={"left"}>{timeStamp}</Text>
      <HStack>
        <Wrap>
          <WrapItem>
            <Avatar name={name} />
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
          <Text>
            {message} - {color}
          </Text>
        </Stack>
      </HStack>
    </VStack>
  );
}
