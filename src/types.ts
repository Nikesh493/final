// src/types.ts

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: string;
  user: string;
}

export interface GroupedTickets {
  title: string;
  cards: Ticket[];
}
