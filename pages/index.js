import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, MessageSquare, Settings, Phone, Mail, Clock, Video, Plus, Bell, Menu, X, ChevronRight, User, Shield, Activity } from 'lucide-react';

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

  // Login component
  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-600" />
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
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">HIPAA Portal</h1>
            <p className="text-sm text-gray-500">{currentUser?.name}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-6 h-6 text-gray-600" />
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
            <User className="w-6 h-6 text-gray-600" />
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
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentUser?.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          {[
            { id: 'dashboard', icon: Activity, label: 'Dashboard' },
            { id: 'appointments', icon: Calendar, label: 'Appointments' },
            { id: 'clients', icon: Users, label: 'Clients' },
            { id: 'messages', icon: MessageSquare, label: 'Messages' },
            { id: 'documents', icon: FileText, label: 'Documents' },
            { id: 'settings', icon: Settings, label: 'Settings' }
          ].map(({ id, icon: Icon, label }) => (
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
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
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
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-900">5</p>
              <p className="text-sm text-blue-600">Today's Appointments</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-green-600" />
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
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{apt.client}</p>
                  <p className="text-sm text-gray-500">{apt.time} • {apt.type}</p>
                </div>
              </div>
              <button className="p-2 bg-blue-600 text-white rounded-lg">
                <Video className="w-4 h-4" />
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
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Appointment</span>
          </button>
          <button
            onClick={() => { setModalType('ai-notes'); setShowModal(true); }}
            className="flex items-center space-x-2 p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FileText className="w-5 h-5" />
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
          <Plus className="w-5 h-5" />
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
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
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
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        {clients.map((client) => (
          <div key={client.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
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
                <MessageSquare className="w-5 h-5 text-gray-600" />
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
              <X className="w-5 h-5" />
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
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Messages feature coming soon</p>
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Documents feature coming soon</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Settings feature coming soon</p>
          </div>
        )}
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          {[
            { id: 'dashboard', icon: Activity, label: 'Dashboard' },
            { id: 'appointments', icon: Calendar, label: 'Appointments' },
            { id: 'clients', icon: Users, label: 'Clients' },
            { id: 'messages', icon: MessageSquare, label: 'Messages' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                activeTab === id ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <Modal />
    </div>
  );
}
