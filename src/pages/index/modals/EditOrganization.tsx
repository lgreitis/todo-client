import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Input, Modal } from "@geist-ui/core";

const EditOrganization = NiceModal.create(() => {
  const modal = useModal();

  return (
    <Modal visible={modal.visible} onClose={modal.hide}>
      <Modal.Title>Edit organization</Modal.Title>
      <Modal.Content>
        <Input placeholder="Name" width="100%" />
      </Modal.Content>
      <Modal.Action passive onClick={modal.hide}>
        Cancel
      </Modal.Action>
      <Modal.Action onClick={modal.hide}>Edit</Modal.Action>
    </Modal>
  );
});

export default EditOrganization;
