import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Ably from "ably";
import MessageBubble from "../MessageBubble";

type Props = {
  id: number;
};

export default function MessageFeed({ id }: Props): JSX.Element {
  const [messages, setMessages] = useState<Object[]>([]);
  useEffect(() => {
    let channel;
    const ably = new Ably.Realtime(process.env.ABLY_REALTIME_KEY);
    channel = ably.channels.get("test");
    channel.subscribe("message", function (message) {
      setMessages((m) => [
        ...m,
        {
          message: message.data.message,
          user: message.data.user,
          color: message.data.color,
          timeStamp: message.data.timeStamp,
        },
      ]);
    });
  }, []);

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <VStack>
        {messages.map((msg: any, i) => (
          <MessageBubble
            key={i}
            message={msg.message}
            name={msg.user}
            color={msg.color}
            timeStamp={msg.timeStamp}
          />
        ))}
      </VStack>
    </Flex>
  );
}
