import { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const login = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType('');
  };

  // Google Integration - Your Real Credentials
  const connectGoogle = (service) => {
    const clientId = '940233544658-rbhdvbt2l825ae83bagpiqn83c79e65c.apps.googleusercontent.com';
    const redirectUri = 'https://rbh-practice-portal.vercel.app';
    let scope = '';
    
    if (service === 'calendar') {
      scope = 'https://www.googleapis.com/auth/calendar';
    } else if (service === 'gmail') {
      scope = 'https://www.googleapis.com/auth/gmail.send';
    }
    
    const authUrl = `https://accounts.google.com/oauth/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
    
    window.location.href = authUrl;
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%',
          margin: '1rem'
        }}>
          <h1 style={{ color: '#333', marginBottom: '1rem' }}>🧠 MindCare Portal</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>HIPAA-Compliant Practice Management</p>
          
          <button
            onClick={() => login('clinician')}
            style={{
              background: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              marginBottom: '1rem',
              fontSize: '1rem'
            }}
          >
            👨‍⚕️ Login as Clinician
          </button>
          
          <button
            onClick={() => login('client')}
            style={{
              background: '#34a853',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '1rem'
            }}
          >
            👤 Login as Client
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '1rem'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '1rem',
        borderRadius: '10px',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>🧠 MindCare Portal</h1>
          <p style={{ margin: 0, color: '#666' }}>Welcome, {userType === 'clinician' ? 'Dr. Wilson' : 'Sarah Johnson'}</p>
        </div>
        <button
          onClick={logout}
          style={{
            background: '#ff4757',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div style={{
        background: 'white',
        padding: '1rem',
        borderRadius: '10px',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['dashboard', 'clients', 'appointments'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#667eea' : '#f0f0f0',
                color: activeTab === tab ? 'white' : '#333',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Google Integration */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '10px',
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>🔗 Google Integrations</h3>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => connectGoogle('calendar')}
                style={{
                  background: '#4285f4',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                📅 Connect Google Calendar
              </button>
              
              <button
                onClick={() => connectGoogle('gmail')}
                style={{
                  background: '#ea4335',
                  color: 'white',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                📧 Connect Gmail
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '10px'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>📊 Practice Overview</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8f9ff', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: 0, color: '#667eea' }}>Total Clients</h4>
                <p style={{ fontSize: '2rem', margin: 0, color: '#333' }}>25</p>
              </div>
              
              <div style={{ background: '#f0fff4', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: 0, color: '#4CAF50' }}>This Week</h4>
                <p style={{ fontSize: '2rem', margin: 0, color: '#333' }}>8</p>
              </div>
              
              <div style={{ background: '#fff5f0', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                <h4 style={{ margin: 0, color: '#ff7043' }}>Pending</h4>
                <p style={{ fontSize: '2rem', margin: 0, color: '#333' }}>3</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'clients' && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>👥 Client Management</h3>
          <p style={{ color: '#666' }}>Client management features will be here.</p>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '10px'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333' }}>📅 Appointments</h3>
          <p style={{ color: '#666' }}>Appointment management features will be here.</p>
        </div>
      )}
    </div>
  );
}
