import React, { useState, useEffect } from 'react';
import { productsData, generateAISummary, getQuestionsForCategory } from './data';
import './index.css';

// SVG Icons to replace lucide-react
const Icons = {
  Globe: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  User: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>,
  Brain: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  ChevronDown: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Heart: ({ fill }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  X: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Sparkles: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="M3 12h18"/><path d="m18.36 5.64-12.72 12.72"/><path d="m5.64 5.64 12.72 12.72"/></svg>
};

const Header = ({ setShowAuth, navigateTo }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div onClick={() => navigateTo('home')} className="header-logo" style={{cursor: 'pointer'}}>CompareX</div>
      <nav className="header-nav">
        <div 
          className="nav-link dropdown-container" 
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
            CATEGORIES <Icons.ChevronDown />
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => navigateTo('category', 'SSD')}>SSD</div>
              <div className="dropdown-item" onClick={() => navigateTo('category', 'GRAPHICS CARDS')}>GRAPHICS CARDS</div>
              <div className="dropdown-item" onClick={() => navigateTo('category', 'CPUs')}>CPUs</div>
              <div className="dropdown-item" onClick={() => navigateTo('category', 'TOOLS')}>TOOLS</div>
              <div className="dropdown-item" onClick={() => navigateTo('category', 'MEMORY (RAM)')}>MEMORY (RAM)</div>
            </div>
          )}
        </div>
        <div className="nav-link" style={{cursor:'pointer'}} onClick={() => navigateTo('category', 'SSD')}>SSD</div>
        <div className="nav-link" style={{cursor:'pointer'}} onClick={() => navigateTo('category', 'GRAPHICS CARDS')}>GRAPHICS CARDS</div>
        <div className="nav-link" style={{cursor:'pointer'}} onClick={() => navigateTo('category', 'CPUs')}>CPUs</div>
        <div className="nav-link" style={{cursor:'pointer'}} onClick={() => navigateTo('category', 'TOOLS')}>TOOLS</div>
      </nav>
      <div className="header-actions">
        <div style={{ cursor: 'pointer' }}><Icons.Globe /></div>
        <div style={{ cursor: 'pointer' }} onClick={() => setShowAuth(true)}><Icons.User /></div>
      </div>
    </header>
  );
};

const Footer = ({ navigateTo }) => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-column">
        <h4>Resources</h4>
        <div className="footer-links">
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Blog</div>
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Glossary</div>
        </div>
      </div>
      <div className="footer-column">
        <h4>Get in touch</h4>
        <div className="footer-links">
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Suggest a product</div>
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Partnerships</div>
        </div>
      </div>
      <div className="footer-column">
        <h4>CompareX</h4>
        <div className="footer-links">
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>About us</div>
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Editorial guidelines</div>
        </div>
      </div>
      <div className="footer-column">
        <h4>Legal</h4>
        <div className="footer-links">
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Imprint</div>
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Privacy</div>
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Terms</div>
          <div className="footer-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>Cookies</div>
        </div>
      </div>
      <div className="footer-brand">
        <div className="footer-logo">CompareX</div>
        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Compare everything</div>
        <div className="social-icons">
          <div className="social-icon"><Icons.Globe /></div>
          <div className="social-icon"><Icons.User /></div>
        </div>
      </div>
    </div>
  </footer>
);

const ImagePlaceholder = () => (
  <div className="image-placeholder">
    <span>Image Placeholder</span>
  </div>
);

const ProductCard = ({ product, compareList, setCompareList, wishlist, setWishlist, navigateTo }) => {
  const isComparing = !!compareList.find(p => p.id === product.id);
  const inWishlist = !!wishlist.find(p => p.id === product.id);

  const toggleCompare = () => {
    if (isComparing) {
      setCompareList(compareList.filter(p => p.id !== product.id));
    } else {
      if (compareList.length < 3) {
        setCompareList([...compareList, product]);
      } else {
        alert("You can only compare up to 3 items side-by-side.");
      }
    }
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      setWishlist(wishlist.filter(p => p.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="product-card">
      <div style={{flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column'}} onClick={() => navigateTo('product', product.id)}>
        <div className="product-image-container">
          {product.image ? (
            <img src={product.image} alt={product.title} className="product-image" />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
        <div className="product-info">
          {product.isNew && <span className="badge-new">New product / </span>}
          <h3 className="product-title">{product.title}</h3>
          <p className="product-subtitle">{product.subtitle}</p>
        </div>
      </div>
      <div className="card-actions">
        <button 
          className={`btn-icon ${isComparing ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleCompare(); }}
          title="Add to compare"
        >
          {isComparing ? <Icons.Check /> : <Icons.Plus />}
        </button>
        <button 
          className={`btn-icon ${inWishlist ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(); }}
          title="Add to wishlist"
        >
          <Icons.Heart fill={inWishlist ? "currentColor" : "none"} />
        </button>
      </div>
    </div>
  );
};

const WaveDivider = () => (
  <div className="wave-divider">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
    </svg>
  </div>
);

const Home = ({ compareList, setCompareList, wishlist, setWishlist, navigateTo }) => {
  const topProducts = [
    productsData.find(p => p.id === 101),
    productsData.find(p => p.id === 201),
    productsData.find(p => p.id === 301),
    productsData.find(p => p.id === 401),
  ].filter(Boolean);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1 className="heading-xl">compare everything</h1>
          <p className="hero-subtitle">Compare Hardware, Software, Tools, and much more</p>
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Type here to compare" />
            <button className="btn btn-dark">Compare</button>
          </div>
        </div>
        <WaveDivider />
      </section>

      <section className="products-section">
        <h2 className="heading-lg" style={{marginBottom: '2rem'}}>Featured Products</h2>
        <div className="product-grid">
          {topProducts.map(product => (
             <ProductCard 
              key={product.id} 
              product={product} 
              compareList={compareList} setCompareList={setCompareList}
              wishlist={wishlist} setWishlist={setWishlist}
              navigateTo={navigateTo}
             />
          ))}
        </div>
      </section>

      <section className="mission-section">
        <div className="mission-content">
          <h2 className="heading-lg">94k products in 106 categories.<br/>A single objective.</h2>
          <p>We have been working for more than a decade to become your reference guide when it comes to comparisons. We are an impartial team of technology enthusiasts: our sole mission is to help you make informed decisions.</p>
          <div className="mission-actions">
            <button className="btn btn-primary" onClick={() => navigateTo('category', 'GRAPHICS CARDS')}>See all categories</button>
            <div className="link-action" style={{cursor: 'pointer'}} onClick={() => navigateTo('home')}>How we work →</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryPage = ({ categoryName, compareList, setCompareList, wishlist, setWishlist, navigateTo }) => {
  const products = productsData.filter(p => p.category === categoryName);

  return (
    <div>
      <section className="hero" style={{ padding: '8rem 2rem 4rem' }}>
        <div className="hero-content">
          <h1 className="heading-xl">{categoryName}</h1>
          <p className="hero-subtitle">Browse top {categoryName} and find what works for you.</p>
        </div>
        <WaveDivider />
      </section>

      <section className="products-section">
        <div className="product-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              compareList={compareList} setCompareList={setCompareList}
              wishlist={wishlist} setWishlist={setWishlist}
              navigateTo={navigateTo}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

const Compare = ({ compareList, setCompareList, navigateTo }) => {
  if (compareList.length === 0) {
    return (
      <div>
        <section className="hero" style={{ padding: '8rem 2rem 4rem' }}>
          <div className="hero-content">
            <h2 className="heading-lg">Nothing to compare</h2>
            <p className="hero-subtitle">Go back to the home page and add some items.</p>
            <button className="btn btn-dark" style={{marginTop: '2rem'}} onClick={() => navigateTo('home')}>Go to Home</button>
          </div>
          <WaveDivider />
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="hero" style={{ padding: '8rem 2rem 4rem' }}>
        <div className="hero-content">
          <h1 className="heading-lg">Side-by-side Comparison</h1>
          <button className="btn btn-dark" style={{marginTop: '1rem'}} onClick={() => navigateTo('home')}>Add More Items</button>
        </div>
        <WaveDivider />
      </section>

      <section className="products-section">
        <div className="compare-grid" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
          {compareList.map(product => (
            <div key={product.id} className="compare-col">
              <button className="btn-icon" style={{float: 'right'}} onClick={() => setCompareList(compareList.filter(p => p.id !== product.id))}>
                <Icons.X />
              </button>
              {product.image ? (
                <img src={product.image} alt={product.title} className="compare-img" />
              ) : (
                <div className="compare-img" style={{background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: '#9ca3af', fontSize: '0.8rem'}}>No image</span>
                </div>
              )}
              <h3 className="heading-md">{product.title}</h3>
              <p className="product-subtitle" style={{marginBottom: '1.5rem'}}>{product.category}</p>

              <dl className="feature-list">
                {Object.entries(product.features).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ProductDetail = ({ productId, navigateTo }) => {
  const product = productsData.find(p => p.id === productId);

  if (!product) return <div>Product Not Found</div>;

  return (
    <div>
      <section className="hero" style={{ padding: '8rem 2rem 4rem' }}>
        <div className="hero-content">
          <div className="link-action" style={{marginBottom: '1rem', cursor: 'pointer', color: 'white'}} onClick={() => navigateTo('category', product.category)}>← Back to {product.category}</div>
          <h1 className="heading-lg">{product.title}</h1>
          <p className="hero-subtitle">{product.category}</p>
        </div>
        <WaveDivider />
      </section>

      <section className="products-section">
        <div className="compare-grid">
          <div style={{gridColumn: 'span 1'}}>
            {product.image ? (
              <img src={product.image} alt={product.title} className="compare-img" style={{maxWidth: '100%', aspectRatio: 'auto'}} />
            ) : (
              <div style={{background: '#f3f4f6', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px'}}>
                <span style={{color: '#9ca3af'}}>Image Placeholder</span>
              </div>
            )}
          </div>
          <div style={{gridColumn: 'span 2'}}>
            <div className="ai-summary">
              <div className="ai-summary-header"><Icons.Sparkles /> AI Review Summary</div>
              <p>{generateAISummary(product)}</p>
            </div>

            <div className="reviews-section">
              <h3 className="heading-md" style={{marginBottom: '1rem'}}>User Reviews ({product.reviews?.length || 0})</h3>
              {product.reviews?.map((r, i) => (
                <div key={i} className="review-card">
                  <div className="review-header">
                    <strong>{r.user}</strong>
                    <span>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                  </div>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentParam, setCurrentParam] = useState(null);
  
  const [compareList, setCompareList] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [user, setUser] = useState(null);

  // Load from fake backend
  useEffect(() => {
    const savedUser = localStorage.getItem('versus_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedWishlist = localStorage.getItem('versus_wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to fake backend
  useEffect(() => {
    localStorage.setItem('versus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = { name: "Test User", email: "user@test.com" };
    setUser(newUser);
    localStorage.setItem('versus_user', JSON.stringify(newUser));
    setShowAuth(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('versus_user');
  };

  const navigateTo = (page, param = null) => {
    setCurrentPage(page);
    setCurrentParam(param);
    window.scrollTo(0,0);
  };

  const quizCategory = currentPage === 'category' ? currentParam : (currentPage === 'product' ? productsData.find(p => p.id === currentParam)?.category : 'default');
  const quizQuestions = getQuestionsForCategory(quizCategory);

  return (
    <div className="app-container">
      <Header setShowAuth={setShowAuth} navigateTo={navigateTo} />
      
      <main className="main-content" style={{ paddingBottom: '100px' }}>
        {currentPage === 'home' && 
          <Home 
            compareList={compareList} setCompareList={setCompareList} 
            wishlist={wishlist} setWishlist={setWishlist} 
            navigateTo={navigateTo}
          />
        }
        {currentPage === 'category' && 
          <CategoryPage 
            categoryName={currentParam}
            compareList={compareList} setCompareList={setCompareList} 
            wishlist={wishlist} setWishlist={setWishlist} 
            navigateTo={navigateTo}
          />
        }
        {currentPage === 'compare' && 
          <Compare 
            compareList={compareList} setCompareList={setCompareList} 
            navigateTo={navigateTo}
          />
        }
        {currentPage === 'product' && 
          <ProductDetail 
            productId={currentParam} 
            navigateTo={navigateTo}
          />
        }
      </main>

      <Footer navigateTo={navigateTo} />

      {/* Floating Compare Bar */}
      {compareList.length > 0 && (
        <div className="compare-bar-fixed" style={{ bottom: 0, left: 0, right: 0, borderRadius: 0 }}>
          <span>{compareList.length}/3 items selected</span>
          <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
            {compareList.map(p => (
              <div key={p.id} className="compare-item-chip">
                {p.title} 
                <button onClick={() => setCompareList(compareList.filter(item => item.id !== p.id))}><Icons.X /></button>
              </div>
            ))}
          </div>
          <button onClick={() => navigateTo('compare')} className="btn btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.875rem'}}>Compare Now</button>
        </div>
      )}

      {/* Floating Quiz Button bottom right */}
      <button 
        onClick={() => setShowQuiz(true)}
        style={{
          position: 'fixed',
          bottom: compareList.length > 0 ? '5rem' : '2rem',
          right: '2rem',
          zIndex: 100,
          background: 'var(--primary)',
          color: '#fff',
          border: 'none',
          padding: '1rem',
          borderRadius: '999px',
          boxShadow: '0 8px 16px rgba(103,92,255,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Icons.Brain /> Smart Quiz
      </button>

      {/* Auth Modal */}
      {showAuth && (
        <div className="quiz-overlay" onClick={() => setShowAuth(false)}>
          <div className="quiz-modal" onClick={e => e.stopPropagation()}>
            <h2 className="heading-md" style={{marginBottom: '1.5rem'}}>{user ? 'Your Account' : 'Sign In'}</h2>
            {user ? (
              <div>
                <p>Welcome, {user.name}!</p>
                <p>Wishlist count: {wishlist.length}</p>
                <button onClick={handleLogout} className="btn btn-dark" style={{marginTop: '2rem'}}>Log Out</button>
              </div>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label style={{display:'block', marginBottom:'0.5rem'}}>Email</label>
                  <input type="email" className="form-input" required defaultValue="user@test.com" />
                </div>
                <div className="form-group">
                  <label style={{display:'block', marginBottom:'0.5rem'}}>Password</label>
                  <input type="password" className="form-input" required defaultValue="password" />
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop:'1rem'}}>Sign In / Register</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="quiz-overlay" onClick={() => setShowQuiz(false)}>
          <div className="quiz-modal" onClick={e => e.stopPropagation()}>
            <h2 className="heading-md" style={{marginBottom: '1rem'}}><span style={{color: 'var(--primary)', verticalAlign: 'middle', marginRight: '0.5rem'}}><Icons.Brain /></span> Smart Recommendation</h2>
            
            <p style={{marginBottom: '1.5rem'}}>
              {quizCategory === 'default' 
                ? "Answer a few questions and we'll suggest the best product for you!" 
                : `Answer a few questions to find the best ${quizCategory.toLowerCase()} for you!`}
            </p>
            
            <div className="quiz-options">
              {quizQuestions.map((q, idx) => (
                <button key={idx} className="quiz-btn" onClick={() => {
                  alert(`Based on your answer, we strongly recommend: ${q.recommendation}!`);
                  setShowQuiz(false);
                }}>
                  {q.label}
                </button>
              ))}
            </div>
            
            <button className="btn" style={{marginTop: '2rem'}} onClick={() => setShowQuiz(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
