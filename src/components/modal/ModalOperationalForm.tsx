import React from "react";
import ReusableModal from "../shared/ReusableModal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const ModalOperationalForm = () => {
  return (
    <ReusableModal
      title="Form Operasional"
      trigger={
        <Button>
          <Plus />
        </Button>
      }
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
      officia officiis quis eius ipsa ad fugiat quidem aut, numquam dolorum
      aperiam explicabo sed tenetur! Autem a perspiciatis exercitationem.
      Quidem, aspernatur!
    </ReusableModal>
  );
};

export default ModalOperationalForm;
