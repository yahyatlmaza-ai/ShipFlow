import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, BarChart3, Truck } from 'lucide-react'
import '../styles/landing.css'

export default function Landing() {
  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">Auto Flow</span>
            </div>
            <div className="nav-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link primary">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Automate Your Logistics, <span className="text-gradient">Scale Your Business</span>
            </h1>
            <p className="hero-subtitle">
              The all-in-one order management and shipping automation platform built for Algerian and international e-commerce. Connect your stores, automate shipping, and grow faster.
            </p>
            <div className="hero-buttons">
              <a href="https://wa.me/0794157508" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>Start on WhatsApp</span>
                <ArrowRight size={20} />
              </a>
              <Link to="/signup" className="btn btn-secondary">
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={32} />
              </div>
              <h3>Order Management</h3>
              <p>Centralize orders from all your stores and manage them efficiently in one dashboard.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={32} />
              </div>
              <h3>Multi-Carrier Shipping</h3>
              <p>Integrate with Yalidine, ZR Express, DHL, FedEx, and more shipping providers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={32} />
              </div>
              <h3>Real-time Analytics</h3>
              <p>Track your business performance with comprehensive analytics and reporting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security and 99.9% uptime for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing">
        <div className="container">
          <h2 className="section-title">Simple Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Professional</h3>
              <div className="price">
                <span className="amount">20,000</span>
                <span className="currency">DZD</span>
              </div>
              <p className="period">180 days</p>
              <ul className="features-list">
                <li>✓ 5,000 orders</li>
                <li>✓ Multi-store integration</li>
                <li>✓ Basic support</li>
              </ul>
              <button className="btn btn-outline">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <div className="badge">Popular</div>
              <h3>Business VIP</h3>
              <div className="price">
                <span className="amount">45,000</span>
                <span className="currency">DZD</span>
              </div>
              <p className="period">5.5 years</p>
              <ul className="features-list">
                <li>✓ Unlimited orders</li>
                <li>✓ All integrations</li>
                <li>✓ 24/7 VIP support</li>
                <li>✓ Dedicated account manager</li>
              </ul>
              <button className="btn btn-primary">Get Started</button>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">
                <span className="amount">Custom</span>
              </div>
              <p className="period">Custom period</p>
              <ul className="features-list">
                <li>✓ Everything in VIP</li>
                <li>✓ Custom integrations</li>
                <li>✓ White label support</li>
                <li>✓ API access</li>
              </ul>
              <button className="btn btn-outline">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Ready to automate your logistics?</h2>
          <p>Join hundreds of e-commerce businesses using Auto Flow</p>
          <a href="https://wa.me/0794157508" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-large">
            Contact Us on WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Auto Flow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
