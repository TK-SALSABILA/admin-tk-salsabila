import FinancePage from "@/components/pages/finance/FinancePage";
import { Suspense } from "react";

const Finance = () => {
  return (
    <Suspense>
      <FinancePage />;
    </Suspense>
  );
};

export default Finance;
