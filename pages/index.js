import { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

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
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '20px' }}>🏥 MindCare Portal</h1>
          <button
            onClick={() => setIsLoggedIn(true)}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{
        background: '#667eea',
        color: 'white',
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0 }}>🏥 MindCare Portal</h1>
        <button
          onClick={() => setIsLoggedIn(false)}
          style={{
            background: 'transparent',
            color: 'white',
            border: '1px solid white',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div style={{ background: 'white', padding: '0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex' }}>
          {['dashboard', 'appointments', 'clients', 'ai-notes'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '15px',
                background: activeTab === tab ? '#667eea' : 'white',
                color: activeTab === tab ? 'white' : '#666',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab === 'ai-notes' ? '🤖 AI Notes' : 
               tab === 'dashboard' ? '📊 Dashboard' :
               tab === 'appointments' ? '📅 Appointments' : 
               '👥 Clients'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2>📊 Dashboard</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <p>Welcome to MindCare Portal! Everything is working correctly.</p>
            </div>
          </div>
        )}

        {activeTab === 'ai-notes' && (
          <div>
            <h2>🤖 AI Notes</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3>Session Recording</h3>
              <button style={{
                background: '#16a34a',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                🎙️ Start Recording
              </button>
            </div>

            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <h3>Generate Notes</h3>
              <textarea
                placeholder="Session notes will appear here..."
                style={{
                  width: '100%',
                  height: '100px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  boxSizing: 'border-box'
                }}
              />
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                🤖 Generate Notes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2>📅 Appointments</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <p>Appointments feature coming soon...</p>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <h2>👥 Clients</h2>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
              <p>Client management coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
