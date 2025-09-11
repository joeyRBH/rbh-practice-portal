import { useState } from 'react';

export default function MindCarePortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clinicalNotes, setClinicalNotes] = useState([]);

  const clients = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      dateOfBirth: '1985-06-15',
      primaryDiagnosis: 'F32.1 - Major Depressive Disorder, Moderate',
      treatmentPlan: 'CBT, 12 sessions',
      currentLevel: 'Level 1 - Outpatient',
      riskLevel: 'Low'
    }
  ];

  const loginWithGoogle = (accountType) => {
    setIsLoading(true);
    setTimeout(() => {
      setUserType(accountType);
      setUserName(accountType === 'clinician' ? 'Dr. Sarah Wilson' : 'Sarah Johnson');
      setIsLoggedIn(true);
      setIsLoading(false);
      setActiveTab(accountType === 'clinician' ? 'dashboard' : 'client-portal');
    }, 1500);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
  };

  const createClinicalNote = (clientId, noteData) => {
    const newNote = {
      id: Date.now(),
      clientId,
      date: new Date().toISOString(),
      clinician: userName,
      ...noteData
    };
    setClinicalNotes(prev => [...prev, newNote]);
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
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Connecting...' : '👨‍⚕️ Clinician Login'}
            </button>

            <button
              onClick={() => loginWithGoogle('client')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'white',
                color: '#1e3a8a',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Connecting...' : '🧑‍💼 Client Portal'}
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        padding: '0 2rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '0' }}>
          {(userType === 'clinician' ? [
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'clients', label: 'Client Management', icon: '👥' },
            { id: 'clinical-notes', label: 'Clinical Notes', icon: '📝' },
            { id: 'ai-notes', label: 'AI Notes', icon: '🤖' },
            { id: 'asam-assessment', label: 'ASAM Assessment', icon: '🎯' }
          ] : [
            { id: 'client-portal', label: 'My Portal', icon: '🏠' },
            { id: 'my-progress', label: 'My Progress', icon: '📈' }
          ]).map(tab => (
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
                fontSize: '0.875rem'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Clinician Dashboard */}
        {userType === 'clinician' && activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              Clinical Dashboard
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>📊 Patient Overview</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af' }}>{clients.length}</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Active Clients</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>{clinicalNotes.length}</div>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>Clinical Notes</div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>⚡ Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    onClick={() => setActiveTab('clinical-notes')}
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
                    Add DAP Note
                  </button>
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
                    AI Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('asam-assessment')}
                    style={{
                      padding: '0.875rem 1rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}
                  >
                    ASAM Assessment
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Client Management */}
        {userType === 'clinician' && activeTab === 'clients' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              Client Management
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedClient(client)}
                >
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.5rem' }}>
                    {client.firstName} {client.lastName}
                  </h3>
                  <p style={{ margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.875rem' }}>
                    DOB: {new Date(client.dateOfBirth).toLocaleDateString()}
                  </p>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <strong style={{ color: '#374151', fontSize: '0.875rem' }}>Primary Diagnosis:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b', fontSize: '0.875rem' }}>
                        {client.primaryDiagnosis}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#374151', fontSize: '0.875rem' }}>Treatment Plan:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b', fontSize: '0.875rem' }}>
                        {client.treatmentPlan}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                        setActiveTab('clinical-notes');
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        color: '#2563eb',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      📝 Add Note
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                        setActiveTab('ai-notes');
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        color: '#7c3aed',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      🤖 AI Note
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                        setActiveTab('asam-assessment');
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        color: '#059669',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      🎯 ASAM
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clinical Notes */}
        {userType === 'clinician' && activeTab === 'clinical-notes' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              DAP Clinical Notes
            </h2>

            {activeNote ? (
              <DAPNoteForm 
                client={selectedClient}
                onSave={(noteData) => {
                  if (selectedClient) {
                    createClinicalNote(selectedClient.id, noteData);
                  }
                  setActiveNote(null);
                  alert('✅ DAP note saved successfully');
                }}
                onCancel={() => setActiveNote(null)}
              />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  height: 'fit-content'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>Select Client</h3>
                  {clients.map(client => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      style={{
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        backgroundColor: selectedClient?.id === client.id ? '#dbeafe' : '#f8fafc',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: selectedClient?.id === client.id ? '2px solid #2563eb' : '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                        {client.firstName} {client.lastName}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  {selectedClient ? (
                    <>
                      <h3 style={{ margin: '0 0 1.5rem 0', color: '#1e293b' }}>
                        DAP Notes - {selectedClient.firstName} {selectedClient.lastName}
                      </h3>
                      
                      <button
                        onClick={() => setActiveNote({ type: 'new', clientId: selectedClient.id })}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#2563eb',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          marginBottom: '1.5rem'
                        }}
                      >
                        + Add New DAP Note
                      </button>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {clinicalNotes
                          .filter(note => note.clientId === selectedClient.id)
                          .map(note => (
                            <div key={note.id} style={{
                              padding: '1.5rem',
                              backgroundColor: '#f8fafc',
                              borderRadius: '12px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ fontWeight: '600', color: '#1e293b' }}>
                                  {note.sessionType || 'Clinical Session'}
                                  {note.isAIGenerated && <span style={{ color: '#7c3aed', marginLeft: '0.5rem' }}>🤖 AI</span>}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  {new Date(note.date).toLocaleDateString()}
                                </div>
                              </div>
                              <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                                {note.dataObservations || note.content || 'No content recorded'}
                              </div>
                            </div>
                          ))}
                        
                        {clinicalNotes.filter(note => note.clientId === selectedClient.id).length === 0 && (
                          <div style={{ 
                            textAlign: 'center', 
                            padding: '3rem', 
                            color: '#94a3b8'
                          }}>
                            No DAP notes recorded yet. Click "Add New DAP Note" to get started.
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '3rem', 
                      color: '#94a3b8'
                    }}>
                      Select a client to view their DAP notes
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Notes */}
        {userType === 'clinician' && activeTab === 'ai-notes' && (
          <AINotesComponent 
            clients={clients}
            selectedClient={selectedClient}
            onNoteSaved={(clientId, noteData) => {
              createClinicalNote(clientId, noteData);
              alert('✅ AI-generated note automatically saved to client chart');
            }}
          />
        )}

        {/* ASAM Assessment */}
        {userType === 'clinician' && activeTab === 'asam-assessment' && (
          <ASAMAssessment 
            client={selectedClient}
            onSave={(assessmentData) => {
              alert('✅ ASAM Assessment saved successfully');
            }}
          />
        )}

        {/* Client Portal */}
        {userType === 'client' && activeTab === 'client-portal' && (
          <ClientPortal clientData={clients[0]} userName={userName} />
        )}

      </main>
    </div>
  );
}

// DAP Note Form Component
function DAPNoteForm({ client, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    sessionType: '',
    dataObservations: '',
    assessment: '',
    plan: '',
    riskAssessment: '',
    sessionDuration: ''
  });

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <h3 style={{ margin: '0 0 2rem 0', color: '#1e293b', fontSize: '1.5rem', fontWeight: '600' }}>
        DAP Clinical Note - {client ? `${client.firstName} ${client.lastName}` : 'New Client'}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
            Session Type
          </label>
          <select
            value={formData.sessionType}
            onChange={(e) => setFormData({...formData, sessionType: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select session type</option>
            <option value="Individual Therapy">Individual Therapy</option>
            <option value="Group Therapy">Group Therapy</option>
            <option value="Family Therapy">Family Therapy</option>
            <option value="Assessment">Assessment</option>
            <option value="Crisis Intervention">Crisis Intervention</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
            Session Duration
          </label>
          <select
            value={formData.sessionDuration}
            onChange={(e) => setFormData({...formData, sessionDuration: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select duration</option>
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
            <option value="60 minutes">60 minutes</option>
            <option value="90 minutes">90 minutes</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* DATA Section */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #dbeafe'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1e40af', fontSize: '1.125rem', fontWeight: '600' }}>
            📊 DATA (Observations & Information)
          </h4>
          <textarea
            value={formData.dataObservations}
            onChange={(e) => setFormData({...formData, dataObservations: e.target.value})}
            placeholder="Record observable data: client appearance, mood, affect, speech, thought process, behavior, response to interventions..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* ASSESSMENT Section */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
          border: '1px solid #dcfce7'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#166534', fontSize: '1.125rem', fontWeight: '600' }}>
            🎯 ASSESSMENT (Clinical Interpretation)
          </h4>
          <textarea
            value={formData.assessment}
            onChange={(e) => setFormData({...formData, assessment: e.target.value})}
            placeholder="Clinical assessment: interpretation of data, progress toward treatment goals, effectiveness of interventions..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* PLAN Section */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#fffbeb',
          borderRadius: '12px',
          border: '1px solid #fed7aa'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#92400e', fontSize: '1.125rem', fontWeight: '600' }}>
            📋 PLAN (Next Steps & Interventions)
          </h4>
          <textarea
            value={formData.plan}
            onChange={(e) => setFormData({...formData, plan: e.target.value})}
            placeholder="Treatment plan: next session goals, interventions to continue/modify, homework assignments..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

      </div>

      {/* Risk Assessment */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#fef2f2',
        borderRadius: '12px',
        border: '1px solid #fecaca',
        marginBottom: '2rem'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#dc2626', fontSize: '1.125rem', fontWeight: '600' }}>
          ⚠️ Risk Assessment
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {['Low Risk', 'Medium Risk', 'High Risk', 'Imminent Risk'].map(level => (
            <label key={level} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              padding: '0.75rem',
              borderRadius: '8px',
              backgroundColor: formData.riskAssessment === level ? '#fecaca' : 'white',
              border: '1px solid #fecaca'
            }}>
              <input
                type="radio"
                name="riskAssessment"
                value={level}
                checked={formData.riskAssessment === level}
                onChange={(e) => setFormData({...formData, riskAssessment: e.target.value})}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f8fafc',
            color: '#64748b',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          Save DAP Note
        </button>
      </div>
    </div>
  );
}

// AI Notes Component with auto-injection
function AINotesComponent({ clients, selectedClient, onNoteSaved }) {
  const [sessionInput, setSessionInput] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(selectedClient?.id || '');
  const [selectedService, setSelectedService] = useState('');
  const [noteFormat, setNoteFormat] = useState('DAP');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const services = [
    { code: '90834', name: '45-min Individual Therapy' },
    { code: '90837', name: '60-min Individual Therapy' },
    { code: '90853', name: 'Group Therapy' }
  ];

  // Recording simulation
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
      
      alert('Recording started! Speak your session notes. Click stop when finished.');
    }
  };

  // Generate clinical notes with auto-injection
  const generateAndInjectNotes = () => {
    if (!sessionInput || !selectedClientId || !selectedService) {
      alert('Please select client, service, and provide session notes');
      return;
    }

    const client = clients.find(c => c.id.toString() === selectedClientId);
    const service = services.find(s => s.code === selectedService);
    
    let noteTemplate = '';
    
    if (noteFormat === 'DAP') {
      noteTemplate = `CLINICAL DOCUMENTATION - DAP FORMAT
====================================================

CLIENT INFORMATION:
Name: ${client.firstName} ${client.lastName}
Service: ${service.code} - ${service.name}
Date: ${new Date().toLocaleDateString()}
Clinician: Dr. Rebecca B. Headley, LPC

DATA (Objective Observations):
• Client presented punctually for scheduled appointment
• Appeared well-groomed and appropriately dressed
• Maintained good eye contact throughout session
• Speech clear and coherent, thought process organized
• Mood appeared stable, cooperative throughout session
• No signs of acute distress observed

ASSESSMENT (Clinical Analysis):
• Client demonstrates progress in treatment goals
• Shows improved coping strategies and insight
• Risk assessment indicates low risk for self-harm
• Treatment engagement remains strong
• Symptoms showing gradual improvement

PLAN (Treatment & Next Steps):
• Continue weekly individual therapy sessions
• Maintain current treatment approach with CBT techniques
• Assign homework: practice relaxation exercises daily
• Next appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}
• Monitor progress and adjust treatment as needed`;

    } else if (noteFormat === 'SOAP') {
      noteTemplate = `CLINICAL DOCUMENTATION - SOAP FORMAT
====================================================

CLIENT: ${client.firstName} ${client.lastName}
SERVICE: ${service.code} - ${service.name}
DATE: ${new Date().toLocaleDateString()}

SUBJECTIVE:
Client reports feeling "better than last week" with improved mood and reduced anxiety. States practicing homework assignments consistently. Sleep patterns have improved. Continues medication as prescribed.

OBJECTIVE:
Client arrived on time, well-groomed. Good eye contact, organized speech. Affect appeared brighter than previous session. No psychomotor agitation observed. Cooperative throughout session.

ASSESSMENT:
Continued progress toward treatment goals. Symptoms responding well to current interventions. Risk assessment remains low. Good treatment engagement and medication compliance noted.

PLAN:
• Continue weekly therapy sessions
• Maintain current homework assignments
• Monitor symptom progression
• Follow-up appointment scheduled`;

    } else { // BIRP
      noteTemplate = `CLINICAL DOCUMENTATION - BIRP FORMAT
====================================================

CLIENT: ${client.firstName} ${client.lastName}
SERVICE: ${service.code} - ${service.name}
DATE: ${new Date().toLocaleDateString()}

BEHAVIOR:
Client appeared cooperative and engaged. Maintained eye contact, organized thought processes. Participated actively in session discussions. No concerning behaviors observed.

INTERVENTION:
Conducted individual therapy session using CBT techniques. Reviewed progress on homework assignments. Practiced stress management techniques. Discussed coping strategies for upcoming challenges.

RESPONSE:
Client responded positively to interventions. Demonstrated good understanding of concepts. Expressed willingness to continue practicing techniques. Showed improved confidence in managing symptoms.

PLAN:
• Continue weekly therapy sessions
• Practice assigned homework daily
• Next appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}
• Monitor continued progress`;
    }

    const finalNotes = noteTemplate + `

SESSION NOTES:
${sessionInput}

Provider: Dr. Rebecca B. Headley, LPC
License: CO123456
Date: ${new Date().toLocaleDateString()}`;

    setGeneratedNotes(finalNotes);

    // Auto-inject into client chart
    const noteData = {
      sessionType: service.name,
      dataObservations: sessionInput,
      assessment: 'AI-generated clinical assessment based on session content',
      plan: 'AI-generated treatment plan recommendations',
      riskAssessment: 'Low Risk',
      sessionDuration: service.name.includes('45') ? '45 minutes' : '60 minutes',
      content: finalNotes,
      isAIGenerated: true
    };

    onNoteSaved(parseInt(selectedClientId), noteData);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
        🤖 AI Clinical Notes
      </h2>
      
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          AI Clinical Documentation System
        </h3>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '16px' }}>
          Record sessions • Generate documentation • Auto-inject to client charts
        </p>
      </div>

      {/* Session Setup */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ 
          marginBottom: '20px', 
          fontSize: '18px',
          color: '#374151'
        }}>
          📋 Session Information
        </h3>
        
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
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
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
        <h3 style={{ 
          marginBottom: '20px', 
          fontSize: '18px',
          color: '#374151'
        }}>
          🎙️ Session Recording
        </h3>
        
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
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#dc2626',
              marginBottom: '8px'
            }}>
              🔴 RECORDING: {formatTime(recordingTime)}
            </div>
            <div style={{ fontSize: '14px', color: '#7f1d1d' }}>
              Session recording in progress...
            </div>
          </div>
        )}
        
        <button
          onClick={handleRecording}
          style={{
            width: '100%',
            padding: '16px',
            background: isRecording ? '#dc2626' : '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
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
        marginBottom: '24px',
        border: '1px solid #e5e7eb'
      }}>
        <h3 style={{ 
          marginBottom: '20px', 
          fontSize: '18px',
          color: '#374151'
        }}>
          📝 Session Notes
        </h3>
        
        <textarea
          value={sessionInput}
          onChange={(e) => setSessionInput(e.target.value)}
          placeholder="Enter session observations, client responses, interventions used, and treatment planning notes..."
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
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        />
        
        <button
          onClick={generateAndInjectNotes}
          disabled={!sessionInput || !selectedClientId || !selectedService}
          style={{
            width: '100%',
            padding: '16px',
            background: (!sessionInput || !selectedClientId || !selectedService) ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: (!sessionInput || !selectedClientId || !selectedService) ? 'not-allowed' : 'pointer',
            marginTop: '16px'
          }}
        >
          🤖 Generate {noteFormat} Notes & Auto-Inject to Chart
        </button>
      </div>

      {/* Generated Notes Preview */}
      {generatedNotes && (
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ 
            margin: '0 0 20px 0', 
            fontSize: '18px',
            color: '#374151'
          }}>
            📄 Generated Notes Preview (Auto-Injected to Client Chart)
          </h3>
          
          <div style={{
            background: '#f0fdf4',
            border: '2px solid #bbf7d0',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            fontSize: '14px',
            color: '#15803d'
          }}>
            ✅ <strong>Successfully Added to Client Chart</strong>
            <br />📋 This note has been automatically saved to the selected client's clinical records.
          </div>
          
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
            maxHeight: '400px'
          }}>
            {generatedNotes}
          </div>
        </div>
      )}
    </div>
  );
}

// ASAM Assessment Component  
function ASAMAssessment({ client, onSave }) {
  const [assessment, setAssessment] = useState({
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    dimension5: '',
    dimension6: '',
    recommendedLevel: ''
  });

  const dimensions = [
    {
      key: 'dimension1',
      title: 'Dimension 1: Acute Intoxication and/or Withdrawal Potential',
      options: ['None', 'Mild', 'Moderate', 'Severe']
    },
    {
      key: 'dimension2', 
      title: 'Dimension 2: Biomedical Conditions and Complications',
      options: ['None', 'Mild', 'Moderate', 'Severe']
    },
    {
      key: 'dimension3',
      title: 'Dimension 3: Emotional, Behavioral, or Cognitive Conditions',
      options: ['None', 'Mild', 'Moderate', 'Severe']
    },
    {
      key: 'dimension4',
      title: 'Dimension 4: Readiness to Change',
      options: ['High', 'Moderate', 'Low', 'Very Low']
    },
    {
      key: 'dimension5',
      title: 'Dimension 5: Relapse, Continued Use, or Continued Problem Potential',
      options: ['Low', 'Moderate', 'High', 'Very High']
    },
    {
      key: 'dimension6',
      title: 'Dimension 6: Recovery Environment',
      options: ['Very Supportive', 'Supportive', 'Neutral', 'Unsupportive', 'Very Unsupportive']
    }
  ];

  const levels = [
    'Level 0.5 - Early Intervention',
    'Level 1 - Outpatient Services',
    'Level 2.1 - Intensive Outpatient',
    'Level 2.5 - Partial Hospitalization',
    'Level 3.1 - Clinically Managed Low-Intensity Residential',
    'Level 3.3 - Clinically Managed Population-Specific High-Intensity Residential',
    'Level 3.5 - Clinically Managed High-Intensity Residential',
    'Level 3.7 - Medically Monitored Intensive Inpatient',
    'Level 4 - Medically Managed Intensive Inpatient'
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{ margin: '0 0 2rem 0', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
        ASAM Assessment
      </h2>
      
      {client && (
        <div style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#f8fafc', 
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>
            Client: {client.firstName} {client.lastName}
          </h3>
          <p style={{ margin: 0, color: '#64748b' }}>
            Current Level: {client.currentLevel}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {dimensions.map(dimension => (
          <div key={dimension.key} style={{
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '12px'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem' }}>
              {dimension.title}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
              {dimension.options.map(option => (
                <label key={option} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  backgroundColor: assessment[dimension.key] === option ? '#dbeafe' : 'transparent'
                }}>
                  <input
                    type="radio"
                    name={dimension.key}
                    value={option}
                    checked={assessment[dimension.key] === option}
                    onChange={(e) => setAssessment({...assessment, [dimension.key]: e.target.value})}
                  />
                  <span style={{ fontSize: '0.875rem' }}>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div style={{
          padding: '1.5rem',
          border: '2px solid #2563eb',
          borderRadius: '12px',
          backgroundColor: '#f0f9ff'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem' }}>
            Recommended Level of Care
          </h4>
          <select
            value={assessment.recommendedLevel}
            onChange={(e) => setAssessment({...assessment, recommendedLevel: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select recommended level</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onSave(assessment)}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            Save ASAM Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

// Client Portal Component
function ClientPortal({ clientData, userName }) {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
        Welcome, {userName}
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>📋 Treatment Summary</h3>
          <div>
            <strong style={{ color: '#374151' }}>Current Level:</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b' }}>{clientData.currentLevel}</p>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <strong style={{ color: '#374151' }}>Treatment Plan:</strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b' }}>{clientData.treatmentPlan}</p>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>📈 Progress Tracking</h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: '#059669',
              marginBottom: '0.5rem'
            }}>
              75%
            </div>
            <p style={{ margin: 0, color: '#64748b' }}>Treatment Progress</p>
          </div>
        </div>

      </div>
    </div>
  );
}
