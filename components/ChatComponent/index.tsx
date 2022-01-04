import { Button, Center, HStack, Input } from "@chakra-ui/react";
import { Types } from "ably";
import { m } from "framer-motion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useChannel } from "../../hooks/AblyReactEffect";
import MessageBubble from "../MessageBubble";
import MessageFeed from "../MessageFeed";

type Props = {
  id: number;
  name: string;
  color: string;
};

const ChatComponent = ({ id, name, color }: Props) => {
  let inputBox: any = null;
  let messageEnd: any = null;
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;

  const [channel, ably] = useChannel(
    // `channel${id}`,
    "channel1",
    (message: Types.Message) => {
      const history = receivedMessages.slice(-199);
      setMessages([...history, message]);
    }
  );

  const sendChatMessage = (messageText: string) => {
    if (messageText === "") {
      alert("Enter text!");
      return;
    }
    var today = new Date().toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    channel.publish({
      data: {
        name: name,
        message: messageText,
        color: `#${color}`,
        timeStamp: today.split(",")[1],
      },
    });
    setMessageText("");
    inputBox.focus();
    inputBox.value = "";
  };

  const handleFormSubmission = (event: any) => {
    event.preventDefault();
    sendChatMessage(messageText);
  };

  const handleKeyPress = (event: any) => {
    if (event.charCode !== 13 || messageTextIsEmpty) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  };

  const messages = receivedMessages.map((message: any, index) => {
    return message.connectionId === ably.connection.id ? (
      <MessageBubble
        align={"right"}
        key={index}
        message={message.data.message}
        name={message.data.name}
        color={message.data.color}
        timeStamp={message.data.timeStamp}
      />
    ) : (
      <MessageBubble
        align={"left"}
        key={index}
        message={message.data.message}
        name={message.data.name}
        color={message.data.color}
        timeStamp={message.data.timeStamp}
      />
    );
  });

  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <div>
      <MessageFeed messages={messages} />
      <div
        ref={(element) => {
          messageEnd = element;
        }}
      ></div>
      <Center pb={12}>
        <HStack pos="absolute" bottom="0">
          <Input
            placeholder="Message"
            w={512}
            onChange={(e) => setMessageText(e.currentTarget.value)}
            ref={(element) => {
              inputBox = element;
            }}
          />
          <Button colorScheme="teal" size="md" onClick={handleFormSubmission}>
            Button
          </Button>
        </HStack>
      </Center>
    </div>
  );
};
export default ChatComponent;
