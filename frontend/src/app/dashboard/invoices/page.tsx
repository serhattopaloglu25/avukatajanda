'use client';

import { useState, useEffect } from 'react';

interface Invoice {
  id: number;
  invoiceNo: string;
  client: string;
  caseNo: string;
  amount: number;
  status: string;
  date: string;
  dueDate: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showNewInvoiceForm, setShowNewInvoiceForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    caseNo: '',
    amount: '',
    dueDate: ''
  });

  useEffect(() => {
    const savedInvoices = localStorage.getItem('lawyer_invoices');
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
    } else {
      const demoInvoices = [
        { id: 1, invoiceNo: 'FTR-2025001', client: 'Ayşe Yılmaz', caseNo: '2025/123', amount: 5000, status: 'paid', date: '2025-08-01', dueDate: '2025-08-15' },
        { id: 2, invoiceNo: 'FTR-2025002', client: 'Mehmet Öz', caseNo: '2025/456', amount: 3500, status: 'pending', date: '2025-08-15', dueDate: '2025-09-15' }
      ];
      setInvoices(demoInvoices);
      localStorage.setItem('lawyer_invoices', JSON.stringify(demoInvoices));
    }
  }, []);

  const createInvoice = () => {
    if (!newInvoice.client || !newInvoice.amount) {
      alert('Müvekkil ve tutar zorunludur');
      return;
    }

    const invoice: Invoice = {
      id: Date.now(),
      invoiceNo: `FTR-${new Date().getFullYear()}${String(invoices.length + 1).padStart(3, '0')}`,
      client: newInvoice.client,
      caseNo: newInvoice.caseNo,
      amount: Number(newInvoice.amount),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate
    };

    const updatedInvoices = [...invoices, invoice];
    setInvoices(updatedInvoices);
    localStorage.setItem('lawyer_invoices', JSON.stringify(updatedInvoices));
    
    setNewInvoice({ client: '', caseNo: '', amount: '', dueDate: '' });
    setShowNewInvoiceForm(false);
  };

  const updateInvoiceStatus = (id: number, status: string) => {
    const updatedInvoices = invoices.map(inv => 
      inv.id === id ? { ...inv, status } : inv
    );
    setInvoices(updatedInvoices);
    localStorage.setItem('lawyer_invoices', JSON.stringify(updatedInvoices));
  };

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const pendingRevenue = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem'}}>Faturalar</h1>
        <button onClick={() => setShowNewInvoiceForm(true)} style={{
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

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem'}}>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Toplam Gelir</h3>
          <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981'}}>₺{totalRevenue.toLocaleString('tr-TR')}</p>
        </div>
        <div style={{background: 'white', padding: '1.5rem', borderRadius: '0.5rem'}}>
          <h3 style={{color: '#64748b', fontSize: '0.875rem'}}>Bekleyen Ödemeler</h3>
          <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b'}}>₺{pendingRevenue.toLocaleString('tr-TR')}</p>
        </div>
      </div>

      {showNewInvoiceForm && (
        <div style={{background: 'white', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem'}}>
          <h3 style={{marginBottom: '1rem'}}>Yeni Fatura Oluştur</h3>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Müvekkil</label>
              <input
                type="text"
                value={newInvoice.client}
                onChange={(e) => setNewInvoice({...newInvoice, client: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Dava No</label>
              <input
                type="text"
                value={newInvoice.caseNo}
                onChange={(e) => setNewInvoice({...newInvoice, caseNo: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Tutar (₺)</label>
              <input
                type="number"
                value={newInvoice.amount}
                onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '0.25rem'}}>Vade Tarihi</label>
              <input
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                style={{width: '100%', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '4px'}}
              />
            </div>
          </div>
          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
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
            <button onClick={() => setShowNewInvoiceForm(false)} style={{
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
              <th style={{padding: '1rem', textAlign: 'left'}}>Fatura No</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Müvekkil</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Dava No</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Tutar</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Durum</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>Vade</th>
              <th style={{padding: '1rem', textAlign: 'left'}}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                <td style={{padding: '1rem'}}>{invoice.invoiceNo}</td>
                <td style={{padding: '1rem'}}>{invoice.client}</td>
                <td style={{padding: '1rem'}}>{invoice.caseNo}</td>
                <td style={{padding: '1rem'}}>₺{invoice.amount.toLocaleString('tr-TR')}</td>
                <td style={{padding: '1rem'}}>
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
                <td style={{padding: '1rem'}}>{invoice.dueDate}</td>
                <td style={{padding: '1rem'}}>
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
                  <button style={{color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer'}}>
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
