import { useState, useEffect } from 'react';

export default function MindCarePortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = async (type, name) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUserType(type);
      setUserName(name);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
  const showTab = (tabName) => {
    setActiveTab(tabName);
    closeMenu();
  };

  if (!isClient) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ fontSize: '18px' }}>Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '40px',
          borderRadius: '30px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🏥</div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            MindCare Practice Portal
          </h1>
          <p style={{
            color: '#6b7280',
            marginBottom: '40px',
            fontSize: '18px'
          }}>
            HIPAA-Compliant • Mobile-Optimized
          </p>

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => handleLogin('therapist', 'Dr. Smith')}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                color: 'white',
                background: 'linear-gradient(135deg, #4f46e5, #4338ca)',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                marginBottom: '15px',
                boxShadow: '0 10px 20px rgba(79, 70, 229, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 30px rgba(79, 70, 229, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 20px rgba(79, 70, 229, 0.3)';
              }}
            >
              👨‍⚕️ Login as Therapist
            </button>
            
            <button
              onClick={() => handleLogin('client', 'John Doe')}
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '18px',
                color: 'white',
                background: 'linear-gradient(135deg, #059669, #047857)',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(5, 150, 105, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 30px rgba(5, 150, 105, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 20px rgba(5, 150, 105, 0.3)';
              }}
            >
              👤 Login as Client
            </button>
          </div>

          <div style={{
            marginTop: '30px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '20px',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            🔒 HIPAA Compliant • 🔐 End-to-End Encrypted • ✅ SOC 2 Certified
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'ai-notes', label: 'AI Notes', icon: '🤖' },
    { id: 'calendar', label: 'Calendar', icon: '🗓️' },
    { id: 'notifications', label: 'Notifications', icon: '📧' }
  ];

  const renderContent = () => {
    const contentStyle = {
      padding: isMobile ? '20px' : '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    switch(activeTab) {
      case 'dashboard':
        return (
          <div style={contentStyle}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{
                fontSize: isMobile ? '24px' : '32px',
                fontWeight: 'bold',
                color: '#1f2937',
                margin: 0
              }}>
                Welcome, {userName}! 👋
              </h2>
              {isMobile && (
                <button
                  onClick={toggleMenu}
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  ☰
                </button>
              )}
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: '#4f46e5', fontWeight: '600', marginBottom: '10px', fontSize: '16px' }}>📅 Today's Schedule</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>8</p>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 0 0' }}>appointments</p>
                  </div>
                  <div style={{ fontSize: '48px' }}>📅</div>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: '#059669', fontWeight: '600', marginBottom: '10px', fontSize: '16px' }}>👥 Active Clients</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>24</p>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 0 0' }}>total clients</p>
                  </div>
                  <div style={{ fontSize: '48px' }}>👥</div>
                </div>
              </div>

              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: '#7c3aed', fontWeight: '600', marginBottom: '10px', fontSize: '16px' }}>🤖 AI Notes</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>156</p>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 0 0' }}>generated this month</p>
                  </div>
                  <div style={{ fontSize: '48px' }}>🤖</div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>🚀 Quick Actions</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <button 
                  onClick={() => showTab('ai-notes')}
                  style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📝 New AI Note
                </button>
                <button 
                  onClick={() => showTab('clients')}
                  style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #059669, #0d9488)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  👤 Add Client
                </button>
                <button 
                  onClick={() => showTab('appointments')}
                  style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #f59e0b, #dc2626)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📅 Schedule
                </button>
                <button 
                  onClick={() => showTab('notifications')}
                  style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📧 Send Reminder
                </button>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div style={contentStyle}>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px'
            }}>📅 Appointments</h2>
            
            <div style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden'
            }}>
              {[
                { time: '9:00 AM', client: 'Sarah Johnson', type: 'Individual Therapy', status: 'confirmed' },
                { time: '10:30 AM', client: 'Mike Chen', type: 'Couples Therapy', status: 'confirmed' },
                { time: '2:00 PM', client: 'Lisa Rodriguez', type: 'Family Therapy', status: 'pending' },
                { time: '3:30 PM', client: 'David Kim', type: 'Individual Therapy', status: 'confirmed' }
              ].map((apt, index) => (
                <div key={index} style={{
                  padding: isMobile ? '20px' : '30px',
                  borderBottom: index < 3 ? '1px solid #e5e7eb' : 'none'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    justifyContent: 'space-between',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: '15px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                        <h4 style={{ fontWeight: '600', color: '#1f2937', fontSize: '18px', margin: 0 }}>{apt.client}</h4>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: apt.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                          color: apt.status === 'confirmed' ? '#166534' : '#92400e'
                        }}>
                          {apt.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '14px', color: '#6b7280' }}>
                        <span>⏰ {apt.time}</span>
                        <span>📋 {apt.type}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => alert(`Starting video call with ${apt.client}`)}
                        style={{
                          padding: '10px 16px',
                          backgroundColor: '#4f46e5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        🎥 Start Call
                      </button>
                      <button 
                        onClick={() => alert(`Opening chart for ${apt.client}`)}
                        style={{
                          padding: '10px 16px',
                          backgroundColor: '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        📋 Chart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'clients':
        return (
          <div style={contentStyle}>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px'
            }}>👥 Client Management</h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '25px'
            }}>
              {[
                { name: 'Sarah Johnson', status: 'Active', sessions: 12, progress: 85 },
                { name: 'Mike Chen', status: 'Active', sessions: 8, progress: 72 },
                { name: 'Lisa Rodriguez', status: 'Pending', sessions: 3, progress: 45 },
                { name: 'David Kim', status: 'Active', sessions: 15, progress: 90 }
              ].map((client, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>{client.name}</h3>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', marginBottom: '8px' }}>
                      <span style={{ color: '#6b7280' }}>Progress</span>
                      <span style={{ fontWeight: '500' }}>{client.progress}%</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '10px', height: '8px' }}>
                      <div style={{
                        background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                        height: '8px',
                        borderRadius: '10px',
                        width: `${client.progress}%`,
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '14px', marginTop: '15px' }}>
                      <div>
                        <span style={{ color: '#6b7280' }}>Status:</span>
                        <span style={{
                          marginLeft: '5px',
                          fontWeight: '500',
                          color: client.status === 'Active' ? '#059669' : '#f59e0b'
                        }}>{client.status}</span>
                      </div>
                      <div>
                        <span style={{ color: '#6b7280' }}>Sessions:</span>
                        <span style={{ marginLeft: '5px', fontWeight: '500' }}>{client.sessions}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button 
                      onClick={() => showTab('ai-notes')}
                      style={{
                        flex: 1,
                        minWidth: '80px',
                        padding: '10px',
                        backgroundColor: '#eef2ff',
                        color: '#4338ca',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      📝 Notes
                    </button>
                    <button 
                      onClick={() => alert(`Calling ${client.name}`)}
                      style={{
                        flex: 1,
                        minWidth: '80px',
                        padding: '10px',
                        backgroundColor: '#ecfdf5',
                        color: '#047857',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      📞 Call
                    </button>
                    <button 
                      onClick={() => alert(`Emailing ${client.name}`)}
                      style={{
                        flex: 1,
                        minWidth: '80px',
                        padding: '10px',
                        backgroundColor: '#eff6ff',
                        color: '#1d4ed8',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      📧 Email
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ai-notes':
        return (
          <div style={contentStyle}>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px'
            }}>🤖 AI-Powered Session Notes</h2>
            
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '25px',
                marginBottom: '25px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Select Client
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '15px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}>
                    <option>Sarah Johnson</option>
                    <option>Mike Chen</option>
                    <option>Lisa Rodriguez</option>
                    <option>David Kim</option>
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Session Type
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '15px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}>
                    <option>Individual Therapy</option>
                    <option>Couples Therapy</option>
                    <option>Family Therapy</option>
                    <option>Group Therapy</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Session Notes
                </label>
                <textarea 
                  style={{
                    width: '100%',
                    padding: '16px',
                    border: '2px solid #d1d5db',
                    borderRadius: '15px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '200px'
                  }}
                  placeholder="Enter session notes here... AI will automatically generate summaries and insights."
                />
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px'
              }}>
                <button 
                  onClick={() => alert('Session notes saved successfully!')}
                  style={{
                    padding: '12px',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  💾 Save Notes
                </button>
                <button 
                  onClick={() => alert('AI Summary: Client showed progress in anxiety management. Continue CBT approach.')}
                  style={{
                    padding: '12px',
                    background: 'linear-gradient(135deg, #059669, #0d9488)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  🤖 AI Summary
                </button>
                <button 
                  onClick={() => alert('Key Themes: Anxiety management, CBT techniques, Progress tracking')}
                  style={{
                    padding: '12px',
                    background: 'linear-gradient(135deg, #f59e0b, #dc2626)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  🎯 Extract Themes
                </button>
                <button 
                  onClick={() => alert('Treatment Plan: Continue weekly CBT sessions with anxiety focus.')}
                  style={{
                    padding: '12px',
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px'
                  }}
                >
                  📋 Treatment Plan
                </button>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div style={contentStyle}>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px'
            }}>🗓️ Calendar Integration</h2>
            
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>📅</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>Google Calendar Connected</h3>
              <p style={{ 
                color: '#6b7280',
                marginBottom: '30px',
                maxWidth: '400px',
                margin: '0 auto 30px auto',
                lineHeight: '1.5'
              }}>
                Your appointments are automatically synced with Google Calendar.
              </p>
              <button 
                onClick={() => alert('Opening Google Calendar...')}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '16px'
                }}
              >
                📅 Open Calendar
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div style={contentStyle}>
            <h2 style={{
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px'
            }}>📧 Notifications</h2>
            
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>📱 Send Reminder</h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '25px',
                marginBottom: '25px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Select Client
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '15px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}>
                    <option>Sarah Johnson - Today 9:00 AM</option>
                    <option>Mike Chen - Today 10:30 AM</option>
                    <option>Lisa Rodriguez - Today 2:00 PM</option>
                    <option>David Kim - Tomorrow 9:00 AM</option>
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Reminder Type
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '15px',
                    fontSize: '16px',
                    backgroundColor: 'white'
                  }}>
                    <option>📧 Email Reminder</option>
                    <option>📱 SMS Reminder</option>
                    <option>📧📱 Email + SMS</option>
                  </select>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: '15px'
              }}>
                <button 
                  onClick={() => alert('Email reminder sent successfully!')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}
                >
                  📧 Send Email
                </button>
                <button 
                  onClick={() => alert('SMS reminder sent successfully!')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}
                >
                  📱 Send SMS
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Mobile Header */}
      {isMobile && (
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              🏥 MindCare Portal
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>{userName}</span>
              <button 
                onClick={toggleMenu}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ☰
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '64px'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0
            }}>
              🏥 MindCare Practice Portal
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ color: '#6b7280' }}>Welcome, {userName}</span>
              <button 
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
      )}

      <div style={{ display: 'flex' }}>
        {/* Mobile Navigation Menu */}
        {isMobile && menuOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50
          }}>
            <div 
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }}
              onClick={closeMenu}
            ></div>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '256px',
              backgroundColor: 'white',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Navigation</h2>
                  <button 
                    onClick={closeMenu}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      backgroundColor: '#f3f4f6',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <nav style={{ padding: '16px' }}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => showTab(item.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      marginBottom: '8px',
                      backgroundColor: activeTab === item.id ? '#eef2ff' : 'transparent',
                      color: activeTab === item.id ? '#4338ca' : '#6b7280',
                      fontWeight: activeTab === item.id ? '500' : 'normal',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ marginRight: '12px' }}>{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <div style={{ paddingTop: '16px', borderTop: '1px solid #e5e7eb', marginTop: '16px' }}>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      color: '#dc2626',
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ marginRight: '12px' }}>🚪</span>
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <div style={{
            width: '256px',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            borderRight: '1px solid #e5e7eb',
            minHeight: '100vh'
          }}>
            <nav style={{ padding: '16px' }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '8px',
                    backgroundColor: activeTab === item.id ? '#eef2ff' : 'transparent',
                    color: activeTab === item.id ? '#4338ca' : '#6b7280',
                    fontWeight: activeTab === item.id ? '500' : 'normal',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ marginRight: '12px' }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
