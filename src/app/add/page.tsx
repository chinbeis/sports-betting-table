import { AddBetForm } from "@/components/AddBetForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddBetPage() {
  return (
    <main className="container mx-auto py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Add a New Bet</h1>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </header>
      <AddBetForm />
    </main>
  );
}
