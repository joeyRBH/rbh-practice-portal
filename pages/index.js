import { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      googleEventId: null
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      progress: 75,
      totalSessions: 12
    }
  ]);

  // Simple Google Calendar integration using direct calendar links
  const connectGoogleCalendar = () => {
    setIsGoogleConnected(true);
    alert('Google Calendar integration enabled! New appointments will include calendar links.');
  };

  const disconnectGoogleCalendar = () => {
    setIsGoogleConnected(false);
    alert('Google Calendar integration disabled.');
  };

  const createCalendarLink = (appointment) => {
    const startDate = new Date(`${appointment.date} ${appointment.time}`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later
    
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const title = encodeURIComponent(`${appointment.type} - ${appointment.client}`);
    const details = encodeURIComponent(`Therapy appointment with ${appointment.client}`);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${details}`;
  };

  const handleLogin = (type, name) => {
    setUserType(type);
    setUserName(name);
    setIsLoggedIn(true);
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const handleScheduleAppointment = (formData) => {
    const newAppointment = {
      id: appointments.length + 1,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      client: formData.client,
      therapist: 'Dr. Rebecca B. Headley',
      googleEventId: isGoogleConnected ? 'calendar-link' : null
    };

    setAppointments([...appointments, newAppointment]);
    closeModal();
    
    if (isGoogleConnected) {
      const calendarLink = createCalendarLink(newAppointment);
      const openCalendar = window.confirm('Appointment scheduled! Would you like to add it to your Google Calendar now?');
      if (openCalendar) {
        window.open(calendarLink, '_blank');
      }
    } else {
      alert('Appointment scheduled successfully!');
    }
  };

  const handleAddClient = (formData) => {
    const newClient = {
      id: clients.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      progress: 0,
      totalSessions: 0
    };
    setClients([...clients, newClient]);
    closeModal();
    alert('Client added successfully!');
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
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#333',
            fontWeight: 'bold'
          }}>
            🏥 RBH Practice Portal
          </h1>
          
          <p style={{ 
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Secure access to your practice management system
          </p>

          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => handleLogin('therapist', 'Dr. Rebecca B. Headley')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                marginBottom: '1rem',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👩‍⚕️ Login as Therapist
            </button>
            
            <button
              onClick={() => handleLogin('client', 'Sarah Johnson')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👤 Login as Client
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Cambria, serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          🏥 RBH Practice Portal
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1rem' }}>Welcome, {userName}</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'Cambria, serif'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <div style={{
          width: '250px',
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '2rem 0'
        }}>
          <nav>
            {['dashboard', 'appointments', 'clients'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                  color: 'white',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'Cambria, serif',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'dashboard' && '📊'} 
                {tab === 'appointments' && '📅'} 
                {tab === 'clients' && '👥'} 
                {' '}{tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem' }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                Dashboard
              </h2>
              
              {/* Google Calendar Integration Card */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  📅 Google Calendar Integration
                </h3>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <p style={{ margin: 0, color: '#64748b' }}>
                      Status: {' '}
                      <span style={{ 
                        color: isGoogleConnected ? '#059669' : '#dc2626',
                        fontWeight: 'bold'
                      }}>
                        {isGoogleConnected ? '✅ Connected' : '❌ Not Connected'}
                      </span>
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                      {isGoogleConnected 
                        ? 'Calendar links will be generated for new appointments' 
                        : 'Enable to create Google Calendar links automatically'
                      }
                    </p>
                  </div>
                  
                  {!isGoogleConnected ? (
                    <button
                      onClick={connectGoogleCalendar}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#4285f4',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontFamily: 'Cambria, serif',
                        fontWeight: 'bold'
                      }}
                    >
                      🔗 Enable Calendar Links
                    </button>
                  ) : (
                    <button
                      onClick={disconnectGoogleCalendar}
                      style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontFamily: 'Cambria, serif',
                        fontWeight: 'bold'
                      }}
                    >
                      🔌 Disable
                    </button>
                  )}
                </div>

                {!isGoogleConnected && (
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f59e0b'
                  }}>
                    <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem' }}>
                      💡 <strong>Enable calendar links</strong> to automatically generate Google Calendar links for new appointments. No complex OAuth setup required!
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#4f46e5' }}>
                    {appointments.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Total Appointments</p>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#059669' }}>
                    {clients.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Active Clients</p>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: isGoogleConnected ? '#059669' : '#dc2626' }}>
                    {isGoogleConnected ? '✅' : '❌'}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Calendar Links</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  📅 Appointments
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => openModal('schedule')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Schedule New Appointment
                  </button>
                )}
              </div>

              <div style={{ 
                display: 'grid', 
                gap: '1rem'
              }}>
                {appointments.map((appointment) => (
                  <div key={appointment.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                        {appointment.type}
                      </h3>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        📅 {appointment.date} at {appointment.time}
                      </p>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        👤 {userType === 'therapist' ? appointment.client : appointment.therapist}
                      </p>
                      {appointment.googleEventId && (
                        <p style={{ margin: '0.25rem 0 0 0', color: '#059669', fontSize: '0.9rem' }}>
                          ✅ Calendar link available
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {appointment.googleEventId && (
                        <button
                          onClick={() => window.open(createCalendarLink(appointment), '_blank')}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#4285f4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontFamily: 'Cambria, serif'
                          }}
                        >
                          📅 Add to Calendar
                        </button>
                      )}
                      <button
                        onClick={() => openModal('reschedule')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📅 Reschedule
                      </button>
                      <button
                        onClick={() => window.open('https://meet.google.com/new', '_blank')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🎥 Join Video Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  👥 Clients
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => openModal('addClient')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Add New Client
                  </button>
                )}
              </div>

              <div style={{ 
                display: 'grid', 
                gap: '1rem'
              }}>
                {clients.map((client) => (
                  <div key={client.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                          {client.name}
                        </h3>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          📧 {client.email}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          📞 {client.phone}
                        </p>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
                          Sessions: {client.totalSessions}
                        </p>
                      </div>
                      {userType === 'therapist' && (
                        <button
                          onClick={() => openModal('editClient')}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#64748b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontFamily: 'Cambria, serif'
                          }}
                        >
                          ✏️ Edit Information
                        </button>
                      )}
                    </div>
                    
                    <div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ color: '#64748b' }}>Treatment Progress</span>
                        <span style={{ color: '#1e293b', fontWeight: 'bold' }}>
                          {client.progress}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${client.progress}%`,
                          height: '100%',
                          backgroundColor: '#4f46e5',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: 0, color: '#1e293b' }}>
                {modalType === 'schedule' && '📅 Schedule New Appointment'}
                {modalType === 'reschedule' && '📅 Reschedule Appointment'}
                {modalType === 'addClient' && '👤 Add New Client'}
                {modalType === 'editClient' && '✏️ Edit Client Information'}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            </div>

            {(modalType === 'schedule' || modalType === 'reschedule') && (
              <AppointmentForm 
                onSubmit={handleScheduleAppointment}
                clients={clients}
                isReschedule={modalType === 'reschedule'}
                existingAppointment={modalType === 'reschedule' ? appointments[0] : null}
              />
            )}

            {(modalType === 'addClient' || modalType === 'editClient') && (
              <ClientForm 
                onSubmit={handleAddClient}
                isEdit={modalType === 'editClient'}
                existingClient={modalType === 'editClient' ? clients[0] : null}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Appointment Form Component
function AppointmentForm({ onSubmit, clients, isReschedule, existingAppointment }) {
  const [formData, setFormData] = useState({
    date: existingAppointment?.date || '',
    time: existingAppointment?.time || '',
    type: existingAppointment?.type || 'Therapy Session',
    client: existingAppointment?.client || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.client) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Client *
        </label>
        <select
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        >
          <option value="">Select a client...</option>
          {clients.map((client) => (
            <option key={client.id} value={client.name}>
              {client.name}
            </option>
          ))}
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Session Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        >
          <option value="Initial Consultation">Initial Consultation</option>
          <option value="Therapy Session">Therapy Session</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Assessment">Assessment</option>
        </select>
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontFamily: 'Cambria, serif',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {isReschedule ? '📅 Reschedule Appointment' : '📅 Schedule Appointment'}
      </button>
    </form>
  );
}

// Client Form Component
function ClientForm({ onSubmit, isEdit, existingClient }) {
  const [formData, setFormData] = useState({
    name: existingClient?.name || '',
    email: existingClient?.email || '',
    phone: existingClient?.phone || '',
    dateOfBirth: existingClient?.dateOfBirth || '',
    insurance: existingClient?.insurance || '',
    notes: existingClient?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields (Name, Email, Phone).');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Date of Birth
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Insurance Provider
        </label>
        <input
          type="text"
          value={formData.insurance}
          onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
          placeholder="e.g., Blue Cross Blue Shield"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Clinical Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any relevant clinical information..."
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif',
            resize: 'vertical'
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#059669',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontFamily: 'Cambria, serif',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        {isEdit ? '✏️ Update Client' : '👤 Add Client'}
      </button>
    </form>
  );
}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Date *
        </label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Time *
        </label>
        <select
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        >
          <option value="">Select time...</option>
          <option value="9:00 AM">9:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="1:00 PM">1:00 PM</option>
          <option value="2:00 PM">2:00 PM</option>
          <option value="3:00 PM">3:00 PM</option>
          <option value="4:00 PM">4:00 PM</option>
          <option value="5:00 PM">5:00 PM</option>
        </select>
