'use client';

import { useState, useEffect } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  caseNo: string;
  date: string;
  category: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showNewNoteForm, setShowNewNoteForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    caseNo: '',
    category: 'general'
  });

  useEffect(() => {
    const savedNotes = localStorage.getItem('lawyer_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      const demoNotes = [
        { id: 1, title: 'Duruşma Notları', content: 'Tanık ifadeleri alındı, bir sonraki duruşmada karar verilecek.', caseNo: '2025/123', date: '2025-09-01', category: 'hearing' },
        { id: 2, title: 'Müvekkil Görüşmesi', content: 'Müvekkil ile anlaşma şartları görüşüldü.', caseNo: '2025/456', date: '2025-08-28', category: 'meeting' }
      ];
      setNotes(demoNotes);
      localStorage.setItem('lawyer_notes', JSON.stringify(demoNotes));
    }
  }, []);

  const addNote = () => {
    if (!newNote.title || !newNote.content) {
      alert('Başlık ve içerik zorunludur');
      return;
    }

    const note: Note = {
      id: Date.now(),
      ...newNote,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    localStorage.setItem('lawyer_notes', JSON.stringify(updatedNotes));
    
    setNewNote({ title: '', content: '', caseNo: '', category: 'general' });
    setShowNewNoteForm(false);
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(n => n.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem('lawyer_notes', JSON.stringify(updatedNotes));
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem'}}>Notlar</h1>
        <button onClick={() => setShowNewNoteForm(true)} style={{
          padding: '0.75rem 1.5rem',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}>
          + Yeni Not
        </button>
      </div>

      {showNewNoteForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
          <h3 style={{marginBottom: '1rem'}}>Yeni Not Ekle</h3>
          <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Başlık</label>
              <input
                type="text"
                value={newNote.title}
                onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Dava No</label>
              <input
                type="text"
                value={newNote.caseNo}
                onChange={(e) => setNewNote({...newNote, caseNo: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                placeholder="Opsiyonel"
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Kategori</label>
              <select
                value={newNote.category}
                onChange={(e) => setNewNote({...newNote, category: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              >
                <option value="general">Genel</option>
                <option value="hearing">Duruşma</option>
                <option value="meeting">Görüşme</option>
                <option value="research">Araştırma</option>
              </select>
            </div>
          </div>
          <div style={{marginTop: '1rem'}}>
            <label style={{display: 'block', marginBottom: '0.25rem'}}>İçerik</label>
            <textarea
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '120px'}}
            />
          </div>
          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
            <button onClick={addNote} style={{
              padding: '0.5rem 1rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Kaydet
            </button>
            <button onClick={() => setShowNewNoteForm(false)} style={{
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

      <div style={{display: 'grid', gap: '1rem'}}>
        {notes.map(note => (
          <div key={note.id} style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600'}}>{note.title}</h3>
              <button onClick={() => deleteNote(note.id)} style={{
                color: '#dc2626',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}>
                Sil
              </button>
            </div>
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
              <span style={{
                padding: '0.25rem 0.75rem',
                background: '#e0e7ff',
                color: '#3730a3',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}>
                {note.category === 'general' ? 'Genel' :
                 note.category === 'hearing' ? 'Duruşma' :
                 note.category === 'meeting' ? 'Görüşme' : 'Araştırma'}
              </span>
              {note.caseNo && (
                <span style={{color: '#64748b', fontSize: '0.875rem'}}>Dava: {note.caseNo}</span>
              )}
              <span style={{color: '#64748b', fontSize: '0.875rem'}}>{note.date}</span>
            </div>
            <p style={{color: '#374151'}}>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
