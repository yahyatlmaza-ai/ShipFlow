import { useState } from 'react'
import { Settings as SettingsIcon, Store, Truck, User } from 'lucide-react'
import '../styles/settings.css'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-container">
        <div className="settings-nav">
          <button 
            className={`nav-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <User size={20} />
            Account
          </button>
          <button 
            className={`nav-item ${activeTab === 'stores' ? 'active' : ''}`}
            onClick={() => setActiveTab('stores')}
          >
            <Store size={20} />
            Stores
          </button>
          <button 
            className={`nav-item ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            <Truck size={20} />
            Shipping
          </button>
        </div>

        <div className="settings-content">
          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <p>Account settings coming soon...</p>
            </div>
          )}
          {activeTab === 'stores' && (
            <div className="settings-section">
              <h2>Connected Stores</h2>
              <p>Store management coming soon...</p>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div className="settings-section">
              <h2>Shipping Providers</h2>
              <p>Shipping provider management coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
