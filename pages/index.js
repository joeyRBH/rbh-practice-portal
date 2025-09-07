import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Sample appointment data with more details
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
      notes: 'Regular therapy session - CBT techniques'
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
      notes: 'Review progress on anxiety management'
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
      notes: 'New client intake session'
    },
    {
      id: 4,
      date: '2024-03-22',
      time: '1:30 PM',
      type: 'Therapy Session',
      client: 'Mike Wilson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed',
      duration: '50 minutes',
      location: 'Video Call',
      notes: 'Depression management - session 6'
    }
  ]);

  // Sample client data
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
      emergencyContact: 'John Johnson - (555) 123-4568'
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
      emergencyContact: 'Lisa Wilson - (555) 234-5679'
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
      emergencyContact: 'Jane Smith - (555) 456-7891'
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
  };

  // Get appointments for current user
  const getUserAppointments = () => {
    if (userType === 'client') {
      return appointments.filter(apt => apt.client === userName);
    } else {
      return appointments;
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
      alert('Appointment cancelled successfully!');
    }
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  const handleScheduleNew = () => {
    setShowScheduleModal(true);
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
      notes: formData.notes
    };
    setAppointments([...appointments, newAppointment]);
    setShowScheduleModal(false);
    alert('Appointment scheduled successfully!');
  };

  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, date: newDate, time: newTime }
        : apt
    ));
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    alert('Appointment rescheduled successfully!');
  };

  // Modal Components
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
              <option value="Video Call">Video Call</option>
              <option value="Office - Room 1">Office - Room 1</option>
              <option value="Office - Room 2">Office - Room 2</option>
            </select>
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

          <div style={{ marginBottom: '20px' }}>
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
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
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
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Start Session
            </button>
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
            <button style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              View Notes
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedClient(client);
          }}
          style={{
            padding: '6px 12px',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          View Details
        </button>
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
                ✅ Enhanced Appointments are now available! You can now schedule, reschedule, and cancel appointments.
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
                      onClick={() => {
                        setShowScheduleModal(true);
                      }}
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
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Emergency Contact</p>
                      <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{selectedClient.emergencyContact}</p>
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
                    <div>
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
}
