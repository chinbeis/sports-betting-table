import { AddBetForm } from "@/components/AddBetForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AddBetPage() {
  return (
    <main className="container mx-auto py-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
          Add a New Bet
        </h1>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </header>
      <AddBetForm />
    </main>
  );
}
