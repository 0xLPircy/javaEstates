// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#F5F0E8",
  linen: "#EDE8DC",
  bark: "#C4A882",
  earth: "#8B6914",
  moss: "#4A5C3A",
  forest: "#2C3D24",
  terracotta: "#B85C38",
  clay: "#D4784A",
  charcoal: "#1E1E1A",
  mist: "#F9F6F0",
};

const IMG_PLACEHOLDER = (label, ratio = "4/3") => (
  <div
    style={{
      aspectRatio: ratio,
      background: `linear-gradient(135deg, ${COLORS.linen} 0%, ${COLORS.bark}44 50%, ${COLORS.moss}33 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "0.5rem",
      border: `1px dashed ${COLORS.bark}`,
      borderRadius: "2px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A5C3A' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.bark} strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
    </svg>
    <span style={{ fontSize: "11px", color: COLORS.bark, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
  </div>
);

const LeafDivider = ({ color = COLORS.bark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "2rem 0" }}>
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${color}66)` }} />
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color} opacity="0.6">
      <path d="M17 8C8 10 5.9 16.17 3.82 21c4.5-3 8.18-5 14.18-3C20.73 11.88 17 8 17 8z" />
    </svg>
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${color}66)` }} />
  </div>
);

const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "landing", label: "Home" },
    { id: "a2milk", label: "A2 Milk" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? `${COLORS.forest}F5` : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.4s ease",
      borderBottom: scrolled ? `1px solid ${COLORS.moss}44` : "none",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
        <button onClick={() => setPage("landing")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 600, color: COLORS.cream, letterSpacing: "0.06em", lineHeight: 1 }}>Java Estates</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: COLORS.bark, letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "2px" }}>Organic Marvels</div>
        </button>

        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => setPage(l.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1rem", letterSpacing: "0.1em",
              color: page === l.id ? COLORS.bark : COLORS.cream,
              opacity: page === l.id ? 1 : 0.85,
              textTransform: "uppercase",
              borderBottom: page === l.id ? `1px solid ${COLORS.bark}` : "1px solid transparent",
              paddingBottom: "2px",
              transition: "all 0.2s",
            }}>{l.label}</button>
          ))}
          <button onClick={() => setPage("contact")} style={{
            background: "transparent", border: `1px solid ${COLORS.bark}`,
            color: COLORS.bark, fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "8px 20px", cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.bark; e.target.style.color = COLORS.forest; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.bark; }}
          >Partner With Us</button>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer style={{ background: COLORS.forest, color: COLORS.cream, padding: "4rem 2rem 2rem" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, marginBottom: "0.5rem" }}>Java Estates</div>
          <div style={{ color: COLORS.bark, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Journey into the World of Organic Marvels</div>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem", color: `${COLORS.cream}BB`, lineHeight: 1.8, maxWidth: "320px" }}>
            Cultivating a greener future through sustainable organic agriculture and premium dairy farming on the fertile lands of Java.
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem" }}>Navigate</div>
          {["Home", "A2 Milk", "Contact"].map((l, i) => (
            <button key={i} onClick={() => setPage(["landing", "a2milk", "contact"][i])} style={{
              display: "block", background: "none", border: "none", cursor: "pointer",
              color: `${COLORS.cream}BB`, fontFamily: "'Crimson Pro', serif",
              fontSize: "1rem", padding: "0.25rem 0", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = COLORS.bark}
              onMouseLeave={e => e.target.style.color = `${COLORS.cream}BB`}
            >{l}</button>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem" }}>Find Us</div>
          <address style={{ fontStyle: "normal", color: `${COLORS.cream}BB`, fontFamily: "'Crimson Pro', serif", fontSize: "1rem", lineHeight: 2 }}>
            Java Estates Private Limited<br />
            Sy 37, 38/2, Sidlakona<br />
            Tumkuru – 572125
          </address>
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${COLORS.moss}55`, paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.85rem", color: `${COLORS.cream}55` }}>© {new Date().getFullYear()} Java Estates Private Limited</span>
        <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.85rem", color: `${COLORS.cream}55` }}>Organically Crafted</span>
      </div>
    </div>
  </footer>
);

// ── CAROUSEL ──────────────────────────────────────────────────────────────────
const Carousel = () => {
  const slides = [
    "Farm Landscape",
    "Herd Grazing",
    "Dairy Facility",
    "Organic Crops",
    "Biogas Plant",
    "Harvest Season",
  ];
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const go = (idx) => {
    setActive((idx + slides.length) % slides.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(active + 1), 3500);
    return () => clearInterval(timerRef.current);
  }, [active]);

  return (
    <section style={{ background: COLORS.forest, padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1rem" }}>Gallery</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: COLORS.cream, margin: 0 }}>Life at Java Estates</h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: `${COLORS.cream}99`, marginTop: "1rem", maxWidth: "560px", margin: "1rem auto 0" }}>
            Join us on this journey of organic excellence and sustainability — where nature thrives, quality shines, and the future is greener.
          </p>
        </div>

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ borderRadius: "2px", overflow: "hidden", aspectRatio: "16/9", background: COLORS.linen }}>
            {slides.map((s, i) => (
              <div key={i} style={{
                position: "absolute", inset: 0,
                opacity: i === active ? 1 : 0,
                transition: "opacity 0.8s ease",
                background: `linear-gradient(135deg, ${COLORS.linen} 0%, ${COLORS.bark}44 40%, ${COLORS.moss}33 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem",
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.bark} strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                </svg>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.earth, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{s}</span>
              </div>
            ))}
          </div>

          <button onClick={() => go(active - 1)} style={{
            position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)",
            background: COLORS.forest, border: `1px solid ${COLORS.bark}55`, color: COLORS.bark,
            width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>‹</button>
          <button onClick={() => go(active + 1)} style={{
            position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)",
            background: COLORS.forest, border: `1px solid ${COLORS.bark}55`, color: COLORS.bark,
            width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>›</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "2rem" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === active ? "28px" : "8px", height: "8px",
              borderRadius: "4px", border: "none", cursor: "pointer",
              background: i === active ? COLORS.bark : `${COLORS.bark}44`,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
const LandingPage = ({ setPage }) => {
  return (
    <div style={{ background: COLORS.mist }}>
      {/* Hero */}
      <section style={{ minHeight: "100vh", background: COLORS.forest, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C4A882' fill-rule='evenodd'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/g%3E%3C/svg%3E\")", backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: `linear-gradient(to top, ${COLORS.forest}, transparent)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "2rem", maxWidth: "900px" }}>
          {/* Full-bleed hero image placeholder */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${COLORS.moss}33, ${COLORS.bark}22)`, border: `1px dashed ${COLORS.bark}33`, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "2px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: `${COLORS.bark}55`, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Hero Farm Image</span>
            </div>
          </div>

          <div style={{ position: "relative", zIndex: 3 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem", opacity: 0.9 }}>
              Est. on the Fields of Java
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 1rem", lineHeight: 0.95, letterSpacing: "-0.01em" }}>
              Java<br /><em style={{ fontStyle: "italic", color: COLORS.bark }}>Estates</em>
            </h1>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: `${COLORS.cream}CC`, letterSpacing: "0.08em", marginBottom: "3rem", fontStyle: "italic" }}>
              Journey into the World of Organic Marvels
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => setPage("a2milk")} style={{
                background: COLORS.bark, border: "none", color: COLORS.forest,
                fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", letterSpacing: "0.15em",
                textTransform: "uppercase", padding: "14px 32px", cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => e.target.style.background = COLORS.earth}
                onMouseLeave={e => e.target.style.background = COLORS.bark}
              >Explore A2 Milk</button>
              <button onClick={() => setPage("contact")} style={{
                background: "transparent", border: `1px solid ${COLORS.cream}66`,
                color: COLORS.cream, fontFamily: "'Cormorant Garamond', serif",
                fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "14px 32px", cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = COLORS.cream; }}
                onMouseLeave={e => { e.target.style.borderColor = `${COLORS.cream}66`; }}
              >Partner With Us</button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: `${COLORS.cream}55` }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${COLORS.bark}88, transparent)` }} />
        </div>
      </section>

      {/* Intro Strip */}
      <section style={{ background: COLORS.bark, padding: "3rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 400, color: COLORS.forest, lineHeight: 1.6, fontStyle: "italic" }}>
            "Step into our world of organic agriculture, where vast fertile lands across Java are nurtured with traditional wisdom and modern innovations."
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: "7rem 2rem", background: COLORS.cream }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              {IMG_PLACEHOLDER("Farm Overview", "1/1")}
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Our Mission</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.5rem", lineHeight: 1.15 }}>Cultivating Purity,<br /><em>Harvesting Trust</em></h2>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Your trusted partner in organic agricultural and dairy farming. We are passionate about sustainable farming practices and dedicated to providing high-quality organic products to our valued partners.
              </p>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "2rem" }}>
                Our skilled farmers meticulously cultivate a diverse range of organic crops — from nutrient-rich vegetables to flavorful fruits — free from harmful chemicals and genetically modified organisms.
              </p>
              <LeafDivider color={COLORS.terracotta} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "1.5rem" }}>
                {["Organic Certified", "No GMO", "Sustainable Farming", "Renewable Energy"].map(tag => (
                  <div key={tag} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.moss, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: COLORS.forest, letterSpacing: "0.05em" }}>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section style={{ padding: "7rem 2rem", background: COLORS.linen }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1rem" }}>What We Do</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: COLORS.forest, margin: 0 }}>From Soil to Table</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {[
              { label: "Organic Crops", body: "Nutrient-rich vegetables and flavorful fruits grown without synthetic pesticides, herbicides, or GMOs across our fertile Java lands.", img: "Crop Fields" },
              { label: "Dairy Farming", body: "Our happy cattle graze freely on lush pastures, producing the finest organic milk and dairy products under the highest standards.", img: "Dairy Cows" },
              { label: "Biogas Energy", body: "Our innovative captive biogas plant converts organic waste into clean renewable energy, powering our entire facility sustainably.", img: "Biogas Plant" },
            ].map(({ label, body, img }) => (
              <div key={label} style={{ background: COLORS.cream, border: `1px solid ${COLORS.bark}33` }}>
                {IMG_PLACEHOLDER(img, "5/4")}
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 500, color: COLORS.forest, margin: "0 0 0.75rem" }}>{label}</h3>
                  <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.75, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section style={{ padding: "7rem 2rem", background: COLORS.cream }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Quality First</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.5rem", lineHeight: 1.15 }}>Rigorous Standards,<br /><em>Pure Results</em></h2>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.5rem" }}>
                Quality is at the heart of everything we do. We implement rigorous quality control measures at every stage, ensuring that our products consistently meet and exceed expectations.
              </p>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
                Our organic certification guarantees that our produce is free from synthetic pesticides, herbicides, antibiotics, and growth hormones. With every bite, you can trust you are consuming the very best in taste and nutrition.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {IMG_PLACEHOLDER("Quality Lab", "1/1")}
              {IMG_PLACEHOLDER("Certification", "1/1")}
              {IMG_PLACEHOLDER("Harvest", "1/1")}
              {IMG_PLACEHOLDER("Packaging", "1/1")}
            </div>
          </div>
        </div>
      </section>

      {/* A2 Prompt */}
      <section style={{ padding: "8rem 2rem", background: COLORS.forest, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0C20 20 0 30 0 40s20 20 40 40c20-20 40-30 40-40S60 20 40 0z' fill='%23C4A882'/%3E%3C/svg%3E\")" }} />
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem" }}>Sustainably Crafted</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: COLORS.cream, lineHeight: 1.05, margin: "0 0 2rem" }}>
            Discover Our<br /><em style={{ color: COLORS.bark }}>A2 Milk</em>
          </h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.15rem", color: `${COLORS.cream}BB`, lineHeight: 1.8, marginBottom: "3rem" }}>
            A true testament to our commitment to quality and responsible farming practices — pure, easily digestible, and crafted with love from our Java Estates farm.
          </p>
          <button onClick={() => setPage("a2milk")} style={{
            background: "none", border: `1px solid ${COLORS.bark}`,
            color: COLORS.bark, fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "16px 40px", cursor: "pointer", transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.bark; e.target.style.color = COLORS.forest; }}
            onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = COLORS.bark; }}
          >Explore the Journey →</button>
        </div>
      </section>

      <Carousel />
      <Footer setPage={setPage} />
    </div>
  );
};

// ── A2 MILK PAGE ──────────────────────────────────────────────────────────────
const A2MilkPage = ({ setPage }) => (
  <div style={{ background: COLORS.mist }}>
    {/* Hero */}
    <section style={{ minHeight: "70vh", background: COLORS.forest, display: "flex", alignItems: "center", paddingTop: "72px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem" }}>Pure. Natural. Nourishing.</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 1.5rem", lineHeight: 1.0 }}>
            A2 Milk<br /><em style={{ color: COLORS.bark, fontSize: "0.7em" }}>Sustainably Crafted</em><br />on Java Estates
          </h1>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.15rem", color: `${COLORS.cream}CC`, lineHeight: 1.8 }}>
            Nurturing Nature, Crafting A2 Milk: Unveiling Java Estates' Sustainable Delight. From captivating vistas to meticulous craftsmanship, every sip tells a story.
          </p>
        </div>
        <div>{IMG_PLACEHOLDER("A2 Cows Grazing", "4/3")}</div>
      </div>
    </section>

    {/* Oasis Section */}
    <section style={{ padding: "7rem 2rem", background: COLORS.cream }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>The Oasis</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.5rem", lineHeight: 1.15 }}>Where Sustainability<br /><em>Meets Farming Magic</em></h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.5rem" }}>
            Behold the sprawling wonderland of Java Estates, where sustainable farming practices flourish in harmony with nature's rhythm. Breathe in the crisp, clean air as your eyes wander across our idyllic pastures.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
            Here, our cows roam freely, their hooves caressing the earth in a joyful dance. Witness the lush greenery nurtured without a trace of harmful additives or pesticides, as we embrace the magic of organic and natural feed options.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {IMG_PLACEHOLDER("Pastures Landscape", "16/9")}
          {IMG_PLACEHOLDER("Cows Roaming Free", "16/9")}
        </div>
      </div>
    </section>

    {/* Champions Section */}
    <section style={{ padding: "7rem 2rem", background: COLORS.linen }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1rem" }}>Bovine Champions</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1rem" }}>The Pioneers of Purity</h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
            Our carefully curated bovine champions are exclusively selected for their extraordinary ability to produce A2 beta-casein milk — hailing from breeds renowned for their dedication to purity and consistency.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {IMG_PLACEHOLDER("Champion Breed 1", "4/3")}
          {IMG_PLACEHOLDER("Champion Breed 2", "4/3")}
          {IMG_PLACEHOLDER("Champion Breed 3", "4/3")}
        </div>
      </div>
    </section>

    {/* Quality Symphony */}
    <section style={{ padding: "7rem 2rem", background: COLORS.cream }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {IMG_PLACEHOLDER("Testing Lab", "1/1")}
          {IMG_PLACEHOLDER("Quality Control", "1/1")}
          {IMG_PLACEHOLDER("Bottling", "1/1")}
          {IMG_PLACEHOLDER("Fresh Product", "1/1")}
        </div>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Quality Control</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.5rem", lineHeight: 1.15 }}>The Symphony of<br /><em>Perfection</em></h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.5rem" }}>
            From udder to bottle, our commitment to excellence resonates through every step. Step inside our state-of-the-art facilities where hygiene and safety intertwine like a choreographed dance.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
            Each batch is scrutinized, allowing only the most pristine and nutrient-rich milk to reach your table. With our meticulous record-keeping system, we offer complete traceability — a window into the transparency that defines our craft.
          </p>
          <LeafDivider color={COLORS.moss} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {["Rigorous Testing", "Full Traceability", "State-of-the-Art Facilities", "Certified Pure"].map(t => (
              <div key={t} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: COLORS.moss, marginTop: "0.6rem", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: COLORS.forest }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Elixir */}
    <section style={{ padding: "7rem 2rem", background: COLORS.forest }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem" }}>Nature's Finest</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 2rem", lineHeight: 1.1 }}>
          Indulge in<br /><em style={{ color: COLORS.bark }}>Nature's Finest Elixir</em>
        </h2>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.15rem", color: `${COLORS.cream}BB`, lineHeight: 1.85, marginBottom: "1.5rem" }}>
          A pure, easily digestible alternative to traditional milk, carefully crafted on our Java Estates farm. Allow your taste buds to dance with delight as you experience the exceptional flavor and unrivaled nutritional benefits.
        </p>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.15rem", color: `${COLORS.cream}BB`, lineHeight: 1.85, marginBottom: "3rem" }}>
          With each sip, you become part of a movement — a conscious choice to support sustainability, embrace quality, and honor the environment.
        </p>
        <div style={{ margin: "0 auto 3rem", maxWidth: "400px" }}>
          {IMG_PLACEHOLDER("A2 Milk Bottle", "4/3")}
        </div>
      </div>
    </section>

    {/* Contact Prompt */}
    <section style={{ padding: "7rem 2rem", background: COLORS.bark }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.forest, marginBottom: "1.5rem" }}>Ready to Partner?</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.5rem" }}>
          Together, Let's Cultivate<br /><em>a Better World</em>
        </h2>
        <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: `${COLORS.forest}CC`, lineHeight: 1.8, marginBottom: "2.5rem" }}>
          Join us on this extraordinary journey and discover how Java Estates' A2 milk can become part of your commitment to quality and sustainability.
        </p>
        <button onClick={() => setPage("contact")} style={{
          background: COLORS.forest, border: "none", color: COLORS.cream,
          fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
          letterSpacing: "0.15em", textTransform: "uppercase", padding: "16px 40px",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = COLORS.charcoal}
          onMouseLeave={e => e.target.style.background = COLORS.forest}
        >Get in Touch →</button>
      </div>
    </section>

    <Footer setPage={setPage} />
  </div>
);

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
const ContactPage = ({ setPage }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("validation");
      return;
    }
    setStatus("sending");
    try {
      // EmailJS integration
      // Replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY with your actual EmailJS credentials
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID",
          template_id: "YOUR_TEMPLATE_ID",
          user_id: "YOUR_PUBLIC_KEY",
          template_params: {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            message: form.message,
          },
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    border: `1px solid ${COLORS.bark}55`,
    background: COLORS.mist,
    fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem",
    color: COLORS.charcoal, outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    borderRadius: "1px",
  };

  const labelStyle = {
    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem",
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: COLORS.moss, display: "block", marginBottom: "6px",
  };

  return (
    <div style={{ background: COLORS.mist }}>
      {/* Hero */}
      <section style={{ paddingTop: "72px", background: COLORS.forest }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "end" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem" }}>Let's Collaborate</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 1.5rem", lineHeight: 1.05 }}>
              Begin Your<br /><em style={{ color: COLORS.bark }}>Organic Journey</em>
            </h1>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: `${COLORS.cream}BB`, lineHeight: 1.85 }}>
              At Java Estates, we're committed to promoting sustainable farming practices and providing consumers with the purest organic options. By joining forces, we can cultivate a greener future.
            </p>
          </div>
          <div>{IMG_PLACEHOLDER("Farm Entrance", "4/3")}</div>
        </div>
      </section>

      {/* Intro Bar */}
      <section style={{ background: COLORS.bark, padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.5rem)", fontStyle: "italic", color: COLORS.forest, margin: 0, lineHeight: 1.6 }}>
            "Whether you want to discuss your unique requirements, dive deeper into our diverse product range, or even plan a visit to our enchanting farm — we're here to make it happen."
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section style={{ padding: "7rem 2rem", background: COLORS.cream }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start" }}>
          {/* Left info */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Find Us</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 400, color: COLORS.forest, margin: "0 0 2rem", lineHeight: 1.2 }}>Java Estates<br /><em>Private Limited</em></h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "0.5rem" }}>Address</div>
                <address style={{ fontStyle: "normal", fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.9 }}>
                  Sy 37, 38/2, Sidlakona<br />
                  Tumkuru – 572125<br />
                  Karnataka, India
                </address>
              </div>
              <LeafDivider color={COLORS.bark} />
              <div style={{ marginBottom: "1.5rem" }}>
                {IMG_PLACEHOLDER("Farm Location", "4/3")}
              </div>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
                Looking to collaborate for all your organic agricultural and dairy product needs? We're thrilled to connect with you and explore the possibilities of a fruitful partnership.
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: COLORS.linen, padding: "3rem", border: `1px solid ${COLORS.bark}22` }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "0.5rem" }}>Send a Message</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 400, color: COLORS.forest, margin: "0 0 2rem" }}>Let's Start a Conversation</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = COLORS.moss}
                  onBlur={e => e.target.style.borderColor = `${COLORS.bark}55`}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = COLORS.moss}
                    onBlur={e => e.target.style.borderColor = `${COLORS.bark}55`}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 ..." style={inputStyle}
                    onFocus={e => e.target.style.borderColor = COLORS.moss}
                    onBlur={e => e.target.style.borderColor = `${COLORS.bark}55`}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your requirements, product interests, or plans for a farm visit..." style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
                  onFocus={e => e.target.style.borderColor = COLORS.moss}
                  onBlur={e => e.target.style.borderColor = `${COLORS.bark}55`}
                />
              </div>

              {status === "validation" && (
                <p style={{ fontFamily: "'Crimson Pro', serif", color: COLORS.terracotta, fontSize: "0.95rem", margin: 0 }}>Please fill in your name, email, and message.</p>
              )}
              {status === "success" && (
                <div style={{ background: `${COLORS.moss}18`, border: `1px solid ${COLORS.moss}55`, padding: "1rem", borderRadius: "1px" }}>
                  <p style={{ fontFamily: "'Crimson Pro', serif", color: COLORS.moss, fontSize: "1rem", margin: 0 }}>✓ Your message has been sent. We'll be in touch soon!</p>
                </div>
              )}
              {status === "error" && (
                <div style={{ background: `${COLORS.terracotta}11`, border: `1px solid ${COLORS.terracotta}44`, padding: "1rem", borderRadius: "1px" }}>
                  <p style={{ fontFamily: "'Crimson Pro', serif", color: COLORS.terracotta, fontSize: "1rem", margin: "0 0 0.5rem" }}>Something went wrong. Please configure your EmailJS credentials:</p>
                  <ul style={{ fontFamily: "'Crimson Pro', serif", color: COLORS.terracotta, fontSize: "0.9rem", margin: 0, paddingLeft: "1.2rem", lineHeight: 1.8 }}>
                    <li>Set <code>YOUR_SERVICE_ID</code> in the ContactPage component</li>
                    <li>Set <code>YOUR_TEMPLATE_ID</code></li>
                    <li>Set <code>YOUR_PUBLIC_KEY</code></li>
                  </ul>
                </div>
              )}

              <button onClick={handleSubmit} disabled={status === "sending"} style={{
                background: COLORS.forest, border: "none", color: COLORS.cream,
                fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "16px 32px", cursor: status === "sending" ? "wait" : "pointer",
                transition: "all 0.2s", opacity: status === "sending" ? 0.7 : 1, alignSelf: "flex-start",
              }}
                onMouseEnter={e => { if (status !== "sending") e.target.style.background = COLORS.charcoal; }}
                onMouseLeave={e => { e.target.style.background = COLORS.forest; }}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
};

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = COLORS.mist;
  }, []);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Crimson Pro', serif" }}>
      <Nav page={page} setPage={setPage} />
      {page === "landing" && <LandingPage setPage={setPage} />}
      {page === "a2milk" && <A2MilkPage setPage={setPage} />}
      {page === "contact" && <ContactPage setPage={setPage} />}
    </div>
  );
}