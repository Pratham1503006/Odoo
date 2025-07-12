'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
}

// Simple API test component
export default function ApiTest() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/test');
      const data = await response.json();
      console.log('Server response:', data);
    } catch (err) {
      setError('Failed to connect to server');
      console.error('Connection error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/users/public');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Server Connection'}
        </button>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Fetch Users'}
        </button>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {users.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Users:</h3>
            <ul className="space-y-2">
              {users.map((user) => (
                <li key={user.id} className="p-2 bg-gray-100 rounded">
                  <strong>{user.name}</strong> - {user.email}
                  {user.location && <span className="text-gray-600"> ({user.location})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
