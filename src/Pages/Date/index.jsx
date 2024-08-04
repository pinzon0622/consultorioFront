import { Calendar, Select, SelectItem, TimeInput } from "@nextui-org/react";
import {
  today,
  getLocalTimeZone,
  isWeekend,
  Time,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { useState, useEffect } from "react";
import { Button, Modal, Label,TextInput } from "flowbite-react";
import SearchBar from "../../Components/SearchBar";
import api from "../../Api/api";
import GenericTable from "../../Components/GenericTable";

const DateComponent = () => {
  const [date, setDate] = useState(today(getLocalTimeZone()));
  const { locale } = useLocale();
  const isInvalid = isWeekend(date, locale);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  const [dentist, setDentist] = useState([]);
  const [allDentists, setAllDentists] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedService, setSelectedService] = useState(0);

  const [patient, setPatient] = useState("");
  const [idDentist, setIdDentist] = useState(null);
  const [hour, setHour] = useState("");
  const [service, setService] = useState(new Set());
  const [idD, setIdD] = useState("");

  const services = [
    { key: "CLEANING", label: "Limpieza" },
    { key: "FILLING", label: "Relleno" },
    { key: "EXTRACTION", label: "Extracción" },
    { key: "CHECKUP", label: "Revisión" },
  ];

  const headers = ["Paciente", "Fecha", "Hora", "Servicio", "Doctor"];
  const values = ["patient", "date", "hour", "service", "dentist.name"];
  const keyTable = "idDate";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = date.toString().split("T")[0];
    const formattedHour = hour.toString();
    const formattedService = Array.from(service).join(",");
    try {
      if (!editing) {
        const response = await api.post("/date", {
          patient,
          idDentist,
          date: formattedDate,
          hour: formattedHour,
          service: formattedService,
        });
        getDate();
      } else {
        const response = await api.put(`/date/${idD}`, {
          patient,
          idDentist,
          date: formattedDate,
          hour: formattedHour,
          service: formattedService,
        });
        getDate();
        setEditing(false);
      }
    } catch (error) {
      console.error(error);
    }

    handleReset();
    setShowModal(false);
  };

  const handleReset = () => {
    setIdD("");
    setPatient("");
    setIdDentist("");
    setHour("");
    setService("");
    setSelectedTime(null);
    setSelectedDentist("");
    setSelectedService(0);
  };

  const handleSelectDentist = (e) => {
    setDentist(e.target.value);
    filterDatabyDentist(e.target.value);
  };

  const handleSelectAllDentists = (e) => {
    setIdDentist(e.target.value);
  };

  const handleSelectService = (keys) => {
    setService(keys);
  };

  const filterDatabyDentist = (dentist) => {
    var filteredTableData = tableData.filter((data) => {
      if (data.idDentist == dentist) {
        return data;
      }
    });
    setData(filteredTableData);
  };

  const editAppointment = async (id) => {
    try {
      const response = await api.get(`/date/${id}`);
      setEditing(true);
      setShowModal(true);
      setIdD(id);
      setPatient(response.data.patient);
      
      const [hour, minute] = response.data.hour.split(":").map(Number);
      const time = new Time(hour, minute);
      setSelectedTime(time);
      setHour(time);

      setIdDentist(response.data.idDentist.toString());
      setSelectedDentist([response.data.idDentist.toString()]);

      const findService = services.filter((service) => response.data.service.includes(service.label));
      setSelectedService(findService.map((service) => service.key));
      setService(findService.map((service) => service.key));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await api.delete(`/date/${id}`);
      getDate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (confirm) => {
    try {
    if (confirm) {
      await deleteAppointment(idD);
    }
    }catch (error) {
      console.error(error);
    }
  };



  const uniqueDentists = (data) => {
    const seen = new Set();
    return data.filter((item) => {
      const duplicate = seen.has(item.idDentist);
      seen.add(item.idDentist);
      return !duplicate;
    });
  };

  const getDate = async () => {
    try {
      const response = await api.get("/date?date=" + date.toString());
      const resDen = await api.get("/dentist");
      setAllDentists(resDen.data);
      setData(response.data);
      setTableData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDate();
  }, [date]);

  const sortDateByHour = (appointments) => {
    return appointments.sort((a, b) => {
      if (a.hour < b.hour) {
        return -1;
      }
      if (a.hour > b.hour) {
        return 1;
      }
      return 0;
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <section className="bg-gray-50 py-3 border-b-2">
        <SearchBar
          //   search={search}
          //   handleSearch={handleSearch}
          placeholder="Buscar Cita"
        />
      </section>
      <div className="flex justify-between items-center px-6 py-6">
        <h1 className=" text-3xl ">Citas</h1>
        <Button color="dark" onClick={() => setShowModal(true)}>
          Añadir Cita
        </Button>
      </div>
      <div className="flex flex-1 justify-center gap-14 items-center w-full ">
        <section className="">
          <div className="flex w-full max-w-xs flex-col gap-2 pb-7">
            <Select
              label="Doctor"
              placeholder="Seleccione el Dentista"
              selectedKeys={dentist}
              className="max-w-xs"
              onChange={handleSelectDentist}
            >
              {uniqueDentists(tableData).map((date) => (
                <SelectItem key={date.idDentist}>
                  {date.dentist.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Calendar
            aria-label="Date (Invalid on weekends)"
            errorMessage={isInvalid ? "Cerrado los fines de semana" : undefined}
            language="es"
            isInvalid={isInvalid}
            value={date}
            onChange={setDate}
          />
        </section>
        <section className="overflow-x-auto h-2/3 w-2/3">
          <GenericTable
            headers={headers}
            data={data}
            values={values}
            keyValue={keyTable}
            sortMehod={sortDateByHour}
            editRow={(e) => editAppointment(e)}
            setIdDelete={setIdD}
            deleteMethod={handleDelete}
          />
        </section>
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
          <div className="space-y-6 gap-5">
            <h3 className="text-xl font-medium text-gray-900 ">
              {editing ? "Editar Cita" : "Añadir Cita"}
            </h3>
            <form onSubmit={handleSubmit } className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="Nombre del Paciente"
                    value="Nombre del Paciente"
                  />
                </div>
                <TextInput
                  className="border-none"
                  id="name"
                  onChange={(e) => setPatient(e.target.value)}
                  value={patient}
                  placeholder="Nombre del Paciente"
                  autoFocus
                  required
                />
              </div>
              <div>
                <div>
                  <TimeInput
                    label="Event Time"
                    onChange={setHour}
                    defaultValue={selectedTime}
                  />
                </div>
              </div>
              <div>
                <Select
                  label="Doctor"
                  placeholder="Seleccione el Dentista"
                  selectedKeys={idDentist}
                  className="max-w-sm"
                  onChange={handleSelectAllDentists}
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
                <Select
                  label="Servicio"
                  placeholder="Seleccione el Servicio"
                  selectedKeys={service}
                  className="max-w-sm"
                  onSelectionChange={handleSelectService}
                  defaultSelectedKeys={selectedService}
                >
                  {services.map((service) => (
                    <SelectItem key={service.key}>{service.label}</SelectItem>
                  ))}
                </Select>
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

export default DateComponent;
