import { useState, useEffect } from 'react';

export default function MobileHIPAAPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = async (type, name) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUserType(type);
      setUserName(name);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setActiveTab('dashboard');
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
  const showTab = (tabName) => {
    setActiveTab(tabName);
    closeMenu();
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            RBH Practice Portal
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            HIPAA-Compliant • Mobile-Optimized
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleLogin('therapist', 'Dr. Smith')}
              className="w-full p-4 text-lg text-white bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-lg"
            >
              👨‍⚕️ Login as Therapist
            </button>
            
            <button
              onClick={() => handleLogin('client', 'John Doe')}
              className="w-full p-4 text-lg text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg"
            >
              👤 Login as Client
            </button>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-2xl text-sm text-gray-600">
            🔒 HIPAA Compliant • 🔐 End-to-End Encrypted • ✅ SOC 2 Certified
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'ai-notes', label: 'AI Notes', icon: '🤖' },
    { id: 'calendar', label: 'Calendar', icon: '🗓️' },
    { id: 'notifications', label: 'Notifications', icon: '📧' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome, {userName}! 👋
              </h2>
              {isMobile && (
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  ☰
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-indigo-600 font-semibold mb-2">📅 Today's Schedule</h3>
                    <p className="text-3xl font-bold text-gray-800">8</p>
                    <p className="text-gray-600 text-sm">appointments</p>
                  </div>
                  <div className="text-4xl">📅</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-emerald-600 font-semibold mb-2">👥 Active Clients</h3>
                    <p className="text-3xl font-bold text-gray-800">24</p>
                    <p className="text-gray-600 text-sm">total clients</p>
                  </div>
                  <div className="text-4xl">👥</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-purple-600 font-semibold mb-2">🤖 AI Notes</h3>
                    <p className="text-3xl font-bold text-gray-800">156</p>
                    <p className="text-gray-600 text-sm">generated this month</p>
                  </div>
                  <div className="text-4xl">🤖</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">🚀 Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button 
                  onClick={() => showTab('ai-notes')}
                  className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm font-medium"
                >
                  📝 New AI Note
                </button>
                <button 
                  onClick={() => showTab('clients')}
                  className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 text-sm font-medium"
                >
                  👤 Add Client
                </button>
                <button 
                  onClick={() => showTab('appointments')}
                  className="p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 text-sm font-medium"
                >
                  📅 Schedule
                </button>
                <button 
                  onClick={() => showTab('notifications')}
                  className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 text-sm font-medium"
                >
                  📧 Send Reminder
                </button>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">📅 Appointments</h2>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {[
                { time: '9:00 AM', client: 'Sarah Johnson', type: 'Individual Therapy', status: 'confirmed' },
                { time: '10:30 AM', client: 'Mike Chen', type: 'Couples Therapy', status: 'confirmed' },
                { time: '2:00 PM', client: 'Lisa Rodriguez', type: 'Family Therapy', status: 'pending' },
                { time: '3:30 PM', client: 'David Kim', type: 'Individual Therapy', status: 'confirmed' }
              ].map((apt, index) => (
                <div key={index} className={`p-4 md:p-6 ${index < 3 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-800 text-lg">{apt.client}</h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>⏰ {apt.time}</span>
                        <span>📋 {apt.type}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => alert(`Starting video call with ${apt.client}`)}
                        className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                      >
                        🎥 Start Call
                      </button>
                      <button 
                        onClick={() => alert(`Opening chart for ${apt.client}`)}
                        className="flex-1 md:flex-none px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                      >
                        📋 Chart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'clients':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">👥 Client Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                { name: 'Sarah Johnson', status: 'Active', sessions: 12, progress: 85 },
                { name: 'Mike Chen', status: 'Active', sessions: 8, progress: 72 },
                { name: 'Lisa Rodriguez', status: 'Pending', sessions: 3, progress: 45 },
                { name: 'David Kim', status: 'Active', sessions: 15, progress: 90 }
              ].map((client, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{client.name}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{client.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${client.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-1 font-medium ${
                          client.status === 'Active' ? 'text-emerald-600' : 'text-yellow-600'
                        }`}>{client.status}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Sessions:</span>
                        <span className="ml-1 font-medium">{client.sessions}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => showTab('ai-notes')}
                      className="flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 text-sm rounded-lg hover:bg-indigo-200 transition-colors font-medium"
                    >
                      📝 Notes
                    </button>
                    <button 
                      onClick={() => alert(`Calling ${client.name}`)}
                      className="flex-1 px-3 py-2 bg-emerald-100 text-emerald-700 text-sm rounded-lg hover:bg-emerald-200 transition-colors font-medium"
                    >
                      📞 Call
                    </button>
                    <button 
                      onClick={() => alert(`Emailing ${client.name}`)}
                      className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      📧 Email
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ai-notes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">🤖 AI-Powered Session Notes</h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Client
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Sarah Johnson</option>
                    <option>Mike Chen</option>
                    <option>Lisa Rodriguez</option>
                    <option>David Kim</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Individual Therapy</option>
                    <option>Couples Therapy</option>
                    <option>Family Therapy</option>
                    <option>Group Therapy</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Notes
                </label>
                <textarea 
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="8"
                  placeholder="Enter session notes here... AI will automatically generate summaries and insights."
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button 
                  onClick={() => alert('Session notes saved successfully!')}
                  className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  💾 Save Notes
                </button>
                <button 
                  onClick={() => alert('AI Summary: Client showed progress in anxiety management. Continue CBT approach.')}
                  className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 font-medium"
                >
                  🤖 AI Summary
                </button>
                <button 
                  onClick={() => alert('Key Themes: Anxiety management, CBT techniques, Progress tracking')}
                  className="p-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-medium"
                >
                  🎯 Extract Themes
                </button>
                <button 
                  onClick={() => alert('Treatment Plan: Continue weekly CBT sessions with anxiety focus.')}
                  className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-medium"
                >
                  📋 Treatment Plan
                </button>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">🗓️ Calendar Integration</h2>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold mb-4">Google Calendar Connected</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Your appointments are automatically synced with Google Calendar.
              </p>
              <button 
                onClick={() => alert('Opening Google Calendar...')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
              >
                📅 Open Calendar
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">📧 Notifications</h2>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">📱 Send Reminder</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Client
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Sarah Johnson - Today 9:00 AM</option>
                    <option>Mike Chen - Today 10:30 AM</option>
                    <option>Lisa Rodriguez - Today 2:00 PM</option>
                    <option>David Kim - Tomorrow 9:00 AM</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Type
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>📧 Email Reminder</option>
                    <option>📱 SMS Reminder</option>
                    <option>📧📱 Email + SMS</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => alert('Email reminder sent successfully!')}
                  className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 font-medium"
                >
                  📧 Send Email
                </button>
                <button 
                  onClick={() => alert('SMS reminder sent successfully!')}
                  className="flex-1 p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium"
                >
                  📱 Send SMS
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b lg:hidden">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🏥 RBH Portal
          </h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">{userName}</span>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🏥 RBH Practice Portal
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {userName}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Navigation Menu */}
        {isMobile && menuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>
            <div className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <button 
                    onClick={closeMenu}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => showTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id
                        ? 'bg-indigo-100 text-indigo-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <span className="mr-3">🚪</span>
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-sm border-r min-h-screen">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  activeTab === item.id
                    ? 'bg-indigo-100 text-indigo-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
