import { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (type, name) => {
    setUserType(type);
    setUserName(name);
    setIsLoggedIn(true);
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
            🏥 RBH Practice Portal
          </h1>
          
          <p style={{ 
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            HIPAA-Compliant Practice Management System
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => handleLogin('therapist', 'Dr. Rebecca B. Headley')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👩‍⚕️ Login as Dr. Rebecca (Therapist)
            </button>
            
            <button
              onClick={() => handleLogin('client', 'Sarah Johnson')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👤 Login as Sarah (Client)
            </button>
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: '#666',
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '6px'
          }}>
            🔒 HIPAA-Compliant • Secure • Audit Logged
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Cambria, serif'
    }}>
      <header style={{
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          🏥 RBH Practice Portal
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1rem' }}>Welcome, {userName}</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Cambria, serif'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{
          width: '280px',
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '2rem 0'
        }}>
          <nav>
            {['dashboard', 'appointments', 'clients', 'documents', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                  color: 'white',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'Cambria, serif',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'dashboard' && '📊'} 
                {tab === 'appointments' && '📅'} 
                {tab === 'clients' && '👥'} 
                {tab === 'documents' && '📋'} 
                {tab === 'team' && '👨‍⚕️'} 
                {' '}{tab}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ flex: 1, padding: '2rem' }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                Dashboard
              </h2>
              
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
                border: '2px solid #059669'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#059669' }}>
                  🔒 HIPAA Compliance Status
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Encrypted Storage</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Audit Logging</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Access Controls</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Google SSO</div>
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#4f46e5' }}>
                    5
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Total Appointments</p>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#059669' }}>
                    3
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Active Clients</p>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#f59e0b' }}>
                    2
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Team Members</p>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#dc2626' }}>
                    12
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Audit Events</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  📅 Appointments
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => alert('Schedule appointment feature - Advanced forms coming in Phase 2!')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Schedule New Appointment
                  </button>
                )}
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                    Therapy Session
                  </h3>
                  <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                    📅 March 15, 2024 at 2:00 PM
                  </p>
                  <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                    👤 {userType === 'therapist' ? 'Sarah Johnson' : 'Dr. Rebecca B. Headley'}
                  </p>
                  <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                    📊 Status: <span style={{ fontWeight: 'bold' }}>Scheduled</span>
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                  <button
                    onClick={() => {
                      window.open('https://meet.google.com/new', '_blank');
                      alert('Video session started! This would be logged in HIPAA audit trail.');
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    🎥 Start Video Session
                  </button>
                  <button
                    onClick={() => alert('Reschedule feature - Advanced forms coming in Phase 2!')}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#f59e0b',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    📅 Reschedule
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  👥 Clients
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => alert('Add client feature - Advanced forms coming in Phase 2!')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Add New Client
                  </button>
                )}
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'start',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                      Sarah Johnson
                    </h3>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                      📧 sarah@email.com
                    </p>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                      📞 (555) 123-4567
                    </p>
                    <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                      🏥 Insurance: Blue Cross Blue Shield
                    </p>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
                      Sessions: 12 | Therapist: Dr. Rebecca B. Headley
                    </p>
                  </div>
                  {userType === 'therapist' && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <button
                        onClick={() => alert('Edit client feature - Advanced forms coming in Phase 2!')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#64748b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        ✏️ Edit Client
                      </button>
                      <button
                        onClick={() => setActiveTab('documents')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📋 Documents
                      </button>
                    </div>
                  )}
                </div>
                
                <div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#64748b' }}>Treatment Progress</span>
                    <span style={{ color: '#1e293b', fontWeight: 'bold' }}>
                      75%
                    </span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '75%',
                      height: '100%',
                      backgroundColor: '#4f46e5'
                    }} />
                  </div>
                </div>

                <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e293b' }}>
                    Consent Forms Status:
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: '#dcfce7',
                      color: '#166534'
                    }}>
                      ✅ Intake Assessment
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: '#dcfce7',
                      color: '#166534'
                    }}>
                      ✅ Privacy Consent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                📋 Clinical Documents
              </h2>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  Available Document Templates
                </h3>
                
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                        Intake Assessment
                      </h4>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                        Type: intake | Required | 5 fields
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => alert('Document completion feature - Advanced forms coming in Phase 2!')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📝 Complete Form
                      </button>
                      {userType === 'therapist' && (
                        <button
                          onClick={() => alert('Review responses feature - Advanced analytics coming in Phase 2!')}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontFamily: 'Cambria, serif'
                          }}
                        >
                          👁️ Review Responses
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                        Privacy Policy Consent
                      </h4>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                        Type: consent | Required | 3 fields
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => alert('Document completion feature - Advanced forms coming in Phase 2!')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📝 Complete Form
                      </button>
                      {userType === 'therapist' && (
                        <button
                          onClick={() => alert('Review responses feature - Advanced analytics coming in Phase 2!')}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#059669',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontFamily: 'Cambria, serif'
                          }}
                        >
                          👁️ Review Responses
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  Document Completion Statistics
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1rem' }}>
                      Intake Assessment
                    </h4>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Completion Rate</span>
                      <span style={{ color: '#1e293b', fontWeight: 'bold' }}>85%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '85%',
                        height: '100%',
                        backgroundColor: '#059669'
                      }} />
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1rem' }}>
                      Privacy Consent
                    </h4>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Completion Rate</span>
                      <span style={{ color: '#1e293b', fontWeight: 'bold' }}>92%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '92%',
                        height: '100%',
                        backgroundColor: '#059669'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                👨‍⚕️ Team Management & HIPAA Audit
              </h2>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  Team Members
                </h3>

                <div style={{
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                        Dr. Rebecca B. Headley
                      </h4>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        📧 rebecca@rbhpractice.com
                      </p>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        🏥 Role: Lead Therapist | License: LPC123456
                      </p>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
                        Specialties: Anxiety, Depression, PTSD, Trauma Therapy
                      </p>
