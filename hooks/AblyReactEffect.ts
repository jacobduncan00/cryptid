import { Types } from "ably";
import Ably from "ably";
import { useEffect } from "react";

const ably = new Ably.Realtime({
  authUrl: "/api/createTokenRequest",
});

console.log(process.env.BASE_URL);

export function useChannel(
  channelName: string,
  callbackOnMessage: (msg: Types.Message) => void
): [Ably.Types.RealtimeChannelCallbacks, Ably.Realtime] {
  let channel: Ably.Types.RealtimeChannelCallbacks;
  channel = ably.channels.get(channelName);

  const onMount = () => {
    channel.subscribe((msg) => {
      callbackOnMessage(msg);
    });
  };

  const onUnmount = () => {
    channel.unsubscribe();
  };

  const useEffectHook = () => {
    onMount();
    return () => {
      onUnmount();
    };
  };

  useEffect(useEffectHook);

  return [channel, ably];
}
