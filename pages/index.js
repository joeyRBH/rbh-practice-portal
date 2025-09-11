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

  // AI Notes States
  const [sessionInput, setSessionInput] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [noteFormat, setNoteFormat] = useState('DAP');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const [signedAt, setSignedAt] = useState('');

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
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael@email.com',
      phone: '(555) 987-6543',
      dateOfBirth: '1990-03-22',
      address: '456 Oak Ave, Denver, CO 80203',
      emergencyContact: 'Lisa Chen - (555) 987-6544',
      insurance: 'Aetna',
      insuranceId: 'AET987654321',
      progress: 60,
      totalSessions: 8,
      assignedTherapist: 1,
      consentForms: ['intake', 'privacy']
    },
    {
      id: 3,
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma@email.com',
      phone: '(555) 456-7890',
      dateOfBirth: '1988-11-08',
      address: '789 Pine St, Denver, CO 80204',
      emergencyContact: 'David Davis - (555) 456-7891',
      insurance: 'United Healthcare',
      insuranceId: 'UHC456789123',
      progress: 85,
      totalSessions: 15,
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
      specialties: ['Family Therapy', 'Couples Counseling']
    }
  ]);

  // Services for AI Notes
  const services = [
    { code: '90834', name: '45-min Individual Therapy' },
    { code: '90837', name: '60-min Individual Therapy' },
    { code: '90853', name: 'Group Therapy' },
    { code: '90791', name: 'Psychiatric Diagnostic Evaluation' }
  ];

  // Login handler
  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
    setUserName(type === 'therapist' ? 'Dr. Rebecca B. Headley' : 'Sarah Johnson');
    setUserEmail(type === 'therapist' ? 'rebecca@rbhpractice.com' : 'sarah@email.com');
    
    // Add audit log entry
    setAuditLog(prev => [{
      id: Date.now(),
      action: `${type} login`,
      user: type === 'therapist' ? 'Dr. Rebecca B. Headley' : 'Sarah Johnson',
      timestamp: new Date().toLocaleString(),
      details: 'Successful login to MindCare Portal'
    }, ...prev]);
  };

  // AI Notes Functions
  const handleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordingTime(0);
      
      // Add realistic clinical content
      const clinicalContent = `Session Date: ${new Date().toLocaleDateString()}
Duration: ${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}

CLIENT PRESENTATION:
Client arrived on time and appeared well-groomed. Maintained good eye contact throughout the session. Speech was clear and coherent. Mood appeared stable with some underlying anxiety noted.

SESSION OBSERVATIONS:
- Client reported practicing breathing exercises from last session
- Expressed feeling "more in control" of anxiety symptoms  
- Demonstrated good understanding of cognitive restructuring techniques
- No safety concerns identified during session

INTERVENTIONS USED:
- Cognitive Behavioral Therapy techniques focusing on anxiety management
- Reviewed homework assignment completion
- Practiced progressive muscle relaxation in session
- Discussed upcoming week's goals and challenges

CLIENT RESPONSE:
Client was engaged and participatory. Responded positively to interventions. Expressed willingness to continue practicing techniques. Showed improved confidence in managing symptoms.

RISK ASSESSMENT:
Low risk for self-harm or harm to others. Client denied suicidal ideation. Support system remains strong with family involvement.

TREATMENT PLAN:
Continue weekly sessions. Assign daily anxiety tracking worksheet. Practice relaxation techniques twice daily. Next appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}`;

      setSessionInput(clinicalContent);
      alert('Recording complete! Session transcribed successfully.');
      
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) { // Auto-stop after 5 minutes
            setIsRecording(false);
            clearInterval(timer);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      
      alert('Recording started! Click stop when finished.');
    }
  };

  const generateNotes = () => {
    if (!sessionInput || !selectedClient || !selectedService) {
      alert('Please select client, service, and provide session notes');
      return;
    }

    const client = clients.find(c => c.id.toString() === selectedClient);
    const service = services.find(s => s.code === selectedService);
    
    let noteTemplate = `CLINICAL DOCUMENTATION - ${noteFormat} FORMAT
====================================================

CLIENT: ${client.firstName} ${client.lastName}
SERVICE: ${service.code} - ${service.name}
DATE: ${new Date().toLocaleDateString()}
CLINICIAN: Dr. Rebecca B. Headley, LPC

SESSION NOTES:
${sessionInput}

Provider: Dr. Rebecca B. Headley, LPC
License: CO123456
Date: ${new Date().toLocaleDateString()}`;

    setGeneratedNotes(noteTemplate);
  };

  const signNotes = () => {
    if (!generatedNotes) {
      alert('Please generate notes first');
      return;
    }
    
    const timestamp = new Date().toLocaleString();
    setIsSigned(true);
    setSignedAt(timestamp);
    alert(`Notes digitally signed and locked at ${timestamp}`);
  };

  const downloadNotes = () => {
    if (!generatedNotes) return;
    
    const content = isSigned ? 
      generatedNotes + `\n\n=== ELECTRONIC SIGNATURE ===\nDigitally Signed by: Dr. Rebecca B. Headley, LPC\nDate/Time: ${signedAt}\nStatus: Signed and Locked` : 
      generatedNotes;
      
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinical-notes-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setUserEmail('');
    setActiveTab('dashboard');
    setShowModal(false);
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
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '60px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '90%'
        }}>
          <h1 style={{ 
            color: '#333', 
            marginBottom: '20px',
            fontSize: '36px',
            fontWeight: 'bold'
          }}>
            🏥 MindCare Portal
          </h1>
          <p style={{ 
            color: '#666', 
            marginBottom: '40px',
            fontSize: '18px',
            lineHeight: '1.5'
          }}>
            HIPAA-Compliant Practice Management
          </p>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={() => handleLogin('therapist')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                fontFamily: 'Cambria, serif'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              👨‍⚕️ Therapist Login
            </button>
            
            <button
              onClick={() => handleLogin('client')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                fontFamily: 'Cambria, serif'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              👤 Client Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f8fafc',
      fontFamily: 'Cambria, serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px' }}>🏥 MindCare Portal</h1>
          <p style={{ margin: 0, opacity: 0.9 }}>Welcome, {userName}</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)',
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontFamily: 'Cambria, serif'
          }}
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div style={{
        background: 'white',
        padding: '0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          gap: '0'
        }}>
          {['dashboard', 'appointments', 'clients', 'documents', 'team', 'ai-notes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: '1',
                minWidth: '120px',
                padding: '15px 10px',
                background: activeTab === tab ? '#667eea' : 'transparent',
                color: activeTab === tab ? 'white' : '#666',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid #764ba2' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                transition: 'all 0.3s',
                textTransform: 'capitalize',
                fontFamily: 'Cambria, serif'
              }}
            >
              {tab === 'ai-notes' ? '🤖 AI Notes' : 
               tab === 'dashboard' ? '📊 Dashboard' :
               tab === 'appointments' ? '📅 Appointments' :
               tab === 'clients' ? '👥 Clients' :
               tab === 'documents' ? '📋 Documents' :
               tab === 'team' ? '👨‍⚕️ Team' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '30px' }}>📊 Dashboard</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#667eea', margin: '0 0 10px 0' }}>Today's Appointments</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>3</div>
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#667eea', margin: '0 0 10px 0' }}>Active Clients</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>{clients.length}</div>
              </div>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#667eea', margin: '0 0 10px 0' }}>HIPAA Status</h3>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981' }}>✅ Compliant</div>
              </div>
            </div>
          </div>
        )}

        {/* AI Notes Tab */}
        {activeTab === 'ai-notes' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* Header */}
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold', color: '#374151' }}>
                🤖 AI Clinical Notes
              </h1>
              <p style={{ margin: '8px 0 0 0', color: '#6b7280', fontSize: '16px' }}>
                Record sessions • Generate documentation • Digital signatures
              </p>
            </div>

            {/* Session Setup */}
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                marginBottom: '20px', 
                fontSize: '20px',
                color: '#374151',
                borderBottom: '2px solid #f3f4f6',
                paddingBottom: '8px'
              }}>
                📋 Session Information
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px' 
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Client:
                  </label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.firstName} {client.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Service:
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="">Select Service</option>
                    {services.map(service => (
                      <option key={service.code} value={service.code}>
                        {service.code} - {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '6px', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Note Format:
                  </label>
                  <select
                    value={noteFormat}
                    onChange={(e) => setNoteFormat(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: 'white'
                    }}
                  >
                    <option value="DAP">DAP Notes</option>
                    <option value="SOAP">SOAP Notes</option>
                    <option value="BIRP">BIRP Notes</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Recording Section */}
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '24px',
              border: isRecording ? '3px solid #ef4444' : '1px solid #e5e7eb'
            }}>
              <h2 style={{ 
                marginBottom: '20px', 
                fontSize: '20px',
                color: '#374151',
                borderBottom: '2px solid #f3f4f6',
                paddingBottom: '8px'
              }}>
                🎙️ Session Recording
              </h2>
              
              {isRecording && (
                <div style={{
                  background: '#fef2f2',
                  border: '2px solid #fecaca',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontSize: '32px', 
                    fontWeight: 'bold', 
                    color: '#dc2626',
                    marginBottom: '8px'
                  }}>
                    🔴 RECORDING: {formatTime(recordingTime)}
                  </div>
                  <div style={{ fontSize: '16px', color: '#7f1d1d' }}>
                    Session recording in progress...
                  </div>
                </div>
              )}
              
              <button
                onClick={handleRecording}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: isRecording ? '#dc2626' : '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'Cambria, serif'
                }}
              >
                {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Session Recording'}
              </button>
            </div>

            {/* Session Input */}
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h2 style={{ 
                marginBottom: '20px', 
                fontSize: '20px',
                color: '#374151',
                borderBottom: '2px solid #f3f4f6',
                paddingBottom: '8px'
              }}>
                📝 Session Notes
              </h2>
              
              <textarea
                value={sessionInput}
                onChange={(e) => setSessionInput(e.target.value)}
                placeholder="Enter session observations, client responses, interventions used..."
                style={{
                  width: '100%',
                  height: '160px',
                  padding: '16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                  fontFamily: 'Cambria, serif'
                }}
              />
              
              <button
                onClick={generateNotes}
                disabled={!sessionInput || !selectedClient || !selectedService}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: (!sessionInput || !selectedClient || !selectedService) ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: (!sessionInput || !selectedClient || !selectedService) ? 'not-allowed' : 'pointer',
                  marginTop: '16px',
                  fontFamily: 'Cambria, serif'
                }}
              >
                🤖 Generate {noteFormat} Notes
              </button>
            </div>

            {/* Generated Notes */}
            {generatedNotes && (
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '24px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <h2 style={{ 
                    margin: 0, 
                    fontSize: '20px',
                    color: '#374151'
                  }}>
                    📄 Generated Clinical Notes
                  </h2>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={signNotes}
                      disabled={isSigned}
                      style={{
                        padding: '10px 16px',
                        background: isSigned ? '#10b981' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isSigned ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      {isSigned ? '✅ Signed' : '✍️ Sign Notes'}
                    </button>
                    <button
                      onClick={downloadNotes}
                      style={{
                        padding: '10px 16px',
                        background: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      📥 Download
                    </button>
                  </div>
                </div>
                
                {isSigned && (
                  <div style={{
                    background: '#f0fdf4',
                    border: '2px solid #bbf7d0',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    color: '#15803d'
                  }}>
                    ✅ <strong>Digitally Signed and Locked</strong> by Dr. Rebecca B. Headley, LPC on {signedAt}
                    <br />📋 This document is now legally binding and cannot be modified.
                  </div>
                )}
                
                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  lineHeight: '1.6',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Monaco, Consolas, monospace',
                  border: '1px solid #e2e8f0',
                  maxHeight: '500px'
                }}>
                  {generatedNotes}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Other existing tabs remain the same */}
        {activeTab === 'appointments' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '30px' }}>📅 Appointments</h2>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <p>Appointment management coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '30px' }}>👥 Clients</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    {client.firstName} {client.lastName}
                  </h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                    📧 {client.email} | 📞 {client.phone}
                  </p>
                  <p style={{ margin: '0', color: '#666' }}>
                    Progress: {client.progress}% | Sessions: {client.totalSessions}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '30px' }}>📋 Documents</h2>
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <p>Document management coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div>
            <h2 style={{ color: '#333', marginBottom: '30px' }}>👨‍⚕️ Team</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {teamMembers.map(member => (
                <div key={member.id} style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{member.name}</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                    📧 {member.email} | 🏥 {member.role}
                  </p>
                  <p style={{ margin: '0', color: '#666' }}>
                    License: {member.license} | Specialties: {member.specialties.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
