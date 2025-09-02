'use client';

import { useState, useEffect } from 'react';

interface Case {
  id: number;
  case_no: string;
  title: string;
  client: string;
  court: string;
  case_type: string;
  opponent: string;
  description: string;
  status: string;
}

const API_URL = 'http://localhost:8001/api';

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);
  const [newCase, setNewCase] = useState({
    case_no: '',
    title: '',
    client: '',
    court: '',
    case_type: '',
    opponent: '',
    description: ''
  });

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch(`${API_URL}/cases`);
      const data = await response.json();
      setCases(data);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCase = async () => {
    if (!newCase.case_no || !newCase.title) {
      alert('Dava no ve başlık zorunludur');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCase)
      });
      
      if (response.ok) {
        await fetchCases();
        setNewCase({ case_no: '', title: '', client: '', court: '', case_type: '', opponent: '', description: '' });
        setShowNewCaseForm(false);
      }
    } catch (error) {
      console.error('Error adding case:', error);
      alert('Dava eklenirken hata oluştu');
    }
  };

  const deleteCase = async (id: number) => {
    if (!confirm('Bu davayı silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${API_URL}/cases/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await fetchCases();
      }
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  if (loading) {
    return <div style={{padding: '2rem'}}>Yükleniyor...</div>;
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem'}}>Davalar</h1>
        <button onClick={() => setShowNewCaseForm(true)} style={{
          padding: '0.75rem 1.5rem',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}>
          + Yeni Dava
        </button>
      </div>

      {showNewCaseForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
          <h3 style={{marginBottom: '1rem'}}>Yeni Dava Ekle</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Dava No</label>
              <input
                type="text"
                value={newCase.case_no}
                onChange={(e) => setNewCase({...newCase, case_no: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Dava Başlığı</label>
              <input
                type="text"
                value={newCase.title}
                onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Müvekkil</label>
              <input
                type="text"
                value={newCase.client}
                onChange={(e) => setNewCase({...newCase, client: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Mahkeme</label>
              <input
                type="text"
                value={newCase.court}
                onChange={(e) => setNewCase({...newCase, court: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Dava Türü</label>
              <select
                value={newCase.case_type}
                onChange={(e) => setNewCase({...newCase, case_type: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              >
                <option value="">Seçiniz</option>
                <option value="boşanma">Boşanma</option>
                <option value="kira">Kira</option>
                <option value="tazminat">Tazminat</option>
                <option value="ceza">Ceza</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Karşı Taraf</label>
              <input
                type="text"
                value={newCase.opponent}
                onChange={(e) => setNewCase({...newCase, opponent: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
          </div>
          <div style={{marginTop: '1rem'}}>
            <label style={{display: 'block', marginBottom: '0.25rem'}}>Açıklama</label>
            <textarea
              value={newCase.description}
              onChange={(e) => setNewCase({...newCase, description: e.target.value})}
              style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px', minHeight: '100px'}}
            />
          </div>
          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
            <button onClick={addCase} style={{
              padding: '0.5rem 1rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Kaydet
            </button>
            <button onClick={() => setShowNewCaseForm(false)} style={{
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
              <th style={{padding: '1rem', textAlign: 'left'}}>Dava No</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Başlık</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Müvekkil</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Mahkeme</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Durum</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {cases.length === 0 ? (
              <tr>
                <td colSpan={6} style={{padding: '2rem', textAlign: 'center', color: '#6b7280'}}>
                  Henüz dava bulunmuyor
                </td>
              </tr>
            ) : (
              cases.map(case_ => (
                <tr key={case_.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                  <td style={{padding: '1rem'}}>{case_.case_no}</td>
                  <td style={{padding: '1rem'}}>{case_.title}</td>
                  <td style={{padding: '1rem'}}>{case_.client}</td>
                  <td style={{padding: '1rem'}}>{case_.court}</td>
                  <td style={{padding: '1rem'}}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      background: case_.status === 'active' ? '#dcfce7' : '#fee2e2',
                      color: case_.status === 'active' ? '#166534' : '#991b1b',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem'
                    }}>
                      {case_.status === 'active' ? 'Aktif' : 'Kapalı'}
                    </span>
                  </td>
                  <td style={{padding: '1rem'}}>
                    <button onClick={() => deleteCase(case_.id)} style={{
                      color: '#dc2626',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
