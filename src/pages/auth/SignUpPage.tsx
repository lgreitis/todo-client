import { Button, Grid, Input, Link, Text } from "@geist-ui/core";
import { LogIn } from "@geist-ui/icons";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Text h2>Join TODO:</Text>
      <Grid.Container gap={1} direction="column">
        <Grid>
          <Input placeholder="Username" scale={4 / 3} width="100%"></Input>
        </Grid>
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
          <Input.Password
            placeholder="Confirm Password"
            scale={4 / 3}
            width="100%"
          ></Input.Password>
        </Grid>
        <Grid>
          <Button type="success" width="100%" icon={<LogIn />}>
            Sign Up
          </Button>
        </Grid>
        <Grid>
          <Link
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
            color
          >
            Have an account? Log in
          </Link>
        </Grid>
      </Grid.Container>
    </>
  );
};

export default SignUpPage;
