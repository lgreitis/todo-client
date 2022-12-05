import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, Text } from "@geist-ui/core";

interface Props {
  itemType: string;
}

const ConfirmDelete = NiceModal.create((props: Props) => {
  const { itemType } = props;
  const modal = useModal();

  return (
    <Modal visible={modal.visible} onClose={modal.hide}>
      <Modal.Title>Delete {itemType}</Modal.Title>
      <Modal.Content>
        Are you sure you want to delete this {itemType}?
      </Modal.Content>
      <Modal.Action passive onClick={modal.hide}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={modal.hide}>
        <Text type="error">Delete</Text>
      </Modal.Action>
    </Modal>
  );
});

export default ConfirmDelete;
