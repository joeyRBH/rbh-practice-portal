import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (type) => {
    setUserType(type);
    setUserName(type === 'client' ? 'Sarah Johnson' : 'Dr. Rebecca B. Headley');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
  };

  // Login Page (same as before)
  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '400px'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>RBH Practice Portal</h1>
          
          <button
            onClick={() => handleLogin('client')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginBottom: '12px',
              cursor: 'pointer'
            }}
          >
            Login as Client
          </button>

          <button
            onClick={() => handleLogin('therapist')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Login as Therapist
          </button>
        </div>
      </div>
    );
  }

  // Dashboard with simple tabs
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Welcome, {userName}</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('dashboard')}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: activeTab === 'dashboard' ? '#4f46e5' : '#f3f4f6',
            color: activeTab === 'dashboard' ? 'white' : '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('appointments')}
          style={{ 
            padding: '10px 20px',
            backgroundColor: activeTab === 'appointments' ? '#4f46e5' : '#f3f4f6',
            color: activeTab === 'appointments' ? 'white' : '#374151',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Appointments
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your {userType} portal!</p>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2>Appointments</h2>
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px', marginBottom: '15px' }}>
              <h3>Next Appointment</h3>
              <p><strong>Date:</strong> March 15, 2024</p>
              <p><strong>Time:</strong> 2:00 PM</p>
              <p><strong>Type:</strong> Therapy Session</p>
              {userType === 'client' && <p><strong>With:</strong> Dr. Rebecca B. Headley</p>}
              {userType === 'therapist' && <p><strong>Client:</strong> Sarah Johnson</p>}
            </div>
            
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
              <h3>Upcoming Appointment</h3>
              <p><strong>Date:</strong> March 18, 2024</p>
              <p><strong>Time:</strong> 10:30 AM</p>
              <p><strong>Type:</strong> Follow-up Session</p>
              {userType === 'client' && <p><strong>With:</strong> Dr. Rebecca B. Headley</p>}
              {userType === 'therapist' && <p><strong>Client:</strong> Sarah Johnson</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
