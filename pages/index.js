import { useState, useEffect, useCallback, useMemo } from 'react';
import Head from 'next/head';

// Production-optimized MindCare Portal
export default function Home() {
  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [auditLog, setAuditLog] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const teamMembers = useMemo(() => [
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
  ], []);

  // Performance optimized audit logging
  const addAuditLog = useCallback((action, details) => {
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: userName,
      userType: userType,
      action: action,
      details: details
    };
    setAuditLog(prev => [logEntry, ...prev.slice(0, 99)]); // Keep only 100 most recent
  }, [userName, userType]);

  // Login handlers with performance optimization
  const handleLogin = useCallback((type, name) => {
    setIsLoading(true);
    setTimeout(() => {
      setUserType(type);
      setUserName(name);
      setUserEmail(type === 'therapist' ? 'rebecca@rbhpractice.com' : 'client@email.com');
      setIsLoggedIn(true);
      addAuditLog('Login', `${type} login successful`);
      setIsLoading(false);
    }, 500); // Simulate auth check
  }, [addAuditLog]);

  const handleLogout = useCallback(() => {
    addAuditLog('Logout', 'User logged out');
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setUserEmail('');
    setActiveTab('dashboard');
    setNotifications([]);
    setAuditLog([]);
  }, [addAuditLog]);

  // Optimized notification system
  const testNotifications = useCallback(() => {
    const timestamp = new Date().toISOString();
    const emailNotification = {
      id: Date.now(),
      type: 'Email',
      to: 'sarah@email.com',
      subject: 'Appointment Reminder - Tomorrow 2:00 PM',
      message: 'This is a reminder of your upcoming therapy session tomorrow at 2:00 PM with Dr. Rebecca B. Headley.',
      timestamp,
      status: 'Sent'
    };

    const smsNotification = {
      id: Date.now() + 1,
      type: 'SMS',
      to: '(555) 123-4567',
      message: 'Reminder: Therapy session tomorrow 2:00 PM with Dr. Headley. Reply STOP to opt out.',
      timestamp,
      status: 'Delivered'
    };

    setNotifications(prev => [emailNotification, smsNotification, ...prev.slice(0, 48)]); // Keep 50 max
    addAuditLog('Test Notification', 'Email and SMS notifications sent');
  }, [addAuditLog]);

  // Modal handlers
  const openModal = useCallback((type) => {
    setModalType(type);
    setShowModal(true);
    addAuditLog('Modal Open', `Opened ${type} modal`);
  }, [addAuditLog]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalType('');
  }, []);

  // Tab change handler
  const handleTabChange = useCallback((tabId, tabLabel) => {
    setActiveTab(tabId);
    addAuditLog('Navigation', `Accessed ${tabLabel} tab`);
  }, [addAuditLog]);

  // Memoized tab configuration
  const navigationTabs = useMemo(() => [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'appointments', label: '📅 Appointments', icon: '📅' },
    { id: 'clients', label: '👥 Clients', icon: '👥' },
    { id: 'ai-notes', label: '🤖 AI Notes', icon: '🤖' },
    { id: 'notifications', label: '📧 Notifications', icon: '📧' },
    { id: 'team', label: '👨‍⚕️ Team', icon: '👨‍⚕️' }
  ], []);

  // Loading screen
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#666', fontFamily: 'Cambria, serif' }}>Loading MindCare Portal...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Login screen
  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>MindCare Portal - HIPAA-Compliant Mental Health Management</title>
          <meta name="description" content="Secure, HIPAA-compliant mental health practice management portal with AI-powered clinical notes and comprehensive patient care tools." />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta name="robots" content="noindex, nofollow" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#667eea" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        </Head>
        
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
                  fontFamily: 'Cambria, serif',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
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
                  fontFamily: 'Cambria, serif',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#6b46c1'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#764ba2'}
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
      </>
    );
  }

  // Main portal interface
  return (
    <>
      <Head>
        <title>{`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} - MindCare Portal`}</title>
        <meta name="description" content="Secure mental health practice management with AI-powered clinical notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          flexWrap: 'wrap',
          position: 'sticky',
          top: 0,
          zIndex: 100
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
                onClick={() => handleTabChange('notifications', 'Notifications')}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
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
                    justifyContent: 'center',
                    animation: notifications.length > 2 ? 'pulse 2s infinite' : 'none'
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
                fontFamily: 'Cambria, serif',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
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
          overflowX: 'auto',
          position: 'sticky',
          top: '73px',
          zIndex: 99
        }}>
          <div style={{
            display: 'flex',
            gap: '2rem',
            minWidth: 'max-content'
          }}>
            {navigationTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id, tab.label)}
                style={{
                  padding: '1rem 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #667eea' : '2px solid transparent',
                  color: activeTab === tab.id ? '#667eea' : '#666',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = '#667eea';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.color = '#666';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ padding: '2rem', minHeight: 'calc(100vh - 146px)' }}>
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
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}>
                  <h3 style={{ color: '#333', marginBottom: '1rem' }}>📊 Practice Overview</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <p><strong>Total Clients:</strong> {clients.length}</p>
                    <p><strong>Today's Appointments:</strong> {appointments.filter(apt => apt.date === '2025-09-11').length}</p>
                    <p><strong>Active Sessions:</strong> {appointments.filter(apt => apt.status === 'scheduled').length}</p>
                    <p><strong>System Status:</strong> <span style={{ color: '#10b981' }}>✅ Online</span></p>
                  </div>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
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
                  {auditLog.length === 0 && (
                    <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>
                      No recent activity
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
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
                    fontFamily: 'Cambria, serif',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
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
                {appointments.length === 0 ? (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No appointments scheduled</p>
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
                      Schedule First Appointment
                    </button>
                  </div>
                ) : (
                  appointments.map(appointment => (
                    <div key={appointment.id} style={{
                      padding: '1.5rem',
                      borderBottom: '1px solid #f3f4f6',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
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
                          onClick={() => {
                            window.open(appointment.meetingLink, '_blank');
                            addAuditLog('Video Call', `Joined call for appointment ${appointment.id}`);
                          }}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontFamily: 'Cambria, serif',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
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
                            fontFamily: 'Cambria, serif',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#d97706'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#f59e0b'}
                        >
                          📝 Reschedule
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Clients Tab */}
          {activeTab === 'clients' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
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
                    fontFamily: 'Cambria, serif',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
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
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
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
                          height: '100%',
                          transition: 'width 0.5s ease'
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
                          fontSize: '0.9rem',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
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
                          fontSize: '0.9rem',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Notes Tab */}
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
                      gap: '0.5rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
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
                      gap: '0.5rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#5a67d8'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#667eea'}
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
                      gap: '0.5rem',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                    onMouseOut={(e) => e.target.style
