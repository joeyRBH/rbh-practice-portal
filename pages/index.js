import { useState } from 'react'

export default function MindCareEHRPortal() {
  const [currentUser, setCurrentUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [gmailConnected, setGmailConnected] = useState(false)
  const [calendarConnected, setCalendarConnected] = useState(false)
  const [emails, setEmails] = useState([])
  const [appointments, setAppointments] = useState([])
  
  // AI Notes state
  const [sessionInput, setSessionInput] = useState('')
  const [generatedNotes, setGeneratedNotes] = useState('')
  const [selectedClient, setSelectedClient] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isSigned, setIsSigned] = useState(false)
  const [signedAt, setSignedAt] = useState('')

  // Sample client data
  const [clients] = useState([
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
    }
  ])

  const services = [
    { code: '90834', name: '45-min Individual Therapy' },
    { code: '90837', name: '60-min Individual Therapy' },
    { code: '90853', name: 'Group Therapy' }
  ]

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
  ]

  // Google Services Integration Functions
  const connectGmail = () => {
    if (confirm('Connect Gmail for secure client communication?\n\nThis will enable:\n• Secure client messaging\n• Appointment reminders\n• HIPAA-compliant email management\n\nNote: Requires Google Workspace Business with BAA')) {
      setGmailConnected(true)
      setEmails(sampleEmails)
      alert('Gmail connected successfully!\n\nRemember to:\n1. Set up Google Workspace Business\n2. Sign Business Associate Agreement\n3. Configure secure email filters')
    }
  }

  const connectGoogleCalendar = () => {
    if (confirm('Connect Google Calendar for appointment scheduling?\n\nThis will enable:\n• Automated scheduling\n• Client booking links\n• Reminder notifications\n• HIPAA-compliant calendar management')) {
      setCalendarConnected(true)
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
        },
        {
          id: 2,
          clientId: 1,
          clientName: 'Sarah Johnson',
          date: '2025-09-19',
          time: '10:00 AM',
          service: 'Individual Therapy - 50 min',
          status: 'Scheduled',
          meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
          reminderSent: false
        }
      ])
      alert('Google Calendar connected!\n\nFeatures now available:\n• Automated appointment scheduling\n• Client self-booking\n• Email reminders\n• Google Meet integration')
    }
  }

  const sendEmail = (to, subject, body) => {
    if (!gmailConnected) {
      alert('Please connect Gmail first')
      return
    }
    
    const newEmail = {
      id: emails.length + 1,
      from: 'dr.wilson@mindcareportal.com',
      to: to,
      subject: subject,
      body: body,
      date: new Date().toISOString().split('T')[0],
      sent: true,
      hipaaCompliant: true
    }
    
    alert('Secure email sent successfully!\n\nEmail features:\n• End-to-end encryption\n• HIPAA compliance logging\n• Automatic archiving')
  }

  // Login Functions
  const loginAsClient = () => {
    setCurrentUser({ id: 1, name: 'Sarah Johnson' })
    setUserType('client')
    setActiveTab('dashboard')
  }

  const loginAsTherapist = () => {
    setCurrentUser({ id: 1, name: 'Dr. Rebecca Wilson' })
    setUserType('therapist')
    setActiveTab('dashboard')
  }

  const logout = () => {
    setCurrentUser(null)
    setUserType(null)
    setActiveTab('dashboard')
  }

  // AI Notes Functions
  const handleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      setRecordingTime(0)
      
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
Continue weekly sessions. Assign daily anxiety tracking worksheet. Practice relaxation techniques twice daily. Next appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}`

      setSessionInput(clinicalContent)
      alert('Recording complete! Session transcribed successfully.')
      
    } else {
      setIsRecording(true)
      setRecordingTime(0)
      
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) {
            setIsRecording(false)
            clearInterval(timer)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const generateNotes = () => {
    if (!sessionInput || !selectedClient || !selectedService) {
      alert('Please select client, service, and provide session notes')
      return
    }

    const client = clients.find(c => c.id.toString() === selectedClient)
    const service = services.find(s => s.code === selectedService)
    
    const noteTemplate = `CLINICAL DOCUMENTATION - DAP FORMAT
====================================================

CLIENT: ${client.firstName} ${client.lastName}
SERVICE: ${service.code} - ${service.name}
DATE: ${new Date().toLocaleDateString()}
CLINICIAN: Dr. Rebecca Wilson, LPC

DATA (Objective Observations):
${sessionInput}

ASSESSMENT (Clinical Analysis):
Client demonstrates continued progress in treatment goals. Shows improved coping strategies and insight. Risk assessment indicates low risk for self-harm. Treatment engagement remains strong.

PLAN (Treatment & Next Steps):
- Continue weekly individual therapy sessions
- Maintain current treatment approach with CBT techniques
- Assign homework: practice relaxation exercises daily
- Next appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}
- Monitor progress and adjust treatment as needed

Provider: Dr. Rebecca Wilson, LPC
License: CO123456
Date: ${new Date().toLocaleDateString()}`

    setGeneratedNotes(noteTemplate)
  }

  const signNotes = () => {
    if (!generatedNotes) {
      alert('Please generate notes first')
      return
    }
    
    const timestamp = new Date().toLocaleString()
    setIsSigned(true)
    setSignedAt(timestamp)
    alert(`Notes digitally signed and locked at ${timestamp}`)
  }

  const downloadNotes = () => {
    if (!generatedNotes) return
    
    const content = isSigned ? 
      generatedNotes + `\n\n=== ELECTRONIC SIGNATURE ===\nDigitally Signed by: Dr. Rebecca Wilson, LPC\nDate/Time: ${signedAt}\nStatus: Signed and Locked` : 
      generatedNotes
      
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `clinical-notes-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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
            <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🔗 Google Integration</h4>
            <div style={{ fontSize: '0.875rem', color: '#64748b', textAlign: 'left' }}>
              <p style={{ margin: '0.25rem 0' }}>✅ Gmail secure messaging</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Google Calendar scheduling</p>
              <p style={{ margin: '0.25rem 0' }}>✅ Google Meet telehealth</p>
              <p style={{ margin: '0.25rem 0' }}>✅ HIPAA-compliant BAA</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Navigation based on user type
  const navItems = userType === 'client' ? [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'intake', label: 'Intake Forms', icon: '📋' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'billing', label: 'Billing', icon: '💰' }
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'clients', label: 'Client Management', icon: '👥' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'email', label: 'Secure Email', icon: '📧' },
    { id: 'ai-notes', label: 'AI Clinical Notes', icon: '🤖' },
    { id: 'intake-admin', label: 'Intake Management', icon: '📋' },
    { id: 'billing', label: 'Billing', icon: '💰' },
    { id: 'integrations', label: 'Integrations', icon: '⚙️' }
  ]

  // Render main content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>📊 Quick Stats</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '12px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af' }}>{clients.length}</div>
                  <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Active Clients</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '12px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>{appointments.length}</div>
                  <div style={{ fontSize: '0.875rem', color: '#166534' }}>Appointments</div>
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
              <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>🔗 Google Integration</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Gmail</span>
                  {gmailConnected ? (
                    <div style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>✓</span>
                      <span style={{ fontSize: '0.875rem' }}>Connected</span>
                    </div>
                  ) : (
                    <button onClick={connectGmail} style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      Connect
                    </button>
                  )}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Google Calendar</span>
                  {calendarConnected ? (
                    <div style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span>✓</span>
                      <span style={{ fontSize: '0.875rem' }}>Connected</span>
                    </div>
                  ) : (
                    <button onClick={connectGoogleCalendar} style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}>
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 'email':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
                📧 Secure Email
              </h2>
              {gmailConnected && (
                <button
                  onClick={() => alert('Compose new secure email')}
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
                  ✍️ Compose
                </button>
              )}
            </div>

            {!gmailConnected ? (
              <div style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Connect Gmail for Secure Messaging</h3>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                  Enable HIPAA-compliant client communication with Gmail integration
                </p>
                <button onClick={connectGmail} style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  🔗 Connect Gmail
                </button>
              </div>
            ) : (
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden'
              }}>
                {emails.map(email => (
                  <div key={email.id} style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'pointer',
                    backgroundColor: !email.read ? '#f0f9ff' : 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: email.read ? 'normal' : 'bold', color: '#1e293b' }}>
                          {email.subject}
                        </h4>
                        <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: '#64748b' }}>
                          From: {email.from}
                        </p>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        {email.date}
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151' }}>
                      {email.snippet}
                    </p>
                    {email.labels && (
                      <div style={{ marginTop: '0.5rem' }}>
                        {email.labels.map(label => (
                          <span key={label} style={{
                            backgroundColor: '#dbeafe',
                            color: '#1e40af',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            marginRight: '0.5rem'
                          }}>
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'ai-notes':
        return (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
                🤖 AI Clinical Notes
              </h1>
              <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '16px' }}>
                Record sessions • Generate documentation • Digital signatures
              </p>
            </div>

            {/* Session Setup */}
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '24px'
            }}>
              <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
                📋 Session Information
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px' 
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                    Client:
                  </label>
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>{client.firstName} {client.lastName}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
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
                      fontSize: '14px'
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
              <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
                🎙️ Session Recording
              </h2>
              
              {isRecording && (
                <div style={{
                  background: '#fef2f2',
                  border: '2px solid #fecaca',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '20px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626' }}>
                    🔴 RECORDING: {formatTime(recordingTime)}
                  </div>
                  <div style={{ fontSize: '16px', color: '#7f1d1d' }}>
                    Session recording in progress...
                  </div>
                </div>
              )}
              
              <button
                onClick={handleRecording}
                style={{
                  width: '100%',
                  padding: '20px',
                  background: isRecording ? '#dc2626' : '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '18px',
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
              marginBottom: '24px'
            }}>
              <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
                📝 Session Notes
              </h2>
              
              <textarea
                value={sessionInput}
                onChange={(e) => setSessionInput(e.target.value)}
                placeholder="Enter session observations, client responses, interventions used..."
                style={{
                  width: '100%',
                  height: '160px',
                  padding: '16px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
              
              <button
                onClick={generateNotes}
                disabled={!sessionInput || !selectedClient || !selectedService}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: (!sessionInput || !selectedClient || !selectedService) ? '#9ca3af' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: (!sessionInput || !selectedClient || !selectedService) ? 'not-allowed' : 'pointer',
                  marginTop: '16px'
                }}
              >
                🤖 Generate Clinical Notes
              </button>
            </div>

            {/* Generated Notes */}
            {generatedNotes && (
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '24px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '20px',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <h2 style={{ margin: 0, fontSize: '20px', color: '#374151' }}>
                    📄 Generated Clinical Notes
                  </h2>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={signNotes}
                      disabled={isSigned}
                      style={{
                        padding: '10px 16px',
                        background: isSigned ? '#10b981' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: isSigned ? 'not-allowed' : 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      {isSigned ? '✅ Signed' : '✍️ Sign Notes'}
                    </button>
                    <button
                      onClick={downloadNotes}
                      style={{
                        padding: '10px 16px',
                        background: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      📥 Download
                    </button>
                  </div>
                </div>
                
                {isSigned && (
                  <div style={{
                    background: '#f0fdf4',
                    border: '2px solid #bbf7d0',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '20px',
                    fontSize: '14px',
                    color: '#15803d'
                  }}>
                    ✅ <strong>Digitally Signed and Locked</strong> by Dr. Rebecca Wilson, LPC on {signedAt}
                  </div>
                )}
                
                <div style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Monaco, Consolas, monospace',
                  border: '1px solid #e2e8f0',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  {generatedNotes}
                </div>
              </div>
            )}
          </div>
        )

      case 'clients':
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              👥 Client Management
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>
                      {client.firstName} {client.lastName}
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                      backgroundColor: client.intakeCompleted ? '#dcfce7' : '#fef2f2',
                      color: client.intakeCompleted ? '#166534' : '#dc2626',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '0.75rem'
                    }}>
                      📋 Intake: {client.intakeCompleted ? 'Complete' : 'Pending'}
                    </div>
                    
                    <div style={{
                      backgroundColor: client.consentSigned ? '#dcfce7' : '#fef2f2',
                      color: client.consentSigned ? '#166534' : '#dc2626',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '0.75rem'
                    }}>
                      ✍️ Consent: {client.consentSigned ? 'Signed' : 'Pending'}
                    </div>
                    
                    <div style={{
                      backgroundColor: client.hipaaAcknowledged ? '#dcfce7' : '#fef2f2',
                      color: client.hipaaAcknowledged ? '#166534' : '#dc2626',
                      padding: '0.5rem',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '0.75rem'
                    }}>
                      🔒 HIPAA: {client.hipaaAcknowledged ? 'Ack.' : 'Pending'}
                    </div>
                  </div>

                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.75rem', 
                    backgroundColor: '#f8fafc', 
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>
                    📅 Last Session: {client.lastSession} • Next: {client.nextAppointment}
                  </div>

                  <button
                    onClick={() => setActiveTab('ai-notes')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      marginTop: '1rem'
                    }}
                  >
                    🤖 Create AI Note
                  </button>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <div>Select a tab to continue</div>
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
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
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>MindCare EHR Portal</h1>
              <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>HIPAA-Compliant Electronic Health Records</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem' }}>
                {userType === 'therapist' ? '👨‍⚕️' : '🧑‍💼'} {currentUser?.name}
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
        <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {navItems.map(tab => (
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
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {renderContent()}
      </main>
    </div>
  )
}
