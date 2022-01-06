import { Button, useDisclosure } from "@chakra-ui/react";
import GPModal from "../Modal";

type Props = {
  roomID: number;
};

const InviteButton = ({ roomID }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const genInviteLink = async () => {
    console.log(
      `${window.location.origin}/create/credentials?roomID=${roomID}`
    );
    await navigator.clipboard.writeText(
      `${window.location.origin}/create/credentials?roomID=${roomID}`
    );
  };
  return (
    <>
      <Button
        colorScheme="teal"
        size="md"
        onClick={() => {
          genInviteLink();
          onOpen();
        }}
      >
        Invite
      </Button>
      <GPModal
        isOpen={isOpen}
        onClose={onClose}
        title="Invite Link"
        message={"Copied to clipboard successfully!"}
      />
    </>
  );
};
export default InviteButton;
