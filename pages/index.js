import { useState, useEffect } from 'react';

export default function MindCarePortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Dr. Sarah Wilson');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [gmailConnected, setGmailConnected] = useState(false);
  const [emailStatus, setEmailStatus] = useState('Disconnected');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [sentEmails, setSentEmails] = useState([]);

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

  const connectGmail = () => {
    setIsTestingEmail(true);
    setEmailStatus('Connecting...');
    
    setTimeout(() => {
      setGmailConnected(true);
      setEmailStatus('Connected');
      setIsTestingEmail(false);
      alert('✅ Gmail connected successfully! (Demo Mode)\n\nYou can now send appointment reminders.');
    }, 2000);
  };

  const sendEmail = async (to, subject, body, appointmentId) => {
    if (!gmailConnected) {
      alert('Please connect Gmail first!');
      return;
    }

    setIsTestingEmail(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const emailRecord = {
        id: Date.now(),
        to,
        subject,
        body,
        sentAt: new Date().toISOString(),
        status: 'sent',
        appointmentId
      };
      
      setSentEmails(prev => [...prev, emailRecord]);
      
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId 
            ? { ...apt, reminderSent: true }
            : apt
        )
      );
      
      alert(`✅ Appointment reminder sent to ${to}! (Demo Mode)`);
      
    } catch (error) {
      alert(`❌ Failed to send email: ${error.message}`);
    } finally {
      setIsTestingEmail(false);
    }
  };

  const sendReminder = async (appointment) => {
    const subject = `Therapy Session Reminder - ${appointment.date} at ${appointment.time}`;
    const body = `Dear ${appointment.clientName},

This is a friendly reminder of your upcoming therapy session:

📅 Date: ${appointment.date}
🕐 Time: ${appointment.time}
👨‍⚕️ Therapist: Dr. Sarah Wilson
🔗 Join Link: ${appointment.meetingLink}

Please join the video call 5 minutes before your session starts.

Best regards,
MindCare Portal`;

    await sendEmail(appointment.clientEmail, subject, body, appointment.id);
  };

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
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const testConnection = () => {
    if (!gmailConnected) {
      alert('❌ Please connect Gmail first.');
      return;
    }
    alert('✅ Gmail connection test successful! (Demo Mode)');
  };

  const disconnectGmail = () => {
    setGmailConnected(false);
    setEmailStatus('Disconnected');
    alert('📧 Gmail disconnected successfully.');
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
            onClick={() => setIsLoggedIn(true)}
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

      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'appointments', label: '📅 Appointments' },
            { id: 'gmail', label: '📧 Gmail Integration' },
            { id: 'analytics', label: '📈 Analytics' }
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

      <main style={{ padding: '2rem' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1f2937' }}>📊 Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
                <p><strong>Status:</strong> {gmailConnected ? 'Ready to send' : 'Connect required'}</p>
              </div>

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
            
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Connection Status</h3>
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
                  <div>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: 'bold',
                      color: gmailConnected ? '#166534' : '#991b1b'
                    }}>
                      Gmail {gmailConnected ? 'Connected' : 'Disconnected'}
                    </p>
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.875rem',
                      color: gmailConnected ? '#166534' : '#991b1b'
                    }}>
                      {gmailConnected ? 'Ready to send appointment reminders' : 'Connect to enable email features'}
                    </p>
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
                      {isTestingEmail ? '🔄 Connecting...' : '🔗 Connect Gmail'}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={testConnection}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🧪 Test Connection
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

              <div style={{
                padding: '1rem',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>ℹ️ Demo Mode</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#1e40af' }}>
                  This is a demonstration version. Email sending is simulated for testing purposes.
                  In production, this would connect to the real Gmail API.
                </p>
              </div>
            </div>

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
                        ✅ Sent (Demo)
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
