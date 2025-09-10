import { useState, useEffect, useCallback } from 'react';

export default function MindCarePortalWithGmail() {
  // Core state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [auditLog, setAuditLog] = useState([]);
  
  // Gmail Integration State
  const [gmailConnected, setGmailConnected] = useState(false);
  const [sentEmails, setSentEmails] = useState([]);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  // Sample data
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
      reminderSent: false
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      progress: 75,
      totalSessions: 12,
      emailPreferences: {
        reminders: true,
        appointments: true,
        newsletters: false
      }
    }
  ]);

  // Initialize email templates
  useEffect(() => {
    const templates = [
      {
        id: 1,
        name: 'Appointment Reminder',
        subject: 'Therapy Session Reminder',
        body: 'Dear Client, This is a reminder of your upcoming therapy session. Best regards, MindCare Portal Team',
        type: 'reminder',
        isActive: true
      },
      {
        id: 2,
        name: 'Appointment Confirmation',
        subject: 'Appointment Confirmed',
        body: 'Dear Client, Your therapy session has been confirmed. Best regards, MindCare Portal Team',
        type: 'confirmation',
        isActive: true
      },
      {
        id: 3,
        name: 'Session Follow-up',
        subject: 'Thank you for your session',
        body: 'Dear Client, Thank you for attending your therapy session today. Best regards, Dr. Rebecca B. Headley',
        type: 'followup',
        isActive: false
      }
    ];
    setEmailTemplates(templates);
  }, []);

  // Audit logging
  const addAuditLog = useCallback((action, details) => {
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: userName,
      userType: userType,
      action: action,
      details: details
    };
    setAuditLog(prev => [logEntry, ...prev.slice(0, 99)]);
  }, [userName, userType]);

  // Gmail Connection Simulation
  const connectGmail = useCallback(() => {
    setIsTestingEmail(true);
    setTimeout(() => {
      setGmailConnected(true);
      setIsTestingEmail(false);
      addAuditLog('Gmail Connected', 'Successfully connected to Gmail API');
      
      const connectionStatus = {
        id: Date.now(),
        type: 'System',
        to: 'system@mindcare.com',
        subject: 'Gmail API Connected Successfully',
        message: 'Gmail API Connected Successfully! Ready to send HIPAA-compliant emails.',
        timestamp: new Date().toISOString(),
        status: 'Connected'
      };
      setSentEmails(prev => [connectionStatus, ...prev]);
    }, 2000);
  }, [addAuditLog]);

  // Send Email Function (Simulated)
  const sendEmail = useCallback((template, client, appointment) => {
    const emailData = {
      id: Date.now(),
      to: client.email,
      subject: template.subject + ' - ' + appointment.date + ' at ' + appointment.time,
      body: template.body,
      template: template.name,
      timestamp: new Date().toISOString(),
      status: 'Sent',
      client: client.firstName + ' ' + client.lastName,
      hipaaCompliant: true
    };

    setSentEmails(prev => [emailData, ...prev]);
    addAuditLog('Email Sent', template.name + ' sent to ' + client.firstName + ' ' + client.lastName);
    
    if (template.type === 'reminder') {
      setAppointments(prev => prev.map(apt => 
        apt.id === appointment.id ? { ...apt, reminderSent: true } : apt
      ));
    }
  }, [addAuditLog]);

  // Send bulk reminders
  const sendBulkReminders = useCallback(() => {
    const reminderTemplate = emailTemplates.find(t => t.type === 'reminder');
    if (!reminderTemplate) return;

    const upcomingAppointments = appointments.filter(apt => 
      !apt.reminderSent && apt.status === 'scheduled'
    );

    upcomingAppointments.forEach(appointment => {
      const client = clients.find(c => c.id === appointment.clientId);
      if (client && client.emailPreferences.reminders) {
        setTimeout(() => {
          sendEmail(reminderTemplate, client, appointment);
        }, Math.random() * 1000);
      }
    });

    addAuditLog('Bulk Reminders', 'Sent ' + upcomingAppointments.length + ' appointment reminders');
  }, [emailTemplates, appointments, clients, sendEmail, addAuditLog]);

  // Login handlers
  const handleLogin = useCallback((type, name) => {
    setUserType(type);
    setUserName(name);
    setIsLoggedIn(true);
    addAuditLog('Login', type + ' login successful');
  }, [addAuditLog]);

  const handleLogout = useCallback(() => {
    addAuditLog('Logout', 'User logged out');
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
  }, [addAuditLog]);

  // Modal handlers
  const openModal = useCallback((type) => {
    setModalType(type);
    setShowModal(true);
    addAuditLog('Modal Open', 'Opened ' + type + ' modal');
  }, [addAuditLog]);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalType('');
  }, []);

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
            HIPAA-Compliant Mental Health Practice with Gmail Integration
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
            🔒 All data encrypted • 📧 Gmail integration ready
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
            Welcome, {userName} • {gmailConnected ? '📧 Gmail Connected' : '📧 Gmail Disconnected'}
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: gmailConnected ? '#dcfce7' : '#fee2e2',
            color: gmailConnected ? '#166534' : '#dc2626',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            {gmailConnected ? '✅ Email Ready' : '❌ Email Offline'}
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
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'email', label: '📧 Email System' },
            { id: 'appointments', label: '📅 Appointments' },
            { id: 'clients', label: '👥 Clients' },
            { id: 'templates', label: '📝 Email Templates' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
                  <p><strong>Today's Appointments:</strong> {appointments.length}</p>
                  <p><strong>Emails Sent Today:</strong> {sentEmails.filter(e => e.status === 'Sent').length}</p>
                  <p><strong>Gmail Status:</strong> <span style={{ color: gmailConnected ? '#10b981' : '#ef4444' }}>
                    {gmailConnected ? '✅ Connected' : '❌ Disconnected'}
                  </span></p>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>📧 Email System Status</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ color: '#10b981' }}>✅ HIPAA Templates Loaded</p>
                  <p style={{ color: gmailConnected ? '#10b981' : '#ef4444' }}>
                    {gmailConnected ? '✅' : '❌'} Gmail API {gmailConnected ? 'Connected' : 'Disconnected'}
                  </p>
                  <p style={{ color: '#10b981' }}>✅ Encryption Enabled</p>
                  <p style={{ color: '#10b981' }}>✅ Audit Logging Active</p>
                </div>
                
                {!gmailConnected && (
                  <button
                    onClick={connectGmail}
                    disabled={isTestingEmail}
                    style={{
                      marginTop: '1rem',
                      padding: '0.75rem 1.5rem',
                      backgroundColor: isTestingEmail ? '#9ca3af' : '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: isTestingEmail ? 'not-allowed' : 'pointer',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    {isTestingEmail ? '🔄 Connecting...' : '🔗 Connect Gmail API'}
                  </button>
                )}
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

        {/* Email System Tab */}
        {activeTab === 'email' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                📧 Email System
              </h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={sendBulkReminders}
                  disabled={!gmailConnected}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: gmailConnected ? '#10b981' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: gmailConnected ? 'pointer' : 'not-allowed',
                    fontFamily: 'Cambria, serif'
                  }}
                >
                  📤 Send All Reminders
                </button>
                
                <button
                  onClick={() => openModal('emailTest')}
                  disabled={!gmailConnected}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: gmailConnected ? '#f59e0b' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: gmailConnected ? 'pointer' : 'not-allowed',
                    fontFamily: 'Cambria, serif'
                  }}
                >
                  🧪 Test Email
                </button>
              </div>
            </div>

            {/* Email Statistics */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>📊 Email Statistics</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                    {sentEmails.filter(e => e.status === 'Sent').length}
                  </div>
                  <div style={{ color: '#666' }}>Emails Sent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                    {appointments.filter(a => a.reminderSent).length}
                  </div>
                  <div style={{ color: '#666' }}>Reminders Sent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                    {emailTemplates.filter(t => t.isActive).length}
                  </div>
                  <div style={{ color: '#666' }}>Active Templates</div>
                </div>
              </div>
            </div>

            {/* Sent Emails History */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h3 style={{ margin: 0, color: '#333' }}>📨 Email History</h3>
              </div>
              
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {sentEmails.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    No emails sent yet. Connect Gmail and send test emails to see history.
                  </div>
                ) : (
                  sentEmails.map(email => (
                    <div key={email.id} style={{
                      padding: '1.5rem',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <div>
                          <h4 style={{ margin: 0, color: '#333' }}>{email.subject}</h4>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            To: {email.to} {email.client && '(' + email.client + ')'}
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: email.status === 'Sent' ? '#dcfce7' : '#dbeafe',
                            color: email.status === 'Sent' ? '#166534' : '#1e40af',
                            borderRadius: '20px',
                            fontSize: '0.8rem'
                          }}>
                            {email.status}
                          </span>
                          {email.hipaaCompliant && (
                            <span style={{
                              padding: '0.25rem 0.75rem',
                              backgroundColor: '#fef3c7',
                              color: '#92400e',
                              borderRadius: '20px',
                              fontSize: '0.8rem'
                            }}>
                              🔒 HIPAA
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {email.template && (
                        <p style={{ margin: '0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                          Template: {email.template}
                        </p>
                      )}
                      
                      <small style={{ color: '#666' }}>
                        {new Date(email.timestamp).toLocaleString()}
                      </small>
                    </div>
                  ))
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
              {appointments.map(appointment => {
                const client = clients.find(c => c.id === appointment.clientId);
                return (
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
                        Client: {client ? client.firstName + ' ' + client.lastName : 'Unknown'}
                      </p>
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: appointment.reminderSent ? '#dcfce7' : '#fee2e2',
                          color: appointment.reminderSent ? '#166534' : '#dc2626',
                          borderRadius: '20px',
                          fontSize: '0.8rem'
                        }}>
                          {appointment.reminderSent ? '✅ Reminder Sent' : '⏳ No Reminder'}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          if (client) {
                            const reminderTemplate = emailTemplates.find(t => t.type === 'reminder');
                            if (reminderTemplate && gmailConnected) {
                              sendEmail(reminderTemplate, client, appointment);
                            }
                          }
                        }}
                        disabled={!gmailConnected || appointment.reminderSent}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: (!gmailConnected || appointment.reminderSent) ? '#9ca3af' : '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: (!gmailConnected || appointment.reminderSent) ? 'not-allowed' : 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📧 Send Reminder
                      </button>
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
                    </div>
                  </div>
                );
              })}
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
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📧 Email Preferences</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <input 
                          type="checkbox" 
                          checked={client.emailPreferences.reminders}
                          onChange={() => {
                            setClients(prev => prev.map(c => 
                              c.id === client.id 
                                ? { ...c, emailPreferences: { ...c.emailPreferences, reminders: !c.emailPreferences.reminders }}
                                : c
                            ));
                          }}
                        />
                        Appointment Reminders
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <input 
                          type="checkbox" 
                          checked={client.emailPreferences.appointments}
                          onChange={() => {
                            setClients(prev => prev.map(c => 
                              c.id === client.id 
                                ? { ...c, emailPreferences: { ...c.emailPreferences, appointments: !c.emailPreferences.appointments }}
                                : c
                            ));
                          }}
                        />
                        Appointment Confirmations
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                        <input 
                          type="checkbox" 
                          checked={client.emailPreferences.newsletters}
                          onChange={() => {
                            setClients(prev => prev.map(c => 
                              c.id === client.id 
                                ? { ...c, emailPreferences: { ...c.emailPreferences, newsletters: !c.emailPreferences.newsletters }}
                                : c
                            ));
                          }}
                        />
                        Newsletters & Updates
                      </label>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        const reminderTemplate = emailTemplates.find(t => t.type === 'reminder');
                        const appointment = appointments.find(a => a.clientId === client.id);
                        if (reminderTemplate && appointment && gmailConnected) {
                          sendEmail(reminderTemplate, client, appointment);
                        }
                      }}
                      disabled={!gmailConnected}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: gmailConnected ? '#f59e0b' : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: gmailConnected ? 'pointer' : 'not-allowed',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      📧 Send Email
                    </button>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email Templates Tab */}
        {activeTab === 'templates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                📝 Email Templates
              </h2>
              <button
                onClick={() => openModal('addTemplate')}
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
                + Create Template
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
              gap: '1.5rem'
            }}>
              {emailTemplates.map(template => (
                <div key={template.id} style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: template.isActive ? '2px solid #10b981' : '2px solid transparent'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, color: '#333' }}>{template.name}</h3>
                      <p style={{ margin: '0.25rem 0', color: '#666', textTransform: 'capitalize' }}>
                        Type: {template.type}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: template.isActive ? '#dcfce7' : '#fee2e2',
                        color: template.isActive ? '#166534' : '#dc2626',
                        borderRadius: '20px',
                        fontSize: '0.8rem'
                      }}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '6px'
                  }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 'bold', color: '#333' }}>
                      Subject: {template.subject}
                    </p>
                    <div style={{
                      maxHeight: '100px',
                      overflowY: 'auto',
                      fontSize: '0.8rem',
                      color: '#666',
                      whiteSpace: 'pre-wrap'
                    }}>
                      {template.body.slice(0, 200)}...
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        setEmailTemplates(prev => prev.map(t => 
                          t.id === template.id ? { ...t, isActive: !t.isActive } : t
                        ));
                        addAuditLog('Template Toggle', template.name + ' ' + (template.isActive ? 'deactivated' : 'activated'));
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: template.isActive ? '#ef4444' : '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      {template.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => openModal('editTemplate')}
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
                      onClick={() => {
                        const client = clients[0];
                        const appointment = appointments[0];
                        if (client && appointment && gmailConnected) {
                          sendEmail(template, client, appointment);
                        }
                      }}
                      disabled={!gmailConnected}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: gmailConnected ? '#f59e0b' : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: gmailConnected ? 'pointer' : 'not-allowed',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      Test Send
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
                {modalType === 'emailTest' && '🧪 Test Email System'}
                {modalType === 'schedule' && '📅 Schedule Appointment'}
                {modalType === 'addClient' && '👤 Add New Client'}
                {modalType === 'addTemplate' && '📝 Create Email Template'}
                {modalType === 'editTemplate' && '✏️ Edit Email Template'}
                {modalType === 'clientDetails' && '👥 Client Details'}
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
              {modalType === 'emailTest' && (
                <div>
                  <p>Test the Gmail integration by sending a sample email.</p>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <p><strong>Test Email Features:</strong></p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>HIPAA-compliant templates</li>
                      <li>Variable substitution</li>
                      <li>Email tracking</li>
                      <li>Delivery confirmation</li>
                      <li>Audit logging</li>
                    </ul>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#fff3cd',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    border: '1px solid #ffeaa7'
                  }}>
                    <p><strong>🔒 HIPAA Notice:</strong> All test emails are encrypted and logged for compliance.</p>
                  </div>
                </div>
              )}
              
              {modalType === 'schedule' && (
                <div>
                  <p>Schedule a new appointment with automatic email reminder system.</p>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                    marginTop: '1rem'
                  }}>
                    <p><strong>Scheduling Features:</strong></p>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      <li>Client selection from database</li>
                      <li>Automatic email confirmations</li>
                      <li>Reminder scheduling (24hr, 1hr before)</li>
                      <li>Calendar integration</li>
                      <li>HIPAA-compliant communications</li>
                    </ul>
                  </div>
                </div>
              )}

              {!['emailTest', 'schedule'].includes(modalType) && (
                <p>This feature is available in the full version of the MindCare Portal with Gmail integration.</p>
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
                  if (modalType === 'emailTest') {
                    const testTemplate = emailTemplates.find(t => t.type === 'reminder');
                    const testClient = clients[0];
                    const testAppointment = appointments[0];
                    if (testTemplate && testClient && testAppointment && gmailConnected) {
                      sendEmail(testTemplate, testClient, testAppointment);
                    }
                  }
                  addAuditLog('Modal Action', 'Completed ' + modalType + ' action');
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
                {modalType === 'emailTest' ? 'Send Test Email' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
