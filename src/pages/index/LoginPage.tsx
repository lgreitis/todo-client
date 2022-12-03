import { Button, Grid, Input, Link, Text } from "@geist-ui/core";
import { LogIn } from "@geist-ui/icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Text h2>Log in to TODO:</Text>
      <Grid.Container gap={1} direction="column">
        <Grid>
          <Input placeholder="Email Address" scale={4 / 3} width="100%"></Input>
        </Grid>
        <Grid>
          <Input.Password
            placeholder="Password"
            scale={4 / 3}
            width="100%"
          ></Input.Password>
        </Grid>
        <Grid>
          <Button type="success" width="100%" icon={<LogIn />}>
            Login
          </Button>
        </Grid>
        <Grid>
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
            color
          >
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default LoginPage;
