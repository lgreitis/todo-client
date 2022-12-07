import { Button, Grid, Link, Text } from "@geist-ui/core";
import { LogIn } from "@geist-ui/icons";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { usePostRegisterMutation } from "../../api/authApi";
import CustomInput from "../../components/input/CustomInput";
import CustomPasswordInput from "../../components/input/CustomPasswordInput";
import { login } from "../../slices/authSlice";
import { useAppDispatch } from "../../store";
import { isApiResponse } from "../../utils/customFetchBase";

export const CreateUserSchema = z
  .object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitRegister, { isLoading, error }] = usePostRegisterMutation();

  return (
    <>
      <Text h2>Join TODO:</Text>
      <Grid.Container gap={1} direction="column">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={toFormikValidationSchema(CreateUserSchema)}
          onSubmit={(vals) => {
            submitRegister({
              email: vals.email,
              password: vals.password,
              username: vals.username,
            })
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
                  name="username"
                  scale={4 / 3}
                  width="100%"
                  placeholder="Username"
                  component={CustomInput}
                />
              </Grid>
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
              <Grid>
                <Field
                  name="confirmPassword"
                  scale={4 / 3}
                  width="100%"
                  placeholder="Confirm Password"
                  component={CustomPasswordInput}
                />
              </Grid>
              {isApiResponse(error) && (
                <Text span type="error">
                  {error.data.message}
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
            </>
          )}
        </Formik>
      </Grid.Container>
    </>
  );
};

export default SignUpPage;
