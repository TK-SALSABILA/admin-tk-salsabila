import CustomCard from "@/components/shared/CustomCard";
import { paymentData } from "@/data/studentsData";
import { CheckCircle } from "lucide-react";
import React from "react";
import StudentSavingTable from "./StudentSavingTable";

const StudentSavingTab = () => {
  // Filter berdasarkan jenis pembayaran
  const sppPayments = paymentData.filter(
    (item) => item.jenisPembayaran === "SPP"
  );

  // Hitung total pembayaran
  const totalAmount = paymentData.reduce((total, item) => {
    const amount = parseInt(item.jumlah.replace(/[^\d]/g, ""));
    return total + amount;
  }, 0);

  const totalDenda = paymentData
    .filter((item) => item.jenisPembayaran === "Denda")
    .reduce((total, item) => {
      const amount = parseInt(item.jumlah.replace(/[^\d]/g, ""));
      return total + amount;
    }, 0);

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomCard
          title="Total Tabungan"
          headerRight={<CheckCircle />}
          children={
            <div className="space-y-2">
              <p className="text-xl font-semibold">
                {`Rp${totalAmount.toLocaleString("id-ID")}`}
              </p>
              <p className="text-xs text-muted-foreground">
                dari {paymentData.length} pembayaran
              </p>
            </div>
          }
        />
        <CustomCard
          title="Total Denda"
          headerRight={<CheckCircle />}
          children={
            <div>
              <p className="text-xl font-semibold">
                {`Rp${totalDenda.toLocaleString("id-ID")}`}
              </p>
              <p className="text-xs text-muted-foreground">
                dari {paymentData.length} pembayaran
              </p>
            </div>
          }
        />
      </div>
      <StudentSavingTable />
    </div>
  );
};

export default StudentSavingTab;
