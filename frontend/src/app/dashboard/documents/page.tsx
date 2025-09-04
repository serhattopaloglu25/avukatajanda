'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Document {
 id: number;
 name: string;
 category: string;
 case_no: string;
 upload_date: string;
 size: string;
 file_path?: string;
}

export default function DocumentsPage() {
 const [documents, setDocuments] = useState<Document[]>([]);
 const [showUploadForm, setShowUploadForm] = useState(false);
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [uploadData, setUploadData] = useState({ case_no: '', category: 'petition' });

 useEffect(() => {
   fetchDocuments();
 }, []);

 const fetchDocuments = async () => {
   try {
     const res = await api.get('/api/documents');
     setDocuments(res.data);
   } catch (error) {
     // Demo data
     setDocuments([
       { id: 1, name: 'Dava Dilekçesi.pdf', category: 'petition', case_no: '2025/123', upload_date: '2025-09-01', size: '245 KB' },
       { id: 2, name: 'Vekaletname.pdf', category: 'authorization', case_no: '2025/123', upload_date: '2025-08-28', size: '156 KB' }
     ]);
   }
 };

 const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files[0]) {
     setSelectedFile(e.target.files[0]);
   }
 };

 const uploadDocument = async () => {
   if (!selectedFile || !uploadData.case_no) {
     alert('Lütfen dosya seçin ve dava no girin');
     return;
   }

   const formData = new FormData();
   formData.append('file', selectedFile);
   formData.append('case_no', uploadData.case_no);
   formData.append('category', uploadData.category);

   try {
     await api.post('/api/documents/upload', formData, {
       headers: { 'Content-Type': 'multipart/form-data' }
     });
     fetchDocuments();
     setShowUploadForm(false);
     setSelectedFile(null);
     setUploadData({ case_no: '', category: 'petition' });
   } catch (error) {
     alert('Yükleme başarısız');
   }
 };

 const downloadDocument = (doc: Document) => {
   // Gerçek indirme için backend'den dosya çekilmeli
   const link = document.createElement('a');
   link.href = `/api/documents/download/${doc.id}`;
   link.download = doc.name;
   link.click();
 };

 return (
   <div>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
       <h1 style={{ fontSize: '2rem' }}>Belgeler</h1>
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
       <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
         <h3 style={{ marginBottom: '1rem' }}>Belge Yükle</h3>
         <div style={{ display: 'grid', gap: '1rem' }}>
           <div>
             <label style={{ display: 'block', marginBottom: '0.5rem' }}>Dosya Seçin</label>
             <input
               type="file"
               onChange={handleFileSelect}
               accept=".pdf,.doc,.docx,.jpg,.png"
               style={{ width: '100%' }}
             />
             {selectedFile && (
               <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                 Seçili: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
               </p>
             )}
           </div>
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             <div>
               <label style={{ display: 'block', marginBottom: '0.25rem' }}>Dava No</label>
               <input
                 type="text"
                 value={uploadData.case_no}
                 onChange={(e) => setUploadData({ ...uploadData, case_no: e.target.value })}
                 placeholder="örn: 2025/123"
                 style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
               />
             </div>
             <div>
               <label style={{ display: 'block', marginBottom: '0.25rem' }}>Kategori</label>
               <select
                 value={uploadData.category}
                 onChange={(e) => setUploadData({ ...uploadData, category: e.target.value })}
                 style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
               >
                 <option value="petition">Dilekçe</option>
                 <option value="authorization">Vekaletname</option>
                 <option value="evidence">Delil</option>
                 <option value="decision">Karar</option>
                 <option value="other">Diğer</option>
               </select>
             </div>
           </div>
         </div>
         <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
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

     <div style={{ background: 'white', borderRadius: '0.5rem', overflow: 'hidden' }}>
       <table style={{ width: '100%', borderCollapse: 'collapse' }}>
         <thead>
           <tr style={{ background: '#f8fafc' }}>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Belge Adı</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Kategori</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Dava No</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Yükleme Tarihi</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Boyut</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>İşlemler</th>
           </tr>
         </thead>
         <tbody>
           {documents.map(doc => (
             <tr key={doc.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
               <td style={{ padding: '1rem' }}>{doc.name}</td>
               <td style={{ padding: '1rem' }}>
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
               <td style={{ padding: '1rem' }}>{doc.case_no}</td>
               <td style={{ padding: '1rem' }}>{doc.upload_date}</td>
               <td style={{ padding: '1rem' }}>{doc.size}</td>
               <td style={{ padding: '1rem' }}>
                 <button
                   onClick={() => downloadDocument(doc)}
                   style={{
                     color: '#0066cc',
                     background: 'none',
                     border: 'none',
                     cursor: 'pointer'
                   }}
                 >
                   İndir
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
