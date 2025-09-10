import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function HIPAAPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [clients, setClients] = useState([
    { 
      id: 1, 
      firstName: 'Sarah', 
      lastName: 'Johnson', 
      email: 'sarah@email.com', 
      phone: '(555) 123-4567',
      isMinor: false,
      dapNotes: []
    },
    { 
      id: 2, 
      firstName: 'Michael', 
      lastName: 'Brown', 
      email: 'michael@email.com', 
      phone: '(555) 234-5678',
      isMinor: false,
      dapNotes: []
    }
  ]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [showDAPForm, setShowDAPForm] = useState(false);
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isMinor: false
  });
  const [dapNote, setDapNote] = useState({
    date: '',
    data: '',
    assessment: '',
    plan: ''
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleLogin = () => setIsLoggedIn(true);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const showTabContent = (tabName) => {
    setActiveTab(tabName);
    closeMenu();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    alert(`Recording saved! Duration: ${formatTime(recordingTime)}`);
  };

  const addClient = () => {
    if (!newClient.firstName || !newClient.lastName || !newClient.email) {
      alert('Please fill in required fields');
      return;
    }
    const client = {
      id: clients.length + 1,
      ...newClient,
      dapNotes: []
    };
    setClients([...clients, client]);
    setNewClient({ firstName: '', lastName: '', email: '', phone: '', isMinor: false });
    setShowAddClient(false);
    alert('Client added successfully!');
  };

  const openChart = (client) => {
    setSelectedClient(client);
    setShowChart(true);
  };

  const closeChart = () => {
    setSelectedClient(null);
    setShowChart(false);
  };

  const addDAPNote = () => {
    if (!dapNote.data || !dapNote.assessment || !dapNote.plan) {
      alert('Please fill in all DAP fields');
      return;
    }
    const note = {
      id: Date.now(),
      ...dapNote,
      date: dapNote.date || new Date().toISOString().split('T')[0]
    };
    const updatedClients = clients.map(client => 
      client.id === selectedClient.id 
        ? { ...client, dapNotes: [...client.dapNotes, note] }
        : client
    );
    setClients(updatedClients);
    setSelectedClient({ ...selectedClient, dapNotes: [...selectedClient.dapNotes, note] });
    setDapNote({ date: '', data: '', assessment: '', plan: '' });
    setShowDAPForm(false);
    alert('DAP note added successfully!');
  };

  if (!isLoggedIn) {
    return (
      <>
        <Head>
          <title>HIPAA Portal</title>
        </Head>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h1>🏥 HIPAA Portal</h1>
            <p>Healthcare Provider Access</p>
            <input 
              type="email" 
              placeholder="Email"
              style={{
                width: '100%',
                padding: '15px',
                margin: '10px 0',
                border: '1px solid #ccc',
                borderRadius: '8px',
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
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
            <button 
              onClick={handleLogin}
              style={{
                width: '100%',
                padding: '15px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Secure Login
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>HIPAA Portal</title>
      </Head>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            zIndex: 1000
          }}>
            <button onClick={toggleMenu} style={{ background: 'none', border: 'none', fontSize: '24px' }}>
              ☰
            </button>
            <h1 style={{ margin: 0, fontSize: '18px' }}>HIPAA Portal</h1>
            <div>👨‍⚕️</div>
          </header>
        )}

        {/* Navigation */}
        <nav style={{
          width: isMobile ? (menuOpen ? '300px' : '0') : '250px',
          background: 'white',
          position: isMobile ? 'fixed' : 'relative',
          height: '100vh',
          zIndex: 1001,
          transition: 'width 0.3s',
          overflow: 'hidden'
        }}>
          {isMobile && (
            <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
              <button onClick={closeMenu} style={{ float: 'right', background: 'none', border: 'none', fontSize: '20px' }}>
                ×
              </button>
              <h3>🏥 HIPAA Portal</h3>
            </div>
          )}
          <div style={{ padding: '20px' }}>
            {!isMobile && <h2>🏥 HIPAA Portal</h2>}
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'appointments', label: 'Appointments', icon: '📅' },
              { id: 'clients', label: 'Clients', icon: '👥' },
              { id: 'notes', label: 'AI Notes', icon: '🤖' },
              { id: 'notifications', label: 'Notifications', icon: '📧' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => showTabContent(item.id)}
                style={{
                  width: '100%',
                  padding: '15px',
                  margin: '5px 0',
                  border: 'none',
                  background: activeTab === item.id ? '#667eea' : 'transparent',
                  color: activeTab === item.id ? 'white' : 'black',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: isMobile ? '80px 20px 20px' : '30px',
          marginLeft: isMobile && menuOpen ? '300px' : '0',
          transition: 'margin-left 0.3s'
        }}>
          
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '30px' }}>
              <h2>📊 Dashboard</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '20px 0' }}>
                <div style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '200px'
                }}>
                  <h3>Today's Appointments</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold' }}>8</div>
                </div>
                <div style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '200px'
                }}>
                  <h3>Active Clients</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{clients.length}</div>
                </div>
                <div style={{
                  background: '#667eea',
                  color: 'white',
                  padding: '25px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  flex: '1',
                  minWidth: '200px'
                }}>
                  <h3>Auto Reminders</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold' }}>🔔 ON</div>
                </div>
              </div>
            </div>
          )}

          {/* Appointments */}
          {activeTab === 'appointments' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '30px' }}>
              <h2>📅 Appointments</h2>
              <div style={{
                background: '#10b981',
                color: 'white',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '25px',
                textAlign: 'center'
              }}>
                <h3>🔔 Automatic Reminders Active</h3>
                <p>All clients receive email reminders 24 hours before their appointment</p>
              </div>
              {[
                { name: 'Sarah Johnson', time: '2:00 PM', type: 'Therapy Session' },
                { name: 'Michael Brown', time: '3:30 PM', type: 'Initial Consultation' }
              ].map(apt => (
                <div key={apt.name} style={{
                  background: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '15px',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexDirection: isMobile ? 'column' : 'row'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#667eea' }}>{apt.time}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>{apt.name}</h4>
                    <p style={{ margin: 0 }}>{apt.type}</p>
                  </div>
                  <button style={{
                    padding: '10px 20px',
                    background: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                    Join Call
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Clients */}
          {activeTab === 'clients' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '30px' }}>
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
                    cursor: 'pointer'
                  }}
                >
                  ➕ Add Client
                </button>
              </div>

              {showAddClient && (
                <div style={{
                  background: '#f8f9fa',
                  padding: '25px',
                  borderRadius: '15px',
                  marginBottom: '25px'
                }}>
                  <h3>📋 New Client</h3>
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={newClient.firstName}
                    onChange={(e) => setNewClient({...newClient, firstName: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      margin: '10px 0',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Last Name *"
                    value={newClient.lastName}
                    onChange={(e) => setNewClient({...newClient, lastName: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      margin: '10px 0',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      margin: '10px 0',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      margin: '10px 0',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <input
                      type="checkbox"
                      checked={newClient.isMinor}
                      onChange={(e) => setNewClient({...newClient, isMinor: e.target.checked})}
                      style={{ marginRight: '10px' }}
                    />
                    Client is a minor (under 18)
                  </label>
                  
                  <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
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
                      onClick={addClient}
                      style={{
                        padding: '12px 24px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Add Client
                    </button>
                  </div>
                </div>
              )}

              <div>
                {clients.map(client => (
                  <div key={client.id} style={{
                    background: '#f8f9fa',
                    padding: '20px',
                    borderRadius: '15px',
                    marginBottom: '15px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: '15px'
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
                    <button 
                      onClick={() => openChart(client)}
                      style={{
                        padding: '8px 15px',
                        background: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      📋 View Chart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Notes */}
          {activeTab === 'notes' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '30px' }}>
              <h2>🤖 AI Clinical Notes</h2>
              
              <div style={{
                background: isRecording ? '#fef2f2' : '#f8f9fa',
                border: isRecording ? '2px solid #ef4444' : '1px solid #e5e7eb',
                padding: '25px',
                borderRadius: '15px',
                marginBottom: '25px'
              }}>
                <h3>🎙️ Session Recording</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                  Record your therapy session for AI note generation.
                </p>
                
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    🔴 START SESSION RECORDING
                  </button>
                ) : (
                  <div>
                    <div style={{
                      background: '#fef2f2',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
                        🔴 RECORDING
                      </div>
                      <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626' }}>
                        {formatTime(recordingTime)}
                      </div>
                    </div>
                    
                    <button
                      onClick={stopRecording}
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
                      ⏹️ STOP RECORDING
                    </button>
                  </div>
                )}
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                🤖 Generate AI Notes
              </button>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '30px' }}>
              <h2>📧 Notification System</h2>
              <p>Professional email and SMS notification system active.</p>
            </div>
          )}

        </main>

        {/* Appointment Scheduler Modal */}
        {showScheduler && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2>📅 Schedule New Appointment</h2>
                <button
                  onClick={() => setShowScheduler(false)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer',
                    fontSize: '20px'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  👤 Select Client *
                </label>
                <select
                  value={newAppointment.clientId}
                  onChange={(e) => setNewAppointment({...newAppointment, clientId: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Choose a client...</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.firstName} {client.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '20px',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                    📅 Date *
                  </label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => {
                      setNewAppointment({...newAppointment, date: e.target.value});
                      setSelectedDate(e.target.value);
                    }}
                    min={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      fontSize: '16px'
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                    🕐 Time *
                  </label>
                  <select
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select time...</option>
                    {selectedDate && getAvailableTimeSlots(selectedDate).map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '20px',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                    ⏱️ Duration
                  </label>
                  <select
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({...newAppointment, duration: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      fontSize: '16px'
                    }}
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                    📋 Service Code
                  </label>
                  <select
                    value={newAppointment.serviceCode}
                    onChange={(e) => setNewAppointment({...newAppointment, serviceCode: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      fontSize: '16px'
                    }}
                  >
                    <option value="90837">90837 - Psychotherapy, 60 min</option>
                    <option value="90834">90834 - Psychotherapy, 45 min</option>
                    <option value="90791">90791 - Psychiatric Evaluation</option>
                    <option value="90853">90853 - Group Therapy</option>
                    <option value="90846">90846 - Family Therapy (no patient)</option>
                    <option value="90847">90847 - Family Therapy (with patient)</option>
                    <option value="99205">99205 - New Patient Visit</option>
                    <option value="99214">99214 - Established Patient Visit</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  📝 Appointment Type
                </label>
                <select
                  value={newAppointment.type}
                  onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    fontSize: '16px'
                  }}
                >
                  <option value="Therapy Session">Therapy Session</option>
                  <option value="Initial Consultation">Initial Consultation</option>
                  <option value="Follow-up Session">Follow-up Session</option>
                  <option value="Group Therapy">Group Therapy</option>
                  <option value="Family Therapy">Family Therapy</option>
                  <option value="Assessment">Assessment</option>
                  <option value="Intake Appointment">Intake Appointment</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>
                  📝 Notes (Optional)
                </label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                  placeholder="Add any notes for this appointment..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Available Time Slots Preview */}
              {selectedDate && (
                <div style={{
                  background: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px'
                }}>
                  <h4 style={{ margin: '0 0 10px 0' }}>⏰ Available Times for {selectedDate}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {getAvailableTimeSlots(selectedDate).slice(0, 12).map(time => (
                      <button
                        key={time}
                        onClick={() => setNewAppointment({...newAppointment, time: time})}
                        style={{
                          padding: '6px 12px',
                          background: newAppointment.time === time ? '#667eea' : '#e5e7eb',
                          color: newAppointment.time === time ? 'white' : '#374151',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  {getAvailableTimeSlots(selectedDate).length > 12 && (
                    <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666' }}>
                      +{getAvailableTimeSlots(selectedDate).length - 12} more slots available
                    </p>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowScheduler(false)}
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
                  onClick={scheduleAppointment}
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
                  📅 Schedule Appointment
                </button>
              </div>
            </div>
          </div>
        )}
        {showChart && selectedClient && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>📋 {selectedClient.firstName} {selectedClient.lastName}</h2>
                <button
                  onClick={closeChart}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h3>👤 Client Information</h3>
                <p><strong>Email:</strong> {selectedClient.email}</p>
                <p><strong>Phone:</strong> {selectedClient.phone}</p>
                <p><strong>Minor:</strong> {selectedClient.isMinor ? 'Yes' : 'No'}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h3>📝 DAP Notes</h3>
                  <button
                    onClick={() => setShowDAPForm(true)}
                    style={{
                      padding: '8px 16px',
                      background: '#0ea5e9',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    ➕ Add DAP Note
                  </button>
                </div>

                {selectedClient.dapNotes && selectedClient.dapNotes.length > 0 ? (
                  <div>
                    {selectedClient.dapNotes.map(note => (
                      <div key={note.id} style={{
                        background: '#f8f9fa',
                        padding: '15px',
                        borderRadius: '10px',
                        marginBottom: '10px'
                      }}>
                        <h4>Session: {note.date}</h4>
                        <p><strong>Data:</strong> {note.data}</p>
                        <p><strong>Assessment:</strong> {note.assessment}</p>
                        <p><strong>Plan:</strong> {note.plan}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic' }}>No DAP notes yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* DAP Form Modal */}
        {showDAPForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 2001,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '500px',
              width: '100%'
            }}>
              <h3>📝 Add DAP Note</h3>
              
              <input
                type="date"
                value={dapNote.date}
                onChange={(e) => setDapNote({...dapNote, date: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />

              <textarea
                placeholder="Data (what you observed)..."
                value={dapNote.data}
                onChange={(e) => setDapNote({...dapNote, data: e.target.value})}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />

              <textarea
                placeholder="Assessment (your clinical impression)..."
                value={dapNote.assessment}
                onChange={(e) => setDapNote({...dapNote, assessment: e.target.value})}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />

              <textarea
                placeholder="Plan (treatment plan and next steps)..."
                value={dapNote.plan}
                onChange={(e) => setDapNote({...dapNote, plan: e.target.value})}
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px',
                  margin: '10px 0',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button
                  onClick={() => setShowDAPForm(false)}
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
                  onClick={addDAPNote}
                  style={{
                    padding: '12px 24px',
                    background: '#0ea5e9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Save DAP Note
                </button>
              </div>
            </div>
          </div>
        )}

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
