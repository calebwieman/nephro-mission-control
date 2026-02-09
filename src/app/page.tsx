import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";

'use client';\n\nexport default function Home() {
  const actions = useQuery(api.actions.list) || [];
  const tasks = useQuery(api.tasks.list) || [];
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useQuery(api.documents.search, { query: searchQuery }) || [];

  const events = tasks.map((task) => ({
    title: task.title,
    start: new Date(task.date),
  }));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Nephro Mission Control</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Activity Feed */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Activity Feed</h2>
          <div className="overflow-y-auto max-h-96">
            {actions.map((action) => (
              <div key={action._id} className="mb-2 p-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(action.timestamp).toLocaleString()}</p>
                <p className="font-medium">{action.type}</p>
                <p>{action.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Calendar</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridWeek"
            events={events}
            height="auto"
          />
        </div>

        {/* Global Search */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Global Search</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workspace/memory/docs..."
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
          />
          <div className="overflow-y-auto max-h-96">
            {searchResults.map((doc) => (
              <div key={doc._id} className="mb-2 p-2 border-b border-gray-200 dark:border-gray-700">
                <p className="font-medium">{doc.path}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{doc.content.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
