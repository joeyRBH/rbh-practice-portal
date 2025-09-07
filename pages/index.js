import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const appointments = [
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      location: 'Video Call'
    },
    {
      id: 2,
      date: '2024-03-18',
      time: '10:30 AM',
      type: 'Follow-up Session',
      client: 'Sarah Johnson',
      location: 'Office'
    }
  ];

  const clients = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '(555) 123-4567' },
    { id: 2, name: 'Mike Wilson', email: 'mike@email.com', phone: '(555) 234-5678' }
  ];

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

  const getUserAppointments = () => {
    if (userType === 'client') {
      return appointments.filter(apt => apt.client === userName);
    }
    return appointments;
  };

  // Button test handlers
  const testScheduleButton = () => {
    setModalContent('schedule');
    setShowModal(true);
  };

  const testRescheduleButton = () => {
    setModalContent('reschedule');
    setShowModal(true);
  };

  const testAddClientButton = () => {
    setModalContent('addClient');
    setShowModal(true);
  };

  const testEditButton = () => {
    setModalContent('editClient');
    setShowModal(true);
  };

  const testCancelButton = () => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      alert('Appointment cancelled!');
    }
  };

  const testVideoButton = () => {
    alert('Video call feature - this would open the video session');
  };

  // Login Page
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
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>RBH Practice Portal</h1>
          <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>Testing Button Functionality</p>
          
          <button
            onClick={() => handleLogin('client')}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginBottom: '15px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Login as Client
          </button>

          <button
            onClick={() => handleLogin('therapist')}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Login as Therapist
          </button>
        </div>
      </div>
    );
  }

  const tabs = userType === 'therapist' ? [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' },
    { id: 'clients', label: '👥 Clients' }
  ] : [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Simple Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <h2 style={{ marginBottom: '20px' }}>✅ Button Test Working!</h2>
            <p style={{ marginBottom: '20px' }}>Modal Type: <strong>{modalContent}</strong></p>
            <p style={{ marginBottom: '20px', color: '#059669' }}>
              🎉 The button functionality is working correctly! 
              This confirms the modal system is operational.
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Welcome, {userName}</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: '12px 24px', 
              marginRight: '10px',
              backgroundColor: activeTab === tab.id ? '#4f46e5' : '#f3f4f6',
              color: activeTab === tab.id ? 'white' : '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2>🏠 Dashboard</h2>
            <p>Welcome to your {userType} portal!</p>
            <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px', marginTop: '20px' }}>
              <h3>🧪 Button Functionality Test</h3>
              <p style={{ margin: '10px 0' }}>Click any button below to test if modals are working:</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                <button onClick={testScheduleButton} style={{ padding: '8px 16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Test Schedule Button
                </button>
                <button onClick={testRescheduleButton} style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Test Reschedule Button
                </button>
                {userType === 'therapist' && (
                  <button onClick={testAddClientButton} style={{ padding: '8px 16px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    Test Add Client Button
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: '0' }}>📅 Appointments</h2>
              <button 
                onClick={testScheduleButton}
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: '#4f46e5', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                ➕ Schedule New (TEST)
              </button>
            </div>

            <div>
              {getUserAppointments().map(appointment => (
                <div key={appointment.id} style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 10px 0' }}>
                    {appointment.type}
                  </h3>
                  <p style={{ color: '#6b7280', margin: '0 0 15px 0' }}>
                    {appointment.date} at {appointment.time} - {appointment.location}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {appointment.location === 'Video Call' && (
                      <button 
                        onClick={testVideoButton}
                        style={{ 
                          padding: '8px 16px', 
                          backgroundColor: '#059669', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '6px', 
                          cursor: 'pointer' 
                        }}
                      >
                        🎥 Join Video (TEST)
                      </button>
                    )}
                    
                    <button 
                      onClick={testRescheduleButton}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: '#4f46e5', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer' 
                      }}
                    >
                      📅 Reschedule (TEST)
                    </button>

                    <button 
                      onClick={testCancelButton}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: 'transparent', 
                        color: '#dc2626', 
                        border: '1px solid #dc2626', 
                        borderRadius: '6px', 
                        cursor: 'pointer' 
                      }}
                    >
                      ❌ Cancel (TEST)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: '0' }}>👥 Clients</h2>
              <button 
                onClick={testAddClientButton}
                style={{ 
                  padding: '12px 24px', 
                  backgroundColor: '#4f46e5', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: 'pointer' 
                }}
              >
                ➕ Add Client (TEST)
              </button>
            </div>

            <div>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '20px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 5px 0' }}>
                    {client.name}
                  </h3>
                  <p style={{ color: '#6b7280', margin: '0 0 15px 0' }}>
                    {client.email} • {client.phone}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={testEditButton}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: '#f59e0b', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: 'pointer' 
                      }}
                    >
                      ✏️ Edit (TEST)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
