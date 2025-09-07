import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      status: 'confirmed',
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
      status: 'confirmed',
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
  };

  const getUserAppointments = () => {
    if (userType === 'client') {
      return appointments.filter(apt => apt.client === userName);
    }
    return appointments;
  };

  // Button handlers
  const handleScheduleNew = () => {
    setModalType('schedule');
    setSelectedAppointment(null);
    setShowModal(true);
  };

  const handleReschedule = (appointment) => {
    setModalType('reschedule');
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleAddClient = () => {
    setModalType('addClient');
    setSelectedClient(null);
    setShowModal(true);
  };

  const handleEditClient = (client) => {
    setModalType('editClient');
    setSelectedClient(client);
    setShowModal(true);
  };

  const handleViewProgress = (clientName) => {
    const client = clients.find(c => c.name === clientName);
    if (client) {
      setModalType('progress');
      setSelectedClient(client);
      setShowModal(true);
    }
  };

  const handleVideoCall = (appointment) => {
    setModalType('video');
    setSelectedAppointment(appointment);
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

  // Form submission handlers
  const handleFormSubmit = (e) => {
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
        status: 'confirmed',
        location: formData.get('location') || 'Office - Room 1',
        duration: formData.get('duration') || '50 minutes',
        reminderSent: false,
        calendarSynced: true
      };
      setAppointments(prev => [...prev, newAppointment]);
      alert('✅ Appointment scheduled successfully!');
    }
    
    if (modalType === 'reschedule') {
      setAppointments(prev => prev.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, date: formData.get('date'), time: formData.get('time') }
          : apt
      ));
      alert('📅 Appointment rescheduled successfully!');
    }
    
    if (modalType === 'addClient') {
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
    
    if (modalType === 'editClient') {
      setClients(prev => prev.map(client => 
        client.id === selectedClient.id 
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

  // Universal Modal Component
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
          borderRadius: '8px',
          padding: '30px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {modalType === 'schedule' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>📅 Schedule New Appointment</h2>
              <form onSubmit={handleFormSubmit}>
                {userType === 'therapist' && (
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Client</label>
                    <select name="client" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}>
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
                    <input type="date" name="date" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Time</label>
                    <select name="time" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}>
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
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Schedule</button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'reschedule' && selectedAppointment && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>📅 Reschedule Appointment</h2>
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <p style={{ margin: '0', fontSize: '14px' }}>
                  Current: {selectedAppointment.type} on {selectedAppointment.date} at {selectedAppointment.time}
                </p>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>New Date</label>
                  <input type="date" name="date" required defaultValue={selectedAppointment.date} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>New Time</label>
                  <select name="time" required defaultValue={selectedAppointment.time} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}>
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
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Reschedule</button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'addClient' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>👥 Add New Client</h2>
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>First Name</label>
                    <input type="text" name="firstName" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Last Name</label>
                    <input type="text" name="lastName" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
                  <input type="email" name="email" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone</label>
                  <input type="tel" name="phone" required style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Add Client</button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'editClient' && selectedClient && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>✏️ Edit Client</h2>
              <form onSubmit={handleFormSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>First Name</label>
                    <input type="text" name="firstName" required defaultValue={selectedClient.name.split(' ')[0]} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Last Name</label>
                    <input type="text" name="lastName" required defaultValue={selectedClient.name.split(' ').slice(1).join(' ')} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
                  <input type="email" name="email" required defaultValue={selectedClient.email} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Phone</label>
                  <input type="tel" name="phone" required defaultValue={selectedClient.phone} style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save Changes</button>
                </div>
              </form>
            </div>
          )}

          {modalType === 'video' && selectedAppointment && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>🎥 Join Video Session</h2>
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: '500' }}>Session Details:</p>
                <p style={{ margin: '0' }}>
                  {selectedAppointment.type} on {selectedAppointment.date} at {selectedAppointment.time}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
                <button onClick={() => { alert('🎥 Opening video call...'); setShowModal(false); }} style={{ padding: '10px 20px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Join Call</button>
              </div>
            </div>
          )}

          {modalType === 'progress' && selectedClient && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>📊 Progress - {selectedClient.name}</h2>
              <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
                <p style={{ margin: '0', fontWeight: '500' }}>
                  📈 Total Sessions: {selectedClient.sessions}
                </p>
              </div>
              <h3 style={{ marginBottom: '15px' }}>🎯 Treatment Goals</h3>
              {selectedClient.goals.map((goal, index) => (
                <div key={index} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #e5e7eb', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '500' }}>{goal.goal}</span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>{goal.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: goal.progress + '%', height: '100%', backgroundColor: goal.progress >= 80 ? '#059669' : goal.progress >= 50 ? '#d97706' : '#dc2626' }}></div>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Close</button>
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
          <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>RBH Practice Portal</h1>
          
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
              fontSize: '16px'
            }}
          >
            Login as Client
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
              fontSize: '16px'
            }}
          >
            Login as Therapist
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

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Welcome, {userName}</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
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
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2>🏠 Dashboard</h2>
            <p>Welcome to your {userType} portal!</p>
            <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
              <p style={{ margin: '0', color: '#0369a1', fontWeight: '500' }}>
                🚀 All buttons are now functional! Try scheduling, rescheduling, and managing clients.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: '0' }}>📅 {userType === 'client' ? 'My Appointments' : 'Client Appointments'}</h2>
              <button onClick={handleScheduleNew} style={{ padding: '12px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                ➕ Schedule New
              </button>
            </div>

            <div>
              {getUserAppointments().map(appointment => (
                <div key={appointment.id} style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '25px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 5px 0' }}>{appointment.type}</h3>
                      <p style={{ color: '#6b7280', margin: '0' }}>
                        {userType === 'client' ? 'with ' + appointment.therapist : 'with ' + appointment.client}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>
                        {appointment.status}
                      </span>
                      {appointment.calendarSynced && (
                        <span style={{ padding: '2px 8px', borderRadius: '8px', fontSize: '10px', backgroundColor: '#dbeafe', color: '#1e40af' }}>
                          📅 Synced
                        </span>
                      )}
                      {appointment.reminderSent && (
                        <span style={{ padding: '2px 8px', borderRadius: '8px', fontSize: '10px', backgroundColor: '#dcfce7', color: '#166534' }}>
                          ✅ Reminded
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Duration</p>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>{appointment.duration}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Location</p>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>{appointment.location}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {userType === 'client' && appointment.location === 'Video Call' && (
                      <button onClick={() => handleVideoCall(appointment)} style={{ padding: '8px 16px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                        🎥 Join Video Call
                      </button>
                    )}
                    
                    <button onClick={() => handleReschedule(appointment)} style={{ padding: '8px 16px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      📅 Reschedule
                    </button>

                    {userType === 'therapist' && (
                      <React.Fragment>
                        {appointment.location === 'Video Call' && (
                          <button onClick={() => handleVideoCall(appointment)} style={{ padding: '8px 16px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                            🎥 Start Session
                          </button>
                        )}
                        <button onClick={() => handleViewProgress(appointment.client)} style={{ padding: '8px 16px', backgroundColor: '#7c3aed', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                          📊 View Progress
                        </button>
                        {!appointment.reminderSent && (
                          <button onClick={() => handleSendReminder(appointment.id)} style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                            📧 Send Reminder
                          </button>
                        )}
                      </React.Fragment>
                    )}

                    <button onClick={() => handleCancelAppointment(appointment.id)} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#dc2626', border: '1px solid #dc2626', borderRadius: '6px', cursor: 'pointer' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: '0' }}>👥 Client Management</h2>
              <button onClick={handleAddClient} style={{ padding: '12px 24px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
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
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 5px 0' }}>{client.name}</h3>
                      <p style={{ color: '#6b7280', margin: '0' }}>{client.email}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', backgroundColor: '#dcfce7', color: '#166534' }}>
                        {client.status}
                      </span>
                      {client.calendarSynced && (
                        <span style={{ padding: '2px 8px', borderRadius: '8px', fontSize: '10px', backgroundColor: '#dbeafe', color: '#1e40af' }}>
                          📅 Calendar Synced
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Sessions</p>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>{client.sessions}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Phone</p>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>{client.phone}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={() => handleViewProgress(client.name)} style={{ padding: '8px 16px', backgroundColor: '#7c3aed', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      📊 View Progress
                    </button>
                    <button onClick={() => handleEditClient(client)} style={{ padding: '8px 16px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                      ✏️ Edit
                    </button>
                    {!client.calendarSynced && (
                      <button onClick={() => handleSyncCalendar(client.id)} style={{ padding: '8px 16px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
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
}: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Date</p>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>{appointment.date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Time</p>
                      <p style={{ fontSize: '14px', fontWeight: '500', margin: '0' }}>{appointment.time}</p>
                    </div>
                    <div>
                      <p style={{ fontSize
