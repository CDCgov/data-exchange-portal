import { useAuth } from "react-oidc-context";

function Profile() {
  const auth = useAuth();

  return (
    <section style={{ padding: "1rem" }}>
      {auth.user && <pre>{JSON.stringify(auth.user.profile, null, 2)}</pre>}
    </section>
  );
}

export default Profile;
