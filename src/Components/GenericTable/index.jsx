import { Table, Dropdown } from "flowbite-react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useState } from "react";
import ModalDelete from "../ModalDelete";

const GenericTable = ({
  headers,
  data,
  values,
  keyValue,
  editRow,
  setIdDelete,
  deleteMethod,
  sortMehod,
}) => {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const sortedData = sortMehod ? sortMehod(data) : data;

  const handleDeleteChange = (confirm) => {
    if (confirm) {
      deleteMethod(confirm);
      setShowModalDelete(false);
    } else {
      setShowModalDelete(false);
    }
  };

  //Metodo para evaluar si hay un punto en el valor y obtener el valor de un objeto anidado
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div>
      <Table hoverable>
        <Table.Head>
          {headers.map((header, index) => (
            <Table.HeadCell key={index}>{header}</Table.HeadCell>
          ))}
          <Table.HeadCell key="actions">Acciones</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {sortedData.map((row) => (
            <Table.Row className="bg-white" key={row[keyValue]}>
              {values.map((value, index) => (
                <Table.Cell key={index}>{getValue(row, value)}</Table.Cell>
              ))}
              <Table.Cell>
                <Dropdown label="" inline>
                  <Dropdown.Item
                    icon={HiPencil}
                    onClick={(e) => editRow(row[keyValue])}
                  >
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={HiTrash}
                    onClick={(e) => {
                      setIdDelete(row[keyValue]);
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

      <ModalDelete
        show={showModalDelete}
        handleClose={() => setShowModalDelete(false)}
        handleDelete={handleDeleteChange}
      />
    </div>
  );
};

export default GenericTable;
