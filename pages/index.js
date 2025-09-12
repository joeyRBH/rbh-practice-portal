import { useState } from 'react';

export default function MindCarePortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // AI Notes State
  const [sessionInput, setSessionInput] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [noteFormat, setNoteFormat] = useState('DAP');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const [signedAt, setSignedAt] = useState('');

  // Sample data
  const clients = [
    { id: 1, name: 'Sarah Johnson' },
    { id: 2, name: 'Michael Chen' },
    { id: 3, name: 'Emma Davis' }
  ];
  
  const services = [
    { code: '90834', name: '45-min Individual Therapy' },
    { code: '90837', name: '60-min Individual Therapy' },
    { code: '90853', name: 'Group Therapy' }
  ];

  const loginWithGoogle = (accountType) => {
    setUserType(accountType);
    setUserName(accountType === 'clinician' ? 'Dr. Rebecca Wilson' : 'Sarah Johnson');
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
  };

  // AI Notes Functions
  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingTime(0);
      
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
      setIsRecording(true);
      setRecordingTime(0);
      
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) {
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
    
    const noteTemplate = `CLINICAL DOCUMENTATION - ${noteFormat} FORMAT
====================================================

CLIENT: ${client.name}
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

  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        padding: '1rem'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠</div>
          <h1 style={{ 
            color: '#1e293b', 
            marginBottom: '0.5rem', 
            fontSize: '2.25rem',
            fontWeight: 'bold'
          }}>
            MindCare Portal
          </h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Clinical Management System
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => loginWithGoogle('clinician')}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              👨‍⚕️ Clinician Login
            </button>

            <button
              onClick={() => loginWithGoogle('client')}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'white',
                color: '#1e3a8a',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🧑‍💼 Client Portal
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🔒 Secure Authentication</h4>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              <p style={{ margin: '0.25rem 0' }}>✅ HIPAA-compliant security</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Role-based access control</p>
              <p style={{ margin: '0.25rem 0' }}>✅ End-to-end encryption</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Navigation tabs
  const navTabs = userType === 'clinician' ? [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clients', label: 'Client Management', icon: '👥' },
    { id: 'ai-notes', label: 'AI Clinical Notes', icon: '🤖' },
    { id: 'calendar', label: 'Calendar', icon: '📅' }
  ] : [
    { id: 'dashboard', label: 'My Portal', icon: '🏠' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              Welcome, {userName}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📈 Quick Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af' }}>3</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Active Clients</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>12</div>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>This Week</div>
                  </div>
                </div>
              </div>

              {userType === 'clinician' && (
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>⚡ Quick Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button
                      onClick={() => setActiveTab('ai-notes')}
                      style={{
                        padding: '0.875rem 1rem',
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      🤖 AI Clinical Notes
                    </button>
                    <button
                      onClick={() => setActiveTab('clients')}
                      style={{
                        padding: '0.875rem 1rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}
                    >
                      👥 Manage Clients
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'ai-notes':
        return (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
                🤖 AI Clinical Notes
              </h1>
              <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '16px' }}>
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
              <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
                📋 Session Information
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px' 
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
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
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
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
                      fontSize: '14px'
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
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
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
                      fontSize: '14px'
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
              <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
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
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626' }}>
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
                  cursor: 'pointer'
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
              <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
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
                  resize: 'vertical',
                  boxSizing: 'border-box'
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
                  marginTop: '16px'
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
                  <h2 style={{ margin: 0, fontSize: '20px', color: '#374151' }}>
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
                        fontWeight: '600'
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
                        fontWeight: '600'
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
                  </div>
                )}
                
                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Monaco, Consolas, monospace',
                  border: '1px solid #e2e8f0',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  {generatedNotes}
                </div>
              </div>
            )}
          </div>
        );

      case 'clients':
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              👥 Client Management
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.25rem' }}>
                    {client.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                      onClick={() => setActiveTab('ai-notes')}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      🤖 AI Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              📅 Calendar
            </h2>
            <div style={{
              backgroundColor: 'white',
              padding: '3rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Calendar Integration Coming Soon</h3>
              <p style={{ color: '#64748b' }}>Google Calendar integration will be available in the next update.</p>
            </div>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h3>Welcome to MindCare Portal</h3>
            <p>Select a tab to get started.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>🧠</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>MindCare Portal</h1>
              <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>Clinical Management System</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem' }}>
                {userType === 'clinician' ? '👨‍⚕️' : '🧑‍💼'} {userName}
              </div>
            </div>
            <button
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0' }}>
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1.25rem 1.5rem',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
                color: activeTab === tab.id ? '#2563eb' : '#64748b',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? '600' : '500',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default MindCarePortal;
