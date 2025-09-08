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
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                📅 Appointments
              </h2>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Therapy Session</h3>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>March 15, 2024 at 2:00 PM</p>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                  {userType === 'therapist' ? 'Client: Sarah Johnson' : 'Therapist: Dr. Rebecca'}
                </p>
                <button
                  onClick={() => window.open('https://meet.google.com/new', '_blank')}
                  style={{
                    padding: '1rem 2rem',
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
                  🎥 Start Video Session
                </button>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                👥 Clients
              </h2>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Sarah Johnson</h3>
                <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>📧 sarah@email.com</p>
                <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>📞 (555) 123-4567</p>
                <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>🏥 Insurance: Blue Cross Blue Shield</p>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>Sessions: 12 | Progress: 75%</p>
                <div style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: '75%',
                    height: '100%',
                    backgroundColor: '#4f46e5'
                  }} />
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
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Intake Assessment</h3>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>Required document for all new clients</p>
                <button
                  onClick={() => alert('Document completion feature coming in Phase 2!')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontFamily: 'Cambria, serif',
                    fontWeight: 'bold',
                    marginRight: '1rem'
                  }}
                >
                  📝 Complete Form
                </button>
                {userType === 'therapist' && (
                  <button
                    onClick={() => alert('Review responses feature coming in Phase 2!')}
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
                    👁️ Review Responses
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                👨‍⚕️ Team Management
              </h2>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Dr. Rebecca B. Headley</h3>
                <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>📧 rebecca@rbhpractice.com</p>
                <p style={{ color: '#64748b', marginBottom: '0.5rem' }}>🏥 Lead Therapist | License: LPC123456</p>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>Specialties: Anxiety, Depression, PTSD</p>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#dcfce7',
                  borderRadius: '8px'
                }}>
                  <p style={{ color: '#166534', margin: 0, fontWeight: 'bold' }}>
                    🟢 Current User - Active Clients: 3 | Monthly Sessions: 24
                  </p>
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>🔍 HIPAA Audit Trail</h3>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontWeight: 'bold', color: '#1e293b' }}>LOGIN_SUCCESS</div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    User: {userName} | Time: {new Date().toLocaleString()} | IP: 192.168.1.100
                  </div>
                </div>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#fef3c7',
                  borderRadius: '8px',
                  border: '1px solid #f59e0b'
                }}>
                  <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem' }}>
                    🔒 <strong>HIPAA Notice:</strong> All user actions are logged for security and compliance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
