import StudentsPageDetail from "@/components/page/studentDetail/StudentsPageDetail";

export default async function StudentsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StudentsPageDetail id={id} />;
}
