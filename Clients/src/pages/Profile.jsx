import React, { useContext, useState } from "react";
import Modal from "../components/Modal";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Profile() {
  const { users, addUser, updateUser, deleteUser, clearAllData } = useContext(ExpenseContext);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

  const submit = () => {
    if (!name.trim()) return;
    
    if (editingUser) {
      updateUser(editingUser.id, name);
    } else {
      addUser(name);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setEditingUser(null);
    setShowModal(false);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
    setShowDeleteConfirm(null);
  };

  const confirmDelete = (user) => {
    setShowDeleteConfirm(user);
  };

  const handleClearAll = () => {
    clearAllData();
    setShowClearAllConfirm(false);
  };

  return (
    <div className="w-[360px] mx-auto p-4 pb-40">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Users</h2>
            <p className="text-sm text-gray-600 mt-1">Manage users and their balances</p>
          </div>
          
          {users.length > 0 && (
            <button
              onClick={() => setShowClearAllConfirm(true)}
              className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors text-sm"
              title="Clear all data"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <div className="space-y-3">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-300 text-6xl mb-4">👥</div>
            <div className="text-gray-500 text-lg mb-2">No users yet</div>
            <div className="text-sm text-gray-400">Add new users to start tracking expenses</div>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-lg">{user.name}</div>
                  <div className={`text-sm font-medium mt-1 ${user.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Balance: ₹{user.balance.toFixed(2)}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 ml-4">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                    title="Edit user"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => confirmDelete(user)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                    title="Delete user"
                  >
                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button 
        onClick={() => setShowModal(true)} 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl mt-6 font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform active:scale-95 shadow-lg hover:shadow-xl"
      >
        <span className="text-xl mr-2">+</span>
        Add New User
      </button>

      {/* Add/Edit User Modal */}
      {showModal && (
        <Modal onClose={resetForm}>
          <div className="p-2">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              {editingUser ? (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit User
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New User
                </span>
              )}
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Name
              </label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg" 
                placeholder="Enter name" 
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && submit()}
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={submit} 
                disabled={!name.trim()}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {editingUser ? "Update User" : "Add User"}
              </button>
              <button 
                onClick={resetForm} 
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete User Confirmation Modal */}
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(null)}>
          <div className="p-2 text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Delete User</h3>
            <div className="text-gray-600 mb-6">
              <p className="mb-2">
                Are you sure you want to delete <strong className="text-gray-800">{showDeleteConfirm.name}</strong>?
              </p>
              <p className="text-sm text-red-600">
                This will also delete all their transactions and cannot be undone.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleDelete(showDeleteConfirm.id)} 
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(null)} 
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Clear All Data Confirmation Modal */}
      {showClearAllConfirm && (
        <Modal onClose={() => setShowClearAllConfirm(false)}>
          <div className="p-2 text-center">
            <div className="text-orange-500 text-5xl mb-4">🗑️</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Clear All Data</h3>
            <div className="text-gray-600 mb-6">
              <p className="mb-2">This will permanently delete:</p>
              <ul className="text-sm text-left bg-gray-50 p-3 rounded-lg">
                <li>• All users ({users.length})</li>
                <li>• All transactions</li>
                <li>• All balance history</li>
              </ul>
              <p className="text-sm text-red-600 mt-3">This action cannot be undone.</p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleClearAll} 
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowClearAllConfirm(false)} 
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}