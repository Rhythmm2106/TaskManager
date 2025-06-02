'use client';
import React, { useState, useEffect } from 'react';

// Simple Icon Components (replacing lucide-react)
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="20,6 9,17 4,12"></polyline>
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const BookOpenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12,6 12,12 16,14"></polyline>
  </svg>
);

// Calendar Component
const CalendarComponent = ({ tasks, selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const getTasksForDate = (date) => {
    const dateStr = new Date(currentYear, currentMonth, date).toISOString().split('T')[0];
    return tasks.filter(task => task.date === dateStr);
  };

  const handleDateClick = (date) => {
    const dateStr = new Date(currentYear, currentMonth, date).toISOString().split('T')[0];
    onDateSelect(dateStr);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const tasksForDate = getTasksForDate(date);
      const dateStr = new Date(currentYear, currentMonth, date).toISOString().split('T')[0];
      const isSelected = selectedDate === dateStr;
      const isToday = new Date().toDateString() === new Date(currentYear, currentMonth, date).toDateString();

      days.push(
        <div
          key={date}
          onClick={() => handleDateClick(date)}
          className={`h-12 p-1 cursor-pointer rounded-lg border transition-all ${
            isSelected 
              ? 'bg-blue-500 text-white border-blue-500' 
              : isToday 
                ? 'bg-blue-100 border-blue-300 text-blue-800' 
                : 'hover:bg-gray-100 border-gray-200'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-sm font-medium">{date}</span>
            {tasksForDate.length > 0 && (
              <div className="flex space-x-1">
                {tasksForDate.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className={`w-1.5 h-1.5 rounded-full ${
                      task.type === 'personal' ? 'bg-blue-400' : 'bg-purple-400'
                    }`}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const tasksForSelectedDate = selectedDate 
    ? tasks.filter(task => task.date === selectedDate)
    : [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-2 text-green-600"><CalendarIcon /></span>
          Calendar
        </h2>
        <div className="flex items-center space-x-2">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(parseInt(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-6">
        {renderCalendar()}
      </div>

      {selectedDate && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Tasks for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          {tasksForSelectedDate.length > 0 ? (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {tasksForSelectedDate.map(task => (
                <div
                  key={task.id}
                  className={`p-2 rounded-lg border-l-4 ${
                    task.type === 'personal' 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'bg-purple-50 border-purple-500'
                  }`}
                >
                  <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.text}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    task.type === 'personal' 
                      ? 'bg-blue-200 text-blue-800' 
                      : 'bg-purple-200 text-purple-800'
                  }`}>
                    {task.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No tasks scheduled for this date.</p>
          )}
        </div>
      )}
    </div>
  );
};