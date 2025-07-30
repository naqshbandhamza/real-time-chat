// src/components/ChatList.jsx
import React from 'react';

const USERS = [
  { email: 'doctor@example.com', role: 'doctor' },
  { email: 'patient@example.com', role: 'patient' },
];

export default function ChatList({ user, onSelectChat }) {
  const otherUsers = USERS.filter((u) => u.email !== user.email);

  return (
    <div className="w-1/3 border-r p-4">
      <h2 className="text-xl font-bold mb-4">Chats</h2>
      <ul>
        {otherUsers.map((u) => (
          <li key={u.email}>
            <button
              className="w-full text-left p-2 border mb-2 hover:bg-gray-100"
              onClick={() => onSelectChat(u)}
            >
              {u.role} — {u.email}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
