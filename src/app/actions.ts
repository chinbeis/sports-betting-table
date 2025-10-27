"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addBet(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  await prisma.bet.create({
    data: {
      date: new Date(data.date as string),
      match: data.match as string,
      map: data.map as string,
      bet_type: data.bet_type as string,
      odds: parseFloat(data.odds as string),
      stake: parseInt(data.stake as string),
      confidence: data.confidence as string,
      result: "pending",
      profit_loss: 0,
      notes: data.notes as string,
    },
  });

  revalidatePath("/");
}
