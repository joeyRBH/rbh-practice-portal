import React, { useState } from 'react';

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
