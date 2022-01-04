import { useRouter } from "next/router";
import ChatComponent from "../../components/ChatComponent";

const Room = () => {
  const router = useRouter();
  const { id, name, color }: any = router.query;

  return <ChatComponent id={id} name={name} color={color} />;
};

export default Room;
