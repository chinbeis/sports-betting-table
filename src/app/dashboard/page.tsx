import { prisma } from "@/lib/db";
import { DashboardCard } from "@/components/DashboardCard";
import { BalanceChart } from "@/components/BalanceChart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ResultPieChart } from "@/components/ResultPieChart";
import { ConfidenceChart } from "@/components/ConfidenceChart";
import { MoodChart } from "@/components/MoodChart";

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

  const confidenceData = [
    {
      name: "Low",
      profit: bets
        .filter((bet) => bet.confidence === "low")
        .reduce((acc, bet) => acc + bet.profit_loss, 0),
    },
    {
      name: "Medium",
      profit: bets
        .filter((bet) => bet.confidence === "medium")
        .reduce((acc, bet) => acc + bet.profit_loss, 0),
    },
    {
      name: "High",
      profit: bets
        .filter((bet) => bet.confidence === "high")
        .reduce((acc, bet) => acc + bet.profit_loss, 0),
    },
  ];

  const moodData = bets.reduce((acc, bet) => {
    if (!bet.mood) {
      return acc;
    }
    const existingMood = acc.find((item) => item.name === bet.mood);
    if (existingMood) {
      if (bet.result === "win") {
        existingMood.wins++;
      } else if (bet.result === "loss") {
        existingMood.losses++;
      }
    } else {
      acc.push({
        name: bet.mood,
        wins: bet.result === "win" ? 1 : 0,
        losses: bet.result === "loss" ? 1 : 0,
      });
    }
    return acc;
  }, [] as { name: string; wins: number; losses: number }[]);

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-7xl">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Your betting performance overview
          </p>
        </div>
        <Button 
          asChild 
          variant="outline" 
          className="w-full sm:w-auto"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6 sm:mb-8">
        <DashboardCard title="Total Bets" value={totalBets} />
        <DashboardCard title="Wins / Losses" value={`${wins} / ${losses}`} />
        <DashboardCard title="Win Rate" value={`${winRate}%`} />
        <DashboardCard title="Total Profit" value={`₮${totalProfit.toLocaleString()}`} />
        <DashboardCard title="Current Balance" value={`₮${currentBalance.toLocaleString()}`} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Balance Progression */}
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Balance Progression
          </h2>
          <div className="w-full overflow-x-auto">
            <BalanceChart data={balanceData} />
          </div>
        </div>

        {/* Bet Results */}
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Bet Results
          </h2>
          <div className="w-full flex justify-center">
            <ResultPieChart data={pieChartData} />
          </div>
        </div>

        {/* Profit by Confidence */}
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Profit by Confidence
          </h2>
          <div className="w-full overflow-x-auto">
            <ConfidenceChart data={confidenceData} />
          </div>
        </div>

        {/* Win/Loss by Mood */}
        <div className="rounded-lg border bg-card p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Win/Loss by Mood
          </h2>
          <div className="w-full overflow-x-auto">
            <MoodChart data={moodData} />
          </div>
        </div>
      </div>
    </main>
  );
}