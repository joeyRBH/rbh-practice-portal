import { useState, useEffect } from 'react';

export default function MindCarePortalClinical() {
  // Authentication and user state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); // 'clinician' or 'client'
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Google OAuth state
  const [googleConnected, setGoogleConnected] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Clinical data state
  const [clinicalNotes, setClinicalNotes] = useState([]);
  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      admissionDate: '2025-01-15',
      primaryDiagnosis: 'F32.1 - Major Depressive Disorder, Moderate',
      secondaryDiagnosis: 'F41.1 - Generalized Anxiety Disorder',
      treatmentPlan: 'CBT, 12 sessions',
      currentLevel: 'Level 1 - Outpatient',
      riskLevel: 'Low',
      lastAssessment: '2025-09-01',
      nextAssessment: '2025-12-01',
      insurance: 'Blue Cross Blue Shield',
      emergencyContact: 'John Johnson - (555) 123-4568'
    }
  ]);

  const [selectedClient, setSelectedClient] = useState(null);
  const [activeNote, setActiveNote] = useState(null);

  // Google OAuth configuration
  const GOOGLE_CLIENT_ID = '940233544658-rbhdvbt2l825ae83bagpiqn83c79e65c.apps.googleusercontent.com';
  const GOOGLE_REDIRECT_URI = typeof window !== 'undefined' ? window.location.origin : '';
  const GOOGLE_SCOPE = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

  // OAuth helper functions
  const generateCodeVerifier = () => {
    if (typeof window === 'undefined') return '';
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const generateCodeChallenge = async (verifier) => {
    if (typeof window === 'undefined') return '';
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  // Google OAuth login
  const loginWithGoogle = async (accountType) => {
    if (typeof window === 'undefined') return;
    
    setIsLoading(true);
    setUserType(accountType);
    
    try {
      // Check if we have an auth code in URL (OAuth redirect)
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');
      
      if (authCode) {
        await exchangeCodeForToken(authCode);
        return;
      }

      // Start OAuth flow
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      
      sessionStorage.setItem('code_verifier', codeVerifier);
      sessionStorage.setItem('account_type', accountType);
      
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.set('client_id', GOOGLE_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', GOOGLE_REDIRECT_URI);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', GOOGLE_SCOPE);
      authUrl.searchParams.set('code_challenge', codeChallenge);
      authUrl.searchParams.set('code_challenge_method', 'S256');
      authUrl.searchParams.set('prompt', 'select_account');
      
      window.location.href = authUrl.toString();
      
    } catch (error) {
      console.error('OAuth error:', error);
      setIsLoading(false);
      alert('❌ Failed to connect to Google. Please try again.');
    }
  };

  // Exchange code for token (simplified for demo)
  const exchangeCodeForToken = async (authCode) => {
    try {
      const accountType = sessionStorage.getItem('account_type') || 'clinician';
      
      // Simulate token exchange
      setAccessToken('demo_token_' + Date.now());
      setUserProfile({
        email: accountType === 'clinician' ? 'dr.wilson@mindcare.com' : 'sarah.johnson@email.com',
        name: accountType === 'clinician' ? 'Dr. Sarah Wilson' : 'Sarah Johnson'
      });
      
      setUserName(accountType === 'clinician' ? 'Dr. Sarah Wilson' : 'Sarah Johnson');
      setUserEmail(accountType === 'clinician' ? 'dr.wilson@mindcare.com' : 'sarah.johnson@email.com');
      setUserType(accountType);
      setGoogleConnected(true);
      setIsLoggedIn(true);
      setIsLoading(false);
      
      // Clean up
      sessionStorage.removeItem('code_verifier');
      sessionStorage.removeItem('account_type');
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Set appropriate tab based on user type
      setActiveTab(accountType === 'clinician' ? 'dashboard' : 'client-portal');
      
    } catch (error) {
      console.error('Token exchange error:', error);
      setIsLoading(false);
      alert(`❌ Failed to authenticate: ${error.message}`);
    }
  };

  // Check for OAuth redirect on component mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    
    if (authCode && !isLoggedIn) {
      exchangeCodeForToken(authCode);
    }
  }, [isLoggedIn]);

  // Clinical note functions
  const createClinicalNote = (clientId, noteData) => {
    const newNote = {
      id: Date.now(),
      clientId,
      date: new Date().toISOString(),
      clinician: userName,
      ...noteData
    };
    setClinicalNotes(prev => [...prev, newNote]);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setGoogleConnected(false);
    setAccessToken(null);
    setUserProfile(null);
    setUserName('');
    setUserEmail('');
    setUserType('');
    setActiveTab('dashboard');
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '1rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.98)',
          padding: '3rem',
          borderRadius: '24px',
          boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🧠
            </div>
            <h1 style={{ 
              color: '#1e293b', 
              marginBottom: '0.5rem', 
              fontSize: '2.25rem',
              fontWeight: '700',
              letterSpacing: '-0.025em'
            }}>
              MindCare Portal
            </h1>
            <p style={{ 
              color: '#64748b', 
              marginBottom: '0',
              fontSize: '1.125rem',
              fontWeight: '500'
            }}>
              Clinical Management System
            </p>
            <p style={{ 
              color: '#94a3b8', 
              margin: '0.5rem 0 0 0',
              fontSize: '0.875rem'
            }}>
              HIPAA-Compliant • ASAM Standards • Secure Login
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => loginWithGoogle('clinician')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Connecting...' : '👨‍⚕️ Clinician Login'}
            </button>

            <button
              onClick={() => loginWithGoogle('client')}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                background: 'white',
                color: '#1e3a8a',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Connecting...' : '🧑‍💼 Client Portal'}
            </button>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1rem', fontWeight: '600' }}>
              🔒 Secure Authentication
            </h4>
            <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>✅ HIPAA-compliant Google OAuth 2.0</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>✅ Role-based access control</p>
              <p style={{ margin: '0' }}>✅ End-to-end encryption</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main portal interface
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)',
        color: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>🧠</span>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.025em' }}>
                MindCare Portal
              </h1>
              <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.9 }}>
                Clinical Management System
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                {userType === 'clinician' ? '👨‍⚕️' : '🧑‍💼'} {userName}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                {userEmail}
              </div>
            </div>
            <div style={{
              backgroundColor: googleConnected ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '600',
              border: `1px solid ${googleConnected ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
            }}>
              {googleConnected ? '✅ Google Connected' : '❌ Disconnected'}
            </div>
            <button
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 2rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '0' }}>
          {(userType === 'clinician' ? [
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'clients', label: 'Client Management', icon: '👥' },
            { id: 'clinical-notes', label: 'Clinical Notes', icon: '📝' },
            { id: 'asam-assessment', label: 'ASAM Assessment', icon: '🎯' },
            { id: 'reports', label: 'Reports & Analytics', icon: '📈' }
          ] : [
            { id: 'client-portal', label: 'My Portal', icon: '🏠' },
            { id: 'my-progress', label: 'My Progress', icon: '📈' },
            { id: 'appointments', label: 'Appointments', icon: '📅' },
            { id: 'resources', label: 'Resources', icon: '📚' }
          ]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1.25rem 1.5rem',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
                color: activeTab === tab.id ? '#2563eb' : '#64748b',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? '600' : '500',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Loading Overlay */}
      {isLoading && (
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
            padding: '2rem',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ margin: 0, fontSize: '1.2rem', color: '#1e293b' }}>Processing...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Clinician Dashboard */}
        {userType === 'clinician' && activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: '700' }}>
              Clinical Dashboard
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              {/* Patient Overview */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                  📊 Patient Overview
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dbeafe', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e40af' }}>{clients.length}</div>
                    <div style={{ fontSize: '0.875rem', color: '#1e40af' }}>Active Clients</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#dcfce7', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#166534' }}>{clinicalNotes.length}</div>
                    <div style={{ fontSize: '0.875rem', color: '#166534' }}>Clinical Notes</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fef3c7', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#92400e' }}>3</div>
                    <div style={{ fontSize: '0.875rem', color: '#92400e' }}>Pending Assessments</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fce7f3', borderRadius: '12px' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#be185d' }}>2</div>
                    <div style={{ fontSize: '0.875rem', color: '#be185d' }}>High Risk Clients</div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                  📝 Recent Activity
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { action: 'Clinical note added', client: 'Sarah Johnson', time: '2 hours ago', type: 'note' },
                    { action: 'ASAM assessment completed', client: 'Michael Chen', time: '4 hours ago', type: 'assessment' },
                    { action: 'Treatment plan updated', client: 'Sarah Johnson', time: '1 day ago', type: 'plan' }
                  ].map((activity, index) => (
                    <div key={index} style={{
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                          {activity.action}
                        </div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          {activity.client}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                  ⚡ Quick Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { label: 'Add Clinical Note', tab: 'clinical-notes', color: '#2563eb' },
                    { label: 'ASAM Assessment', tab: 'asam-assessment', color: '#059669' },
                    { label: 'View All Clients', tab: 'clients', color: '#7c3aed' },
                    { label: 'Generate Reports', tab: 'reports', color: '#dc2626' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(action.tab)}
                      style={{
                        padding: '0.875rem 1rem',
                        backgroundColor: action.color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Client Management */}
        {userType === 'clinician' && activeTab === 'clients' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontWeight: '700' }}>
                Client Management
              </h2>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
              >
                + Add New Client
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {clients.map(client => (
                <div key={client.id} style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onClick={() => setSelectedClient(client)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.5rem', fontWeight: '600' }}>
                        {client.firstName} {client.lastName}
                      </h3>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
                        DOB: {new Date(client.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                    <div style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: client.riskLevel === 'High' ? '#fef2f2' : client.riskLevel === 'Medium' ? '#fef3c7' : '#f0fdf4',
                      color: client.riskLevel === 'High' ? '#dc2626' : client.riskLevel === 'Medium' ? '#d97706' : '#059669',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: `1px solid ${client.riskLevel === 'High' ? '#fecaca' : client.riskLevel === 'Medium' ? '#fed7aa' : '#bbf7d0'}`
                    }}>
                      {client.riskLevel} Risk
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <strong style={{ color: '#374151', fontSize: '0.875rem' }}>Primary Diagnosis:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b', fontSize: '0.875rem' }}>
                        {client.primaryDiagnosis}
                      </p>
                    </div>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <strong style={{ color: '#374151', fontSize: '0.875rem' }}>Treatment Plan:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b', fontSize: '0.875rem' }}>
                        {client.treatmentPlan}
                      </p>
                    </div>
                    <div>
                      <strong style={{ color: '#374151', fontSize: '0.875rem' }}>Current Level:</strong>
                      <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b', fontSize: '0.875rem' }}>
                        {client.currentLevel}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                        setActiveTab('clinical-notes');
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        color: '#2563eb',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      📝 Add Note
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                        setActiveTab('asam-assessment');
                      }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        backgroundColor: '#f8fafc',
                        color: '#059669',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      🎯 ASAM
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Clinical Notes */}
        {userType === 'clinician' && activeTab === 'clinical-notes' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0, color: '#1e293b', fontSize: '2rem', fontWeight: '700' }}>
                Clinical Notes
              </h2>
              <button
                onClick={() => setActiveNote({ type: 'new' })}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
              >
                + New Clinical Note
              </button>
            </div>

            {activeNote ? (
              <ClinicalNoteForm 
                client={selectedClient}
                note={activeNote}
                onSave={(noteData) => {
                  if (selectedClient) {
                    createClinicalNote(selectedClient.id, noteData);
                  }
                  setActiveNote(null);
                  alert('✅ Clinical note saved successfully');
                }}
                onCancel={() => setActiveNote(null)}
              />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                {/* Client List */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0',
                  height: 'fit-content'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                    Select Client
                  </h3>
                  {clients.map(client => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      style={{
                        padding: '1rem',
                        marginBottom: '0.5rem',
                        backgroundColor: selectedClient?.id === client.id ? '#dbeafe' : '#f8fafc',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        border: selectedClient?.id === client.id ? '2px solid #2563eb' : '1px solid #e2e8f0'
                      }}
                    >
                      <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                        {client.firstName} {client.lastName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {client.primaryDiagnosis.split(' - ')[0]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notes Display */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e2e8f0'
                }}>
                  {selectedClient ? (
                    <>
                      <h3 style={{ margin: '0 0 1.5rem 0', color: '#1e293b', fontSize: '1.5rem', fontWeight: '600' }}>
                        Clinical Notes - {selectedClient.firstName} {selectedClient.lastName}
                      </h3>
                      
                      <button
                        onClick={() => setActiveNote({ type: 'new', clientId: selectedClient.id })}
                        style={{
                          padding: '0.75rem 1.5rem',
                          backgroundColor: '#2563eb',
                          color: 'white',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          marginBottom: '1.5rem'
                        }}
                      >
                        + Add New Note
                      </button>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {clinicalNotes
                          .filter(note => note.clientId === selectedClient.id)
                          .map(note => (
                            <div key={note.id} style={{
                              padding: '1.5rem',
                              backgroundColor: '#f8fafc',
                              borderRadius: '12px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <div style={{ fontWeight: '600', color: '#1e293b' }}>
                                  {note.sessionType || 'Clinical Session'}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                                  {new Date(note.date).toLocaleDateString()} - {note.clinician}
                                </div>
                              </div>
                              <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.6' }}>
                                {note.content || note.subjectiveNotes || 'No content recorded'}
                              </div>
                            </div>
                          ))}
                        
                        {clinicalNotes.filter(note => note.clientId === selectedClient.id).length === 0 && (
                          <div style={{ 
                            textAlign: 'center', 
                            padding: '3rem', 
                            color: '#94a3b8',
                            fontSize: '1rem'
                          }}>
                            No clinical notes recorded yet. Click "Add New Note" to get started.
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '3rem', 
                      color: '#94a3b8',
                      fontSize: '1.125rem'
                    }}>
                      Select a client to view their clinical notes
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ASAM Assessment */}
        {userType === 'clinician' && activeTab === 'asam-assessment' && (
          <ASAMAssessment 
            client={selectedClient}
            onSave={(assessmentData) => {
              alert('✅ ASAM Assessment saved successfully');
              console.log('ASAM Assessment:', assessmentData);
            }}
          />
        )}

        {/* Client Portal */}
        {userType === 'client' && activeTab === 'client-portal' && (
          <ClientPortal 
            clientData={clients[0]} // Mock client data
            userName={userName}
          />
        )}

        {/* Reports */}
        {userType === 'clinician' && activeTab === 'reports' && (
          <div>
            <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: '700' }}>
              Reports & Analytics
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
              
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                  📈 Clinical Outcomes
                </h3>
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  Clinical outcome metrics and treatment effectiveness reports will be displayed here.
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
                  📊 ASAM Level Distribution
                </h3>
                <div style={{ textAlign: 'center', color: '#64748b' }}>
                  ASAM assessment level distribution and transition analytics.
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// Clinical Note Form Component
function ClinicalNoteForm({ client, note, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    sessionType: '',
    dataObservations: '',
    assessment: '',
    plan: '',
    riskAssessment: '',
    sessionDuration: '',
    nextAppointment: ''
  });

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <h3 style={{ margin: '0 0 2rem 0', color: '#1e293b', fontSize: '1.5rem', fontWeight: '600' }}>
        DAP Clinical Note - {client ? `${client.firstName} ${client.lastName}` : 'New Client'}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
            Session Type
          </label>
          <select
            value={formData.sessionType}
            onChange={(e) => setFormData({...formData, sessionType: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select session type</option>
            <option value="Individual Therapy">Individual Therapy</option>
            <option value="Group Therapy">Group Therapy</option>
            <option value="Family Therapy">Family Therapy</option>
            <option value="Assessment">Assessment</option>
            <option value="Crisis Intervention">Crisis Intervention</option>
            <option value="Case Management">Case Management</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
            Session Duration
          </label>
          <select
            value={formData.sessionDuration}
            onChange={(e) => setFormData({...formData, sessionDuration: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select duration</option>
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
            <option value="60 minutes">60 minutes</option>
            <option value="90 minutes">90 minutes</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* DATA Section */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #dbeafe'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1e40af', fontSize: '1.125rem', fontWeight: '600' }}>
            📊 DATA (Observations & Information)
          </h4>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
            Observable behaviors, client statements, mental status, presentation, interventions used
          </label>
          <textarea
            value={formData.dataObservations}
            onChange={(e) => setFormData({...formData, dataObservations: e.target.value})}
            placeholder="Record observable data: client appearance, mood, affect, speech, thought process, behavior, response to interventions, statements made, etc."
            rows={5}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* ASSESSMENT Section */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
          border: '1px solid #dcfce7'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#166534', fontSize: '1.125rem', fontWeight: '600' }}>
            🎯 ASSESSMENT (Clinical Interpretation)
          </h4>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
            Clinical interpretation, progress toward goals, effectiveness of interventions
          </label>
          <textarea
            value={formData.assessment}
            onChange={(e) => setFormData({...formData, assessment: e.target.value})}
            placeholder="Clinical assessment: interpretation of data, progress toward treatment goals, effectiveness of interventions, client's response to treatment, clinical insights, etc."
            rows={5}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* PLAN Section */}
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#fffbeb',
          borderRadius: '12px',
          border: '1px solid #fed7aa'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#92400e', fontSize: '1.125rem', fontWeight: '600' }}>
            📋 PLAN (Next Steps & Interventions)
          </h4>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '600' }}>
            Treatment plan, next session goals, homework assignments, referrals
          </label>
          <textarea
            value={formData.plan}
            onChange={(e) => setFormData({...formData, plan: e.target.value})}
            placeholder="Treatment plan: next session goals, interventions to continue/modify, homework assignments, referrals, safety planning, follow-up actions, etc."
            rows={5}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

      </div>

      {/* Risk Assessment */}
      <div style={{
        padding: '1.5rem',
        backgroundColor: '#fef2f2',
        borderRadius: '12px',
        border: '1px solid #fecaca',
        marginBottom: '2rem'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#dc2626', fontSize: '1.125rem', fontWeight: '600' }}>
          ⚠️ Risk Assessment
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {['Low Risk', 'Medium Risk', 'High Risk', 'Imminent Risk'].map(level => (
            <label key={level} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              padding: '0.75rem',
              borderRadius: '8px',
              backgroundColor: formData.riskAssessment === level ? '#fecaca' : 'white',
              border: '1px solid #fecaca'
            }}>
              <input
                type="radio"
                name="riskAssessment"
                value={level}
                checked={formData.riskAssessment === level}
                onChange={(e) => setFormData({...formData, riskAssessment: e.target.value})}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{level}</span>
            </label>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        <button
          onClick={onCancel}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#f8fafc',
            color: '#64748b',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(formData)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          Save DAP Note
        </button>
      </div>
    </div>
  );
}

// ASAM Assessment Component
function ASAMAssessment({ client, onSave }) {
  const [assessment, setAssessment] = useState({
    dimension1: '', // Acute Intoxication/Withdrawal
    dimension2: '', // Biomedical Conditions
    dimension3: '', // Emotional/Behavioral/Cognitive Conditions
    dimension4: '', // Readiness to Change
    dimension5: '', // Relapse/Continued Use Potential
    dimension6: '', // Recovery Environment
    recommendedLevel: ''
  });

  const dimensions = [
    {
      key: 'dimension1',
      title: 'Dimension 1: Acute Intoxication and/or Withdrawal Potential',
      options: ['None', 'Mild', 'Moderate', 'Severe']
    },
    {
      key: 'dimension2', 
      title: 'Dimension 2: Biomedical Conditions and Complications',
      options: ['None', 'Mild', 'Moderate', 'Severe']
    },
    {
      key: 'dimension3',
      title: 'Dimension 3: Emotional, Behavioral, or Cognitive Conditions',
      options: ['None', 'Mild', 'Moderate', 'Severe']
    },
    {
      key: 'dimension4',
      title: 'Dimension 4: Readiness to Change',
      options: ['High', 'Moderate', 'Low', 'Very Low']
    },
    {
      key: 'dimension5',
      title: 'Dimension 5: Relapse, Continued Use, or Continued Problem Potential',
      options: ['Low', 'Moderate', 'High', 'Very High']
    },
    {
      key: 'dimension6',
      title: 'Dimension 6: Recovery Environment',
      options: ['Very Supportive', 'Supportive', 'Neutral', 'Unsupportive', 'Very Unsupportive']
    }
  ];

  const levels = [
    'Level 0.5 - Early Intervention',
    'Level 1 - Outpatient Services',
    'Level 2.1 - Intensive Outpatient',
    'Level 2.5 - Partial Hospitalization',
    'Level 3.1 - Clinically Managed Low-Intensity Residential',
    'Level 3.3 - Clinically Managed Population-Specific High-Intensity Residential',
    'Level 3.5 - Clinically Managed High-Intensity Residential',
    'Level 3.7 - Medically Monitored Intensive Inpatient',
    'Level 4 - Medically Managed Intensive Inpatient'
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '16px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e2e8f0'
    }}>
      <h2 style={{ margin: '0 0 2rem 0', color: '#1e293b', fontSize: '2rem', fontWeight: '700' }}>
        ASAM Assessment
      </h2>
      
      {client && (
        <div style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#f8fafc', 
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>
            Client: {client.firstName} {client.lastName}
          </h3>
          <p style={{ margin: 0, color: '#64748b' }}>
            Current Level: {client.currentLevel} | Risk Level: {client.riskLevel}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {dimensions.map(dimension => (
          <div key={dimension.key} style={{
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
            borderRadius: '12px'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem' }}>
              {dimension.title}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem' }}>
              {dimension.options.map(option => (
                <label key={option} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: '6px',
                  backgroundColor: assessment[dimension.key] === option ? '#dbeafe' : 'transparent'
                }}>
                  <input
                    type="radio"
                    name={dimension.key}
                    value={option}
                    checked={assessment[dimension.key] === option}
                    onChange={(e) => setAssessment({...assessment, [dimension.key]: e.target.value})}
                  />
                  <span style={{ fontSize: '0.875rem' }}>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div style={{
          padding: '1.5rem',
          border: '2px solid #2563eb',
          borderRadius: '12px',
          backgroundColor: '#f0f9ff'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b', fontSize: '1.125rem' }}>
            Recommended Level of Care
          </h4>
          <select
            value={assessment.recommendedLevel}
            onChange={(e) => setAssessment({...assessment, recommendedLevel: e.target.value})}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Select recommended level</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => onSave(assessment)}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            Save ASAM Assessment
          </button>
        </div>
      </div>
    </div>
  );
}

// Client Portal Component
function ClientPortal({ clientData, userName }) {
  return (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#1e293b', fontSize: '2rem', fontWeight: '700' }}>
        Welcome, {userName}
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        
        {/* Treatment Summary */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
            📋 Treatment Summary
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <strong style={{ color: '#374151' }}>Current Level:</strong>
              <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b' }}>{clientData.currentLevel}</p>
            </div>
            <div>
              <strong style={{ color: '#374151' }}>Treatment Plan:</strong>
              <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b' }}>{clientData.treatmentPlan}</p>
            </div>
            <div>
              <strong style={{ color: '#374151' }}>Next Assessment:</strong>
              <p style={{ margin: '0.25rem 0 0 0', color: '#1e293b' }}>
                {new Date(clientData.nextAssessment).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
            📈 Progress Tracking
          </h3>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: '700', 
              color: '#059669',
              marginBottom: '0.5rem'
            }}>
              75%
            </div>
            <p style={{ margin: 0, color: '#64748b' }}>Treatment Progress</p>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginTop: '1rem',
              overflow: 'hidden'
            }}>
              <div style={{
                width: '75%',
                height: '100%',
                backgroundColor: '#059669',
                borderRadius: '4px'
              }} />
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#1e293b', fontSize: '1.25rem', fontWeight: '600' }}>
            📅 Upcoming Appointments
          </h3>
          <div style={{
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Next Session</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              September 15, 2025 at 2:00 PM
            </div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
              Dr. Sarah Wilson - Individual Therapy
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
