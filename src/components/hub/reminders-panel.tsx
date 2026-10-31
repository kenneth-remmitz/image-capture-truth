import { useEffect, useState } from "react";
import { CalendarDays, Mail, Plus, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Reminder {
  id: string;
  title: string;
  due_date: string | null;
  account_email: string | null;
  completed: boolean;
}

function formatDueDate(dueDate: string) {
  const date = new Date(`${dueDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dueDate;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function RemindersPanel({ userId }: { userId: string }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [adding, setAdding] = useState(false);

  async function loadReminders() {
    const { data } = await supabase
      .from("hub_reminders")
      .select("id, title, due_date, account_email, completed")
      .order("completed", { ascending: true })
      .order("created_at", { ascending: true });
    if (data) setReminders(data as Reminder[]);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("hub_reminders")
      .select("id, title, due_date, account_email, completed")
      .order("completed", { ascending: true })
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (cancelled) return;
        if (data) setReminders(data as Reminder[]);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  async function handleAdd() {
    const trimmed = title.trim();
    if (!trimmed || adding) return;
    setAdding(true);
    const { data, error } = await supabase
      .from("hub_reminders")
      .insert({
        user_id: userId,
        title: trimmed,
        due_date: dueDate || null,
        account_email: accountEmail.trim() || null,
      })
      .select("id, title, due_date, account_email, completed")
      .single();
    if (!error && data) {
      setReminders((prev) => [...prev, data as Reminder]);
      setTitle("");
      setDueDate("");
      setAccountEmail("");
    }
    setAdding(false);
  }

  async function handleToggle(reminder: Reminder, completed: boolean) {
    setReminders((prev) =>
      prev.map((r) => (r.id === reminder.id ? { ...r, completed } : r)),
    );
    const { error } = await supabase
      .from("hub_reminders")
      .update({ completed })
      .eq("id", reminder.id)
      .eq("user_id", userId);
    if (error) {
      void loadReminders();
    } else if (completed) {
      // Completed items sink to the bottom of the list.
      setReminders((prev) =>
        [...prev.filter((r) => r.id !== reminder.id), { ...reminder, completed }]
          .sort((a, b) => Number(a.completed) - Number(b.completed)),
      );
    }
  }

  async function handleDelete(reminder: Reminder) {
    setReminders((prev) => prev.filter((r) => r.id !== reminder.id));
    await supabase
      .from("hub_reminders")
      .delete()
      .eq("id", reminder.id)
      .eq("user_id", userId);
  }

  return (
    <section
      aria-label="Schedule and reminders"
      className="rounded-xl border border-border bg-card"
    >
      <header className="border-b border-border px-5 py-4">
        <p className="label-mono">Schedule &amp; Reminders</p>
        <h2 className="mt-1 font-display text-lg">Panel 03 — Tasks</h2>
      </header>

      <div className="space-y-4 px-5 py-5">
        <form
          className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
        >
          <div className="grid gap-2 sm:grid-cols-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New reminder…"
              aria-label="Reminder title"
            />
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              aria-label="Due date (optional)"
            />
            <Input
              type="email"
              value={accountEmail}
              onChange={(e) => setAccountEmail(e.target.value)}
              placeholder="Account tag (optional)"
              aria-label="Account email tag (optional)"
            />
          </div>
          <Button type="submit" disabled={adding || !title.trim()}>
            <Plus aria-hidden="true" />
            Add
          </Button>
        </form>

        <div className="space-y-2">
          {loading ? (
            <>
              <div className="h-11 animate-pulse rounded-lg border border-border bg-muted" />
              <div className="h-11 animate-pulse rounded-lg border border-border bg-muted" />
            </>
          ) : reminders.length === 0 ? (
            <p className="rounded-lg border border-border bg-background px-4 py-4 text-sm text-muted-foreground">
              No reminders yet. Add your first task above.
            </p>
          ) : (
            reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3"
              >
                <Checkbox
                  checked={reminder.completed}
                  onCheckedChange={(checked) =>
                    handleToggle(reminder, checked === true)
                  }
                  aria-label={
                    reminder.completed
                      ? `Mark "${reminder.title}" as open`
                      : `Mark "${reminder.title}" as completed`
                  }
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={
                      reminder.completed
                        ? "truncate text-sm text-muted-foreground line-through"
                        : "truncate text-sm"
                    }
                  >
                    {reminder.title}
                  </p>
                  {reminder.due_date || reminder.account_email ? (
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {reminder.due_date ? (
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" aria-hidden="true" />
                          {formatDueDate(reminder.due_date)}
                        </span>
                      ) : null}
                      {reminder.account_email ? (
                        <span className="inline-flex items-center gap-1 truncate">
                          <Mail className="h-3 w-3" aria-hidden="true" />
                          {reminder.account_email}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                {reminder.completed ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(reminder)}
                    aria-label={`Delete "${reminder.title}"`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
