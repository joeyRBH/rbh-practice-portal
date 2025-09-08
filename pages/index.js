import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState(null);
  const [debugMessages, setDebugMessages] = useState([]);

  // Google Calendar Configuration
  const GOOGLE_CLIENT_ID = '940233544658-gec57taau0pkrlcdd81aqs4ssi1ll9bt.apps.googleusercontent.com';
  const GOOGLE_API_KEY = 'AIzaSyAkbtz3wkgC1IbWwvfsuf2hYG54GrX0jXk';
  const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/calendar';

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      googleEventId: null
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      progress: 75,
      totalSessions: 12
    }
  ]);

  const addDebugMessage = (message) => {
    setDebugMessages(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log('Debug:', message);
  };

  // Load Google API with better error handling
  useEffect(() => {
    const loadGoogleAPI = () => {
      addDebugMessage('Starting to load Google API...');
      
      if (typeof window !== 'undefined') {
        if (window.gapi) {
          addDebugMessage('Google API already loaded, initializing...');
          initializeGapi();
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
          addDebugMessage('Google API script loaded, loading client and auth...');
          window.gapi.load('client:auth2', () => {
            addDebugMessage('Google client and auth2 loaded, initializing...');
            initializeGapi();
          });
        };
        script.onerror = () => {
          addDebugMessage('ERROR: Failed to load Google API script');
        };
        document.body.appendChild(script);
      }
    };

    const initializeGapi = async () => {
      try {
        addDebugMessage('Initializing Google API client...');
        
        await window.gapi.client.init({
          apiKey: GOOGLE_API_KEY,
          clientId: GOOGLE_CLIENT_ID,
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          scope: GOOGLE_SCOPE
        });

        addDebugMessage('Google API client initialized successfully');

        const authInstance = window.gapi.auth2.getAuthInstance();
        if (authInstance && authInstance.isSignedIn.get()) {
          addDebugMessage('User is already signed in');
          const user = authInstance.currentUser.get();
          const accessToken = user.getAuthResponse().access_token;
          setIsGoogleConnected(true);
          setGoogleAccessToken(accessToken);
        } else {
          addDebugMessage('User is not signed in');
        }
      } catch (error) {
        addDebugMessage(`ERROR initializing Google API: ${error.message}`);
        console.error('Error initializing Google API:', error);
      }
    };

    loadGoogleAPI();
  }, []);

  // Simplified Google Calendar Authentication
  const connectGoogleCalendar = async () => {
    try {
      addDebugMessage('Starting Google Calendar connection...');

      if (!window.gapi) {
        addDebugMessage('ERROR: Google API not loaded');
        alert('Google API not loaded. Please refresh and try again.');
        return;
      }

      if (!window.gapi.auth2) {
        addDebugMessage('ERROR: Google Auth2 not loaded');
        alert('Google Auth not loaded. Please refresh and try again.');
        return;
      }

      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance) {
        addDebugMessage('ERROR: Auth instance not available');
        alert('Google Auth not initialized. Please refresh and try again.');
        return;
      }

      addDebugMessage('Requesting user sign-in...');
      
      const user = await authInstance.signIn({
        scope: GOOGLE_SCOPE
      });

      addDebugMessage('Sign-in completed, checking if user is signed in...');

      if (user && user.isSignedIn()) {
        addDebugMessage('User successfully signed in');
        const accessToken = user.getAuthResponse().access_token;
        
        if (accessToken) {
          addDebugMessage('Access token obtained successfully');
          setIsGoogleConnected(true);
          setGoogleAccessToken(accessToken);
          alert('Google Calendar connected successfully!');
        } else {
          addDebugMessage('ERROR: No access token received');
          alert('Failed to get access token. Please try again.');
        }
      } else {
        addDebugMessage('ERROR: User did not sign in or sign-in failed');
        alert('Sign-in was not completed. Please try again.');
      }
    } catch (error) {
      addDebugMessage(`ERROR during sign-in: ${error.message}`);
      console.error('Error connecting to Google Calendar:', error);
      alert(`Failed to connect: ${error.message}`);
    }
  };

  // Disconnect Google Calendar
  const disconnectGoogleCalendar = () => {
    addDebugMessage('Disconnecting Google Calendar...');
    
    if (window.gapi && window.gapi.auth2) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance) {
        authInstance.signOut();
      }
    }
    
    setIsGoogleConnected(false);
    setGoogleAccessToken(null);
    addDebugMessage('Google Calendar disconnected');
    alert('Google Calendar disconnected.');
  };

  // Create event in Google Calendar
  const createGoogleCalendarEvent = async (appointment) => {
    if (!googleAccessToken) {
      alert('Please connect Google Calendar first.');
      return;
    }

    try {
      addDebugMessage('Creating Google Calendar event...');
      
      const event = {
        summary: `${appointment.type} - ${appointment.client}`,
        description: `Appointment with ${appointment.client}`,
        start: {
          dateTime: `${appointment.date}T${convertTo24Hour(appointment.time)}:00`,
          timeZone: 'America/New_York'
        },
        end: {
          dateTime: `${appointment.date}T${addHour(convertTo24Hour(appointment.time))}:00`,
          timeZone: 'America/New_York'
        },
        attendees: [
          { email: getClientEmail(appointment.client) }
        ]
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      addDebugMessage('Calendar event created successfully');
      return response.result.id;
    } catch (error) {
      addDebugMessage(`ERROR creating calendar event: ${error.message}`);
      console.error('Error creating calendar event:', error);
      alert('Failed to create calendar event.');
      return null;
    }
  };

  // Helper functions
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  const addHour = (time24h) => {
    const [hours, minutes] = time24h.split(':');
    const newHour = (parseInt(hours, 10) + 1).toString().padStart(2, '0');
    return `${newHour}:${minutes}`;
  };

  const getClientEmail = (clientName) => {
    const client = clients.find(c => c.name === clientName);
    return client ? client.email : '';
  };

  const handleLogin = (type, name) => {
    setUserType(type);
    setUserName(name);
    setIsLoggedIn(true);
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const handleScheduleAppointment = async (formData) => {
    const newAppointment = {
      id: appointments.length + 1,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      client: formData.client,
      therapist: 'Dr. Rebecca B. Headley',
      googleEventId: null
    };

    // Create Google Calendar event if connected
    if (isGoogleConnected) {
      const eventId = await createGoogleCalendarEvent(newAppointment);
      newAppointment.googleEventId = eventId;
    }

    setAppointments([...appointments, newAppointment]);
    closeModal();
    
    const message = isGoogleConnected 
      ? 'Appointment scheduled and added to Google Calendar!'
      : 'Appointment scheduled! Connect Google Calendar to sync automatically.';
    alert(message);
  };

  const handleAddClient = (formData) => {
    const newClient = {
      id: clients.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      progress: 0,
      totalSessions: 0
    };
    setClients([...clients, newClient]);
    closeModal();
    alert('Client added successfully!');
  };

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
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3730a3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
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
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
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
                  textTransform: 'capitalize',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab) e.target.style.backgroundColor = '#334155';
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab) e.target.style.backgroundColor = 'transparent';
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
                    {isGoogleConnected && (
                      <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                        Appointments will automatically sync to your Google Calendar
                      </p>
                    )}
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
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
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
                    border: '1px solid #f59e0b'
                  }}>
                    <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem' }}>
                      💡 <strong>Connect your Google Calendar</strong> to automatically sync appointments and send calendar invitations to your clients.
                    </p>
                  </div>
                )}

                {/* Debug Section */}
                {debugMessages.length > 0 && (
                  <div style={{
                    marginTop: '1rem',
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
                      {debugMessages.slice(-10).map((msg, index) => (
                        <div key={index} style={{ 
                          color: msg.includes('ERROR') ? '#dc2626' : '#475569',
                          marginBottom: '0.25rem'
                        }}>
                          {msg}
                        </div>
                      ))}
                    </div>
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
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem',
                marginBottom: '2rem'
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
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#dc2626' }}>
                    {appointments.filter(apt => apt.googleEventId).length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Synced to Calendar</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  📅 Appointments
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => openModal('schedule')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Schedule New Appointment
                  </button>
                )}
              </div>

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
                      {appointment.googleEventId && (
                        <p style={{ margin: '0.25rem 0 0 0', color: '#059669', fontSize: '0.9rem' }}>
                          ✅ Synced to Google Calendar
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openModal('reschedule')}
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
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  👥 Clients
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => openModal('addClient')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Add New Client
                  </button>
                )}
              </div>

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
                          onClick={() => openModal('editClient')}
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
