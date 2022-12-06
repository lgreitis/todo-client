import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, useToasts } from "@geist-ui/core";
import { Field, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEditOrganizationMutation } from "../../../api/organizationApi";
import CustomInput from "../../../components/input/CustomInput";

export const EditOrganizationSchema = z
  .object({ name: z.string().min(2) })
  .strict();

interface Props {
  id: string;
  name: string;
}

const EditOrganization = NiceModal.create((props: Props) => {
  const { id, name } = props;
  const modal = useModal();
  const { setToast } = useToasts();
  const [submitOrganization, { isLoading }] = useEditOrganizationMutation();

  return (
    <Formik
      initialValues={{ name }}
      validationSchema={toFormikValidationSchema(EditOrganizationSchema)}
      onSubmit={async (vals) => {
        await submitOrganization({ name: vals.name, organizationId: id })
          .unwrap()
          .then(() => {
            setToast({ text: "Organization edited", type: "success" });
            modal.remove();
          })
          .catch(() => {
            setToast({
              text: "Error occured when editing organization",
              type: "error",
            });
          });
      }}
    >
      {({ submitForm }) => (
        <>
          <Modal visible={modal.visible} onClose={modal.remove}>
            <Modal.Title>Add new organization</Modal.Title>
            <Modal.Content>
              <Field
                name="name"
                scale={4 / 3}
                width="100%"
                placeholder="Name"
                component={CustomInput}
              />
            </Modal.Content>
            <Modal.Action passive onClick={modal.remove} disabled={isLoading}>
              Cancel
            </Modal.Action>
            <Modal.Action
              onClick={() => {
                submitForm();
              }}
              loading={isLoading}
            >
              Edit
            </Modal.Action>
          </Modal>
        </>
      )}
    </Formik>
  );
});

export default EditOrganization;
