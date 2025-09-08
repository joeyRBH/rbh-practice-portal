import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Form states
  const [scheduleForm, setScheduleForm] = useState({
    client: '',
    date: '',
    time: '',
    type: 'Therapy Session',
    duration: '50',
    location: 'Video Call',
    notes: ''
  });

  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    insurance: '',
    emergencyContact: '',
    notes: ''
  });

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
      calendarSynced: true,
      status: 'confirmed'
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
      calendarSynced: true,
      status: 'confirmed'
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      insurance: 'Blue Cross Blue Shield',
      emergencyContact: 'John Johnson (555) 987-6543',
      progress: 75,
      lastSession: '2024-03-10',
      totalSessions: 12,
      notes: 'Making excellent progress with anxiety management'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@email.com',
      phone: '(555) 234-5678',
      dateOfBirth: '1990-02-22',
      insurance: 'Aetna',
      emergencyContact: 'Lisa Chen (555) 876-5432',
      progress: 45,
      lastSession: '2024-03-08',
      totalSessions: 6,
      notes: 'Working on depression and work-life balance'
    }
  ]);

  // Modal handlers
  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
    
    if (type === 'edit-client' && item) {
      setClientForm({
        name: item.name,
        email: item.email,
        phone: item.phone,
        dateOfBirth: item.dateOfBirth,
        insurance: item.insurance,
        emergencyContact: item.emergencyContact,
        notes: item.notes
      });
    }
    
    if (type === 'reschedule' && item) {
      setScheduleForm({
        client: item.client,
        date: '',
        time: '',
        type: item.type,
        duration: item.duration.replace(' minutes', ''),
        location: item.location,
        notes: ''
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedItem(null);
    setScheduleForm({
      client: '',
      date: '',
      time: '',
      type: 'Therapy Session',
      duration: '50',
      location: 'Video Call',
      notes: ''
    });
    setClientForm({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      insurance: '',
      emergencyContact: '',
      notes: ''
    });
  };

  // Form submission handlers
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    
    if (!scheduleForm.client || !scheduleForm.date || !scheduleForm.time) {
      alert('Please fill in all required fields');
      return;
    }

    const newAppointment = {
      id: appointments.length + 1,
      date: scheduleForm.date,
      time: scheduleForm.time,
      type: scheduleForm.type,
      client: scheduleForm.client,
      therapist: 'Dr. Rebecca B. Headley',
      location: scheduleForm.location,
      duration: scheduleForm.duration + ' minutes',
      reminderSent: false,
      calendarSynced: false,
      status: 'confirmed'
    };

    setAppointments([...appointments, newAppointment]);
    closeModal();
    alert('✅ Appointment scheduled successfully!');
  };

  const handleReschedule = (e) => {
    e.preventDefault();
    
    if (!scheduleForm.date || !scheduleForm.time) {
      alert('Please select new date and time');
      return;
    }

    setAppointments(appointments.map(apt => 
      apt.id === selectedItem.id 
        ? { ...apt, date: scheduleForm.date, time: scheduleForm.time }
        : apt
    ));
    
    closeModal();
    alert('✅ Appointment rescheduled successfully!');
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    
    if (!clientForm.name || !clientForm.email || !clientForm.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const newClient = {
      id: clients.length + 1,
      ...clientForm,
      progress: 0,
      lastSession: 'Not yet scheduled',
      totalSessions: 0
    };

    setClients([...clients, newClient]);
    closeModal();
    alert('✅ Client added successfully!');
  };

  const handleEditClient = (e) => {
    e.preventDefault();
    
    setClients(clients.map(client => 
      client.id === selectedItem.id 
        ? { ...client, ...clientForm }
        : client
    ));
    
    closeModal();
    alert('✅ Client information updated successfully!');
  };

  const handleCancelAppointment = (appointment) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== appointment.id));
      alert('❌ Appointment cancelled');
    }
  };

  const sendReminder = (appointment) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointment.id 
        ? { ...apt, reminderSent: true }
        : apt
    ));
    alert('📧 Reminder sent successfully!');
  };

  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '40px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h1 style={{ marginBottom: '30px', color: '#1f2937', fontSize: '28px' }}>
            RBH Practice Portal
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setUserType('therapist');
                setUserName('Dr. Rebecca B. Headley');
              }}
              style={{
                padding: '15px 25px',
                backgroundColor: '#6366f1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🩺 Login as Therapist
            </button>
            <button
              onClick={() => {
                setIsLoggedIn(true);
                setUserType('client');
                setUserName('Sarah Johnson');
              }}
              style={{
                padding: '15px 25px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                cursor: 'pointer',
                fontWeight: '600'
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: 'white', 
        padding: '15px 30px', 
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#1f2937', fontSize: '24px' }}>
          RBH Practice Portal
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: '#6b7280' }}>Welcome, {userName}</span>
          <button
            onClick={() => setIsLoggedIn(false)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '0 30px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '30px' }}>
          {[
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'appointments', label: '📅 Appointments' },
            { id: 'clients', label: '👥 Clients' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '15px 0',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid #6366f1' : '2px solid transparent',
                color: activeTab === tab.id ? '#6366f1' : '#6b7280',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? '600' : '400'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '30px' }}>
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>Dashboard</h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#6366f1' }}>📅 Total Appointments</h3>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
                  {appointments.length}
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#059669' }}>👥 Total Clients</h3>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
                  {clients.length}
                </p>
              </div>

              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#f59e0b' }}>📧 Pending Reminders</h3>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
                  {appointments.filter(apt => !apt.reminderSent).length}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            {userType === 'therapist' && (
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>⚡ Quick Actions</h3>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => openModal('schedule')}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#6366f1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    📅 Schedule Appointment
                  </button>
                </div>
              </form>
            )}

            {/* Reschedule Modal */}
            {modalType === 'reschedule' && selectedItem && (
              <form onSubmit={handleReschedule}>
                <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>
                  📅 Reschedule Appointment
                </h2>
                
                <div style={{ 
                  marginBottom: '25px', 
                  padding: '15px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '8px' 
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#374151' }}>Current Appointment:</h3>
                  <p style={{ margin: '0', color: '#6b7280' }}>
                    {selectedItem.type} with {selectedItem.client}
                  </p>
                  <p style={{ margin: '0', color: '#6b7280' }}>
                    📅 {selectedItem.date} at {selectedItem.time}
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    New Date *
                  </label>
                  <input
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    New Time *
                  </label>
                  <select
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select a new time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button"
                    onClick={closeModal} 
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
                      backgroundColor: '#f59e0b', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    📅 Reschedule
                  </button>
                </div>
              </form>
            )}

            {/* Add Client Modal */}
            {modalType === 'add-client' && (
              <form onSubmit={handleAddClient}>
                <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>
                  ➕ Add New Client
                </h2>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button"
                    onClick={closeModal} 
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
                      backgroundColor: '#059669', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    ➕ Add Client
                  </button>
                </div>
              </form>
            )}

            {/* Edit Client Modal */}
            {modalType === 'edit-client' && selectedItem && (
              <form onSubmit={handleEditClient}>
                <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>
                  ✏️ Edit Client Information
                </h2>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({...clientForm, name: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(e) => setClientForm({...clientForm, email: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={clientForm.phone}
                    onChange={(e) => setClientForm({...clientForm, phone: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button"
                    onClick={closeModal} 
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
                      backgroundColor: '#f59e0b', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    ✏️ Update Client
                  </button>
                </div>
              </form>
            )}

            {/* Video Call Modal */}
            {modalType === 'video' && selectedItem && (
              <div>
                <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>
                  🎥 Video Session
                </h2>
                
                <div style={{ 
                  marginBottom: '25px', 
                  padding: '20px', 
                  backgroundColor: '#f0f9ff', 
                  borderRadius: '8px' 
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#1e40af' }}>Session Details:</h3>
                  <p style={{ margin: '0 0 5px 0', color: '#374151' }}>
                    <strong>{selectedItem.type}</strong>
                  </p>
                  <p style={{ margin: '0 0 5px 0', color: '#6b7280' }}>
                    📅 {selectedItem.date} at {selectedItem.time}
                  </p>
                  <p style={{ margin: '0 0 5px 0', color: '#6b7280' }}>
                    👤 {userType === 'therapist' ? selectedItem.client : selectedItem.therapist}
                  </p>
                  <p style={{ margin: '0', color: '#6b7280' }}>
                    ⏱️ Duration: {selectedItem.duration}
                  </p>
                </div>

                <div style={{ 
                  marginBottom: '25px', 
                  padding: '15px', 
                  backgroundColor: '#fef3c7', 
                  borderRadius: '8px',
                  border: '1px solid #f59e0b'
                }}>
                  <p style={{ margin: '0', fontSize: '14px', color: '#92400e' }}>
                    🔒 <strong>HIPAA Notice:</strong> This video session is encrypted and secure. 
                    Please ensure you are in a private location before joining.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={closeModal} 
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
                      closeModal(); 
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

            {/* Progress Modal */}
            {modalType === 'progress' && selectedItem && (
              <div>
                <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>
                  📊 Progress Tracking - {selectedItem.name}
                </h2>
                
                <div style={{ 
                  marginBottom: '25px', 
                  padding: '20px', 
                  backgroundColor: '#f0f9ff', 
                  borderRadius: '8px' 
                }}>
                  <h3 style={{ margin: '0 0 15px 0', color: '#1e40af' }}>Overall Progress</h3>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                      {selectedItem.progress}% Complete
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '12px', 
                    backgroundColor: '#e5e7eb', 
                    borderRadius: '6px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ 
                      width: `${selectedItem.progress}%`, 
                      height: '100%', 
                      backgroundColor: selectedItem.progress > 75 ? '#10b981' : selectedItem.progress > 50 ? '#f59e0b' : '#ef4444',
                      borderRadius: '6px'
                    }}></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                        Total Sessions: <strong>{selectedItem.totalSessions}</strong>
                      </p>
                    </div>
                    <div>
                      <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                        Last Session: <strong>{selectedItem.lastSession}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {selectedItem.notes && (
                  <div style={{ 
                    marginBottom: '25px', 
                    padding: '15px', 
                    backgroundColor: '#fef3c7', 
                    borderRadius: '8px' 
                  }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#92400e' }}>Recent Notes:</h4>
                    <p style={{ margin: '0', color: '#92400e', fontSize: '14px' }}>
                      {selectedItem.notes}
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={closeModal} 
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#6366f1', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    📊 Close Progress View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    ➕ Schedule New Appointment
                  </button>
                  <button
                    onClick={() => openModal('add-client')}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}
                  >
                    ➕ Add New Client
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Appointments */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#1f2937' }}>📅 Appointments</h2>
              {userType === 'therapist' && (
                <button
                  onClick={() => openModal('schedule')}
                  style={{
                    padding: '12px 20px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                >
                  ➕ Schedule New Appointment
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gap: '15px' }}>
              {appointments
                .filter(apt => userType === 'therapist' || apt.client === userName)
                .map(appointment => (
                <div key={appointment.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
                      {appointment.type}
                    </h3>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                      📅 {appointment.date} at {appointment.time}
                    </p>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                      👤 {userType === 'therapist' ? appointment.client : appointment.therapist}
                    </p>
                    <p style={{ margin: '0', color: '#6b7280' }}>
                      📍 {appointment.location} • ⏱️ {appointment.duration}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    {appointment.location === 'Video Call' && (
                      <button
                        onClick={() => openModal('video', appointment)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        🎥 Join Video Call
                      </button>
                    )}
                    
                    <button
                      onClick={() => openModal('reschedule', appointment)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      📅 Reschedule
                    </button>
                    
                    <button
                      onClick={() => handleCancelAppointment(appointment)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ❌ Cancel
                    </button>

                    {userType === 'therapist' && !appointment.reminderSent && (
                      <button
                        onClick={() => sendReminder(appointment)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#8b5cf6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        📧 Send Reminder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clients (Therapist Only) */}
        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: '#1f2937' }}>👥 Clients</h2>
              <button
                onClick={() => openModal('add-client')}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                ➕ Add New Client
              </button>
            </div>

            <div style={{ display: 'grid', gap: '15px' }}>
              {clients.map(client => (
                <div key={client.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
                      {client.name}
                    </h3>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                      📧 {client.email} • 📞 {client.phone}
                    </p>
                    <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                      🏥 {client.insurance}
                    </p>
                    <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>
                      📅 Last Session: {client.lastSession} • Sessions: {client.totalSessions}
                    </p>
                    
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        Progress: {client.progress}%
                      </span>
                      <div style={{ 
                        width: '200px', 
                        height: '8px', 
                        backgroundColor: '#e5e7eb', 
                        borderRadius: '4px',
                        marginTop: '4px'
                      }}>
                        <div style={{ 
                          width: `${client.progress}%`, 
                          height: '100%', 
                          backgroundColor: client.progress > 75 ? '#10b981' : client.progress > 50 ? '#f59e0b' : '#ef4444',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                    
                    {client.notes && (
                      <p style={{ 
                        margin: '0', 
                        color: '#6b7280', 
                        fontStyle: 'italic',
                        fontSize: '14px'
                      }}>
                        💭 {client.notes}
                      </p>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <button
                      onClick={() => openModal('progress', client)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#8b5cf6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      📊 View Progress
                    </button>
                    
                    <button
                      onClick={() => openModal('edit-client', client)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      ✏️ Edit Information
                    </button>
                    
                    <button
                      onClick={() => openModal('schedule')}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#6366f1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      📅 Schedule Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
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
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            {/* Schedule Appointment Modal */}
            {modalType === 'schedule' && (
              <form onSubmit={handleScheduleSubmit}>
                <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>
                  📅 Schedule New Appointment
                </h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Client *
                  </label>
                  <select
                    value={scheduleForm.client}
                    onChange={(e) => setScheduleForm({...scheduleForm, client: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select a client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Date *
                  </label>
                  <input
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) => setScheduleForm({...scheduleForm, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Time *
                  </label>
                  <select
                    value={scheduleForm.time}
                    onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    type="button"
                    onClick={closeModal} 
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
                      backgroundColor: '#6366f1', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
