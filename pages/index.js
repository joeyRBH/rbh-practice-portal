import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedProgressClient, setSelectedProgressClient] = useState(null);

  // Enhanced appointment data with calendar integration
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed',
      duration: '50 minutes',
      location: 'Video Call',
      notes: 'Regular therapy session - CBT techniques',
      calendarEventId: 'cal_001',
      videoLink: 'https://meet.rbhpractice.com/session-001',
      reminderSent: true
    },
    {
      id: 2,
      date: '2024-03-18',
      time: '10:30 AM',
      type: 'Follow-up Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed',
      duration: '50 minutes',
      location: 'Office - Room 2',
      notes: 'Review progress on anxiety management',
      calendarEventId: 'cal_002',
      reminderSent: false
    },
    {
      id: 3,
      date: '2024-03-20',
      time: '3:00 PM',
      type: 'Initial Consultation',
      client: 'John Smith',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'pending',
      duration: '60 minutes',
      location: 'Office - Room 1',
      notes: 'New client intake session',
      calendarEventId: null,
      reminderSent: false
    }
  ]);

  // Progress tracking data
  const [progressData, setProgressData] = useState({
    'Sarah Johnson': {
      sessions: 12,
      startDate: '2023-08-15',
      goals: [
        { id: 1, goal: 'Reduce anxiety symptoms', progress: 75, status: 'In Progress' },
        { id: 2, goal: 'Improve sleep quality', progress: 90, status: 'Nearly Complete' },
        { id: 3, goal: 'Develop coping strategies', progress: 60, status: 'In Progress' }
      ],
      assessments: [
        { date: '2023-08-15', type: 'GAD-7', score: 15, severity: 'Severe' },
        { date: '2023-10-15', type: 'GAD-7', score: 10, severity: 'Moderate' },
        { date: '2024-01-15', type: 'GAD-7', score: 6, severity: 'Mild' },
        { date: '2024-03-01', type: 'GAD-7', score: 4, severity: 'Minimal' }
      ],
      homework: [
        { id: 1, task: 'Daily mindfulness practice', completed: true, dueDate: '2024-03-10' },
        { id: 2, task: 'Anxiety journal entries', completed: true, dueDate: '2024-03-12' },
        { id: 3, task: 'Progressive muscle relaxation', completed: false, dueDate: '2024-03-20' }
      ]
    },
    'Mike Wilson': {
      sessions: 8,
      startDate: '2023-12-02',
      goals: [
        { id: 1, goal: 'Improve mood stability', progress: 50, status: 'In Progress' },
        { id: 2, goal: 'Increase daily activities', progress: 70, status: 'In Progress' },
        { id: 3, goal: 'Better sleep routine', progress: 80, status: 'Nearly Complete' }
      ],
      assessments: [
        { date: '2023-12-02', type: 'PHQ-9', score: 18, severity: 'Moderately Severe' },
        { date: '2024-01-15', type: 'PHQ-9', score: 12, severity: 'Moderate' },
        { date: '2024-02-15', type: 'PHQ-9', score: 8, severity: 'Mild' }
      ],
      homework: [
        { id: 1, task: 'Daily activity scheduling', completed: true, dueDate: '2024-03-08' },
        { id: 2, task: 'Mood tracking', completed: false, dueDate: '2024-03-15' }
      ]
    }
  });

  // Enhanced client data
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      dateJoined: '2023-08-15',
      lastSession: '2024-03-10',
      nextSession: '2024-03-15',
      balance: 0,
      status: 'Active',
      diagnosis: 'Anxiety Disorder',
      notes: 'Client has been making excellent progress with anxiety management techniques.',
      emergencyContact: 'John Johnson - (555) 123-4568',
      preferredReminder: 'email',
      calendarSynced: true
    },
    {
      id: 2,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '(555) 234-5678',
      dateJoined: '2023-12-02',
      lastSession: '2024-03-08',
      nextSession: '2024-03-22',
      balance: 150,
      status: 'Active',
      diagnosis: 'Depression',
      notes: 'Making steady progress. Homework assignments being completed.',
      emergencyContact: 'Lisa Wilson - (555) 234-5679',
      preferredReminder: 'sms',
      calendarSynced: false
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 456-7890',
      dateJoined: '2024-03-01',
      lastSession: null,
      nextSession: '2024-03-20',
      balance: 0,
      status: 'Active',
      diagnosis: 'Initial Assessment',
      notes: 'New client - initial consultation scheduled.',
      emergencyContact: 'Jane Smith - (555) 456-7891',
      preferredReminder: 'email',
      calendarSynced: false
    }
  ]);

  const handleLogin = (type) => {
    setUserType(type);
    setUserName(type === 'client' ? 'Sarah Johnson' : 'Dr. Rebecca B. Headley');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
    setSelectedClient(null);
    setShowScheduleModal(false);
    setShowRescheduleModal(false);
    setShowProgressModal(false);
    setShowVideoModal(false);
  };

  const getUserAppointments = () => {
    if (userType === 'client') {
      return appointments.filter(apt => apt.client === userName);
    } else {
      return appointments;
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment? Calendar event will also be removed.')) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
      // Simulate calendar integration
      alert('Appointment cancelled and removed from Google Calendar!');
    }
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleScheduleNew = () => {
    setShowScheduleModal(true);
  };

  const handleVideoCall = (appointment) => {
    setSelectedAppointment(appointment);
    setShowVideoModal(true);
  };

  const scheduleAppointment = (formData) => {
    const newAppointment = {
      id: appointments.length + 1,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      client: formData.client,
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed',
      duration: formData.duration,
      location: formData.location,
      notes: formData.notes,
      calendarEventId: `cal_${Date.now()}`,
      videoLink: formData.location === 'Video Call' ? `https://meet.rbhpractice.com/session-${Date.now()}` : null,
      reminderSent: false
    };
    setAppointments([...appointments, newAppointment]);
    setShowScheduleModal(false);
    // Simulate calendar integration
    alert('Appointment scheduled and added to Google Calendar with automatic reminders!');
  };

  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, date: newDate, time: newTime }
        : apt
    ));
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    // Simulate calendar integration
    alert('Appointment rescheduled and Google Calendar updated!');
  };

  const syncWithGoogleCalendar = (clientId) => {
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, calendarSynced: true }
        : client
    ));
    alert('Calendar sync enabled! Future appointments will automatically sync with Google Calendar.');
  };

  const sendReminder = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, reminderSent: true }
        : apt
    ));
    alert('Reminder sent successfully!');
  };

  const viewProgress = (clientName) => {
    setSelectedProgressClient(clientName);
    setShowProgressModal(true);
  };

  // Modal Components
  const VideoCallModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Join Video Session</h2>
        
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: '500' }}>Session Details:</p>
          <p style={{ margin: '0 0 5px 0' }}><strong>Client:</strong> {selectedAppointment?.client}</p>
          <p style={{ margin: '0 0 5px 0' }}><strong>Date:</strong> {selectedAppointment?.date}</p>
          <p style={{ margin: '0 0 5px 0' }}><strong>Time:</strong> {selectedAppointment?.time}</p>
          <p style={{ margin: '0' }}><strong>Duration:</strong> {selectedAppointment?.duration}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ marginBottom: '10px', color: '#6b7280' }}>Video Call Link:</p>
          <div style={{ 
            padding: '10px', 
            backgroundColor: '#f9fafb', 
            border: '1px solid #e5e7eb', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            {selectedAppointment?.videoLink}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setShowVideoModal(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              window.open(selectedAppointment?.videoLink, '_blank');
              setShowVideoModal(false);
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Join Video Call
          </button>
        </div>
      </div>
    </div>
  );

  const ProgressModal = () => {
    const clientProgress = progressData[selectedProgressClient];
    if (!clientProgress) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => {
                setShowRescheduleModal(false);
                setSelectedAppointment(null);
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAppointmentCard = (appointment) => (
    <div key={appointment.id} style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 5px 0'
          }}>
            {appointment.type}
          </h3>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            {userType === 'client' ? `with ${appointment.therapist}` : `with ${appointment.client}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: appointment.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
            color: appointment.status === 'confirmed' ? '#166534' : '#92400e'
          }}>
            {appointment.status}
          </span>
          {appointment.calendarEventId && (
            <span style={{
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              backgroundColor: '#dbeafe',
              color: '#1e40af'
            }}>
              📅 Synced
            </span>
          )}
          {appointment.reminderSent && (
            <span style={{
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              backgroundColor: '#dcfce7',
              color: '#166534'
            }}>
              ✉️ Reminded
            </span>
          )}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '15px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Date</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {new Date(appointment.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Time</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {appointment.time}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Duration</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {appointment.duration}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Location</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {appointment.location}
          </p>
        </div>
      </div>

      {appointment.notes && (
        <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '4px' }}>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Notes</p>
          <p style={{ fontSize: '14px', color: '#374151', margin: '0' }}>{appointment.notes}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {userType === 'client' && (
          <>
            {appointment.location === 'Video Call' && (
              <button 
                onClick={() => handleVideoCall(appointment)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Join Video Call
              </button>
            )}
            <button 
              onClick={() => handleReschedule(appointment)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Reschedule
            </button>
            <button 
              onClick={() => handleCancelAppointment(appointment.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#dc2626',
                border: '1px solid #dc2626',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </>
        )}
        {userType === 'therapist' && (
          <>
            {appointment.location === 'Video Call' && (
              <button 
                onClick={() => handleVideoCall(appointment)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Start Video Session
              </button>
            )}
            <button 
              onClick={() => handleReschedule(appointment)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Reschedule
            </button>
            {!appointment.reminderSent && (
              <button 
                onClick={() => sendReminder(appointment.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Send Reminder
              </button>
            )}
            <button 
              onClick={() => viewProgress(appointment.client)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#0ea5e9',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              View Progress
            </button>
            <button 
              onClick={() => handleCancelAppointment(appointment.id)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: '#dc2626',
                border: '1px solid #dc2626',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderClientCard = (client) => (
    <div 
      key={client.id} 
      onClick={() => setSelectedClient(client)}
      style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '15px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
        <div>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 5px 0'
          }}>
            {client.name}
          </h3>
          <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
            {client.email}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: client.status === 'Active' ? '#dcfce7' : '#fee2e2',
            color: client.status === 'Active' ? '#166534' : '#dc2626'
          }}>
            {client.status}
          </span>
          {client.calendarSynced && (
            <span style={{
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              backgroundColor: '#dbeafe',
              color: '#1e40af'
            }}>
              📅 Calendar Synced
            </span>
          )}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Last Session</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {client.lastSession ? new Date(client.lastSession).toLocaleDateString() : 'None'}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Next Session</p>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', margin: '0' }}>
            {client.nextSession ? new Date(client.nextSession).toLocaleDateString() : 'Not scheduled'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ 
          fontSize: '14px', 
          color: '#6b7280', 
          margin: '0'
        }}>
          Balance: <span style={{ fontWeight: '500', color: client.balance > 0 ? '#dc2626' : '#059669' }}>
            ${client.balance}
          </span>
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!client.calendarSynced && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                syncWithGoogleCalendar(client.id);
              }}
              style={{
                padding: '4px 8px',
                backgroundColor: '#0ea5e9',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '10px',
                cursor: 'pointer'
              }}
            >
              Sync Calendar
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              viewProgress(client.name);
            }}
            style={{
              padding: '4px 8px',
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            View Progress
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedClient(client);
            }}
            style={{
              padding: '4px 8px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  // Login Page
  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '400px'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>RBH Practice Portal</h1>
          
          <button
            onClick={() => handleLogin('client')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginBottom: '12px',
              cursor: 'pointer'
            }}
          >
            Login as Client
          </button>

          <button
            onClick={() => handleLogin('therapist')}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Login as Therapist
          </button>
        </div>
      </div>
    );
  }

  // Get tabs based on user type
  const tabs = userType === 'therapist' ? [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' },
    { id: 'clients', label: '👥 Clients' }
  ] : [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' }
  ];

  // Dashboard with tabs
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Modals */}
      {showScheduleModal && <ScheduleModal />}
      {showRescheduleModal && <RescheduleModal />}
      {showProgressModal && <ProgressModal />}
      {showVideoModal && <VideoCallModal />}

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Welcome, {userName}</h1>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer' 
          }}
        >
          Sign Out
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedClient(null);
            }}
            style={{ 
              padding: '10px 20px', 
              marginRight: '10px',
              backgroundColor: activeTab === tab.id ? '#4f46e5' : '#f3f4f6',
              color: activeTab === tab.id ? 'white' : '#374151',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2>Dashboard</h2>
            <p>Welcome to your {userType} portal!</p>
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
              <p style={{ margin: '0', color: '#0369a1' }}>
                ✅ <strong>Advanced Features Now Available:</strong>
                <br />• Google Calendar Integration
                <br />• Progress Tracking & Assessments
                <br />• Video Call Integration
                <br />• Automated Reminders
              </p>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: '0' }}>
                {userType === 'client' ? 'My Appointments' : 'Client Appointments'}
              </h2>
              
              <button
                onClick={handleScheduleNew}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                + Schedule New
              </button>
            </div>

            <div>
              {getUserAppointments().length > 0 ? (
                getUserAppointments().map(renderAppointmentCard)
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#6b7280'
                }}>
                  <p style={{ fontSize: '18px', marginBottom: '10px' }}>📅</p>
                  <p>No appointments scheduled</p>
                  <button
                    onClick={handleScheduleNew}
                    style={{
                      marginTop: '15px',
                      padding: '10px 20px',
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Schedule Your First Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            {selectedClient ? (
              <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '25px' }}>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>
                      {selectedClient.name}
                    </h2>
                    <p style={{ color: '#6b7280', margin: '0' }}>Client Profile</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => setSelectedClient(null)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Back to List
                    </button>
                    <button
                      onClick={() => viewProgress(selectedClient.name)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      View Progress
                    </button>
                    <button
                      onClick={() => setShowScheduleModal(true)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Schedule Appointment
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                  {/* Contact Information */}
                  <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>
                      Contact Information
                    </h3>
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Email</p>
                      <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{selectedClient.email}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Phone</p>
                      <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{selectedClient.phone}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Emergency Contact</p>
                      <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{selectedClient.emergencyContact}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Reminder Preference</p>
                      <p style={{ fontSize: '14px', color: '#1f2937', margin: '0', textTransform: 'capitalize' }}>
                        {selectedClient.preferredReminder}
                      </p>
                    </div>
                  </div>

                  {/* Treatment Information */}
                  <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>
                      Treatment Information
                    </h3>
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Primary Diagnosis</p>
                      <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{selectedClient.diagnosis}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Date Joined</p>
                      <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>
                        {new Date(selectedClient.dateJoined).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Status</p>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: selectedClient.status === 'Active' ? '#dcfce7' : '#fee2e2',
                        color: selectedClient.status === 'Active' ? '#166534' : '#dc2626'
                      }}>
                        {selectedClient.status}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Calendar Integration</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '8px',
                          fontSize: '10px',
                          backgroundColor: selectedClient.calendarSynced ? '#dcfce7' : '#fee2e2',
                          color: selectedClient.calendarSynced ? '#166534' : '#dc2626'
                        }}>
                          {selectedClient.calendarSynced ? '✅ Synced' : '❌ Not Synced'}
                        </span>
                        {!selectedClient.calendarSynced && (
                          <button
                            onClick={() => syncWithGoogleCalendar(selectedClient.id)}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#0ea5e9',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '10px',
                              cursor: 'pointer'
                            }}
                          >
                            Enable
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>
                    Clinical Notes
                  </h3>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '0' }}>
                    {selectedClient.notes}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                  <h2 style={{ margin: '0' }}>Client Management</h2>
                  <button style={{
                    padding: '10px 20px',
                    backgroundColor: '#4f46e5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                    + Add New Client
                  </button>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="text"
                    placeholder="Search clients..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  {clients.map(renderClientCard)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ margin: '0' }}>Progress Tracking - {selectedProgressClient}</h2>
            <button
              onClick={() => setShowProgressModal(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>

          {/* Treatment Goals */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ marginBottom: '15px' }}>Treatment Goals</h3>
            {clientProgress.goals.map(goal => (
              <div key={goal.id} style={{ 
                marginBottom: '15px', 
                padding: '15px', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px' 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>{goal.goal}</span>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '12px', 
                    fontSize: '12px',
                    backgroundColor: goal.progress >= 80 ? '#dcfce7' : goal.progress >= 50 ? '#fef3c7' : '#fee2e2',
                    color: goal.progress >= 80 ? '#166534' : goal.progress >= 50 ? '#92400e' : '#dc2626'
                  }}>
                    {goal.status}
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${goal.progress}%`, 
                    height: '100%', 
                    backgroundColor: goal.progress >= 80 ? '#059669' : goal.progress >= 50 ? '#d97706' : '#dc2626',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                  {goal.progress}% Complete
                </div>
              </div>
            ))}
          </div>

          {/* Assessment Scores */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{ marginBottom: '15px' }}>Assessment Progress</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              {clientProgress.assessments.map((assessment, index) => (
                <div key={index} style={{ 
                  padding: '15px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '5px' }}>
                    {new Date(assessment.date).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>
                    {assessment.score}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    {assessment.type} - {assessment.severity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Homework Assignments */}
          <div>
            <h3 style={{ marginBottom: '15px' }}>Homework & Tasks</h3>
            {clientProgress.homework.map(task => (
              <div key={task.id} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px', 
                border: '1px solid #e5e7eb', 
                borderRadius: '6px',
                marginBottom: '8px'
              }}>
                <div>
                  <span style={{ 
                    fontWeight: '500',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#6b7280' : '#1f2937'
                  }}>
                    {task.task}
                  </span>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <span style={{ 
                  padding: '4px 12px', 
                  borderRadius: '12px', 
                  fontSize: '12px',
                  backgroundColor: task.completed ? '#dcfce7' : '#fee2e2',
                  color: task.completed ? '#166534' : '#dc2626'
                }}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ScheduleModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Schedule New Appointment</h2>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          scheduleAppointment({
            client: userType === 'therapist' ? formData.get('client') : userName,
            date: formData.get('date'),
            time: formData.get('time'),
            type: formData.get('type'),
            duration: formData.get('duration'),
            location: formData.get('location'),
            notes: formData.get('notes')
          });
        }}>
          {userType === 'therapist' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Client</label>
              <select name="client" required style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}>
                <option value="">Select a client</option>
                {clients.map(client => (
                  <option key={client.id} value={client.name}>{client.name}</option>
                ))}
              </select>
            </div>
          )}
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Date</label>
              <input type="date" name="date" required style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Time</label>
              <select name="time" required style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}>
                <option value="">Select time</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Session Type</label>
              <select name="type" required style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}>
                <option value="">Select type</option>
                <option value="Initial Consultation">Initial Consultation</option>
                <option value="Therapy Session">Therapy Session</option>
                <option value="Follow-up Session">Follow-up Session</option>
                <option value="Assessment">Assessment</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Duration</label>
              <select name="duration" required style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px'
              }}>
                <option value="">Select duration</option>
                <option value="30 minutes">30 minutes</option>
                <option value="50 minutes">50 minutes</option>
                <option value="60 minutes">60 minutes</option>
                <option value="90 minutes">90 minutes</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Location</label>
            <select name="location" required style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px'
            }}>
              <option value="">Select location</option>
              <option value="Video Call">Video Call (Auto-generates secure link)</option>
              <option value="Office - Room 1">Office - Room 1</option>
              <option value="Office - Room 2">Office - Room 2</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#0369a1' }}>
              ✅ This appointment will be automatically added to Google Calendar with reminders
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Notes (Optional)</label>
            <textarea name="notes" rows={3} style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              resize: 'vertical'
            }} placeholder="Add any special notes for this appointment..." />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowScheduleModal(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const RescheduleModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Reschedule Appointment</h2>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          rescheduleAppointment(
            selectedAppointment.id,
            formData.get('date'),
            formData.get('time')
          );
        }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>New Date</label>
            <input type="date" name="date" required style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px'
            }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>New Time</label>
            <select name="time" required style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #d1d5db',
              borderRadius: '4px'
            }}>
              <option value="">Select time</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:00 AM">11:00 AM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="4:00 PM">4:00 PM</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#0369a1' }}>
              ✅ Google Calendar will be automatically updated
            </p>
          </div>

          <div style={{ display:
