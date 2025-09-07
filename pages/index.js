import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // Sample data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed',
      location: 'Video Call',
      calendarSynced: true,
      reminderSent: true,
      videoLink: 'https://meet.rbhpractice.com/session-001'
    },
    {
      id: 2,
      date: '2024-03-18',
      time: '10:30 AM',
      type: 'Follow-up Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed',
      location: 'Office - Room 2',
      calendarSynced: true,
      reminderSent: false
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      status: 'Active',
      calendarSynced: true,
      progressData: {
        sessions: 12,
        goals: [
          { goal: 'Reduce anxiety symptoms', progress: 75 },
          { goal: 'Improve sleep quality', progress: 90 }
        ]
      }
    },
    {
      id: 2,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      status: 'Active',
      calendarSynced: false,
      progressData: {
        sessions: 8,
        goals: [
          { goal: 'Improve mood stability', progress: 50 }
        ]
      }
    }
  ]);

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

  const handleVideoCall = (appointment) => {
    setSelectedAppointment(appointment);
    setShowVideoModal(true);
  };

  const handleViewProgress = (clientName) => {
    const client = clients.find(c => c.name === clientName);
    if (client) {
      setSelectedClient(client);
      setShowProgressModal(true);
    }
  };

  const handleSendReminder = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, reminderSent: true }
        : apt
    ));
    alert('📧 Reminder sent successfully!');
  };

  const handleSyncCalendar = (clientId) => {
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, calendarSynced: true }
        : client
    ));
    alert('📅 Google Calendar sync enabled!');
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

  // Video Call Modal
  const VideoCallModal = () => {
    if (!showVideoModal || !selectedAppointment) return null;
    
    return (
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
          maxWidth: '500px',
          width: '90%'
        }}>
          <h2 style={{ marginBottom: '20px' }}>🎥 Join Video Session</h2>
          
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: '500' }}>Session Details:</p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Client:</strong> {selectedAppointment.client}</p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Date:</strong> {selectedAppointment.date}</p>
            <p style={{ margin: '0 0 5px 0' }}><strong>Time:</strong> {selectedAppointment.time}</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setShowVideoModal(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
            <button
              onClick={() => {
                alert('🎥 Opening video call...');
                setShowVideoModal(false);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Join Video Call
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Progress Modal
  const ProgressModal = () => {
    if (!showProgressModal || !selectedClient) return null;
    
    return (
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
          maxWidth: '600px',
          width: '90%'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ margin: '0' }}>📊 Progress Tracking - {selectedClient.name}</h2>
            <button
              onClick={() => {
                setShowProgressModal(false);
                setSelectedClient(null);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>

          <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
            <p style={{ margin: '0', fontWeight: '500' }}>
              📈 Total Sessions: {selectedClient.progressData.sessions}
            </p>
          </div>

          <h3 style={{ marginBottom: '15px' }}>🎯 Treatment Goals</h3>
          {selectedClient.progressData.goals.map((goal, index) => (
            <div key={index} style={{ 
              marginBottom: '15px', 
              padding: '15px', 
              border: '1px solid #e5e7eb', 
              borderRadius: '6px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500' }}>{goal.goal}</span>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{goal.progress}%</span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '8px', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: goal.progress + '%', 
                  height: '100%', 
                  backgroundColor: goal.progress >= 80 ? '#059669' : goal.progress >= 50 ? '#d97706' : '#dc2626'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Appointment Card
  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 5px 0' }}>
            {appointment.type}
          </h3>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            {userType === 'client' ? 'with ' + appointment.therapist : 'with ' + appointment.client}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: '#dcfce7',
            color: '#166534'
          }}>
            {appointment.status}
          </span>
          {appointment.calendarSynced && (
            <span style={{
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              backgroundColor: '#dbeafe',
              color: '#1e40af'
            }}>
              📅 Calendar Synced
            </span>
          )}
          {appointment.reminderSent && (
            <span style={{
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              backgroundColor: '#dcfce7',
              color: '#166534'
            }}>
              ✅ Reminder Sent
            </span>
          )}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '15px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Date</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {appointment.date}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Time</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {appointment.time}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Location</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {appointment.location}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {userType === 'client' && appointment.location === 'Video Call' && (
          <button 
            onClick={() => handleVideoCall(appointment)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            🎥 Join Video Call
          </button>
        )}
        {userType === 'therapist' && (
          <>
            {appointment.location === 'Video Call' && (
              <button 
                onClick={() => handleVideoCall(appointment)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                🎥 Start Video Session
              </button>
            )}
            <button 
              onClick={() => handleViewProgress(appointment.client)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              📊 View Progress
            </button>
            {!appointment.reminderSent && (
              <button 
                onClick={() => handleSendReminder(appointment.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                📧 Send Reminder
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );

  // Client Card
  const renderClientCard = (client) => (
    <div key={client.id} style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 5px 0' }}>
            {client.name}
          </h3>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            {client.email}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: '#dcfce7',
            color: '#166534'
          }}>
            {client.status}
          </span>
          {client.calendarSynced && (
            <span style={{
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              backgroundColor: '#dbeafe',
              color: '#1e40af'
            }}>
              📅 Calendar Synced
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleViewProgress(client.name)}
          style={{
            padding: '6px 12px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          📊 View Progress
        </button>
        {!client.calendarSynced && (
          <button
            onClick={() => handleSyncCalendar(client.id)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            📅 Sync Calendar
          </button>
        )}
      </div>
    </div>
  );

  // Main tabs
  const tabs = userType === 'therapist' ? [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' },
    { id: 'clients', label: '👥 Clients' }
  ] : [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' }
  ];

  // Main Dashboard
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <VideoCallModal />
      <ProgressModal />

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Welcome, {userName}</h1>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer' 
          }}
        >
          Sign Out
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: '10px 20px', 
              marginRight: '10px',
              backgroundColor: activeTab === tab.id ? '#4f46e5' : '#f3f4f6',
              color: activeTab === tab.id ? 'white' : '#374151',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2>🏠 Dashboard</h2>
            <p>Welcome to your {userType} portal!</p>
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <p style={{ margin: '0', color: '#0369a1', fontWeight: '500' }}>
                🚀 <strong>Advanced Features Available:</strong>
              </p>
              <ul style={{ margin: '10px 0 0 20px', color: '#0369a1' }}>
                <li>📅 Google Calendar Integration</li>
                <li>📊 Progress Tracking</li>
                <li>🎥 Video Call Integration</li>
                <li>📧 Smart Reminders</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2 style={{ marginBottom: '25px' }}>📅 {userType === 'client' ? 'My Appointments' : 'Client Appointments'}</h2>
            <div>
              {getUserAppointments().length > 0 ? (
                getUserAppointments().map(renderAppointmentCard)
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  <p style={{ fontSize: '18px', marginBottom: '10px' }}>📅</p>
                  <p>No appointments scheduled</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            <h2 style={{ marginBottom: '25px' }}>👥 Client Management</h2>
            <div>
              {clients.map(renderClientCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
