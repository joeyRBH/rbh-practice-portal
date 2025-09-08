import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Google Calendar states
  const [isGoogleAuthed, setIsGoogleAuthed] = useState(false);
  const [gapi, setGapi] = useState(null);
  const [calendarLoading, setCalendarLoading] = useState(false);

  // Form states
  const [scheduleForm, setScheduleForm] = useState({
    client: '',
    date: '',
    time: '',
    type: 'Therapy Session',
    duration: '50',
    location: 'Video Call'
  });

  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      location: 'Video Call',
      duration: '50 minutes',
      googleEventId: null
    },
    {
      id: 2,
      date: '2024-03-18',
      time: '10:30 AM',
      type: 'Follow-up Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      location: 'Office - Room 2',
      duration: '50 minutes',
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
      totalSessions: 12,
      notes: 'Making excellent progress with anxiety management'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@email.com',
      phone: '(555) 234-5678',
      progress: 45,
      totalSessions: 6,
      notes: 'Working on depression and work-life balance'
    }
  ]);

  // Google Calendar Configuration
  const GOOGLE_CONFIG = {
    apiKey: 'AIzaSyAkbtz3wkgC1IbWwvfsuf2hYG54GrX0jXk',
    clientId: '940233544658-37dhd1k6cdfgu9akmltbiflvr3uv2dt3.apps.googleusercontent.com',
    discoveryDoc: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    scopes: 'https://www.googleapis.com/auth/calendar'
  };

  // Initialize Google Calendar API
  useEffect(() => {
    const initializeGapi = async () => {
      if (typeof window !== 'undefined' && window.gapi) {
        try {
          await window.gapi.load('client:auth2', initGoogleAPI);
        } catch (error) {
          console.log('Google API not available - using fallback mode');
        }
      }
    };

    const initGoogleAPI = async () => {
      try {
        await window.gapi.client.init({
          apiKey: GOOGLE_CONFIG.apiKey,
          clientId: GOOGLE_CONFIG.clientId,
          discoveryDocs: [GOOGLE_CONFIG.discoveryDoc],
          scope: GOOGLE_CONFIG.scopes
        });

        setGapi(window.gapi);
        
        const authInstance = window.gapi.auth2.getAuthInstance();
        setIsGoogleAuthed(authInstance.isSignedIn.get());
        
        authInstance.isSignedIn.listen(setIsGoogleAuthed);
      } catch (error) {
        console.log('Google Calendar API initialization failed:', error);
      }
    };

    // Load Google API script
    if (!window.gapi) {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = initializeGapi;
      document.body.appendChild(script);
    } else {
      initializeGapi();
    }
  }, []);

  // Google Calendar Functions
  const signInToGoogle = () => {
    if (gapi && gapi.auth2) {
      gapi.auth2.getAuthInstance().signIn();
    } else {
      alert('📅 Google Calendar integration will be available once API keys are configured');
    }
  };

  const signOutFromGoogle = () => {
    if (gapi && gapi.auth2) {
      gapi.auth2.getAuthInstance().signOut();
    }
  };

  const createGoogleCalendarEvent = async (appointment) => {
    if (!gapi || !isGoogleAuthed) {
      console.log('Google Calendar not available - appointment saved locally only');
      return null;
    }

    try {
      setCalendarLoading(true);
      
      const startDateTime = new Date(`${appointment.date}T${convertTo24Hour(appointment.time)}`);
      const endDateTime = new Date(startDateTime.getTime() + (parseInt(appointment.duration) * 60000));

      const event = {
        summary: `${appointment.type} - ${appointment.client}`,
        description: `Therapy session with ${appointment.client}\nType: ${appointment.type}\nLocation: ${appointment.location}`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'America/Denver'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'America/Denver'
        },
        attendees: [
          { email: getClientEmail(appointment.client) }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours
            { method: 'popup', minutes: 30 }       // 30 minutes
          ]
        }
      };

      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      setCalendarLoading(false);
      return response.result.id;
    } catch (error) {
      console.error('Failed to create Google Calendar event:', error);
      setCalendarLoading(false);
      return null;
    }
  };

  const deleteGoogleCalendarEvent = async (googleEventId) => {
    if (!gapi || !isGoogleAuthed || !googleEventId) return;

    try {
      await gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: googleEventId
      });
    } catch (error) {
      console.error('Failed to delete Google Calendar event:', error);
    }
  };

  // Helper functions
  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    return `${hours.padStart(2, '0')}:${minutes}:00`;
  };

  const getClientEmail = (clientName) => {
    const client = clients.find(c => c.name === clientName);
    return client ? client.email : '';
  };

  // Modal handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
    
    if (type === 'edit-client' && item) {
      setClientForm({
        name: item.name,
        email: item.email,
        phone: item.phone
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
    setScheduleForm({ client: '', date: '', time: '', type: 'Therapy Session', duration: '50', location: 'Video Call' });
    setClientForm({ name: '', email: '', phone: '' });
  };

  // Form submission handlers
  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    
    if (!scheduleForm.client || !scheduleForm.date || !scheduleForm.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      date: scheduleForm.date,
      time: scheduleForm.time,
      type: scheduleForm.type,
      client: scheduleForm.client,
      therapist: 'Dr. Rebecca B. Headley',
      location: scheduleForm.location,
      duration: scheduleForm.duration + ' minutes',
      googleEventId: null
    };

    // Create Google Calendar event
    const googleEventId = await createGoogleCalendarEvent({
      ...newAppointment,
      duration: scheduleForm.duration
    });
    
    if (googleEventId) {
      newAppointment.googleEventId = googleEventId;
    }

    setAppointments([...appointments, newAppointment]);
    closeModal();
    
    if (googleEventId) {
      alert('✅ Appointment scheduled and added to Google Calendar!');
    } else {
      alert('✅ Appointment scheduled locally! (Connect Google Calendar for sync)');
    }
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    
    if (!clientForm.name || !clientForm.email || !clientForm.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const newClient = {
      id: clients.length + 1,
      ...clientForm,
      progress: 0,
      totalSessions: 0,
      notes: 'New client'
    };

    setClients([...clients, newClient]);
    closeModal();
    alert('✅ Client added successfully!');
  };

  const handleEditClient = (e) => {
    e.preventDefault();
    
    setClients(clients.map(client => 
      client.id === selectedItem.id 
        ? { ...client, ...clientForm }
        : client
    ));
    
    closeModal();
    alert('✅ Client information updated successfully!');
  };

  const handleCancelAppointment = async (appointment) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // Delete from Google Calendar if it exists
      if (appointment.googleEventId) {
        await deleteGoogleCalendarEvent(appointment.googleEventId);
      }
      
      setAppointments(appointments.filter(apt => apt.id !== appointment.id));
      alert('❌ Appointment cancelled and removed from Google Calendar');
    }
  };

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Cambria, serif'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ marginBottom: '30px', color: '#1f2937', fontSize: '28px' }}>
            RBH Practice Portal
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setUserType('therapist');
                setUserName('Dr. Rebecca B. Headley');
              }}
              style={{
                padding: '15px 25px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                cursor: 'pointer',
                fontWeight: '600',
                fontFamily: 'Cambria, serif'
              }}
            >
              🩺 Login as Therapist
            </button>
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setUserType('client');
                setUserName('Sarah Johnson');
              }}
              style={{
                padding: '15px 25px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                cursor: 'pointer',
                fontWeight: '600',
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Cambria, serif' }}>
      <nav style={{ 
        backgroundColor: 'white', 
        padding: '15px 30px', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#1f2937', fontSize: '24px' }}>
          RBH Practice Portal
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Google Calendar Status */}
          {userType === 'therapist' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isGoogleAuthed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#10b981', fontSize: '14px' }}>
                    📅 Google Calendar Connected
                  </span>
                  <button
                    onClick={signOutFromGoogle}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInToGoogle}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#4285f4',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontFamily: 'Cambria, serif'
                  }}
                >
                  📅 Connect Google Calendar
                </button>
              )}
            </div>
          )}
          
          <span style={{ color: '#6b7280' }}>Welcome, {userName}</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ef4444',
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
      </nav>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '0 30px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '30px' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'dashboard' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'dashboard' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'dashboard' ? '600' : '400',
              fontFamily: 'Cambria, serif'
            }}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'appointments' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'appointments' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'appointments' ? '600' : '400',
              fontFamily: 'Cambria, serif'
            }}
          >
            📅 Appointments
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'clients' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'clients' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'clients' ? '600' : '400',
              fontFamily: 'Cambria, serif'
            }}
          >
            👥 Clients
          </button>
        </div>
      </div>

      <div style={{ padding: '30px' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>Dashboard</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#6366f1' }}>📅 Total Appointments</h3>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
                  {appointments.length}
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#059669' }}>👥 Total Clients</h3>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
                  {clients.length}
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#4285f4' }}>📅 Google Calendar</h3>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
                  {isGoogleAuthed ? '✅ Connected' : '❌ Not Connected'}
                </p>
                <p style={{ fontSize: '14px', margin: '8px 0 0 0', color: '#6b7280' }}>
                  {isGoogleAuthed ? 'Appointments sync automatically' : 'Connect for real-time sync'}
                </p>
              </div>
            </div>

            {userType === 'therapist' && (
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>⚡ Quick Actions</h3>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => openModal('schedule')}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    ➕ Schedule New Appointment
                  </button>
                  <button
                    onClick={() => openModal('add-client')}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    ➕ Add New Client
                  </button>
                  
                  {!isGoogleAuthed && (
                    <button
                      onClick={signInToGoogle}
                      style={{
                        padding: '12px 20px',
                        backgroundColor: '#4285f4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      📅 Connect Google Calendar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#1f2937' }}>📅 Appointments</h2>
              {userType === 'therapist' && (
                <button
                  onClick={() => openModal('schedule')}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'Cambria, serif'
                  }}
                >
                  ➕ Schedule New Appointment
                </button>
              )}
            </div>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {appointments
                .filter(apt => userType === 'therapist' || apt.client === userName)
                .map(appointment => (
                <div key={appointment.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
                      {appointment.type}
                    </h3>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                      📅 {appointment.date} at {appointment.time}
                    </p>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                      👤 {userType === 'therapist' ? appointment.client : appointment.therapist}
                    </p>
                    <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>
                      📍 {appointment.location} • ⏱️ {appointment.duration}
                    </p>
                    
                    {/* Google Calendar Status */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '12px',
                        padding: '2px 6px',
                        backgroundColor: appointment.googleEventId ? '#dcfce7' : '#fef3c7',
                        color: appointment.googleEventId ? '#166534' : '#92400e',
                        borderRadius: '4px'
                      }}>
                        {appointment.googleEventId ? '📅 Google Calendar Synced' : '📅 Local Only'}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    {appointment.location === 'Video Call' && (
                      <button
                        onClick={() => openModal('video', appointment)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🎥 Join Video Call
                      </button>
                    )}
                    
                    <button
                      onClick={() => openModal('reschedule', appointment)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      📅 Reschedule
                    </button>
                    
                    <button
                      onClick={() => handleCancelAppointment(appointment)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      ❌ Cancel
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
              <h2 style={{ margin: 0, color: '#1f2937' }}>👥 Clients</h2>
              <button
                onClick={() => openModal('add-client')}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  fontFamily: 'Cambria, serif'
                }}
              >
                ➕ Add New Client
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {clients.map(client => (
                <div key={client.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3
