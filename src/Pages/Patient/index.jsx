import {
  Table,
  Button,
  Modal,
  Label,
  TextInput,
  Dropdown,
} from "flowbite-react";
import { HiPencil, HiTrash, HiOutlineExclamationCircle } from "react-icons/hi";
import DatePicker from "../../Components/DatePicker";
import SearchBar from "../../Components/SearchBar";
import ModalDelete from "../../Components/ModalDelete";
import api from "../../Api/api";
import { useEffect, useState } from "react";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [tablePatients, setTablePatients] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [idP, setIdP] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [direction, setDirection] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      try {
        const response = await api.post("/patient", {
          name,
          birthdate,
          direction,
          phone,
          email,
        });
        getPatients();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await api.put(`/patient/${idP}`, {
          name,
          birthdate,
          direction,
          phone,
          email,
        });
        getPatients();
        setEditing(false);
      } catch (error) {
        console.error(error);
      }
    }
    handleReset();
    setShowModal(false);
  };

  const handleReset = () => {
    setIdP("");
    setName("");
    setBirthdate("");
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
      setBirthdate(response.data.birthdate);
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
      setShowModalDelete(false);
    }else{
      setShowModalDelete(false);
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
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Nombre</Table.HeadCell>
            <Table.HeadCell>Fecha Nacimiento</Table.HeadCell>
            <Table.HeadCell>Direccion</Table.HeadCell>
            <Table.HeadCell>Telefono</Table.HeadCell>
            <Table.HeadCell>Correo</Table.HeadCell>
            <Table.HeadCell>Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {patients.map((patient) => (
              <Table.Row className="bg-white" key={patient.idPatient}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 ">
                  {patient.name}
                </Table.Cell>
                <Table.Cell>{patient.birthdate}</Table.Cell>
                <Table.Cell>{patient.direction}</Table.Cell>
                <Table.Cell>{patient.phone}</Table.Cell>
                <Table.Cell>{patient.email}</Table.Cell>
                <Table.Cell>
                  <Dropdown label="" inline>
                    <Dropdown.Item
                      icon={HiPencil}
                      onClick={(e) => editPatient(patient.idPatient)}
                    >
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={HiTrash}
                      onClick={(e) => {
                        setIdP(patient.idPatient);
                        setShowModalDelete(true);
                      }}
                      className="text-red-500"
                    >
                      Eliminar
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
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
                <div>
                  <Label htmlFor="Fecha" value="Fecha de Nacimiento" />
                </div>
                <DatePicker
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
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

      <ModalDelete
        show={showModalDelete}
        handleClose={() => setShowModalDelete(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Patient;
