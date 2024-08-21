import { Button, Modal, Label, TextInput } from "flowbite-react";
import SearchBar from "../../Components/SearchBar";
import api from "../../Api/api";
import GenericTable from "../../Components/GenericTable";
import { useEffect, useState } from "react";
import { Calendar, DatePicker } from "@nextui-org/react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import {useDateFormatter} from "@react-aria/i18n";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [tablePatients, setTablePatients] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [idP, setIdP] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [direction, setDirection] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const headers = [
    "Nombre",
    "Fecha Nacimiento",
    "Direccion",
    "Telefono",
    "Correo",
  ];
  const values = ["name", "birthdate", "direction", "phone", "email"];
  const keyTable = "idPatient";

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = formatDate(birthdate);
    try {
      if (!editing) {
        const response = await api.post("/patient", {
          name,
          birthdate: date,
          direction,
          phone,
          email,
        });
        getPatients();
      } else {
        const response = await api.put(`/patient/${idP}`, {
          name,
          birthdate: date,
          direction,
          phone,
          email,
        });
        getPatients();
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
    setBirthdate(null);
    setDirection("");
    setPhone("");
    setEmail("");
  };

  const getPatients = async () => {
    try {
      const response = await api.get("/patient");
      setPatients(response.data);
      setTablePatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchPatient(e.target.value);
  };

  const searchPatient = (searchedP) => {
    var filteredPatients = tablePatients.filter((patient) => {
      if (patient.name.toLowerCase().includes(searchedP.toLowerCase())) {
        return patient;
      }
    });
    setPatients(filteredPatients);
  };

  const editPatient = async (id) => {
   
    
    try {
      const response = await api.get(`/patient/${id}`);

      setEditing(true);
      setShowModal(true);
      setIdP(response.data.idPatient);
      setName(response.data.name);

      const patientBirthdate = formatDate(response.data.birthdate);
      const parsedBirthdate = parseDate(patientBirthdate);
      setBirthdate(parsedBirthdate);

      setDirection(response.data.direction);
      setPhone(response.data.phone);
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatient = async (id) => {
    try {
      const response = await api.delete(`/patient/${id}`);
      getPatients();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (confirm) => {
    if (confirm) {
      await deletePatient(idP);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div>
      <section className="bg-gray-50 py-3 border-b-2">
        <SearchBar
          search={search}
          handleSearch={handleSearch}
          placeholder="Buscar paciente"
        />
      </section>
      <div className="flex justify-between items-center px-6 py-6">
        <h1 className=" text-3xl ">Pacientes</h1>
        <Button color="dark" onClick={() => setShowModal(true)}>
          Añadir pacientes
        </Button>
      </div>

      <div className="overflow-x-auto px-6">
        <GenericTable
          headers={headers}
          data={patients}
          values={values}
          keyValue={keyTable}
          editRow={(e) => editPatient(e)}
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
              {editing ? "Editar Paciente" : "Añadir Paciente"}
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
                <div className="w-full max-w-xl flex flex-row gap-4 py-2">
                  <DatePicker
                    label="Fecha de Nacimiento"
                    labelPlacement="outside"
                    variant="flat"
                    showMonthAndYearPickers
                    value={birthdate}
                    onChange={setBirthdate}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Direccion" value="Direccion" />
                </div>
                <TextInput
                  id="direccion"
                  onChange={(e) => setDirection(e.target.value)}
                  value={direction}
                  placeholder="Direccion"
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

export default Patient;
