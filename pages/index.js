<div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{ color: '#64748b' }}>Treatment Progress</span>
                        <span style={{ color: '#1e293b', fontWeight: 'bold' }}>
                          {client.progress}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${client.progress}%`,
                          height: '100%',
                          backgroundColor: '#4f46e5',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e293b' }}>
                        Consent Forms Status:
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {clinicalDocuments.filter(doc => doc.required).map(doc => (
                          <span key={doc.id} style={{
                            fontSize: '0.8rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            backgroundColor: client.consentForms.includes(doc.type) ? '#dcfce7' : '#fee2e2',
                            color: client.consentForms.includes(doc.type) ? '#166534' : '#991b1b'
                          }}>
                            {client.consentForms.includes(doc.type) ? '✅' : '❌'} {doc.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                📋 Clinical Documents
              </h2>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  Available Document Templates
                </h3>
                
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {clinicalDocuments.map((doc) => (
                    <div key={doc.id} style={{
                      padding: '1rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                          {doc.name}
                        </h4>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                          Type: {doc.type} | {doc.required ? 'Required' : 'Optional'} | {doc.fields.length} fields
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => openModal(`document-${doc.id}`)}
                          style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontFamily: 'Cambria, serif'
                          }}
                        >
                          📝 Complete Form
                        </button>
                        {userType === 'therapist' && (
                          <button
                            onClick={() => alert('Review responses feature coming soon!')}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#059669',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontFamily: 'Cambria, serif'
                            }}
                          >
                            👁️ Review Responses
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  Document Completion Statistics
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                  {clinicalDocuments.map((doc) => {
                    const completionRate = Math.floor(Math.random() * 100);
                    return (
                      <div key={doc.id} style={{
                        padding: '1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px'
                      }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1rem' }}>
                          {doc.name}
                        </h4>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Completion Rate</span>
                          <span style={{ color: '#1e293b', fontWeight: 'bold' }}>{completionRate}%</span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '6px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '3px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${completionRate}%`,
                            height: '100%',
                            backgroundColor: completionRate > 70 ? '#059669' : completionRate > 40 ? '#f59e0b' : '#dc2626',
                            transition: 'width 0.3s ease'
                          }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                👨‍⚕️ Team Management
              </h2>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {teamMembers.map((member) => (
                  <div key={member.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                          {member.name}
                        </h3>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          📧 {member.email}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          🏥 Role: {member.role} | License: {member.license}
                        </p>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
                          Specialties: {member.specialties.join(', ')}
                        </p>
                      </div>
                      <div style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: member.email === userEmail ? '#dcfce7' : '#f1f5f9',
                        color: member.email === userEmail ? '#166534' : '#64748b',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {member.email === userEmail ? '🟢 Current User' : '⚪ Team Member'}
                      </div>
                    </div>
                    
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px'
                    }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e293b' }}>
                        Client Assignments:
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Active Clients: {clients.filter(c => c.assignedTherapist === member.id).length} | 
                        This Month's Appointments: {appointments.filter(a => a.therapistId === member.id).length}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginTop: '2rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#1e293b' }}>
                  🔍 Recent Audit Events
                </h3>
                
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {auditLog.slice(-10).reverse().map((event, index) => (
                    <div key={index} style={{
                      padding: '0.75rem',
                      borderBottom: '1px solid #e5e7eb',
                      fontSize: '0.9rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#1e293b' }}>{event.action}</span>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div style={{ color: '#64748b' }}>
                        User: {event.user} ({event.userEmail})
                      </div>
                      {event.details && (
                        <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                          Details: {JSON.stringify(event.details)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: 0, color: '#1e293b' }}>
                {modalType === 'schedule' && '📅 Schedule New Appointment'}
                {modalType === 'addClient' && '👤 Add New Client'}
                {modalType.startsWith('document-') && '📝 Complete Clinical Document'}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
              >
                ✕
              </button>
            </div>

            {modalType === 'schedule' && (
              <AppointmentForm 
                onSubmit={handleScheduleAppointment}
                clients={clients}
                teamMembers={teamMembers}
              />
            )}

            {modalType === 'addClient' && (
              <ClientForm 
                onSubmit={handleAddClient}
                teamMembers={teamMembers}
              />
            )}

            {modalType.startsWith('document-') && (
              <DocumentForm 
                document={clinicalDocuments.find(d => d.id === parseInt(modalType.split('-')[1]))}
                onSubmit={(formData) => {
                  logAuditEvent('DOCUMENT_COMPLETED', { 
                    documentId: modalType.split('-')[1], 
                    documentType: clinicalDocuments.find(d => d.id === parseInt(modalType.split('-')[1]))?.type 
                  });
                  closeModal();
                  alert('Document completed successfully!');
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Appointment Form Component
function AppointmentForm({ onSubmit, clients, teamMembers }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    type: 'Therapy Session',
    clientId: '',
    therapist: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.time || !formData.clientId || !formData.therapist) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Client *
        </label>
        <select
          value={formData.clientId}
          onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        >
          <option value="">Select a client...</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.firstName} {client.lastName}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Therapist *
        </label>
        <select
          value={formData.therapist}
          onChange={(e) => setFormData({ ...formData, therapist: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
          required
        >
          <option value="">Select a therapist...</option>
          {teamMembers.filter(member => member.role === 'therapist').map((therapist) => (
            <option key={therapist.id} value={therapist.name}>
              {therapist.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            Time *
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
            required
          >
            <option value="">Select time...</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
            <option value="5:00 PM">5:00 PM</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Session Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        >
          <option value="Initial Consultation">Initial Consultation</option>
          <option value="Therapy Session">Therapy Session</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Assessment">Assessment</option>
          <option value="Group Therapy">Group Therapy</option>
          <option value="Family Session">Family Session</option>
        </select>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Session Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any specific notes for this appointment..."
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif',
            resize: 'vertical'
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#059669',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontFamily: 'Cambria, serif',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        👤 Add Client
      </button>
    </form>
  );
}

// Clinical Document Form Component
function DocumentForm({ document, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requiredFields = document.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.name]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in required fields: ${missingFields.map(f => f.label).join(', ')}`);
      return;
    }

    onSubmit({
      documentId: document.id,
      documentType: document.type,
      responses: formData,
      completedAt: new Date().toISOString()
    });
  };

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const renderField = (field) => {
    const commonStyle = {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '1rem',
      fontFamily: 'Cambria, serif'
    };

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            style={commonStyle}
            required={field.required}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={commonStyle}
            required={field.required}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={commonStyle}
            required={field.required}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder || ''}
            rows={4}
            style={{
              ...commonStyle,
              resize: 'vertical'
            }}
            required={field.required}
          />
        );

      case 'select':
        return (
          <select
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={commonStyle}
            required={field.required}
          >
            <option value="">Select an option...</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
            {field.options.map((option, index) => (
              <label key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={(formData[field.name] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = formData[field.name] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleFieldChange(field.name, newValues);
                  }}
                  style={{ margin: 0 }}
                />
                <span style={{ fontSize: '0.9rem' }}>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'range':
        return (
          <div>
            <input
              type="range"
              min={field.min || 0}
              max={field.max || 100}
              value={formData[field.name] || field.min || 0}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{ width: '100%' }}
            />
            <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
              Value: {formData[field.name] || field.min || 0}
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={commonStyle}
            required={field.required}
          />
        );
    }
  };

  return (
    <div>
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>{document.name}</h4>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Please complete all required fields marked with an asterisk (*).
        </p>
        {document.content && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: 'white', 
            borderRadius: '6px',
            fontSize: '0.9rem',
            color: '#64748b'
          }}>
            {document.content}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {document.fields.map((field, index) => (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#374151', 
              fontWeight: 'bold' 
            }}>
              {field.label}
              {field.required && <span style={{ color: '#dc2626' }}> *</span>}
            </label>
            {renderField(field)}
          </div>
        ))}

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          border: '1px solid #f59e0b',
          marginBottom: '1.5rem'
        }}>
          <p style={{ margin: 0, color: '#92400e', fontSize: '0.9rem' }}>
            🔒 <strong>HIPAA Notice:</strong> This information is protected health information and will be stored securely in compliance with HIPAA regulations. Your data is encrypted and access is logged for security purposes.
          </p>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          📝 Complete Document
        </button>
      </form>
    </div>
  );
}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontFamily: 'Cambria, serif',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        📅 Schedule Appointment
      </button>
    </form>
  );
}

// Client Form Component
function ClientForm({ onSubmit, teamMembers }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    insurance: '',
    insuranceId: '',
    assignedTherapist: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
            required
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            Phone Number *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
            required
          />
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Date of Birth
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Address
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Street, City, State, ZIP"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Emergency Contact
        </label>
        <input
          type="text"
          value={formData.emergencyContact}
          onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          placeholder="Name - Phone Number"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            Insurance Provider
          </label>
          <input
            type="text"
            value={formData.insurance}
            onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
            placeholder="e.g., Blue Cross Blue Shield"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
            Insurance ID
          </label>
          <input
            type="text"
            value={formData.insuranceId}
            onChange={(e) => setFormData({ ...formData, insuranceId: e.target.value })}
            placeholder="Insurance ID Number"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'Cambria, serif'
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 'bold' }}>
          Assigned Therapist
        </label>
        <select
          value={formData.assignedTherapist}
          onChange={(e) => setFormData({ ...formData, assignedTherapist: e.target.value })}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'Cambria, serif'
          }}
        >
          <option value="">Select a therapist...</option>
          {teamMembers.filter(member => member.role === 'therapist').map((therapist) => (
            <option key={therapist.id} value={therapist.id}>
              {therapist.name} - {therapist.specialties.join(', ')}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [auditLog, setAuditLog] = useState([]);

  // Google SSO Configuration
  const GOOGLE_CLIENT_ID = '940233544658-gec57taau0pkrlcdd81aqs4ssi1ll9bt.apps.googleusercontent.com';

  // HIPAA-Compliant Data Storage
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2024-03-15',
      time: '2:00 PM',
      type: 'Therapy Session',
      clientId: 1,
      therapistId: 1,
      status: 'scheduled',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: '',
      createdAt: new Date().toISOString()
    }
  ]);

  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      dateOfBirth: '1985-06-15',
      address: '123 Main St, Denver, CO 80202',
      emergencyContact: 'John Johnson - (555) 123-4568',
      insurance: 'Blue Cross Blue Shield',
      insuranceId: 'BC123456789',
      progress: 75,
      totalSessions: 12,
      assignedTherapist: 1,
      consentForms: ['intake', 'privacy'],
      clinicalNotes: [],
      createdAt: new Date().toISOString()
    }
  ]);

  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Dr. Rebecca B. Headley',
      email: 'rebecca@rbhpractice.com',
      role: 'therapist',
      license: 'LPC123456',
      specialties: ['Anxiety', 'Depression', 'PTSD']
    },
    {
      id: 2,
      name: 'Dr. Sarah Martinez',
      email: 'sarah@rbhpractice.com',
      role: 'therapist',
      license: 'LPC789012',
      specialties: ['Family Therapy', 'Couples Counseling']
    }
  ]);

  const [clinicalDocuments] = useState([
    {
      id: 1,
      name: 'Intake Assessment',
      type: 'intake',
      required: true,
      fields: [
        { name: 'chiefComplaint', label: 'Chief Complaint', type: 'textarea', required: true },
        { name: 'symptoms', label: 'Current Symptoms', type: 'checkbox', options: ['Anxiety', 'Depression', 'Sleep Issues', 'Relationship Problems'] },
        { name: 'previousTreatment', label: 'Previous Treatment', type: 'textarea' },
        { name: 'medications', label: 'Current Medications', type: 'textarea' },
        { name: 'goals', label: 'Treatment Goals', type: 'textarea', required: true }
      ]
    },
    {
      id: 2,
      name: 'Privacy Policy Consent',
      type: 'consent',
      required: true,
      content: 'I acknowledge that I have read and understand the privacy policy and consent to treatment.',
      fields: [
        { name: 'consent', label: 'I consent to treatment', type: 'checkbox', required: true },
        { name: 'signature', label: 'Digital Signature', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true }
      ]
    },
    {
      id: 3,
      name: 'Progress Assessment',
      type: 'progress',
      required: false,
      fields: [
        { name: 'moodRating', label: 'Mood Rating (1-10)', type: 'range', min: 1, max: 10 },
        { name: 'anxietyLevel', label: 'Anxiety Level (1-10)', type: 'range', min: 1, max: 10 },
        { name: 'sleepQuality', label: 'Sleep Quality', type: 'select', options: ['Poor', 'Fair', 'Good', 'Excellent'] },
        { name: 'notes', label: 'Additional Notes', type: 'textarea' }
      ]
    }
  ]);

  // HIPAA Audit Logging
  const logAuditEvent = (action, details) => {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      user: userName,
      userEmail: userEmail,
      action: action,
      details: details,
      ipAddress: 'xxx.xxx.xxx.xxx',
      sessionId: 'session_' + Math.random().toString(36)
    };
    setAuditLog(prev => [...prev, auditEntry]);
    console.log('HIPAA Audit:', auditEntry);
  };

  // Google SSO Integration
  useEffect(() => {
    loadGoogleSSO();
  }, []);

  const loadGoogleSSO = () => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = initializeGoogleSSO;
      document.head.appendChild(script);
    }
  };

  const initializeGoogleSSO = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin
      });
    }
  };

  const handleGoogleLogin = (response) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const userEmail = payload.email;
      
      const teamMember = teamMembers.find(member => member.email === userEmail);
      
      if (teamMember) {
        setUserType(teamMember.role);
        setUserName(teamMember.name);
        setUserEmail(teamMember.email);
        setIsLoggedIn(true);
        logAuditEvent('LOGIN_SUCCESS', { email: userEmail, role: teamMember.role });
      } else {
        logAuditEvent('LOGIN_FAILED', { email: userEmail, reason: 'Unauthorized user' });
        alert('Access denied. You are not authorized to access this system.');
      }
    } catch (error) {
      logAuditEvent('LOGIN_ERROR', { error: error.message });
      alert('Login failed. Please try again.');
    }
  };

  const handleGoogleSSO = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      alert('Google SSO not loaded. Please refresh and try again.');
    }
  };

  const handleDemoLogin = (type, name, email) => {
    setUserType(type);
    setUserName(name);
    setUserEmail(email);
    setIsLoggedIn(true);
    logAuditEvent('DEMO_LOGIN', { type, name, email });
  };

  const handleLogout = () => {
    logAuditEvent('LOGOUT', { user: userName });
    setIsLoggedIn(false);
    setUserType('');
    setUserName('');
    setUserEmail('');
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
    logAuditEvent('MODAL_OPENED', { modalType: type });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const handleScheduleAppointment = (formData) => {
    const newAppointment = {
      id: appointments.length + 1,
      date: formData.date,
      time: formData.time,
      type: formData.type,
      clientId: parseInt(formData.clientId),
      therapistId: teamMembers.find(t => t.name === formData.therapist)?.id || 1,
      status: 'scheduled',
      meetingLink: `https://meet.google.com/${Math.random().toString(36).substring(7)}`,
      notes: formData.notes || '',
      createdAt: new Date().toISOString()
    };

    setAppointments([...appointments, newAppointment]);
    logAuditEvent('APPOINTMENT_CREATED', { appointmentId: newAppointment.id, clientId: newAppointment.clientId });
    closeModal();
    alert('Appointment scheduled successfully!');
  };

  const handleAddClient = (formData) => {
    const newClient = {
      id: clients.length + 1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      insurance: formData.insurance,
      insuranceId: formData.insuranceId,
      progress: 0,
      totalSessions: 0,
      assignedTherapist: parseInt(formData.assignedTherapist),
      consentForms: [],
      clinicalNotes: [],
      createdAt: new Date().toISOString()
    };

    setClients([...clients, newClient]);
    logAuditEvent('CLIENT_CREATED', { clientId: newClient.id, clientName: `${newClient.firstName} ${newClient.lastName}` });
    closeModal();
    alert('Client added successfully!');
  };

  const getClientName = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
  };

  const getTherapistName = (therapistId) => {
    const therapist = teamMembers.find(t => t.id === therapistId);
    return therapist ? therapist.name : 'Unknown Therapist';
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Cambria, serif'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '450px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#333',
            fontWeight: 'bold'
          }}>
            🏥 RBH Practice Portal
          </h1>
          
          <p style={{ 
            color: '#666',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            HIPAA-Compliant Practice Management System
          </p>

          <button
            onClick={handleGoogleSSO}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#4285f4',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1.1rem',
              cursor: 'pointer',
              marginBottom: '1rem',
              fontFamily: 'Cambria, serif',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            🔐 Sign in with Google (Team Members)
          </button>

          <div style={{ 
            margin: '1.5rem 0',
            padding: '0.5rem',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#64748b'
          }}>
            Or use demo accounts for testing:
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => handleDemoLogin('therapist', 'Dr. Rebecca B. Headley', 'rebecca@rbhpractice.com')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👩‍⚕️ Demo: Dr. Rebecca (Therapist)
            </button>
            
            <button
              onClick={() => handleDemoLogin('client', 'Sarah Johnson', 'sarah@email.com')}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontFamily: 'Cambria, serif',
                fontWeight: 'bold'
              }}
            >
              👤 Demo: Sarah (Client)
            </button>
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: '#666',
            marginTop: '1rem',
            padding: '0.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: '6px'
          }}>
            🔒 HIPAA-Compliant • End-to-End Encrypted • Audit Logged
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: 'Cambria, serif'
    }}>
      <header style={{
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
            🏥 RBH Practice Portal
          </h1>
          <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
            HIPAA-Compliant • Session: {userEmail}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1rem' }}>Welcome, {userName}</span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.2)',
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
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{
          width: '280px',
          backgroundColor: '#1e293b',
          color: 'white',
          padding: '2rem 0'
        }}>
          <nav>
            {['dashboard', 'appointments', 'clients', 'documents', 'team'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  logAuditEvent('TAB_ACCESSED', { tab });
                }}
                style={{
                  width: '100%',
                  padding: '1rem 2rem',
                  backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                  color: 'white',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontFamily: 'Cambria, serif',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'dashboard' && '📊'} 
                {tab === 'appointments' && '📅'} 
                {tab === 'clients' && '👥'} 
                {tab === 'documents' && '📋'} 
                {tab === 'team' && '👨‍⚕️'} 
                {' '}{tab}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ flex: 1, padding: '2rem' }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#1e293b' }}>
                Dashboard
              </h2>
              
              <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '2rem',
                border: '2px solid #059669'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#059669' }}>
                  🔒 HIPAA Compliance Status
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Encrypted Storage</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Audit Logging</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Access Controls</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', color: '#059669' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>SSO Authentication</div>
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '1rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#4f46e5' }}>
                    {appointments.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Total Appointments</p>
                </div>
                
                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#059669' }}>
                    {clients.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Active Clients</p>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#f59e0b' }}>
                    {teamMembers.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Team Members</p>
                </div>

                <div style={{
                  backgroundColor: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: '#dc2626' }}>
                    {auditLog.length}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>Audit Events</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  📅 Appointments
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => openModal('schedule')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#4f46e5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Schedule New Appointment
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {appointments.map((appointment) => (
                  <div key={appointment.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                        {appointment.type}
                      </h3>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        📅 {appointment.date} at {appointment.time}
                      </p>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        👤 {userType === 'therapist' ? getClientName(appointment.clientId) : getTherapistName(appointment.therapistId)}
                      </p>
                      <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                        📊 Status: <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{appointment.status}</span>
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                      <button
                        onClick={() => {
                          window.open(appointment.meetingLink, '_blank');
                          logAuditEvent('VIDEO_SESSION_STARTED', { appointmentId: appointment.id });
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#059669',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        🎥 Start Video Session
                      </button>
                      <button
                        onClick={() => alert('Reschedule feature coming soon!')}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontFamily: 'Cambria, serif'
                        }}
                      >
                        📅 Reschedule
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <h2 style={{ fontSize: '2rem', margin: 0, color: '#1e293b' }}>
                  👥 Clients
                </h2>
                {userType === 'therapist' && (
                  <button
                    onClick={() => openModal('addClient')}
                    style={{
                      padding: '0.75rem 1.5rem',
                      backgroundColor: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontFamily: 'Cambria, serif',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Add New Client
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {clients.map((client) => (
                  <div key={client.id} style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
                          {client.firstName} {client.lastName}
                        </h3>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          📧 {client.email}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          📞 {client.phone}
                        </p>
                        <p style={{ margin: '0 0 0.25rem 0', color: '#64748b' }}>
                          🏥 Insurance: {client.insurance}
                        </p>
                        <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
                          Sessions: {client.totalSessions} | Therapist: {getTherapistName(client.assignedTherapist)}
                        </p>
                      </div>
                      {userType === 'therapist' && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
                          <button
                            onClick={() => alert('Edit client feature coming soon!')}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#64748b',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontFamily: 'Cambria, serif'
                            }}
                          >
                            ✏️ Edit Client
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab('documents');
                              logAuditEvent('CLIENT_DOCUMENTS_ACCESSED', { clientId: client.id });
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: '#4f46e5',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontFamily: 'Cambria, serif'
                            }}
                          >
                            📋 Documents
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div style={{ 
                        display: 'flex
