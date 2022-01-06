import { Button, Center, HStack, Input, useDisclosure } from "@chakra-ui/react";
import { Types } from "ably";
import { useState, useEffect } from "react";
import { useChannel } from "../../hooks/AblyReactEffect";
import InviteButton from "../InviteButton";
import MessageBubble from "../MessageBubble";
import MessageFeed from "../MessageFeed";
import ErrorModal from "../Modal";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [channel, ably] = useChannel(
    // `channel${id}`,
    "channel1",
    (message: Types.Message) => {
      const history = receivedMessages.slice(-199);
      setMessages([...history, message]);
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
  };

  // const handleKeyPress = (event: any) => {
  //   if (event.charCode !== 13 || messageTextIsEmpty) {
  //     return;
  //   }
  //   sendChatMessage(messageText);
  //   event.preventDefault();
  // };

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
          <InviteButton roomID={id} />
          <Input
            placeholder="Message"
            w={512}
            onChange={(e) => setMessageText(e.currentTarget.value)}
            ref={(element) => {
              inputBox = element;
            }}
          />
          <Button
            colorScheme="teal"
            size="md"
            onClick={messageTextIsEmpty ? onOpen : handleFormSubmission}
          >
            Send
          </Button>
        </HStack>
      </Center>
      <ErrorModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Failed To Send Message"}
        message={
          "We cannot send your message because you did not input a message. Try typing a message then hitting the send button."
        }
      />
    </div>
  );
};
export default ChatComponent;
