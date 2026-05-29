// @ts-nocheck
import { useState, useEffect, useRef } from "react";

const EMAILJS_PUBLIC_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID      = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_CONTACT   = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT;

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

// ── RESPONSIVE HOOK ───────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
};

const IMG_PLACEHOLDER = (label, ratio = "4/3", image = null) => (
  <div
    style={{
      aspectRatio: ratio,
      background: image? "transparent" : `linear-gradient(135deg, ${COLORS.linen} 0%, ${COLORS.bark}44 50%, ${COLORS.moss}33 100%)`,
      borderRadius: "2px",
      position: "relative",
      overflow: "hidden",
    }}
  >{image? (<img
        src={image}
        alt={label}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />) : (<>
    <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234A5C3A' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.bark} strokeWidth="1.2">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
    </svg>
    <span style={{ fontSize: "11px", color: COLORS.bark, fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</span>
    </>)}
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

// ── NAV ───────────────────────────────────────────────────────────────────────
const Nav = ({ page, setPage }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on page change
  useEffect(() => { setMenuOpen(false); }, [page]);

  const links = [
    { id: "landing", label: "Home" },
    { id: "a2milk", label: "A2 Milk" },
    { id: "contact", label: "Contact" },
  ];

  const navBg = scrolled || menuOpen ? `${COLORS.forest}F8` : "transparent";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: navBg,
      backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
      transition: "all 0.4s ease",
      borderBottom: scrolled ? `1px solid ${COLORS.moss}44` : "none",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        {/* Logo */}
        <button onClick={() => setPage("landing")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", fontWeight: 600, color: COLORS.cream, letterSpacing: "0.06em", lineHeight: 1 }}>Java Estates</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: COLORS.bark, letterSpacing: "0.22em", textTransform: "uppercase", marginTop: "2px" }}>Organic Marvels</div>
        {/* <img src="/HorizontalLogo2.png" alt="Java Estates Logo" className="px-[15px] py-[9px] rounded-4xl" style={{ height: "60px", width: "auto", display: "block", background: COLORS.linen }} /> */}
        </button>

        {isMobile ? (
          /* Hamburger */
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: `1px solid ${COLORS.bark}55`, padding: "8px 10px", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px", borderRadius: "2px" }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: "20px", height: "1.5px",
                background: COLORS.bark,
                transition: "all 0.3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(4.5px, -4.5px)"
                  : "none",
              }} />
            ))}
          </button>
        ) : (
          /* Desktop links */
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
            {links.map(l => (
              <button key={l.id} onClick={() => setPage(l.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem", letterSpacing: "0.1em",
                color: page === l.id ? COLORS.bark : COLORS.cream,
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
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && (
        <div style={{
          maxHeight: menuOpen ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
          background: `${COLORS.forest}F8`,
          borderTop: menuOpen ? `1px solid ${COLORS.moss}44` : "none",
        }}>
          <div style={{ padding: "1rem 1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0" }}>
            {links.map(l => (
              <button key={l.id} onClick={() => setPage(l.id)} style={{
                background: "none", border: "none", borderBottom: `1px solid ${COLORS.moss}33`,
                cursor: "pointer", textAlign: "left",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem", letterSpacing: "0.1em",
                color: page === l.id ? COLORS.bark : COLORS.cream,
                textTransform: "uppercase",
                padding: "0.9rem 0",
                transition: "color 0.2s",
              }}>{l.label}</button>
            ))}
            <button onClick={() => setPage("contact")} style={{
              background: COLORS.bark, border: "none",
              color: COLORS.forest, fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "12px 20px", cursor: "pointer", marginTop: "1.25rem", borderRadius: "1px",
            }}>Partner With Us</button>
          </div>
        </div>
      )}
    </nav>
  );
};

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => {
  const isMobile = useIsMobile();
  return (
    <footer style={{ background: COLORS.forest, color: COLORS.cream, padding: isMobile ? "3rem 1.25rem 1.5rem" : "4rem 2rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr",
          gap: isMobile ? "2rem" : "3rem",
          marginBottom: "2.5rem",
        }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 600, marginBottom: "0.5rem" }}>Java Estates</div>
            <div style={{ color: COLORS.bark, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Journey into the World of Organic Marvels</div>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem", color: `${COLORS.cream}BB`, lineHeight: 1.8, maxWidth: "320px", margin: 0 }}>
              Cultivating a greener future through sustainable organic agriculture and premium dairy farming on the fertile lands of Java.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.25rem" }}>Navigate</div>
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
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.25rem" }}>Find Us</div>
            <address style={{ fontStyle: "normal", color: `${COLORS.cream}BB`, fontFamily: "'Crimson Pro', serif", fontSize: "1rem", lineHeight: 2 }}>
              Java Estates Private Limited<br />
              Sy 37, 38/2, Sidlakona<br />
              Tumkuru – 572125
            </address>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${COLORS.moss}55`, paddingTop: "1.5rem", display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "0.5rem" : 0, justifyContent: "space-between", alignItems: isMobile ? "center" : "center", textAlign: "center" }}>
          <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.85rem", color: `${COLORS.cream}55` }}>© {new Date().getFullYear()} Java Estates Private Limited</span>
          <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: "0.85rem", color: `${COLORS.cream}55` }}>Organically Crafted</span>
        </div>
      </div>
    </footer>
  );
};

// ── CAROUSEL ──────────────────────────────────────────────────────────────────
const Carousel = () => {
  const slides = ["FarmLandscape.jpg","Farmer.png", "BioGasCake.jpeg", "farmhouse.jpg", "bottles.jpg", "BiogasPlant.jpg"];
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const isMobile = useIsMobile();

  const go = (idx) => setActive((idx + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(() => go(active + 1), 3500);
    return () => clearInterval(timerRef.current);
  }, [active]);

  return (
    <section style={{ background: COLORS.forest, padding: isMobile ? "4rem 1.25rem" : "6rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "0.75rem" }}>Gallery</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 400, color: COLORS.cream, margin: "0 0 1rem" }}>Life at Java Estates</h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: `${COLORS.cream}99`, maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Join us on this journey of organic excellence and sustainability. Partner with Java Estates, where nature thrives, quality shines, and the future is greener. Together, let's cultivate a better world through organic agriculture and dairy farming. 
          </p>
        </div>

        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ borderRadius: "2px", overflow: "hidden", aspectRatio: "16/9", background: COLORS.linen, position: "relative" }}>
            {slides.map((s, i) => (
              <div key={i} style={{
                position: "absolute", inset: 0,
                opacity: i === active ? 1 : 0,
                transition: "opacity 0.8s ease",
                // background: `linear-gradient(135deg, ${COLORS.linen} 0%, ${COLORS.bark}44 40%, ${COLORS.moss}33 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem",
              }}>
                {IMG_PLACEHOLDER(s, "16/9", `/${slides[i]}`)}
              </div>
            ))}
          </div>

          {/* Arrows — inside on mobile to avoid overflow */}
          <button onClick={() => go(active - 1)} style={{
            position: "absolute",
            left: isMobile ? "8px" : "-20px",
            top: "50%", transform: "translateY(-50%)",
            background: `${COLORS.forest}CC`, border: `1px solid ${COLORS.bark}55`, color: COLORS.bark,
            width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
          }}>‹</button>
          <button onClick={() => go(active + 1)} style={{
            position: "absolute",
            right: isMobile ? "8px" : "-20px",
            top: "50%", transform: "translateY(-50%)",
            background: `${COLORS.forest}CC`, border: `1px solid ${COLORS.bark}55`, color: COLORS.bark,
            width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer", fontSize: "1rem",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
          }}>›</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "1.5rem" }}>
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
  const isMobile = useIsMobile();
  const sectionPad = isMobile ? "4rem 1.25rem" : "7rem 2rem";

  return (
    <div style={{ background: COLORS.mist }}>
      {/* Hero */}
      <section style={{ minHeight: "100vh", background: COLORS.forest, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C4A882' fill-rule='evenodd'%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/g%3E%3C/svg%3E\")", backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: `linear-gradient(to top, ${COLORS.forest}, transparent)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: isMobile ? "6rem 1.5rem 3rem" : "2rem", maxWidth: "900px", width: "100%" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.5rem", opacity: 0.9 }}>
            Est. on the Fields of Java
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(3.5rem, 14vw, 6rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 1rem", lineHeight: 0.95, letterSpacing: "-0.01em" }}>
            Java<br /><em style={{ fontStyle: "italic", color: COLORS.bark }}>Estates</em>
          </h1>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "clamp(1rem, 3.5vw, 1.3rem)", color: `${COLORS.cream}CC`, letterSpacing: "0.08em", marginBottom: "0.9rem", fontStyle: "italic" }}>
            Journey into the World of Organic Marvels
          </p>
          <p style={{ fontFamily: "'Cormorant Garamon', serif", fontSize: "clamp(0.5rem, 2.7vw, 0.9rem)", color: COLORS.bark, letterSpacing: "0.08em", marginBottom: "2.5rem", fontStyle: "italic" }}>
            Your trusted partner in organic agricultural and dairy farming. <br></br>Passionate about sustainable practices and dedicated to providing high-quality organic products.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("a2milk")} style={{
              background: COLORS.bark, border: "none", color: COLORS.forest,
              fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", letterSpacing: "0.15em",
              textTransform: "uppercase", padding: "14px 28px", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = COLORS.earth}
              onMouseLeave={e => e.target.style.background = COLORS.bark}
            >Explore A2 Milk</button>
            <button onClick={() => setPage("contact")} style={{
              background: "transparent", border: `1px solid ${COLORS.cream}66`,
              color: COLORS.cream, fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "14px 28px", cursor: "pointer",
            }}>Partner With Us</button>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: `${COLORS.cream}55` }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: "1px", height: "40px", background: `linear-gradient(to bottom, ${COLORS.bark}88, transparent)` }} />
        </div>
      </section>

      {/* Intro Strip */}
      <section style={{ background: COLORS.bark, padding: isMobile ? "2rem 1.25rem" : "3rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.15rem, 3.5vw, 1.8rem)", fontWeight: 400, color: COLORS.forest, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>
            "Step into our world of organic agriculture, where vast fertile lands across Java are nurtured with traditional wisdom and modern innovations."
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: sectionPad, background: COLORS.cream }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "5rem", alignItems: "center" }}>
<div>
  {IMG_PLACEHOLDER(
    "Farm Overview",
    isMobile ? "16/9" : "1/1",
    "/FarmOverview.jpeg"
  )}
</div>            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Our Mission</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.25rem", lineHeight: 1.15 }}>Cultivating Purity,<br /><em>Harvesting Trust</em></h2>

              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.5rem" }}>Our skilled farmers meticulously cultivate a diverse range of organic crops, ensuring they meet strict organic standards. From nutrient-rich vegetables to flavorful fruits, we take pride in offering premium produce that is free from harmful chemicals and genetically modified organisms.</p>
              <LeafDivider color={COLORS.terracotta} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {["Organic", "No GMO", "Sustainable Farming", "Renewable Energy"].map(tag => (
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
      <section style={{ padding: sectionPad, background: COLORS.linen }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "0.75rem" }}>What We Do</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 400, color: COLORS.forest, margin: 0 }}>From Soil to Table</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { label: "Organic Crops", body: "Nutrient-rich vegetables and flavorful fruits grown without synthetic pesticides, herbicides, or GMOs across our fertile Java lands.", img: "/CropFields.jpg" },
              { label: "Dairy Farming", body: "Our happy cattle graze freely on lush pastures, producing the finest organic milk and dairy products under the highest standards.", img: "/DairyCows.JPG" },
              { label: "Biogas Energy", body: "Our innovative captive biogas plant converts organic waste into clean renewable energy, powering our entire facility sustainably.", img: "/BiogasPlant.jpg" },
            ].map(({ label, body, img }) => (
              <div key={label} style={{ background: COLORS.cream, border: `1px solid ${COLORS.bark}33` }}>
                {IMG_PLACEHOLDER(label, "5/4", img)}
                <div style={{ padding: "1.25rem" }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 500, color: COLORS.forest, margin: "0 0 0.6rem" }}>{label}</h3>
                  <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.75, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section style={{ padding: sectionPad, background: COLORS.cream }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "5rem", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Quality First</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.25rem", lineHeight: 1.15 }}>Rigorous Standards,<br /><em>Pure Results</em></h2>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.25rem" }}>
                Quality is at the heart of everything we do. We implement rigorous quality control measures at every stage, ensuring our products consistently exceed expectations.
              </p>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
                Guaranteeing produce free from synthetic pesticides, herbicides, antibiotics, and growth hormones.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {IMG_PLACEHOLDER("Quality Lab", "1/1", "/QualityLab.jpg")}
              {IMG_PLACEHOLDER("Field", "1/1", "/field1.jpg")}
              {IMG_PLACEHOLDER("Harvest", "1/1", "/Harvest.jpg")}
              {IMG_PLACEHOLDER("Packaging", "1/1", "/Packaging.JPG")}
            </div>
          </div>
        </div>
      </section>

      {/* A2 Prompt */}
      <section style={{ padding: isMobile ? "5rem 1.25rem" : "8rem 2rem", background: COLORS.forest, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.25rem" }}>Sustainably Crafted</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 8vw, 4rem)", fontWeight: 300, color: COLORS.cream, lineHeight: 1.05, margin: "0 0 1.5rem" }}>
            Discover Our<br /><em style={{ color: COLORS.bark }}>A2 Milk</em>
          </h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: `${COLORS.cream}BB`, lineHeight: 1.8, marginBottom: "2.5rem" }}>
            We go the extra mile to bring you exceptional dairy products that are sustainably crafted. <br></br>A true testament to our commitment to quality and responsible farming practices, pure, easily digestible, and crafted with love from our Java Estates farm.
          </p>
          <button onClick={() => setPage("a2milk")} style={{
            background: "none", border: `1px solid ${COLORS.bark}`,
            color: COLORS.bark, fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem", letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "15px 36px", cursor: "pointer",
          }}
            onMouseEnter={e => { e.target.style.background = COLORS.bark; e.target.style.color = COLORS.forest; }}
            onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = COLORS.bark; }}
          >Explore the A2 Journey →</button>
        </div>
      </section>

      <Carousel />
      <Footer setPage={setPage} />
    </div>
  );
};

// ── A2 MILK PAGE ──────────────────────────────────────────────────────────────
const A2MilkPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const sectionPad = isMobile ? "4rem 1.25rem" : "7rem 2rem";

  return (
    <div style={{ background: COLORS.mist }}>
      {/* Hero */}
      <section style={{ minHeight: isMobile ? "auto" : "70vh", background: COLORS.forest, display: "flex", alignItems: "center", paddingTop: "64px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "3rem 1.25rem" : "4rem 2rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "4rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.25rem" }}>Pure. Natural. Nourishing.</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 8vw, 4.5rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 1.25rem", lineHeight: 1.05 }}>
              A2 Milk<br /><em style={{ color: COLORS.bark, fontSize: "0.7em" }}>Sustainably Crafted</em><br />on Java Estates
            </h1>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: `${COLORS.cream}CC`, lineHeight: 1.8, margin: 0 }}>
              Nurturing Nature, Crafting A2 Milk: Unveiling Java Estates' Sustainable Delight. From captivating vistas to meticulous craftsmanship, every sip tells a story.
            </p>
          </div>
          <div>{IMG_PLACEHOLDER("A2 Cows Grazing", "4/3", "/A2CowsGrazing.jpeg")}</div>
        </div>
      </section>

      {/* Oasis Section */}
      <section style={{ padding: sectionPad, background: COLORS.cream }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "5rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>The Oasis</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 5vw, 2.6rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.25rem", lineHeight: 1.15 }}>Where Sustainability<br /><em>Meets Farming Magic</em></h2>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.25rem" }}>
              Behold the sprawling wonderland of Java Estates, where sustainable farming practices flourish in harmony with nature's rhythm. Breathe in the crisp, clean air as your eyes wander across our idyllic pastures.
            </p>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
              Here, our cows roam freely, their hooves caressing the earth in a joyful dance. Witness the lush greenery nurtured without a trace of harmful additives or pesticides.  as we embrace the magic of organic and natural feed options. In this enchanting realm, our cows thrive, producing milk that resonates with the essence of nature itself.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {IMG_PLACEHOLDER("Pastures Landscape", "16/9", "/Landscape.jpeg")}
            {IMG_PLACEHOLDER("Cows Roaming Free", "16/9", "/CowsRoaming.jpg")}
          </div>
        </div>
      </section>

      {/* Champions Section */}
      <section style={{ padding: sectionPad, background: COLORS.linen }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "0.75rem" }}>Bovine Champions</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1rem" }}>The Pioneers of Purity</h2>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, maxWidth: "600px", margin: "0 auto", lineHeight: 1.8 }}>
              Our carefully curated bovine champions are exclusively selected for their extraordinary ability to produce A2 beta-casein milk.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1.25rem" }}>
            {IMG_PLACEHOLDER("Gir Breed", "4/3", "/Gir.png")}
            {IMG_PLACEHOLDER("Sahiwal Breed 2", "4/3", "/Sahiwal.png")}
            {IMG_PLACEHOLDER("Halikar Breed 3", "4/3", "/Halikar.png")}
          </div>
        </div>
      </section>

      {/* Quality Symphony */}
      <section style={{ padding: sectionPad, background: COLORS.cream }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "5rem", alignItems: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {IMG_PLACEHOLDER("Testing Lab", "1/1", "/QualityLab.jpg")}
            {/* {IMG_PLACEHOLDER("Quality Control", "1/1", "/QualityControl.jpg")} */}
            {IMG_PLACEHOLDER("Bottling", "1/1", "/bottles.jpg")}
            {/* {IMG_PLACEHOLDER("Fresh Product", "1/1", "/FreshProduct.webp")} */}
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Quality Control</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.7rem, 5vw, 2.6rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.25rem", lineHeight: 1.15 }}>The Symphony of<br /><em>Perfection</em></h2>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.85, marginBottom: "1.25rem" }}>
              From udder to bottle, our commitment to excellence resonates through every step. State-of-the-art facilities where hygiene and safety intertwine.
            </p>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
              Each batch is scrutinized, allowing only the most pristine and nutrient-rich milk to reach your table. Complete traceability, a window into the transparency that defines our craft.
            </p>
            <LeafDivider color={COLORS.moss} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
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
      <section style={{ padding: isMobile ? "4rem 1.25rem" : "7rem 2rem", background: COLORS.forest }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.25rem" }}>Nature's Finest</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 6vw, 3.5rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 1.5rem", lineHeight: 1.1 }}>
            Indulge in<br /><em style={{ color: COLORS.bark }}>Nature's Finest Elixir</em>
          </h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: `${COLORS.cream}BB`, lineHeight: 1.85, marginBottom: "1.25rem" }}>
            A pure, easily digestible alternative to traditional milk, carefully crafted on our Java Estates farm.
          </p>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.1rem", color: `${COLORS.cream}BB`, lineHeight: 1.85, marginBottom: "2.5rem" }}>
            With each sip, you become part of a movement, a conscious choice to support sustainability, embrace quality, and honor the environment.
          </p>
          <div style={{ margin: "0 auto 2.5rem", maxWidth: "930px", maxHeight: "300px", overflow: "hidden", borderRadius: "8px" }}>
            {IMG_PLACEHOLDER("A2 Milk Bottle", "4/3", "/FreshProduct.webp")}
          </div>
        </div>
      </section>

      {/* Contact Prompt */}
      <section style={{ padding: isMobile ? "4rem 1.25rem" : "7rem 2rem", background: COLORS.bark }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.forest, marginBottom: "1.25rem" }}>Ready to Partner?</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.8rem, 6vw, 3rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.25rem" }}>
            Together, Let's Cultivate<br /><em>a Better World</em>
          </h2>
          <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: `${COLORS.forest}CC`, lineHeight: 1.8, marginBottom: "2rem" }}>
            Join us on this extraordinary journey and discover how Java Estates' A2 milk can become part of your commitment to quality and sustainability.
          </p>
          <button onClick={() => setPage("contact")} style={{
            background: COLORS.forest, border: "none", color: COLORS.cream,
            fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
            letterSpacing: "0.15em", textTransform: "uppercase", padding: "15px 36px",
            cursor: "pointer",
          }}>Get in Touch →</button>
        </div>
      </section>

      <Footer setPage={setPage} />
    </div>
  );
};

// ── CONTACT PAGE ──────────────────────────────────────────────────────────────
const ContactPage = ({ setPage }) => {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setStatus("validation"); return; }
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_CONTACT,
          user_id:EMAILJS_PUBLIC_KEY,
          template_params: { from_name: form.name, from_email: form.email, phone: form.phone, message: form.message },
        }),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", phone: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    width: "100%", padding: "13px 15px",
    border: `1px solid ${COLORS.bark}55`,
    background: COLORS.mist,
    fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem",
    color: COLORS.charcoal, outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
    borderRadius: "1px",
    WebkitAppearance: "none",
  };

  const labelStyle = {
    fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem",
    letterSpacing: "0.2em", textTransform: "uppercase",
    color: COLORS.moss, display: "block", marginBottom: "6px",
  };

  return (
    <div style={{ background: COLORS.mist }}>
      {/* Hero */}
      <section style={{ paddingTop: "64px", background: COLORS.forest }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "3rem 1.25rem" : "5rem 2rem 4rem", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2rem" : "3.3rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "1.25rem" }}>Let's Collaborate</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.2rem, 8vw, 4rem)", fontWeight: 300, color: COLORS.cream, margin: "0 0 1.25rem", lineHeight: 1.05 }}>
              Begin Your<br /><em style={{ color: COLORS.bark }}>Organic Journey</em>
            </h1>
            <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: `${COLORS.cream}BB`, lineHeight: 1.85, margin: 0 }}>
              At Java Estates, we're committed to promoting sustainable farming practices and providing consumers with the purest organic options.
            </p>
          </div>
          <div>{IMG_PLACEHOLDER("Farm Entrance", "5/2", "/farmhouse.jpg")}</div>
        </div>
      </section>

      {/* Intro Bar */}
      <section style={{ background: COLORS.bark, padding: isMobile ? "2rem 1.25rem" : "2.5rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 3.5vw, 1.5rem)", fontStyle: "italic", color: COLORS.forest, margin: 0, lineHeight: 1.6 }}>
            "Whether you want to discuss your requirements, dive into our product range, or plan a visit to our enchanting farm, we're here to make it happen."
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section style={{ padding: isMobile ? "3rem 1.25rem" : "7rem 2rem", background: COLORS.cream }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.4fr", gap: isMobile ? "2.5rem" : "6rem", alignItems: "start" }}>
          {/* Info panel */}
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.terracotta, marginBottom: "1rem" }}>Find Us</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem, 5vw, 2.2rem)", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.5rem", lineHeight: 1.2 }}>Java Estates<br /><em>Private Limited</em></h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "0.5rem" }}>Address</div>
                <address style={{ fontStyle: "normal", fontFamily: "'Crimson Pro', serif", fontSize: "1.05rem", color: COLORS.charcoal, lineHeight: 1.9 }}>
                  Sy 37, 38/2, Sidlakona<br />
                  Tumkuru – 572125<br />
                  Karnataka, India
                </address>
              </div>
              <LeafDivider color={COLORS.bark} />
              <a href="https://maps.app.goo.gl/dLtyCp5J5uiHTzJe6" target="_blank" rel="noopener noreferrer" style={{
              background: COLORS.forest, border: `1px solid ${COLORS.bark}`,
              color: COLORS.bark, fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "8px 20px", cursor: "pointer", transition: "all 0.2s", width: "fit-content", borderRadius: "3px",
            }}
              onMouseEnter={e => { e.target.style.background = COLORS.bark; e.target.style.color = COLORS.forest; }}
              onMouseLeave={e => { e.target.style.background = COLORS.forest; e.target.style.color = COLORS.bark; }}
            >Maps Location</a>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: "1rem", color: COLORS.charcoal, lineHeight: 1.85 }}>
                Looking to collaborate for all your organic agricultural and dairy product needs? We're thrilled to connect with you.
              </p>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: COLORS.linen, padding: isMobile ? "2rem 1.25rem" : "3rem", border: `1px solid ${COLORS.bark}22` }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: COLORS.bark, marginBottom: "0.5rem" }}>Send a Message</div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", fontWeight: 400, color: COLORS.forest, margin: "0 0 1.75rem" }}>Let's Start a Conversation</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = COLORS.moss}
                  onBlur={e => e.target.style.borderColor = `${COLORS.bark}55`}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem" }}>
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
                  <p style={{ fontFamily: "'Crimson Pro', serif", color: COLORS.terracotta, fontSize: "1rem", margin: "0 0 0.5rem" }}>Something went wrong. Please configure your EmailJS credentials.</p>
                </div>
              )}

              <button onClick={handleSubmit} disabled={status === "sending"} style={{
                background: COLORS.forest, border: "none", color: COLORS.cream,
                fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem",
                letterSpacing: "0.15em", textTransform: "uppercase",
                padding: "15px 28px", cursor: status === "sending" ? "wait" : "pointer",
                opacity: status === "sending" ? 0.7 : 1, alignSelf: "flex-start",
                minWidth: isMobile ? "100%" : "auto",
              }}>
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

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap";
    document.head.appendChild(link);
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = COLORS.mist;

    // Prevent horizontal scroll
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  }, []);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Crimson Pro', serif", overflowX: "hidden" }}>
      <Nav page={page} setPage={setPage} />
      {page === "landing" && <LandingPage setPage={setPage} />}
      {page === "a2milk" && <A2MilkPage setPage={setPage} />}
      {page === "contact" && <ContactPage setPage={setPage} />}
    </div>
  );
}