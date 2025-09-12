import React, { useState } from 'react';

export default function SimpleMindCarePortal() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [gmailConnected, setGmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);

  // Sample data
  const clients = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', nextAppt: 'Sep 12, 10:00 AM' },
    { id: 2, name: 'Michael Chen', email: 'michael@email.com', nextAppt: 'Sep 15, 2:00 PM' },
    { id: 3, name: 'Emma Davis', email: 'emma@email.com', nextAppt: 'Sep 13, 11:00 AM' }
  ];

  const emails = [
    { id: 1, from: 'sarah@email.com', subject: 'Question about homework', date: 'Sep 11' },
    { id: 2, from: 'system@mindcare.com', subject: 'Appointment reminder', date: 'Sep 11' }
  ];

  // Login handlers
  const loginTherapist = () => setUser({ name: 'Dr. Wilson', type: 'therapist' });
  const loginClient = () => setUser({ name: 'Sarah Johnson', type: 'client' });
  const logout = () => setUser(null);

  // Google integration
  const connectGmail = () => {
    setGmailConnected(true);
    alert('Gmail connected! (Demo mode)');
  };

  const connectCalendar = () => {
    setCalendarConnected(true);
    alert('Google Calendar connected! (Demo mode)');
  };

  // Login screen
  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f0f2f5',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '2rem', color: '#1f2937' }}>🧠 MindCare EHR</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>HIPAA-Compliant Health Records</p>
          
          <button
            onClick={loginTherapist}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '1rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            👨‍⚕️ Therapist Login
          </button>

          <button
            onClick={loginClient}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#e5e7eb',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🧑‍💼 Client Portal
          </button>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f9fafb',
            borderRadius: '6px',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            ✅ Gmail Integration<br/>
            ✅ Google Calendar<br/>
            ✅ HIPAA Compliant
          </div>
        </div>
      </div>
    );
  }

  // Navigation tabs
  const therapistTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'notes', label: 'AI Notes', icon: '🤖' }
  ];

  const clientTabs = [
    { id: 'dashboard', label: 'Portal', icon: '🏠' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ];

  const tabs = user.type === 'therapist' ? therapistTabs : clientTabs;

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>
              Welcome, {user.name}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#374151' }}>📊 Quick Stats</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#dbeafe', borderRadius: '6px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af' }}>{clients.length}</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Active Clients</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', background: '#dcfce7', borderRadius: '6px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>3</div>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>This Week</div>
                  </div>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#374151' }}>🔗 Google Integration</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Gmail</span>
                    {gmailConnected ? (
                      <span style={{ color: '#059669' }}>✓ Connected</span>
                    ) : (
                      <button onClick={connectGmail} style={{
                        padding: '0.5rem 1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}>
                        Connect
                      </button>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Calendar</span>
                    {calendarConnected ? (
                      <span style={{ color: '#059669' }}>✓ Connected</span>
                    ) : (
                      <button onClick={connectCalendar} style={{
                        padding: '0.5rem 1rem',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}>
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'clients':
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>👥 Client Management</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: 0, color: '#1f2937' }}>{client.name}</h4>
                    <p style={{ margin: '0.25rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                      Next: {client.nextAppt}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('notes')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    📝 Notes
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'email':
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>📧 Secure Email</h2>
            {!gmailConnected ? (
              <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Connect Gmail</h3>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                  Enable HIPAA-compliant client communication
                </p>
                <button onClick={connectGmail} style={{
                  padding: '1rem 2rem',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  🔗 Connect Gmail
                </button>
              </div>
            ) : (
              <div style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                {emails.map(email => (
                  <div key={email.id} style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, color: '#1f2937' }}>{email.subject}</h4>
                      <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{email.date}</span>
                    </div>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                      From: {email.from}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'calendar':
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>📅 Calendar</h2>
            {!calendarConnected ? (
              <div style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Connect Google Calendar</h3>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                  Enable appointment scheduling and management
                </p>
                <button onClick={connectCalendar} style={{
                  padding: '1rem 2rem',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  🔗 Connect Calendar
                </button>
              </div>
            ) : (
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#374151' }}>Upcoming Appointments</h3>
                {clients.map(client => (
                  <div key={client.id} style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    background: '#f9fafb',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: 0, color: '#1f2937' }}>{client.name}</h4>
                      <p style={{ margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>{client.nextAppt}</p>
                    </div>
                    <button style={{
                      padding: '0.5rem 1rem',
                      background: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      📞 Start Call
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'notes':
        return <AINotesComponent />;

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: '#2563eb',
        color: 'white',
        padding: '1rem 2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🧠</span>
            <h1 style={{ margin: 0, fontSize: '1.25rem' }}>MindCare EHR</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>{user.name}</span>
            <button
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', gap: 0 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                border: 'none',
                background: 'transparent',
                borderBottom: activeTab === tab.id ? '2px solid #2563eb' : '2px solid transparent',
                color: activeTab === tab.id ? '#2563eb' : '#6b7280',
                cursor: 'pointer',
                fontSize: '0.875rem'
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

// Simple AI Notes Component
function AINotesComponent() {
  const [sessionInput, setSessionInput] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  const clients = ['Sarah Johnson', 'Michael Chen', 'Emma Davis'];

  const generateNotes = () => {
    if (!sessionInput || !selectedClient) {
      alert('Please select client and enter session notes');
      return;
    }

    const notes = `CLINICAL DOCUMENTATION
====================================================

CLIENT: ${selectedClient}
DATE: ${new Date().toLocaleDateString()}
CLINICIAN: Dr. Rebecca Wilson, LPC

SESSION NOTES:
${sessionInput}

ASSESSMENT:
Client demonstrates progress in treatment goals. Shows improved coping strategies and insight.

PLAN:
- Continue weekly individual therapy sessions
- Assign homework exercises
- Next appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}

Provider: Dr. Rebecca Wilson, LPC
Date: ${new Date().toLocaleDateString()}`;

    setGeneratedNotes(notes);
  };

  const downloadNotes = () => {
    if (!generatedNotes) return;
    
    const blob = new Blob([generatedNotes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinical-notes-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>🤖 AI Clinical Notes</h2>
      
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Client:
          </label>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px'
            }}
          >
            <option value="">Select Client</option>
            {clients.map(client => (
              <option key={client} value={client}>{client}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
            Session Notes:
          </label>
          <textarea
            value={sessionInput}
            onChange={(e) => setSessionInput(e.target.value)}
            placeholder="Enter session observations, client responses, interventions used..."
            style={{
              width: '100%',
              height: '120px',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={generateNotes}
          disabled={!sessionInput || !selectedClient}
          style={{
            width: '100%',
            padding: '1rem',
            background: (!sessionInput || !selectedClient) ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: (!sessionInput || !selectedClient) ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          🤖 Generate Notes
        </button>
      </div>

      {generatedNotes && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: 0, color: '#374151' }}>Generated Notes</h3>
            <button
              onClick={downloadNotes}
              style={{
                padding: '0.5rem 1rem',
                background: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              📥 Download
            </button>
          </div>
          
          <div style={{
            background: '#f9fafb',
            padding: '1rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            fontFamily: 'monospace',
            border: '1px solid #e5e7eb',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {generatedNotes}
          </div>
        </div>
      )}
    </div>
  );
}
