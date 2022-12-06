import { Button, Grid, Link, Text } from "@geist-ui/core";
import { LogIn } from "@geist-ui/icons";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { usePostLoginMutation } from "../../api/authApi";
import CustomInput from "../../common/components/input/CustomInput";
import CustomPasswordInput from "../../common/components/input/CustomPasswordInput";
import { login } from "../../slices/authSlice";
import { useAppDispatch } from "../../store";

export const LoginUserSchema = z
  .object({ email: z.string().email(), password: z.string() })
  .strict();

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitLogin, { isLoading, isError }] = usePostLoginMutation();

  return (
    <>
      <Text h2>Log in to TODO:</Text>
      <Grid.Container gap={1} direction="column">
        <Formik
          initialValues={{ email: "test1@test.com", password: "test123" }}
          validationSchema={toFormikValidationSchema(LoginUserSchema)}
          onSubmit={(vals) => {
            submitLogin(vals)
              .unwrap()
              .then((res) => {
                dispatch(login(res));
                navigate("/");
              })
              .catch(() => {
                return;
              });
          }}
        >
          {({ submitForm }) => (
            <>
              <Grid>
                <Field
                  name="email"
                  scale={4 / 3}
                  width="100%"
                  placeholder="Email Address"
                  component={CustomInput}
                />
              </Grid>
              <Grid>
                <Field
                  name="password"
                  scale={4 / 3}
                  width="100%"
                  placeholder="Password"
                  component={CustomPasswordInput}
                />
              </Grid>
              {isError && (
                <Text span type="error">
                  Failed to login, check your information
                </Text>
              )}
              <Grid>
                <Button
                  loading={isLoading}
                  type="success"
                  width="100%"
                  icon={<LogIn />}
                  onClick={submitForm}
                >
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
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </>
          )}
        </Formik>
      </Grid.Container>
    </>
  );
};

export default LoginPage;
