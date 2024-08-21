import ProtectedComponent from "../../Components/Protected";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { HiOutlineUserGroup, HiOutlineCalendar } from "react-icons/hi";
import api from "../../Api/api";

function Admin() {
  const token = window.localStorage.getItem("token");
  const [patients, setPatients] = useState([]);
  const [dates, setDates] = useState([]);
  const [date, setDate] = useState(today(getLocalTimeZone()));

  const username = window.localStorage.getItem("username");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get("/patient");
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDates = async () => {
      try {
        const response = await api.get("/date?date=" + date.toString());
        setDates(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
    fetchDates();
  }, []);

  return (
    <>
      <section className="bg-gray-50 p-5 border-b-2 h-20 flex items-center justify-between ">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ProtectedComponent token={token} />
      </section>
      <section className="flex flex-row justify-between p-5">
        <Card className="w-[600px] bg-slate-950 h-44" shadow="md" isBlurred>
          <CardHeader className="felx flex-col items-start">
            <h2 className="text-white text-xl font-semibold">
              Pacientes registrados
            </h2>
            <p className="text-gray-500 text-sm">
              Pacientes que se encuentran en la base de datos
            </p>
          </CardHeader>
          <CardBody className="flex flex-row justify-between items-center px-5 ">
            <p className="text-white text-4xl font-bold">{patients.length}</p>
            <HiOutlineUserGroup className="text-gray-500 text-6xl" />
          </CardBody>
        </Card>

        <Card className="w-[600px] bg-gray-100 h-44" shadow="md" isBlurred>
          <CardHeader className="felx flex-col items-start">
            <h2 className="text-slate-950 text-xl font-semibold">
              Citas de hoy
            </h2>
            <p className="text-gray-500 text-sm">
              Citas programadas para el día de hoy
            </p>
          </CardHeader>
          <CardBody className="flex flex-row justify-between items-center px-5 ">
            <p className="text-slate-950 text-4xl font-bold">{dates.length}</p>
            <HiOutlineCalendar className="text-gray-500 text-6xl" />
          </CardBody>
        </Card>
      </section>
    </>
  );
}

export default Admin;
