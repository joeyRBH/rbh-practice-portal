import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [googleAccessToken, setGoogleAccessToken] = useState('');
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Google Calendar API configuration
  const GOOGLE_CLIENT_ID = 'your-actual-client-id.apps.googleusercontent.com';
  const GOOGLE_API_KEY = 'your-actual-api-key';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'scheduled',
      googleEventId: null
    }
  ]);

  const [clients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      progress: 75,
      totalSessions: 12
    }
  ]);

  const [newAppointment, setNewAppointment] = useState({
    client: '',
    date: '',
    time: '',
    duration: '60',
    type: 'Therapy Session',
    notes: ''
  });

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    notes: ''
  });

  // Initialize Google API
  useEffect(() => {
    const initializeGapi = async () => {
      if (typeof window !== 'undefined' && window.gapi) {
        await window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: GOOGLE_CLIENT_ID,
          });
        });
        
        await window.gapi.load('client', async () => {
          await window.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          });
        });
      }
    };

    // Load Google API script
    if (typeof window !== 'undefined' && !window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeGapi;
      document.body.appendChild(script);
    } else {
      initializeGapi();
    }
  }, []);

  const connectGoogleCalendar = async () => {
    try {
      if (!window.gapi || !window.gapi.auth2) {
        alert('Google API not loaded. Please refresh the page and try again.');
        return;
      }

      const authInstance = window.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn({
        scope: SCOPES
      });
      
      const accessToken = user.getAuthResponse().access_token;
      setGoogleAccessToken(accessToken);
      setIsGoogleConnected(true);
      
      // Load existing calendar events
      await loadCalendarEvents(accessToken);
      
      alert('Google Calendar connected successfully!');
    } catch (error) {
      console.error('Error connecting to Google Calendar:', error);
      alert('Failed to connect to Google Calendar. Please try again.');
    }
  };

  const loadCalendarEvents = async (accessToken) => {
    try {
      setLoadingEvents(true);
      
      const now = new Date();
      const timeMin = now.toISOString();
      const timeMax = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)).toISOString(); // Next 30 days
      
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      
      const data = await response.json();
      
      if (data.items) {
        setCalendarEvents(data.items);
        
        // Update appointments with Google Calendar events
        const updatedAppointments = appointments.map(apt => {
          const matchingEvent = data.items.find(event => 
            event.summary && event.summary.includes(apt.client)
          );
          return matchingEvent ? { ...apt, googleEventId: matchingEvent.id } : apt;
        });
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Error loading calendar events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  const createGoogleCalendarEvent = async (appointmentData) => {
    try {
      const startDateTime = new Date(`${appointmentData.date}T${appointmentData.time}`);
      const endDateTime = new Date(startDateTime.getTime() + (parseInt(appointmentData.duration) * 60000));
      
      const event = {
        summary: `Therapy Session - ${appointmentData.client}`,
        description: `${appointmentData.type}\nNotes: ${appointmentData.notes}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: [
          {
            email: clients.find(c => c.name === appointmentData.client)?.email || '',
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours before
            { method: 'popup', minutes: 30 }, // 30 minutes before
          ],
        },
      };

      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${googleAccessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      const createdEvent = await response.json();
      return createdEvent.id;
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      throw error;
    }
  };

  const deleteGoogleCalendarEvent = async (eventId) => {
    try {
      await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${googleAccessToken}`,
          },
        }
      );
    } catch (error) {
      console.error('Error deleting Google Calendar event:', error);
      throw error;
    }
  };

  const handleLogin = (type, name) => {
    setUserType(type);
    setUserName(name);
    setIsLoggedIn(true);
  };

  const handleScheduleAppointment = async () => {
    if (!newAppointment.client || !newAppointment.date || !newAppointment.time) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let googleEventId = null;
      
      // Create Google Calendar event if connected
      if (isGoogleConnected && googleAccessToken) {
        googleEventId = await createGoogleCalendarEvent(newAppointment);
      }

      const appointment = {
        id: appointments.length + 1,
        ...newAppointment,
        therapist: 'Dr. Rebecca B. Headley',
        status: 'scheduled',
        googleEventId: googleEventId
      };

      setAppointments([...appointments, appointment]);
      setNewAppointment({ client: '', date: '', time: '', duration: '60', type: 'Therapy Session', notes: '' });
      setShowModal(false);
      
      const message = isGoogleConnected 
        ? 'Appointment scheduled successfully and added to Google Calendar!'
        : 'Appointment scheduled successfully!';
      alert(message);
    } catch (error) {
      alert('Failed to schedule appointment. Please try again.');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    
    try {
      // Delete from Google Calendar if connected
      if (isGoogleConnected && appointment.googleEventId) {
        await deleteGoogleCalendarEvent(appointment.googleEventId);
      }

      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
      
      const message = isGoogleConnected 
        ? 'Appointment cancelled and removed from Google Calendar!'
        : 'Appointment cancelled!';
      alert(message);
    } catch (error) {
      alert('Failed to cancel appointment. Please try again.');
    }
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) {
      alert('Please fill in required fields (Name and Email)');
      return;
    }

    const client = {
      id: clients.length + 1,
      ...newClient,
      progress: 0,
      totalSessions: 0
    };

    setNewClient({ name: '', email: '', phone: '', emergencyContact: '', notes: '' });
    setShowModal(false);
    alert('Client added successfully!');
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
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
          width: '90%'
        }}>
          <h1 style={{ color: '#333', marginBottom: '2rem', fontSize: '2rem' }}>
            🔐 HIPAA Portal Login
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => handleLogin('therapist', 'Dr. Rebecca B. Headley')}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif'
              }}
            >
              👨‍⚕️ Login as Therapist
            </button>
            <button
              onClick={() => handleLogin('client', 'Sarah Johnson')}
              style={{
                background: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif'
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
      background: '#f5f7fa',
      fontFamily: 'Cambria, serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: '#333', margin: 0 }}>🔐 HIPAA Practice Portal</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#666' }}>Welcome, {userName}</span>
          <span style={{ 
            color: isGoogleConnected ? '#4CAF50' : '#f44336',
            fontWeight: 'bold'
          }}>
            📅 {isGoogleConnected ? 'Google Calendar Connected' : 'Google Calendar Disconnected'}
          </span>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              background: '#f44336',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: 'white',
        padding: '0 2rem',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['dashboard', 'appointments', 'clients', 'documents', 'team'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#667eea' : 'transparent',
                color: activeTab === tab ? 'white' : '#666',
                border: 'none',
                padding: '1rem 1.5rem',
                cursor: 'pointer',
                borderRadius: activeTab === tab ? '10px 10px 0 0' : '0',
                textTransform: 'capitalize',
                fontFamily: 'Cambria, serif'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>📊 Dashboard</h2>
            
            {/* Google Calendar Connection */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              marginBottom: '2rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>📅 Google Calendar Integration</h3>
              {!isGoogleConnected ? (
                <div>
                  <p style={{ color: '#666', marginBottom: '1rem' }}>
                    Connect your Google Calendar to automatically sync appointments and send reminders.
                  </p>
                  <button
                    onClick={connectGoogleCalendar}
                    style={{
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    🔗 Connect Google Calendar
                  </button>
                </div>
              ) : (
                <div>
                  <p style={{ color: '#4CAF50', marginBottom: '1rem' }}>
                    ✅ Google Calendar is connected! Appointments will be automatically synced.
                  </p>
                  {loadingEvents && <p style={{ color: '#666' }}>Loading calendar events...</p>}
                  {calendarEvents.length > 0 && (
                    <p style={{ color: '#666' }}>
                      Found {calendarEvents.length} upcoming events in your calendar.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#4CAF50', fontSize: '2rem', margin: '0' }}>{appointments.length}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Total Appointments</p>
              </div>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#2196F3', fontSize: '2rem', margin: '0' }}>{clients.length}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Active Clients</p>
              </div>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#FF9800', fontSize: '2rem', margin: '0' }}>98%</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>HIPAA Compliance</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-notes' && userType === 'therapist' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>🤖 AI Clinical Notes</h2>
            
            {/* Session Setup */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              marginBottom: '2rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>📋 Session Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                    Client Name
                  </label>
                  <select
                    value={currentNoteClient}
                    onChange={(e) => setCurrentNoteClient(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Michael Chen">Michael Chen</option>
                    <option value="Emily Rodriguez">Emily Rodriguez</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                    Session Type
                  </label>
                  <select
                    value={currentSessionType}
                    onChange={(e) => setCurrentSessionType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    <option value="Therapy Session">General Therapy</option>
                    <option value="CBT Session">CBT Session</option>
                    <option value="Trauma Therapy">Trauma Therapy</option>
                    <option value="Initial Consultation">Initial Consultation</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                    Session Date
                  </label>
                  <input
                    type="date"
                    value={currentSessionDate}
                    onChange={(e) => setCurrentSessionDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontFamily: 'Cambria, serif'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Session Notes Input */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              marginBottom: '2rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>📝 Session Documentation</h3>
              
              <div style={{
                background: '#e3f2fd',
                padding: '1rem',
                borderRadius: '5px',
                border: '1px solid #2196F3',
                marginBottom: '1rem'
              }}>
                <p style={{ color: '#1976d2', margin: 0, fontWeight: 'bold' }}>
                  💡 Enter your session notes, key client statements, observations, and therapeutic interventions
                </p>
                <p style={{ color: '#666', margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>
                  The AI will structure these into professional clinical notes
                </p>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333', fontWeight: 'bold' }}>
                  Session Notes & Observations
                </label>
                <textarea
                  value={aiTranscript}
                  onChange={(e) => setAiTranscript(e.target.value)}
                  placeholder="Enter your session notes here... Include:&#10;• Key client statements and concerns&#10;• Therapeutic interventions used&#10;• Client responses and engagement level&#10;• Behavioral observations&#10;• Progress toward treatment goals&#10;• Any homework or action items discussed"
                  style={{
                    width: '100%',
                    minHeight: '200px',
                    padding: '1rem',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontFamily: 'Cambria, serif',
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    resize: 'vertical'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{ color: '#666', fontSize: '0.8rem' }}>
                    {aiTranscript.length} characters
                  </span>
                  <button
                    onClick={generateAINotes}
                    disabled={isProcessingNotes || !aiTranscript.trim()}
                    style={{
                      background: isProcessingNotes ? '#ccc' : '#2196F3',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: isProcessingNotes ? 'not-allowed' : 'pointer',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    {isProcessingNotes ? '🤖 Generating Notes...' : '🤖 Generate AI Notes'}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Generated Notes */}
            {aiNotes && (
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                marginBottom: '2rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>🤖 AI Generated Clinical Notes</h3>
                <div style={{
                  background: '#f9f9f9',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0',
                  maxHeight: '500px',
                  overflow: 'auto'
                }}>
                  <pre style={{ 
                    margin: 0, 
                    whiteSpace: 'pre-wrap', 
                    fontFamily: 'Cambria, serif',
                    lineHeight: '1.6',
                    fontSize: '0.95rem'
                  }}>
                    {aiNotes}
                  </pre>
                </div>
                
                <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    onClick={saveSessionNotes}
                    style={{
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    💾 Save Notes
                  </button>
                  <button
                    onClick={() => setAiNotes('')}
                    style={{
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    🗑️ Clear Notes
                  </button>
                </div>
              </div>
            )}

            {/* Session Notes History */}
            {sessionNotes.length > 0 && (
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>📚 Session Notes History</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sessionNotes.map(note => (
                    <div key={note.id} style={{
                      background: '#f9f9f9',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ color: '#333', margin: '0 0 0.5rem 0' }}>
                            {note.client} - {note.type}
                          </h4>
                          <p style={{ color: '#666', margin: 0, fontSize: '0.9rem' }}>
                            📅 {note.date} | ⏰ {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => exportSessionNotes(note)}
                          style={{
                            background: '#2196F3',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          📄 Export
                        </button>
                      </div>
                      
                      <div style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '5px',
                        maxHeight: '200px',
                        overflow: 'auto'
                      }}>
                        <pre style={{ 
                          margin: 0, 
                          whiteSpace: 'pre-wrap', 
                          fontFamily: 'Cambria, serif',
                          fontSize: '0.9rem',
                          lineHeight: '1.5'
                        }}>
                          {note.notes}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: '#333', margin: 0 }}>📅 Appointments</h2>
              {userType === 'therapist' && (
                <button
                  onClick={() => openModal('schedule')}
                  style={{
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontFamily: 'Cambria, serif'
                  }}
                >
                  ➕ Schedule New Appointment
                </button>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map(appointment => (
                <div key={appointment.id} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ color: '#333', margin: '0 0 0.5rem 0' }}>{appointment.type}</h3>
                    <p style={{ color: '#666', margin: '0' }}>
                      📅 {appointment.date} at {appointment.time} | 
                      👤 {appointment.client} | 
                      👨‍⚕️ {appointment.therapist}
                      {appointment.googleEventId && (
                        <span style={{ color: '#4CAF50', marginLeft: '0.5rem' }}>
                          ✅ Synced with Google Calendar
                        </span>
                      )}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => window.open('https://meet.google.com/new', '_blank')}
                      style={{
                        background: '#2196F3',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      🎥 Join Call
                    </button>
                    {userType === 'therapist' && (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        style={{
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        ❌ Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: '#333', margin: 0 }}>👥 Client Management</h2>
              <button
                onClick={() => openModal('addClient')}
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                ➕ Add New Client
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: '#333', margin: '0 0 0.5rem 0' }}>{client.name}</h3>
                      <p style={{ color: '#666', margin: '0 0 0.5rem 0' }}>
                        📧 {client.email} | 📞 {client.phone}
                      </p>
                      <div style={{ margin: '1rem 0' }}>
                        <p style={{ color: '#666', margin: '0 0 0.5rem 0' }}>
                          Progress: {client.progress}% | Sessions: {client.totalSessions}
                        </p>
                        <div style={{
                          width: '100%',
                          height: '10px',
                          background: '#e0e0e0',
                          borderRadius: '5px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${client.progress}%`,
                            height: '100%',
                            background: '#4CAF50',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openModal('editClient')}
                        style={{
                          background: '#2196F3',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => openModal('viewProgress')}
                        style={{
                          background: '#FF9800',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        📊 Progress
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>📋 Clinical Documents</h2>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#666' }}>📁 Document Management System</h3>
              <p style={{ color: '#999' }}>Secure HIPAA-compliant document storage and management</p>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>👨‍⚕️ Team Management</h2>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#666' }}>👥 Team Collaboration & Audit Logs</h3>
              <p style={{ color: '#999' }}>Manage team access and track all system activities</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            {modalType === 'schedule' && (
              <div>
                <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>📅 Schedule New Appointment</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Client *</label>
                    <select
                      value={newAppointment.client}
                      onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      <option value="">Select a client</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.name}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Date *</label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Time *</label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Duration (minutes)</label>
                    <select
                      value={newAppointment.duration}
                      onChange={(e) => setNewAppointment({...newAppointment, duration: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Session Type</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      <option value="Therapy Session">Therapy Session</option>
                      <option value="Initial Consultation">Initial Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Group Session">Group Session</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Notes</label>
                    <textarea
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      placeholder="Any special notes for this appointment..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    onClick={handleScheduleAppointment}
                    style={{
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      flex: 1,
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    {isGoogleConnected ? '📅 Schedule & Add to Calendar' : '📅 Schedule Appointment'}
                  </button>
                  <button
                    onClick={closeModal}
                    style={{
                      background: '#666',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {modalType === 'addClient' && (
              <div>
                <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>👤 Add New Client</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Full Name *</label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Email Address *</label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Phone Number</label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Emergency Contact</label>
                    <input
                      type="text"
                      value={newClient.emergencyContact}
                      onChange={(e) => setNewClient({...newClient, emergencyContact: e.target.value})}
                      placeholder="Name and phone number"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>Initial Notes</label>
                    <textarea
                      value={newClient.notes}
                      onChange={(e) => setNewClient({...newClient, notes: e.target.value})}
                      placeholder="Any relevant information about the client..."
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontFamily: 'Cambria, serif',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    onClick={handleAddClient}
                    style={{
                      background: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      flex: 1,
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    ➕ Add Client
                  </button>
                  <button
                    onClick={closeModal}
                    style={{
                      background: '#666',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {modalType === 'editClient' && (
              <div>
                <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>✏️ Edit Client Information</h3>
                <div style={{
                  padding: '2rem',
                  background: '#f9f9f9',
                  borderRadius: '5px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#666' }}>Client editing functionality will be implemented here.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    onClick={closeModal}
                    style={{
                      background: '#666',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      width: '100%',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {modalType === 'viewProgress' && (
              <div>
                <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>📊 Client Progress</h3>
                <div style={{
                  padding: '2rem',
                  background: '#f9f9f9',
                  borderRadius: '5px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: '#666' }}>Detailed progress tracking and analytics will be displayed here.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <button
                    onClick={closeModal}
                    style={{
                      background: '#666',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      width: '100%',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
