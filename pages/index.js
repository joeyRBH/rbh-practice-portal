import React, { useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClient, setSelectedClient] = useState(null);

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
      notes: 'Client has been making excellent progress with anxiety management techniques. Responding well to CBT approach.',
      emergencyContact: 'John Johnson - (555) 123-4568'
    },
    {
      id: 2,
      name: 'Mike Wilson',
      email: 'mike.wilson@email.com',
      phone: '(555) 234-5678',
      dateJoined: '2023-12-02',
      lastSession: '2024-03-08',
      nextSession: '2024-03-15',
      balance: 150,
      status: 'Active',
      diagnosis: 'Depression',
      notes: 'Making steady progress. Homework assignments are being completed regularly.',
      emergencyContact: 'Lisa Wilson - (555) 234-5679'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '(555) 345-6789',
      dateJoined: '2024-01-20',
      lastSession: '2024-03-12',
      nextSession: '2024-03-20',
      balance: 0,
      status: 'Active',
      diagnosis: 'PTSD',
      notes: 'New client. Building rapport and establishing treatment goals.',
      emergencyContact: 'David Davis - (555) 345-6790'
    },
    {
      id: 4,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 456-7890',
      dateJoined: '2023-09-10',
      lastSession: '2024-02-28',
      nextSession: null,
      balance: 75,
      status: 'Inactive',
      diagnosis: 'Stress Management',
      notes: 'Completed initial treatment goals. On break, may return for booster sessions.',
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
  };

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
        e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.target.style.transform = 'translateY(0)';
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

  const renderClientDetails = (client) => (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '25px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 5px 0' }}>
            {client.name}
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
            Edit Profile
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
            <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{client.email}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Phone</p>
            <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{client.phone}</p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Emergency Contact</p>
            <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{client.emergencyContact}</p>
          </div>
        </div>

        {/* Treatment Information */}
        <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>
            Treatment Information
          </h3>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Primary Diagnosis</p>
            <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>{client.diagnosis}</p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Date Joined</p>
            <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>
              {new Date(client.dateJoined).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Status</p>
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
        </div>

        {/* Session Information */}
        <div style={{ padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>
            Session Information
          </h3>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Last Session</p>
            <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>
              {client.lastSession ? new Date(client.lastSession).toLocaleDateString() : 'None'}
            </p>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Next Session</p>
            <p style={{ fontSize: '14px', color: '#1f2937', margin: '0' }}>
              {client.nextSession ? new Date(client.nextSession).toLocaleDateString() : 'Not scheduled'}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>Account Balance</p>
            <p style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: client.balance > 0 ? '#dc2626' : '#059669',
              margin: '0'
            }}>
              ${client.balance}
            </p>
          </div>
        </div>
      </div>

      {/* Clinical Notes */}
      <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '15px' }}>
          Clinical Notes
        </h3>
        <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: '0' }}>
          {client.notes}
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: '25px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#059669',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Schedule Session
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Add Note
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          View History
        </button>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Send Message
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
              setSelectedClient(null); // Reset client selection when changing tabs
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
            {userType === 'therapist' && (
              <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
                <p style={{ margin: '0', color: '#0369a1' }}>
                  ✅ Client Management is now available! Click the "👥 Clients" tab to manage your client roster.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appointments' && (
          <div>
            <h2>Appointments</h2>
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px', marginBottom: '15px' }}>
              <h3>Next Appointment</h3>
              <p><strong>Date:</strong> March 15, 2024</p>
              <p><strong>Time:</strong> 2:00 PM</p>
              <p><strong>Type:</strong> Therapy Session</p>
              {userType === 'client' && <p><strong>With:</strong> Dr. Rebecca B. Headley</p>}
              {userType === 'therapist' && <p><strong>Client:</strong> Sarah Johnson</p>}
            </div>
            
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
              <h3>Upcoming Appointment</h3>
              <p><strong>Date:</strong> March 18, 2024</p>
              <p><strong>Time:</strong> 10:30 AM</p>
              <p><strong>Type:</strong> Follow-up Session</p>
              {userType === 'client' && <p><strong>With:</strong> Dr. Rebecca B. Headley</p>}
              {userType === 'therapist' && <p><strong>Client:</strong> Sarah Johnson</p>}
            </div>
          </div>
        )}

        {activeTab === 'clients' && userType === 'therapist' && (
          <div>
            {selectedClient ? (
              renderClientDetails(selectedClient)
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
