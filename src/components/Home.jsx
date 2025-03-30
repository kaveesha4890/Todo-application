import React, { useState, useEffect } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesFilter = 
      filter === 'All' || 
      (filter === 'Completed' && todo.completed) || 
      (filter === 'Pending' && !todo.completed);
    
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 md:px-8">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">My Tasks</h1>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="flex mb-4">
            <input 
              type="text" 
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..." 
              className="flex-grow p-2 sm:p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
            <button 
              onClick={addTodo}
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-r-lg hover:bg-blue-600 transition-colors text-sm sm:text-base font-medium"
            >
              Add
            </button>
          </div>

          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 sm:p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />

          <div className="flex justify-center space-x-1 sm:space-x-2 mb-4">
            {['All', 'Completed', 'Pending'].map(filterOption => (
              <button 
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
                  filter === filterOption 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>

          <div className="mt-6 overflow-y-auto max-h-96">
            <ul className="space-y-2">
              {filteredTodos.map(todo => (
                <li 
                  key={todo.id} 
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                    todo.completed 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                  }`}
                >
                  <div className="flex items-center flex-grow">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <span 
                      onClick={() => toggleTodo(todo.id)} 
                      className={`ml-3 cursor-pointer text-sm sm:text-base ${
                        todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-2 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>

            {filteredTodos.length === 0 && (
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-2 text-gray-500">No tasks found</p>
                {searchTerm && <p className="text-sm text-gray-400">Try a different search term</p>}
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t text-sm text-gray-500 flex justify-between">
            <p>Total: {todos.length} tasks</p>
            <p>Completed: {todos.filter(t => t.completed).length}</p>
            <p>Pending: {todos.filter(t => !t.completed).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;