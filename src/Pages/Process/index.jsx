import { Button, Modal, Label, TextInput } from "flowbite-react";
import SearchBar from "../../Components/SearchBar";
import api from "../../Api/api";
import { useEffect, useState } from "react";
import GenericTable from "../../Components/GenericTable";

const Process = () => {
  const [search, setSearch] = useState("");
  const [process, setProcess] = useState([]);
  const [tableProcess, setTableProcess] = useState([]);
  const [editing, setEditing] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [idP, setIdP] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  const headers = ["Nombre", "Precio", "Duración (H)"];
  const values = ["name", "price", "duration"];
  const keyTable = "idProcess";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!editing) {
        const response = await api.post("/process", {
          name,
          price,
          duration,
        });
        getProcess();
      } else {
        const response = await api.put(`/process/${idP}`, {
          name,
          price,
          duration,
        });
        getProcess();
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
    setPrice(0);
    setDuration(0);
  };

  const getProcess = async () => {
    try {
      const response = await api.get("/process");
      setProcess(response.data);
      setTableProcess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    searchProcess(e.target.value);
  };

  const searchProcess = (searchedP) => {
    var filteredData = tableProcess.filter((process) => {
      if (process.name.toLowerCase().includes(searchedP.toLowerCase())) {
        return process;
      }
    });
    setProcess(filteredData);
  };

  const editProcess = async (id) => {
    try {
      const response = await api.get(`/process/${id}`);
      setEditing(true);
      setShowModal(true);
      setIdP(response.data.idProcess);
      setName(response.data.name);
      setPrice(response.data.price);
      setDuration(response.data.duration);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProcess = async (id) => {
    try {
      const response = await api.delete(`/process/${id}`);
      getProcess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (confirm) => {
    if (confirm) {
      deleteProcess(idP);
    }
  };

  useEffect(() => {
    getProcess();
  }, []);

  return (
    <div>
      <section className="bg-gray-50 py-3 border-b-2">
        <SearchBar
          search={search}
          handleSearch={handleSearch}
          placeholder="Buscar proceso"
        />
      </section>
      <div className="flex justify-between items-center px-6 py-6">
        <h1 className=" text-3xl ">Procesos</h1>
        <Button color="dark" onClick={() => setShowModal(true)}>
          Añadir Proceso
        </Button>
      </div>

      <div className="overflow-x-auto px-6">
        <GenericTable
          headers={headers}
          data={process}
          values={values}
          keyValue={keyTable}
          editRow={(e) => editProcess(e)}
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
              {editing ? "Editar Proceso" : "Añadir Proceso"}
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
                  <Label htmlFor="price" value="Precio" />
                </div>
                <TextInput
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                  placeholder="Precio"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="duration" value="Duracion" />
                </div>
                <TextInput
                  id="duration"
                  onChange={(e) => setDuration(e.target.value)}
                  value={duration}
                  type="number"
                  placeholder="Duracion en horas"
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

export default Process;
