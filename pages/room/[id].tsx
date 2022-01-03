import { useRouter } from "next/router";
import { useState } from "react";
import Ably from "ably";
import { Button, Input, HStack, Center } from "@chakra-ui/react";
import MessageFeed from "../../components/MessageFeed";
import dynamic from "next/dynamic";
// const AblyChatComponent = dynamic(
//   () => import("../../components/ChatComponent"),
//   { ssr: false }
// );

const Room = () => {
  const router = useRouter();
  const { id, name, color }: any = router.query;
  const [message, setMessage] = useState<string>("");

  let channel: Ably.Types.RealtimeChannelCallbacks;
  const ably = new Ably.Realtime(
    "7NIZHQ.TAthyQ:XZY5jrcVJy_rD8cuDmkzA1teTdV2URpZOv83deABl6I"
  );
  channel = ably.channels.get("test");

  const sendMessage = () => {
    var today = new Date().toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    channel.publish("message", {
      message: message,
      user: name,
      color: `#${color}`,
      timeStamp: today.split(",")[1],
    });
  };

  // Publish a message to the test channel
  // With this ID, we want to check if there is a valid session for that room
  // If there is, we render room, if not we want to display a message that says
  // the chat session for that room has ended

  return (
    <div>
      <MessageFeed id={id} />
      <Center pb={12}>
        <HStack>
          <Input
            placeholder="Message"
            w={512}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button colorScheme="teal" size="md" onClick={sendMessage}>
            Button
          </Button>
        </HStack>
      </Center>
    </div>
  );
};

export default Room;
