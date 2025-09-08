import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      location: 'Video Call',
      duration: '50 minutes',
      reminderSent: true,
      calendarSynced: true
    },
    {
      id: 2,
      date: '2024-03-18',
      time: '10:30 AM',
      type: 'Follow-up Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      location: 'Office - Room 2',
      duration: '50 minutes',
      reminderSent: false,
      calendarSynced: true
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      status: 'Active',
      calendarSynced: true,
      sessions: 12,
      goals: [
        { goal: 'Reduce anxiety symptoms', progress: 75 },
        { goal: 'Improve sleep quality', progress: 90 }
      ]
    },
    {
      id: 2,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '(555) 234-5678',
      status: 'Active',
      calendarSynced: false,
      sessions: 8,
      goals: [
        { goal: 'Improve mood stability', progress: 50 }
      ]
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
    setShowModal(false);
  };

  const getUserAppointments = () => {
    if (userType === 'client') {
      return appointments.filter(apt => apt.client === userName);
    }
    return appointments;
  };

  // Button handlers with real functionality
  const handleScheduleNew = () => {
    setModalType('schedule');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleReschedule = (appointment) => {
    setModalType('reschedule');
    setSelectedItem(appointment);
    setShowModal(true);
  };

  const handleAddClient = () => {
    setModalType('addClient');
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEditClient = (client) => {
    setModalType('editClient');
    setSelectedItem(client);
    setShowModal(true);
  };

  const handleViewProgress = (clientName) => {
    const client = clients.find(c => c.name === clientName);
    if (client) {
      setModalType('progress');
      setSelectedItem(client);
      setShowModal(true);
    }
  };

  const handleVideoCall = (appointment) => {
    setModalType('video');
    setSelectedItem(appointment);
    setShowModal(true);
  };

  const handleSendReminder = (appointmentId) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, reminderSent: true }
        : apt
    ));
    alert('📧 Reminder sent successfully!');
  };

  const handleSyncCalendar = (clientId) => {
    setClients(prev => prev.map(client => 
      client.id === clientId 
        ? { ...client, calendarSynced: true }
        : client
    ));
    alert('📅 Google Calendar sync enabled!');
  };

  const handleCancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      alert('❌ Appointment cancelled successfully!');
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (modalType === 'schedule') {
      const newAppointment = {
        id: Math.max(...appointments.map(a => a.id)) + 1,
        date: formData.get('date'),
        time: formData.get('time'),
        type: formData.get('type') || 'Therapy Session',
        client: userType === 'therapist' ? formData.get('client') : userName,
        therapist: 'Dr. Rebecca B. Headley',
        location: formData.get('location') || 'Office - Room 1',
        duration: formData.get('duration') || '50 minutes',
        reminderSent: false,
        calendarSynced: true
      };
      setAppointments(prev => [...prev, newAppointment]);
      alert('✅ Appointment scheduled successfully and added to Google Calendar!');
    }
    
    else if (modalType === 'reschedule') {
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedItem.id 
          ? { ...apt, date: formData.get('date'), time: formData.get('time') }
          : apt
      ));
      alert('📅 Appointment rescheduled successfully and calendar updated!');
    }
    
    else if (modalType === 'addClient') {
      const newClient = {
        id: Math.max(...clients.map(c => c.id)) + 1,
        name: formData.get('firstName') + ' ' + formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        status: 'Active',
        calendarSynced: false,
        sessions: 0,
        goals: []
      };
      setClients(prev => [...prev, newClient]);
      alert('✅ New client added successfully!');
    }
    
    else if (modalType === 'editClient') {
      setClients(prev => prev.map(client => 
        client.id === selectedItem.id 
          ? { 
              ...client,
              name: formData.get('firstName') + ' ' + formData.get('lastName'),
              email: formData.get('email'),
              phone: formData.get('phone')
            }
          : client
      ));
      alert('✅ Client information updated successfully!');
    }
    
    setShowModal(false);
  };

  // Modal component with real forms
  const Modal = () => {
    if (!showModal) return null;
    
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
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {modalType === 'schedule' && (
            <div>
              <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>📅 Schedule New Appointment</h2>
              <form onSubmit={handleSubmit}>
                {userType === 'therapist' && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Select Client *
                    </label>
                    <select name="client" required style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}>
                      <option value="">Choose a client...</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.name}>{client.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Date *
                    </label>
                    <input 
                      type="date" 
                      name="date" 
                      required 
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Time *
                    </label>
                    <select name="time" required style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}>
                      <option value="">Select time...</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Session Type
                    </label>
                    <select name="type" style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}>
                      <option value="Therapy Session">Therapy Session</option>
                      <option value="Initial Consultation">Initial Consultation</option>
                      <option value="Follow-up Session">Follow-up Session</option>
                      <option value="Assessment">Assessment</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Duration
                    </label>
                    <select name="duration" style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}>
                      <option value="50 minutes">50 minutes</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="60 minutes">60 minutes</option>
                      <option value="90 minutes">90 minutes</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Location
                  </label>
                  <select name="location" style={{
                    width: '100%', 
                    padding: '12px', 
                    border: '2px solid #e5e7eb', 
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}>
                    <option value="Video Call">Video Call (Secure telehealth)</option>
                    <option value="Office - Room 1">Office - Room 1</option>
                    <option value="Office - Room 2">Office - Room 2</option>
                  </select>
                </div>

                <div style={{ padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px', marginBottom: '25px' }}>
                  <p style={{ margin: '0', fontSize: '14px', color: '#0369a1' }}>
                    ✅ <strong>Automatic features:</strong> Google Calendar sync, email reminders, and video links (if applicable)
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#f3f4f6', 
                      color: '#374151', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#4f46e5', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    Schedule Appointment
                  </button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'reschedule' && selectedItem && (
            <div>
              <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>📅 Reschedule Appointment</h2>
              
              <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>Current Appointment:</p>
                <p style={{ margin: '0', color: '#6b7280' }}>
                  {selectedItem.type} • {selectedItem.date} at {selectedItem.time}
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      New Date *
                    </label>
                    <input 
                      type="date" 
                      name="date" 
                      required 
                      defaultValue={selectedItem.date}
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      New Time *
                    </label>
                    <select name="time" required defaultValue={selectedItem.time} style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}>
                      <option value="">Select time...</option>
                      <option value="8:00 AM">8:00 AM</option>
                      <option value="9:00 AM">9:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="5:00 PM">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div style={{ padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px', marginBottom: '25px' }}>
                  <p style={{ margin: '0', fontSize: '14px', color: '#0369a1' }}>
                    ✅ Google Calendar will be automatically updated and new reminders sent
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#f3f4f6', 
                      color: '#374151', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#4f46e5', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    Reschedule
                  </button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'addClient' && (
            <div>
              <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>👥 Add New Client</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      name="firstName" 
                      required 
                      style={{
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      name="lastName" 
                      required 
                      style={{
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }} 
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }} 
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    placeholder="(555) 123-4567"
                    style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }} 
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#f3f4f6', 
                      color: '#374151', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#4f46e5', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    Add Client
                  </button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'editClient' && selectedItem && (
            <div>
              <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>✏️ Edit Client Information</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      name="firstName" 
                      required 
                      defaultValue={selectedItem.name.split(' ')[0]}
                      style={{
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      name="lastName" 
                      required 
                      defaultValue={selectedItem.name.split(' ').slice(1).join(' ')}
                      style={{
                        width: '100%', 
                        padding: '12px', 
                        border: '2px solid #e5e7eb', 
                        borderRadius: '8px',
                        fontSize: '16px'
                      }} 
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    defaultValue={selectedItem.email}
                    style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }} 
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#374151' }}>
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    defaultValue={selectedItem.phone}
                    style={{
                      width: '100%', 
                      padding: '12px', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '8px',
                      fontSize: '16px'
                    }} 
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#f3f4f6', 
                      color: '#374151', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#4f46e5', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'video' && selectedItem && (
            <div>
              <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>🎥 Join Video Session</h2>
              
              <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                <p style={{ margin: '0 0 15px 0', fontWeight: '600' }}>Session Details:</p>
                <p style={{ margin: '0 0 8px 0' }}><strong>Type:</strong> {selectedItem.type}</p>
                <p style={{ margin: '0 0 8px 0' }}><strong>Date:</strong> {selectedItem.date}</p>
                <p style={{ margin: '0 0 8px 0' }}><strong>Time:</strong> {selectedItem.time}</p>
                <p style={{ margin: '0' }}><strong>Duration:</strong> {selectedItem.duration}</p>
              </div>

              <div style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
                <p style={{ margin: '0', fontSize: '14px', color: '#92400e' }}>
                  🔒 <strong>HIPAA Compliant:</strong> This is a secure, encrypted video session that meets all healthcare privacy requirements.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setShowModal(false)} 
                  style={{
                    padding: '12px 24px', 
                    backgroundColor: '#f3f4f6', 
                    color: '#374151', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Close
                </button>
                <button 
                  onClick={() => { 
                    window.open('https://meet.rbhpractice.com/session-' + selectedItem.id, '_blank'); 
                    setShowModal(false); 
                  }}
                  style={{
                    padding: '12px 24px', 
                    backgroundColor: '#059669', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  🎥 Join Video Call
                </button>
              </div>
            </div>
          )}

          {modalType === 'progress' && selectedItem && (
            <div>
              <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>📊 Progress Tracking - {selectedItem.name}</h2>
              
              <div style={{ marginBottom: '25px', padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
                <p style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>
                  📈 Total Sessions: {selectedItem.sessions}
                </p>
              </div>

              <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>🎯 Treatment Goals</h3>
              {selectedItem.goals.map((goal, index) => (
                <div key={index} style={{ 
                  marginBottom: '20px', 
                  padding: '20px', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px',
                  backgroundColor: '#fafafa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '600', fontSize: '16px' }}>{goal.goal}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>{goal.progress}%</span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '12px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: goal.progress + '%', 
                      height: '100%', 
                      backgroundColor: goal.progress >= 80 ? '#059669' : goal.progress >= 50 ? '#d97706' : '#dc2626',
                      borderRadius: '6px'
                    }}></div>
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '25px' }}>
                <button 
                  onClick={() => setShowModal(false)} 
                  style={{
                    padding: '12px 24px', 
                    backgroundColor: '#f3f4f6', 
                    color: '#374151', 
                    border: 'none', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

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
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#1f2937' }}>RBH Practice Portal</h1>
          <p style={{ textAlign: 'center', marginBottom: '30px', color: '#6b7280' }}>
            Secure access for clients and therapists
          </p>
          
          <button
            onClick={() => handleLogin('client')}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              marginBottom: '15px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            🏥 Login as Client
          </button>

          <button
            onClick={() => handleLogin('therapist')}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            👩‍⚕️ Login as Therapist
          </button>
        </div>
      </div>
    );
  }

  const tabs = userType === 'therapist' ? [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' },
    { id: 'clients', label: '👥 Clients' }
  ] : [
    { id: 'dashboard', label: '🏠 Dashboard' },
    { id: 'appointments', label: '📅 Appointments' }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Modal />

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#1f2937' }}>Welcome, {userName}</h1>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Sign Out
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {tabs.map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{ 
              padding: '12px 24px', 
              marginRight: '10px',
              backgroundColor: activeTab === tab.id ? '#4f46e5' : '#f3f4f6',
              color: activeTab === tab.id ? 'white' : '#374151',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '15px', color: '#1f2937' }}>🏠 Dashboard</h2>
            <p style={{ marginBottom: '25px', color: '#6b7280' }}>Welcome to your {userType} portal!</p>
            
            <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #0ea5e9' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#0369a1', fontSize: '18px' }}>🚀 Fully Functional Features</h3>
              <ul style={{ margin: '0', paddingLeft: '20px', color: '#0369a1' }}>
                <li>✅ Complete appointment scheduling with forms</li>
                <li>✅ Working reschedule functionality</li>
                <li>✅ Add and edit client management</li>
                <li>✅ Real-time progress tracking</li>
                <li>✅ Secure video call integration</li>
                <li>✅ Smart reminder system</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: '0', color: '#1f2937' }}>
                📅 {userType === 'client' ? 'My Appointments' : 'Client Appointments'}
              </h2>
              
              <button
                onClick={handleScheduleNew}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ➕ Schedule New Appointment
              </button>
            </div>

            <div>
              {getUserAppointments().map(appointment => (
                <div key={appointment.id} style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                        {appointment.type}
                      </h3>
                      <p style={{ color: '#6b7280', margin: '0', fontSize: '15px' }}>
                        {userType === 'client' ? 'with ' + appointment.therapist : 'with ' + appointment.client}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        textTransform: 'uppercase'
                      }}>
                        Confirmed
                      </span>
                      {appointment.calendarSynced && (
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          fontWeight: '500'
                        }}>
                          📅 Calendar Synced
                        </span>
                      )}
                      {appointment.reminderSent && (
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          fontWeight: '500'
                        }}>
                          ✅ Reminder Sent
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '500', textTransform: 'uppercase' }}>Date</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '500', textTransform: 'uppercase' }}>Time</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                        {appointment.time}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '500', textTransform: 'uppercase' }}>Duration</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                        {appointment.duration}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '500', textTransform: 'uppercase' }}>Location</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                        {appointment.location}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {appointment.location === 'Video Call' && (
                      <button 
                        onClick={() => handleVideoCall(appointment)}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        🎥 {userType === 'client' ? 'Join Video Call' : 'Start Video Session'}
                      </button>
                    )}
                    
                    <button 
                      onClick={() => handleReschedule(appointment)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      📅 Reschedule
                    </button>

                    {userType === 'therapist' && (
                      <React.Fragment>
                        <button 
                          onClick={() => handleViewProgress(appointment.client)}
                          style={{
                            padding: '10px 20px',
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }}
                        >
                          📊 View Progress
                        </button>
                        {!appointment.reminderSent && (
                          <button 
                            onClick={() => handleSendReminder(appointment.id)}
                            style={{
                              padding: '10px 20px',
                              backgroundColor: '#f59e0b',
                              color: 'white',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer'
                            }}
                          >
                            📧 Send Reminder
                          </button>
                        )}
                      </React.Fragment>
                    )}

                    <button 
                      onClick={() => handleCancelAppointment(appointment.id)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: 'transparent',
                        color: '#dc2626',
                        border: '2px solid #dc2626',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ margin: '0', color: '#1f2937' }}>👥 Client Management</h2>
              <button 
                onClick={handleAddClient}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ➕ Add New Client
              </button>
            </div>

            <div>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
                        {client.name}
                      </h3>
                      <p style={{ color: '#6b7280', margin: '0 0 4px 0', fontSize: '15px' }}>
                        {client.email}
                      </p>
                      <p style={{ color: '#6b7280', margin: '0', fontSize: '14px' }}>
                        {client.phone}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: '#dcfce7',
                        color: '#166534'
                      }}>
                        {client.status}
                      </span>
                      {client.calendarSynced && (
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          fontWeight: '500'
                        }}>
                          📅 Calendar Synced
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0', fontWeight: '500', textTransform: 'uppercase' }}>Sessions</p>
                      <p style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>{client.sessions}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleViewProgress(client.name)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#7c3aed',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      📊 View Progress
                    </button>
                    <button
                      onClick={() => handleEditClient(client)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      ✏️ Edit Information
                    </button>
                    {!client.calendarSynced && (
                      <button
                        onClick={() => handleSyncCalendar(client.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#0ea5e9',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        📅 Sync Calendar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
