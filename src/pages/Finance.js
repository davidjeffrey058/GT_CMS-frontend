import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { useState, useMemo } from 'react';

const Finance = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', category: 'Tithe', amount: 500, method: 'Mobile Money', date: '2026-06-21', description: 'Sunday Service Tithe' },
    { id: 2, type: 'expense', category: 'Utilities', amount: 120, method: 'Bank', date: '2026-06-20', description: 'Electricity Bill' },
    { id: 3, type: 'income', category: 'Offering', amount: 300, method: 'Cash', date: '2026-06-21', description: 'Midweek Offering' },
    { id: 4, type: 'expense', category: 'Salary', amount: 800, method: 'Bank', date: '2026-06-15', description: 'Pastor Salary - June' },
  ]);

  const [formData, setFormData] = useState({
    type: 'income',
    category: 'Tithe',
    amount: '',
    method: 'Cash',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const [filters, setFilters] = useState({
    reportType: 'monthly',
    startDate: '',
    endDate: '',
    searchTerm: ''
  });

  const incomeCategories = ['Tithe', 'Offering', 'Donation', 'Pledge', 'Special Seed'];
  const expenseCategories = ['Utilities', 'Events', 'Salary', 'Maintenance', 'Outreach', 'Missions', 'Rent'];
  const paymentMethods = ['Cash', 'Mobile Money', 'Bank', 'Cheque', 'Card'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount ||!formData.date) return;

    const newTransaction = {
      id: Date.now(),
     ...formData,
      amount: parseFloat(formData.amount)
    };

    setTransactions(prev => [newTransaction,...prev]);
    setFormData({
      type: 'income',
      category: 'Tithe',
      amount: '',
      method: 'Cash',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id!== id));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           t.category.toLowerCase().includes(filters.searchTerm.toLowerCase());

      if (!filters.startDate &&!filters.endDate) return matchesSearch;

      const transactionDate = new Date(t.date);
      const start = filters.startDate? new Date(filters.startDate) : new Date('1900-01-01');
      const end = filters.endDate? new Date(filters.endDate) : new Date('2100-01-01');

      return matchesSearch && transactionDate >= start && transactionDate <= end;
    });
  }, [transactions, filters]);

  const summary = useMemo(() => {
    const income = filteredTransactions
     .filter(t => t.type === 'income')
     .reduce((sum, t) => sum + t.amount, 0);
    const expense = filteredTransactions
     .filter(t => t.type === 'expense')
     .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [filteredTransactions]);

  const setReportPeriod = (period) => {
    const today = new Date();
    let startDate = '';
    let endDate = today.toISOString().split('T')[0];

    if (period === 'daily') {
      startDate = endDate;
    } else if (period === 'monthly') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    } else if (period === 'yearly') {
      startDate = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
    }

    setFilters(prev => ({...prev, reportType: period, startDate, endDate }));
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Amount', 'Method', 'Description'];
    const rows = filteredTransactions.map(t =>
      [t.date, t.type, t.category, t.amount, t.method, t.description].join(',')
    );
    const csv = [headers.join(','),...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial_report_${filters.reportType}.csv`;
    a.click();
  };

  const exportToPDF = () => {
     const doc = new jsPDF();
  
    // Header
    doc.setFontSize(18);
    doc.text('Financial Report', 14, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Period: ${filters.reportType}`, 14, 34);
    
    // Summary boxes
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Total Income: GHS ${summary.income.toFixed(2)}`, 14, 44);
    doc.text(`Total Expenses: GHS ${summary.expense.toFixed(2)}`, 14, 52);
    doc.setFont(undefined, 'bold');
    doc.text(`Balance: GHS ${summary.balance.toFixed(2)}`, 14, 60);
    doc.setFont(undefined, 'normal');
    
    // Table
    autoTable(doc, {
      startY: 68,
      head: [['Date', 'Type', 'Category', 'Amount', 'Method', 'Description']],
      body: filteredTransactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.category,
        `${t.type === 'income' ? '+' : '-'}GHS ${t.amount.toFixed(2)}`,
        t.method,
        t.description
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      // columnStyles: {
      //   3: { halign: 'right' } // Amount column right-aligned
      // }
    });
    
  doc.save(`financial_report_${filters.reportType}_${Date.now()}.pdf`);
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container">
        {/* <div className="row mb-4">
          <div className="col">
            <h2 className="fw-bold text-dark">
              <i className="bi bi-cash-stack me-2 text-primary"></i>
              Financial Management Dashboard
            </h2>
            <p className="text-muted">Track tithes, offerings, donations and expenses</p>
          </div>
        </div> */}

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="">
              <h2 className="fw-bold mb-1">
                Financial Management Dashboard
              </h2>
              <p className="text-muted mb-0">
               Track tithes, offerings, donations and expenses
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total Income</h6>
                    <h3 className="fw-bold text-success mb-0">GHS {summary.income.toFixed(2)}</h3>
                  </div>
                  <div className="bg-success bg-opacity-10 p-3 rounded">
                    <i className="bi bi-arrow-down-circle fs-2 text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Total Expenses</h6>
                    <h3 className="fw-bold text-danger mb-0">GHS {summary.expense.toFixed(2)}</h3>
                  </div>
                  <div className="bg-danger bg-opacity-10 p-3 rounded">
                    <i className="bi bi-arrow-up-circle fs-2 text-danger"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="text-muted mb-1">Balance</h6>
                    <h3 className={`fw-bold mb-0 ${summary.balance >= 0? 'text-primary' : 'text-danger'}`}>
                      GHS {summary.balance.toFixed(2)}
                    </h3>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-3 rounded">
                    <i className="bi bi-wallet2 fs-2 text-primary"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Transaction Form */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Transaction
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Type</label>
                    <div className="btn-group w-100" role="group">
                      <input type="radio" className="btn-check" name="type" id="income"
                        value="income" checked={formData.type === 'income'} onChange={handleInputChange} />
                      <label className="btn btn-outline-success" htmlFor="income">Income</label>

                      <input type="radio" className="btn-check" name="type" id="expense"
                        value="expense" checked={formData.type === 'expense'} onChange={handleInputChange} />
                      <label className="btn btn-outline-danger" htmlFor="expense">Expense</label>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Category</label>
                    <select className="form-select" name="category" value={formData.category} onChange={handleInputChange}>
                      {(formData.type === 'income'? incomeCategories : expenseCategories).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Amount (GHS)</label>
                    <input type="number" className="form-control" name="amount" value={formData.amount}
                      onChange={handleInputChange} placeholder="0.00" step="0.01" required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Payment Method</label>
                    <select className="form-select" name="method" value={formData.method} onChange={handleInputChange}>
                      {paymentMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Date</label>
                    <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInputChange} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea className="form-control" name="description" value={formData.description}
                      onChange={handleInputChange} rows="2" placeholder="Optional notes"></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    <i className="bi bi-check-circle me-2"></i>Add Transaction
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Transactions & Reports */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white border-0 py-3">
                <div className="row align-items-center g-2">
                  <div className="col-md-4">
                    <h5 className="mb-0 fw-bold">
                      <i className="bi bi-list-ul me-2"></i>Transactions
                    </h5>
                  </div>
                  <div className="col-md-8">
                    <div className="d-flex gap-2 justify-content-md-end">
                      <div className="btn-group" role="group">
                        <button onClick={() => setReportPeriod('daily')}
                          className={`btn btn-sm ${filters.reportType === 'daily'? 'btn-primary' : 'btn-outline-primary'}`}>
                          Daily
                        </button>
                        <button onClick={() => setReportPeriod('monthly')}
                          className={`btn btn-sm ${filters.reportType === 'monthly'? 'btn-primary' : 'btn-outline-primary'}`}>
                          Monthly
                        </button>
                        <button onClick={() => setReportPeriod('yearly')}
                          className={`btn btn-sm ${filters.reportType === 'yearly'? 'btn-primary' : 'btn-outline-primary'}`}>
                          Yearly
                        </button>
                      </div>
                      <button onClick={exportToCSV} 
                      className="btn btn-sm btn-success">
                        <i className="bi bi-download me-1"></i>CSV
                      </button>
                      <button onClick={exportToPDF} 
                      className="btn btn-sm btn-danger">
                        <i className="bi bi-download me-1"></i>PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row g-2 mb-3">
                  <div className="col-md-4">
                    <input type="date" className="form-control form-control-sm"
                      placeholder="Start Date" value={filters.startDate}
                      onChange={(e) => setFilters(prev => ({...prev, startDate: e.target.value }))} />
                  </div>
                  <div className="col-md-4">
                    <input type="date" className="form-control form-control-sm"
                      placeholder="End Date" value={filters.endDate}
                      onChange={(e) => setFilters(prev => ({...prev, endDate: e.target.value }))} />
                  </div>
                  <div className="col-md-4">
                    <input type="text" className="form-control form-control-sm"
                      placeholder="Search..." value={filters.searchTerm}
                      onChange={(e) => setFilters(prev => ({...prev, searchTerm: e.target.value }))} />
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Method</th>
                        <th>Description</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.length === 0? (
                        <tr>
                          <td colSpan="7" className="text-center text-muted py-4">
                            No transactions found
                          </td>
                        </tr>
                      ) : (
                        filteredTransactions.map(t => (
                          <tr key={t.id}>
                            <td>{new Date(t.date).toLocaleDateString()}</td>
                            <td>
                              <span className={`badge ${t.type === 'income'? 'bg-success' : 'bg-danger'}`}>
                                {t.type}
                              </span>
                            </td>
                            <td>{t.category}</td>
                            <td className={`fw-semibold ${t.type === 'income'? 'text-success' : 'text-danger'}`}>
                              {t.type === 'income'? '+' : '-'} GHS {t.amount.toFixed(2)}
                            </td>
                            <td><span className="badge bg-light text-dark">{t.method}</span></td>
                            <td className="text-muted small">{t.description}</td>
                            <td>
                              <button onClick={() => deleteTransaction(t.id)}
                                className="btn btn-sm btn-link text-danger p-0">
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;