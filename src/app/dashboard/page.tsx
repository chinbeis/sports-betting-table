import { prisma } from "@/lib/db";
import { DashboardCard } from "@/components/DashboardCard";
import { BalanceChart } from "@/components/BalanceChart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResultPieChart } from "@/components/ResultPieChart";

export default async function DashboardPage() {
  const bets = await prisma.bet.findMany({
    orderBy: {
      date: "asc",
    },
  });

  const totalBets = bets.length;
  const wins = bets.filter((bet) => bet.result === "win").length;
  const losses = bets.filter((bet) => bet.result === "loss").length;
  const pending = bets.filter((bet) => bet.result === "pending").length;
  const winRate = totalBets > 0 ? ((wins / (wins + losses)) * 100).toFixed(2) : 0;
  const totalProfit = bets.reduce((acc, bet) => acc + bet.profit_loss, 0);
  const startingBalance = 400000;
  const currentBalance = startingBalance + totalProfit;

  const balanceData = bets.reduce((acc, bet) => {
    const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : startingBalance;
    acc.push({
      date: new Date(bet.date).toLocaleDateString(),
      balance: lastBalance + bet.profit_loss,
    });
    return acc;
  }, [] as { date: string; balance: number }[]);

  const pieChartData = [
    { name: "Wins", value: wins },
    { name: "Losses", value: losses },
    { name: "Pending", value: pending },
  ];

  return (
    <main className="container mx-auto py-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Button asChild variant="outline">
          <Link href="/">Back to Home</Link>
        </Button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard title="Total Bets" value={totalBets} />
        <DashboardCard title="Wins / Losses" value={`${wins} / ${losses}`} />
        <DashboardCard title="Win Rate" value={`${winRate}%`} />
        <DashboardCard title="Total Profit" value={`₮${totalProfit.toLocaleString()}`} />
        <DashboardCard title="Current Balance" value={`₮${currentBalance.toLocaleString()}`} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BalanceChart data={balanceData} />
        <ResultPieChart data={pieChartData} />
      </div>
    </main>
  );
}
