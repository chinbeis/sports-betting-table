"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bet } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateBetResult } from "@/app/actions";

interface BetTableProps {
  bets: Bet[];
}

export function BetTable({ bets }: BetTableProps) {
  const getConfidenceBadgeColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30";
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30 hover:bg-amber-500/30";
      case "low":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30 hover:bg-slate-500/30";
      default:
        return "";
    }
  };

  const getMoodEmoji = (mood: string | null) => {
    if (!mood) return "—";
    const moodMap: Record<string, string> = {
      confident: "😎",
      nervous: "😰",
      excited: "🤩",
      calm: "😌",
      stressed: "😣",
    };
    return moodMap[mood] || mood;
  };

  return (
    <div className="rounded-xl border-2 border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/70 border-b-2">
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Match</TableHead>
              <TableHead className="hidden md:table-cell font-bold">Map</TableHead>
              <TableHead className="hidden md:table-cell font-bold">Bet Type</TableHead>
              <TableHead className="font-bold">Odds</TableHead>
              <TableHead className="font-bold">Stake</TableHead>
              <TableHead className="hidden md:table-cell font-bold">Confidence</TableHead>
              <TableHead className="font-bold">Result</TableHead>
              <TableHead className="font-bold">Profit/Loss</TableHead>
              <TableHead className="hidden lg:table-cell font-bold">Notes</TableHead>
              <TableHead className="font-bold">Mood</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-12 text-muted-foreground">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-5xl">🎲</span>
                    <p className="font-semibold text-lg">No bets yet</p>
                    <p className="text-sm">Add your first bet to get started!</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              bets.map((bet) => (
                <TableRow 
                  key={bet.id} 
                  className="hover:bg-muted/30 transition-colors border-b"
                >
                  <TableCell className="font-medium">
                    {new Date(bet.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-semibold">{bet.match}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {bet.map}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {bet.bet_type}
                  </TableCell>
                  <TableCell className="font-bold text-primary">{bet.odds}</TableCell>
                  <TableCell className="font-semibold">₮{bet.stake.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge className={`${getConfidenceBadgeColor(bet.confidence)} capitalize border`}>
                      {bet.confidence}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        bet.result === "win"
                          ? "default"
                          : bet.result === "loss"
                          ? "destructive"
                          : "outline"
                      }
                      className="capitalize"
                    >
                      {bet.result}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`font-bold text-base ${
                        bet.profit_loss > 0
                          ? "text-green-500"
                          : bet.profit_loss < 0
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {bet.profit_loss > 0 ? "+" : ""}₮{bet.profit_loss.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground max-w-xs truncate">
                    {bet.notes || "—"}
                  </TableCell>
                  <TableCell className="text-center text-xl">
                    {getMoodEmoji(bet.mood)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-muted font-bold"
                        >
                          •••
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-36">
                        <DropdownMenuItem
                          onClick={() => updateBetResult(bet.id, "win")}
                          className="cursor-pointer focus:bg-green-500/20 focus:text-green-400"
                        >
                          <span className="mr-2">✓</span> Win
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateBetResult(bet.id, "loss")}
                          className="cursor-pointer focus:bg-red-500/20 focus:text-red-400"
                        >
                          <span className="mr-2">✗</span> Loss
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateBetResult(bet.id, "pending")}
                          className="cursor-pointer focus:bg-blue-500/20 focus:text-blue-400"
                        >
                          <span className="mr-2">⏱</span> Pending
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}