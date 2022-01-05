import { Button } from "@chakra-ui/react";

type Props = {
  roomID: number;
};

const InviteButton = ({ roomID }: Props) => {
  const genInviteLink = () => {
    console.log(
      `${window.location.origin}/create/credentials?roomID=${roomID}`
    );
    navigator.clipboard.writeText(
      `${window.location.origin}/create/credentials?roomID=${roomID}`
    );
    // MODAL needed here
    alert("Invite link copied to clipboard!");
  };
  return (
    <Button colorScheme="teal" size="md" onClick={genInviteLink}>
      Invite
    </Button>
  );
};
export default InviteButton;
