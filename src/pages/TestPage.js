import React, { useState, useMemo } from 'react';

const TestPage = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Mensah',
      dob: '1985-03-15',
      phone: '+233 24 123 4567',
      email: 'john.mensah@email.com',
      address: 'East Legon, Accra',
      status: 'active',
      familyId: 'fam_001',
      role: 'Father',
      photo: 'https://i.pravatar.cc/150?img=12',
      joinDate: '2020-01-10'
    },
    {
      id: 2,
      firstName: 'Grace',
      lastName: 'Mensah',
      dob: '1988-07-22',
      phone: '+233 24 987 6543',
      email: 'grace.mensah@email.com',
      address: 'East Legon, Accra',
      status: 'active',
      familyId: 'fam_001',
      role: 'Mother',
      photo: 'https://i.pravatar.cc/150?img=45',
      joinDate: '2020-01-10'
    },
    {
      id: 3,
      firstName: 'Samuel',
      lastName: 'Osei',
      dob: '1992-11-05',
      phone: '+233 20 555 1234',
      email: '',
      address: 'Dansoman, Accra',
      status: 'visitor',
      familyId: '',
      role: 'Single',
      photo: '',
      joinDate: '2026-06-01'
    }
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    status: 'active',
    familyId: '',
    role: 'Single',
    photo: ''
  });

  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: 'all',
    familyFilter: 'all'
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statuses = ['active', 'inactive', 'visitor'];
  const roles = ['Father', 'Mother', 'Child', 'Single', 'Other'];
  
  const familyGroups = useMemo(() => {
    const groups = [...new Set(members.filter(m => m.familyId).map(m => m.familyId))];
    return groups.map(id => ({
      id,
      name: `Family of ${members.find(m => m.familyId === id && (m.role === 'Father' || m.role === 'Mother'))?.lastName || 'Unknown'}`
    }));
  }, [members]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      email: '',
      address: '',
      status: 'active',
      familyId: '',
      role: 'Single',
      photo: ''
    });
    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) return;

    if (editingId) {
      setMembers(prev => prev.map(m => 
        m.id === editingId ? { ...formData, id: editingId, joinDate: m.joinDate } : m
      ));
    } else {
      const newMember = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setMembers(prev => [newMember, ...prev]);
    }
    
    resetForm();
    setShowModal(false);
  };

  const editMember = (member) => {
    setFormData(member);
    setEditingId(member.id);
    setShowModal(true);
  };

  const deleteMember = (id) => {
    if (window.confirm('Delete this member record?')) {
      setMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(filters.searchTerm.toLowerCase()) ||
                           m.phone.includes(filters.searchTerm) ||
                           m.email.toLowerCase().includes(filters.searchTerm.toLowerCase());
      
      const matchesStatus = filters.statusFilter === 'all' || m.status === filters.statusFilter;
      const matchesFamily = filters.familyFilter === 'all' || m.familyId === filters.familyFilter;
      
      return matchesSearch && matchesStatus && matchesFamily;
    });
  }, [members, filters]);

  const stats = useMemo(() => ({
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    visitors: members.filter(m => m.status === 'visitor').length,
    families: familyGroups.length
  }), [members, familyGroups]);

  const getAge = (dob) => {
    if (!dob) return '-';
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return age;
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8">
            <h2 className="fw-bold text-dark">
              <i className="bi bi-people-fill me-2 text-primary"></i>
              Member Management
            </h2>
            <p className="text-muted">Register and manage church members</p>
          </div>
          <div className="col-md-4 text-md-end">
            <button className="btn btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
              <i className="bi bi-person-plus me-2"></i>Add Member
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
            <div className="col-md-3 col-6">
                <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                    <i className="bi bi-people fs-1 text-primary"></i>
                    <h3 className="fw-bold mb-0">{stats.total}</h3>
                    <small className="text-muted">Total Members</small>
                </div>
                </div>
            </div>

            <div className="col-md-3 col-6">
                <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                    <i className="bi bi-person-check fs-1 text-success"></i>
                    <h3 className="fw-bold mb-0">{stats.active}</h3>
                    <small className="text-muted">Active</small>
                </div>
                </div>
            </div>

          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-person-plus fs-1 text-warning"></i>
                <h3 className="fw-bold mb-0">{stats.visitors}</h3>
                <small className="text-muted">Visitors</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-house-heart fs-1 text-info"></i>
                <h3 className="fw-bold mb-0">{stats.families}</h3>
                <small className="text-muted">Families</small>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-2">
              <div className="col-md-4">
                <input type="text" className="form-control" placeholder="Search name, phone, email..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))} />
              </div>
              <div className="col-md-4">
                <select className="form-select" value={filters.statusFilter}
                  onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}>
                  <option value="all">All Status</option>
                  {statuses.map(s => (
                    <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <select className="form-select" value={filters.familyFilter}
                  onChange={(e) => setFilters(prev => ({ ...prev, familyFilter: e.target.value }))}>
                  <option value="all">All Families</option>
                  {familyGroups.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Family</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">No members found</td>
                    </tr>
                  ) : (
                    filteredMembers.map(m => (
                      <tr key={m.id}>
                        <td>
                          <img src={m.photo || `https://ui-avatars.com/api/?name=${m.firstName}+${m.lastName}&background=random`}
                            alt={m.firstName} className="rounded-circle" width="40" height="40" style={{objectFit: 'cover'}} />
                        </td>
                        <td>
                          <div className="fw-semibold">{m.firstName} {m.lastName}</div>
                          <small className="text-muted">{m.role}</small>
                        </td>
                        <td>{getAge(m.dob)}</td>
                        <td>
                          <div className="small">{m.phone}</div>
                          <div className="small text-muted">{m.email}</div>
                        </td>
                        <td>
                          <span className={`badge ${
                            m.status === 'active' ? 'bg-success' : 
                            m.status === 'inactive' ? 'bg-secondary' : 'bg-warning'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                        <td>
                          {m.familyId ? (
                            <span className="badge bg-info bg-opacity-10 text-info">
                              <i className="bi bi-house me-1"></i>{m.familyId}
                            </span>
                          ) : '-'}
                        </td>
                        <td className="small text-muted">{new Date(m.joinDate).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => editMember(m)} className="btn btn-sm btn-link text-primary me-2 p-0">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button onClick={() => deleteMember(m.id)} className="btn btn-sm btn-link text-danger p-0">
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

        {/* Add/Edit Modal */}
        {showModal && (
          <>
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title fw-bold">
                      {editingId ? 'Edit Member' : 'Add New Member'}
                    </h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                      <div className="row g-3">
                        <div className="col-12 text-center mb-3">
                          <img src={formData.photo || `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&size=100`}
                            alt="Preview" className="rounded-circle mb-2" width="100" height="100" style={{objectFit: 'cover'}} />
                          <div>
                            <input type="file" className="form-control form-control-sm" accept="image/*" onChange={handlePhotoUpload} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">First Name *</label>
                          <input type="text" className="form-control" name="firstName" value={formData.firstName} 
                            onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Last Name *</label>
                          <input type="text" className="form-control" name="lastName" value={formData.lastName} 
                            onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Date of Birth</label>
                          <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Phone</label>
                          <input type="tel" className="form-control" name="phone" value={formData.phone} 
                            onChange={handleInputChange} placeholder="+233 XX XXX XXXX" />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Email</label>
                          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Status</label>
                          <select className="form-select" name="status" value={formData.status} onChange={handleInputChange}>
                            {statuses.map(s => (
                              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label fw-semibold">Address</label>
                          <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Family ID</label>
                          <input type="text" className="form-control" name="familyId" value={formData.familyId} 
                            onChange={handleInputChange} placeholder="e.g. fam_001" />
                          <small className="text-muted">Use same ID to group family members</small>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label fw-semibold">Role in Family</label>
                          <select className="form-select" name="role" value={formData.role} onChange={handleInputChange}>
                            {roles.map(r => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                      <button type="submit" className="btn btn-primary">
                        <i className="bi bi-check-circle me-2"></i>
                        {editingId ? 'Update Member' : 'Add Member'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestPage;