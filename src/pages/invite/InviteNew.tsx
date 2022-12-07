import { Button, Code, Grid, Link, Loading, Text } from "@geist-ui/core";
import { LogIn } from "@geist-ui/icons";
import { Field, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  useCreateUserInviteMutation,
  useGetInviteQuery,
} from "../../api/invitesApi";
import CustomInput from "../../components/input/CustomInput";
import CustomPasswordInput from "../../components/input/CustomPasswordInput";
import { CreateUserSchema } from "../../schemas";
import { login } from "../../slices/authSlice";
import { useAppDispatch } from "../../store";
import { isApiResponse } from "../../utils/customFetchBase";
import Page404 from "../error/Page404";

const InviteNew = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitRegister, { isLoading: isSubmitting, error }] =
    useCreateUserInviteMutation();

  if (!id) {
    return <Page404 />;
  }

  const { data: inviteData, isLoading } = useGetInviteQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Text h2 span padding={0} margin={0}>
        You&apos;ve been invited to <Code>{inviteData?.organization.name}</Code>
      </Text>
      <Text span h3 type="secondary" margin={0}>
        Register to continue
      </Text>
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
              inviteId: id,
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
                  loading={isSubmitting}
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

export default InviteNew;
