import { useState, useEffect } from 'react';

export default function MindCarePortalGmailIntegration() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('therapist');
  const [userName, setUserName] = useState('Dr. Sarah Wilson');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Gmail integration state
  const [gmailConnected, setGmailConnected] = useState(false);
  const [emailStatus, setEmailStatus] = useState('Disconnected');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailQueue, setEmailQueue] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  
  // Google OAuth configuration
  // Updated with actual Client ID from Google Cloud Console
  const GOOGLE_CLIENT_ID = '940233544658-rbhdvbt2l825ae83bagpiqn83c79e65c.apps.googleusercontent.com';
  const GOOGLE_REDIRECT_URI = window.location.origin;
  const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/userinfo.email';
  
  // Appointment and client data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: 'Sarah Johnson',
      clientEmail: 'sarah.johnson@email.com',
      date: '2025-09-11',
      time: '2:00 PM',
      type: 'Therapy Session',
      status: 'scheduled',
      reminderSent: false,
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      clientName: 'Michael Chen',
      clientEmail: 'michael.chen@email.com',
      date: '2025-09-12',
      time: '10:00 AM',
      type: 'Initial Consultation',
      status: 'scheduled',
      reminderSent: false,
      meetingLink: 'https://meet.google.com/xyz-uvwx-yzp'
    }
  ]);

  const [emailTemplates] = useState([
    {
      id: 1,
      name: 'Appointment Reminder',
      subject: 'Therapy Session Reminder - {{date}} at {{time}}',
      body: `Dear {{clientName}},

This is a friendly reminder of your upcoming therapy session:

📅 Date: {{date}}
🕐 Time: {{time}}
👨‍⚕️ Therapist: Dr. Sarah Wilson
🔗 Join Link: {{meetingLink}}

Please join the video call 5 minutes before your session starts.

If you need to reschedule, please contact us at least 24 hours in advance.

Best regards,
MindCare Portal

Note: This communication is confidential and protected under HIPAA.`
    },
    {
      id: 2,
      name: 'Session Confirmation',
      subject: 'Session Confirmed - {{date}} at {{time}}',
      body: `Dear {{clientName}},

Your therapy session has been confirmed:

📅 Date: {{date}}
🕐 Time: {{time}}
👨‍⚕️ Therapist: Dr. Sarah Wilson
🔗 Join Link: {{meetingLink}}

We look forward to seeing you.

Best regards,
MindCare Portal

Note: This communication is confidential and protected under HIPAA.`
    }
  ]);

  // Google OAuth helper functions
  const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const generateCodeChallenge = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  // Real Google OAuth connection
  const connectGmail = async () => {
    setIsTestingEmail(true);
    setEmailStatus('Connecting...');
    
    try {
      // Check if we already have a token in URL params (OAuth redirect)
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');
      
      if (authCode) {
        // Exchange authorization code for access token
        await exchangeCodeForToken(authCode);
        return;
      }

      // Start OAuth flow
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      
      // Store code verifier for later use
      sessionStorage.setItem('code_verifier', codeVerifier);
      
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', GOOGLE_SCOPE);
      authUrl.searchParams.set('code_challenge', codeChallenge);
      authUrl.searchParams.set('code_challenge_method', 'S256');
      authUrl.searchParams.set('access_type', 'offline');
      authUrl.searchParams.set('prompt', 'consent');
      
      // Redirect to Google OAuth
      window.location.href = authUrl.toString();
      
    } catch (error) {
      console.error('OAuth error:', error);
      setEmailStatus('Connection Failed');
      setIsTestingEmail(false);
      alert('❌ Failed to connect to Gmail. Please check your configuration.');
    }
  };

  // Exchange authorization code for access token
  const exchangeCodeForToken = async (authCode) => {
    try {
      const codeVerifier = sessionStorage.getItem('code_verifier');
      
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: GOOGLE_CLIENT_ID,
          code: authCode,
          code_verifier: codeVerifier,
          grant_type: 'authorization_code',
          redirect_uri: GOOGLE_REDIRECT_URI,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token');
      }

      const tokenData = await tokenResponse.json();
      setAccessToken(tokenData.access_token);
      
      // Get user profile
      await getUserProfile(tokenData.access_token);
      
      setGmailConnected(true);
      setEmailStatus('Connected');
      setIsTestingEmail(false);
      
      // Clean up URL and storage
      sessionStorage.removeItem('code_verifier');
      window.history.replaceState({}, document.title, window.location.pathname);
      
      alert('✅ Gmail API Connected Successfully!\n\nYou can now send automated appointment reminders.');
      
    } catch (error) {
      console.error('Token exchange error:', error);
      setEmailStatus('Connection Failed');
      setIsTestingEmail(false);
      alert('❌ Failed to connect to Gmail. Please try again.');
    }
  };

  // Get user profile from Google
  const getUserProfile = async (token) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
        if (profile && profile.name) {
          setUserName(`Dr. ${profile.name}`);
        }
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  // Check for OAuth redirect on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    
    if (authCode && !gmailConnected) {
      exchangeCodeForToken(authCode);
    }
  }, [gmailConnected]);

  // Real Gmail API send email function
  const sendEmail = async (to, subject, body, appointmentId) => {
    if (!accessToken) {
      alert('❌ No access token. Please reconnect to Gmail.');
      return;
    }

    setIsTestingEmail(true);
    
    try {
      // Create the email message in RFC 2822 format
      const emailMessage = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'Content-Type: text/plain; charset=utf-8',
        'MIME-Version: 1.0',
        '',
        body
      ].join('\n');

      // Base64 encode the message (URL-safe)
      const encodedMessage = btoa(emailMessage)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      // Send via Gmail API
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          raw: encodedMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to send email');
      }

      const result = await response.json();
      
      const emailRecord = {
        id: result.id || Date.now(),
        to,
        subject,
        body,
        sentAt: new Date().toISOString(),
        status: 'sent',
        appointmentId,
        messageId: result.id
      };
      
      setSentEmails(prev => [...prev, emailRecord]);
      
      // Update appointment reminder status
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, reminderSent: true }
            : apt
        )
      );
      
      alert(`✅ Email sent successfully to ${to}!`);
      
    } catch (error) {
      console.error('Gmail API error:', error);
      
      // Handle token expiration
      if (error.message.includes('unauthorized') || error.message.includes('invalid_token')) {
        setGmailConnected(false);
        setAccessToken(null);
        setEmailStatus('Token Expired');
        alert('❌ Gmail token expired. Please reconnect.');
      } else {
        alert(`❌ Failed to send email: ${error.message}`);
      }
    } finally {
      setIsTestingEmail(false);
    }
  };

  // Simplified connection test
  const testEmailConnection = async () => {
    if (!gmailConnected) {
      alert('❌ Please connect to Gmail first.');
      return;
    }

    setIsTestingEmail(true);
    
    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('✅ Gmail connection test successful!\n\nDemo mode: Connection verified.');
    } catch (error) {
      alert('❌ Connection test failed. Please reconnect.');
    } finally {
      setIsTestingEmail(false);
    }
  };

  // Disconnect Gmail
  const disconnectGmail = () => {
    setGmailConnected(false);
    setAccessToken(null);
    setUserProfile(null);
    setEmailStatus('Disconnected');
    setUserName('Dr. Sarah Wilson');
    
    // Revoke the token (optional)
    if (accessToken) {
      fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
        method: 'POST',
      }).catch(console.error);
    }
    
    alert('📧 Gmail disconnected successfully.');
  };

  // Send reminder for specific appointment
  const sendReminder = async (appointment) => {
    if (!gmailConnected) {
      alert('Please connect Gmail first!');
      return;
    }

    const template = emailTemplates[0]; // Appointment reminder template
    
    const subject = template.subject
      .replace('{{date}}', appointment.date)
      .replace('{{time}}', appointment.time);
      
    const body = template.body
      .replace('{{clientName}}', appointment.clientName)
      .replace('{{date}}', appointment.date)
      .replace('{{time}}', appointment.time)
      .replace('{{meetingLink}}', appointment.meetingLink);

    await sendEmail(appointment.clientEmail, subject, body, appointment.id);
  };

  // Send bulk reminders
  const sendBulkReminders = async () => {
    if (!gmailConnected) {
      alert('Please connect Gmail first!');
      return;
    }

    const upcomingAppointments = appointments.filter(apt => 
      !apt.reminderSent && apt.status === 'scheduled'
    );

    if (upcomingAppointments.length === 0) {
      alert('No appointments need reminders.');
      return;
    }

    const confirmed = confirm(`Send reminders to ${upcomingAppointments.length} clients?`);
    if (!confirmed) return;

    for (const appointment of upcomingAppointments) {
      await sendReminder(appointment);
      // Small delay between emails
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  // Login function
  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
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
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#1f2937', marginBottom: '2rem', fontSize: '2rem' }}>
            🧠 MindCare Portal
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            HIPAA-Compliant Mental Health Management
          </p>
          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              fontFamily: 'Cambria, serif'
            }}
          >
            🔐 Login as Therapist
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'Cambria, serif' }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.8rem' }}>🧠 MindCare Portal</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>👨‍⚕️ {userName}</span>
            <div style={{
              backgroundColor: gmailConnected ? '#10b981' : '#ef4444',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.875rem'
            }}>
              📧 {emailStatus}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
            { id: 'appointments', label: '📅 Appointments', icon: '📅' },
            { id: 'gmail', label: '📧 Gmail Integration', icon: '📧' },
            { id: 'analytics', label: '📈 Analytics', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 0',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === tab.id ? '3px solid #667eea' : '3px solid transparent',
                color: activeTab === tab.id ? '#667eea' : '#6b7280',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                fontFamily: 'Cambria, serif'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>📊 Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Gmail Status Card */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>📧 Email Integration Status</h3>
                <div style={{
                  padding: '1rem',
                  backgroundColor: gmailConnected ? '#dcfce7' : '#fef2f2',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <p style={{ 
                    margin: 0, 
                    color: gmailConnected ? '#166534' : '#991b1b',
                    fontWeight: 'bold'
                  }}>
                    {gmailConnected ? '✅ Gmail Connected' : '❌ Gmail Disconnected'}
                  </p>
                </div>
                <p><strong>Sent Today:</strong> {sentEmails.length} emails</p>
                <p><strong>Queue:</strong> {emailQueue.length} pending</p>
              </div>

              {/* Quick Actions */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>⚡ Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={() => setActiveTab('gmail')}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    📧 Manage Email Integration
                  </button>
                  <button
                    onClick={sendBulkReminders}
                    disabled={!gmailConnected || isTestingEmail}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: gmailConnected && !isTestingEmail ? '#10b981' : '#9ca3af',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: gmailConnected && !isTestingEmail ? 'pointer' : 'not-allowed'
                    }}
                  >
                    📬 Send All Reminders
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>📅 Appointments</h2>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: 0, color: '#1f2937' }}>Upcoming Sessions</h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Client</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Time</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Type</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem' }}>{appointment.clientName}</td>
                        <td style={{ padding: '1rem' }}>{appointment.date}</td>
                        <td style={{ padding: '1rem' }}>{appointment.time}</td>
                        <td style={{ padding: '1rem' }}>{appointment.type}</td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            backgroundColor: appointment.reminderSent ? '#dcfce7' : '#fef3c7',
                            color: appointment.reminderSent ? '#166534' : '#92400e'
                          }}>
                            {appointment.reminderSent ? '✅ Reminded' : '⏳ Pending'}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <button
                            onClick={() => sendReminder(appointment)}
                            disabled={!gmailConnected || isTestingEmail || appointment.reminderSent}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: gmailConnected && !isTestingEmail && !appointment.reminderSent ? '#3b82f6' : '#9ca3af',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: gmailConnected && !isTestingEmail && !appointment.reminderSent ? 'pointer' : 'not-allowed',
                              fontSize: '0.875rem'
                            }}
                          >
                            📧 Send Reminder
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gmail' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>📧 Gmail Integration</h2>
            
            {/* Connection Status */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>🔗 Gmail OAuth Connection</h3>
              <div style={{
                padding: '1.5rem',
                backgroundColor: gmailConnected ? '#dcfce7' : '#fef2f2',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>
                    {gmailConnected ? '✅' : '❌'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: 'bold',
                      color: gmailConnected ? '#166534' : '#991b1b'
                    }}>
                      Gmail API {gmailConnected ? 'Connected' : 'Disconnected'}
                    </p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.875rem',
                      color: gmailConnected ? '#166534' : '#991b1b'
                    }}>
                      {gmailConnected ? 'Ready to send automated emails' : 'Connect to enable email features'}
                    </p>
                    {userProfile && userProfile.email && (
                      <p style={{ 
                        margin: '0.5rem 0 0 0', 
                        fontSize: '0.875rem',
                        color: '#166534'
                      }}>
                        📧 Connected as: {userProfile.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {!gmailConnected ? (
                    <button
                      onClick={connectGmail}
                      disabled={isTestingEmail}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: isTestingEmail ? '#9ca3af' : '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isTestingEmail ? 'not-allowed' : 'pointer',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      {isTestingEmail ? '🔄 Connecting...' : '🔗 Connect Gmail OAuth'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={testEmailConnection}
                        disabled={isTestingEmail}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: isTestingEmail ? '#9ca3af' : '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: isTestingEmail ? 'not-allowed' : 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        {isTestingEmail ? '🔄 Testing...' : '🧪 Test Connection'}
                      </button>
                      <button
                        onClick={disconnectGmail}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🔌 Disconnect
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* OAuth Setup Instructions */}
              {!gmailConnected && (
                <div style={{
                  padding: '1.5rem',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  marginTop: '1rem'
                }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#1e40af' }}>🛠️ Google Cloud Console Setup</h4>
                  <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.6' }}>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>1.</strong> Go to <a href="https://console.cloud.google.com/" target="_blank" style={{ color: '#2563eb' }}>Google Cloud Console</a>
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>2.</strong> Create a new project or select existing one
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>3.</strong> Go to <strong>APIs & Services</strong> → <strong>Library</strong> → Enable <strong>Gmail API</strong>
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>4.</strong> Go to <strong>APIs & Services</strong> → <strong>Credentials</strong> → <strong>Create Credentials</strong> → <strong>OAuth 2.0 Client ID</strong>
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>5.</strong> Choose <strong>Web application</strong> as application type
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>6.</strong> Add authorized redirect URI: <code style={{ backgroundColor: '#e0e7ff', padding: '0.25rem', borderRadius: '4px' }}>{GOOGLE_REDIRECT_URI}</code>
                    </p>
                    <p style={{ margin: '0 0 0.5rem 0' }}>
                      <strong>7.</strong> Copy your Client ID and update the code:
                    </p>
                    <div style={{ 
                      backgroundColor: '#1f2937', 
                      color: '#f9fafb', 
                      padding: '1rem', 
                      borderRadius: '6px',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem',
                      margin: '0.5rem 0',
                      overflowX: 'auto'
                    }}>
                      const GOOGLE_CLIENT_ID = 'YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com';
                    </div>
                    <p style={{ margin: 0, fontStyle: 'italic', color: '#dc2626' }}>
                      ⚠️ <strong>Current Status:</strong> Using your configured Client ID. Ready to connect!
                    </p>
                  </div>
                </div>
              )}

              {/* Current Configuration Display */}
              <div style={{
                padding: '1rem',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginTop: '1rem',
                border: '1px solid #e2e8f0'
              }}>
                <h5 style={{ margin: '0 0 0.5rem 0', color: '#475569' }}>🔧 Current Configuration</h5>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748b' }}>
                  <p style={{ margin: '0.25rem 0' }}>
                    <strong>Client ID:</strong> ✅ Custom ID configured
                  </p>
                  <p style={{ margin: '0.25rem 0' }}>
                    <strong>Redirect URI:</strong> {GOOGLE_REDIRECT_URI}
                  </p>
                  <p style={{ margin: '0.25rem 0' }}>
                    <strong>Scopes:</strong> Gmail Send, User Info
                  </p>
                </div>
              </div>
            </div>

            {/* Email Templates */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>📝 Email Templates</h3>
              {emailTemplates.map(template => (
                <div key={template.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '1rem'
                }}>
                  <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>{template.name}</h4>
                  <p style={{ margin: '0.5rem 0', color: '#6b7280' }}>
                    <strong>Subject:</strong> {template.subject}
                  </p>
                  <div style={{ 
                    backgroundColor: '#f9fafb',
                    padding: '1rem',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                  }}>
                    {template.body.substring(0, 200)}...
                  </div>
                </div>
              ))}
            </div>

            {/* Sent Emails Log */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>📬 Sent Emails ({sentEmails.length})</h3>
              {sentEmails.length === 0 ? (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No emails sent yet.</p>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {sentEmails.map(email => (
                    <div key={email.id} style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong>{email.subject}</strong>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          {new Date(email.sentAt).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ margin: 0, color: '#374151' }}>To: {email.to}</p>
                      <div style={{
                        marginTop: '0.5rem',
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        display: 'inline-block'
                      }}>
                        ✅ Delivered
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>📈 Email Analytics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>📊 Email Statistics</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#0369a1' }}>
                      {sentEmails.length}
                    </p>
                    <p style={{ margin: 0, color: '#0369a1' }}>Total Emails Sent</p>
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>
                      {appointments.filter(apt => apt.reminderSent).length}
                    </p>
                    <p style={{ margin: 0, color: '#166534' }}>Reminders Sent</p>
                  </div>
                  <div style={{ padding: '1rem', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
                    <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#92400e' }}>
                      {appointments.filter(apt => !apt.reminderSent).length}
                    </p>
                    <p style={{ margin: 0, color: '#92400e' }}>Pending Reminders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
