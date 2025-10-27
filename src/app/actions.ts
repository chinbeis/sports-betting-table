"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addBet(formData: FormData) {
  try {
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
        mood: data.mood as string,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add bet." };
  }
}

export async function updateBet(id: string, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const stake = parseInt(data.stake as string);
  const odds = parseFloat(data.odds as string);
  const result = data.result as "win" | "loss" | "pending";

  let profit_loss = 0;
  if (result === "win") {
    profit_loss = Math.round(stake * (odds - 1));
  } else if (result === "loss") {
    profit_loss = -stake;
  }

  await prisma.bet.update({
    where: { id },
    data: {
      date: new Date(data.date as string),
      match: data.match as string,
      map: data.map as string,
      bet_type: data.bet_type as string,
      odds: odds,
      stake: stake,
      confidence: data.confidence as string,
      result: result,
      profit_loss: profit_loss,
      notes: data.notes as string,
      mood: data.mood ? (data.mood as string) : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
}

export async function updateBetResult(id: string, result: "win" | "loss" | "pending") {
  const bet = await prisma.bet.findUnique({
    where: { id },
  });

  if (!bet) {
    return;
  }

  let profit_loss = 0;
  if (result === "win") {
    profit_loss = Math.round(bet.stake * (bet.odds - 1));
  } else if (result === "loss") {
    profit_loss = -bet.stake;
  }

  await prisma.bet.update({
    where: { id },
    data: {
      result,
      profit_loss,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
}
