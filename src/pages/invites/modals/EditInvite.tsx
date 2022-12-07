import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { css } from "@emotion/react";
import { Checkbox, Input, Modal, Popover, useToasts } from "@geist-ui/core";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useEditInviteMutation } from "../../../api/invitesApi";

interface Props {
  organizationId: string;
  disabled: boolean;
  expirationDate: number;
}

const EditInviteModal = NiceModal.create((props: Props) => {
  const { organizationId, disabled, expirationDate } = props;
  const modal = useModal();
  const { setToast } = useToasts();
  const [selected, setSelected] = useState<Date | undefined>(
    new Date(expirationDate)
  );
  const [disabledState, setDisabledState] = useState(disabled);
  const [submitEdit, { isLoading }] = useEditInviteMutation();

  const submit = () => {
    if (!selected) {
      return;
    }

    submitEdit({
      id: organizationId,
      expirationDate: selected.getTime(),
      disabled: disabledState,
    });

    setToast({ text: "Invite updated", type: "success" });

    modal.remove();
  };

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
          <Checkbox
            pt={4 / 3}
            scale={4 / 3}
            width="100%"
            onClick={() => setDisabledState((prev) => !prev)}
            checked={disabledState}
          >
            Disabled?
          </Checkbox>
        </div>
      </Modal.Content>
      <Modal.Action passive onClick={modal.remove} disabled={isLoading}>
        Cancel
      </Modal.Action>
      <Modal.Action
        loading={isLoading}
        onClick={() => {
          submit();
        }}
      >
        Update
      </Modal.Action>
    </Modal>
  );
});

export default EditInviteModal;
