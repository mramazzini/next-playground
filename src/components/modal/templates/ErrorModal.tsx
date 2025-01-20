import Modal from "../Modal";
import ModalBox from "../ModalBox";

interface ErrorModalProps {
  message: string;
  id: string;
}

const ErrorModal = ({ message, id }: ErrorModalProps) => {
  return (
    <Modal id={id}>
      <ModalBox>
        <p className="text-error text-lg font-bold">{message}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </ModalBox>
    </Modal>
  );
};

export default ErrorModal;
