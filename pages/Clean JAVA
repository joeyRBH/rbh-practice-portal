import React, { useState, useEffect } from 'react';
import { Calendar, FileText, MessageCircle, User, LogOut, Plus, DollarSign, Users, Home, Check, X, Mail, Clock, Phone, Settings, Download, Upload, Eye, Lock } from 'lucide-react';

const MindCareEHRPortal = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [gmailConnected, setGmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [emails, setEmails] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [intakeDocuments, setIntakeDocuments] = useState([]);
  
  // Sample client data with more comprehensive info
  const [clients, setClients] = useState([
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
  ]);

  // Comprehensive intake forms based on provided documents
  const intakeFormTemplates = [
    {
      id: 'individual-intake',
      name: 'Individual Intake Questionnaire',
      category: 'Assessment',
      description: 'Comprehensive intake assessment for new clients',
      required: true,
      sections: [
        'Contact Information',
        'Presenting Problem',
        'Treatment Goals',
        'Safety Assessment',
        'Family History',
        'Sleep & Rest',
        'Diet & Eating',
        'Exercise & Activities',
        'Support System',
        'Medical History',
        'Medications',
        'Substance Use'
      ]
    },
    {
      id: 'consent-psychotherapy',
      name: 'Informed Consent for Psychotherapy',
      category: 'Legal',
      description: 'Informed consent for therapeutic services',
      required: true
    },
    {
      id: 'privacy-practices',
      name: 'Notice of Privacy Practices',
      category: 'HIPAA',
      description: 'HIPAA privacy notice acknowledgment',
      required: true
    },
    {
      id: 'practice-policies',
      name: 'Practice Policies',
      category: 'Administrative',
      description: 'Office policies and procedures',
      required: true
    },
    {
      id: 'ai-consent',
      name: 'AI Tools Consent Form',
      category: 'Technology',
      description: 'Consent for use of AI tools in therapy services',
      required: false
    },
    {
      id: 'disclosure-authorization',
      name: 'Authorization for Disclosure',
      category: 'Legal',
      description: 'Authorization to release information',
      required: false
    },
    {
      id: 'audit-alcohol',
      name: 'AUDIT - Alcohol Screening',
      category: 'Screening',
      description: 'Alcohol Use Disorders Identification Test',
      required: false
    },
    {
      id: 'dast-10',
      name: 'DAST-10 - Drug Screening',
      category: 'Screening',
      description: 'Drug Abuse Screening Test',
      required: false
    },
    {
      id: 'ace-questionnaire',
      name: 'ACE Questionnaire',
      category: 'Screening',
      description: 'Adverse Childhood Experiences assessment',
      required: false
    },
    {
      id: 'asrs-adhd',
      name: 'ASRS ADHD Scale',
      category: 'Screening',
      description: 'Adult ADHD Self-Report Scale',
      required: false
    },
    {
      id: 'biopsychosocial',
      name: 'Biopsychosocial Assessment',
      category: 'Assessment',
      description: 'Comprehensive biopsychosocial evaluation',
      required: false
    },
    {
      id: 'testimonial-release',
      name: 'Testimonial Release Form',
      category: 'Marketing',
      description: 'Client testimonial authorization',
      required: false
    }
  ];

  // Sample emails from Gmail integration
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
  const connectGmail = async () => {
    if (window.confirm('Connect Gmail for secure client communication?\n\nThis will enable:\n• Secure client messaging\n• Appointment reminders\n• HIPAA-compliant email management\n\nNote: Requires Google Workspace Business with BAA')) {
      // Simulate OAuth2 flow
      setGmailConnected(true);
      setEmails(sampleEmails);
      alert('✅ Gmail connected successfully!\n\nRemember to:\n1. Set up Google Workspace Business\n2. Sign Business Associate Agreement\n3. Configure secure email filters');
    }
  };

  const connectGoogleCalendar = async () => {
    if (window.confirm('Connect Google Calendar for appointment scheduling?\n\nThis will enable:\n• Automated scheduling\n• Client booking links\n• Reminder notifications\n• HIPAA-compliant calendar management')) {
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
      ]);
      alert('✅ Google Calendar connected!\n\nFeatures now available:\n• Automated appointment scheduling\n• Client self-booking\n• Email reminders\n• Google Meet integration');
    }
  };

  const sendEmail = async (to, subject, body) => {
    // Simulate sending email via Gmail API
    if (!gmailConnected) {
      alert('Please connect Gmail first');
      return;
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
    };
    
    alert('✅ Secure email sent successfully!\n\nEmail features:\n• End-to-end encryption\n• HIPAA compliance logging\n• Automatic archiving');
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

  // Intake Documentation Functions
  const generateIntakePacket = (clientId) => {
    const requiredForms = intakeFormTemplates.filter(form => form.required);
    alert(`📋 Intake packet generated for client!\n\nRequired forms (${requiredForms.length}):\n${requiredForms.map(f => '• ' + f.name).join('\n')}\n\nOptional assessments available in client portal.`);
  };

  const sendIntakeInvitation = async (clientEmail) => {
    if (gmailConnected) {
      await sendEmail(
        clientEmail,
        'Complete Your Intake Forms - MindCare Portal',
        `Dear Client,\n\nPlease complete your intake forms before your first appointment:\n\n🔗 Secure Portal: https://portal.mindcare.com/intake\n\nRequired forms:\n• Individual Intake Questionnaire\n• Informed Consent\n• Privacy Practices Acknowledgment\n\nThis secure portal is HIPAA-compliant.\n\nBest regards,\nMindCare Portal Team`
      );
    }
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
    );
  }

  // Navigation based on user type
  const navItems = userType === 'client' ? [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'intake', label: 'Intake Forms', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'billing', label: 'Billing', icon: DollarSign }
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'clients', label: 'Client Management', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'email', label: 'Secure Email', icon: Mail },
    { id: 'intake-admin', label: 'Intake Management', icon: FileText },
    { id: 'clinical-notes', label: 'Clinical Notes', icon: FileText },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'integrations', label: 'Integrations', icon: Settings }
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
                      <Check size={16} />
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
                      <Check size={16} />
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

      case 'email':
        return (
          <div style={{ space: '2rem' }}>
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
                <Mail size={48} style={{ color: '#64748b', marginBottom: '1rem' }} />
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
        );

      case 'calendar':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
                📅 Calendar Management
              </h2>
              {calendarConnected && (
                <button
                  onClick={() => alert('Create new appointment')}
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
                  ➕ New Appointment
                </button>
              )}
            </div>

            {!calendarConnected ? (
              <div style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                textAlign: 'center'
              }}>
                <Calendar size={48} style={{ color: '#64748b', marginBottom: '1rem' }} />
                <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Connect Google Calendar</h3>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                  Enable automated scheduling, client booking, and appointment management
                </p>
                <button onClick={connectGoogleCalendar} style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  🔗 Connect Google Calendar
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '2rem' }}>
                {appointments.map(appointment => (
                  <div key={appointment.id} style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div>
                        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.25rem' }}>
                          {appointment.clientName}
                        </h3>
                        <p style={{ margin: '0.5rem 0', color: '#64748b' }}>
                          {appointment.service}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#374151' }}>
                          <span>📅 {appointment.date}</span>
                          <span>🕐 {appointment.time}</span>
                        </div>
                      </div>
                      <span style={{
                        backgroundColor: appointment.status === 'Confirmed' ? '#dcfce7' : '#fef3c7',
                        color: appointment.status === 'Confirmed' ? '#166534' : '#92400e',
                        padding: '0.5rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                      }}>
                        {appointment.status}
                      </span>
                    </div>
                    
                    {appointment.meetingLink && (
                      <div style={{ 
                        backgroundColor: '#f0f9ff', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        marginTop: '1rem'
                      }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: '#1e40af' }}>
                          🎥 Google Meet Link
                        </p>
                        <a 
                          href={appointment.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.875rem' }}
                        >
                          {appointment.meetingLink}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'intake-admin':
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              📋 Intake Management System
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
              {/* Intake Forms Library */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: '0 0 1.5rem 0', color: '#1e293b' }}>📚 Form Templates</h3>
                
                {/* Categories */}
                {['Assessment', 'Legal', 'HIPAA', 'Screening', 'Administrative'].map(category => {
                  const categoryForms = intakeFormTemplates.filter(form => form.category === category);
                  return (
                    <div key={category} style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ 
                        margin: '0 0 0.75rem 0', 
                        color: '#374151', 
                        fontSize: '1rem',
                        fontWeight: '600',
                        borderBottom: '1px solid #e5e7eb',
                        paddingBottom: '0.5rem'
                      }}>
                        {category} ({categoryForms.length})
                      </h4>
                      {categoryForms.map(form => (
                        <div key={form.id} style={{
                          padding: '0.75rem',
                          backgroundColor: '#f8fafc',
                          borderRadius: '8px',
                          marginBottom: '0.5rem',
                          cursor: 'pointer',
                          border: '1px solid #e2e8f0'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>
                                {form.name}
                                {form.required && (
                                  <span style={{ color: '#dc2626', marginLeft: '0.25rem' }}>*</span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                                {form.description}
                              </div>
                            </div>
                            <Eye size={16} style={{ color: '#64748b' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Client Intake Status */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>👥 Client Intake Status</h3>
                  <button
                    onClick={() => generateIntakePacket(1)}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    📦 Generate Packet
                  </button>
                </div>

                {clients.map(client => (
                  <div key={client.id} style={{
                    padding: '1.5rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: '#1e293b' }}>
                        {client.firstName} {client.lastName}
                      </h4>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => sendIntakeInvitation(client.email)}
                          style={{
                            padding: '0.25rem 0.75rem',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                        >
                          📧 Send Invitation
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
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
                      📅 Last Session: {client.lastSession} • 
                      📅 Next: {client.nextAppointment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'intake':
        // Client view of intake forms
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              📋 Complete Your Intake Forms
            </h2>

            <div style={{
              backgroundColor: '#dbeafe',
              border: '1px solid #93c5fd',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>Welcome to MindCare Portal</h3>
              <p style={{ margin: 0, color: '#1e40af', fontSize: '0.875rem' }}>
                Please complete the required forms below before your first appointment. All information is encrypted and HIPAA-compliant.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {intakeFormTemplates.filter(form => form.required).map(form => (
                <div key={form.id} style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                        {form.name}
                        <span style={{ color: '#dc2626', marginLeft: '0.25rem' }}>*</span>
                      </h4>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
                        {form.description}
                      </p>
                    </div>
                    <button
                      onClick={() => alert(`Opening ${form.name} form...`)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Complete Form
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '1rem' }}>Optional Assessments</h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {intakeFormTemplates.filter(form => !form.required).slice(0, 4).map(form => (
                  <div key={form.id} style={{
                    backgroundColor: 'white',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    opacity: 0.8
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h5 style={{ margin: '0 0 0.25rem 0', color: '#374151', fontSize: '0.875rem' }}>
                          {form.name}
                        </h5>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>
                          {form.description}
                        </p>
                      </div>
                      <button
                        onClick={() => alert(`Opening ${form.name} assessment...`)}
                        style={{
                          padding: '0.375rem 0.75rem',
                          backgroundColor: '#f8fafc',
                          color: '#374151',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}
                      >
                        Optional
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: 'bold' }}>
              🔗 Google Workspace Integration
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {/* Gmail Integration */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>📧 Gmail Integration</h3>
                  {gmailConnected ? (
                    <div style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={20} />
                      <span>Connected</span>
                    </div>
                  ) : (
                    <button onClick={connectGmail} style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      Connect Gmail
                    </button>
                  )}
                </div>
                
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
                  Secure, HIPAA-compliant client communication
                </div>
                
                <ul style={{ fontSize: '0.875rem', color: '#374151', paddingLeft: '1rem' }}>
                  <li>End-to-end encrypted messaging</li>
                  <li>Automated appointment reminders</li>
                  <li>Secure file attachments</li>
                  <li>HIPAA audit logging</li>
                  <li>Client portal integration</li>
                </ul>

                {gmailConnected && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                      ✅ Gmail API Connected<br />
                      📧 {emails.length} messages synced<br />
                      🔒 BAA status: Active
                    </div>
                  </div>
                )}
              </div>

              {/* Google Calendar Integration */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, color: '#1e293b' }}>📅 Google Calendar</h3>
                  {calendarConnected ? (
                    <div style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={20} />
                      <span>Connected</span>
                    </div>
                  ) : (
                    <button onClick={connectGoogleCalendar} style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      Connect Calendar
                    </button>
                  )}
                </div>
                
                <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
                  Automated scheduling and appointment management
                </div>
                
                <ul style={{ fontSize: '0.875rem', color: '#374151', paddingLeft: '1rem' }}>
                  <li>Client self-scheduling links</li>
                  <li>Google Meet telehealth integration</li>
                  <li>Automated reminders (24h/1h)</li>
                  <li>Waiting list management</li>
                  <li>Recurring appointment setup</li>
                </ul>

                {calendarConnected && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '1px solid #bbf7d0'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>
                      ✅ Calendar API Connected<br />
                      📅 {appointments.length} appointments synced<br />
                      🎥 Google Meet enabled
                    </div>
                  </div>
                )}
              </div>

              {/* HIPAA Compliance Status */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🔒 HIPAA Compliance</h3>
                
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#166534' }}>Google Workspace BAA</span>
                    <Check size={16} style={{ color: '#166534' }} />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#166534' }}>End-to-end Encryption</span>
                    <Check size={16} style={{ color: '#166534' }} />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#166534' }}>Audit Logging Active</span>
                    <Check size={16} style={{ color: '#166534' }} />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#166534' }}>Data at Rest Encrypted</span>
                    <Check size={16} style={{ color: '#166534' }} />
                  </div>
                </div>
              </div>

              {/* Setup Instructions */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>📋 Setup Checklist</h3>
                
                <div style={{ fontSize: '0.875rem', color: '#374151' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong>1. Google Workspace Business</strong><br />
                    Upgrade to Business plan for HIPAA compliance
                  </div>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong>2. Business Associate Agreement</strong><br />
                    Sign BAA with Google for healthcare data
                  </div>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong>3. API Configuration</strong><br />
                    Set up OAuth2 credentials and API keys
                  </div>
                  
                  <div style={{ marginBottom: '0.75rem' }}>
                    <strong>4. Security Settings</strong><br />
                    Enable 2FA and advanced security features
                  </div>
                  
                  <div>
                    <strong>5. Staff Training</strong><br />
                    Train team on HIPAA-compliant email/calendar use
                  </div>
                </div>
              </div>
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
                {userType === 'therapist' ? '👨‍⚕️' : '🧑‍💼'} {currentUser.name}
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
          {navItems.map(tab => {
            const Icon = tab.icon;
            return (
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
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default MindCareEHRPortal;
