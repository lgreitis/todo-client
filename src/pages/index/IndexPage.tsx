import { useAppSelector } from "../../store";
import { selectAuth } from "../auth/authSlice";

const IndexPage = () => {
  const auth = useAppSelector(selectAuth);

  return <>Welcome back, {auth.username}</>;
};

export default IndexPage;
