import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // AI Note Taking States
  const [sessionInput, setSessionInput] = useState('');
  const [aiNotes, setAiNotes] = useState('');
  const [isProcessingNotes, setIsProcessingNotes] = useState(false);
  const [savedSessionNotes, setSavedSessionNotes] = useState([]);
  const [currentNoteClient, setCurrentNoteClient] = useState('Sarah Johnson');
  const [currentSessionType, setCurrentSessionType] = useState('Therapy Session');
  const [currentSessionDate, setCurrentSessionDate] = useState(new Date().toISOString().split('T')[0]);

  // Notification System States
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [isTestingNotifications, setIsTestingNotifications] = useState(false);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'scheduled'
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

  // Notification Functions
  const sendTestNotifications = async () => {
    setIsTestingNotifications(true);
    
    try {
      // Simulate sending email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const emailNotification = {
        id: Date.now(),
        type: 'email',
        recipient: 'sarah@email.com',
        subject: 'Test Email - Appointment Confirmation',
        content: 'This is a test email notification for your upcoming therapy session.',
        status: 'sent',
        sentAt: new Date().toISOString()
      };
      
      setNotificationHistory(prev => [emailNotification, ...prev]);
      
      // Simulate sending SMS
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const smsNotification = {
        id: Date.now() + 1,
        type: 'sms',
        recipient: '(555) 123-4567',
        content: 'Test SMS: Your therapy appointment is confirmed for tomorrow at 2:00 PM.',
        status: 'sent',
        sentAt: new Date().toISOString()
      };
      
      setNotificationHistory(prev => [smsNotification, ...prev]);
      
      alert('Test notifications sent successfully! Check the notification history below.');
      
    } catch (error) {
      alert('Test failed: ' + error.message);
    } finally {
      setIsTestingNotifications(false);
    }
  };

  const scheduleNotifications = async (appointmentData) => {
    try {
      const client = clients.find(c => c.name === appointmentData.client);
      if (!client) return;

      // Send confirmation email
      const emailNotification = {
        id: Date.now(),
        type: 'email',
        recipient: client.email,
        subject: `Appointment Confirmation - ${appointmentData.date} at ${appointmentData.time}`,
        content: `Dear ${appointmentData.client}, your ${appointmentData.type} is confirmed for ${appointmentData.date} at ${appointmentData.time}.`,
        status: 'sent',
        sentAt: new Date().toISOString(),
        appointmentId: appointmentData.id
      };
      
      setNotificationHistory(prev => [emailNotification, ...prev]);

      // Send confirmation SMS if phone available
      if (client.phone) {
        const smsNotification = {
          id: Date.now() + 1,
          type: 'sms',
          recipient: client.phone,
          content: `Appointment confirmed: ${appointmentData.date} at ${appointmentData.time} with Dr. Rebecca B. Headley.`,
          status: 'sent',
          sentAt: new Date().toISOString(),
          appointmentId: appointmentData.id
        };
        
        setNotificationHistory(prev => [smsNotification, ...prev]);
      }

    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  };

  // AI Note Functions
  const generateAINotes = async () => {
    if (!sessionInput.trim()) {
      alert('Please enter session notes in the text area.');
      return;
    }

    setIsProcessingNotes(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAINotes = `## Clinical Session Notes

**Client:** ${currentNoteClient}
**Date:** ${currentSessionDate}
**Session Type:** ${currentSessionType}
**Duration:** 50 minutes

### Presenting Concerns
Based on session notes: "${sessionInput.substring(0, 100)}${sessionInput.length > 100 ? '...' : ''}"

### Therapeutic Interventions
- Cognitive behavioral techniques discussed
- Mindfulness and grounding exercises practiced
- Psychoeducation provided on anxiety management

### Client Response & Engagement
Client was engaged and receptive to therapeutic interventions. Demonstrated good insight and willingness to practice new coping strategies.

### Progress Toward Goals
- Goal 1 (Reduce anxiety symptoms): Moderate progress noted
- Goal 2 (Improve coping skills): Good progress with breathing techniques

### Homework Assigned
1. Practice daily mindfulness exercises (10 minutes)
2. Complete thought monitoring worksheet
3. Apply breathing techniques when anxiety arises

### Clinical Observations
- Client appeared more relaxed by end of session
- Good eye contact maintained throughout
- Demonstrated understanding of concepts discussed

### Plan for Next Session
- Review homework completion and effectiveness
- Continue CBT techniques for anxiety management
- Assess progress on treatment goals

### Risk Assessment
No immediate safety concerns identified. Client stable and appropriate for continued outpatient treatment.`;

      setAiNotes(mockAINotes);
    } catch (error) {
      alert('Error generating AI notes. Please try again.');
    } finally {
      setIsProcessingNotes(false);
    }
  };

  const saveSessionNotes = () => {
    if (!aiNotes.trim()) {
      alert('No notes to save. Please generate AI notes first.');
      return;
    }

    const newNote = {
      id: Date.now(),
      client: currentNoteClient,
      date: currentSessionDate,
      type: currentSessionType,
      originalNotes: sessionInput,
      aiNotes: aiNotes,
      createdAt: new Date().toISOString()
    };

    setSavedSessionNotes(prev => [newNote, ...prev]);
    setSessionInput('');
    setAiNotes('');
    alert('Session notes saved successfully!');
  };

  const exportSessionNotes = (note) => {
    const content = `# Session Notes - ${note.client}

**Date:** ${note.date}
**Type:** ${note.type}
**Created:** ${new Date(note.createdAt).toLocaleString()}

## Original Session Notes
${note.originalNotes}

## AI Generated Clinical Notes
${note.aiNotes}`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-notes-${note.client}-${note.date}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Appointment Functions
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
      const appointmentData = {
        ...newAppointment,
        id: appointments.length + 1,
        therapist: 'Dr. Rebecca B. Headley',
        status: 'scheduled'
      };

      setAppointments(prev => [...prev, appointmentData]);
      await scheduleNotifications(appointmentData);
      
      setNewAppointment({ client: '', date: '', time: '', duration: '60', type: 'Therapy Session', notes: '' });
      setShowModal(false);
      
      alert('Appointment scheduled successfully! Confirmation notifications have been sent.');
    } catch (error) {
      alert('Failed to schedule appointment. Please try again.');
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    alert('Appointment cancelled successfully!');
  };

  const handleAddClient = () => {
    if (!newClient.name || !newClient.email) {
      alert('Please fill in required fields (Name and Email)');
      return;
    }

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
          {userType === 'therapist' ? 
            ['dashboard', 'appointments', 'clients', 'ai-notes', 'notifications'].map(tab => (
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
                {tab === 'ai-notes' ? '🤖 AI Notes' : 
                 tab === 'notifications' ? '📧 Notifications' :
                 tab}
              </button>
            )) :
            ['dashboard', 'appointments'].map(tab => (
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
            ))
          }
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>📊 Dashboard</h2>
            
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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
                <h3 style={{ color: '#9c27b0', fontSize: '2rem', margin: '0' }}>{savedSessionNotes.length}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>AI Notes Generated</p>
              </div>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#e91e63', fontSize: '2rem', margin: '0' }}>{notificationHistory.length}</h3>
                <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Notifications Sent</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '2rem' }}>📧 Notification Center</h2>
            
            {/* Test Notifications */}
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              marginBottom: '2rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>🧪 Test Notification System</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Send test email and SMS notifications to verify your system is working
              </p>
              <button
                onClick={sendTestNotifications}
                disabled={isTestingNotifications}
                style={{
                  background: isTestingNotifications ? '#ccc' : '#2196F3',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  cursor: isTestingNotifications ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'Cambria, serif'
                }}
              >
                {isTestingNotifications ? '🧪 Testing...' : '🧪 Test Notification System'}
              </button>
            </div>

            {/* Notification History */}
            {notificationHistory.length > 0 && (
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>📊 Notification History</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {notificationHistory.map(notification => (
                    <div key={notification.id} style={{
                      background: '#f9f9f9',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.2rem' }}>
                            {notification.type === 'email' ? '📧' : '📱'}
                          </span>
                          <strong>{notification.type.toUpperCase()}</strong>
                          <span style={{
                            background: '#4CAF50',
                            color: 'white',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '12px',
                            fontSize: '0.7rem',
                            textTransform: 'uppercase'
                          }}>
                            SENT
                          </span>
                        </div>
                        <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>
                          To: {notification.recipient}
                        </p>
                        {notification.subject && (
                          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                            {notification.subject}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#333' }}>
                          {notification.content}
                        </p>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666', marginLeft: '1rem' }}>
                        {new Date(notification.sentAt).toLocaleString()}
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
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai-notes' && (
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
                  value={sessionInput}
                  onChange={(e) => setSessionInput(e.target.value)}
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
                    {sessionInput.length} characters
                  </span>
                  <button
                    onClick={generateAINotes}
                    disabled={isProcessingNotes || !sessionInput.trim()}
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
            {savedSessionNotes.length > 0 && (
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1.5rem' }}>📚 Session Notes History</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {savedSessionNotes.map(note => (
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
                          {note.aiNotes}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                    📅 Schedule & Send Notifications
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
          </div>
        </div>
      )}
    </div>
  );
}
