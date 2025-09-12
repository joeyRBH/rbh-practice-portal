import React, { useState } from 'react';

export default function MindCareEHRPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [gmailConnected, setGmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [emails, setEmails] = useState([]);
  const [appointments, setAppointments] = useState([]);
  
  // AI Notes state
  const [sessionInput, setSessionInput] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const [signedAt, setSignedAt] = useState('');

  // Sample client data
  const clients = [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '555-0123',
      dateOfBirth: '1985-06-15',
      primaryDiagnosis: 'F32.1 - Major Depressive Disorder, Moderate',
      treatmentPlan: 'CBT, 12 sessions',
      currentLevel: 'Level 1 - Outpatient',
      riskLevel: 'Low',
      balance: 150,
      lastSession: '2025-09-05',
      nextAppointment: '2025-09-12 10:00 AM',
      intakeCompleted: true,
      consentSigned: true,
      hipaaAcknowledged: true
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '555-0124',
      dateOfBirth: '1990-03-22',
      primaryDiagnosis: 'F41.1 - Generalized Anxiety Disorder',
      treatmentPlan: 'CBT, 8 sessions',
      currentLevel: 'Level 1 - Outpatient',
      riskLevel: 'Low',
      balance: 0,
      lastSession: '2025-09-08',
      nextAppointment: '2025-09-15 2:00 PM',
      intakeCompleted: true,
      consentSigned: true,
      hipaaAcknowledged: true
    },
    {
      id: 3,
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.davis@email.com',
      phone: '555-0125',
      dateOfBirth: '1988-11-10',
      primaryDiagnosis: 'F43.1 - PTSD',
      treatmentPlan: 'EMDR, 16 sessions',
      currentLevel: 'Level 2 - Intensive Outpatient',
      riskLevel: 'Moderate',
      balance: 300,
      lastSession: '2025-09-10',
      nextAppointment: '2025-09-13 11:00 AM',
      intakeCompleted: false,
      consentSigned: false,
      hipaaAcknowledged: false
    }
  ];

  const services = [
    { code: '90834', name: '45-min Individual Therapy' },
    { code: '90837', name: '60-min Individual Therapy' },
    { code: '90853', name: 'Group Therapy' }
  ];

  // Sample emails
  const sampleEmails = [
    {
      id: 1,
      from: 'sarah.johnson@email.com',
      subject: 'Question about homework assignment',
      snippet: 'Hi Dr. Wilson, I had a question about the CBT worksheet you assigned...',
      date: '2025-09-11',
      read: false,
      labels: ['client-communication']
    },
    {
      id: 2,
      from: 'appointments@mindcareportal.com',
      subject: 'Appointment Reminder - Tomorrow 10:00 AM',
      snippet: 'This is a reminder for your upcoming appointment...',
      date: '2025-09-11',
      read: true,
      labels: ['automated']
    }
  ];

  // Google Services Integration Functions
  const connectGmail = () => {
    setGmailConnected(true);
    setEmails(sampleEmails);
  };

  const connectGoogleCalendar = () => {
    setCalendarConnected(true);
    setAppointments([
      {
        id: 1,
        clientId: 1,
        clientName: 'Sarah Johnson',
        date: '2025-09-12',
        time: '10:00 AM',
        service: 'Individual Therapy - 50 min',
        status: 'Confirmed',
        meetingLink: 'https://meet.google.com/abc-defg-hij',
        reminderSent: true
      }
    ]);
  };

  // Login Functions
  const loginAsClient = () => {
    setCurrentUser({ id: 1, name: 'Sarah Johnson' });
    setUserType('client');
    setActiveTab('dashboard');
  };

  const loginAsTherapist = () => {
    setCurrentUser({ id: 1, name: 'Dr. Rebecca Wilson' });
    setUserType('therapist');
    setActiveTab('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    setActiveTab('dashboard');
  };

  // Login Screen
  if (!currentUser) {
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
            MindCare EHR Portal
          </h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1.125rem' }}>
            HIPAA-Compliant Electronic Health Records
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={loginAsTherapist}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              👨‍⚕️ Clinician Portal
            </button>

            <button
              onClick={loginAsClient}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'white',
                color: '#1e3a8a',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              🧑‍💼 Client Portal
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🔗 Google Integration Available</h4>
            <div style={{ fontSize: '0.875rem', color: '#64748b', textAlign: 'left' }}>
              <p style={{ margin: '0.25rem 0' }}>✅ Gmail secure messaging</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Google Calendar scheduling</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Google Meet telehealth</p>
              <p style={{ margin: '0.25rem 0' }}>✅ HIPAA-compliant BAA ready</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
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
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>MindCare EHR Portal</h1>
              <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>HIPAA-Compliant Electronic Health Records</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem' }}>
                {userType === 'therapist' ? '👨‍⚕️' : '🧑‍💼'} {currentUser?.name || ''}
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

      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome to MindCare EHR Portal</h2>
        <p>Portal is working! Full features coming soon.</p>
        <div style={{ marginTop: '2rem' }}>
          <button onClick={connectGmail} style={{ margin: '0.5rem', padding: '1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px' }}>
            {gmailConnected ? '✓ Gmail Connected' : 'Connect Gmail'}
          </button>
          <button onClick={connectGoogleCalendar} style={{ margin: '0.5rem', padding: '1rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px' }}>
            {calendarConnected ? '✓ Calendar Connected' : 'Connect Calendar'}
          </button>
        </div>
      </main>
    </div>
  );
}
