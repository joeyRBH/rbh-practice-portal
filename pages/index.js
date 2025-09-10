<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile HIPAA Portal</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .portal-container {
            min-height: 100vh;
            display: flex;
        }

        /* Login Styles */
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 20px;
            width: 100%;
        }

        .login-card {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }

        .login-form {
            margin-top: 30px;
        }

        .login-input {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        .login-input:focus {
            outline: none;
            border-color: #667eea;
        }

        .login-btn {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 10px;
            transition: transform 0.2s;
        }

        .login-btn:hover {
            transform: translateY(-2px);
        }

        .hipaa-notice {
            margin-top: 20px;
            color: #666;
            font-size: 14px;
        }

        /* Mobile Header */
        .mobile-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            display: none;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            z-index: 1000;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .menu-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #333;
        }

        .header-user {
            font-size: 24px;
        }

        /* Mobile Navigation */
        .mobile-nav {
            position: fixed;
            top: 0;
            left: -300px;
            width: 300px;
            height: 100vh;
            background: white;
            z-index: 1001;
            transition: left 0.3s ease;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .mobile-nav.open {
            left: 0;
        }

        .mobile-nav-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }

        .mobile-nav-item {
            width: 100%;
            padding: 15px 20px;
            border: none;
            background: none;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
            transition: background-color 0.2s;
            font-size: 16px;
        }

        .mobile-nav-item:hover {
            background-color: #f5f5f5;
        }

        .mobile-nav-item.active {
            background-color: #667eea;
            color: white;
        }

        .mobile-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            display: none;
        }

        /* Desktop Navigation */
        .desktop-nav {
            width: 250px;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .nav-header {
            margin-bottom: 30px;
            text-align: center;
        }

        .user-badge {
            background: #667eea;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            margin-top: 10px;
            display: inline-block;
        }

        .nav-item {
            padding: 15px;
            border: none;
            background: none;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 15px;
            cursor: pointer;
            border-radius: 10px;
            transition: all 0.2s;
            font-size: 16px;
        }

        .nav-item:hover {
            background-color: rgba(102, 126, 234, 0.1);
        }

        .nav-item.active {
            background-color: #667eea;
            color: white;
        }

        .nav-icon {
            font-size: 20px;
        }

        /* Main Content */
        .main-content {
            flex: 1;
            padding: 30px;
            overflow-y: auto;
        }

        .content-section {
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 20px;
        }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
        }

        .stat-number, .stat-status {
            font-size: 2em;
            font-weight: bold;
            margin-top: 10px;
        }

        /* Activity */
        .recent-activity {
            margin-top: 30px;
        }

        .activity-list {
            margin-top: 15px;
        }

        .activity-item {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .activity-icon {
            font-size: 20px;
        }

        /* Appointments */
        .appointments-container {
            margin-top: 20px;
        }

        .appointment-card {
            display: flex;
            align-items: center;
            gap: 20px;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 15px;
        }

        .appointment-time {
            font-size: 1.2em;
            font-weight: bold;
            color: #667eea;
            min-width: 80px;
        }

        .appointment-info {
            flex: 1;
        }

        .appointment-info h4 {
            margin-bottom: 5px;
        }

        /* Buttons */
        .btn-primary, .btn-secondary, .btn-small {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .btn-secondary {
            background: #e9ecef;
            color: #333;
        }

        .btn-small {
            padding: 8px 15px;
            font-size: 12px;
            margin: 0 5px;
        }

        .btn-primary:hover, .btn-secondary:hover, .btn-small:hover {
            transform: translateY(-2px);
        }

        /* Notes */
        .notes-generator {
            margin-bottom: 30px;
        }

        .notes-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            margin-bottom: 15px;
            font-family: inherit;
            resize: vertical;
            min-height: 100px;
        }

        .generated-notes {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
        }

        .note-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin: 15px 0;
            line-height: 1.6;
        }

        /* Clients */
        .client-search {
            margin-bottom: 20px;
        }

        .search-input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e1e5e9;
            border-radius: 10px;
            font-size: 16px;
        }

        .client-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .client-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
            padding: 20px;
            border-radius: 15px;
        }

        .client-info h4 {
            margin-bottom: 5px;
        }

        .client-actions {
            display: flex;
            gap: 10px;
        }

        .hidden {
            display: none;
        }

        /* Mobile Responsive */
        @media (max-width: 767px) {
            .desktop-nav {
                display: none;
            }

            .mobile-header {
                display: flex !important;
            }

            .main-content {
                margin-top: 60px;
                padding: 20px;
            }

            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            .stat-card {
                padding: 20px;
            }

            .stat-number, .stat-status {
                font-size: 1.5em;
            }

            .appointment-card {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }

            .appointment-time {
                min-width: auto;
            }

            .client-card {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }

            .client-actions {
                width: 100%;
                justify-content: space-between;
            }

            .content-section {
                padding: 20px;
            }

            .btn-primary, .btn-secondary {
                width: 100%;
                margin-top: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="portal-container">
        <!-- Login Screen -->
        <div id="loginContainer" class="login-container">
            <div class="login-card">
                <h1>🏥 HIPAA Secure Portal</h1>
                <p>Healthcare Provider Access</p>
                <div class="login-form">
                    <input type="email" placeholder="Email" class="login-input" />
                    <input type="password" placeholder="Password" class="login-input" />
                    <button onclick="login()" class="login-btn">Secure Login</button>
                </div>
                <div class="hipaa-notice">
                    🔒 HIPAA-compliant secure access
                </div>
            </div>
        </div>

        <!-- Main Portal -->
        <div id="mainPortal" class="hidden">
            <!-- Mobile Header -->
            <header class="mobile-header">
                <button onclick="toggleMenu()" class="menu-btn">☰</button>
                <h1>HIPAA Portal</h1>
                <div class="header-user">👨‍⚕️</div>
            </header>

            <!-- Mobile Navigation -->
            <nav id="mobileNav" class="mobile-nav">
                <div class="mobile-nav-header">
                    <h3>🏥 HIPAA Portal</h3>
                    <button onclick="closeMenu()" class="close-btn">×</button>
                </div>
                <button onclick="showTab('dashboard')" class="mobile-nav-item active" data-tab="dashboard">
                    <span class="nav-icon">📊</span>
                    Dashboard
                </button>
                <button onclick="showTab('appointments')" class="mobile-nav-item" data-tab="appointments">
                    <span class="nav-icon">📅</span>
                    Appointments
                </button>
                <button onclick="showTab('clients')" class="mobile-nav-item" data-tab="clients">
                    <span class="nav-icon">👥</span>
                    Clients
                </button>
                <button onclick="showTab('notes')" class="mobile-nav-item" data-tab="notes">
                    <span class="nav-icon">🤖</span>
                    AI Notes
                </button>
                <button onclick="showTab('documents')" class="mobile-nav-item" data-tab="documents">
                    <span class="nav-icon">📋</span>
                    Documents
                </button>
                <button onclick="showTab('team')" class="mobile-nav-item" data-tab="team">
                    <span class="nav-icon">👨‍⚕️</span>
                    Team
                </button>
            </nav>

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <div class="nav-header">
                    <h2>🏥 HIPAA Portal</h2>
                    <span class="user-badge">Dr. Smith</span>
                </div>
                <button onclick="showTab('dashboard')" class="nav-item active" data-tab="dashboard">
                    <span class="nav-icon">📊</span>
                    Dashboard
                </button>
                <button onclick="showTab('appointments')" class="nav-item" data-tab="appointments">
                    <span class="nav-icon">📅</span>
                    Appointments
                </button>
                <button onclick="showTab('clients')" class="nav-item" data-tab="clients">
                    <span class="nav-icon">👥</span>
                    Clients
                </button>
                <button onclick="showTab('notes')" class="nav-item" data-tab="notes">
                    <span class="nav-icon">🤖</span>
                    AI Notes
                </button>
                <button onclick="showTab('documents')" class="nav-item" data-tab="documents">
                    <span class="nav-icon">📋</span>
                    Documents
                </button>
                <button onclick="showTab('team')" class="nav-item" data-tab="team">
                    <span class="nav-icon">👨‍⚕️</span>
                    Team
                </button>
            </nav>

            <!-- Main Content -->
            <main class="main-content">
                <!-- Dashboard -->
                <div id="dashboard" class="content-section">
                    <h2>📊 Dashboard</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <h3>Today's Appointments</h3>
                            <div class="stat-number">8</div>
                        </div>
                        <div class="stat-card">
                            <h3>Active Clients</h3>
                            <div class="stat-number">124</div>
                        </div>
                        <div class="stat-card">
                            <h3>HIPAA Compliance</h3>
                            <div class="stat-status">✅ Active</div>
                        </div>
                        <div class="stat-card">
                            <h3>Pending Notes</h3>
                            <div class="stat-number">3</div>
                        </div>
                    </div>
                    
                    <div class="recent-activity">
                        <h3>Recent Activity</h3>
                        <div class="activity-list">
                            <div class="activity-item">
                                <span class="activity-icon">📅</span>
                                <span>Appointment with Sarah Johnson at 2:00 PM</span>
                            </div>
                            <div class="activity-item">
                                <span class="activity-icon">📝</span>
                                <span>AI Notes generated for Michael Brown</span>
                            </div>
                            <div class="activity-item">
                                <span class="activity-icon">📋</span>
                                <span>Treatment plan updated for Lisa Davis</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Appointments -->
                <div id="appointments" class="content-section hidden">
                    <h2>📅 Appointments</h2>
                    <div class="appointments-container">
                        <div class="appointment-card">
                            <div class="appointment-time">2:00 PM</div>
                            <div class="appointment-info">
                                <h4>Sarah Johnson</h4>
                                <p>Therapy Session</p>
                                <button class="btn-primary">Join Video Call</button>
                            </div>
                        </div>
                        <div class="appointment-card">
                            <div class="appointment-time">3:30 PM</div>
                            <div class="appointment-info">
                                <h4>Michael Brown</h4>
                                <p>Initial Consultation</p>
                                <button class="btn-secondary">View Details</button>
                            </div>
                        </div>
                        <div class="appointment-card">
                            <div class="appointment-time">5:00 PM</div>
                            <div class="appointment-info">
                                <h4>Lisa Davis</h4>
                                <p>Follow-up Session</p>
                                <button class="btn-primary">Join Video Call</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Clients -->
                <div id="clients" class="content-section hidden">
                    <h2>👥 Client Management</h2>
                    <div class="client-search">
                        <input type="text" placeholder="Search clients..." class="search-input" />
                    </div>
                    <div class="client-list">
                        <div class="client-card">
                            <div class="client-info">
                                <h4>Sarah Johnson</h4>
                                <p>Last session: 2 days ago</p>
                            </div>
                            <div class="client-actions">
                                <button class="btn-small">View File</button>
                                <button class="btn-small">Schedule</button>
                            </div>
                        </div>
                        <div class="client-card">
                            <div class="client-info">
                                <h4>Michael Brown</h4>
                                <p>Last session: 5 days ago</p>
                            </div>
                            <div class="client-actions">
                                <button class="btn-small">View File</button>
                                <button class="btn-small">Schedule</button>
                            </div>
                        </div>
                        <div class="client-card">
                            <div class="client-info">
                                <h4>Lisa Davis</h4>
                                <p>Last session: 1 week ago</p>
                            </div>
                            <div class="client-actions">
                                <button class="btn-small">View File</button>
                                <button class="btn-small">Schedule</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI Notes -->
                <div id="notes" class="content-section hidden">
                    <h2>🤖 AI Clinical Notes</h2>
                    <div class="notes-generator">
                        <textarea class="notes-input" placeholder="Enter session details for AI note generation..." rows="4"></textarea>
                        <button onclick="generateNotes()" class="btn-primary">🤖 Generate AI Notes</button>
                    </div>
                    
                    <div id="generatedNotes" class="generated-notes" style="display: none;">
                        <h3>Generated Clinical Note</h3>
                        <div class="note-content">
                            <p><strong>Client:</strong> <span id="noteClient">Sarah Johnson</span></p>
                            <p><strong>Date:</strong> <span id="noteDate"></span></p>
                            <p><strong>Session Type:</strong> Individual Therapy</p>
                            <p><strong>Progress:</strong> Client demonstrated improved coping strategies and reduced anxiety symptoms.</p>
                            <p><strong>Plan:</strong> Continue CBT techniques, homework assignment for thought tracking.</p>
                        </div>
                        <button class="btn-secondary">Save to Client File</button>
                    </div>
                </div>

                <!-- Documents -->
                <div id="documents" class="content-section hidden">
                    <h2>📋 Documents</h2>
                    <p>Document management system coming soon...</p>
                </div>

                <!-- Team -->
                <div id="team" class="content-section hidden">
                    <h2>👨‍⚕️ Team Management</h2>
                    <p>Team management features coming soon...</p>
                </div>
            </main>

            <!-- Mobile Overlay -->
            <div id="mobileOverlay" class="mobile-overlay" onclick="closeMenu()"></div>
        </div>
    </div>

    <script>
        let isRecording = false;
        let recordingStartTime = null;
        let recordingInterval = null;

        function login() {
            document.getElementById('loginContainer').classList.add('hidden');
            document.getElementById('mainPortal').classList.remove('hidden');
        }

        function toggleMenu() {
            const nav = document.getElementById('mobileNav');
            const overlay = document.getElementById('mobileOverlay');
            nav.classList.add('open');
            overlay.style.display = 'block';
        }

        function closeMenu() {
            const nav = document.getElementById('mobileNav');
            const overlay = document.getElementById('mobileOverlay');
            nav.classList.remove('open');
            overlay.style.display = 'none';
        }

        function showTab(tabName) {
            // Hide all content sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.add('hidden'));

            // Show selected section
            const targetSection = document.getElementById(tabName);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }

            // Update navigation active states
            const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-tab') === tabName) {
                    item.classList.add('active');
                }
            });

            // Close mobile menu
            closeMenu();
        }

        function toggleRecording() {
            const recordBtn = document.getElementById('recordBtn');
            const uploadBtn = document.getElementById('uploadBtn');
            const status = document.getElementById('recordingStatus');

            if (!isRecording) {
                // Start recording
                isRecording = true;
                recordingStartTime = Date.now();
                recordBtn.textContent = '⏹️ Stop Recording';
                recordBtn.classList.remove('btn-primary');
                recordBtn.classList.add('btn-secondary');
                uploadBtn.style.display = 'inline-block';
                status.style.display = 'flex';

                // Start timer
                recordingInterval = setInterval(updateRecordingTime, 1000);
            } else {
                // Stop recording
                isRecording = false;
                recordBtn.textContent = '🎙️ Start Recording';
                recordBtn.classList.remove('btn-secondary');
                recordBtn.classList.add('btn-primary');
                status.style.display = 'none';
                clearInterval(recordingInterval);
                
                // Show success message
                alert('Recording saved! AI will process the audio for note generation.');
            }
        }

        function updateRecordingTime() {
            if (recordingStartTime) {
                const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                document.getElementById('recordingTime').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }

        function uploadAudio() {
            document.getElementById('audioFile').click();
        }

        function handleAudioUpload() {
            const file = document.getElementById('audioFile').files[0];
            if (file) {
                alert(`Audio file "${file.name}" uploaded successfully! AI will process it for note generation.`);
            }
        }

        function generateNotes() {
            const client = document.getElementById('clientSelect').value;
            const serviceCode = document.getElementById('serviceCode').value;
            const sessionNotes = document.getElementById('sessionNotes').value;

            if (!client) {
                alert('Please select a client first.');
                return;
            }

            if (!serviceCode) {
                alert('Please select a service code.');
                return;
            }

            // Update the generated note with selected values
            const clientNames = {
                'sarah_johnson': 'Sarah Johnson',
                'michael_brown': 'Michael Brown',
                'lisa_davis': 'Lisa Davis',
                'john_smith': 'John Smith'
            };

            const serviceCodes = {
                '90837': '90837 - Psychotherapy, 60 minutes',
                '00000': '00000 - Initial Assessment',
                '00001': '00001 - Follow-up Assessment',
                '0592T': '0592T - Digital Therapeutics',
                '90791': '90791 - Psychiatric Diagnostic Evaluation',
                '90792': '90792 - Psychiatric Diagnostic Evaluation with Medical Services',
                '90834': '90834 - Psychotherapy, 45 minutes',
                '90846': '90846 - Family Therapy without Patient',
                '90847': '90847 - Family Therapy with Patient',
                '90853': '90853 - Group Psychotherapy',
                '99205': '99205 - Office Visit, New Patient, 60-74 minutes',
                '99214': '99214 - Office Visit, Established Patient, 30-39 minutes',
                'H0001': 'H0001 - Alcohol/Drug Assessment',
                '+90833': '+90833 - Psychotherapy Add-on Code'
            };

            document.getElementById('noteClient').textContent = clientNames[client] || client;
            document.getElementById('noteServiceCode').textContent = serviceCodes[serviceCode] || serviceCode;
            document.getElementById('noteDate').textContent = new Date().toLocaleDateString();

            // Show enhanced note based on service type
            if (serviceCode === '90791' || serviceCode === '90792') {
                document.getElementById('noteSessionType').textContent = 'Psychiatric Evaluation';
                document.getElementById('noteDuration').textContent = '90 minutes';
                document.getElementById('noteConcerns').textContent = 'Initial psychiatric assessment, mood evaluation';
                document.getElementById('noteInterventions').textContent = 'Clinical interview, mental status exam, risk assessment';
            } else if (serviceCode === '90853') {
                document.getElementById('noteSessionType').textContent = 'Group Therapy';
                document.getElementById('noteDuration').textContent = '90 minutes';
                document.getElementById('noteConcerns').textContent = 'Group dynamics, interpersonal relationships';
                document.getElementById('noteInterventions').textContent = 'Group process facilitation, psychoeducation';
            } else if (serviceCode === '90846' || serviceCode === '90847') {
                document.getElementById('noteSessionType').textContent = 'Family Therapy';
                document.getElementById('noteDuration').textContent = '50 minutes';
                document.getElementById('noteConcerns').textContent = 'Family communication, relationship dynamics';
                document.getElementById('noteInterventions').textContent = 'Family systems therapy, communication skills training';
            } else {
                document.getElementById('noteSessionType').textContent = 'Individual Therapy';
                document.getElementById('noteDuration').textContent = serviceCode === '90834' ? '45 minutes' : '60 minutes';
                document.getElementById('noteConcerns').textContent = 'Anxiety, stress management, mood regulation';
                document.getElementById('noteInterventions').textContent = 'CBT techniques, mindfulness exercises, coping strategies';
            }

            const notesDiv = document.getElementById('generatedNotes');
            notesDiv.style.display = 'block';
            notesDiv.scrollIntoView({ behavior: 'smooth' });
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Portal initialized successfully');
        });
    </script>
</body>
</html>
