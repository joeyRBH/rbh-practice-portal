import React, { useState } from 'react';

export default function MindCareEHRPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [gmailConnected, setGmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [showClientDetails, setShowClientDetails] = useState(null);
  const [showAddClient, setShowAddClient] = useState(false);
  
  // Enhanced client data with more details
  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '555-0123',
      dateOfBirth: '1985-06-15',
      address: '123 Main St, Denver, CO 80202',
      emergencyContact: 'John Johnson - 555-0124',
      primaryDiagnosis: 'F32.1 - Major Depressive Disorder, Moderate',
      secondaryDiagnosis: 'F41.1 - Generalized Anxiety Disorder',
      treatmentPlan: 'CBT, 12 sessions',
      currentLevel: 'Level 1 - Outpatient',
      riskLevel: 'Low',
      balance: 150,
      lastSession: '2025-09-05',
      nextAppointment: '2025-09-12 10:00 AM',
      intakeCompleted: true,
      consentSigned: true,
      hipaaAcknowledged: true,
      sessionCount: 8,
      totalSessions: 12,
      goals: ['Reduce anxiety symptoms', 'Improve sleep quality', 'Develop coping strategies'],
      medications: ['Sertraline 50mg daily', 'Trazodone 25mg as needed'],
      allergies: 'None known',
      insurance: 'Blue Cross Blue Shield',
      notes: 'Responds well to CBT techniques. Homework completion excellent.'
    },
    {
      id: 2,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '555-0124',
      dateOfBirth: '1990-03-22',
      address: '456 Oak Ave, Boulder, CO 80301',
      emergencyContact: 'Lisa Chen - 555-0125',
      primaryDiagnosis: 'F41.1 - Generalized Anxiety Disorder',
      secondaryDiagnosis: '',
      treatmentPlan: 'CBT, 8 sessions',
      currentLevel: 'Level 1 - Outpatient',
      riskLevel: 'Low',
      balance: 0,
      lastSession: '2025-09-08',
      nextAppointment: '2025-09-15 2:00 PM',
      intakeCompleted: true,
      consentSigned: true,
      hipaaAcknowledged: true,
      sessionCount: 5,
      totalSessions: 8,
      goals: ['Manage work stress', 'Improve confidence', 'Sleep better'],
      medications: ['Buspirone 10mg twice daily'],
      allergies: 'Penicillin',
      insurance: 'Kaiser Permanente',
      notes: 'Young professional dealing with workplace anxiety. Making good progress.'
    },
    {
      id: 3,
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.davis@email.com',
      phone: '555-0125',
      dateOfBirth: '1988-11-10',
      address: '789 Pine St, Colorado Springs, CO 80903',
      emergencyContact: 'Mark Davis - 555-0126',
      primaryDiagnosis: 'F43.1 - PTSD',
      secondaryDiagnosis: 'F33.1 - Major Depressive Disorder, Recurrent',
      treatmentPlan: 'EMDR, 16 sessions',
      currentLevel: 'Level 2 - Intensive Outpatient',
      riskLevel: 'Moderate',
      balance: 300,
      lastSession: '2025-09-10',
      nextAppointment: '2025-09-13 11:00 AM',
      intakeCompleted: false,
      consentSigned: false,
      hipaaAcknowledged: false,
      sessionCount: 2,
      totalSessions: 16,
      goals: ['Process trauma', 'Reduce nightmares', 'Return to work'],
      medications: ['Prazosin 2mg at bedtime', 'Fluoxetine 40mg daily'],
      allergies: 'Sulfa drugs',
      insurance: 'Aetna',
      notes: 'Recent trauma survivor. Needs careful monitoring and support.'
    }
  ]);

  // New client form data
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    insurance: '',
    allergies: '',
    primaryDiagnosis: ''
  });

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

  // Google integration functions
  const connectGmail = () => {
    setGmailConnected(true);
    alert('Gmail connected successfully! (Demo mode)');
  };

  const connectGoogleCalendar = () => {
    setCalendarConnected(true);
    alert('Google Calendar connected! (Demo mode)');
  };

  // Client management functions
  const handleAddClient = () => {
    if (!newClient.firstName || !newClient.lastName || !newClient.email) {
      alert('Please fill in required fields: First Name, Last Name, and Email');
      return;
    }

    const client = {
      id: clients.length + 1,
      ...newClient,
      intakeCompleted: false,
      consentSigned: false,
      hipaaAcknowledged: false,
      sessionCount: 0,
      totalSessions: 0,
      balance: 0,
      riskLevel: 'Unknown',
      currentLevel: 'Level 1 - Outpatient',
      goals: [],
      medications: [],
      notes: 'New client - intake pending'
    };

    setClients([...clients, client]);
    setNewClient({
      firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
      address: '', emergencyContact: '', insurance: '', allergies: '', primaryDiagnosis: ''
    });
    setShowAddClient(false);
    alert('Client added successfully!');
  };

  const updateClientStatus = (clientId, field, value) => {
    setClients(clients.map(client => 
      client.id === clientId ? { ...client, [field]: value } : client
    ));
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

  // Navigation based on user type
  const navItems = userType === 'client' ? [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'messages', label: 'Messages', icon: '💬' }
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'clients', label: 'Client Management', icon: '👥' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'email', label: 'Secure Email', icon: '📧' },
    { id: 'integrations', label: 'Integrations', icon: '⚙️' }
  ];

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
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>
                    {clients.filter(c => c.intakeCompleted).length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#166534' }}>Intake Complete</div>
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
        );

      case 'clients':
        if (showClientDetails) {
          const client = clients.find(c => c.id === showClientDetails);
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
                  Client Details: {client.firstName} {client.lastName}
                </h2>
                <button
                  onClick={() => setShowClientDetails(null)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  ← Back to Clients
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Basic Information */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📋 Basic Information</h3>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Phone:</strong> {client.phone}</p>
                    <p><strong>DOB:</strong> {client.dateOfBirth}</p>
                    <p><strong>Address:</strong> {client.address}</p>
                    <p><strong>Emergency Contact:</strong> {client.emergencyContact}</p>
                    <p><strong>Insurance:</strong> {client.insurance}</p>
                    <p><strong>Allergies:</strong> {client.allergies}</p>
                  </div>
                </div>

                {/* Clinical Information */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>🩺 Clinical Information</h3>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    <p><strong>Primary Diagnosis:</strong> {client.primaryDiagnosis}</p>
                    {client.secondaryDiagnosis && (
                      <p><strong>Secondary Diagnosis:</strong> {client.secondaryDiagnosis}</p>
                    )}
                    <p><strong>Treatment Plan:</strong> {client.treatmentPlan}</p>
                    <p><strong>Current Level:</strong> {client.currentLevel}</p>
                    <p><strong>Risk Level:</strong> 
                      <span style={{ 
                        color: client.riskLevel === 'Low' ? '#059669' : 
                              client.riskLevel === 'Moderate' ? '#d97706' : '#dc2626',
                        fontWeight: 'bold' 
                      }}>
                        {client.riskLevel}
                      </span>
                    </p>
                    <p><strong>Sessions:</strong> {client.sessionCount} of {client.totalSessions}</p>
                  </div>
                </div>

                {/* Treatment Goals */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>🎯 Treatment Goals</h3>
                  {client.goals.length > 0 ? (
                    <ul style={{ paddingLeft: '1rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      {client.goals.map((goal, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>{goal}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>No treatment goals set</p>
                  )}
                </div>

                {/* Medications */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>💊 Current Medications</h3>
                  {client.medications.length > 0 ? (
                    <ul style={{ paddingLeft: '1rem', fontSize: '0.875rem', lineHeight: '1.6' }}>
                      {client.medications.map((med, index) => (
                        <li key={index} style={{ marginBottom: '0.5rem' }}>{med}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>No medications recorded</p>
                  )}
                </div>

                {/* Status Checkboxes */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>✅ Status Updates</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={client.intakeCompleted}
                        onChange={(e) => updateClientStatus(client.id, 'intakeCompleted', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span>Intake Completed</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={client.consentSigned}
                        onChange={(e) => updateClientStatus(client.id, 'consentSigned', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span>Consent Forms Signed</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={client.hipaaAcknowledged}
                        onChange={(e) => updateClientStatus(client.id, 'hipaaAcknowledged', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span>HIPAA Acknowledged</span>
                    </label>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  gridColumn: 'span 2'
                }}>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📝 Clinical Notes</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#374151' }}>
                    {client.notes}
                  </p>
                  <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                    <button style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}>
                      📝 Add Session Note
                    </button>
                    <button style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}>
                      📅 Schedule Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (showAddClient) {
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
                  Add New Client
                </h2>
                <button
                  onClick={() => setShowAddClient(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                maxWidth: '800px'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={newClient.firstName}
                      onChange={(e) => setNewClient({...newClient, firstName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={newClient.lastName}
                      onChange={(e) => setNewClient({...newClient, lastName: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={newClient.dateOfBirth}
                      onChange={(e) => setNewClient({...newClient, dateOfBirth: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Insurance
                    </label>
                    <select
                      value={newClient.insurance}
                      onChange={(e) => setNewClient({...newClient, insurance: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="">Select Insurance</option>
                      <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
                      <option value="Kaiser Permanente">Kaiser Permanente</option>
                      <option value="Aetna">Aetna</option>
                      <option value="Cigna">Cigna</option>
                      <option value="UnitedHealth">UnitedHealth</option>
                      <option value="Self-Pay">Self-Pay</option>
                    </select>
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Address
                    </label>
                    <input
                      type="text"
                      value={newClient.address}
                      onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      placeholder="Name - Phone Number"
                      value={newClient.emergencyContact}
                      onChange={(e) => setNewClient({...newClient, emergencyContact: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Primary Diagnosis
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., F32.1 - Major Depressive Disorder, Moderate"
                      value={newClient.primaryDiagnosis}
                      onChange={(e) => setNewClient({...newClient, primaryDiagnosis: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Allergies
                    </label>
                    <input
                      type="text"
                      placeholder="None known"
                      value={newClient.allergies}
                      onChange={(e) => setNewClient({...newClient, allergies: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={handleAddClient}
                    style={{
                      padding: '1rem 2rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    Add Client
                  </button>
                  <button
                    onClick={() => setShowAddClient(false)}
                    style={{
                      padding: '1rem 2rem',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
                👥 Client Management
              </h2>
              <button
                onClick={() => setShowAddClient(true)}
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
                + Add New Client
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>
                      {client.firstName} {client.lastName}
                    </h3>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: client.riskLevel === 'Low' ? '#dcfce7' : 
                                      client.riskLevel === 'Moderate' ? '#fef3c7' : '#fecaca',
                      color: client.riskLevel === 'Low' ? '#166534' : 
                             client.riskLevel === 'Moderate' ? '#92400e' : '#dc2626'
                    }}>
                      {client.riskLevel} Risk
                    </span>
                  </div>

                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                    <p style={{ margin: '0.25rem 0' }}>📧 {client.email}</p>
                    <p style={{ margin: '0.25rem 0' }}>📞 {client.phone}</p>
                    <p style={{ margin: '0.25rem 0' }}>🏥 {client.primaryDiagnosis}</p>
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
                    marginBottom: '1rem', 
                    padding: '0.75rem', 
                    backgroundColor: '#f8fafc', 
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    color: '#374151'
                  }}>
                    📅 Last: {client.lastSession} • Next: {client.nextAppointment}<br/>
                    📊 Sessions: {client.sessionCount} of {client.totalSessions} • Balance: ${client.balance}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setShowClientDetails(client.id)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      📄 View Details
                    </button>
                    <button
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      📝 Add Note
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Select a tab to continue</div>;
    }
  };

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
  );
}
