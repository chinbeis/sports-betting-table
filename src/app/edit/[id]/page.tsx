import { prisma } from "@/lib/db";
import { EditBetForm } from "@/components/EditBetForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EditBetPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const bet = await prisma.bet.findUnique({
    where: { id },
  });

  if (!bet) {
    return <div>Bet not found</div>;
  }

  return (
    <main className="container mx-auto py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Edit Bet</h1>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </header>
      <EditBetForm bet={bet} />
    </main>
  );
}
