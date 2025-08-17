import PersonalEditPage from "@/components/pages/students/studentEdit/personal-edit/PersonalEditPage";
import React from "react";

export default async function EditPersonal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PersonalEditPage id={id} />;
}
