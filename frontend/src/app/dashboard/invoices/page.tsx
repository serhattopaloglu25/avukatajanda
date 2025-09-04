'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Invoice {
 id: number;
 invoice_no: string;
 client: string;
 case_no: string;
 amount: number;
 status: string;
 date: string;
 due_date: string;
 pdf_url?: string;
}

export default function InvoicesPage() {
 const [invoices, setInvoices] = useState<Invoice[]>([]);
 const [showNewForm, setShowNewForm] = useState(false);
 const [showPdfModal, setShowPdfModal] = useState(false);
 const [selectedPdf, setSelectedPdf] = useState('');
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [newInvoice, setNewInvoice] = useState({
   client: '', case_no: '', amount: '', due_date: ''
 });

 useEffect(() => {
   fetchInvoices();
 }, []);

 const fetchInvoices = async () => {
   try {
     const res = await api.get('/api/invoices');
     setInvoices(res.data);
   } catch (error) {
     // Demo data
     setInvoices([
       { id: 1, invoice_no: 'FTR-2025001', client: 'Ayşe Yılmaz', case_no: '2025/123', amount: 5000, status: 'paid', date: '2025-08-01', due_date: '2025-08-15' },
       { id: 2, invoice_no: 'FTR-2025002', client: 'Mehmet Öz', case_no: '2025/456', amount: 3500, status: 'pending', date: '2025-08-15', due_date: '2025-09-15' }
     ]);
   }
 };

 const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
   if (e.target.files && e.target.files[0]) {
     setSelectedFile(e.target.files[0]);
   }
 };

 const createInvoice = async () => {
   if (!newInvoice.client || !newInvoice.amount) {
     alert('Müvekkil ve tutar zorunludur');
     return;
   }

   const formData = new FormData();
   formData.append('client', newInvoice.client);
   formData.append('case_no', newInvoice.case_no);
   formData.append('amount', newInvoice.amount);
   formData.append('due_date', newInvoice.due_date);
   
   if (selectedFile) {
     formData.append('pdf_file', selectedFile);
   }

   try {
     await api.post('/api/invoices', formData, {
       headers: { 'Content-Type': 'multipart/form-data' }
     });
     fetchInvoices();
     setShowNewForm(false);
     setNewInvoice({ client: '', case_no: '', amount: '', due_date: '' });
     setSelectedFile(null);
   } catch (error) {
     alert('Fatura oluşturulamadı');
   }
 };

 const showPdf = (invoice: Invoice) => {
   if (invoice.pdf_url) {
     setSelectedPdf(invoice.pdf_url);
     setShowPdfModal(true);
   } else {
     // Demo PDF göster
     setSelectedPdf(`data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9MZW5ndGggNzI+PnN0cmVhbQp4nGNgYGBgZGBgYmBkYGJgZmBhYGVgY2BnYGDgYOBk4GLgZuBh4GXgY+BnEGAQZBBiEGYQYRBlEGMQZ5BgkGSQYpBmkGGQZZBjkGdQYFBkUGJQZlBhUGVQY1Bn0GDQZNBi0GbQYdBl0GPQZ2AwYDAAIwABYAAeCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDMgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDMgMCBSPj4KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzEgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDE0MCAwMDAwMCBuIAowMDAwMDAwMjU5IDAwMDAwIG4gCjAwMDAwMDAzMDggMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMzY1IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2L1Jvb3QgMiAwIFI+PgpzdGFydHhyZWYKNDQ2CiUlRU9G`);
     setShowPdfModal(true);
   }
 };

 const updateInvoiceStatus = async (id: number, status: string) => {
   try {
     await api.put(`/api/invoices/${id}/status`, { status });
     fetchInvoices();
   } catch (error) {
     console.error(error);
   }
 };

 return (
   <div>
     {/* PDF Modal */}
     {showPdfModal && (
       <div style={{
         position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
         background: 'rgba(0,0,0,0.8)', zIndex: 1000,
         display: 'flex', alignItems: 'center', justifyContent: 'center'
       }} onClick={() => setShowPdfModal(false)}>
         <div style={{
           background: 'white', borderRadius: '0.5rem', padding: '1rem',
           width: '90%', maxWidth: '900px', height: '90vh'
         }} onClick={(e) => e.stopPropagation()}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
             <h3>Fatura Görüntüleme</h3>
             <button onClick={() => setShowPdfModal(false)} style={{
               background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer'
             }}>×</button>
           </div>
           <iframe
             src={selectedPdf}
             style={{ width: '100%', height: 'calc(100% - 50px)', border: 'none' }}
             title="Fatura PDF"
           />
         </div>
       </div>
     )}

     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
       <h1 style={{ fontSize: '2rem' }}>Faturalar</h1>
       <button onClick={() => setShowNewForm(true)} style={{
         padding: '0.75rem 1.5rem',
         background: '#10b981',
         color: 'white',
         border: 'none',
         borderRadius: '0.375rem',
         cursor: 'pointer'
       }}>
         + Yeni Fatura
       </button>
     </div>

     {showNewForm && (
       <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
         <h3 style={{ marginBottom: '1rem' }}>Yeni Fatura Oluştur</h3>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
           <div>
             <label style={{ display: 'block', marginBottom: '0.25rem' }}>Müvekkil</label>
             <input
               type="text"
               value={newInvoice.client}
               onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
               style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
             />
           </div>
           <div>
             <label style={{ display: 'block', marginBottom: '0.25rem' }}>Dava No</label>
             <input
               type="text"
               value={newInvoice.case_no}
               onChange={(e) => setNewInvoice({ ...newInvoice, case_no: e.target.value })}
               style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
             />
           </div>
           <div>
             <label style={{ display: 'block', marginBottom: '0.25rem' }}>Tutar (₺)</label>
             <input
               type="number"
               value={newInvoice.amount}
               onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
               style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
             />
           </div>
           <div>
             <label style={{ display: 'block', marginBottom: '0.25rem' }}>Vade Tarihi</label>
             <input
               type="date"
               value={newInvoice.due_date}
               onChange={(e) => setNewInvoice({ ...newInvoice, due_date: e.target.value })}
               style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}
             />
           </div>
           <div style={{ gridColumn: 'span 2' }}>
             <label style={{ display: 'block', marginBottom: '0.25rem' }}>Fatura PDF (Opsiyonel)</label>
             <input
               type="file"
               accept=".pdf"
               onChange={handleFileSelect}
               style={{ width: '100%' }}
             />
             {selectedFile && (
               <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                 Seçili: {selectedFile.name}
               </p>
             )}
           </div>
         </div>
         <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
           <button onClick={createInvoice} style={{
             padding: '0.5rem 1rem',
             background: '#0066cc',
             color: 'white',
             border: 'none',
             borderRadius: '4px',
             cursor: 'pointer'
           }}>
             Oluştur
           </button>
           <button onClick={() => setShowNewForm(false)} style={{
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
             <th style={{ padding: '1rem', textAlign: 'left' }}>Fatura No</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Müvekkil</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Dava No</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Tutar</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Durum</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>Vade</th>
             <th style={{ padding: '1rem', textAlign: 'left' }}>İşlemler</th>
           </tr>
         </thead>
         <tbody>
           {invoices.map(invoice => (
             <tr key={invoice.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
               <td style={{ padding: '1rem' }}>{invoice.invoice_no}</td>
               <td style={{ padding: '1rem' }}>{invoice.client}</td>
               <td style={{ padding: '1rem' }}>{invoice.case_no}</td>
               <td style={{ padding: '1rem' }}>₺{invoice.amount.toLocaleString('tr-TR')}</td>
               <td style={{ padding: '1rem' }}>
                 <span style={{
                   padding: '0.25rem 0.75rem',
                   background: invoice.status === 'paid' ? '#dcfce7' : '#fef3c7',
                   color: invoice.status === 'paid' ? '#166534' : '#92400e',
                   borderRadius: '0.375rem',
                   fontSize: '0.875rem'
                 }}>
                   {invoice.status === 'paid' ? 'Ödendi' : 'Beklemede'}
                 </span>
               </td>
               <td style={{ padding: '1rem' }}>{invoice.due_date}</td>
               <td style={{ padding: '1rem' }}>
                 {invoice.status === 'pending' && (
                   <button onClick={() => updateInvoiceStatus(invoice.id, 'paid')} style={{
                     marginRight: '0.5rem',
                     padding: '0.25rem 0.5rem',
                     background: '#10b981',
                     color: 'white',
                     border: 'none',
                     borderRadius: '4px',
                     cursor: 'pointer',
                     fontSize: '0.875rem'
                   }}>
                     Ödendi
                   </button>
                 )}
                 <button onClick={() => showPdf(invoice)} style={{
                   color: '#0066cc',
                   background: 'none',
                   border: 'none',
                   cursor: 'pointer'
                 }}>
                   PDF
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
