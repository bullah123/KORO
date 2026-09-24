import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, Plus, X } from 'lucide-react';
import './index.css';

const allMenuData = [
  // FRESH FRUIT JUICES
  { id: 1, category: "FRESH FRUIT JUICES", name: "VELVET PLUM", price: "Rs.365", desc: "Sweet, chilled plum juice with a refreshing finish.", img: "/assets/drinks/velvet-plum.jpg" },
  { id: 2, category: "FRESH FRUIT JUICES", name: "GOLDEN PEACH", price: "Rs.365", desc: "Fresh peach blended into a smooth, fruity refreshment.", img: "/assets/drinks/golden-peach.jpg" },
  { id: 3, category: "FRESH FRUIT JUICES", name: "PEAR BLISS", price: "Rs.365", desc: "Crisp pear juice with a naturally sweet taste.", img: "/assets/drinks/pear-bliss.jpg" },
  { id: 4, category: "FRESH FRUIT JUICES", name: "MIDNIGHT PLUM", price: "Rs.365", desc: "Rich black plum juice packed with bold flavor.", img: "/assets/drinks/midnight-plum.jpg" },
  // PREMIUM SHAKES
  { id: 5, category: "PREMIUM SHAKES", name: "CHOCOLATE CRUNCH", price: "Rs.599", desc: "Chocolate shake inspired by KitKat flavors.", img: "/assets/drinks/chocolate-crunch.jpg" },
  { id: 6, category: "PREMIUM SHAKES", name: "COOKIES SUPREME", price: "Rs.599", desc: "Rich cookies & cream milkshake.", img: "/assets/drinks/cookies-supreme.jpg" },
  { id: 7, category: "PREMIUM SHAKES", name: "MANGO VELVET", price: "Rs.599", desc: "Thick mango shake made with ripe mangoes.", img: "/assets/drinks/mango-velvet.jpg" },
  { id: 8, category: "PREMIUM SHAKES", name: "ROYAL DATE", price: "Rs.599", desc: "Creamy shake blended with premium dates.", img: "/assets/drinks/royal-date.jpg" },
  // SIGNATURE COFFEE
  { id: 9, category: "SIGNATURE COFFEE", name: "BLOOM LATTE", price: "Rs.645", desc: "Creamy latte with Lotus Biscoff essence.", img: "/assets/drinks/bloom-latte.jpg" },
  { id: 10, category: "SIGNATURE COFFEE", name: "VANILLA DREAM", price: "Rs.645", desc: "Smooth vanilla infused latte with sweet elegance.", img: "/assets/drinks/vanilla-dream.jpg" },
  // PREMIUM COFFEES
  { id: 11, category: "PREMIUM COFFEES", name: "MOCHA FROST", price: "Rs.599", desc: "Rich chocolate coffee blended with icy mocha magic.", img: "/assets/drinks/mocha-frost.jpg" },
  { id: 12, category: "PREMIUM COFFEES", name: "BUTTERSCOTCH", price: "Rs.599", desc: "Butterscotch & caramel syrup blended into coffee.", img: "/assets/drinks/butterscotch.jpg" },
  { id: 13, category: "PREMIUM COFFEES", name: "HAZELNUT HEAVEN", price: "Rs.599", desc: "Smooth hazelnut flavor with a creamy finish.", img: "/assets/drinks/hazelnut-heaven.jpg" },
  { id: 14, category: "PREMIUM COFFEES", name: "CARAMEL CRUSH", price: "Rs.599", desc: "Silk caramel syrup blended for a velvety taste.", img: "/assets/drinks/caramel-crush.jpg" }
];

const categories = ["ALL", "FRESH FRUIT JUICES", "PREMIUM SHAKES", "SIGNATURE COFFEE", "PREMIUM COFFEES"];

const Reveal = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const LegalModal = ({ title, content, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <motion.div 
          className="modal-content"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
          <h2 className="modal-title">{title}</h2>
          <div className="modal-body">{content}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeModal, setActiveModal] = useState(null);
  
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearTimeout(timer);
    };
  }, []);

  const filteredMenu = activeFilter === "ALL" ? allMenuData : allMenuData.filter(item => item.category === activeFilter);

  return (
    <>
      {/* Background Glowing Blobs for Vibrancy */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <div className="bg-blob blob-3"></div>

      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="preloader"
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="preloader-text">KORO.</div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="cursor-dot" 
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} 
      />
      <div 
        className="cursor-outline" 
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }} 
      />

      <nav className="nav-modern">
        <div className="nav-brand">KORO.</div>
        <div className="nav-items">
          <a href="#menu" className="hover-link">MENU</a>
          <a href="#vision" className="hover-link">VISION</a>
          <a href="#locations" className="hover-link">LOCATIONS</a>
        </div>
        <a href="https://wa.me/923134980609" target="_blank" rel="noreferrer" className="btn-magnetic" style={{textDecoration: 'none'}}>GET IN TOUCH</a>
      </nav>

      {/* Hero Section */}
      <section className="hero-ultra">
        <div className="hero-bg-glow"></div>
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 2.2, duration: 1 }}
            className="hero-tagline"
          >
            THE NEW STANDARD OF
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 2.4, duration: 1.2, ease: "easeOut" }}
            className="hero-title"
          >
            LIQUID ART
          </motion.h1>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 2.6, duration: 1 }}
          className="hero-visuals"
        >
          <div className="floating-cup">
            <div className="cup-body">
              <div className="cup-lid"></div>
              <div className="straw"></div>
              <div className="cup-logo">KORO</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 3, duration: 1 }}
          className="hero-bottom"
        >
          <p>Premium. Fresh. Unapologetically Bold. Experience the cart.</p>
          <div className="scroll-indicator">
            <p>SCROLL TO EXPLORE</p>
          </div>
        </motion.div>
      </section>

      {/* Advanced E-Commerce Style Menu Grid */}
      <section id="menu" className="premium-menu-section">
        <Reveal>
          <div className="menu-header">
            <h2 className="outline-text">FULL COLLECTION</h2>
            <p className="menu-tagline">"Made Fresh. Made For You."</p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          {/* Filters */}
          <div className="filter-container">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div layoutId="filterIndicator" className="filter-indicator" />
                )}
              </button>
            ))}
          </div>

          {/* Staggered Grid of Cards */}
          <motion.div layout className="drinks-grid">
            <AnimatePresence>
              {filteredMenu.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="drink-card"
                >
                  <div className="drink-card-inner">
                    <div className="drink-img-wrapper">
                      <img src={item.img} alt={item.name} className="drink-img" />
                      <div className="drink-price-tag">{item.price}</div>
                      <div className="drink-hover-overlay">
                        <button className="add-btn"><Plus size={24} /></button>
                      </div>
                    </div>
                    <div className="drink-info">
                      <div className="drink-category">{item.category}</div>
                      <h3 className="drink-name">{item.name}</h3>
                      <p className="drink-desc">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="addons-section">
            <h4 className="addons-title">PREMIUM ADD-ONS</h4>
            <div className="addons-list">
              <span className="addon-badge">FRESH MINT</span>
              <span className="addon-badge">CHIA SEEDS</span>
              <span className="addon-badge">LEMON SLICE</span>
              <span className="addon-badge">EXTRA ICE</span>
              <span className="addon-badge">HONEY DRIZZLE</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Vision Section */}
      <section id="vision" className="vision-section glass-section">
        <div className="vision-grid">
          <Reveal>
            <div>
              <h2 className="section-title">NOT JUST<br/><span className="pink">A DRINK</span></h2>
              <p className="lead">We're redefining the street coffee and juice experience. Using 100% natural ingredients, premium roasts, and aesthetic packaging that makes every sip an event.</p>
            </div>
          </Reveal>
          <div className="vision-stats">
            <motion.div className="stat-box">
              <div className="stat-num">18<span className="pink">HR</span></div>
              <div>Slow Cold Brew</div>
            </motion.div>
            <motion.div className="stat-box">
              <div className="stat-num">0<span className="pink">%</span></div>
              <div>Artificial Additives</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Location Section */}
      <section id="locations" className="premium-location-wrapper">
        <Reveal>
          <div className="menu-header" style={{marginBottom: '0'}}>
            <h2 className="outline-text">FIND US</h2>
            <p className="menu-tagline">"Your Daily Fix."</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="location-radar-container">
            <div className="radar-ring"></div>
            <div className="radar-ring"></div>
            <div className="radar-ring"></div>
            <div className="radar-ring"></div>
            
            <div className="location-center-pin">
              <MapPin size={32} color="#E91E63" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="location-glass-card">
            <h3 style={{marginBottom: '2rem'}}>KORO FRESH DRINK BEVERAGE</h3>
            
            <a href="https://www.google.com/maps/search/?api=1&query=30.970075,72.494882" target="_blank" rel="noreferrer" className="btn-neon-glow">
              OPEN IN MAPS <ArrowRight size={20} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Pre-Footer CTA */}
      <section className="pre-footer-cta">
        <Reveal>
          <h2 className="massive-text thirsty-title">THIRSTY?</h2>
          <a href="https://wa.me/923134980609" target="_blank" rel="noreferrer" className="btn-magnetic btn-huge order-btn">
            ORDER NOW <ArrowRight size={24} style={{marginLeft: '10px'}} />
          </a>
        </Reveal>
      </section>

      {/* Premium Footer */}
      <footer className="koro-premium-footer">
        <div className="footer-content-grid">
          <div className="footer-col-brand">
            <h2 className="footer-logo">KORO.</h2>
            <p className="footer-brand-desc">Not Just A Drink.<br/>Your Daily Fix.</p>
          </div>
          
          <div className="footer-col-links">
            <h4>EXPLORE</h4>
            <a href="#menu" className="footer-link">Menu</a>
            <a href="#vision" className="footer-link">Vision</a>
            <a href="#locations" className="footer-link">Find Us</a>
          </div>

          <div className="footer-col-socials">
            <h4>CONNECT</h4>
            <a href="https://wa.me/923134980609" target="_blank" rel="noreferrer" className="footer-link">WhatsApp</a>
            <a href="https://www.instagram.com/koro.freshdrinks?stkn=MWhiaml3d3B3N3FpeA==" target="_blank" rel="noreferrer" className="footer-link">Instagram</a>
          </div>
        </div>
        
        <div className="footer-bottom-bar">
          <p>© 2026 KORO DRINKS. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal">
            <button onClick={() => setActiveModal('privacy')} className="footer-legal-link" style={{background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:'inherit'}}>Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} className="footer-legal-link" style={{background:'none', border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:'inherit'}}>Terms</button>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="PRIVACY POLICY" 
        content={
          <>
            <p><strong>Last Updated:</strong> 2026</p>
            <p>Welcome to KORO Fresh Drinks. We value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.</p>
            <h3>1. Information We Collect</h3>
            <p>We may collect basic information such as your IP address, browser type, and interactions with our site to improve user experience. If you contact us via WhatsApp, we will have your phone number.</p>
            <h3>2. How We Use Information</h3>
            <p>Your information is solely used to process orders, improve our website, and occasionally send promotional offers if you opt-in.</p>
            <h3>3. Data Protection</h3>
            <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. All data is encrypted and securely stored.</p>
          </>
        } 
      />

      <LegalModal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
        title="TERMS OF SERVICE" 
        content={
          <>
            <p><strong>Last Updated:</strong> 2026</p>
            <p>By accessing and using the KORO Fresh Drinks website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            <h3>1. Use of Site</h3>
            <p>You may only use our site for lawful purposes. You agree not to interrupt or attempt to interrupt the operation of this site in any way.</p>
            <h3>2. Intellectual Property</h3>
            <p>All content included on this site, such as text, graphics, logos, images, and audio clips, is the property of KORO Fresh Drinks and protected by copyright laws.</p>
            <h3>3. Product Accuracy</h3>
            <p>We attempt to be as accurate as possible with our product descriptions and pricing, but we do not warrant that product descriptions are completely error-free.</p>
          </>
        } 
      />
    </>
  );
}
