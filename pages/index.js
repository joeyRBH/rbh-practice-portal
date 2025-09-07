export default function Home() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        color: '#333', 
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        RBH Practice Portal
      </h1>
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center'
      }}>
        <h2>Welcome to Your Practice Management System</h2>
        <p>This is a simplified version that will definitely deploy.</p>
        
        <button style={{
          backgroundColor: '#4f46e5',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          margin: '10px',
          cursor: 'pointer'
        }}>
          Client Login
        </button>
        
        <button style={{
          backgroundColor: '#059669',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          margin: '10px',
          cursor: 'pointer'
        }}>
          Therapist Login
        </button>
      </div>
    </div>
  )
}
