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
              cursor: 'pointer',
              fontFamily: 'Cambria, serif'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '0 30px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '30px' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'dashboard' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'dashboard' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'dashboard' ? '600' : '400',
              fontFamily: 'Cambria, serif'
            }}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'appointments' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'appointments' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'appointments' ? '600' : '400',
              fontFamily: 'Cambria, serif'
            }}
          >
            📅 Appointments
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'clients' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'clients' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'clients' ? '600' : '400',
              fontFamily: 'Cambria, serif'
            }}
          >
            👥 Clients
          </button>
        </div>
      </div>

      <div style={{ padding: '30px' }}>
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
            </div>

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
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    📅 Schedule Appointment
                  </button>
                </div>
              </form>
            )}

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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    ➕ Add Client
                  </button>
                </div>
              </form>
            )}

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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    ✏️ Update Client
                  </button>
                </div>
              </form>
            )}

            {modalType === 'reschedule' && selectedItem && (
              <div>
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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => {
                      alert('✅ Advanced reschedule feature coming in Phase 2!');
                      closeModal();
                    }}
                    style={{
                      padding: '12px 24px', 
                      backgroundColor: '#f59e0b', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    📅 Reschedule
                  </button>
                </div>
              </div>
            )}

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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    🎥 Join Video Call
                  </button>
                </div>
              </div>
            )}

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
                  <p style={{ margin: '0', color: '#6b7280', fontSize: '14px' }}>
                    Total Sessions: <strong>{selectedItem.totalSessions}</strong>
                  </p>
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
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
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
}none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
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
                      fontWeight: '600',
                      fontFamily: 'Cambria, serif'
                    }}
                  >
                    ➕ Add New Client
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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
                    fontWeight: '600',
                    fontFamily: 'Cambria, serif'
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
                          fontSize: '14px',
                          fontFamily: 'Cambria, serif'
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
                        fontSize: '14px',
                        fontFamily: 'Cambria, serif'
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
                        fontSize: '14px',
                        fontFamily: 'Cambria, serif'
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
                  fontWeight: '600',
                  fontFamily: 'Cambria, serif'
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
                    <p style={{ margin: '0 0 8px 0', color: '#6b7280' }}>
                      📅 Sessions: {client.totalSessions} • Progress: {client.progress}%
                    </p>
                    
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
                        fontSize: '14px',
                        fontFamily: 'Cambria, serif'
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
                        fontSize: '14px',
                        fontFamily: 'Cambria, serif'
                      }}
                    >
                      ✏️ Edit Information
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
                      fontSize: '16px',
                      fontFamily: 'Cambria, serif'
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
                      border: 'import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const [appointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      client: 'Sarah Johnson',
      therapist: 'Dr. Rebecca B. Headley',
      location: 'Video Call'
    }
  ]);

  const [clients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567'
    }
  ]);

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
              Login as Therapist
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
              Login as Client
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
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

      <div style={{ 
        backgroundColor: 'white', 
        padding: '0 30px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '30px' }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'dashboard' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'dashboard' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'dashboard' ? '600' : '400'
            }}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'appointments' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'appointments' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'appointments' ? '600' : '400'
            }}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            style={{
              padding: '15px 0',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === 'clients' ? '2px solid #6366f1' : '2px solid transparent',
              color: activeTab === 'clients' ? '#6366f1' : '#6b7280',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: activeTab === 'clients' ? '600' : '400'
            }}
          >
            Clients
          </button>
        </div>
      </div>

      <div style={{ padding: '30px' }}>
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
                <h3 style={{ margin: '0 0 10px 0', color: '#6366f1' }}>Total Appointments</h3>
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
                <h3 style={{ margin: '0 0 10px 0', color: '#059669' }}>Total Clients</h3>
                <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', color: '#1f2937' }}>
                  {clients.length}
                </p>
              </div>
            </div>

            {userType === 'therapist' && (
              <div style={{ 
                backgroundColor: 'white', 
                padding: '25px', 
                borderRadius: '12px', 
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
              }}>
                <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setModalType('schedule');
                      setShowModal(true);
                    }}
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
                    Schedule New Appointment
                  </button>
                  <button
                    onClick={() => {
                      setModalType('add-client');
                      setShowModal(true);
                    }}
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
                    Add New Client
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>Appointments</h2>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {appointments.map(appointment => (
                <div key={appointment.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
                    {appointment.type}
                  </h3>
                  <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                    {appointment.date} at {appointment.time}
                  </p>
                  <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                    {userType === 'therapist' ? appointment.client : appointment.therapist}
                  </p>
                  <p style={{ margin: '0', color: '#6b7280' }}>
                    {appointment.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            <h2 style={{ marginBottom: '25px', color: '#1f2937' }}>Clients</h2>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {clients.map(client => (
                <div key={client.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '20px', 
                  borderRadius: '12px', 
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#1f2937' }}>
                    {client.name}
                  </h3>
                  <p style={{ margin: '0 0 4px 0', color: '#6b7280' }}>
                    {client.email}
                  </p>
                  <p style={{ margin: '0', color: '#6b7280' }}>
                    {client.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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
            maxWidth: '400px',
            width: '90%'
          }}>
            {modalType === 'schedule' && (
              <div>
                <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>
                  Schedule New Appointment
                </h2>
                <p style={{ marginBottom: '20px', color: '#6b7280' }}>
                  Scheduling functionality will be added in the next update!
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#6366f1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Close
                </button>
              </div>
            )}

            {modalType === 'add-client' && (
              <div>
                <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>
                  Add New Client
                </h2>
                <p style={{ marginBottom: '20px', color: '#6b7280' }}>
                  Client management functionality will be added in the next update!
                </p>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
