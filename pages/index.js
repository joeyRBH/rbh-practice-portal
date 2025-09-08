import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [debugMessages, setDebugMessages] = useState([]);

  // Google Calendar Configuration
  const GOOGLE_CLIENT_ID = '940233544658-gec57taau0pkrlcdd81aqs4ssi1ll9bt.apps.googleusercontent.com';
  const REDIRECT_URI = typeof window !== 'undefined' ? window.location.origin : '';
  const SCOPE = 'https://www.googleapis.com/auth/calendar';

  const addDebugMessage = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugMessages(prev => [...prev, `${timestamp}: ${message}`]);
    console.log('Debug:', message);
  };

  // Check if user is returning from Google OAuth
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (code) {
        addDebugMessage('OAuth authorization code received');
        setIsGoogleConnected(true);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
        alert('Google Calendar connected successfully!');
      } else if (error) {
        addDebugMessage(`OAuth error: ${error}`);
        alert(`Google connection failed: ${error}`);
      }
    }
  }, []);

  // Direct OAuth URL method - most reliable
  const connectGoogleCalendar = () => {
    addDebugMessage('Starting direct OAuth flow...');
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(SCOPE)}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;

    addDebugMessage(`Redirecting to: ${authUrl}`);
    
    // Direct redirect to Google OAuth
    window.location.href = authUrl;
  };

  const disconnectGoogleCalendar = () => {
    addDebugMessage('Disconnecting Google Calendar...');
    setIsGoogleConnected(false);
    alert('Google Calendar disconnected');
  };

  const handleLogin = (type, name) => {
    setUserType(type);
    setUserName(name);
    setIsLoggedIn(true);
  };

  // Sample data
  const appointments = [
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley'
    }
  ];

  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      progress: 75,
      totalSessions: 12
    }
  ];

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Cambria, serif'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#333',
            fontWeight: 'bold'
          }}>
            🏥 RBH Practice Portal
          </h1>
          
          <p style={{ 
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Secure access to your practice management system
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => handleLogin('therapist', 'Dr. Rebecca B. Headley')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                marginBottom: '1rem',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👩‍⚕️ Login as Therapist
            </button>
            
            <button
              onClick={() => handleLogin('client', 'Sarah Johnson')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👤 Login as Client
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Cambria, serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          🏥 RBH Practice Portal
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1rem' }}>Welcome, {userName}</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Cambria, serif'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '2rem 0'
        }}>
          <nav>
            {['dashboard', 'appointments', 'clients'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                  color: 'white',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'Cambria, serif',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'dashboard' && '📊'} 
                {tab === 'appointments' && '📅'} 
                {tab === 'clients' && '👥'} 
                {' '}{tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                Dashboard
              </h2>
              
              {/* Google Calendar Integration Card */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  📅 Google Calendar Integration
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <p style={{ margin: 0, color: '#64748b' }}>
                      Status: {' '}
                      <span style={{ 
                        color: isGoogleConnected ? '#059669' : '#dc2626',
                        fontWeight: 'bold'
                      }}>
                        {isGoogleConnected ? '✅ Connected' : '❌ Not Connected'}
                      </span>
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                      {isGoogleConnected 
                        ? 'Calendar sync is active!' 
                        : 'Connect to sync appointments automatically'
                      }
                    </p>
                  </div>
                  
                  {!isGoogleConnected ? (
                    <button
                      onClick={connectGoogleCalendar}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#4285f4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontFamily: 'Cambria, serif',
                        fontWeight: 'bold'
                      }}
                    >
                      🔗 Connect Google Calendar
                    </button>
                  ) : (
                    <button
                      onClick={disconnectGoogleCalendar}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontFamily: 'Cambria, serif',
                        fontWeight: 'bold'
                      }}
                    >
                      🔌 Disconnect
                    </button>
                  )}
                </div>

                {!isGoogleConnected && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f59e0b',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem' }}>
                      💡 <strong>Why connect?</strong> Automatically sync your appointments to Google Calendar and send calendar invitations to your clients.
                    </p>
                  </div>
                )}

                {/* Current URL Info */}
                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '0.9rem' }}>
                    🔧 OAuth Configuration:
                  </h4>
                  <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#475569' }}>
                    <div><strong>Client ID:</strong> {GOOGLE_CLIENT_ID}</div>
                    <div><strong>Redirect URI:</strong> {REDIRECT_URI}</div>
                    <div><strong>Scope:</strong> {SCOPE}</div>
                  </div>
                </div>

                {/* Debug Section */}
                <div style={{
                  backgroundColor: '#f1f5f9',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '0.9rem' }}>
                    🔍 Debug Information:
                  </h4>
                  <div style={{
                    maxHeight: '150px',
                    overflowY: 'auto',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace'
                  }}>
                    {debugMessages.length === 0 ? (
                      <div style={{ color: '#64748b' }}>No debug messages yet...</div>
                    ) : (
                      debugMessages.slice(-10).map((msg, index) => (
                        <div key={index} style={{ 
                          color: msg.includes('ERROR') ? '#dc2626' : '#475569',
                          marginBottom: '0.25rem'
                        }}>
                          {msg}
                        </div>
                      ))
                    )}
                  </div>
                  {debugMessages.length > 0 && (
                    <button
                      onClick={() => setDebugMessages([])}
                      style={{
                        marginTop: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#64748b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Clear Debug Log
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#4f46e5' }}>
                    {appointments.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Total Appointments</p>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#059669' }}>
                    {clients.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Active Clients</p>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: isGoogleConnected ? '#059669' : '#dc2626' }}>
                    {isGoogleConnected ? '✅' : '❌'}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Calendar Sync</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                📅 Appointments
              </h2>

              <div style={{ 
                display: 'grid', 
                gap: '1rem'
              }}>
                {appointments.map((appointment) => (
                  <div key={appointment.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                        {appointment.type}
                      </h3>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        📅 {appointment.date} at {appointment.time}
                      </p>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        👤 {userType === 'therapist' ? appointment.client : appointment.therapist}
                      </p>
                      {isGoogleConnected && (
                        <p style={{ margin: '0.25rem 0 0 0', color: '#059669', fontSize: '0.9rem' }}>
                          ✅ Synced to Google Calendar
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => alert('Reschedule feature coming soon!')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📅 Reschedule
                      </button>
                      <button
                        onClick={() => window.open('https://meet.google.com/new', '_blank')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🎥 Join Video Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                👥 Clients
              </h2>

              <div style={{ 
                display: 'grid', 
                gap: '1rem'
              }}>
                {clients.map((client) => (
                  <div key={client.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                          {client.name}
                        </h3>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          📧 {client.email}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          📞 {client.phone}
                        </p>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
                          Sessions: {client.totalSessions}
                        </p>
                      </div>
                      {userType === 'therapist' && (
                        <button
                          onClick={() => alert('Edit client feature coming soon!')}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#64748b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontFamily: 'Cambria, serif'
                          }}
                        >
                          ✏️ Edit Information
                        </button>
                      )}
                    </div>
                    
                    <div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ color: '#64748b' }}>Treatment Progress</span>
                        <span style={{ color: '#1e293b', fontWeight: 'bold' }}>
                          {client.progress}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${client.progress}%`,
                          height: '100%',
                          backgroundColor: '#4f46e5',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
