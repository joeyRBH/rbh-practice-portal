import React, { useState, useEffect } from 'react';

export default function MobileHIPAAPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Sample data
  const [appointments] = useState([
    { id: 1, client: 'Sarah Johnson', time: '2:00 PM', date: 'Today', type: 'Initial Consultation', status: 'confirmed' },
    { id: 2, client: 'Michael Chen', time: '3:30 PM', date: 'Today', type: 'Follow-up', status: 'confirmed' },
    { id: 3, client: 'Emma Davis', time: '10:00 AM', date: 'Tomorrow', type: 'Therapy Session', status: 'pending' }
  ]);

  const [clients] = useState([
    { id: 1, name: 'Sarah Johnson', lastSession: '2 days ago', progress: 'Good', status: 'Active' },
    { id: 2, name: 'Michael Chen', lastSession: '1 week ago', progress: 'Excellent', status: 'Active' },
    { id: 3, name: 'Emma Davis', lastSession: '3 days ago', progress: 'Improving', status: 'Active' }
  ]);

  // Simple SVG icons
  const icons = {
    shield: (
      <svg style={{width: '48px', height: '48px', color: '#2563eb'}} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
    menu: (
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    close: (
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    bell: (
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    user: (
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    calendar: (
      <svg style={{width: '32px', height: '32px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    users: (
      <svg style={{width: '32px', height: '32px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    activity: (
      <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    clock: (
      <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    video: (
      <svg style={{width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    plus: (
      <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    phone: (
      <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    mail: (
      <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    chevronRight: (
      <svg style={{width: '16px', height: '16px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    messageSquare: (
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    fileText: (
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    settings: (
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  // Login component
  const LoginScreen = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{width: '100%', maxWidth: '400px'}}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '32px'
        }}>
          <div style={{textAlign: 'center', marginBottom: '32px'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
              {icons.shield}
            </div>
            <h1 style={{fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px', margin: 0}}>HIPAA Portal</h1>
            <p style={{color: '#6b7280', margin: 0}}>Secure Practice Management</p>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <button
              onClick={() => setCurrentUser({ role: 'therapist', name: 'Dr. Smith' })}
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseOut={e => e.target.style.backgroundColor = '#2563eb'}
            >
              👨‍⚕️ Login as Therapist
            </button>
            <button
              onClick={() => setCurrentUser({ role: 'client', name: 'Patient' })}
              style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '18px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#15803d'}
              onMouseOut={e => e.target.style.backgroundColor = '#16a34a'}
            >
              👤 Login as Client
            </button>
          </div>
          
          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: '#fefce8',
            borderRadius: '8px',
            border: '1px solid #eab308'
          }}>
            <p style={{fontSize: '14px', color: '#a16207', margin: 0}}>
              🔒 <strong>HIPAA Notice:</strong> This portal uses end-to-end encryption and complies with HIPAA security standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile header
  const MobileHeader = () => (
    <div style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
          >
            {isMobileMenuOpen ? icons.close : icons.menu}
          </button>
          <div>
            <h1 style={{fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0}}>HIPAA Portal</h1>
            <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>{currentUser?.name}</p>
          </div>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <button style={{
            padding: '8px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            position: 'relative'
          }}>
            {icons.bell}
            {notifications.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#ef4444',
                color: 'white',
                fontSize: '12px',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {notifications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentUser(null)}
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer'
            }}
          >
            {icons.user}
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile navigation menu
  const MobileMenu = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
      display: 'flex'
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '320px',
        height: '100%',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              {icons.user}
            </div>
            <div>
              <h3 style={{fontWeight: '600', color: '#111827', margin: 0}}>{currentUser?.name}</h3>
              <p style={{fontSize: '14px', color: '#6b7280', margin: 0, textTransform: 'capitalize'}}>{currentUser?.role}</p>
            </div>
          </div>
        </div>
        
        <nav style={{padding: '16px'}}>
          {[
            { id: 'dashboard', icon: icons.activity, label: 'Dashboard' },
            { id: 'appointments', icon: icons.calendar, label: 'Appointments' },
            { id: 'clients', icon: icons.users, label: 'Clients' },
            { id: 'messages', icon: icons.messageSquare, label: 'Messages' },
            { id: 'documents', icon: icons.fileText, label: 'Documents' },
            { id: 'settings', icon: icons.settings, label: 'Settings' }
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setIsMobileMenuOpen(false);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '8px',
                border: 'none',
                backgroundColor: activeTab === id ? '#dbeafe' : 'transparent',
                color: activeTab === id ? '#2563eb' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                {icon}
                <span style={{fontWeight: '500'}}>{label}</span>
              </div>
              {icons.chevronRight}
            </button>
          ))}
        </nav>
      </div>
      <div 
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          flex: 1
        }}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );

  // Dashboard content
  const Dashboard = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
        <div style={{
          backgroundColor: '#dbeafe',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{color: '#2563eb'}}>{icons.calendar}</div>
            <div>
              <p style={{fontSize: '24px', fontWeight: 'bold', color: '#1e3a8a', margin: 0}}>5</p>
              <p style={{fontSize: '14px', color: '#2563eb', margin: 0}}>Today's Appointments</p>
            </div>
          </div>
        </div>
        <div style={{
          backgroundColor: '#dcfce7',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{color: '#16a34a'}}>{icons.users}</div>
            <div>
              <p style={{fontSize: '24px', fontWeight: 'bold', color: '#14532d', margin: 0}}>23</p>
              <p style={{fontSize: '14px', color: '#16a34a', margin: 0}}>Active Clients</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <h3 style={{fontWeight: '600', color: '#111827', marginBottom: '12px', marginTop: 0}}>Today's Schedule</h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          {appointments.slice(0, 3).map((apt) => (
            <div key={apt.id} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px'
            }}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563eb'
                }}>
                  {icons.clock}
                </div>
                <div>
                  <p style={{fontWeight: '500', color: '#111827', margin: 0}}>{apt.client}</p>
                  <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>{apt.time} • {apt.type}</p>
                </div>
              </div>
              <button style={{
                padding: '8px',
                backgroundColor: '#2563eb',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer'
              }}>
                {icons.video}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        padding: '16px'
      }}>
        <h3 style={{fontWeight: '600', color: '#111827', marginBottom: '12px', marginTop: 0}}>Quick Actions</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
          <button
            onClick={() => { setModalType('new-appointment'); setShowModal(true); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#dbeafe',
              color: '#2563eb',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#bfdbfe'}
            onMouseOut={e => e.target.style.backgroundColor = '#dbeafe'}
          >
            {icons.plus}
            <span style={{fontWeight: '500'}}>New Appointment</span>
          </button>
          <button
            onClick={() => { setModalType('ai-notes'); setShowModal(true); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#dcfce7',
              color: '#16a34a',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#bbf7d0'}
            onMouseOut={e => e.target.style.backgroundColor = '#dcfce7'}
          >
            {icons.fileText}
            <span style={{fontWeight: '500'}}>AI Notes</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Appointments content
  const Appointments = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0}}>Appointments</h2>
        <button
          onClick={() => { setModalType('new-appointment'); setShowModal(true); }}
          style={{
            padding: '8px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {icons.plus}
        </button>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {appointments.map((apt) => (
          <div key={apt.id} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            padding: '16px'
          }}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px'}}>
              <div>
                <h3 style={{fontWeight: '600', color: '#111827', margin: 0}}>{apt.client}</h3>
                <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>{apt.date} at {apt.time}</p>
              </div>
              <span style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: apt.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
                color: apt.status === 'confirmed' ? '#166534' : '#92400e'
              }}>
                {apt.status}
              </span>
            </div>
            
            <p style={{color: '#6b7280', marginBottom: '12px', margin: 0}}>{apt.type}</p>
            
            <div style={{display: 'flex', gap: '8px'}}>
              <button style={{
                flex: 1,
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}>
                Join Session
              </button>
              <button style={{
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}>
                {icons.phone}
              </button>
              <button style={{
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}>
                {icons.mail}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Clients content
  const Clients = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h2 style={{fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0}}>Clients</h2>
        <button
          onClick={() => { setModalType('new-client'); setShowModal(true); }}
          style={{
            padding: '8px',
            backgroundColor: '#2563eb',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {icons.plus}
        </button>
      </div>
      
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {clients.map((client) => (
          <div key={client.id} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            padding: '16px'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#e5e7eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}>
                {icons.user}
              </div>
              <div style={{flex: 1}}>
                <h3 style={{fontWeight: '600', color: '#111827', margin: 0}}>{client.name}</h3>
                <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>Last session: {client.lastSession}</p>
              </div>
              <span style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: client.progress === 'Excellent' ? '#dcfce7' : 
                                client.progress === 'Good' ? '#dbeafe' : '#fef3c7',
                color: client.progress === 'Excellent' ? '#166534' :
                       client.progress === 'Good' ? '#1e40af' : '#92400e'
              }}>
                {client.progress}
              </span>
            </div>
            
            <div style={{display: 'flex', gap: '8px'}}>
              <button style={{
                flex: 1,
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer'
              }}>
                View Profile
              </button>
              <button style={{
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}>
                {icons.messageSquare}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Modal component
  const Modal = () => {
    if (!showModal) return null;

    const modalContent = {
      'new-appointment': (
        <div>
          <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', margin: 0}}>Schedule New Appointment</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <input
              type="text"
              placeholder="Client name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="datetime-local"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <select style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}>
              <option>Initial Consultation</option>
              <option>Follow-up</option>
              <option>Therapy Session</option>
            </select>
            <button style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              Schedule Appointment
            </button>
          </div>
        </div>
      ),
      'ai-notes': (
        <div>
          <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', margin: 0}}>AI Clinical Notes</h3>
          <p style={{color: '#6b7280', marginBottom: '16px', margin: 0}}>Generate professional clinical notes using AI assistance.</p>
          <textarea
            placeholder="Enter session notes or key points..."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              height: '128px',
              marginBottom: '16px',
              fontSize: '16px',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
          <button style={{
            width: '100%',
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer'
          }}>
            Generate AI Notes
          </button>
        </div>
      ),
      'new-client': (
        <div>
          <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px', margin: 0}}>Add New Client</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <input
              type="text"
              placeholder="Client name"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="email"
              placeholder="Email address"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <input
              type="tel"
              placeholder="Phone number"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />
            <button style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              Add Client
            </button>
          </div>
        </div>
      )
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
            <div></div>
            <button
              onClick={() => setShowModal(false)}
              style={{
                padding: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#f3f4f6'}
              onMouseOut={e => e.target.style.backgroundColor = 'transparent'}
            >
              {icons.close}
            </button>
          </div>
          {modalContent[modalType]}
        </div>
      </div>
    );
  };

  // Main render
  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <MobileHeader />
      <MobileMenu />
      
      <div style={{padding: '16px', paddingBottom: '80px'}}>
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'appointments' && <Appointments />}
        {activeTab === 'clients' && <Clients />}
        {activeTab === 'messages' && (
          <div style={{textAlign: 'center', padding: '48px 0'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px', color: '#9ca3af'}}>
              {icons.messageSquare}
            </div>
            <p style={{color: '#6b7280', margin: 0}}>Messages feature coming soon</p>
          </div>
        )}
        {activeTab === 'documents' && (
          <div style={{textAlign: 'center', padding: '48px 0'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px', color: '#9ca3af'}}>
              {icons.fileText}
            </div>
            <p style={{color: '#6b7280', margin: 0}}>Documents feature coming soon</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div style={{textAlign: 'center', padding: '48px 0'}}>
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px', color: '#9ca3af'}}>
              {icons.settings}
            </div>
            <p style={{color: '#6b7280', margin: 0}}>Settings feature coming soon</p>
          </div>
        )}
      </div>

      {/* Mobile bottom navigation */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '8px'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          {[
            { id: 'dashboard', icon: icons.activity, label: 'Dashboard' },
            { id: 'appointments', icon: icons.calendar, label: 'Appointments' },
            { id: 'clients', icon: icons.users, label: 'Clients' },
            { id: 'messages', icon: icons.messageSquare, label: 'Messages' }
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === id ? '#dbeafe' : 'transparent',
                color: activeTab === id ? '#2563eb' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{marginBottom: '4px'}}>{icon}</div>
              <span style={{fontSize: '12px', fontWeight: '500'}}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Modal />
    </div>
  );
}
