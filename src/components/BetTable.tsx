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

interface BetTableProps {
  bets: Bet[];
}

export function BetTable({ bets }: BetTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Match</TableHead>
          <TableHead>Map</TableHead>
          <TableHead>Bet Type</TableHead>
          <TableHead>Odds</TableHead>
          <TableHead>Stake</TableHead>
          <TableHead>Confidence</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Profit/Loss</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bets.map((bet) => (
          <TableRow
            key={bet.id}
            className={
              bet.result === "win"
                ? "bg-green-900/50"
                : bet.result === "loss"
                ? "bg-red-900/50"
                : "bg-gray-900/50"
            }
          >
            <TableCell>{new Date(bet.date).toLocaleDateString()}</TableCell>
            <TableCell>{bet.match}</TableCell>
            <TableCell>{bet.map}</TableCell>
            <TableCell>{bet.bet_type}</TableCell>
            <TableCell>{bet.odds}</TableCell>
            <TableCell>{bet.stake}</TableCell>
            <TableCell>{bet.confidence}</TableCell>
            <TableCell>{bet.result}</TableCell>
            <TableCell>{bet.profit_loss}</TableCell>
            <TableCell>{bet.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
