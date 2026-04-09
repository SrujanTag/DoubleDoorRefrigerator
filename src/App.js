import React, { useState, useEffect } from 'react';
import { productsData, generateAISummary } from './data';
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
  Sparkles: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18"/><path d="M3 12h18"/><path d="m18.36 5.64-12.72 12.72"/><path d="m5.64 5.64 12.72 12.72"/></svg>,
  ArrowLeft: () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
};

const Header = ({ setShowAuth, navigateTo, wishlist, setWishlist }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div onClick={() => navigateTo('home')} className="header-logo" style={{cursor: 'pointer'}}>CompareX</div>
      <nav className="header-nav">
        <div className="nav-link" style={{cursor:'pointer'}} onClick={() => navigateTo('home')}>HOME</div>
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
        <div 
          style={{ cursor: 'pointer', position: 'relative' }} 
          onClick={() => navigateTo('wishlist')}
        >
          <Icons.Heart fill={wishlist?.length > 0 ? "currentColor" : "none"} />
          {wishlist?.length > 0 && <span style={{position:'absolute', top:-8, right:-8, background:'var(--secondary)', color:'white', fontSize:'0.7rem', fontWeight:'bold', padding:'2px 6px', borderRadius:'10px'}}>{wishlist.length}</span>}
        </div>
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
          {product.scores && product.scores.Overall && (
            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ background: 'var(--primary)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {product.scores.Overall}
              </div>
              <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>CompareXscore</span>
            </div>
          )}
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

  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = productsData.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleSelectProduct = (id) => {
    setSearchTerm('');
    setShowResults(false);
    navigateTo('product', id);
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1 className="heading-xl">Compare Everything</h1>
          <p className="hero-subtitle">Compare Hardware, Software, Tools, and much more</p>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div className="search-container" style={{ margin: 0 }}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Type here to compare" 
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowResults(true)}
              />
              <button className="btn btn-dark" onClick={() => searchResults.length > 0 && handleSelectProduct(searchResults[0].id)}>Search</button>
            </div>
            {showResults && searchTerm.trim() !== '' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                marginTop: '0.5rem',
                maxHeight: '300px',
                overflowY: 'auto',
                zIndex: 50,
                textAlign: 'left'
              }}>
                {searchResults.length > 0 ? (
                  searchResults.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => handleSelectProduct(p.id)}
                      style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', color: '#111827' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <img src={p.image || 'https://via.placeholder.com/40'} alt={p.title} style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', background: '#f3f4f6' }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{p.title}</div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{p.category}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '1rem', color: '#6b7280', textAlign: 'center' }}>No products found</div>
                )}
              </div>
            )}
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

              <h4 className="heading-sm" style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Scores</h4>
              {product.scores && (
                <div style={{marginBottom: '1.5rem'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                    <span>Overall</span>
                    <span style={{color: 'var(--primary)'}}>{product.scores.Overall}</span>
                  </div>
                  {Object.entries(product.scores).filter(([k]) => k !== 'Overall').map(([key, value]) => (
                    <div key={key} style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.2rem'}}>
                      <span>{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {product.category === 'TOOLS' && product.specifications?.Description && (
                <div style={{marginBottom: '1.5rem', background: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                  <h4 className="heading-sm" style={{marginBottom: '0.5rem', color: '#111827'}}>About</h4>
                  <p style={{fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5', marginBottom: '1rem'}}>{product.specifications.Description}</p>
                  
                  <h4 className="heading-sm" style={{marginBottom: '0.5rem', color: '#111827'}}>Primary Use Case</h4>
                  <p style={{fontSize: '0.9rem', color: '#4b5563', lineHeight: '1.5', margin: 0}}>{product.specifications.PrimaryUseCase}</p>
                </div>
              )}

              {product.category === 'TOOLS' && (
                <div style={{marginBottom: '1.5rem', background: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb'}}>
                  <h4 className="heading-sm" style={{marginBottom: '0.5rem', color: '#111827'}}>Pricing & Plans</h4>
                  {product.specifications?.FreeTier ? (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                      <div><strong>Free:</strong> <span style={{fontSize: '0.85rem', color: '#4b5563'}}>{product.specifications.FreeTier}</span></div>
                      <div><strong>Pro:</strong> <span style={{fontSize: '0.85rem', color: '#4b5563'}}>{product.specifications.ProTier}</span></div>
                      <div><strong>Enterprise:</strong> <span style={{fontSize: '0.85rem', color: '#4b5563'}}>{product.specifications.EnterpriseTier}</span></div>
                    </div>
                  ) : (
                    <p style={{fontSize: '0.85rem', color: '#4b5563', margin: 0}}><strong>Open Source & Free</strong><br/>License: {product.specifications?.License || 'Open Source'}</p>
                  )}
                </div>
              )}

              <h4 className="heading-sm" style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>{product.category === 'TOOLS' ? 'Tool Details' : 'Specifications'}</h4>
              <dl className="feature-list">
                {Object.entries(product.specifications || product.features).filter(([key]) => !['Description', 'PrimaryUseCase', 'FreeTier', 'ProTier', 'EnterpriseTier'].includes(key)).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </React.Fragment>
                ))}
              </dl>

              {product.benchmarks && (
                <>
                  <h4 className="heading-sm" style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>{product.category === 'TOOLS' ? 'Community Metrics' : 'User Benchmarks'}</h4>
                  <dl className="feature-list">
                    {Object.entries(product.benchmarks).map(([key, value]) => (
                      <React.Fragment key={key}>
                        <dt>{key}</dt>
                        <dd>{value}</dd>
                      </React.Fragment>
                    ))}
                  </dl>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const WishlistPage = ({ wishlist, setWishlist, navigateTo, compareList, setCompareList }) => {
  return (
    <div>
      <section className="hero" style={{ padding: '8rem 2rem 4rem' }}>
        <div className="hero-content">
          <h1 className="heading-xl">Your Wishlist</h1>
          <p className="hero-subtitle">{wishlist.length} items saved</p>
        </div>
        <WaveDivider />
      </section>

      <section className="products-section">
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2 className="heading-md" style={{ color: '#9ca3af' }}>Your wishlist is currently empty.</h2>
            <button className="btn btn-primary" style={{marginTop: '2rem'}} onClick={() => navigateTo('home')}>Explore Products</button>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                compareList={compareList} setCompareList={setCompareList}
                wishlist={wishlist} setWishlist={setWishlist}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const ProductDetail = ({ productId, navigateTo }) => {
  const product = productsData.find(p => p.id === productId);

  if (!product) return <div>Product Not Found</div>;

  const avgRating = product.ratingStats?.avg || "0.0";
  const ratingCounts = product.ratingStats || {total: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0};

  return (
    <div>
      <section className="hero" style={{ padding: '6rem 2rem 2rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '5.5rem', left: '2rem', zIndex: 10 }}>
          <div style={{ cursor: 'pointer', color: 'white', display: 'inline-block', transition: 'transform 0.2s', padding: '0.5rem 0' }} onClick={() => navigateTo('category', product.category)} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <Icons.ArrowLeft />
          </div>
        </div>
        <WaveDivider />
      </section>

      <section className="products-section" style={{ paddingTop: '0', marginTop: '-4rem', position: 'relative', zIndex: 20 }}>
        {/* Image Left, Name Center/Right with 2-lines small text below */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: '3rem', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ flex: '0 0 250px' }}>
            {product.image ? (
              <img src={product.image} alt={product.title} style={{maxWidth: '100%', height: 'auto', borderRadius: '8px', objectFit: 'contain'}} />
            ) : (
              <div style={{background: '#f3f4f6', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px'}}>
                <span style={{color: '#9ca3af'}}>Image Placeholder</span>
              </div>
            )}
          </div>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', paddingRight: '2rem' }}>
            <h1 className="heading-xl" style={{ margin: 0, color: '#111827' }}>{product.title}</h1>
            <p style={{fontSize: '0.85rem', color: '#6b7280', lineHeight: '1.5', marginTop: '0.5rem', maxWidth: '600px'}}>
              {product.subtitle}. {product.category === 'TOOLS' ? `This software tool is preferred by developers across the globe. CompareX aggregate data confirms its position as a leading choice for open-source development.` : `This ${product.category.toLowerCase()} is highly documented emphasizing pure performance. CompareX aggregate data confirms it stands out for long-term usage and robust feature inclusion.`}
            </p>
          </div>
        </div>

        {/* About Feature */}
        {product.category === 'TOOLS' && product.specifications?.Description && (
          <div style={{ marginBottom: '3rem', background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', borderLeft: '4px solid var(--primary)' }}>
            <h3 className="heading-lg" style={{marginBottom: '1.5rem'}}>About this Tool</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <div>
                <h4 style={{fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem', fontSize: '1.1rem'}}>Description</h4>
                <p style={{fontSize: '1rem', color: '#4b5563', lineHeight: '1.6', margin: 0}}>{product.specifications.Description}</p>
              </div>
              <div>
                <h4 style={{fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem', fontSize: '1.1rem'}}>Primary Use Case</h4>
                <p style={{fontSize: '1rem', color: '#4b5563', lineHeight: '1.6', margin: 0}}>{product.specifications.PrimaryUseCase}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pricing & Plans Section for TOOLS */}
        {product.category === 'TOOLS' && (
          <div style={{ marginBottom: '3rem', background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="heading-lg" style={{marginBottom: '1.5rem'}}>Pricing & Plans</h3>
            {product.specifications?.FreeTier ? (
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #10b981' }}>
                  <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827'}}>Free Tier</h4>
                  <p style={{color: '#4b5563', fontSize: '0.95rem', margin: 0}}>{product.specifications.FreeTier}</p>
                </div>
                <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #3b82f6' }}>
                  <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827'}}>Pro Tier</h4>
                  <p style={{color: '#4b5563', fontSize: '0.95rem', margin: 0}}>{product.specifications.ProTier}</p>
                </div>
                <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', borderTop: '4px solid #6366f1' }}>
                  <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827'}}>Enterprise Tier</h4>
                  <p style={{color: '#4b5563', fontSize: '0.95rem', margin: 0}}>{product.specifications.EnterpriseTier}</p>
                </div>
              </div>
            ) : (
              <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
                <h4 style={{fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#111827'}}>Open Source & Free</h4>
                <p style={{color: '#4b5563', fontSize: '0.95rem', margin: 0}}>This tool does not have paid subscription tiers. It is free to use under its respective license: <strong>{product.specifications?.License || 'Open Source'}</strong>.</p>
              </div>
            )}
          </div>
        )}

        {/* Specifications */}
        {product.specifications && (
          <div style={{ marginBottom: '3rem', background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="heading-lg" style={{marginBottom: '1.5rem'}}>{product.category === 'TOOLS' ? 'Tool Details' : 'Specifications'}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(product.specifications).filter(([key]) => !['Description', 'PrimaryUseCase', 'FreeTier', 'ProTier', 'EnterpriseTier'].includes(key)).map(([key, value]) => (
                <div key={key} style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{key}</div>
                  <div style={{ fontWeight: '600', color: '#111827', fontSize: '1.1rem' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CompareXscore */}
        {product.scores && (
          <div style={{ marginBottom: '3rem', background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="heading-lg" style={{marginBottom: '2rem'}}>CompareXscore</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'center' }}>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: '140px', height: '140px', borderRadius: '50%', border: '10px solid var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', lineHeight: '1' }}>{product.scores.Overall}</span>
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>out of 100</span>
                </div>
                <div style={{marginTop: '1rem', fontWeight: '600', color: '#4b5563'}}>Overall Score</div>
              </div>
              
              <div>
                {Object.entries(product.scores).filter(([k]) => k !== 'Overall').map(([key, value]) => (
                  <div key={key} style={{marginBottom: '1rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1rem', marginBottom: '0.3rem'}}>
                      <span style={{fontWeight: '500', color: '#374151'}}>{key}</span>
                      <span style={{fontWeight: 'bold', color: 'var(--primary)'}}>{value}/100</span>
                    </div>
                    <div style={{height: '10px', background: '#e5e7eb', borderRadius: '5px', overflow: 'hidden'}}>
                      <div style={{height: '100%', width: value + '%', background: 'var(--primary)', borderRadius: '5px'}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Benchmarks */}
        {product.benchmarks && (
          <div style={{ marginBottom: '3rem', background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '2px solid #f3f4f6' }}>
            <h3 className="heading-lg" style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Icons.Sparkles /> {product.category === 'TOOLS' ? 'Community Metrics' : 'User Benchmarks'}</h3>
            <p style={{color: '#6b7280', marginBottom: '2rem'}}>{product.category === 'TOOLS' ? 'Aggregated community metrics and usage statistics derived from open source development data.' : 'Aggregated real-life benchmarks and metrics calculated using community hardware reporting.'}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(product.benchmarks).map(([key, value]) => (
                <div key={key} style={{ background: '#111827', color: 'white', padding: '1.5rem', borderRadius: '8px' }}>
                  <div style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{key}</div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buy Links */}
        {product.prices && (
          <div style={{ marginBottom: '3rem', background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="heading-lg" style={{marginBottom: '1.5rem'}}>{product.category === 'TOOLS' ? 'Official Links' : 'Where to buy'}</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem'}}>
              {Object.entries(product.prices).filter(([store]) => product.category !== 'TOOLS' || store === 'official').map(([store, details]) => (
                <a href={details.link} target="_blank" rel="noopener noreferrer" key={store} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', border: '1px solid #e5e7eb', borderRadius: '8px', textDecoration: 'none', color: 'inherit', background: '#f9fafb', transition: 'all 0.2s'}}>
                  <span style={{textTransform: 'capitalize', fontWeight: '600', fontSize: '1.1rem'}}>{store}</span>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <span style={{fontWeight: '900', color: 'var(--primary)', fontSize: '1.2rem'}}>{details.price}</span>
                    <Icons.Globe />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Ratings Summary */}
        <div style={{ marginBottom: '3rem', background: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
           <h3 className="heading-lg" style={{marginBottom: '1.5rem'}}>User Ratings Summary</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '3rem', alignItems: 'center' }}>
             <div style={{ textAlign: 'center' }}>
               <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#111827', lineHeight: '1' }}>{avgRating}</div>
               <div style={{ color: '#fbbf24', fontSize: '1.5rem', margin: '0.5rem 0' }}>{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5-Math.round(avgRating))}</div>
               <div style={{ color: '#6b7280' }}>Based on {ratingCounts.total.toLocaleString()} ratings</div>
             </div>
             <div>
               {[5, 4, 3, 2, 1].map(stars => {
                 const count = ratingCounts[stars];
                 const pct = ratingCounts.total > 0 ? (count / ratingCounts.total) * 100 : 0;
                 return (
                   <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                     <div style={{ width: '60px', color: '#4b5563', fontWeight: '500' }}>{stars} Stars</div>
                     <div style={{ flex: '1', height: '12px', background: '#e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
                       <div style={{ height: '100%', width: pct + '%', background: '#fbbf24', borderRadius: '6px' }}></div>
                     </div>
                     <div style={{ width: '60px', textAlign: 'right', color: '#6b7280', fontSize: '0.9rem' }}>{count.toLocaleString()}</div>
                   </div>
                 );
               })}
             </div>
           </div>
        </div>

        {/* AI Summary */}
        <div className="ai-summary" style={{ marginBottom: '2rem' }}>
          <div className="ai-summary-header"><Icons.Sparkles /> AI Review Summary</div>
          <p style={{fontSize: '1.1rem', lineHeight: '1.6'}}>{generateAISummary(product)}</p>
        </div>

        {/* Latest Reviews */}
        <div className="reviews-section">
          <h3 className="heading-lg" style={{marginBottom: '1.5rem'}}>Latest Reviews</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {product.reviews?.slice(0, 4).map((r, i) => (
              <div key={i} className="review-card" style={{padding: '1.5rem'}}>
                <div className="review-header" style={{marginBottom: '1rem'}}>
                  <strong style={{fontSize: '1.1rem'}}>{r.user}</strong>
                  <span style={{color: '#fbbf24', fontSize: '1.1rem'}}>{'★'.repeat(r.rating)}<span style={{color: '#e5e7eb'}}>{'★'.repeat(5-r.rating)}</span></span>
                </div>
                <p style={{fontSize: '1rem', lineHeight: '1.6', color: '#374151'}}>{r.comment}</p>
              </div>
            ))}
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
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: 'Hi! I am the CompareX AI. What kind of tool or hardware are you looking for today?' }
  ]);
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

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');

    // Simulate AI thinking and response
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      // Extremely basic matching logic for existing products
      let foundProduct = null;
      if (lowerInput.includes('editor') || lowerInput.includes('code') || lowerInput.includes('ide')) {
        foundProduct = productsData.find(p => p.title.toLowerCase().includes('visual studio code') || p.title.toLowerCase().includes('cursor'));
      } else if (lowerInput.includes('deploy') || lowerInput.includes('hosting') || lowerInput.includes('vercel') || lowerInput.includes('netlify')) {
        foundProduct = productsData.find(p => p.title.toLowerCase().includes('vercel') || p.title.toLowerCase().includes('netlify'));
      } else if (lowerInput.includes('container') || lowerInput.includes('docker')) {
        foundProduct = productsData.find(p => p.title.toLowerCase().includes('docker'));
      } else if (lowerInput.includes('version') || lowerInput.includes('git')) {
        foundProduct = productsData.find(p => p.title.toLowerCase().includes('git'));
      } else if (lowerInput.includes('gpu') || lowerInput.includes('graphic') || lowerInput.includes('game')) {
        foundProduct = productsData.find(p => p.category === 'GRAPHICS CARDS');
      } else if (lowerInput.includes('ssd') || lowerInput.includes('storage') || lowerInput.includes('drive')) {
        foundProduct = productsData.find(p => p.category === 'SSD');
      } else if (lowerInput.includes('cpu') || lowerInput.includes('processor')) {
        foundProduct = productsData.find(p => p.category === 'CPUs');
      } else if (lowerInput.includes('ram') || lowerInput.includes('memory')) {
        foundProduct = productsData.find(p => p.category === 'MEMORY (RAM)');
      }

      if (!foundProduct) {
        // Fallback to searching all titles/subtitles
        foundProduct = productsData.find(p => 
          p.title.toLowerCase().includes(lowerInput) || 
          p.subtitle.toLowerCase().includes(lowerInput)
        );
      }

      if (foundProduct) {
        setChatMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Based on what you need, I recommend checking out **${foundProduct.title}**.`,
          productId: foundProduct.id
        }]);
      } else {
        setChatMessages(prev => [...prev, { 
          role: 'ai', 
          text: "I couldn't find a specific tool matching that on our website right now. Try searching for broader categories like 'code editor', 'GPU', or 'SSD'."
        }]);
      }
    }, 800);
  };

  return (
    <div className="app-container">
      <Header setShowAuth={setShowAuth} navigateTo={navigateTo} wishlist={wishlist} setWishlist={setWishlist} />
      
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
        {currentPage === 'wishlist' && 
          <WishlistPage 
            wishlist={wishlist} setWishlist={setWishlist} 
            compareList={compareList} setCompareList={setCompareList}
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
        onClick={() => setShowChat(true)}
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
        <Icons.Brain /> AI Assistant
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

      {/* AI Chat Modal */}
      {showChat && (
        <div className="quiz-overlay" onClick={() => setShowChat(false)}>
          <div className="quiz-modal" style={{display: 'flex', flexDirection: 'column', height: '500px', maxHeight: '90vh'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem'}}>
              <h2 className="heading-md" style={{margin: 0}}><span style={{color: 'var(--primary)', verticalAlign: 'middle', marginRight: '0.5rem'}}><Icons.Brain /></span> AI Assistant</h2>
              <button className="btn-icon" onClick={() => setShowChat(false)}><Icons.X /></button>
            </div>
            
            <div className="chat-messages" style={{flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem', marginBottom: '1rem'}}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? 'var(--primary)' : '#f3f4f6',
                  color: msg.role === 'user' ? 'white' : '#111827',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  borderBottomRightRadius: msg.role === 'user' ? '2px' : '12px',
                  borderBottomLeftRadius: msg.role === 'ai' ? '2px' : '12px',
                  maxWidth: '85%',
                  lineHeight: '1.4'
                }}>
                  {msg.text}
                  {msg.productId && (
                    <div style={{marginTop: '0.5rem'}}>
                      <button 
                        className="btn btn-dark" 
                        style={{fontSize: '0.8rem', padding: '0.4rem 0.8rem'}}
                        onClick={() => {
                          setShowChat(false);
                          navigateTo('product', msg.productId);
                        }}
                      >
                        View Product
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleChatSubmit} style={{display: 'flex', gap: '0.5rem', marginTop: 'auto'}}>
              <input 
                type="text" 
                value={chatInput} 
                onChange={e => setChatInput(e.target.value)} 
                placeholder="Ask for a tool recommendation..." 
                className="form-input" 
                style={{flex: 1, margin: 0}} 
              />
              <button type="submit" className="btn btn-primary" disabled={!chatInput.trim()}>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
