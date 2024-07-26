import ProtectedComponent from "../../Components/Protected";
import { useAuth } from "../../Contexts/AuthContext";

function Admin() {
    const { token } = useAuth();
    return (
      <>
        <h1 className="bg-transparent">Admin</h1>
        <ProtectedComponent token={token} />

      </>
    );
  }
  
  export default Admin;