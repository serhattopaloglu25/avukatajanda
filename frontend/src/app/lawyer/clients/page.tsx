'use client';

import { useState, useEffect } from 'react';

interface Client {
  id: number;
  name: string;
  surname: string;
  tcNo: string;
  phone: string;
  email: string;
  address?: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    surname: '',
    tcNo: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    const savedClients = localStorage.getItem('lawyer_clients');
    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      const demoClients = [
        { id: 1, name: 'Ayşe', surname: 'Yılmaz', tcNo: '12345678901', phone: '0555 123 45 67', email: 'ayse@email.com' },
        { id: 2, name: 'Mehmet', surname: 'Öz', tcNo: '98765432109', phone: '0555 987 65 43', email: 'mehmet@email.com' }
      ];
      setClients(demoClients);
      localStorage.setItem('lawyer_clients', JSON.stringify(demoClients));
    }
  }, []);

  const addClient = () => {
    if (!newClient.name || !newClient.surname || !newClient.tcNo) {
      alert('Ad, soyad ve TC no zorunludur');
      return;
    }

    const client: Client = {
      id: Date.now(),
      ...newClient
    };

    const updatedClients = [...clients, client];
    setClients(updatedClients);
    localStorage.setItem('lawyer_clients', JSON.stringify(updatedClients));
    
    setNewClient({ name: '', surname: '', tcNo: '', phone: '', email: '', address: '' });
    setShowNewClientForm(false);
  };

  const deleteClient = (id: number) => {
    const updatedClients = clients.filter(c => c.id !== id);
    setClients(updatedClients);
    localStorage.setItem('lawyer_clients', JSON.stringify(updatedClients));
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem'}}>Müvekkiller</h1>
        <button onClick={() => setShowNewClientForm(true)} style={{
          padding: '0.75rem 1.5rem',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}>
          + Yeni Müvekkil
        </button>
      </div>

      {showNewClientForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
          <h3 style={{marginBottom: '1rem'}}>Yeni Müvekkil Ekle</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Ad</label>
              <input
                type="text"
                value={newClient.name}
                onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Soyad</label>
              <input
                type="text"
                value={newClient.surname}
                onChange={(e) => setNewClient({...newClient, surname: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>TC No</label>
              <input
                type="text"
                value={newClient.tcNo}
                onChange={(e) => setNewClient({...newClient, tcNo: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Telefon</label>
              <input
                type="text"
                value={newClient.phone}
                onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>E-posta</label>
              <input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Adres</label>
              <input
                type="text"
                value={newClient.address}
                onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
          </div>
          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
            <button onClick={addClient} style={{
              padding: '0.5rem 1rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Kaydet
            </button>
            <button onClick={() => setShowNewClientForm(false)} style={{
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
              <th style={{padding: '1rem', textAlign: 'left'}}>Ad Soyad</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>TC No</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Telefon</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>E-posta</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '1rem'}}>{client.name} {client.surname}</td>
                <td style={{padding: '1rem'}}>{client.tcNo}</td>
                <td style={{padding: '1rem'}}>{client.phone}</td>
                <td style={{padding: '1rem'}}>{client.email}</td>
                <td style={{padding: '1rem'}}>
                  <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>
                    Detay
                  </button>
                  <button onClick={() => deleteClient(client.id)} style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>
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
