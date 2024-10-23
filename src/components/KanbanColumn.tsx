// src/components/KanbanColumn.tsx
import React from 'react';
import KanbanCard from './KanbanCard';
import { Ticket } from '../types'; // Import Ticket type

interface KanbanColumnProps {
  title: string;
  cards: Ticket[];
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, cards }) => {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>
      {cards.map((card: Ticket) => (
        <KanbanCard
          key={card.id}
          title={card.title}
          description={card.description}
          priority={card.priority}
        />
      ))}
    </div>
  );
};

export default KanbanColumn;
