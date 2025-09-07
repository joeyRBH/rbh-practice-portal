import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample appointment data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2024-03-18',
      time: '10:30 AM',
      type: 'Follow-up Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed'
    },
    {
      id: 3,
      date: '2024-03-20',
      time: '3:00 PM',
      type: 'Initial Consultation',
      client: 'John Smith',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'pending'
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

  // Get appointments for current user
  const getUserAppointments = () => {
    if (userType === 'client') {
      return appointments.filter(apt => apt.client === userName);
    } else {
      return appointments; // Therapist sees all appointments
    }
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
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              marginBottom: '8px',
              margin: '0 0 8px 0'
            }}>
              RBH Practice Portal
            </h1>
            <p style={{ color: '#6b7280', margin: '0' }}>
              Secure client and therapist access
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Email Address
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#374151', 
              marginBottom: '8px' 
            }}>
              Password
            </label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={() => handleLogin('client')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '12px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
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
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
          >
            Login as Therapist
          </button>

          <div style={{ textAlign: 'center' }}>
            <a href="#" style={{ color: '#4f46e5', fontSize: '14px', textDecoration: 'none' }}>
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Navigation tabs
  const tabs = [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' }
  ];

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 5px 0'
          }}>
            {appointment.type}
          </h3>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            {userType === 'client' ? `with ${appointment.therapist}` : `with ${appointment.client}`}
          </p>
        </div>
        <span style={{
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: appointment.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
          color: appointment.status === 'confirmed' ? '#166534' : '#92400e'
        }}>
          {appointment.status}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2px 0' }}>Date</p>
          <p style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {new Date(appointment.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 2px 0' }}>Time</p>
          <p style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {appointment.time}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {userType === 'client' && (
          <>
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Join Video Call
            </button>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Reschedule
            </button>
          </>
        )}
        {userType === 'therapist' && (
          <>
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Start Session
            </button>
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              View Notes
            </button>
          </>
        )}
      </div>
    </div>
  );

  // Dashboard Page
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: '0 0 5px 0'
            }}>
              Welcome back, {userName}
            </h1>
            <p style={{ 
              color: '#6b7280', 
              margin: '0',
              textTransform: 'capitalize'
            }}>
              {userType} Dashboard
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Sign Out
          </button>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '0',
          marginBottom: '20px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '15px 25px',
                  backgroundColor: activeTab === tab.id ? '#f9fafb' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #4f46e5' : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: activeTab === tab.id ? '600' : '400',
                  color: activeTab === tab.id ? '#4f46e5' : '#6b7280'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ 
                fontSize: '20px', 
                color: '#1f2937',
                marginBottom: '15px'
              }}>
                {userType === 'client' ? '🏥 Client Portal' : '👩‍⚕️ Therapist Portal'}
              </h2>
              
              <p style={{ 
                color: '#6b7280', 
                marginBottom: '30px',
                fontSize: '16px'
              }}>
                {userType === 'client' 
                  ? 'Access your appointments, messages, and billing information.' 
                  : 'Manage your practice, clients, and schedule.'}
              </p>

              <div style={{
                padding: '20px',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #0ea5e9'
              }}>
                <p style={{ 
                  color: '#0369a1', 
                  margin: '0',
                  fontWeight: '500'
                }}>
                  ✅ Login and Appointments are working! 
                  <br />
                  Click the "📅 Appointments" tab to view your schedule.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ 
                  fontSize: '20px', 
                  color: '#1f2937',
                  margin: '0'
                }}>
                  {userType === 'client' ? 'My Appointments' : 'Client Appointments'}
                </h2>
                
                {userType === 'therapist' && (
                  <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    + Schedule New
                  </button>
                )}
              </div>

              <div>
                {getUserAppointments().length > 0 ? (
                  getUserAppointments().map(renderAppointmentCard)
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#6b7280'
                  }}>
                    <p style={{ fontSize: '18px', marginBottom: '10px' }}>📅</p>
                    <p>No appointments scheduled</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
