import { getPortalLinkById } from "@/lib/queries";
import PortalLinkForm from "@/components/admin/PortalLinkForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditPortalLinkPage({ params }) {
  const link = await getPortalLinkById(params.id);
  if (!link) notFound();

  return (
    <div>
      <h1 className="font-serif font-bold text-2xl mb-6">Portal ჩანაწერის რედაქტირება</h1>
      <PortalLinkForm initial={link} id={params.id} />
    </div>
  );
}
