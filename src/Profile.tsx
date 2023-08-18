import { useAuth } from "react-oidc-context";

function Profile() {
  const auth = useAuth();

  return (
    <section style={{ wordBreak: "break-all", padding: "1rem" }}>
      {auth.user &&
        Object.keys(auth.user.profile).map((key) => (
          <div key={key}>
            <span>{key}: </span>
            <span>{JSON.stringify(auth.user?.profile[key])}</span>
          </div>
        ))}
    </section>
  );
}

export default Profile;
