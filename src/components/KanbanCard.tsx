// // src/components/KanbanCard.tsx
// import React from 'react';
// // src/components/KanbanCard.tsx
// import "../styles/KanbanCard.css"; // Adjust the path if necessary

// interface KanbanCardProps {
//   title: string;
//   description: string;
//   priority: number;
// }

// const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];

// const KanbanCard: React.FC<KanbanCardProps> = ({ title, description, priority }) => {
//   return (
//     <div className="kanban-card">
//       <h3>{title}</h3>
//       <p>{description}</p>
//       <div className={`priority priority-${priority}`}>
//         Priority: {priorityLabels[priority]}
//       </div>
//     </div>
//   );
// };

// export default KanbanCard;
//---------------------------------------------------------------------------------------------
import React from 'react';
import '../styles/KanbanCard.css';
import UrgentPriorityIcon from '../assets/SVG - Urgent Priority grey.svg'; // Adjust the path to your SVG

interface KanbanCardProps {
  title: string;
  description: string;
  priority: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ title, description, priority }) => {
  return (
    <div className="kanban-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {/* Priority with grey text */}
      <div className="priority" style={{ color: 'grey' }}>
        Priority: {['No priority', 'Low', 'Medium', 'High', 'Urgent'][priority]}
      </div>
      {/* Display the urgent priority image on all cards */}
      <img src={UrgentPriorityIcon} alt="Urgent Priority" className="urgent-icon" />
    </div>
  );
};

export default KanbanCard;
