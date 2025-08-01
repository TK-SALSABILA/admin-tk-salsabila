import ModalCreateClass from "@/components/form/ModalClassForm";
import ButtonOpenModal from "@/components/shared/ButtonOpenModal";
import { ReusableFilter } from "@/components/shared/ReusableFilter";
import { useState } from "react";

const ClassListFIlter = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex justify-end gap-2">
      <ReusableFilter
        filters={[]}
        searchConfig={{ placeholder: "Cari Kelas", searchKey: "search" }}
      />
      <ButtonOpenModal
        onClick={() => setOpen(true)}
        text="Tambah Kelas"
        iconPosition="left"
      />
      <ModalCreateClass mode="create" open={open} setOpen={setOpen} />
    </div>
  );
};

export default ClassListFIlter;
