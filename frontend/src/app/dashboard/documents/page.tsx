'use client';

import { useState, useEffect } from 'react';

interface Document {
  id: number;
  name: string;
  category: string;
  caseNo: string;
  uploadDate: string;
  size: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    category: 'petition',
    caseNo: ''
  });

  useEffect(() => {
    const savedDocs = localStorage.getItem('lawyer_documents');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    } else {
      const demoDocs = [
        { id: 1, name: 'Dava Dilekçesi.pdf', category: 'petition', caseNo: '2025/123', uploadDate: '2025-09-01', size: '245 KB' },
        { id: 2, name: 'Vekaletname.pdf', category: 'authorization', caseNo: '2025/123', uploadDate: '2025-08-28', size: '156 KB' }
      ];
      setDocuments(demoDocs);
      localStorage.setItem('lawyer_documents', JSON.stringify(demoDocs));
    }
  }, []);

  const uploadDocument = () => {
    if (!newDoc.name) {
      alert('Belge adı zorunludur');
      return;
    }

    const doc: Document = {
      id: Date.now(),
      name: newDoc.name,
      category: newDoc.category,
      caseNo: newDoc.caseNo,
      uploadDate: new Date().toISOString().split('T')[0],
      size: Math.floor(Math.random() * 500) + ' KB'
    };

    const updatedDocs = [...documents, doc];
    setDocuments(updatedDocs);
    localStorage.setItem('lawyer_documents', JSON.stringify(updatedDocs));
    
    setNewDoc({ name: '', category: 'petition', caseNo: '' });
    setShowUploadForm(false);
  };

  const deleteDocument = (id: number) => {
    const updatedDocs = documents.filter(d => d.id !== id);
    setDocuments(updatedDocs);
    localStorage.setItem('lawyer_documents', JSON.stringify(updatedDocs));
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem'}}>Belgeler</h1>
        <button onClick={() => setShowUploadForm(true)} style={{
          padding: '0.75rem 1.5rem',
          background: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}>
          + Belge Yükle
        </button>
      </div>

      {showUploadForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
          <h3 style={{marginBottom: '1rem'}}>Yeni Belge Yükle</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Belge Adı</label>
              <input
                type="text"
                value={newDoc.name}
                onChange={(e) => setNewDoc({...newDoc, name: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                placeholder="örn: Dava Dilekçesi.pdf"
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Kategori</label>
              <select
                value={newDoc.category}
                onChange={(e) => setNewDoc({...newDoc, category: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              >
                <option value="petition">Dilekçe</option>
                <option value="authorization">Vekaletname</option>
                <option value="evidence">Delil</option>
                <option value="decision">Karar</option>
                <option value="other">Diğer</option>
              </select>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Dava No</label>
              <input
                type="text"
                value={newDoc.caseNo}
                onChange={(e) => setNewDoc({...newDoc, caseNo: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
                placeholder="örn: 2025/123"
              />
            </div>
          </div>
          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
            <button onClick={uploadDocument} style={{
              padding: '0.5rem 1rem',
              background: '#0066cc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Yükle
            </button>
            <button onClick={() => setShowUploadForm(false)} style={{
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
              <th style={{padding: '1rem', textAlign: 'left'}}>Belge Adı</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Kategori</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Dava No</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Yükleme Tarihi</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Boyut</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {documents.map(doc => (
              <tr key={doc.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '1rem'}}>{doc.name}</td>
                <td style={{padding: '1rem'}}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    background: '#e0e7ff',
                    color: '#3730a3',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}>
                    {doc.category === 'petition' ? 'Dilekçe' : 
                     doc.category === 'authorization' ? 'Vekaletname' :
                     doc.category === 'evidence' ? 'Delil' :
                     doc.category === 'decision' ? 'Karar' : 'Diğer'}
                  </span>
                </td>
                <td style={{padding: '1rem'}}>{doc.caseNo}</td>
                <td style={{padding: '1rem'}}>{doc.uploadDate}</td>
                <td style={{padding: '1rem'}}>{doc.size}</td>
                <td style={{padding: '1rem'}}>
                  <button style={{marginRight: '0.5rem', color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>
                    İndir
                  </button>
                  <button onClick={() => deleteDocument(doc.id)} style={{color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer'}}>
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
