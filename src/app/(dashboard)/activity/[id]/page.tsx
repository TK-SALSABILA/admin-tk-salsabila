import ActivityDetailPage from "@/components/pages/activity-detail/ActivityDetailPage";

export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ActivityDetailPage id={id} />;
}
