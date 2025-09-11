export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, subject, body, accessToken } = req.body;

  if (!to || !subject || !body || !accessToken) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const emailMessage = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      body
    ].join('\n');

    const encodedMessage = Buffer.from(emailMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedMessage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ 
        error: 'Failed to send email', 
        details: errorData.error?.message || 'Unknown error' 
      });
    }

    const result = await response.json();
    
    return res.status(200).json({
      success: true,
      messageId: result.id,
      threadId: result.threadId
    });

  } catch (error) {
    console.error('Gmail send error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
