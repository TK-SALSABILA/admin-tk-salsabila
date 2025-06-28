"use client";

import React from "react";
import OperationalFilter from "./OperationalFilter";
import OperationalTable from "./OperationalTable";

const OperationalTab = () => {
  return (
    <section className="space-y-4">
      <OperationalFilter />
      <OperationalTable/>
    </section>
  );
};

export default OperationalTab;
