import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useLeavePageConfirm } from "../../hooks/useLeave";

const ChatComponent = dynamic(() => import("../../components/ChatComponent"), {
  ssr: false,
});

const Room = () => {
  const router = useRouter();
  const { id, name, color }: any = router.query;
  useLeavePageConfirm(true);

  return <ChatComponent id={id} name={name} color={color} />;
};

export default Room;
