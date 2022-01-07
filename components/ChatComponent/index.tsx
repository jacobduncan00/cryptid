import {
  Button,
  Center,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Types } from "ably";
import { useState, useRef } from "react";
import { useChannel } from "../../hooks/AblyReactEffect";
import InviteButton from "../InviteButton";
import MessageBubble from "../MessageBubble";
import MessageFeed from "../MessageFeed";
import GPModal from "../Modal";

type Props = {
  id: number;
  name: string;
  color: string;
};

const ChatComponent = ({ id, name, color }: Props) => {
  let inputBox: any = null;
  let messageEnd: any = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<Types.Message[]>([]);
  const messageTextIsEmpty = messageText.trim().length === 0;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [channel, ably] = useChannel(
    // `channel${id}`,
    "channel1",
    (message: Types.Message) => {
      const history = receivedMessages.slice(-199);
      setMessages([...history, message]);
      setTimeout(() => {
        messages.length > 5 ? executeScroll() : null;
      }, 200);
    }
  );

  const sendChatMessage = (messageText: string) => {
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
    // This is a bad fix for the scroll inssue
    setTimeout(() => {
      messages.length > 5 ? executeScroll() : null;
    }, 200);
  };

  const messages = receivedMessages.map((message: any, index) => {
    return (
      <div ref={messageEnd} key={index}>
        {message.connectionId === ably.connection.id ? (
          <MessageBubble
            align={"right"}
            message={message.data.message}
            name={message.data.name}
            color={message.data.color}
            timeStamp={message.data.timeStamp}
          />
        ) : (
          <MessageBubble
            align={"left"}
            message={message.data.message}
            name={message.data.name}
            color={message.data.color}
            timeStamp={message.data.timeStamp}
          />
        )}
      </div>
    );
  });

  const executeScroll = () => {
    messageEnd.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <VStack height={"90vh"} overflowY={"auto"}>
        <MessageFeed messages={messages} />
      </VStack>
      <Center pb={12} mt={12}>
        <HStack pos="absolute" bottom="0">
          <InviteButton roomID={id} />
          <form onSubmit={handleFormSubmission}>
            <Input
              placeholder="Message"
              w={512}
              onChange={(e) => setMessageText(e.currentTarget.value)}
              ref={(element) => {
                inputBox = element;
              }}
            />
          </form>
          <Button
            colorScheme="teal"
            size="md"
            onClick={(e) => {
              messageTextIsEmpty ? onOpen() : handleFormSubmission(e);
              messages.length > 5 ? executeScroll() : null;
            }}
          >
            Send
          </Button>
        </HStack>
      </Center>
      <GPModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Failed To Send Message"}
        message={
          "We cannot send your message because you did not input a message. Try typing a message then hitting the send button."
        }
      />
    </>
  );
};
export default ChatComponent;
