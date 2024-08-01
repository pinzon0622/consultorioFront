import ProtectedComponent from "../../Components/Protected";

function Admin() {
    const token = window.localStorage.getItem("token");
    return (
      <>
        <h1 className="bg-transparent">Admin</h1>
        <ProtectedComponent token={token} />

      </>
    );
  }
  
  export default Admin;