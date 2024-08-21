import SearchBar from "../../Components/SearchBar";
import { Button, Dropdown, Modal, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Textarea,
  Divider,
  DateInput,
  Select,
  SelectItem,
} from "@nextui-org/react";
import api from "../../Api/api";
import { HiPencil, HiTrash } from "react-icons/hi";
import {
  today,
  getLocalTimeZone,
  parseDate,
  isWeekend,
  Time,
} from "@internationalized/date";
import  ModalDelete  from "../../Components/ModalDelete";

const DentalHistory = () => {
  const [search, setSearch] = useState("");
  const [dentalHistory, setDentalHistory] = useState([]);
  const [allDentists, setAllDentists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showObservations, setShowModalObservations] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patient, setPatient] = useState([]);
  const [listPatient, setListPatient] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedProcess, setSelectedProcess] = useState("");
  const [selectedHistory, setSelectedHistory] = useState("");

  const [idD, setIdD] = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [observations, setObservations] = useState("");
  const [date, setDate] = useState(null);
  const [processes, setProcesses] = useState([]);
  const [idProcess, setIdProcess] = useState("");
  const [idDentist, setIdDentist] = useState("");

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDate(today(getLocalTimeZone()));
    const formattedDate = date.toString().split("T")[0];
    try {
      if (!editing) {
        const response = await api.post("/dentalHistory", {
          diagnostic,
          observations,
          date: formattedDate,
          idProcess,
          idDentist,
          idPatient: selectedPatient.idPatient,
        });
        console.log(response);
      } else {
        const response = await api.put(`/dentalHistory/${idD}`, {
          diagnostic,
          observations,
          idProcess,
          date: formattedDate,
          idDentist,
          idPatient: selectedPatient.idPatient,
        });
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
    handleReset();
    getDentalHistory();
    setShowModal(false);
  };

  const handleReset = () => {
    setDiagnostic("");
    setObservations("");
    setDate(null);
    setIdProcess("");
    setIdDentist("");
    setSelectedDentist("");
    setSelectedProcess("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchPatient(e.target.value);
  };

  const searchPatient = (searchedP) => {
    const filteredPatient = listPatient.filter((patient) => {
      if (patient.name.toLowerCase().includes(searchedP.toLowerCase())) {
        return patient;
      }
    });
    setPatient(filteredPatient);
  };

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const getPatients = async () => {
    try {
      const response = await api.get("/patient");
      setPatient(response.data);
      setListPatient(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDentalHistory = async () => {
    try {
      const response = await api.get(
        "/dentalHistory?patient_id=" + selectedPatient?.idPatient
      );
      setDentalHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectDentists = (e) => {
    setIdDentist(e.target.value);
  };

  const handleSelectProcesses = async (e) => {
    setIdProcess(e.target.value);
  };

  const editHistory = async (id) => {
    try {
      const response = await api.get("/dentalHistory/" + id);
      const history = response.data;
      setEditing(true);
      setShowModal(true);
      setDiagnostic(history.diagnostic);
      setObservations(history.observations);

      const dateFormat = formatDate(history.date);
      const dateP = parseDate(dateFormat);
      setDate(dateP);

      setIdProcess(history.idProcess.toString());
      setSelectedProcess([history.idProcess.toString()]);

      setIdDentist(history.idDentist.toString());
      setSelectedDentist([history.idDentist.toString()]);
      setIdD(history.idDentalHistory);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHistory = async (id) => {
    try {
      const response = await api.delete(`/dentalHistory/${id}`);
      getDentalHistory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (confirm) => {
    try {
      if (confirm) {
        deleteHistory(idD);
      }
      setShowModalDelete(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPatients();
    getDentalHistory();
  }, [selectedPatient]);

  useEffect(() => {
    const getDentists = async () => {
      try {
        const response = await api.get("/dentist");
        setAllDentists(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getProcesses = async () => {
      try {
        const response = await api.get("/process");
        setProcesses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProcesses();
    getDentists();
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
        <h1 className=" text-3xl ">Historia Dental</h1>
        <Button color="dark" onClick={() => setShowModal(true)}>
          Nuevo Registro
        </Button>
      </div>

      <div className="flex justify-around ">
        <section>
          <Card className="w-[400px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <h3 className="text-xl">Pacientes</h3>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <ul>
                {patient.map((patient) => (
                  <li
                    key={patient.idPatient}
                    className={`p-2 text-center  rounded-md cursor-pointer ${
                      selectedPatient?.idPatient === patient.idPatient
                        ? "bg-black text-primary-foreground"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handlePatientSelect(patient)}
                  >
                    {patient.name}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </section>
        <section>
          <Card className="w-[800px]">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <h3 className="text-xl">
                  {selectedPatient
                    ? "Historia dental de " + selectedPatient.name
                    : "Historia dental"}
                </h3>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <ul className="space-y-4">
                {dentalHistory.map((history) => (
                  <li key={history.idDentalHistory} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-md font-semibold">
                          {history.process.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {history.date} - {history.dentist.name}
                        </p>
                      </div>
                      <div className="flex ">
                        <div className="text-sm text-gray-600">
                          {history.diagnostic}
                          <br />
                          <Button
                            size={"xs"}
                            color={"dark"}
                            className="my-2"
                            onClick={() => {
                              setShowModalObservations(true);
                              setSelectedHistory(history);
                            }}
                          >
                            Observaciones
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Dropdown label="" inline>
                            <Dropdown.Item
                              icon={HiPencil}
                              onClick={() =>
                                editHistory(history.idDentalHistory)
                              }
                            >
                              Editar
                            </Dropdown.Item>
                            <Dropdown.Item
                              icon={HiTrash}
                              onClick={() => {
                                setIdD(history.idDentalHistory);
                                setShowModalDelete(true);
                              }}
                              className="text-red-500"
                            >
                              Eliminar
                            </Dropdown.Item>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
            <Divider />
          </Card>
        </section>
      </div>

      <Modal
        show={showModal}
        size={"md"}
        popup
        onClose={() => {
          setShowModal(false);
          setEditing(false);
          handleReset();
        }}
      >
        <Modal.Header>
          <p className="text-md pl-3">
            {editing ? "Editar Historia Dental" : "Nueva Historia Dental"}
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="date" value="Fecha" />
                </div>
                <DateInput
                  id="date"
                  value={date}
                  onChange={setDate}
                  required
                  label="Fecha"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="dentist" value="Doctor" />
                </div>
                <Select
                  label="Doctor"
                  placeholder="Seleccione el Dentista"
                  selectedKeys={idDentist}
                  className="max-w-sm"
                  onChange={handleSelectDentists}
                  defaultSelectedKeys={selectedDentist}
                >
                  {allDentists.map((dentistAux) => (
                    <SelectItem key={dentistAux.idDentist}>
                      {dentistAux.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="process" value="Procesos" />
                </div>
                <Select
                  label="Proceso"
                  placeholder="Seleccione el Proceso"
                  selectedKeys={idProcess}
                  className="max-w-sm mb-2"
                  onChange={handleSelectProcesses}
                  defaultSelectedKeys={selectedProcess}
                >
                  {processes.map((process) => (
                    <SelectItem key={process.idProcess}>
                      {process.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <div>
                  <Label className="block mb-2" htmlFor="diagnostic" value="Diagnostico" />
                </div>
                <textarea
                  className="w-full border-none rounded-xl p-2 bg-gray-100 resize-none hover:bg-gray-200 h-24"
                  rezize="none"
                  placeholder="Escriba el diagnostico"
                  value={diagnostic}
                  onChange={(e) => setDiagnostic(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <div>
                  <Label className="block mb-2" htmlFor="observations" value="Observaciones" />
                </div>
                <textarea
                  className="w-full border-none rounded-xl p-2 bg-gray-100 resize-none hover:bg-gray-200 h-24"
                  rezize="none"
                  placeholder="Escriba las observaciones"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  required
                ></textarea>
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
      <Modal
        show={showObservations}
        size="md"
        popup
        onClose={() => {
          setShowModalObservations(false);
        }}
      >
        <Modal.Header>
          <p className="text-md">Observaciones</p>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p>{selectedHistory?.observations}</p>
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

export default DentalHistory;
