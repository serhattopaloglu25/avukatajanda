'use client';

import { useState } from 'react';

export default function ClientsPage() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Ayşe', surname: 'Yılmaz', tcNo: '12345678901', phone: '0555 123 45 67', email: 'ayse@email.com' },
    { id: 2, name: 'Mehmet', surname: 'Öz', tcNo: '98765432109', phone: '0555 987 65 43', email: 'mehmet@email.com' }
  ]);

  return (
    <div>
      <h1 style={{fontSize: '2rem', marginBottom: '2rem'}}>Müvekkiller</h1>
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
                    Düzenle
                  </button>
                  <button style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>
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
