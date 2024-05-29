import AuthGroupDataStream from "./AuthGroupDataStream";
import UserAuthGroup from "./UserAuthGroup";
function UserManagement() {
  return (
    <section className="main_content padding-x-2">
      <h1 className="cdc-page-header padding-y-3 margin-0">User Management</h1>
      <AuthGroupDataStream />
      <hr className="margin-y-5" />
      <UserAuthGroup />
    </section>
  );
}

export default UserManagement;
