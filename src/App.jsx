import React from 'react';
import Home from './components/Home';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-800">My Day Plans</h1>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center w-full py-6">
        <Home />
      </main>
      
    </div>
  );
}

export default App;
