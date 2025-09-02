'use client';

import { useState, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  description: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'hearing',
    description: ''
  });

  useEffect(() => {
    const savedEvents = localStorage.getItem('lawyer_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Demo veriler
      const demoEvents = [
        { id: 1, title: 'Boşanma Davası Duruşması', date: '2025-09-05', time: '10:30', type: 'hearing', description: 'İstanbul 3. Aile Mahkemesi' },
        { id: 2, title: 'Müvekkil Görüşmesi', date: '2025-09-04', time: '14:00', type: 'meeting', description: 'Ayşe Hanım ile görüşme' }
      ];
      setEvents(demoEvents);
      localStorage.setItem('lawyer_events', JSON.stringify(demoEvents));
    }
  }, []);

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert('Başlık ve tarih zorunludur');
      return;
    }

    const event: Event = {
      id: Date.now(),
      ...newEvent
    };

    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    localStorage.setItem('lawyer_events', JSON.stringify(updatedEvents));
    
    setNewEvent({ title: '', date: '', time: '', type: 'hearing', description: '' });
    setShowNewEventForm(false);
  };

  const deleteEvent = (id: number) => {
    const updatedEvents = events.filter(e => e.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('lawyer_events', JSON.stringify(updatedEvents));
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem'}}>Takvim</h1>
        <button onClick={() => setShowNewEventForm(true)} style={{
          padding: '0.75rem 1.5rem',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}>
          + Yeni Etkinlik
        </button>
      </div>

      {showNewEventForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
          <h3 style={{marginBottom: '1rem'}}>Yeni Etkinlik Ekle</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Başlık</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Tarih</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Saat</label>
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Tür</label>
              <select
                value={newEvent.type}
                onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              >
                <option value="hearing">Duruşma</option>
                <option value="meeting">Görüşme</option>
                <option value="deadline">Son Tarih</option>
                <option value="other">Diğer</option>
              </select>
            </div>
          </div>
          <div style={{marginTop: '1rem'}}>
            <label style={{display: 'block', marginBottom: '0.25rem'}}>Açıklama</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '80px'}}
            />
          </div>
          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
            <button onClick={addEvent} style={{
              padding: '0.5rem 1rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Kaydet
            </button>
            <button onClick={() => setShowNewEventForm(false)} style={{
              padding: '0.5rem 1rem',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              İptal
            </button>
          </div>
        </div>
      )}

      <div style={{background: 'white', borderRadius: '0.5rem', overflow: 'hidden'}}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{background: '#f8fafc'}}>
              <th style={{padding: '1rem', textAlign: 'left'}}>Başlık</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Tarih</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Saat</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Tür</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Açıklama</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '1rem'}}>{event.title}</td>
                <td style={{padding: '1rem'}}>{event.date}</td>
                <td style={{padding: '1rem'}}>{event.time}</td>
                <td style={{padding: '1rem'}}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: event.type === 'hearing' ? '#fee2e2' : event.type === 'meeting' ? '#dbeafe' : '#fef3c7',
                    color: event.type === 'hearing' ? '#991b1b' : event.type === 'meeting' ? '#1e40af' : '#92400e',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}>
                    {event.type === 'hearing' ? 'Duruşma' : event.type === 'meeting' ? 'Görüşme' : event.type === 'deadline' ? 'Son Tarih' : 'Diğer'}
                  </span>
                </td>
                <td style={{padding: '1rem'}}>{event.description}</td>
                <td style={{padding: '1rem'}}>
                  <button onClick={() => deleteEvent(event.id)} style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
