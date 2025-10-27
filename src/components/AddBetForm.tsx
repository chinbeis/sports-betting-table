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
import { toast } from "sonner";

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
        const result = await addBet(formData);
        if (result.success) {
          toast.success("Bet added successfully!");
          formRef.current?.reset();
          setDate(undefined);
          router.push("/");
        } else {
          toast.error(result.error);
        }
      }}
      className="space-y-4 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <DatePicker date={date} onDateChange={setDate} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="match">Match</Label>
          <Input id="match" name="match" required className="w-full" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="map">Map</Label>
          <Input id="map" name="map" required className="w-full" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bet_type">Bet Type</Label>
          <Input id="bet_type" name="bet_type" required className="w-full" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="odds">Odds</Label>
          <Input
            id="odds"
            name="odds"
            type="number"
            step="0.01"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stake">Stake</Label>
          <Input
            id="stake"
            name="stake"
            type="number"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confidence">Confidence</Label>
          <Select name="confidence" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select confidence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Input id="notes" name="notes" className="w-full" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mood">Mood</Label>
          <Input id="mood" name="mood" className="w-full" />
        </div>
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Add Bet
      </Button>
    </form>
  );
}
