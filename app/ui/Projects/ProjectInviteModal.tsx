"use client";
import { removeFromTeam, updateProjectApproval } from "@/app/lib/actions";
import { ProjectInviteModalProps } from "@/definition";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";

const ProjectInviteModal: React.FC<ProjectInviteModalProps> = ({
  email,
  projectData,
  setOpenModal,
  openModal,
}) => {
  const router = useRouter();

  const handleAcceptInvite = async (id: string) => {
    console.log(id);

    const res = await updateProjectApproval(id, email);
    if (res) {
      router.push(`/projects/${id}`);
    }
  };

  const handleCancelInvite = async (id: string) => {
    const res = await removeFromTeam(id, email);
    console.log(res);
  };

  const stopPropagationOnModal = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  return (
    <Modal
      show={openModal}
      size="xl"
      onClose={() => setOpenModal(false)}
      dismissible
      popup
      onClick={stopPropagationOnModal}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          {" "}
          <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
            <b> {projectData?.createdBy} </b> has invited you to get started on
            the <b>{projectData?.title}</b> Project. Once you accept, you’ll be
            able to access it.
          </h3>
          <div className="flex justify-center gap-4 z-10">
            <Button
              color="blue"
              onClick={() => handleAcceptInvite(projectData?.id as string)}
            >
              {"Accept Invitation"}
            </Button>
            <Button
              color="gray"
              onClick={() => handleCancelInvite(projectData?.id as string)}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProjectInviteModal;
