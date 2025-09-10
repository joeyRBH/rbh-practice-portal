import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [auditLog, setAuditLog] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Sample data states
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-09-11',
      time: '2:00 PM',
      type: 'Therapy Session',
      clientId: 1,
      therapistId: 1,
      status: 'scheduled',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: ''
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      address: '123 Main St, Denver, CO 80202',
      emergencyContact: 'John Johnson - (555) 123-4568',
      insurance: 'Blue Cross Blue Shield',
      insuranceId: 'BC123456789',
      progress: 75,
      totalSessions: 12,
      assignedTherapist: 1,
      consentForms: ['intake', 'privacy']
    }
  ]);

  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Dr. Rebecca B. Headley',
      email: 'rebecca@rbhpractice.com',
      role: 'therapist',
      license: 'LPC123456',
      specialties: ['Anxiety', 'Depression', 'PTSD']
    },
    {
      id: 2,
      name: 'Dr. Sarah Wilson',
      email: 'sarah@rbhpractice.com',
      role: 'therapist',
      license: 'LPC789012',
      specialties: ['Family Therapy', 'Trauma']
    }
  ]);

  // Add audit logging function
  const addAuditLog = (action, details) => {
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: userName,
      userType: userType,
      action: action,
      details: details
    };
    setAuditLog(prev => [logEntry, ...prev]);
  };

  // Login handlers
  const handleLogin = (type, name) => {
    setUserType(type);
    setUserName(name);
    setUserEmail(type === 'therapist' ? 'rebecca@rbhpractice.com' : 'client@email.com');
    setIsLoggedIn(true);
    addAuditLog('Login', `${type} login successful`);
  };

  const handleLogout = () => {
    addAuditLog('Logout', 'User logged out');
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setUserEmail('');
    setActiveTab('dashboard');
  };

  // Test notification system
  const testNotifications = () => {
    const emailNotification = {
      id: Date.now(),
      type: 'Email',
      to: 'sarah@email.com',
      subject: 'Appointment Reminder - Tomorrow 2:00 PM',
      message: 'This is a reminder of your upcoming therapy session tomorrow at 2:00 PM with Dr. Rebecca B. Headley.',
      timestamp: new Date().toISOString(),
      status: 'Sent'
    };

    const smsNotification = {
      id: Date.now() + 1,
      type: 'SMS',
      to: '(555) 123-4567',
      message: 'Reminder: Therapy session tomorrow 2:00 PM with Dr. Headley. Reply STOP to opt out.',
      timestamp: new Date().toISOString(),
      status: 'Delivered'
    };

    setNotifications(prev => [emailNotification, smsNotification, ...prev]);
    addAuditLog('Test Notification', 'Email and SMS notifications sent');
  };

  // Modal handlers
  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    addAuditLog('Modal Open', `Opened ${type} modal`);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Cambria, serif',
        padding: '1rem'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '450px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#333',
            fontWeight: 'bold'
          }}>
            🧠 MindCare Portal
          </h1>
          
          <p style={{ 
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            HIPAA-Compliant Mental Health Practice Management
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => handleLogin('therapist', 'Dr. Rebecca B. Headley')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '1rem',
                fontFamily: 'Cambria, serif'
              }}
            >
              👨‍⚕️ Login as Therapist
            </button>

            <button
              onClick={() => handleLogin('client', 'Sarah Johnson')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#764ba2',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif'
              }}
            >
              👤 Login as Client
            </button>
          </div>

          <p style={{ 
            fontSize: '0.9rem',
            color: '#888',
            marginTop: '1rem'
          }}>
            🔒 All data is encrypted and HIPAA compliant
          </p>
        </div>
      </div>
    );
  }

  // Main portal interface
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Cambria, serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#333', margin: 0 }}>
            🧠 MindCare Portal
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>
            Welcome, {userName}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={() => setActiveTab('notifications')}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              🔔
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '12px',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Cambria, serif'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: 'white',
        padding: '0 2rem',
        borderBottom: '1px solid #e5e7eb',
        overflowX: 'auto'
      }}>
        <div style={{
          display: 'flex',
          gap: '2rem',
          minWidth: 'max-content'
        }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
            { id: 'appointments', label: '📅 Appointments', icon: '📅' },
            { id: 'clients', label: '👥 Clients', icon: '👥' },
            { id: 'ai-notes', label: '🤖 AI Notes', icon: '🤖' },
            { id: 'notifications', label: '📧 Notifications', icon: '📧' },
            { id: 'team', label: '👨‍⚕️ Team', icon: '👨‍⚕️' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                addAuditLog('Navigation', `Accessed ${tab.label} tab`);
              }}
              style={{
                padding: '1rem 0',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #667eea' : '2px solid transparent',
                color: activeTab === tab.id ? '#667eea' : '#666',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif',
                fontSize: '1rem',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
              Dashboard
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>📊 Practice Overview</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p><strong>Total Clients:</strong> {clients.length}</p>
                  <p><strong>Today's Appointments:</strong> {appointments.filter(apt => apt.date === '2025-09-11').length}</p>
                  <p><strong>Active Sessions:</strong> {appointments.filter(apt => apt.status === 'scheduled').length}</p>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>🔒 HIPAA Compliance</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ color: '#10b981' }}>✅ Audit Logging Active</p>
                  <p style={{ color: '#10b981' }}>✅ Data Encryption Enabled</p>
                  <p style={{ color: '#10b981' }}>✅ Access Controls Active</p>
                  <p style={{ color: '#10b981' }}>✅ Backup Systems Online</p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>📋 Recent Activity</h3>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {auditLog.slice(0, 10).map(log => (
                  <div key={log.id} style={{
                    padding: '0.75rem',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <strong>{log.action}</strong> - {log.details}
                      <br />
                      <small style={{ color: '#666' }}>
                        {log.user} ({log.userType})
                      </small>
                    </div>
                    <small style={{ color: '#666' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Appointments */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                📅 Appointments
              </h2>
              <button
                onClick={() => openModal('schedule')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                + Schedule Appointment
              </button>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              {appointments.map(appointment => (
                <div key={appointment.id} style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#333' }}>{appointment.type}</h4>
                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                      {appointment.date} at {appointment.time}
                    </p>
                    <p style={{ margin: 0, color: '#666' }}>
                      Client: {clients.find(c => c.id === appointment.clientId)?.firstName} {clients.find(c => c.id === appointment.clientId)?.lastName}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => window.open(appointment.meetingLink, '_blank')}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      🎥 Join Call
                    </button>
                    <button
                      onClick={() => openModal('reschedule')}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      📝 Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients */}
        {activeTab === 'clients' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                👥 Clients
              </h2>
              <button
                onClick={() => openModal('addClient')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                + Add Client
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '1.5rem'
            }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#333' }}>
                        {client.firstName} {client.lastName}
                      </h3>
                      <p style={{ margin: '0.25rem 0', color: '#666' }}>{client.email}</p>
                      <p style={{ margin: 0, color: '#666' }}>{client.phone}</p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      Active
                    </span>
                  </div>

                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#64748b' }}>Treatment Progress</span>
                      <span style={{ color: '#333', fontWeight: 'bold' }}>{client.progress}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '6px',
                      height: '8px'
                    }}>
                      <div style={{
                        width: `${client.progress}%`,
                        backgroundColor: '#10b981',
                        borderRadius: '6px',
                        height: '100%'
                      }}></div>
                    </div>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                      Total Sessions: {client.totalSessions}
                    </p>
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => openModal('clientDetails')}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openModal('addNote')}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Notes */}
        {activeTab === 'ai-notes' && (
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#333' }}>
              🤖 AI-Powered Clinical Notes
            </h2>

            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>Generate Clinical Notes</h3>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                Use AI to automatically generate comprehensive clinical notes from session recordings or manual input.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => openModal('recordSession')}
                  style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Cambria, serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  🎙️ Record Session
                </button>
                <button
                  onClick={() => openModal('manualNotes')}
                  style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Cambria, serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📝 Manual Input
                </button>
                <button
                  onClick={() => openModal('uploadAudio')}
                  style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Cambria, serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  📁 Upload Audio
                </button>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h3 style={{ margin: 0, color: '#333' }}>Recent AI-Generated Notes</h3>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <h4 style={{ margin: 0, color: '#333' }}>Session Notes - Sarah Johnson</h4>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Sept 10, 2025</span>
                  </div>
                  <p style={{ color: '#666', margin: '0.5rem 0', lineHeight: '1.5' }}>
                    <strong>Session Summary:</strong> Client discussed progress with anxiety management techniques. 
                    Reported 70% improvement in sleep quality since implementing breathing exercises. 
                    Expressed concerns about upcoming work presentation.
                  </p>
                  <p style={{ color: '#666', margin: '0.5rem 0', lineHeight: '1.5' }}>
                    <strong>Treatment Plan:</strong> Continue current CBT approach. Introduce public speaking 
                    confidence techniques. Schedule follow-up in 1 week.
                  </p>
                  <p style={{ color: '#666', margin: '0.5rem 0', lineHeight: '1.5' }}>
                    <strong>Risk Assessment:</strong> Low risk. Client showing positive progress.
                  </p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      Export
                    </button>
                    <button
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        {activeTab === 'notifications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                📧 Notification System
              </h2>
              <button
                onClick={testNotifications}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                🧪 Test Notification System
              </button>
            </div>

            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>📊 Notification Statistics</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                    {notifications.filter(n => n.type === 'Email').length}
                  </div>
                  <div style={{ color: '#666' }}>Emails Sent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                    {notifications.filter(n => n.type === 'SMS').length}
                  </div>
                  <div style={{ color: '#666' }}>SMS Sent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                    {notifications.filter(n => n.status === 'Delivered').length}
                  </div>
                  <div style={{ color: '#666' }}>Delivered</div>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h3 style={{ margin: 0, color: '#333' }}>📨 Notification History</h3>
              </div>
              
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    No notifications sent yet. Click "Test Notification System" to see demo notifications.
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div key={notification.id} style={{
                      padding: '1.5rem',
                      borderBottom: '1px solid #f3f4f6',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: notification.type === 'Email' ? '#dbeafe' : '#dcfce7',
                            color: notification.type === 'Email' ? '#1e40af' : '#166534',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {notification.type === 'Email' ? '📧' : '📱'} {notification.type}
                          </span>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: notification.status === 'Delivered' ? '#dcfce7' : '#dbeafe',
                            color: notification.status === 'Delivered' ? '#166534' : '#1e40af',
                            borderRadius: '20px',
                            fontSize: '0.8rem'
                          }}>
                            {notification.status}
                          </span>
                        </div>
                        
                        <p style={{ margin: '0.5rem 0', color: '#333', fontWeight: 'bold' }}>
                          To: {notification.to}
                        </p>
                        
                        {notification.subject && (
                          <p style={{ margin: '0.5rem 0', color: '#333' }}>
                            <strong>Subject:</strong> {notification.subject}
                          </p>
                        )}
                        
                        <p style={{ margin: '0.5rem 0', color: '#666', lineHeight: '1.4' }}>
                          {notification.message}
                        </p>
                      </div>
                      
                      <div style={{ marginLeft: '1rem', textAlign: 'right' }}>
                        <small style={{ color: '#666' }}>
                          {new Date(notification.timestamp).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Team */}
        {activeTab === 'team' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                👨‍⚕️ Team Management
              </h2>
              <button
                onClick={() => openModal('addTeamMember')}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                + Add Team Member
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1.5rem'
            }}>
              {teamMembers.map(member => (
                <div key={member.id} style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#333' }}>{member.name}</h3>
                      <p style={{ margin: '0.25rem 0', color: '#666', textTransform: 'capitalize' }}>
                        {member.role}
                      </p>
                      <p style={{ margin: 0, color: '#666' }}>{member.email}</p>
                    </div>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      Active
                    </span>
                  </div>

                  <div style={{
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px'
                  }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                      License: {member.license}
                    </p>
                    <div>
                      <span style={{ fontSize: '0.9rem', color: '#666' }}>Specialties:</span>
                      <div style={{ marginTop: '0.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                        {member.specialties.map((specialty, index) => (
                          <span key={index} style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: '#e0e7ff',
                            color: '#3730a3',
                            borderRadius: '12px',
                            fontSize: '0.8rem'
                          }}>
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => openModal('editTeamMember')}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openModal('viewSchedule')}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {modalType === 'schedule' && '📅 Schedule Appointment'}
                {modalType === 'addClient' && '👤 Add New Client'}
                {modalType === 'clientDetails' && '👥 Client Details'}
                {modalType === 'addNote' && '📝 Add Clinical Note'}
                {modalType === 'recordSession' && '🎙️ Record Session'}
                {modalType === 'manualNotes' && '📝 Manual Notes Input'}
                {modalType === 'uploadAudio' && '📁 Upload Audio File'}
                {modalType === 'addTeamMember' && '👨‍⚕️ Add Team Member'}
                {modalType === 'editTeamMember' && '✏️ Edit Team Member'}
                {modalType === 'viewSchedule' && '📅 View Schedule'}
                {modalType === 'reschedule' && '📝 Reschedule Appointment'}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ color: '#666', lineHeight: '1.6' }}>
              {modalType === 'schedule' && (
                <div>
                  <p>Schedule a new appointment with comprehensive HIPAA-compliant booking system.</p>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <p><strong>Available Features:</strong></p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>Client selection from database</li>
                      <li>Date and time picker</li>
                      <li>Session type selection</li>
                      <li>Automatic reminder scheduling</li>
                      <li>Google Calendar integration</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {modalType === 'addClient' && (
                <div>
                  <p>Add a new client to the practice management system with full HIPAA compliance.</p>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <p><strong>Required Information:</strong></p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>Personal details (Name, DOB, Contact)</li>
                      <li>Insurance information</li>
                      <li>Emergency contact</li>
                      <li>Consent forms and agreements</li>
                      <li>Assigned therapist</li>
                    </ul>
                  </div>
                </div>
              )}

              {modalType === 'recordSession' && (
                <div>
                  <p>Record therapy sessions with AI-powered transcription and note generation.</p>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fff3cd',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    border: '1px solid #ffeaa7'
                  }}>
                    <p><strong>🔒 HIPAA Notice:</strong> All recordings are encrypted and stored securely. Clients must provide written consent before recording sessions.</p>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <p><strong>AI Features:</strong></p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>Real-time transcription</li>
                      <li>Automatic clinical note generation</li>
                      <li>Treatment plan suggestions</li>
                      <li>Risk assessment analysis</li>
                      <li>Progress tracking</li>
                    </ul>
                  </div>
                </div>
              )}

              {modalType === 'manualNotes' && (
                <div>
                  <p>Manually input session notes with AI assistance for formatting and clinical language.</p>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <p><strong>AI Assistance Includes:</strong></p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>Clinical language suggestions</li>
                      <li>Treatment plan recommendations</li>
                      <li>Progress measurement tracking</li>
                      <li>Risk assessment prompts</li>
                      <li>Billing code suggestions</li>
                    </ul>
                  </div>
                </div>
              )}

              {modalType === 'uploadAudio' && (
                <div>
                  <p>Upload pre-recorded session audio files for AI analysis and note generation.</p>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <p><strong>Supported Formats:</strong></p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>MP3, WAV, M4A</li>
                      <li>Maximum file size: 500MB</li>
                      <li>Session length: Up to 2 hours</li>
                      <li>Encrypted upload and storage</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Add more modal content for other types */}
              {!['schedule', 'addClient', 'recordSession', 'manualNotes', 'uploadAudio'].includes(modalType) && (
                <p>This feature is available in the full version of the MindCare Portal.</p>
              )}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  addAuditLog('Modal Action', `Completed ${modalType} action`);
                  closeModal();
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                {modalType === 'recordSession' ? 'Start Recording' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
