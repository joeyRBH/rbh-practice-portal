export default async function handler(req, res) {
  const { accessToken } = req.headers;

  if (!accessToken) {
    return res.status(401).json({ error: 'Access token required' });
  }

  if (req.method === 'GET') {
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=' + 
        new Date().toISOString() + '&singleEvents=true&orderBy=startTime',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error?.message || 'Failed to fetch events' });
      }

      const events = await response.json();
      return res.status(200).json(events);

    } catch (error) {
      console.error('Calendar fetch error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { summary, description, start, end, attendees } = req.body;

      if (!summary || !start || !end) {
        return res.status(400).json({ error: 'Missing required event parameters' });
      }

      const eventData = {
        summary,
        description,
        start: {
          dateTime: start,
          timeZone: 'America/Denver',
        },
        end: {
          dateTime: end,
          timeZone: 'America/Denver',
        },
        attendees: attendees ? attendees.map(email => ({ email })) : [],
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(7),
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        }
      };

      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ error: errorData.error?.message || 'Failed to create event' });
      }

      const event = await response.json();
      return res.status(200).json(event);

    } catch (error) {
      console.error('Calendar create error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
