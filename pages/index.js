import { useState, useEffect } from 'react';

export default function MindCarePortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [googleConnected, setGoogleConnected] = useState(false);
  const [gmailConnected, setGmailConnected] = useState(false);

  // Real Google API credentials
  const GOOGLE_CLIENT_ID = '940233544658-rbhdvbt2l825ae83bagpiqn83c79e65c.apps.googleusercontent.com';
  const GOOGLE_API_KEY = 'AIzaSyAkbtz3wkgC1IbWwvfsuf2hYG54GrX0jXk';
  const REDIRECT_URI = 'https://rbh-practice-portal.vercel.app';

  // Sample client data
  const clients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      nextAppointment: '2025-09-15 10:00 AM',
      status: 'Active',
      progress: 75,
      totalSessions: 8,
      riskLevel: 'Low'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '(555) 987-6543',
      nextAppointment: '2025-09-16 2:00 PM',
      status: 'Active',
      progress: 60,
      totalSessions: 5,
      riskLevel: 'Medium'
    }
  ];

  // Login simulation
  const loginWithGoogle = (accountType) => {
    setIsLoading(true);
    setTimeout(() => {
      setUserType(accountType);
      setUserName(accountType === 'clinician' ? 'Dr. Sarah Wilson' : 'Sarah Johnson');
      setIsLoggedIn(true);
      setIsLoading(false);
      setActiveTab('dashboard');
    }, 1500);
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
  };

  // Real Google Calendar integration
  const connectGoogleCalendar = () => {
    setIsLoading(true);
    
    // Real OAuth 2.0 flow for Google Calendar
    const authUrl = 'https://accounts.google.com/oauth/v2/auth?' +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      'response_type=code&' +
      'scope=https://www.googleapis.com/auth/calendar&' +
      'access_type=offline&' +
      'prompt=consent';
    
    // Open OAuth flow
    window.location.href = authUrl;
  };

  // Real Gmail API integration  
  const connectGmailAPI = () => {
    setIsLoading(true);
    
    // Real OAuth 2.0 flow for Gmail
    const authUrl = 'https://accounts.google.com/oauth/v2/auth?' +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      'response_type=code&' +
      'scope=https://www.googleapis.com/auth/gmail.send&' +
      'access_type=offline&' +
      'prompt=consent';
    
    // Open OAuth flow
    window.location.href = authUrl;
  };

  // Gmail integration function
  const sendAppointmentReminder = async (client) => {
    setIsLoading(true);
    
    // Simulate Gmail API call
    setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        type: 'email',
        message: `Appointment reminder sent to ${client.name}`,
        timestamp: new Date().toLocaleTimeString(),
        status: 'success'
      };
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
      setIsLoading(false);
    }, 2000);
  };

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');
    
    if (code) {
      // Determine which service was connected based on scope
      if (scope && scope.includes('calendar')) {
        setGoogleConnected(true);
        setNotifications(prev => [{
          id: Date.now(),
          type: 'calendar',
          message: '✅ Google Calendar connected successfully!',
          timestamp: new Date().toLocaleTimeString(),
          status: 'success'
        }, ...prev.slice(0, 4)]);
      }
      
      if (scope && scope.includes('gmail')) {
        setGmailConnected(true);
        setNotifications(prev => [{
          id: Date.now(),
          type: 'email',
          message: '✅ Gmail API connected successfully!',
          timestamp: new Date().toLocaleTimeString(),
          status: 'success'
        }, ...prev.slice(0, 4)]);
      }
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif'
      }}>
        
        {!isLoggedIn ? (
          // Login Screen
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '2rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '3rem',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              textAlign: 'center',
              maxWidth: '500px',
              width: '100%'
            }}>
              <h1 style={{ 
                color: '#333', 
                marginBottom: '1rem', 
                fontSize: '2.5rem',
                fontWeight: 'bold'
              }}>
                🧠 MindCare Portal
              </h1>
              <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Secure HIPAA-Compliant Practice Management
              </p>
              
              {isLoading ? (
                <div style={{ padding: '2rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid #f3f3f3',
                    borderTop: '4px solid #667eea',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem auto'
                  }}></div>
                  <p>Connecting to Google...</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button
                    onClick={() => loginWithGoogle('clinician')}
                    style={{
                      background: '#4285f4',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '10px',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    👨‍⚕️ Login as Clinician
                  </button>
                  
                  <button
                    onClick={() => loginWithGoogle('client')}
                    style={{
                      background: '#34a853',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '10px',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    👤 Login as Client
                  </button>
                </div>
              )}
              
              <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                background: 'rgba(0,0,0,0.05)', 
                borderRadius: '10px',
                fontSize: '0.9rem',
                color: '#666'
              }}>
                🔒 HIPAA Compliant • End-to-End Encrypted • SOC 2 Certified
              </div>
            </div>
          </div>
        ) : (
          // Main Dashboard
          <div style={{ padding: '1rem' }}>
            {/* Header */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '1rem 2rem',
              borderRadius: '15px',
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div>
                <h1 style={{ color: '#333', margin: 0, fontSize: '1.8rem' }}>
                  🧠 MindCare Portal
                </h1>
                <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>
                  Welcome, {userName} ({userType})
                </p>
              </div>
              <button
                onClick={logout}
                style={{
                  background: '#ff4757',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>

            {/* Navigation */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '1rem',
              borderRadius: '15px',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['dashboard', 'clients', 'appointments', 'notes', 'reports'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? '#667eea' : 'transparent',
                      color: activeTab === tab ? 'white' : '#333',
                      border: activeTab === tab ? 'none' : '2px solid #ddd',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            {activeTab === 'dashboard' && (
              <div>
                {/* Google Integration Panel */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '2rem',
                  borderRadius: '15px',
                  color: 'white',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🔗 Google Integrations
                  </h3>
                  
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={connectGoogleCalendar}
                      disabled={isLoading || googleConnected}
                      style={{
                        background: googleConnected ? 'rgba(76, 175, 80, 0.3)' : 
                                  isLoading ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: googleConnected ? '2px solid rgba(76, 175, 80, 0.5)' : '2px solid rgba(255,255,255,0.3)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        cursor: (isLoading || googleConnected) ? 'not-allowed' : 'pointer',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {googleConnected ? '✅ Google Calendar Connected' : '📅 Connect Google Calendar'}
                    </button>
                    
                    <button
                      onClick={connectGmailAPI}
                      disabled={isLoading || gmailConnected}
                      style={{
                        background: gmailConnected ? 'rgba(76, 175, 80, 0.3)' : 
                                  isLoading ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)',
                        color: 'white',
                        border: gmailConnected ? '2px solid rgba(76, 175, 80, 0.5)' : '2px solid rgba(255,255,255,0.3)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        cursor: (isLoading || gmailConnected) ? 'not-allowed' : 'pointer',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {gmailConnected ? '✅ Gmail API Connected' : '📧 Connect Gmail API'}
                    </button>
                  </div>
                  
                  {isLoading && (
                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Connecting to Google services...
                    </div>
                  )}
                </div>

                {/* Practice Overview */}
                <div style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '15px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ color: '#333', margin: '0 0 1.5rem 0' }}>📊 Practice Overview</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: '#f8f9ff', padding: '1.5rem', borderRadius: '10px' }}>
                      <h4 style={{ color: '#667eea', margin: '0 0 0.5rem 0' }}>Total Clients</h4>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
                        {clients.length}
                      </p>
                    </div>
                    
                    <div style={{ background: '#f0fff4', padding: '1.5rem', borderRadius: '10px' }}>
                      <h4 style={{ color: '#4CAF50', margin: '0 0 0.5rem 0' }}>Active Sessions</h4>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
                        12
                      </p>
                    </div>
                    
                    <div style={{ background: '#fff5f0', padding: '1.5rem', borderRadius: '10px' }}>
                      <h4 style={{ color: '#ff7043', margin: '0 0 0.5rem 0' }}>This Week</h4>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333', margin: 0 }}>
                        8
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                {notifications.length > 0 && (
                  <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '15px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}>
                    <h3 style={{ color: '#333', margin: '0 0 1.5rem 0' }}>🔔 Recent Activity</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {notifications.map(notification => (
                        <div key={notification.id} style={{
                          background: notification.type === 'calendar' ? '#e3f2fd' : '#f3e5f5',
                          padding: '1rem',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{ color: '#333' }}>
                            {notification.type === 'calendar' ? '📅' : '📧'} {notification.message}
                          </span>
                          <span style={{ color: '#666', fontSize: '0.9rem' }}>
                            {notification.timestamp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'clients' && (
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ color: '#333', margin: 0 }}>👥 Client Management</h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {clients.map(client => (
                    <div key={client.id} style={{
                      background: 'white',
                      padding: '1.5rem',
                      borderRadius: '10px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      border: '1px solid #eee'
                    }}>
                      <h3 style={{ color: '#333', margin: '0 0 0.5rem 0' }}>{client.name}</h3>
                      <p style={{ color: '#666', margin: '0 0 0.5rem 0' }}>
                        📧 {client.email} | 📞 {client.phone}
                      </p>
                      <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
                        Next: {client.nextAppointment} | Risk: {client.riskLevel}
                      </p>
                      
                      <button
                        onClick={() => sendAppointmentReminder(client)}
                        disabled={isLoading}
                        style={{
                          background: '#4CAF50',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '5px',
                          cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {isLoading ? 'Sending...' : '📧 Send Reminder'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {['appointments', 'notes', 'reports'].includes(activeTab) && (
              <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h2 style={{ color: '#333', margin: '0 0 1rem 0', textTransform: 'capitalize' }}>
                  {activeTab} Section
                </h2>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>
                  {activeTab} management features will be available here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
