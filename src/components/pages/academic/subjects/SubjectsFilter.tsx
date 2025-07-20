import ModalSubjectsForm from "@/components/form/ModalSubjectsForm";
import ButtonOpenModal from "@/components/shared/ButtonOpenModal";
import { ReusableFilter } from "@/components/shared/ReusableFilter";
import { useState } from "react";

const SubjectsFilter = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-end gap-2">
      <ReusableFilter
        filters={[]}
        searchConfig={{ placeholder: "Cari Kelas", searchKey: "search" }}
      />
      <ButtonOpenModal
        onClick={() => setOpen(true)}
        text="Tambah Matpel"
        iconPosition="left"
      />
      <ModalSubjectsForm mode="create" open={open} setOpen={setOpen} />
    </div>
  );
};

export default SubjectsFilter;
