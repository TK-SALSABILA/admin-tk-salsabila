import ParrentEditPage from "@/components/pages/students/studentEdit/parrent-edit/ParrentEditPage";
import React from "react";

export default async function EditParent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ParrentEditPage studentId={id}/>
}
