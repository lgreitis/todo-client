import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Input, Modal, Popover, Text } from "@geist-ui/core";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useCreateInviteMutation } from "../../../api/invitesApi";

interface Props {
  organizationId: string;
}

const CreateInviteModal = NiceModal.create((props: Props) => {
  const { organizationId } = props;
  const modal = useModal();
  const [selected, setSelected] = useState<Date>();
  const [submitInvite, { isLoading }] = useCreateInviteMutation();

  return (
    <Modal visible={modal.visible} onClose={modal.remove}>
      <Modal.Title>New invite</Modal.Title>
      <Modal.Content>
        <div
          css={css`
            .tooltip {
              width: 100% !important;
            }
          `}
        >
          <Popover
            content={
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
              />
            }
          >
            <div
              css={css`
                width: 100%;
              `}
            >
              <Input
                label="Expiration Date"
                readOnly
                width="100%"
                value={selected?.toLocaleDateString() || ""}
              />
            </div>
          </Popover>
        </div>
      </Modal.Content>
      <Modal.Action passive onClick={modal.remove} disabled={isLoading}>
        Cancel
      </Modal.Action>
      <Modal.Action
        loading={isLoading}
        onClick={() => {
          if (!selected) {
            return;
          }
          submitInvite({ expirationDate: selected.getTime(), organizationId })
            .unwrap()
            .then(() => {
              modal.remove();
            });
        }}
      >
        <Text type="error">Create</Text>
      </Modal.Action>
    </Modal>
  );
});

export default CreateInviteModal;
