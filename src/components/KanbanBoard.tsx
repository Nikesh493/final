
// import React, { useEffect, useState } from 'react';
// import KanbanColumn from './KanbanColumn';
// import { fetchTickets } from '../api/ticketService';
// import { Ticket, GroupedTickets } from '../types'; // Import the types
// import "../styles/KanbanBoard.css";

// const KanbanBoard: React.FC = () => {
//   const [tickets, setTickets] = useState<Ticket[]>([]);
//   const [grouping, setGrouping] = useState<string>('status');
//   const [sorting, setSorting] = useState<string>('priority');

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await fetchTickets();
//         setTickets(data.tickets);
//       } catch (error) {
//         console.error('Error fetching tickets:', error);
//       }
//     };

//     getData();
//   }, []);

//   const handleGroupingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setGrouping(event.target.value);
//   };

//   const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSorting(event.target.value);
//   };

//   // Function to group tickets based on the selected grouping option (status, user, priority)
//   const groupTickets = (): GroupedTickets[] => {
//     const groups: { [key: string]: GroupedTickets } = {};
    
//     tickets.forEach(ticket => {
//       let groupKey = '';
      
//       // Group by the selected grouping option (status, user, priority)
//       if (grouping === 'status') {
//         groupKey = ticket.status;
//       } else if (grouping === 'user') {
//         groupKey = ticket.user;
//       } else if (grouping === 'priority') {
//         groupKey = String(ticket.priority);
//       }

//       if (!groups[groupKey]) {
//         groups[groupKey] = { title: groupKey, cards: [] };
//       }

//       groups[groupKey].cards.push(ticket);
//     });

//     return Object.values(groups);
//   };

//   // Function to sort tickets based on the selected sorting option (priority, title)
//   const sortTickets = (groupedTickets: GroupedTickets[]): GroupedTickets[] => {
//     return groupedTickets.map(group => {
//       let sortedCards = [...group.cards];

//       if (sorting === 'priority') {
//         // Sort by priority (higher priority first)
//         sortedCards.sort((a, b) => b.priority - a.priority);
//       } else if (sorting === 'title') {
//         // Sort alphabetically by title
//         sortedCards.sort((a, b) => a.title.localeCompare(b.title));
//       }

//       return { ...group, cards: sortedCards };
//     });
//   };

//   // Function to reorder grouped tickets based on predefined column order
//   const reorderGroups = (groupedTickets: GroupedTickets[]): GroupedTickets[] => {
//     const order = ['Backlog', 'To Do', 'In Progress'];
//     return groupedTickets.sort((a, b) => {
//       const indexA = order.indexOf(a.title);
//       const indexB = order.indexOf(b.title);
//       return (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) - (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB);
//     });
//   };

//   // Get grouped, sorted, and ordered tickets
//   const groupedTickets = groupTickets();
//   const sortedTickets = sortTickets(groupedTickets);
//   const orderedGroups = reorderGroups(sortedTickets);

//   return (
//     <div className="kanban-board">
//       <div className="controls">
//         <label>
//           Group by:
//           <select value={grouping} onChange={handleGroupingChange}>
//             <option value="status">Status</option>
//             <option value="user">User</option>
//             <option value="priority">Priority</option>
//           </select>
//         </label>
//         <label>
//           Sort by:
//           <select value={sorting} onChange={handleSortingChange}>
//             <option value="priority">Priority</option>
//             <option value="title">Title</option>
//           </select>
//         </label>
//       </div>
//       <div className="columns">
//         {orderedGroups.map((group: GroupedTickets) => (
//           <KanbanColumn key={group.title} title={group.title} cards={group.cards} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default KanbanBoard;
import React, { useEffect, useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { fetchTickets } from '../api/ticketService';
import { Ticket, GroupedTickets } from '../types';
import "../styles/KanbanBoard.css";
import DisplayIcon from '../assets/Display.svg'; // Import the Display image
import DownArrow from '../assets/down.svg'; // Import the down arrow image

const KanbanBoard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [grouping, setGrouping] = useState<string>('status');
  const [sorting, setSorting] = useState<string>('priority');
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false); // State to control dropdown visibility

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    getData();
  }, []);

  const handleGroupingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGrouping(event.target.value);
  };

  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(event.target.value);
  };

  const groupTickets = (): GroupedTickets[] => {
    const groups: { [key: string]: GroupedTickets } = {};

    tickets.forEach(ticket => {
      let groupKey = '';
      if (grouping === 'status') {
        groupKey = ticket.status;
      } else if (grouping === 'user') {
        groupKey = ticket.user;
      } else if (grouping === 'priority') {
        groupKey = String(ticket.priority);
      }

      if (!groups[groupKey]) {
        groups[groupKey] = { title: groupKey, cards: [] };
      }

      groups[groupKey].cards.push(ticket);
    });

    return Object.values(groups);
  };

  const sortTickets = (groupedTickets: GroupedTickets[]): GroupedTickets[] => {
    return groupedTickets.map(group => {
      let sortedCards = [...group.cards];

      if (sorting === 'priority') {
        sortedCards.sort((a, b) => b.priority - a.priority);
      } else if (sorting === 'title') {
        sortedCards.sort((a, b) => a.title.localeCompare(b.title));
      }

      return { ...group, cards: sortedCards };
    });
  };

  const reorderGroups = (groupedTickets: GroupedTickets[]): GroupedTickets[] => {
    const order = ['Backlog', 'To Do', 'In Progress'];
    return groupedTickets.sort((a, b) => {
      const indexA = order.indexOf(a.title);
      const indexB = order.indexOf(b.title);
      return (indexA === -1 ? Number.MAX_SAFE_INTEGER : indexA) - (indexB === -1 ? Number.MAX_SAFE_INTEGER : indexB);
    });
  };

  const groupedTickets = groupTickets();
  const sortedTickets = sortTickets(groupedTickets);
  const orderedGroups = reorderGroups(sortedTickets);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="kanban-board">
      <div className="display-block" onClick={toggleDropdown}>
        <img src={DisplayIcon} alt="Display Icon" className="display-icon" />
        <span className="display-text">Display</span>
        <img src={DownArrow} alt="Down Arrow" className="down-arrow" />
      </div>

      {/* Dropdown containing Group by and Sort by */}
      {isDropdownVisible && (
        <div className="dropdown-content">
          <label>
            Group by:
            <select value={grouping} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <label>
            Sort by:
            <select value={sorting} onChange={handleSortingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      )}

      <div className="columns">
        {orderedGroups.map((group: GroupedTickets) => (
          <KanbanColumn key={group.title} title={group.title} cards={group.cards} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
