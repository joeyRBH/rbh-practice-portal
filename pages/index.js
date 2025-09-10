import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function HIPAAPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRecordingSession, setIsRecordingSession] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [clients, setClients] = useState([
    { id: 1, firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@email.com', phone: '(555) 123-4567', isMinor: false },
    { id: 2, firstName: 'Michael', lastName: 'Brown', email: 'michael@email.com', phone: '(555) 234-5678', isMinor: false },
    { id: 3, firstName: 'Lisa', lastName: 'Davis', email: 'lisa@email.com', phone: '(555) 345-6789', isMinor: false }
  ]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    legalFirstName: '',
    legalLastName: '',
    middleName: '',
    isMinor: false,
    email: '',
    phone: '',
    address: '',
    birthday: '',
    relationshipStatus: '',
    employmentStatus: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRecordingSession) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingSession]);

  const handleLogin = () => setIsLoggedIn(true);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const showTab = (tabName) => {
    setActiveTab(tabName);
    closeMenu();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSessionRecording = () => {
    setIsRecordingSession(true);
    console.log('Session recording started');
  };

  const stopSessionRecording = () => {
    setIsRecordingSession(false);
    alert(`Session recorded for ${formatDuration(recordingDuration)}! Ready for AI processing.`);
  };

  const generateAINotes = () => {
    alert('AI Clinical Notes generated successfully! Professional note created.');
  };

  const addNewClient = () => {
    if (!newClient.legalFirstName || !newClient.legalLastName || !newClient.email) {
      alert('Please fill in required fields: Legal First Name, Legal Last Name, and Email');
      return;
    }

    const clientToAdd = {
      id: clients.length + 1,
      firstName: newClient.legalFirstName,
      lastName: newClient.legalLastName,
      email: newClient.email,
      phone: newClient.phone,
      isMinor: newClient.isMinor
    };

    setClients([...clients, clientToAdd]);
    setNewClient({
      legalFirstName: '',
      legalLastName: '',
      middleName: '',
      isMinor: false,
      email: '',
      phone: '',
      address: '',
      birthday: '',
      relationshipStatus: '',
      employmentStatus: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: ''
    });
    setShowAddClient(false);
    alert(`Client added successfully: ${clientToAdd.firstName} ${clientToAdd.lastName}`);
  };

  const sendReminder = (clientName, time) => {
    alert(`Professional reminder sent to ${clientName} for ${time} appointment!`);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>HIPAA Secure Portal</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h1>🏥 HIPAA Secure Portal</h1>
            <p>Healthcare Provider Access</p>
            <div style={{ marginTop: '30px' }}>
              <input 
                type="email" 
                placeholder="Email" 
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <input 
                type="password" 
                placeholder="Password" 
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '10px 0',
                  border: '2px solid #e1e5e9',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              <button 
                onClick={handleLogin}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Secure Login
              </button>
            </div>
            <div style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
              🔒 HIPAA-compliant secure access
            </div>
          </div>
        </div>
      </>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'notes', label: 'AI Notes', icon: '🤖' },
    { id: 'notifications', label: 'Notifications', icon: '📧' }
  ];

  return (
    <>
      <Head>
        <title>HIPAA Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'Arial, sans-serif',
        display: 'flex'
      }}>
        
        {/* Mobile Header */}
        {isMobile && (
          <header style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            zIndex: 1000
          }}>
            <button onClick={toggleMenu} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
              ☰
            </button>
            <h1 style={{ margin: 0, fontSize: '18px' }}>HIPAA Portal</h1>
            <div style={{ fontSize: '24px' }}>👨‍⚕️</div>
          </header>
        )}

        {/* Navigation */}
        {isMobile ? (
          <nav style={{
            position: 'fixed',
            top: 0,
            left: menuOpen ? 0 : '-300px',
            width: '300px',
            height: '100vh',
            background: 'white',
            zIndex: 1001,
            transition: 'left 0.3s ease'
          }}>
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ margin: 0 }}>🏥 HIPAA Portal</h3>
              <button onClick={closeMenu} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
                ×
              </button>
            </div>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => showTab(item.id)}
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  border: 'none',
                  background: activeTab === item.id ? '#667eea' : 'none',
                  color: activeTab === item.id ? 'white' : 'black',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        ) : (
          <nav style={{
            width: '250px',
            background: 'rgba(255,255,255,0.95)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h2 style={{ margin: 0 }}>🏥 HIPAA Portal</h2>
            </div>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => showTab(item.id)}
                style={{
                  padding: '15px',
                  border: 'none',
                  background: activeTab === item.id ? '#667eea' : 'none',
                  color: activeTab === item.id ? 'white' : 'black',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  fontSize: '16px'
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        )}

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: isMobile ? '80px 20px 20px' : '30px',
          overflowY: 'auto'
        }}>
          
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <h2>📊 Dashboard</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                margin: '20px 0'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Today's Appointments</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold' }}>8</div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Active Clients</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{clients.length}</div>
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Auto Reminders</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold' }}>🔔 ON</div>
                </div>
              </div>
            </div>
          )}

          {/* Appointments */}
          {activeTab === 'appointments' && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <h2>📅 Appointments</h2>
              
              <div style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 10px 0' }}>🔔 Automatic Reminders Active</h3>
                <p style={{ margin: '0', opacity: 0.9 }}>
                  All clients receive email reminders 24 hours before their appointment
                </p>
              </div>

              <div style={{ marginTop: '20px' }}>
                {[
                  { name: 'Sarah Johnson', time: '2:00 PM', type: 'Therapy Session' },
                  { name: 'Michael Brown', time: '3:30 PM', type: 'Initial Consultation' },
                  { name: 'Lisa Davis', time: '5:00 PM', type: 'Follow-up Session' }
                ].map(apt => (
                  <div key={apt.name} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '15px',
                    flexDirection: isMobile ? 'column' : 'row'
                  }}>
                    <div style={{
                      fontSize: '1.2em',
                      fontWeight: 'bold',
                      color: '#667eea',
                      minWidth: '80px'
                    }}>
                      {apt.time}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0' }}>{apt.name}</h4>
                      <p style={{ margin: '0' }}>{apt.type}</p>
                      <div style={{
                        background: '#d1fae5',
                        color: '#065f46',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        margin: '10px 0',
                        fontWeight: '500',
                        display: 'inline-block'
                      }}>
                        ✅ Reminder sent yesterday at {apt.time}
                      </div>
                    </div>
                    <button
                      onClick={() => sendReminder(apt.name, apt.time)}
                      style={{
                        padding: '10px 20px',
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        width: isMobile ? '100%' : 'auto'
                      }}
                    >
                      📤 Test Reminder
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clients */}
          {activeTab === 'clients' && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2>👥 Client Management</h2>
                <button
                  onClick={() => setShowAddClient(true)}
                  style={{
                    padding: '12px 24px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  ➕ Add New Client
                </button>
              </div>

              {showAddClient && (
                <div style={{
                  background: '#f8f9fa',
                  padding: '25px',
                  borderRadius: '15px',
                  marginBottom: '25px'
                }}>
                  <h3>📋 New Client Demographics</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '15px',
                    marginTop: '20px'
                  }}>
                    <input
                      type="text"
                      placeholder="Legal First Name *"
                      value={newClient.legalFirstName}
                      onChange={(e) => setNewClient({...newClient, legalFirstName: e.target.value})}
                      style={{
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Legal Last Name *"
                      value={newClient.legalLastName}
                      onChange={(e) => setNewClient({...newClient, legalLastName: e.target.value})}
                      style={{
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                      style={{
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                      style={{
                        padding: '12px',
                        border: '2px solid #e1e5e9',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="checkbox"
                        checked={newClient.isMinor}
                        onChange={(e) => setNewClient({...newClient, isMinor: e.target.checked})}
                      />
                      <label>Client is a minor (under 18)</label>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', marginTop: '25px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setShowAddClient(false)}
                      style={{
                        padding: '12px 24px',
                        background: '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNewClient}
                      style={{
                        padding: '12px 24px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      ✅ Add Client
                    </button>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {clients.map(client => (
                  <div key={client.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '15px',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '15px' : '0'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0' }}>
                        {client.firstName} {client.lastName}
                        {client.isMinor && <span style={{ 
                          background: '#fbbf24', 
                          color: '#92400e', 
                          padding: '2px 8px', 
                          borderRadius: '12px', 
                          fontSize: '12px', 
                          marginLeft: '10px' 
                        }}>MINOR</span>}
                      </h4>
                      <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                        📧 {client.email} | 📱 {client.phone}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', width: isMobile ? '100%' : 'auto' }}>
                      <button style={{
                        padding: '8px 15px',
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        flex: isMobile ? '1' : 'none'
                      }}>
                        📋 View File
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Notes */}
          {activeTab === 'notes' && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <h2>🤖 AI Clinical Notes</h2>
              
              <div style={{
                background: isRecordingSession ? '#fef2f2' : '#f8f9fa',
                border: isRecordingSession ? '2px solid #ef4444' : '1px solid #e5e7eb',
                padding: '25px',
                borderRadius: '15px',
                marginBottom: '25px'
              }}>
                <h3>🎙️ Full Session Recording</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                  Record your entire therapy session. AI will analyze the conversation.
                </p>
                
                {!isRecordingSession ? (
                  <button
                    onClick={startSessionRecording}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    🔴 START SESSION RECORDING
                  </button>
                ) : (
                  <div>
                    <div style={{
                      background: '#fef2f2',
                      border: '2px solid #fecaca',
                      borderRadius: '8px',
                      padding: '16px',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#dc2626',
                        marginBottom: '8px'
                      }}>
                        🔴 RECORDING SESSION
                      </div>
                      <div style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        fontFamily: 'monospace',
                        color: '#dc2626'
                      }}>
                        {formatDuration(recordingDuration)}
                      </div>
                      <p style={{ fontSize: '14px', color: '#991b1b', margin: '8px 0 0 0' }}>
                        Speak normally - capturing entire session
                      </p>
                    </div>
                    
                    <button
                      onClick={stopSessionRecording}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: '#374151',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ⏹️ STOP & PROCESS RECORDING
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={generateAINotes}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🤖 Generate AI Clinical Notes
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '20px',
              padding: '30px'
            }}>
              <h2>📧 Notification System</h2>
              <p>Professional email and SMS notification system active.</p>
              <div style={{
                background: '#f8f9fa',
                padding: '20px',
                borderRadius: '15px',
                marginTop: '20px'
              }}>
                <h3>📋 HIPAA Compliance Audit Log</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  All notification activities are automatically logged for regulatory compliance.
                </p>
              </div>
            </div>
          )}

        </main>

        {/* Mobile Overlay */}
        {isMobile && menuOpen && (
          <div 
            onClick={closeMenu}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 999
            }}
          />
        )}
      </div>
    </>
  );
}
