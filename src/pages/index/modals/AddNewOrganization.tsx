import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Modal, useToasts } from "@geist-ui/core";
import { Field, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { usePostOrganizationMutation } from "../../../api/organizationApi";
import CustomInput from "../../../components/input/CustomInput";

export const CreateOrganizationSchema = z
  .object({ name: z.string().min(2) })
  .strict();

const AddNewOrganization = NiceModal.create(() => {
  const { setToast } = useToasts();
  const [submitOrganization, { isLoading }] = usePostOrganizationMutation();
  const modal = useModal();

  return (
    <Formik
      initialValues={{ name: "" }}
      validationSchema={toFormikValidationSchema(CreateOrganizationSchema)}
      onSubmit={async (vals) => {
        await submitOrganization({ name: vals.name }).unwrap();
        setToast({ text: "Created an organization", type: "success" });
        modal.remove();
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
              Add
            </Modal.Action>
          </Modal>
        </>
      )}
    </Formik>
  );
});

export default AddNewOrganization;
