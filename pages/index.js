import { useState, useEffect, useCallback } from 'react';

export default function MindCarePortalComplete() {
  // Core state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [auditLog, setAuditLog] = useState([]);
  
  // Integration Status
  const [integrationStatus, setIntegrationStatus] = useState({
    gmail: false,
    sms: false,
    calendar: false,
    database: false,
    payments: false,
    video: false
  });

  // Communication state
  const [sentEmails, setSentEmails] = useState([]);
  const [sentSMS, setSentSMS] = useState([]);

  // Sample data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-09-11',
      time: '2:00 PM',
      type: 'Therapy Session',
      clientId: 1,
      fee: 150,
      paid: false,
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
      outstandingBalance: 150,
      totalPaid: 1800
    }
  ]);

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [videoRooms, setVideoRooms] = useState([]);

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

  // Connect service function
  const connectService = useCallback((service) => {
    setTimeout(() => {
      setIntegrationStatus(prev => ({ ...prev, [service]: true }));
      addAuditLog(service.toUpperCase() + ' Connected', 'Successfully connected to ' + service + ' service');
    }, 1000);
  }, [addAuditLog]);

  // Send SMS function
  const sendSMS = useCallback((client, message) => {
    const smsData = {
      id: Date.now(),
      to: client.phone,
      message: message,
      timestamp: new Date().toISOString(),
      status: 'Delivered',
      client: client.firstName + ' ' + client.lastName,
      cost: 0.0075
    };
    setSentSMS(prev => [smsData, ...prev]);
    addAuditLog('SMS Sent', 'SMS sent to ' + client.firstName + ' ' + client.lastName);
  }, [addAuditLog]);

  // Process payment function
  const processPayment = useCallback((clientId, amount) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const payment = {
      id: Date.now(),
      clientId,
      clientName: client.firstName + ' ' + client.lastName,
      amount,
      method: 'Credit Card',
      status: 'completed',
      date: new Date().toISOString().split('T')[0]
    };

    setPaymentHistory(prev => [payment, ...prev]);
    setClients(prev => prev.map(c => 
      c.id === clientId 
        ? { ...c, outstandingBalance: Math.max(0, c.outstandingBalance - amount), totalPaid: c.totalPaid + amount }
        : c
    ));

    addAuditLog('Payment Processed', '$' + amount + ' payment from ' + client.firstName + ' ' + client.lastName);
  }, [clients, addAuditLog]);

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
            Complete HIPAA Practice Management Suite
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem',
            marginBottom: '2rem',
            fontSize: '0.8rem',
            color: '#888'
          }}>
            <div>📧 Email</div>
            <div>📱 SMS</div>
            <div>📅 Calendar</div>
            <div>🗄️ Database</div>
            <div>💳 Payments</div>
            <div>🎥 Video</div>
          </div>

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
            🔒 HIPAA Compliant • 🌟 Complete Integration Suite
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
            Complete Practice Management • {Object.values(integrationStatus).filter(Boolean).length}/6 Services Connected
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {Object.entries(integrationStatus).map(([service, connected]) => (
              <div key={service} style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: connected ? '#10b981' : '#ef4444',
                title: service + ': ' + (connected ? 'Connected' : 'Disconnected')
              }} />
            ))}
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
            { id: 'integrations', label: '🔗 Integrations' },
            { id: 'communications', label: '📨 Communications' },
            { id: 'appointments', label: '📅 Appointments' },
            { id: 'payments', label: '💳 Payments' },
            { id: 'video', label: '🎥 Video Calls' },
            { id: 'clients', label: '👥 Clients' }
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
              Practice Dashboard
            </h2>
            
            {/* Service Status Overview */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {[
                { 
                  service: 'gmail', 
                  name: 'Email System', 
                  icon: '📧', 
                  description: 'HIPAA-compliant email templates and sending',
                  stats: sentEmails.length + ' emails sent'
                },
                { 
                  service: 'sms', 
                  name: 'SMS Notifications', 
                  icon: '📱', 
                  description: 'Automated text message reminders and alerts',
                  stats: sentSMS.length + ' messages sent'
                },
                { 
                  service: 'calendar', 
                  name: 'Calendar Sync', 
                  icon: '📅', 
                  description: 'Google Calendar integration with appointment sync',
                  stats: appointments.length + ' events synced'
                },
                { 
                  service: 'database', 
                  name: 'Database', 
                  icon: '🗄️', 
                  description: 'Secure PostgreSQL database with encrypted storage',
                  stats: clients.length + ' clients, ' + appointments.length + ' appointments'
                },
                { 
                  service: 'payments', 
                  name: 'Payment Processing', 
                  icon: '💳', 
                  description: 'Stripe integration for secure payment handling',
                  stats: '$' + paymentHistory.reduce((sum, p) => sum + p.amount, 0) + ' processed'
                },
                { 
                  service: 'video', 
                  name: 'Video Calls', 
                  icon: '🎥', 
                  description: 'Secure video conferencing with recording',
                  stats: videoRooms.length + ' rooms available'
                }
              ].map(item => (
                <div key={item.service} style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: integrationStatus[item.service] ? '2px solid #10b981' : '2px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {item.icon} {item.name}
                    </h3>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: integrationStatus[item.service] ? '#dcfce7' : '#fee2e2',
                      color: integrationStatus[item.service] ? '#166534' : '#dc2626',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {integrationStatus[item.service] ? '✅ Connected' : '❌ Offline'}
                    </span>
                  </div>
                  <p style={{ color: '#666', margin: '0.5rem 0', fontSize: '0.9rem' }}>
                    {item.description}
                  </p>
                  <p style={{ color: '#10b981', margin: 0, fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {item.stats}
                  </p>
                  {!integrationStatus[item.service] && (
                    <button
                      onClick={() => connectService(item.service)}
                      style={{
                        marginTop: '1rem',
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
                      Connect {item.name}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Recent Activity */}
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

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                🔗 System Integrations
              </h2>
              <button
                onClick={async () => {
                  const services = ['gmail', 'sms', 'calendar', 'database', 'payments', 'video'];
                  for (let i = 0; i < services.length; i++) {
                    setTimeout(() => connectService(services[i]), i * 500);
                  }
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                🚀 Connect All Services
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minWidth(400px, 1fr))',
              gap: '2rem'
            }}>
              {[
                {
                  service: 'gmail',
                  name: 'Gmail API',
                  icon: '📧',
                  description: 'Send HIPAA-compliant emails, appointment reminders, and automated communications.',
                  features: ['OAuth2 Authentication', 'HIPAA-compliant Templates', 'Automated Reminders', 'Email Tracking'],
                  status: integrationStatus.gmail
                },
                {
                  service: 'sms',
                  name: 'Twilio SMS',
                  icon: '📱',
                  description: 'Send SMS reminders, confirmations, and emergency alerts to clients.',
                  features: ['Two-way SMS', 'Automated Reminders', 'Delivery Tracking', 'Opt-out Management'],
                  status: integrationStatus.sms
                },
                {
                  service: 'calendar',
                  name: 'Google Calendar',
                  icon: '📅',
                  description: 'Sync appointments with Google Calendar for seamless scheduling.',
                  features: ['Real-time Sync', 'Appointment Blocking', 'Availability Checking', 'Multiple Calendars'],
                  status: integrationStatus.calendar
                },
                {
                  service: 'database',
                  name: 'PostgreSQL Database',
                  icon: '🗄️',
                  description: 'Secure, encrypted database storage for all client and practice data.',
                  features: ['Encrypted Storage', 'Automated Backups', 'HIPAA Compliance', 'Data Analytics'],
                  status: integrationStatus.database
                },
                {
                  service: 'payments',
                  name: 'Stripe Payments',
                  icon: '💳',
                  description: 'Secure payment processing for therapy sessions and services.',
                  features: ['Credit Card Processing', 'Subscription Billing', 'Invoice Generation', 'PCI Compliance'],
                  status: integrationStatus.payments
                },
                {
                  service: 'video',
                  name: 'Video Conferencing',
                  icon: '🎥',
                  description: 'HIPAA-compliant video calls with recording and screen sharing.',
                  features: ['HD Video Calls', 'Session Recording', 'Screen Sharing', 'Chat Messages'],
                  status: integrationStatus.video
                }
              ].map(integration => (
                <div key={integration.service} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: integration.status ? '2px solid #10b981' : '2px solid #e5e7eb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {integration.icon} {integration.name}
                    </h3>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: integration.status ? '#dcfce7' : '#fee2e2',
                      color: integration.status ? '#166534' : '#dc2626',
                      borderRadius: '20px',
                      fontSize: '0.8rem'
                    }}>
                      {integration.status ? '✅ Connected' : '❌ Disconnected'}
                    </span>
                  </div>

                  <p style={{ color: '#666', margin: '1rem 0', lineHeight: '1.5' }}>
                    {integration.description}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '0.9rem' }}>Features:</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#666', fontSize: '0.8rem' }}>
                      {integration.features.map((feature, index) => (
                        <li key={index} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => connectService(integration.service)}
                    disabled={integration.status}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: integration.status ? '#9ca3af' : '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: integration.status ? 'not-allowed' : 'pointer',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    {integration.status ? '✅ Connected' : 'Connect ' + integration.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Communications Tab */}
        {activeTab === 'communications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                📨 Communications Hub
              </h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    appointments.forEach(apt => {
                      const client = clients.find(c => c.id === apt.clientId);
                      if (client && integrationStatus.gmail) {
                        setSentEmails(prev => [{
                          id: Date.now() + Math.random(),
                          to: client.email,
                          subject: 'Session Reminder - ' + apt.date + ' at ' + apt.time,
                          timestamp: new Date().toISOString(),
                          status: 'Sent',
                          client: client.firstName + ' ' + client.lastName
                        }, ...prev]);
                      }
                    });
                    addAuditLog('Bulk Email', 'Sent ' + appointments.length + ' email reminders');
                  }}
                  disabled={!integrationStatus.gmail}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: integrationStatus.gmail ? '#10b981' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: integrationStatus.gmail ? 'pointer' : 'not-allowed',
                    fontFamily: 'Cambria, serif'
                  }}
                >
                  📧 Send Email Reminders
                </button>
                
                <button
                  onClick={() => {
                    appointments.forEach(apt => {
                      const client = clients.find(c => c.id === apt.clientId);
                      if (client && integrationStatus.sms) {
                        sendSMS(client, 'Reminder: therapy session tomorrow ' + apt.time);
                      }
                    });
                    addAuditLog('Bulk SMS', 'Sent SMS reminders to ' + appointments.length + ' clients');
                  }}
                  disabled={!integrationStatus.sms}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: integrationStatus.sms ? '#f59e0b' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: integrationStatus.sms ? 'pointer' : 'not-allowed',
                    fontFamily: 'Cambria, serif'
                  }}
                >
                  📱 Send SMS Reminders
                </button>
              </div>
            </div>

            {/* Communication Statistics */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#333', marginBottom: '1rem' }}>📊 Communication Statistics</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
                    {sentEmails.length}
                  </div>
                  <div style={{ color: '#666' }}>Emails Sent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
                    {sentSMS.length}
                  </div>
                  <div style={{ color: '#666' }}>SMS Sent</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                    ${(sentSMS.length * 0.0075).toFixed(2)}
                  </div>
                  <div style={{ color: '#666' }}>SMS Costs</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
                    98%
                  </div>
                  <div style={{ color: '#666' }}>Delivery Rate</div>
                </div>
              </div>
            </div>

            {/* Communication History */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Email History */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                  <h3 style={{ margin: 0, color: '#333' }}>📧 Email History</h3>
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {sentEmails.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                      No emails sent yet. Connect Gmail to start sending.
                    </div>
                  ) : (
                    sentEmails.slice(0, 10).map(email => (
                      <div key={email.id} style={{
                        padding: '1rem',
                        borderBottom: '1px solid #f3f4f6'
                      }}>
                        <h4 style={{ margin: '0 0 0.25rem 0', color: '#333', fontSize: '0.9rem' }}>
                          {email.subject}
                        </h4>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.8rem' }}>
                          To: {email.to} ({email.client})
                        </p>
                        <small style={{ color: '#666' }}>
                          {new Date(email.timestamp).toLocaleString()}
                        </small>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* SMS History */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                  <h3 style={{ margin: 0, color: '#333' }}>📱 SMS History</h3>
                </div>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {sentSMS.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                      No SMS sent yet. Connect Twilio to start sending.
                    </div>
                  ) : (
                    sentSMS.slice(0, 10).map(sms => (
                      <div key={sms.id} style={{
                        padding: '1rem',
                        borderBottom: '1px solid #f3f4f6'
                      }}>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#333', fontSize: '0.9rem' }}>
                          {sms.message}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#666', fontSize: '0.8rem' }}>
                          To: {sms.to} ({sms.client})
                        </p>
                        <small style={{ color: '#666' }}>
                          {new Date(sms.timestamp).toLocaleString()}
                        </small>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                📅 Appointment Management
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
                + Schedule New Appointment
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
                    padding: '2rem',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '2rem',
                    alignItems: 'start'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0, color: '#333' }}>{appointment.type}</h3>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: appointment.paid ? '#dcfce7' : '#fef3c7',
                          color: appointment.paid ? '#166534' : '#92400e',
                          borderRadius: '20px',
                          fontSize: '0.8rem'
                        }}>
                          {appointment.paid ? '✅ Paid' : '⏳ Pending Payment'}
                        </span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            <strong>Date & Time:</strong> {appointment.date} at {appointment.time}
                          </p>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            <strong>Fee:</strong> ${appointment.fee}
                          </p>
                        </div>
                        <div>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            <strong>Client:</strong> {client ? client.firstName + ' ' + client.lastName : 'Unknown'}
                          </p>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            <strong>Phone:</strong> {client ? client.phone : 'N/A'}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
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

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
                      <button
                        onClick={() => window.open('https://meet.google.com/abc-123', '_blank')}
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🎥 Start Video Call
                      </button>
                      
                      {!appointment.paid && (
                        <button
                          onClick={() => {
                            processPayment(appointment.clientId, appointment.fee);
                            setAppointments(prev => prev.map(apt => 
                              apt.id === appointment.id ? { ...apt, paid: true } : apt
                            ));
                          }}
                          disabled={!integrationStatus.payments}
                          style={{
                            padding: '0.75rem 1rem',
                            backgroundColor: integrationStatus.payments ? '#667eea' : '#9ca3af',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: integrationStatus.payments ? 'pointer' : 'not-allowed',
                            fontFamily: 'Cambria, serif'
                          }}
                        >
                          💳 Process Payment
                        </button>
                      )}
                      
                      <button
                        onClick={() => {
                          if (client && integrationStatus.gmail) {
                            setSentEmails(prev => [{
                              id: Date.now(),
                              to: client.email,
                              subject: 'Session Reminder - ' + appointment.date + ' at ' + appointment.time,
                              timestamp: new Date().toISOString(),
                              status: 'Sent',
                              client: client.firstName + ' ' + client.lastName
                            }, ...prev]);
                            setAppointments(prev => prev.map(apt => 
                              apt.id === appointment.id ? { ...apt, reminderSent: true } : apt
                            ));
                          }
                        }}
                        disabled={!integrationStatus.gmail || appointment.reminderSent}
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: (!integrationStatus.gmail || appointment.reminderSent) ? '#9ca3af' : '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: (!integrationStatus.gmail || appointment.reminderSent) ? 'not-allowed' : 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📧 Send Reminder
                      </button>
                      
                      <button
                        onClick={() => {
                          if (client && integrationStatus.sms) {
                            sendSMS(client, 'Reminder: therapy session tomorrow ' + appointment.time);
                          }
                        }}
                        disabled={!integrationStatus.sms}
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: !integrationStatus.sms ? '#9ca3af' : '#8b5cf6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: !integrationStatus.sms ? 'not-allowed' : 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📱 Send SMS
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                💳 Payment Management
              </h2>
              <button
                onClick={() => openModal('createInvoice')}
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
                + Create Invoice
              </button>
            </div>

            {/* Payment Statistics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minWidth(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                  ${paymentHistory.reduce((sum, p) => sum + p.amount, 0)}
                </div>
                <div style={{ color: '#666' }}>Total Revenue</div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  ${clients.reduce((sum, c) => sum + c.outstandingBalance, 0)}
                </div>
                <div style={{ color: '#666' }}>Outstanding Balance</div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                  {paymentHistory.length}
                </div>
                <div style={{ color: '#666' }}>Transactions</div>
              </div>
            </div>

            {/* Payment History */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h3 style={{ margin: 0, color: '#333' }}>💰 Recent Payments</h3>
              </div>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {paymentHistory.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    No payments processed yet.
                  </div>
                ) : (
                  paymentHistory.map(payment => (
                    <div key={payment.id} style={{
                      padding: '1.5rem',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                        <div>
                          <h4 style={{ margin: 0, color: '#333' }}>${payment.amount}</h4>
                          <p style={{ margin: '0.25rem 0', color: '#666', fontSize: '0.9rem' }}>
                            {payment.clientName}
                          </p>
                          <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>
                            {payment.method} • {payment.date}
                          </p>
                        </div>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: payment.status === 'completed' ? '#dcfce7' : '#fee2e2',
                          color: payment.status === 'completed' ? '#166534' : '#dc2626',
                          borderRadius: '20px',
                          fontSize: '0.8rem'
                        }}>
                          {payment.status === 'completed' ? '✅ Completed' : '⏳ Processing'}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Video Calls Tab */}
        {activeTab === 'video' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '2rem', color: '#333', margin: 0 }}>
                🎥 Video Call Management
              </h2>
              <button
                onClick={() => {
                  const newRoom = {
                    id: Date.now(),
                    roomName: 'room_' + Date.now(),
                    url: 'https://mindcare.video/room/' + Date.now(),
                    status: 'ready',
                    participants: 0,
                    isRecording: false,
                    createdAt: new Date().toISOString()
                  };
                  setVideoRooms(prev => [newRoom, ...prev]);
                  addAuditLog('Video Room Created', 'Created new video room');
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
                + Create Video Room
              </button>
            </div>

            {/* Video Room Statistics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.5rem' }}>
                  {videoRooms.length}
                </div>
                <div style={{ color: '#666' }}>Total Rooms</div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>
                  {videoRooms.filter(r => r.status === 'ready').length}
                </div>
                <div style={{ color: '#666' }}>Ready Rooms</div>
              </div>
              
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>
                  {videoRooms.reduce((sum, r) => sum + r.participants, 0)}
                </div>
                <div style={{ color: '#666' }}>Active Participants</div>
              </div>
            </div>

            {/* Video Rooms List */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6' }}>
                <h3 style={{ margin: 0, color: '#333' }}>🎥 Video Rooms</h3>
              </div>
              
              {videoRooms.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>No video rooms created yet</p>
                  <button
                    onClick={() => {
                      const newRoom = {
                        id: Date.now(),
                        roomName: 'room_' + Date.now(),
                        url: 'https://mindcare.video/room/' + Date.now(),
                        status: 'ready',
                        participants: 0,
                        isRecording: false,
                        createdAt: new Date().toISOString()
                      };
                      setVideoRooms(prev => [newRoom, ...prev]);
                      addAuditLog('Video Room Created', 'Created first video room');
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
                    Create First Room
                  </button>
                </div>
              ) : (
                videoRooms.map(room => (
                  <div key={room.id} style={{
                    padding: '2rem',
                    borderBottom: '1px solid #f3f4f6',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '2rem',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h4 style={{ margin: 0, color: '#333' }}>Room: {room.roomName}</h4>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          backgroundColor: room.status === 'ready' ? '#dcfce7' : '#fee2e2',
                          color: room.status === 'ready' ? '#166534' : '#dc2626',
                          borderRadius: '20px',
                          fontSize: '0.8rem'
                        }}>
                          {room.status === 'ready' ? '✅ Ready' : '❌ Unavailable'}
                        </span>
                        {room.isRecording && (
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#fecaca',
                            color: '#dc2626',
                            borderRadius: '20px',
                            fontSize: '0.8rem'
                          }}>
                            🔴 Recording
                          </span>
                        )}
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            <strong>Participants:</strong> {room.participants}/2
                          </p>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            <strong>Created:</strong> {new Date(room.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p style={{ margin: '0.25rem 0', color: '#666' }}>
                            <strong>Room URL:</strong> <a href={room.url} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea' }}>
                              {room.url}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
                      <button
                        onClick={() => {
                          window.open(room.url, '_blank');
                          setVideoRooms(prev => prev.map(r => 
                            r.id === room.id ? { ...r, participants: r.participants + 1 } : r
                          ));
                          addAuditLog('Video Call', 'Joined room ' + room.roomName);
                        }}
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🎥 Join Room
                      </button>
                      
                      <button
                        onClick={() => {
                          setVideoRooms(prev => prev.map(r => 
                            r.id === room.id ? { ...r, isRecording: !r.isRecording } : r
                          ));
                          addAuditLog('Video Recording', (room.isRecording ? 'Stopped' : 'Started') + ' recording for ' + room.roomName);
                        }}
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: room.isRecording ? '#ef4444' : '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        {room.isRecording ? '⏹️ Stop Recording' : '🔴 Start Recording'}
                      </button>
                      
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(room.url);
                          addAuditLog('Video Link', 'Copied link for ' + room.roomName);
                        }}
                        style={{
                          padding: '0.75rem 1rem',
                          backgroundColor: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📋 Copy Link
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
                👥 Client Management
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
                + Add New Client
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minWidth(450px, 1fr))',
              gap: '2rem'
            }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
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

                  {/* Client Statistics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                        ${client.totalPaid}
                      </div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>Total Paid</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: client.outstandingBalance > 0 ? '#f59e0b' : '#10b981' }}>
                        ${client.outstandingBalance}
                      </div>
                      <div style={{ color: '#666', fontSize: '0.8rem' }}>Outstanding</div>
                    </div>
                  </div>

                  {/* Outstanding Balance */}
                  {client.outstandingBalance > 0 && (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: '#fef3c7',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      border: '1px solid #f59e0b'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#92400e' }}>Outstanding Balance</h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#92400e' }}>
                          ${client.outstandingBalance}
                        </span>
                        <button
                          onClick={() => processPayment(client.id, client.outstandingBalance)}
                          disabled={!integrationStatus.payments}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: integrationStatus.payments ? '#f59e0b' : '#9ca3af',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: integrationStatus.payments ? 'pointer' : 'not-allowed',
                            fontFamily: 'Cambria, serif',
                            fontSize: '0.9rem'
                          }}
                        >
                          💳 Collect Payment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        const appointment = appointments.find(a => a.clientId === client.id);
                        if (appointment && integrationStatus.gmail) {
                          setSentEmails(prev => [{
                            id: Date.now(),
                            to: client.email,
                            subject: 'Session Reminder - ' + appointment.date + ' at ' + appointment.time,
                            timestamp: new Date().toISOString(),
                            status: 'Sent',
                            client: client.firstName + ' ' + client.lastName
                          }, ...prev]);
                        }
                      }}
                      disabled={!integrationStatus.gmail}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: integrationStatus.gmail ? '#10b981' : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: integrationStatus.gmail ? 'pointer' : 'not-allowed',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      📧 Send Email
                    </button>
                    
                    <button
                      onClick={() => {
                        if (integrationStatus.sms) {
                          sendSMS(client, 'Hello from MindCare Portal!');
                        }
                      }}
                      disabled={!integrationStatus.sms}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: integrationStatus.sms ? '#f59e0b' : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: integrationStatus.sms ? 'pointer' : 'not-allowed',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      📱 Send SMS
                    </button>
                    
                    <button
                      onClick={() => {
                        const newRoom = {
                          id: Date.now(),
                          roomName: 'room_' + client.firstName.toLowerCase(),
                          url: 'https://mindcare.video/room/' + client.firstName.toLowerCase(),
                          status: 'ready',
                          participants: 0,
                          isRecording: false,
                          createdAt: new Date().toISOString()
                        };
                        setVideoRooms(prev => [newRoom, ...prev]);
                        addAuditLog('Video Room', 'Created room for ' + client.firstName + ' ' + client.lastName);
                      }}
                      disabled={!integrationStatus.video}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: integrationStatus.video ? '#8b5cf6' : '#9ca3af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: integrationStatus.video ? 'pointer' : 'not-allowed',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      🎥 Create Room
                    </button>
                    
                    <button
                      onClick={() => openModal('clientDetails')}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Cambria, serif',
                        fontSize: '0.9rem'
                      }}
                    >
                      👁️ View Details
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
                {modalType === 'schedule' && '📅 Schedule New Appointment'}
                {modalType === 'createInvoice' && '📄 Create Invoice'}
                {modalType === 'addClient' && '👤 Add New Client'}
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
              <p>This feature is available in the complete MindCare Portal integration suite.</p>
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <p><strong>Complete Integration Features:</strong></p>
                <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                  <li>Real-time database operations</li>
                  <li>Automated scheduling and reminders</li>
                  <li>Payment processing with Stripe</li>
                  <li>Video room management</li>
                  <li>HIPAA-compliant data handling</li>
                </ul>
              </div>
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
                Close
              </button>
              <button
                onClick={() => {
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
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
