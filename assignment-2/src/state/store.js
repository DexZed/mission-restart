import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";

class TicketStore {
  state$;
  static instance;
  constructor(initialState) {
    this.state$ = new BehaviorSubject(initialState);
    this.loadTickets();
  }
  getState() {
    return this.state$.asObservable();
  }
  static getInstance() {
    if (!TicketStore.instance) {
      TicketStore.instance = new TicketStore(initialState);
    }
    return TicketStore.instance;
  }

  async loadTickets() {
    try {
      const response = await fetch("./data.json");
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      this.state$.next({
        ...this.snapshot,
        tickets: data,
      });
    } catch (error) {
      console.error("Error loading tickets:", error);
    }
  }

  get snapshot() {
    return this.state$.getValue();
  }

  toggleSelection(ticket) {
    const { selectedTickets, tickets } = this.snapshot;
    const isCurrentlySelected = selectedTickets.some((t) => t.id === ticket.id);

    const nextSelectedTickets = isCurrentlySelected
      ? selectedTickets.filter((t) => t.id !== ticket.id)
      : [...selectedTickets, { ...ticket, selected: true }];

    const nextTickets = tickets.map((t) => {
      if (t.id === ticket.id) {
        return { ...t, selected: !isCurrentlySelected };
      }
      return t;
    });

    this.state$.next({
      ...this.snapshot,
      tickets: nextTickets,
      selectedTickets: nextSelectedTickets,
    });
  }
  resolveTicket(ticketId) {
    const { tickets, resolvedTickets, selectedTicket, selectedTickets } =
      this.snapshot;

    const ticketToResolve = tickets.find((t) => t.id === ticketId);
    if (!ticketToResolve) return;

    const resolvedTicket = {
      ...ticketToResolve,
      status: "Resolved",
      selected: false,
    };

    this.state$.next({
      ...this.snapshot,
      tickets: tickets.filter((t) => t.id !== ticketId),
      resolvedTickets: [...resolvedTickets, resolvedTicket],
      selectedTicket: selectedTicket?.id === ticketId ? null : selectedTicket,
      selectedTickets: selectedTickets.filter((t) => t.id !== ticketId),
    });
  }
  resolveAllSelected() {
    const { tickets, resolvedTickets, selectedTickets, selectedTicket } =
      this.snapshot;
    if (selectedTickets.length === 0) return;

    const selectedIds = new Set(selectedTickets.map((t) => t.id));

    const newlyResolved = selectedTickets.map((t) => ({
      ...t,
      status: "Resolved",
      selected: false,
    }));

    const remainingTickets = tickets.filter((t) => !selectedIds.has(t.id));

    this.state$.next({
      ...this.snapshot,
      tickets: remainingTickets,
      resolvedTickets: [...resolvedTickets, ...newlyResolved],
      selectedTickets: [],
      selectedTicket:
        selectedTicket && selectedIds.has(selectedTicket.id)
          ? null
          : selectedTicket,
    });
  }

  reset() {
    this.state$.next(initialState);
  }
}

const store = TicketStore.getInstance();

export function useTicketStore() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const subscription = store.getState().subscribe(setState);
    return () => subscription.unsubscribe();
  }, []);

  return {
    ...state,
    toggleSelection: (ticket) => store.toggleSelection(ticket),
    resolveTicket: (ticketId) => store.resolveTicket(ticketId),
    resolveAllSelected: () => store.resolveAllSelected(),
    reset: () => store.reset(),
  };
}
