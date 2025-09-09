import React, { useState, useEffect } from 'react';

export default function MobileHIPAAPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      </svg>
    ),
    menu: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    close: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    bell: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    user: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    calendar: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    users: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    activity: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    clock: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    video: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    plus: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    mail: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    chevronRight: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    messageSquare: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    fileText: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    settings: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  };

  // Login component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              {icons.shield}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">HIPAA Portal</h1>
            <p className="text-gray-600">Secure Practice Management</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setCurrentUser({ role: 'therapist', name: 'Dr. Smith' })}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              👨‍⚕️ Login as Therapist
            </button>
            <button
              onClick={() => setCurrentUser({ role: 'client', name: 'Patient' })}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              👤 Login as Client
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              🔒 <strong>HIPAA Notice:</strong> This portal uses end-to-end encryption and complies with HIPAA security standards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile header
  const MobileHeader = () => (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? icons.close : icons.menu}
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">HIPAA Portal</h1>
            <p className="text-sm text-gray-500">{currentUser?.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            {icons.bell}
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentUser(null)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {icons.user}
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile navigation menu
  const MobileMenu = () => (
    <div className={`fixed inset-0 z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="bg-white w-80 h-full shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              {icons.user}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentUser?.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
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
              className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
                activeTab === id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                {icon}
                <span className="font-medium">{label}</span>
              </div>
              {icons.chevronRight}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-black bg-opacity-50 flex-1" onClick={() => setIsMobileMenuOpen(false)} />
    </div>
  );

  // Dashboard content
  const Dashboard = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">{icons.calendar}</div>
            <div>
              <p className="text-2xl font-bold text-blue-900">5</p>
              <p className="text-sm text-blue-600">Today's Appointments</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="text-green-600">{icons.users}</div>
            <div>
              <p className="text-2xl font-bold text-green-900">23</p>
              <p className="text-sm text-green-600">Active Clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Today's Schedule</h3>
        <div className="space-y-3">
          {appointments.slice(0, 3).map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="text-blue-600">{icons.clock}</div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{apt.client}</p>
                  <p className="text-sm text-gray-500">{apt.time} • {apt.type}</p>
                </div>
              </div>
              <button className="p-2 bg-blue-600 text-white rounded-lg">
                {icons.video}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => { setModalType('new-appointment'); setShowModal(true); }}
            className="flex items-center space-x-2 p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            {icons.plus}
            <span className="font-medium">New Appointment</span>
          </button>
          <button
            onClick={() => { setModalType('ai-notes'); setShowModal(true); }}
            className="flex items-center space-x-2 p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            {icons.fileText}
            <span className="font-medium">AI Notes</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Appointments content
  const Appointments = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Appointments</h2>
        <button
          onClick={() => { setModalType('new-appointment'); setShowModal(true); }}
          className="p-2 bg-blue-600 text-white rounded-lg"
        >
          {icons.plus}
        </button>
      </div>
      
      <div className="space-y-3">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{apt.client}</h3>
                <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {apt.status}
              </span>
            </div>
            
            <p className="text-gray-600 mb-3">{apt.type}</p>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium">
                Join Session
              </button>
              <button className="p-2 border border-gray-300 rounded-lg">
                {icons.phone}
              </button>
              <button className="p-2 border border-gray-300 rounded-lg">
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Clients</h2>
        <button
          onClick={() => { setModalType('new-client'); setShowModal(true); }}
          className="p-2 bg-blue-600 text-white rounded-lg"
        >
          {icons.plus}
        </button>
      </div>
      
      <div className="space-y-3">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {icons.user}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500">Last session: {client.lastSession}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                client.progress === 'Excellent' ? 'bg-green-100 text-green-800' :
                client.progress === 'Good' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {client.progress}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium">
                View Profile
              </button>
              <button className="p-2 border border-gray-300 rounded-lg">
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
          <h3 className="text-lg font-semibold mb-4">Schedule New Appointment</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="datetime-local"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <select className="w-full p-3 border border-gray-300 rounded-lg">
              <option>Initial Consultation</option>
              <option>Follow-up</option>
              <option>Therapy Session</option>
            </select>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
              Schedule Appointment
            </button>
          </div>
        </div>
      ),
      'ai-notes': (
        <div>
          <h3 className="text-lg font-semibold mb-4">AI Clinical Notes</h3>
          <p className="text-gray-600 mb-4">Generate professional clinical notes using AI assistance.</p>
          <textarea
            placeholder="Enter session notes or key points..."
            className="w-full p-3 border border-gray-300 rounded-lg h-32 mb-4"
          />
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium">
            Generate AI Notes
          </button>
        </div>
      ),
      'new-client': (
        <div>
          <h3 className="text-lg font-semibold mb-4">Add New Client</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client name"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium">
              Add Client
            </button>
          </div>
        </div>
      )
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <div></div>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
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
    <div className="min-h-screen bg-gray-50">
      <MobileHeader />
      <MobileMenu />
      
      <div className="p-4 pb-20">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'appointments' && <Appointments />}
        {activeTab === 'clients' && <Clients />}
        {activeTab === 'messages' && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4 text-gray-400">
              {icons.messageSquare}
            </div>
            <p className="text-gray-600">Messages feature coming soon</p>
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4 text-gray-400">
              {icons.fileText}
            </div>
            <p className="text-gray-600">Documents feature coming soon</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4 text-gray-400">
              {icons.settings}
            </div>
            <p className="text-gray-600">Settings feature coming soon</p>
          </div>
        )}
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          {[
            { id: 'dashboard', icon: icons.activity, label: 'Dashboard' },
            { id: 'appointments', icon: icons.calendar, label: 'Appointments' },
            { id: 'clients', icon: icons.users, label: 'Clients' },
            { id: 'messages', icon: icons.messageSquare, label: 'Messages' }
          ].map(({ id, icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === id ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <div className="mb-1">{icon}</div>
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Modal />
    </div>
  );
}
