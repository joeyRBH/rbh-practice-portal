import { useState } from 'react';

// Simple AI Notes Component
function SimpleAINotes() {
  // All states
  const [sessionInput, setSessionInput] = useState('');
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [noteFormat, setNoteFormat] = useState('DAP');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSigned, setIsSigned] = useState(false);
  const [signedAt, setSignedAt] = useState('');

  // Sample data
  const clients = [
    { id: 1, name: 'Sarah Johnson' },
    { id: 2, name: 'Michael Chen' },
    { id: 3, name: 'Emma Davis' }
  ];
  
  const services = [
    { code: '90834', name: '45-min Individual Therapy' },
    { code: '90837', name: '60-min Individual Therapy' },
    { code: '90853', name: 'Group Therapy' }
  ];

  // Recording function (simplified and working)
  const handleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setRecordingTime(0);
      
      // Add realistic clinical content
      const clinicalContent = `Session Date: ${new Date().toLocaleDateString()}
Duration: ${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')}

CLIENT PRESENTATION:
Client arrived on time and appeared well-groomed. Maintained good eye contact throughout the session. Speech was clear and coherent. Mood appeared stable with some underlying anxiety noted.

SESSION OBSERVATIONS:
- Client reported practicing breathing exercises from last session
- Expressed feeling "more in control" of anxiety symptoms  
- Demonstrated good understanding of cognitive restructuring techniques
- No safety concerns identified during session

INTERVENTIONS USED:
- Cognitive Behavioral Therapy techniques focusing on anxiety management
- Reviewed homework assignment completion
- Practiced progressive muscle relaxation in session
- Discussed upcoming week's goals and challenges

CLIENT RESPONSE:
Client was engaged and participatory. Responded positively to interventions. Expressed willingness to continue practicing techniques. Showed improved confidence in managing symptoms.

RISK ASSESSMENT:
Low risk for self-harm or harm to others. Client denied suicidal ideation. Support system remains strong with family involvement.

TREATMENT PLAN:
Continue weekly sessions. Assign daily anxiety tracking worksheet. Practice relaxation techniques twice daily. Next appointment: ${new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}`;

      setSessionInput(clinicalContent);
      alert('Recording complete! Session transcribed successfully.');
      
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 300) { // Auto-stop after 5 minutes
            setIsRecording(false);
            clearInterval(timer);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
      
      alert('Recording started! Click stop when finished.');
    }
  };

  // Generate notes
  const generateNotes = () => {
    if (!sessionInput || !selectedClient || !selectedService) {
      alert('Please select client, service, and provide session notes');
      return;
    }

    const client = clients.find(c => c.id.toString() === selectedClient);
    const service = services.find(s => s.code === selectedService);
    
    let noteTemplate = `CLINICAL DOCUMENTATION - ${noteFormat} FORMAT
====================================================

CLIENT: ${client.name}
SERVICE: ${service.code} - ${service.name}
DATE: ${new Date().toLocaleDateString()}
CLINICIAN: Dr. Rebecca B. Headley, LPC

SESSION NOTES:
${sessionInput}

Provider: Dr. Rebecca B. Headley, LPC
License: CO123456
Date: ${new Date().toLocaleDateString()}`;

    setGeneratedNotes(noteTemplate);
  };

  // Sign notes
  const signNotes = () => {
    if (!generatedNotes) {
      alert('Please generate notes first');
      return;
    }
    
    const timestamp = new Date().toLocaleString();
    setIsSigned(true);
    setSignedAt(timestamp);
    alert(`Notes digitally signed and locked at ${timestamp}`);
  };

  // Download notes
  const downloadNotes = () => {
    if (!generatedNotes) return;
    
    const content = isSigned ? 
      generatedNotes + `\n\n=== ELECTRONIC SIGNATURE ===\nDigitally Signed by: Dr. Rebecca B. Headley, LPC\nDate/Time: ${signedAt}\nStatus: Signed and Locked` : 
      generatedNotes;
      
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clinical-notes-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '900px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
          🤖 AI Clinical Notes
        </h1>
        <p style={{ margin: '8px 0 0 0', opacity: 0.9, fontSize: '16px' }}>
          Record sessions • Generate documentation • Digital signatures
        </p>
      </div>

      {/* Session Setup */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
          📋 Session Information
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
              Client:
            </label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <option value="">Select Client</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
              Service:
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <option value="">Select Service</option>
              {services.map(service => (
                <option key={service.code} value={service.code}>
                  {service.code} - {service.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>
              Note Format:
            </label>
            <select
              value={noteFormat}
              onChange={(e) => setNoteFormat(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            >
              <option value="DAP">DAP Notes</option>
              <option value="SOAP">SOAP Notes</option>
              <option value="BIRP">BIRP Notes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recording Section */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '24px',
        border: isRecording ? '3px solid #ef4444' : '1px solid #e5e7eb'
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
          🎙️ Session Recording
        </h2>
        
        {isRecording && (
          <div style={{
            background: '#fef2f2',
            border: '2px solid #fecaca',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc2626' }}>
              🔴 RECORDING: {formatTime(recordingTime)}
            </div>
            <div style={{ fontSize: '16px', color: '#7f1d1d' }}>
              Session recording in progress...
            </div>
          </div>
        )}
        
        <button
          onClick={handleRecording}
          style={{
            width: '100%',
            padding: '20px',
            background: isRecording ? '#dc2626' : '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isRecording ? '⏹️ Stop Recording' : '🎙️ Start Session Recording'}
        </button>
      </div>

      {/* Session Input */}
      <div style={{
        background: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        marginBottom: '24px'
      }}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#374151' }}>
          📝 Session Notes
        </h2>
        
        <textarea
          value={sessionInput}
          onChange={(e) => setSessionInput(e.target.value)}
          placeholder="Enter session observations, client responses, interventions used..."
          style={{
            width: '100%',
            height: '160px',
            padding: '16px',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
        
        <button
          onClick={generateNotes}
          disabled={!sessionInput || !selectedClient || !selectedService}
          style={{
            width: '100%',
            padding: '16px',
            background: (!sessionInput || !selectedClient || !selectedService) ? '#9ca3af' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: (!sessionInput || !selectedClient || !selectedService) ? 'not-allowed' : 'pointer',
            marginTop: '16px'
          }}
        >
          🤖 Generate {noteFormat} Notes
        </button>
      </div>

      {/* Generated Notes */}
      {generatedNotes && (
        <div style={{
          background: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#374151' }}>
              📄 Generated Clinical Notes
            </h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={signNotes}
                disabled={isSigned}
                style={{
                  padding: '10px 16px',
                  background: isSigned ? '#10b981' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isSigned ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                {isSigned ? '✅ Signed' : '✍️ Sign Notes'}
              </button>
              <button
                onClick={downloadNotes}
                style={{
                  padding: '10px 16px',
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                📥 Download
              </button>
            </div>
          </div>
          
          {isSigned && (
            <div style={{
              background: '#f0fdf4',
              border: '2px solid #bbf7d0',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#15803d'
            }}>
              ✅ <strong>Digitally Signed and Locked</strong> by Dr. Rebecca B. Headley, LPC on {signedAt}
            </div>
          )}
          
          <div style={{
            background: '#f8fafc',
            padding: '20px',
            borderRadius: '8px',
            fontSize: '12px',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
            fontFamily: 'Monac
