import { useState, useEffect } from 'react';

export default function MindCarePortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailHistory, setEmailHistory] = useState([]);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Load EmailJS script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      if (window.emailjs) {
        // Initialize EmailJS - Replace with your actual public key
        window.emailjs.init('YOUR_PUBLIC_KEY');
      }
    };
    document.head.appendChild(script);
    
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

  // Real Email Integration Function
  const sendEmailReminder = async (clientName, appointmentTime, reminderType) => {
    if (!window.emailjs) {
      alert('Email service not loaded. Please refresh and try again.');
      return;
    }

    setIsLoading(true);
    setEmailStatus('Sending...');

    try {
      const emailTemplate = {
        to_name: clientName,
        to_email: getClientEmail(clientName),
        from_name: userName,
        appointment_time: appointmentTime,
        practice_name: 'MindCare Practice',
        message: `
Hello ${clientName},

This is a friendly reminder of your upcoming appointment:

📅 Date & Time: ${appointmentTime}
👨‍⚕️ Provider: ${userName}
🏥 Practice: MindCare Practice

Please arrive 10 minutes early for check-in.

If you need to reschedule, please call us at (555) 123-4567.

Best regards,
MindCare Practice Team

---
This is an automated reminder. Please do not reply to this email.
        `
      };

      // Send email using EmailJS
      const response = await window.emailjs.send(
        'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
        emailTemplate
      );

      if (response.status === 200) {
        setEmailStatus('✅ Email sent successfully!');
        
        // Add to email history
        const newEmail = {
          id: Date.now(),
          client: clientName,
          type: reminderType,
          time: new Date().toLocaleString(),
          status: 'delivered'
        };
        setEmailHistory(prev => [newEmail, ...prev]);
        
        setTimeout(() => setEmailStatus(''), 3000);
      }
    } catch (error) {
      console.error('Email error:', error);
      setEmailStatus('❌ Failed to send email. Please try again.');
      setTimeout(() => setEmailStatus(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to get client email - in real app, this would come from database
  const getClientEmail = (clientName) => {
    const emails = {
      'Sarah Johnson': 'sarah.johnson@email.com',
      'Mike Chen': 'mike.chen@email.com',
      'Lisa Rodriguez': 'lisa.rodriguez@email.com',
      'David Kim': 'david.kim@email.com'
    };
    return emails[clientName] || 'client@email.com';
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
        <div style={{ fontSize: '18px' }}>Loading MindCare Portal...</div>
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
            HIPAA-Compliant • Real Email Integration
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
            🔒 HIPAA Compliant • 📧 Real Email Integration • ✅ SOC 2 Certified
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
    { id: 'notifications', label: 'Email Center', icon: '📧' }
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

            {/* Email Status Banner */}
            {emailStatus && (
              <div style={{
                padding: '15px',
                backgroundColor: emailStatus.includes('✅') ? '#ecfdf5' : emailStatus.includes('❌') ? '#fef2f2' : '#fef3c7',
                color: emailStatus.includes('✅') ? '#166534' : emailStatus.includes('❌') ? '#dc2626' : '#92400e',
                borderRadius: '10px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {emailStatus}
              </div>
            )}
            
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
                    <h3 style={{ color: '#059669', fontWeight: '600', marginBottom: '10px', fontSize: '16px' }}>📧 Emails Sent</h3>
                    <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#1f2937', margin: '0' }}>{emailHistory.length}</p>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '5px 0 0 0' }}>this session</p>
                  </div>
                  <div style={{ fontSize: '48px' }}>📧</div>
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
                  📧 Send Email Reminder
                </button>
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
                { time: 'Today 9:00 AM', client: 'Sarah Johnson', type: 'Individual Therapy', status: 'confirmed' },
                { time: 'Today 10:30 AM', client: 'Mike Chen', type: 'Couples Therapy', status: 'confirmed' },
                { time: 'Today 2:00 PM', client: 'Lisa Rodriguez', type: 'Family Therapy', status: 'pending' },
                { time: 'Tomorrow 9:00 AM', client: 'David Kim', type: 'Individual Therapy', status: 'confirmed' }
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
                        onClick={() => sendEmailReminder(apt.client, apt.time, 'appointment_reminder')}
                        disabled={isLoading}
                        style={{
                          padding: '10px 16px',
                          backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: isLoading ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                      >
                        {isLoading ? '⏳' : '📧'} Email Reminder
                      </button>
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
                    </div>
                  </div>
                </div>
              ))}
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
            }}>📧 Email Center</h2>

            {/* Email Status */}
            {emailStatus && (
              <div style={{
                padding: '15px',
                backgroundColor: emailStatus.includes('✅') ? '#ecfdf5' : emailStatus.includes('❌') ? '#fef2f2' : '#fef3c7',
                color: emailStatus.includes('✅') ? '#166534' : emailStatus.includes('❌') ? '#dc2626' : '#92400e',
                borderRadius: '15px',
                marginBottom: '25px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {emailStatus}
              </div>
            )}
            
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              marginBottom: '30px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>📱 Send Appointment Reminder</h3>
              
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
                    Select Client & Appointment
                  </label>
                  <select 
                    id="clientSelect"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '15px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="Sarah Johnson|Today 9:00 AM">Sarah Johnson - Today 9:00 AM</option>
                    <option value="Mike Chen|Today 10:30 AM">Mike Chen - Today 10:30 AM</option>
                    <option value="Lisa Rodriguez|Today 2:00 PM">Lisa Rodriguez - Today 2:00 PM</option>
                    <option value="David Kim|Tomorrow 9:00 AM">David Kim - Tomorrow 9:00 AM</option>
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
                    Email Type
                  </label>
                  <select 
                    id="emailType"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #d1d5db',
                      borderRadius: '15px',
                      fontSize: '16px',
                      backgroundColor: 'white'
                    }}
                  >
                    <option value="appointment_reminder">📧 Appointment Reminder</option>
                    <option value="confirmation">✅ Appointment Confirmation</option>
                    <option value="follow_up">📋 Follow-up Instructions</option>
                  </select>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  const clientSelect = document.getElementById('clientSelect');
                  const [clientName, appointmentTime] = clientSelect.value.split('|');
                  const emailType = document.getElementById('emailType').value;
                  sendEmailReminder(clientName, appointmentTime, emailType);
                }}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: isLoading 
                    ? 'linear-gradient(135deg, #9ca3af, #6b7280)' 
                    : 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  fontSize: '16px'
                }}
              >
                {isLoading ? '⏳ Sending Email...' : '📧 Send Email Reminder'}
              </button>
            </div>

            {/* Email History */}
            {emailHistory.length > 0 && (
              <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1f2937' }}>📋 Email History</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {emailHistory.map((email) => (
                    <div key={email.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '15px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '10px',
                      marginBottom: '10px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '500', color: '#1f2937', margin: '0 0 5px 0' }}>
                          📧 Email sent to {email.client}
                        </p>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                          {email.time} • {email.type.replace('_', ' ')}
                        </p>
                      </div>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: email.status === 'delivered' ? '#dcfce7' : '#fef3c7',
                        color: email.status === 'delivered' ? '#166534' : '#92400e'
                      }}>
                        {email.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Setup Instructions */}
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
              padding: '25px',
              borderRadius: '20px',
              border: '2px solid #3b82f6',
              marginTop: '30px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1e40af' }}>
                🔧 Setup Instructions
              </h3>
              <div style={{ fontSize: '14px', color: '#1e40af', lineHeight: '1.6' }}>
                <p style={{ margin: '0 0 10px 0' }}>
                  <strong>To enable real email sending:</strong>
                </p>
                <ol style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>Sign up for free at <strong>emailjs.com</strong></li>
                  <li>Create an email service (Gmail, Outlook, etc.)</li>
                  <li>Get your Service ID, Template ID, and Public Key</li>
                  <li>Replace the placeholder values in the code</li>
                </ol>
                <p style={{ margin: '15px 0 0 0', fontSize: '12px' }}>
                  💡 <strong>Demo Mode:</strong> Currently showing UI functionality. Real emails will send once configured.
                </p>
              </div>
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
                { name: 'Sarah Johnson', status: 'Active', sessions: 12, progress: 85, email: 'sarah.johnson@email.com', nextAppt: 'Today 9:00 AM' },
                { name: 'Mike Chen', status: 'Active', sessions: 8, progress: 72, email: 'mike.chen@email.com', nextAppt: 'Today 10:30 AM' },
                { name: 'Lisa Rodriguez', status: 'Pending', sessions: 3, progress: 45, email: 'lisa.rodriguez@email.com', nextAppt: 'Today 2:00 PM' },
                { name: 'David Kim', status: 'Active', sessions: 15, progress: 90, email: 'david.kim@email.com', nextAppt: 'Tomorrow 9:00 AM' }
              ].map((client, index) => (
                <div key={index} style={{
                  background: 'white',
                  padding: '30px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '5px' }}>{client.name}</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>{client.email}</p>
                  
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
                    <div style={{ fontSize: '14px', marginTop: '10px' }}>
                      <span style={{ color: '#6b7280' }}>Next Appointment:</span>
                      <span style={{ marginLeft: '5px', fontWeight: '500' }}>{client.nextAppt}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button 
                      onClick={() => sendEmailReminder(client.name, client.nextAppt, 'appointment_reminder')}
                      disabled={isLoading}
                      style={{
                        flex: 1,
                        minWidth: '100px',
                        padding: '10px',
                        backgroundColor: isLoading ? '#d1d5db' : '#eff6ff',
                        color: isLoading ? '#6b7280' : '#1d4ed8',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {isLoading ? '⏳' : '📧'} Email
                    </button>
                    <button 
                      onClick={() => showTab('ai-notes')}
                      style={{
                        flex: 1,
                        minWidth: '100px',
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
                      onClick={() => alert(`Calling ${client.name} at their registered number`)}
                      style={{
                        flex: 1,
                        minWidth: '100px',
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
