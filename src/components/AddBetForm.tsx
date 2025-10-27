"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addBet } from "@/app/actions";
import { useRef, useState } from "react";
import { DatePicker } from "./DatePicker";
import { useRouter } from "next/navigation";

export function AddBetForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date | undefined>();
  const router = useRouter();

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        if (date) {
          formData.set("date", date.toISOString());
        }
        await addBet(formData);
        formRef.current?.reset();
        setDate(undefined);
        router.push("/");
      }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="date">Date</Label>
        <DatePicker date={date} onDateChange={setDate} />
      </div>
      <div>
        <Label htmlFor="match">Match</Label>
        <Input id="match" name="match" required />
      </div>
      <div>
        <Label htmlFor="map">Map</Label>
        <Input id="map" name="map" required />
      </div>
      <div>
        <Label htmlFor="bet_type">Bet Type</Label>
        <Input id="bet_type" name="bet_type" required />
      </div>
      <div>
        <Label htmlFor="odds">Odds</Label>
        <Input id="odds" name="odds" type="number" step="0.01" required />
      </div>
      <div>
        <Label htmlFor="stake">Stake</Label>
        <Input id="stake" name="stake" type="number" required />
      </div>
      <div>
        <Label htmlFor="confidence">Confidence</Label>
        <Select name="confidence" required>
          <SelectTrigger>
            <SelectValue placeholder="Select confidence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Input id="notes" name="notes" />
      </div>
      <Button type="submit">Add Bet</Button>
    </form>
  );
}
