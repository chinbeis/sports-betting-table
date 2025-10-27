import { prisma } from "@/lib/db";
import { BetTable } from "@/components/BetTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const bets = await prisma.bet.findMany({
    orderBy: {
      date: "desc",
    },
  });

  return (
    <main className="container mx-auto py-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
          IEM Chengdu Betting Tracker
        </h1>
        <nav className="flex gap-2">
          <Button asChild>
            <Link href="/add">Add Bet</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </header>
      <BetTable bets={bets} />
    </main>
  );
}
