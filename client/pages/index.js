import buildClient from "../api/build-client";

const LandingPage = ({ currentUser }) => {
  console.log("currentUser :>> ", currentUser);
  return currentUser ? (
    <h1>Your'e signed in</h1>
  ) : (
    <h1>You're not signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  console.log("Landing props :>> ", data);
  return data;
};

export default LandingPage;
