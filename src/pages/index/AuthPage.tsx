import { Button, Text } from "@geist-ui/core";
import { LogIn, User } from "@geist-ui/icons";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Text h2>Log in to TODO:</Text>
      <Button
        icon={<LogIn />}
        width="100%"
        type="success"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
      <Button
        icon={<User />}
        width="100%"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Register
      </Button>
    </>
  );
};

export default AuthPage;
