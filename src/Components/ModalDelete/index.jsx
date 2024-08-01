import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, Button } from "flowbite-react";

const ModalDelete = ({ show, handleClose, handleDelete }) => {
  return (
    <Modal show={show} size="md" onClose={handleClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
          <h3 className="mb-5 text-lg font-normal text-gray-500 ">
            ¿Estás seguro de eliminar esto?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={() => {
                handleDelete(true);
              }}
            >
              {"Si, eliminar"}
            </Button>
            <Button color="gray" onClick={() => handleDelete(false)}>
              No, cancelar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDelete;