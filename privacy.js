export default function Privacy() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'Cambria, serif' }}>
      <h1>Privacy Policy - RBH Practice Portal</h1>
      <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
      
      <h2>Information We Collect</h2>
      <p>We collect only the information necessary to provide our healthcare management services, including appointment scheduling and calendar integration.</p>
      
      <h2>How We Use Your Information</h2>
      <p>Your information is used solely for appointment scheduling, calendar synchronization, and practice management purposes.</p>
      
      <h2>Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information in accordance with HIPAA requirements.</p>
      
      <h2>Contact Us</h2>
      <p>For privacy questions, contact us at: privacy@rbhpractice.com</p>
    </div>
  );
}
