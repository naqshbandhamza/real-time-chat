// src/components/ChatWindow.jsx
import React, { useEffect, useRef, useState } from 'react';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebaseConfig';


export default function ChatWindow({ user, partner }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const bottomRef = useRef();

  const conversationId = ["doctor", "patient"].sort().join('_');

  const [isTyping, setIsTyping] = useState(false);
  let typingTimeout = useRef(null);


  const test = async (q) => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  }

  useEffect(() => {
    console.log(conversationId)
    const q = query(
      collection(db, 'messages', conversationId, 'chat'),
      orderBy('timestamp')
    );

    console.log(q)
    test(q)

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      console.log(data)
      setMessages(data);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, 'messages', conversationId, 'chat'), {
      from: user.email,
      to: partner.email,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
    setText('');
    updateTypingStatus(false);
  };

  const updateTypingStatus = async (typing) => {
    const statusRef = doc(db, 'typingStatus', conversationId);
    await setDoc(statusRef, {
      [user.email]: typing,
    }, { merge: true });
  };

  useEffect(() => {
    const statusRef = doc(db, 'typingStatus', conversationId);
    const unsubscribe = onSnapshot(statusRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const partnerTyping = data[partner.email] || false;
        setIsTyping(partnerTyping);
      }
    });

    return () => unsubscribe();
  }, [conversationId, partner.email]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 flex flex-col">
      <div className="border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold">
          Chat with {partner.role} — {partner.email}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xs p-2 rounded ${msg.from === user.email
              ? 'bg-blue-500 text-white self-end ml-auto'
              : 'bg-gray-200 text-black self-start mr-auto'
              }`}
          >
            {msg.from !== user.email && (
              <div className="text-xs font-semibold mb-1 text-gray-700">
                {msg.from}
              </div>
            )}

            <div>{msg.text}</div>

            <div className="text-xs text-right opacity-70 mt-1">
              {msg.timestamp?.toDate
                ? new Date(msg.timestamp.toDate()).toLocaleTimeString()
                : '...'}
            </div>
          </div>

        ))}

        {isTyping && (
          <div className="text-sm italic text-gray-500">
            {partner.role} is typing...
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Type message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            updateTypingStatus(true);
            clearTimeout(typingTimeout.current);
            typingTimeout.current = setTimeout(() => {
              updateTypingStatus(false);
            }, 1000);
          }} onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
