import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Rooms = () => {
  const { data, error } = useSWR("/api/getOpenRoomRequest", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>data: {data}</div>;
};

export default Rooms;
