import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Users, Gift, BarChart3, Settings, Plus, Edit2, Trash2, Toggle2, Eye, EyeOff } from 'lucide-react'
import '../styles/admin.css'

interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: string
  isActive: boolean
  subscriptionPlan?: string
  lastLogin?: string
}

interface Offer {
  id: string
  title: string
  description: string
  discount: number
  validFrom: string
  validTo: string
  isActive: boolean
  targetUsers: string[]
  createdAt: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, isAdmin, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'offers' | 'settings'>('overview')
  const [users, setUsers] = useState<AdminUser[]>([])
  const [offers, setOffers] = useState<Offer[]>([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null)
  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discount: 0,
    validFrom: '',
    validTo: '',
    targetUsers: [] as string[]
  })

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard')
    }
  }, [isAdmin, navigate])

  // Load data from Supabase
  useEffect(() => {
    loadUsers()
    loadOffers()
  }, [])

  const loadUsers = async () => {
    try {
      // Simulate API call to Supabase
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          email: 'admin@autoflow.com',
          name: 'Admin',
          role: 'admin',
          createdAt: '2024-01-01',
          isActive: true,
          subscriptionPlan: 'Enterprise',
          lastLogin: new Date().toISOString()
        },
        {
          id: '2',
          email: 'user1@example.com',
          name: 'User One',
          role: 'user',
          createdAt: '2024-01-05',
          isActive: true,
          subscriptionPlan: 'Professional',
          lastLogin: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          email: 'user2@example.com',
          name: 'User Two',
          role: 'user',
          createdAt: '2024-01-10',
          isActive: false,
          subscriptionPlan: 'Basic',
          lastLogin: new Date(Date.now() - 604800000).toISOString()
        }
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error('Failed to load users:', error)
    }
  }

  const loadOffers = async () => {
    try {
      // Simulate API call to Supabase
      const mockOffers: Offer[] = [
        {
          id: '1',
          title: '20% Off Professional Plan',
          description: 'Limited time offer for new users',
          discount: 20,
          validFrom: '2024-01-15',
          validTo: '2024-02-15',
          isActive: true,
          targetUsers: ['2', '3'],
          createdAt: '2024-01-15'
        }
      ]
      setOffers(mockOffers)
    } catch (error) {
      console.error('Failed to load offers:', error)
    }
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, isActive: !u.isActive } : u
    ))
  }

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId))
    }
  }

  const toggleOfferStatus = (offerId: string) => {
    setOffers(offers.map(o =>
      o.id === offerId ? { ...o, isActive: !o.isActive } : o
    ))
  }

  const deleteOffer = (offerId: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(o => o.id !== offerId))
    }
  }

  const createOffer = () => {
    if (!newOffer.title || !newOffer.discount || !newOffer.validFrom || !newOffer.validTo) {
      alert('Please fill in all fields')
      return
    }

    const offer: Offer = {
      id: Math.random().toString(36).substr(2, 9),
      ...newOffer,
      isActive: true,
      createdAt: new Date().toISOString()
    }

    setOffers([...offers, offer])
    setNewOffer({
      title: '',
      description: '',
      discount: 0,
      validFrom: '',
      validTo: '',
      targetUsers: []
    })
    setShowOfferModal(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <p>Manage users, offers, and platform settings</p>
        </div>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={20} />
          <span>Overview</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={20} />
          <span>Users ({users.length})</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'offers' ? 'active' : ''}`}
          onClick={() => setActiveTab('offers')}
        >
          <Gift size={20} />
          <span>Offers ({offers.length})</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>

      <div className="admin-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users-icon">
                  <Users size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Users</p>
                  <p className="stat-value">{users.length}</p>
                  <p className="stat-change">+2 this week</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon active-icon">
                  <Toggle2 size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Active Users</p>
                  <p className="stat-value">{users.filter(u => u.isActive).length}</p>
                  <p className="stat-change">{Math.round((users.filter(u => u.isActive).length / users.length) * 100)}% active</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon offers-icon">
                  <Gift size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Active Offers</p>
                  <p className="stat-value">{offers.filter(o => o.isActive).length}</p>
                  <p className="stat-change">{offers.length} total offers</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon revenue-icon">
                  <BarChart3 size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Monthly Revenue</p>
                  <p className="stat-value">$12,500</p>
                  <p className="stat-change">+15% vs last month</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-content">
                    <p className="activity-title">New user registered</p>
                    <p className="activity-description">user2@example.com joined the platform</p>
                  </div>
                  <p className="activity-time">2 hours ago</p>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">🎁</div>
                  <div className="activity-content">
                    <p className="activity-title">New offer created</p>
                    <p className="activity-description">20% Off Professional Plan</p>
                  </div>
                  <p className="activity-time">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>User Management</h2>
              <p>Manage all platform users</p>
            </div>

            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.email}</td>
                      <td>{u.name}</td>
                      <td>
                        <span className={`role-badge ${u.role}`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td>{u.subscriptionPlan || 'N/A'}</td>
                      <td>
                        <span className={`status-badge ${u.isActive ? 'active' : 'inactive'}`}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</td>
                      <td className="actions">
                        <button
                          className="action-btn toggle-btn"
                          onClick={() => toggleUserStatus(u.id)}
                          title={u.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {u.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                        <button className="action-btn edit-btn" title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteUser(u.id)}
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="offers-section">
            <div className="section-header">
              <h2>Offers Management</h2>
              <button
                className="btn btn-primary"
                onClick={() => setShowOfferModal(true)}
              >
                <Plus size={20} />
                <span>Create Offer</span>
              </button>
            </div>

            {showOfferModal && (
              <div className="modal-overlay" onClick={() => setShowOfferModal(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <h3>Create New Offer</h3>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={newOffer.title}
                      onChange={e => setNewOffer({ ...newOffer, title: e.target.value })}
                      placeholder="Offer title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={newOffer.description}
                      onChange={e => setNewOffer({ ...newOffer, description: e.target.value })}
                      placeholder="Offer description"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Discount (%)</label>
                      <input
                        type="number"
                        value={newOffer.discount}
                        onChange={e => setNewOffer({ ...newOffer, discount: parseInt(e.target.value) })}
                        placeholder="Discount percentage"
                      />
                    </div>
                    <div className="form-group">
                      <label>Valid From</label>
                      <input
                        type="date"
                        value={newOffer.validFrom}
                        onChange={e => setNewOffer({ ...newOffer, validFrom: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Valid To</label>
                      <input
                        type="date"
                        value={newOffer.validTo}
                        onChange={e => setNewOffer({ ...newOffer, validTo: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={() => setShowOfferModal(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={createOffer}>
                      Create Offer
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="offers-grid">
              {offers.map(offer => (
                <div key={offer.id} className="offer-card">
                  <div className="offer-header">
                    <h4>{offer.title}</h4>
                    <span className={`offer-status ${offer.isActive ? 'active' : 'inactive'}`}>
                      {offer.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="offer-description">{offer.description}</p>
                  <div className="offer-details">
                    <div className="detail">
                      <span className="label">Discount:</span>
                      <span className="value">{offer.discount}%</span>
                    </div>
                    <div className="detail">
                      <span className="label">Valid:</span>
                      <span className="value">{offer.validFrom} to {offer.validTo}</span>
                    </div>
                    <div className="detail">
                      <span className="label">Target Users:</span>
                      <span className="value">{offer.targetUsers.length} users</span>
                    </div>
                  </div>
                  <div className="offer-actions">
                    <button
                      className="action-btn toggle-btn"
                      onClick={() => toggleOfferStatus(offer.id)}
                      title={offer.isActive ? 'Deactivate' : 'Activate'}
                    >
                      <Toggle2 size={18} />
                    </button>
                    <button className="action-btn edit-btn" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => deleteOffer(offer.id)}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="settings-section">
            <div className="section-header">
              <h2>Platform Settings</h2>
            </div>
            <div className="settings-content">
              <div className="setting-item">
                <h4>Email Notifications</h4>
                <p>Send email notifications to users about new offers</p>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="setting-item">
                <h4>Maintenance Mode</h4>
                <p>Put the platform in maintenance mode</p>
                <input type="checkbox" />
              </div>
              <div className="setting-item">
                <h4>API Rate Limit</h4>
                <p>Set API rate limit per user (requests/hour)</p>
                <input type="number" defaultValue={1000} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
