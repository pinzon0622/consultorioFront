import { Button, Modal, Label, TextInput } from "flowbite-react";
import SearchBar from "../../Components/SearchBar";
import api from "../../Api/api";
import { useEffect, useState } from "react";

import GenericTable from "../../Components/GenericTable";

const Dentist = () => {
  const [dentist, setDentist] = useState([]);
  const [tableDentist, setTableDentist] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [idP, setIdP] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const headers = ["Nombre", "Especialidad", "Telefono", "correo"];
  const values = ["name", "specialty", "phone", "email"];
  const keyTable = "idDentist";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editing) {
        const response = await api.post("/dentist", {
          name,
          specialty,
          phone,
          email,
        });
        getDentist();
      } else {
        const response = await api.put(`/dentist/${idP}`, {
          name,
          specialty,
          phone,
          email,
        });
        getDentist();
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
    }
    handleReset();
    setShowModal(false);
  };

  const handleReset = () => {
    setIdP("");
    setName("");
    setSpecialty("");
    setPhone("");
    setEmail("");
  };

  const getDentist = async () => {
    try {
      const response = await api.get("/dentist");
      setDentist(response.data);
      setTableDentist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchDentist(e.target.value);
  };

  const searchDentist = (searchedP) => {
    var filteredDentist = tableDentist.filter((dentist) => {
      if (dentist.name.toLowerCase().includes(searchedP.toLowerCase())) {
        return dentist;
      }
    });
    setDentist(filteredDentist);
  };

  const editDentist = async (id) => {
    try {
      const response = await api.get(`/dentist/${id}`);
      setEditing(true);
      setShowModal(true);
      setIdP(response.data.idDentist);

      setName(response.data.name);
      setSpecialty(response.data.specialty);
      setPhone(response.data.phone);
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDentist = async (id) => {
    try {
      const response = await api.delete(`/dentist/${id}`);
      getDentist();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (confirm) => {
    if (confirm) {
      await deleteDentist(idP);
    }
  };

  useEffect(() => {
    getDentist();
  }, []);

  return (
    <div>
      <section className="bg-gray-50 py-3 border-b-2">
        <SearchBar
          search={search}
          handleSearch={handleSearch}
          placeholder="Buscar dentista"
        />
      </section>
      <div className="flex justify-between items-center px-6 py-6">
        <h1 className=" text-3xl ">Dentistas</h1>
        <Button color="dark" onClick={() => setShowModal(true)}>
          Añadir Dentista
        </Button>
      </div>

      <div className="overflow-x-auto px-6">
        <GenericTable
          headers={headers}
          data={dentist}
          values={values}
          keyValue={keyTable}
          editRow={(e) => editDentist(e)}
          setIdDelete={setIdP}
          deleteMethod={handleDelete}
        />
      </div>

      <Modal
        show={showModal}
        size="md"
        popup
        onClose={() => {
          setShowModal(false);
          setEditing(false);
          handleReset();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 ">
              {editing ? "Editar Dentista" : "Añadir Paciente"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Nombre" value="Nombre" />
                </div>
                <TextInput
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Nombre"
                  autoFocus
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Especialidad" value="Especialidad" />
                </div>
                <TextInput
                  id="specialty"
                  onChange={(e) => setSpecialty(e.target.value)}
                  value={specialty}
                  placeholder="Especialidad"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Telefono" value="Telefono" />
                </div>
                <TextInput
                  id="telefono"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  placeholder="Telefono"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Correo" />
                </div>
                <TextInput
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="w-full flex justify-center mt-3">
                <Button
                  type="submit"
                  color={editing ? "warning" : "success"}
                  pill
                >
                  {editing ? "Editar" : "Añadir"}
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dentist;
