import { useState, useEffect } from "react";

const TEAL = "#2a9d8f";
const TEAL_DARK = "#238b7e";
const LIGHT_BG = "#f0f5f5";
const GRAY_BORDER = "#d1d5db";
const TEXT_DARK = "#1f2937";
const TEXT_MED = "#4b5563";
const TEXT_LIGHT = "#6b7280";

const PMS_OPTIONS = {
  cliniko: { name: "Cliniko", icon: "C", iconBg: "#4a90d9", desc: "Practice management for allied health" },
  clinictocloud: { name: "Clinic To Cloud", icon: "C", iconBg: "#3498db", desc: "Cloud-based clinical management" },
  genie: { name: "Genie", icon: "G", iconBg: "#e74c3c", desc: "Clinical & practice management software" },
  gentu: { name: "Gentu", icon: "G", iconBg: "#27ae60", desc: "Practice management platform" },
  halaxy: { name: "Halaxy", icon: "H", iconBg: "#00b4d8", desc: "All-in-one practice management platform" },
  medirecords: { name: "MediRecords", icon: "M", iconBg: "#e67e22", desc: "Cloud-based clinical & practice management" },
  medicaldirector: { name: "MedicalDirector", icon: "M", iconBg: "#8e44ad", desc: "Clinical & practice management" },
  nookal: { name: "Nookal", icon: "N", iconBg: "#9b59b6", desc: "Practice management for allied health" },
};

const SCRIBE_OPTIONS = {
  heidi: { name: "Heidi Health", icon: "H", iconBg: "#1B3B8A", desc: "AI-powered clinical notes from your consults" },
  lyrebird: { name: "Lyrebird Health", icon: "L", iconBg: "#6B4C9A", desc: "AI medical scribe for Australian clinicians" },
  coviu: { name: "Coviu Assist", icon: "C", iconBg: TEAL, desc: "Built-in AI notes — zero setup, included free" },
};

const TOTAL_SCREENS = 11;

const SCREEN_LABELS = [
  "Sign Up",
  "Onboarding 1", "Onboarding 2", "Onboarding 3",
  "Onboarding 4", "Onboarding 5", "Onboarding 6",
  "Integration 1", "Integration 2",
  "In-Call",
  "Notes",
];

const STEP_GROUPS = [
  { label: "Sign Up", screens: [0] },
  { label: "Onboarding", screens: [1,2,3,4,5,6] },
  { label: "Integrations", screens: [7,8] },
  { label: "First Call", screens: [9] },
  { label: "Notes", screens: [10] },
];

function ProgressBar({ currentScreen }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "white", borderBottom: "1px solid #e5e7eb",
      padding: "8px 20px", display: "flex", alignItems: "center", gap: 4,
      fontFamily: "'Inter', -apple-system, sans-serif", fontSize: 12,
    }}>
      <div style={{ color: TEXT_LIGHT, fontSize: 11, marginRight: 8, whiteSpace: "nowrap" }}>
        {currentScreen + 1}/{TOTAL_SCREENS}
      </div>
      <div style={{ display: "flex", gap: 3, flex: 1, alignItems: "center" }}>
        {STEP_GROUPS.map((group, gi) => {
          const isActive = group.screens.includes(currentScreen);
          const isComplete = group.screens[group.screens.length - 1] < currentScreen;
          return (
            <div key={gi} style={{ display: "flex", alignItems: "center", gap: 3, flex: group.screens.length }}>
              <div style={{
                flex: 1, height: 4, borderRadius: 2,
                background: isComplete ? TEAL : isActive ? `linear-gradient(90deg, ${TEAL} ${((currentScreen - group.screens[0]) / group.screens.length) * 100}%, #e5e7eb ${((currentScreen - group.screens[0]) / group.screens.length) * 100}%)` : "#e5e7eb",
              }} />
              <span style={{
                fontSize: 10, color: isActive ? TEAL : isComplete ? TEXT_MED : TEXT_LIGHT,
                fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap",
              }}>{group.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NavFooter({ currentScreen, onNext, onPrev, nextLabel }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1000,
      background: "white", borderTop: "1px solid #e5e7eb",
      padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <button
        onClick={onPrev}
        disabled={currentScreen === 0}
        style={{
          padding: "8px 20px", borderRadius: 6, border: `1px solid ${GRAY_BORDER}`,
          background: "white", color: currentScreen === 0 ? "#d1d5db" : TEXT_MED,
          cursor: currentScreen === 0 ? "default" : "pointer", fontSize: 13, fontWeight: 500,
        }}
      >← Back</button>
      <span style={{ fontSize: 11, color: TEXT_LIGHT }}>{SCREEN_LABELS[currentScreen]}</span>
      <button
        onClick={onNext}
        disabled={currentScreen === TOTAL_SCREENS - 1}
        style={{
          padding: "8px 20px", borderRadius: 6, border: "none",
          background: currentScreen === TOTAL_SCREENS - 1 ? "#d1d5db" : TEAL,
          color: "white", cursor: currentScreen === TOTAL_SCREENS - 1 ? "default" : "pointer",
          fontSize: 13, fontWeight: 500,
        }}
      >{nextLabel || "Next →"}</button>
    </div>
  );
}

/* ─── Screen 1: Sign Up ─── */
function SignUpScreen({ onNext, onFirstNameChange, onPmsChange, onEmailChange }) {
  const [form, setForm] = useState({
    first: "", last: "", phone: "", profession: "", email: "", password: "", practice: "", link: "", pms: ""
  });
  const [errors, setErrors] = useState({});

  const handleFirstChange = (val) => {
    setForm(f => ({ ...f, first: val }));
    if (onFirstNameChange) onFirstNameChange(val);
    if (val.trim()) setErrors(e => ({ ...e, first: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!form.first.trim()) newErrors.first = true;
    if (!form.email.trim()) newErrors.email = true;
    if (!form.pms) newErrors.pms = true;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onNext();
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: `1px solid ${GRAY_BORDER}`,
    borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box",
    fontFamily: "'Inter', -apple-system, sans-serif",
  };
  const labelStyle = { fontSize: 13, color: TEXT_DARK, marginBottom: 4, display: "block", fontWeight: 400 };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      {/* Left form */}
      <div style={{ flex: "1 1 60%", display: "flex", flexDirection: "column", minWidth: 0, maxHeight: "100vh", overflow: "hidden" }}>
      {/* Scrollable form area */}
      <div style={{ flex: 1, padding: "60px clamp(24px, 5vw, 80px) 20px", overflowY: "auto" }}>
        {/* Coviu logo */}
        <svg width="110" height="32" viewBox="0 0 110 32" style={{ marginBottom: 28 }}>
          <text x="0" y="26" fill={TEAL} fontFamily="Arial Black, Arial" fontWeight="900" fontSize="28" letterSpacing="2">COVIU</text>
        </svg>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: TEXT_DARK, lineHeight: 1.3, margin: "0 0 4px" }}>
          <span style={{ color: TEAL }}>Get started for free</span> with Australia's leading telehealth platform
        </h1>
        <p style={{ color: TEXT_MED, fontSize: 14, margin: "0 0 28px" }}>2-week free trial. No credit card required.</p>

        <h3 style={{ fontSize: 15, fontWeight: 600, color: TEXT_DARK, margin: "0 0 16px" }}>Your details</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>First name <span style={{ color: "#e74c3c" }}>*</span></label>
            <input style={{ ...inputStyle, borderColor: errors.first ? "#e74c3c" : GRAY_BORDER }} value={form.first} onChange={e => handleFirstChange(e.target.value)} />
            {errors.first && <span style={{ fontSize: 11, color: "#e74c3c", marginTop: 3, display: "block" }}>First name is required</span>}
          </div>
          <div>
            <label style={labelStyle}>Last name</label>
            <input style={inputStyle} value={form.last} onChange={e => setForm({...form, last: e.target.value})} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Phone number</label>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 4,
                border: `1px solid ${GRAY_BORDER}`, borderRadius: 6, padding: "8px 10px",
                fontSize: 13, color: TEXT_MED, whiteSpace: "nowrap",
              }}>
                🇦🇺 <span style={{ fontSize: 11 }}>▾</span>
              </div>
              <input style={inputStyle} placeholder="+61" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Profession/Specialty</label>
            <select style={{ ...inputStyle, color: form.profession ? TEXT_DARK : TEXT_LIGHT, appearance: "auto" }} value={form.profession} onChange={e => setForm({...form, profession: e.target.value})}>
              <option value="">Select an option</option>
              <option value="gp">General Practitioner</option>
              <option value="psych">Psychologist</option>
              <option value="physio">Physiotherapist</option>
              <option value="speech">Speech Pathologist</option>
              <option value="ot">Occupational Therapist</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>Email <span style={{ color: "#e74c3c" }}>*</span></label>
            <input style={{ ...inputStyle, borderColor: errors.email ? "#e74c3c" : GRAY_BORDER }} type="email" value={form.email} onChange={e => { setForm({...form, email: e.target.value}); if (onEmailChange) onEmailChange(e.target.value); if (e.target.value.trim()) setErrors(er => ({ ...er, email: false })); }} />
            {errors.email && <span style={{ fontSize: 11, color: "#e74c3c", marginTop: 3, display: "block" }}>Email is required</span>}
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input style={inputStyle} type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
        </div>

        <h3 style={{ fontSize: 15, fontWeight: 600, color: TEXT_DARK, margin: "0 0 16px" }}>Account Details</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 8 }}>
          <div>
            <label style={labelStyle}>Practice name</label>
            <input style={inputStyle} value={form.practice} onChange={e => setForm({...form, practice: e.target.value})} />
          </div>
          <div>
            <label style={labelStyle}>Practice link</label>
            <div style={{ display: "flex", alignItems: "center", border: `1px solid ${GRAY_BORDER}`, borderRadius: 6, overflow: "hidden" }}>
              <span style={{ padding: "10px 8px 10px 12px", fontSize: 13, color: TEXT_LIGHT, whiteSpace: "nowrap", background: "#f9fafb" }}>app.coviu.com/t/</span>
              <input style={{ ...inputStyle, border: "none", borderRadius: 0 }} placeholder="practice-name" value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
            </div>
            <span style={{ fontSize: 11, color: TEXT_LIGHT, marginTop: 4, display: "block" }}>Link you can share with your patients/clients</span>
          </div>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={labelStyle}>Practice management system (PMS) <span style={{ color: "#e74c3c" }}>*</span></label>
          <select style={{ ...inputStyle, color: form.pms ? TEXT_DARK : TEXT_LIGHT, appearance: "auto", maxWidth: "calc(50% - 8px)", borderColor: errors.pms ? "#e74c3c" : GRAY_BORDER }} value={form.pms} onChange={e => { setForm({...form, pms: e.target.value}); if (onPmsChange) onPmsChange(e.target.value); if (e.target.value) setErrors(er => ({ ...er, pms: false })); }}>
            <option value="">Select your PMS</option>
            <option value="cliniko">Cliniko</option>
            <option value="clinictocloud">Clinic To Cloud</option>
            <option value="genie">Genie</option>
            <option value="gentu">Gentu</option>
            <option value="halaxy">Halaxy</option>
            <option value="medirecords">Medirecords</option>
            <option value="medicaldirector">MedicalDirector</option>
            <option value="nookal">Nookal</option>
            <option value="other">Other</option>
            <option value="none">I don't use a PMS</option>
          </select>
          {errors.pms && <span style={{ fontSize: 11, color: "#e74c3c", marginTop: 3, display: "block" }}>Please select your practice management system</span>}
        </div>

        <div style={{ margin: "16px 0 20px" }}>
          <a href="#" style={{ color: TEAL, fontSize: 13, textDecoration: "none" }}>Do you have a referral code?</a>
        </div>
      </div>

      {/* Sticky submit bar */}
      <div style={{
        position: "sticky", bottom: 0, left: 0, right: 0,
        background: "white", borderTop: "1px solid #e5e7eb",
        padding: "14px clamp(24px, 5vw, 80px)",
        display: "flex", alignItems: "center", gap: 16,
        zIndex: 10,
      }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 36px", background: TEAL, color: "white", border: "none",
            borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
            letterSpacing: 1.5, textTransform: "uppercase", flexShrink: 0,
          }}
          onMouseEnter={e => e.target.style.background = TEAL_DARK}
          onMouseLeave={e => e.target.style.background = TEAL}
        >SUBMIT</button>
        <span style={{ fontSize: 12, color: TEXT_LIGHT }}>
          By clicking 'Submit' you agree to Coviu's{" "}
          <a href="#" style={{ color: TEAL, textDecoration: "none" }}>Terms of Service</a> and{" "}
          <a href="#" style={{ color: TEAL, textDecoration: "none" }}>Privacy Policy</a>.
        </span>
      </div>
    </div>

      {/* Right panel */}
      <div style={{
        flex: "1 1 40%", background: LIGHT_BG,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "40px clamp(16px, 3vw, 40px)", position: "relative", minWidth: 0,
      }}>
        {/* Placeholder for the product imagery */}
        <div style={{
          width: 280, height: 200, background: `linear-gradient(135deg, ${TEAL}22, ${TEAL}44)`,
          borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 32, border: `2px dashed ${TEAL}66`,
        }}>
          <div style={{ textAlign: "center", color: TEAL, fontSize: 13, padding: 20, lineHeight: 1.5 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>💻</div>
            Coviu Platform Preview
          </div>
        </div>

        <div style={{ maxWidth: 300 }}>
          {[
            { icon: "🖥", text: "Dynamic video consultations, virtual waiting room, group rooms and phone capabilities" },
            { icon: "📋", text: "50+ apps, inc. customisable forms and standardised assessments (inc. Pearson)" },
            { icon: "✅", text: "No downloads required, simply click a link" },
            { icon: "🔒", text: "HIPAA, ST4S and ISO 27001 compliant and data end-to-end encrypted" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
              <span style={{ fontSize: 13, color: TEXT_MED, lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: TEXT_DARK, lineHeight: 1.4, margin: "0 0 4px" }}>
            Millions of telehealth consultations have been successfully delivered using Coviu.
          </p>
          <p style={{ fontSize: 15, fontWeight: 600, color: TEXT_DARK, margin: 0 }}>
            Host your first consultation now!
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Screen 2: Onboarding 1 - Tell us about your role ─── */
function OnboardingRoleScreen({ onNext, firstName }) {
  const [selected, setSelected] = useState(null);
  const roles = [
    "Practitioner / Healthcare Provider",
    "Clinical Lead / Director",
    "Practice Manager",
    "Practice / Clinic Owner",
    "Clinic Operations / Administrator",
    "Technology / IT Manager",
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: "1 1 58%", padding: "0", minWidth: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 32px", borderBottom: "1px solid #e5e7eb" }}>
          <svg width="90" height="28" viewBox="0 0 110 32">
            <text x="0" y="26" fill={TEAL} fontFamily="Arial Black, Arial" fontWeight="900" fontSize="28" letterSpacing="2">COVIU</text>
          </svg>
        </div>
        <div style={{ padding: "32px clamp(20px, 4vw, 60px) 100px" }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 28 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: TEAL }} />
            {[...Array(7)].map((_, i) => (
              <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: "#e5e7eb" }} />
            ))}
          </div>
          {firstName?.trim() ? (
            <h1 style={{ fontSize: 26, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px" }}>
              Hey {firstName.trim()}, tell us about your role
            </h1>
          ) : (
            <h1 style={{ fontSize: 26, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px" }}>Tell us about your role</h1>
          )}
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 28px" }}>This helps us personalise Coviu to your needs.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 500 }}>
            {roles.map((role, i) => (
              <button key={i} onClick={() => setSelected(role)} style={{
                padding: "16px 18px", borderRadius: 8, textAlign: "left",
                border: selected === role ? `2px solid ${TEAL}` : `1px solid ${GRAY_BORDER}`,
                background: selected === role ? `${TEAL}08` : "white",
                cursor: "pointer", fontSize: 14, color: TEXT_DARK, lineHeight: 1.4,
              }}>{role}</button>
            ))}
          </div>
          <div style={{ maxWidth: 244, marginTop: 12 }}>
            <button onClick={() => setSelected("Other")} style={{
              padding: "16px 18px", borderRadius: 8, textAlign: "left", width: "100%",
              border: selected === "Other" ? `2px solid ${TEAL}` : `1px solid ${GRAY_BORDER}`,
              background: selected === "Other" ? `${TEAL}08` : "white",
              cursor: "pointer", fontSize: 14, color: TEXT_DARK,
            }}>Other</button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", maxWidth: 500, marginTop: 32 }}>
            <button onClick={onNext} style={{
              padding: "12px 48px", background: TEAL, color: "white", border: "none",
              borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>NEXT</button>
          </div>
          <div style={{
            marginTop: 60, padding: "14px 20px", border: `1px solid ${GRAY_BORDER}`,
            borderRadius: 10, display: "flex", alignItems: "center", gap: 10, maxWidth: 420,
          }}>
            <span style={{ fontSize: 13, color: TEXT_MED }}>Need some help?</span>
            <div style={{ display: "flex" }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: "#cdb4a0", border: "2px solid white" }} />
              <div style={{ width: 28, height: 28, borderRadius: 14, background: "#a0b4cd", border: "2px solid white", marginLeft: -8 }} />
            </div>
            <a href="#" style={{ color: TEAL, fontSize: 13, textDecoration: "none" }}>Book a session with a Coviu specialist ↗</a>
          </div>
        </div>
      </div>
      <div style={{
        flex: "1 1 42%", minWidth: 0,
        background: "linear-gradient(160deg, #e8faf6 0%, #d0f5ed 30%, #b8f0e4 60%, #a0eadb 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        padding: "60px 40px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)" }}>
          {[340, 260, 160].map((size, i) => (
            <div key={i} style={{
              position: "absolute", width: size, height: size, borderRadius: "50%",
              border: `1.5px ${i === 1 ? "dashed" : "solid"} ${TEAL}44`,
              top: `calc(50% - ${size/2}px)`, left: `calc(50% - ${size/2}px)`,
            }} />
          ))}
          <div style={{
            position: "absolute", width: 120, height: 120, borderRadius: "50%",
            background: `${TEAL}cc`, top: "calc(50% - 60px)", left: "calc(50% - 60px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontSize: 32, fontWeight: 800, fontFamily: "Arial Black, Arial", letterSpacing: 1 }}>CO</span>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 320, marginRight: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT_DARK, margin: "0 0 12px", lineHeight: 1.3 }}>
            Setup your clinic on Coviu
          </h2>
          <p style={{ fontSize: 15, color: TEXT_DARK, margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
            A few quick steps to setup your virtual clinic and start taking consults.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared onboarding right panel ─── */
function OnboardingRightPanel() {
  return (
    <div style={{
      flex: "1 1 42%", minWidth: 0,
      background: "linear-gradient(160deg, #e8faf6 0%, #d0f5ed 30%, #b8f0e4 60%, #a0eadb 100%)",
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
      padding: "60px 40px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)" }}>
        {[340, 260, 160].map((size, i) => (
          <div key={i} style={{
            position: "absolute", width: size, height: size, borderRadius: "50%",
            border: `1.5px ${i === 1 ? "dashed" : "solid"} ${TEAL}44`,
            top: `calc(50% - ${size/2}px)`, left: `calc(50% - ${size/2}px)`,
          }} />
        ))}
        <div style={{
          position: "absolute", width: 120, height: 120, borderRadius: "50%",
          background: `${TEAL}cc`, top: "calc(50% - 60px)", left: "calc(50% - 60px)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "white", fontSize: 32, fontWeight: 800, fontFamily: "Arial Black, Arial", letterSpacing: 1 }}>CO</span>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 320, marginRight: 60 }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, color: TEXT_DARK, margin: "0 0 12px", lineHeight: 1.3 }}>
          Setup your clinic on Coviu
        </h2>
        <p style={{ fontSize: 15, color: TEXT_DARK, margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
          A few quick steps to setup your virtual clinic and start taking consults.
        </p>
      </div>
    </div>
  );
}

/* ─── Shared onboarding help bar ─── */
function OnboardingHelpBar() {
  return (
    <div style={{
      marginTop: 60, padding: "14px 20px", border: `1px solid ${GRAY_BORDER}`,
      borderRadius: 10, display: "flex", alignItems: "center", gap: 10, maxWidth: 420,
    }}>
      <span style={{ fontSize: 13, color: TEXT_MED }}>Need some help?</span>
      <div style={{ display: "flex" }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: "#cdb4a0", border: "2px solid white" }} />
        <div style={{ width: 28, height: 28, borderRadius: 14, background: "#a0b4cd", border: "2px solid white", marginLeft: -8 }} />
      </div>
      <a href="#" style={{ color: TEAL, fontSize: 13, textDecoration: "none" }}>Book a session with a Coviu specialist ↗</a>
    </div>
  );
}

/* ─── Shared onboarding progress bar ─── */
function OnboardingProgressBar({ step, total = 8 }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 28 }}>
      {[...Array(total)].map((_, i) => (
        <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < step ? TEAL : "#e5e7eb" }} />
      ))}
    </div>
  );
}

/* ─── Shared onboarding nav bar ─── */
function OnboardingNav() {
  return (
    <div style={{ padding: "16px 32px", borderBottom: "1px solid #e5e7eb" }}>
      <svg width="90" height="28" viewBox="0 0 110 32">
        <text x="0" y="26" fill={TEAL} fontFamily="Arial Black, Arial" fontWeight="900" fontSize="28" letterSpacing="2">COVIU</text>
      </svg>
    </div>
  );
}

/* ─── Screen 3: Onboarding 2 - What are you looking to do ─── */
function OnboardingGoalsScreen({ onNext, onPrev, onScribeChange }) {
  const [selected, setSelected] = useState([]);
  const [scribeProvider, setScribeProvider] = useState(null);
  const AI_NOTES_KEY = "Automatically generate AI notes for my consults";
  const goals = [
    "Run video consultations with patients",
    "Make and receive phone consultations",
    AI_NOTES_KEY,
    "Integrate telehealth with my PMS/EHR",
    "Take payments easily for online consults",
    "Streamline patient intake and onboarding",
    "Conduct assessments virtually",
  ];
  const scribes = [
    { id: "heidi", label: "Heidi Health", icon: "H", color: "#1B3B8A" },
    { id: "lyrebird", label: "Lyrebird Health", icon: "L", color: "#6B4C9A" },
    { id: "coviu", label: "Coviu Assist", icon: "C", color: TEAL },
    { id: "other", label: "Other", icon: "?", color: TEXT_LIGHT },
  ];

  const handleScribeSelect = (id) => {
    setScribeProvider(id);
    if (onScribeChange) onScribeChange(id);
  };

  const toggle = (g) => {
    setSelected(s => {
      const next = s.includes(g) ? s.filter(x => x !== g) : [...s, g];
      if (g === AI_NOTES_KEY && !next.includes(AI_NOTES_KEY)) {
        setScribeProvider(null);
        if (onScribeChange) onScribeChange(null);
      }
      return next;
    });
  };

  const showScribePicker = selected.includes(AI_NOTES_KEY);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: "1 1 58%", padding: "0", minWidth: 0, overflow: "hidden" }}>
        <OnboardingNav />
        <div style={{ padding: "32px clamp(20px, 4vw, 60px) 100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button onClick={onPrev} style={{
              background: "none", border: "none", color: TEAL, fontSize: 14, fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}>← Back</button>
            <div style={{ display: "flex", gap: 3, flex: 1 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 2 ? TEAL : "#e5e7eb" }} />
              ))}
            </div>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px", lineHeight: 1.3 }}>
            What are you looking to do with Coviu?
          </h1>
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 28px" }}>Select all that apply.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 500 }}>
            {goals.slice(0, 6).map((goal, i) => (
              <button key={i} onClick={() => toggle(goal)} style={{
                padding: "16px 18px", borderRadius: 8, textAlign: "left",
                border: selected.includes(goal) ? `2px solid ${TEAL}` : `1px solid ${GRAY_BORDER}`,
                background: selected.includes(goal) ? `${TEAL}08` : "white",
                cursor: "pointer", fontSize: 14, color: TEXT_DARK, lineHeight: 1.4,
              }}>{goal}</button>
            ))}
          </div>
          <div style={{ maxWidth: 244, marginTop: 12 }}>
            <button onClick={() => toggle(goals[6])} style={{
              padding: "16px 18px", borderRadius: 8, textAlign: "left", width: "100%",
              border: selected.includes(goals[6]) ? `2px solid ${TEAL}` : `1px solid ${GRAY_BORDER}`,
              background: selected.includes(goals[6]) ? `${TEAL}08` : "white",
              cursor: "pointer", fontSize: 14, color: TEXT_DARK,
            }}>{goals[6]}</button>
          </div>

          {/* AI Scribe sub-selection */}
          {showScribePicker && (
            <div style={{
              marginTop: 24, padding: "24px", maxWidth: 500,
              background: "#f8fffe", border: `1.5px solid ${TEAL}33`,
              borderRadius: 12,
              animation: "fadeSlideIn 0.25s ease-out",
            }}>
              <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: TEXT_DARK, margin: "0 0 4px" }}>
                Which AI scribe do you currently use?
              </h3>
              <p style={{ fontSize: 13, color: TEXT_MED, margin: "0 0 16px" }}>
                We'll set it up for you — or start you on Coviu Assist.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {scribes.map((s) => (
                  <button key={s.id} onClick={() => handleScribeSelect(s.id)} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "14px 16px", borderRadius: 10, textAlign: "left",
                    border: scribeProvider === s.id ? `2px solid ${TEAL}` : `1px solid ${GRAY_BORDER}`,
                    background: scribeProvider === s.id ? `${TEAL}0a` : "white",
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, background: s.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", fontSize: 14, fontWeight: 800, flexShrink: 0,
                    }}>{s.icon}</div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: TEXT_DARK }}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", maxWidth: 500, marginTop: 32 }}>
            <button onClick={onNext} style={{
              padding: "12px 48px", background: TEAL, color: "white", border: "none",
              borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>NEXT</button>
          </div>

          <OnboardingHelpBar />
        </div>
      </div>
      <OnboardingRightPanel />
    </div>
  );
}

/* ─── Screen 4: Onboarding 3 - Tell us about your Clinic (PMS) ─── */
function OnboardingPMSScreen({ onNext, onPrev }) {
  const [selected, setSelected] = useState(null);
  const options = [
    "Cliniko", "Clinic To Cloud",
    "Genie", "Gentu",
    "Halaxy", "Medirecords",
    "MedicalDirector", "Nookal",
    "Other", "I don't use a PMS",
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: "1 1 58%", padding: "0", minWidth: 0, overflow: "hidden" }}>
        <OnboardingNav />
        <div style={{ padding: "32px clamp(20px, 4vw, 60px) 100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button onClick={onPrev} style={{
              background: "none", border: "none", color: TEAL, fontSize: 14, fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}>← Back</button>
            <div style={{ display: "flex", gap: 3, flex: 1 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 3 ? TEAL : "#e5e7eb" }} />
              ))}
            </div>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px", lineHeight: 1.3 }}>
            Tell us about your Clinic
          </h1>
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 28px" }}>What practice management system (PMS) are you using?</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 500 }}>
            {options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(opt)} style={{
                padding: "16px 18px", borderRadius: 8, textAlign: "left",
                border: selected === opt ? `2px solid ${TEAL}` : `1px solid ${GRAY_BORDER}`,
                background: selected === opt ? `${TEAL}08` : "white",
                cursor: "pointer", fontSize: 14, color: TEXT_DARK, lineHeight: 1.4,
              }}>{opt}</button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", maxWidth: 500, marginTop: 32 }}>
            <button onClick={onNext} style={{
              padding: "12px 48px", background: TEAL, color: "white", border: "none",
              borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>NEXT</button>
          </div>

          <OnboardingHelpBar />
        </div>
      </div>
      <OnboardingRightPanel />
    </div>
  );
}

/* ─── Screen 5: Onboarding 4 - How is your clinic set up? ─── */
function OnboardingClinicSetupScreen({ onNext, onPrev }) {
  const [selected, setSelected] = useState(null);
  const options = [
    { label: "Solo practitioner", icon: "◆", color: "#7dd3c8" },
    { label: "Solo practitioner with admin staff", icon: "◆", color: "#5bc4c0" },
    { label: "Multi-practitioner clinic", icon: "◆◆", color: "#3ba8a8" },
  ];
  const infoMessages = {
    "Solo practitioner": "We'll set up a simple workspace just for you.",
    "Solo practitioner with admin staff": "We'll set up a central reception plus individual consultation rooms.",
    "Multi-practitioner clinic": "We'll set up a central reception plus individual consultation rooms.",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: "1 1 58%", padding: "0", minWidth: 0, overflow: "hidden" }}>
        <OnboardingNav />
        <div style={{ padding: "32px clamp(20px, 4vw, 60px) 100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button onClick={onPrev} style={{
              background: "none", border: "none", color: TEAL, fontSize: 14, fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}>← Back</button>
            <div style={{ display: "flex", gap: 3, flex: 1 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 4 ? TEAL : "#e5e7eb" }} />
              ))}
            </div>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px", lineHeight: 1.3 }}>
            How is your clinic set up?
          </h1>
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 28px" }}>We'll configure Coviu to match your workflow.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
            {options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(opt.label)} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "20px 24px", borderRadius: 10, textAlign: "left", width: "100%",
                border: selected === opt.label ? `2px solid ${TEAL}` : `1px solid ${GRAY_BORDER}`,
                background: selected === opt.label ? `${TEAL}06` : "white",
                cursor: "pointer", fontSize: 15, color: TEXT_DARK,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: `linear-gradient(135deg, ${opt.color}44, ${opt.color}88)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, color: opt.color, flexShrink: 0,
                }}>{opt.icon}</div>
                {opt.label}
              </button>
            ))}
          </div>

          {selected && infoMessages[selected] && (
            <div style={{
              marginTop: 16, padding: "14px 18px", maxWidth: 500,
              background: "#f3f4f6", borderRadius: 10,
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 13, color: TEXT_MED, lineHeight: 1.5,
            }}>
              <span style={{ color: TEAL, fontSize: 16, flexShrink: 0 }}>ⓘ</span>
              {infoMessages[selected]}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", maxWidth: 500, marginTop: 32 }}>
            <button onClick={onNext} style={{
              padding: "12px 48px", background: TEAL, color: "white", border: "none",
              borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>NEXT</button>
          </div>

          <OnboardingHelpBar />
        </div>
      </div>

      {/* Right panel - waiting room preview */}
      <div style={{
        flex: "1 1 42%", minWidth: 0,
        background: "linear-gradient(160deg, #e8faf6 0%, #d0f5ed 30%, #b8f0e4 60%, #a0eadb 100%)",
        display: "flex", flexDirection: "column", padding: "60px 32px", position: "relative", overflow: "hidden",
      }}>
        {/* Concentric circles bg */}
        <div style={{ position: "absolute", right: -100, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }}>
          {[400, 300].map((size, i) => (
            <div key={i} style={{
              position: "absolute", width: size, height: size, borderRadius: "50%",
              border: `1.5px ${i === 0 ? "solid" : "dashed"} ${TEAL}44`,
              top: `calc(50% - ${size/2}px)`, left: `calc(50% - ${size/2}px)`,
            }} />
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px" }}>Setup your clinic on Coviu</h2>
          <p style={{ fontSize: 14, color: TEXT_DARK, margin: "0 0 24px", opacity: 0.8, lineHeight: 1.5 }}>
            A few quick steps to setup your virtual clinic and start taking consults.
          </p>

          {/* Waiting room cards */}
          {[
            { room: "Reception", badge: "RE", badgeColor: "#6366f1", patients: [
              { name: "Amelia Anderson", status: "WAITING", time: "41:12", statusColor: "#fbbf24", icon: "📹" }
            ]},
            { room: "Clinic sample 1", badge: "CL", badgeColor: TEAL, patients: [
              { name: "Mia Hernandez", status: "BEING SEEN", time: "32:09", statusColor: "#86efac", icon: "📹" },
              { name: "Isabella Garcia", status: "ON HOLD", time: "46:28", statusColor: "#fca5a5", icon: "📞" },
              { name: "Ethan Moore", status: "WAITING", time: "22:38", statusColor: "#fbbf24", icon: "📹" },
            ]},
            { room: "Clinic sample 2", badge: "CL", badgeColor: TEAL, patients: [
              { name: "Jackson Jackson", status: "BEING SEEN", time: "22:41", statusColor: "#86efac", icon: "📞" },
            ]},
          ].map((room, ri) => (
            <div key={ri} style={{
              background: "white", borderRadius: 12, marginBottom: 12,
              border: `1px solid ${GRAY_BORDER}`, overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid #f0f0f0` }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6, background: room.badgeColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 800, color: "white",
                }}>{room.badge}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK }}>{room.room}</span>
              </div>
              {room.patients.map((p, pi) => (
                <div key={pi} style={{
                  display: "flex", alignItems: "center", padding: "8px 14px",
                  borderBottom: pi < room.patients.length - 1 ? `1px solid #f5f5f5` : "none",
                }}>
                  <div style={{
                    padding: "6px 10px", borderRadius: 6, marginRight: 12,
                    background: p.statusColor, textAlign: "center", minWidth: 70,
                  }}>
                    <div style={{ fontSize: 9, fontWeight: 700, color: TEXT_DARK, letterSpacing: 0.5 }}>{p.status}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK }}>{p.time}</div>
                  </div>
                  <span style={{ fontSize: 13, color: TEXT_DARK, flex: 1 }}>{p.name}</span>
                  <span style={{ fontSize: 14 }}>{p.icon}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Screen 6: Onboarding 5 - Set up consultation rooms ─── */
function OnboardingRoomsScreen({ onNext, onPrev }) {
  const [rooms, setRooms] = useState([
    { name: "Reception", slug: "reception" },
    { name: "Clinic sample 1", slug: "clinicsample1" },
    { name: "Clinic sample 2", slug: "clinicsample2" },
  ]);

  const updateRoom = (i, val) => {
    const updated = [...rooms];
    updated[i] = { name: val, slug: val.toLowerCase().replace(/\s+/g, "") };
    setRooms(updated);
  };
  const removeRoom = (i) => setRooms(rooms.filter((_, idx) => idx !== i));
  const addRoom = () => setRooms([...rooms, { name: "", slug: "" }]);

  /* Reusable waiting room right panel */
  const WaitingRoomPanel = () => (
    <div style={{
      flex: "1 1 42%", minWidth: 0,
      background: "linear-gradient(160deg, #e8faf6 0%, #d0f5ed 30%, #b8f0e4 60%, #a0eadb 100%)",
      display: "flex", flexDirection: "column", padding: "60px 32px", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", right: -100, top: "50%", transform: "translateY(-50%)", opacity: 0.3 }}>
        {[400, 300].map((size, i) => (
          <div key={i} style={{
            position: "absolute", width: size, height: size, borderRadius: "50%",
            border: `1.5px ${i === 0 ? "solid" : "dashed"} ${TEAL}44`,
            top: `calc(50% - ${size/2}px)`, left: `calc(50% - ${size/2}px)`,
          }} />
        ))}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px" }}>Setup your clinic on Coviu</h2>
        <p style={{ fontSize: 14, color: TEXT_DARK, margin: "0 0 24px", opacity: 0.8, lineHeight: 1.5 }}>
          A few quick steps to setup your virtual clinic and start taking consults.
        </p>
        {[
          { room: "Reception", badge: "RE", badgeColor: "#6366f1", patients: [
            { name: "Amelia Anderson", status: "WAITING", time: "41:27", statusColor: "#fbbf24", icon: "📹" }
          ]},
          { room: "Clinic sample 1", badge: "CL", badgeColor: TEAL, patients: [
            { name: "Mia Hernandez", status: "BEING SEEN", time: "32:24", statusColor: "#86efac", icon: "📹" },
            { name: "Isabella Garcia", status: "ON HOLD", time: "46:43", statusColor: "#fca5a5", icon: "📞" },
            { name: "Ethan Moore", status: "WAITING", time: "22:53", statusColor: "#fbbf24", icon: "📹" },
          ]},
          { room: "Clinic sample 2", badge: "CL", badgeColor: TEAL, patients: [
            { name: "Jackson Jackson", status: "BEING SEEN", time: "22:56", statusColor: "#86efac", icon: "📞" },
          ]},
        ].map((room, ri) => (
          <div key={ri} style={{
            background: "white", borderRadius: 12, marginBottom: 12,
            border: `1px solid ${GRAY_BORDER}`, overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid #f0f0f0` }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6, background: room.badgeColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 800, color: "white",
              }}>{room.badge}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK }}>{room.room}</span>
            </div>
            {room.patients.map((p, pi) => (
              <div key={pi} style={{
                display: "flex", alignItems: "center", padding: "8px 14px",
                borderBottom: pi < room.patients.length - 1 ? `1px solid #f5f5f5` : "none",
              }}>
                <div style={{
                  padding: "6px 10px", borderRadius: 6, marginRight: 12,
                  background: p.statusColor, textAlign: "center", minWidth: 70,
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: TEXT_DARK, letterSpacing: 0.5 }}>{p.status}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK }}>{p.time}</div>
                </div>
                <span style={{ fontSize: 13, color: TEXT_DARK, flex: 1 }}>{p.name}</span>
                <span style={{ fontSize: 14 }}>{p.icon}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: "1 1 58%", padding: "0", minWidth: 0, overflow: "hidden" }}>
        <OnboardingNav />
        <div style={{ padding: "32px clamp(20px, 4vw, 60px) 100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button onClick={onPrev} style={{
              background: "none", border: "none", color: TEAL, fontSize: 14, fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}>← Back</button>
            <div style={{ display: "flex", gap: 3, flex: 1 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 5 ? TEAL : "#e5e7eb" }} />
              ))}
            </div>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 600, color: TEXT_DARK, margin: "0 0 12px", lineHeight: 1.3 }}>
            Set up your consultation rooms
          </h1>
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 8px", lineHeight: 1.6, maxWidth: 480 }}>
            Consultation rooms are dedicated spaces for video and phone calls. Each room has a unique secure link – share this with patients and start accepting calls seamlessly, no download needed. You can rename or customise these links anytime.
          </p>
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 28px" }}>
            We've set up a few example rooms to get you started.
          </p>

          <div style={{
            background: "#fafafa", borderRadius: 12, padding: "24px 28px", maxWidth: 500,
            border: `1px solid #eee`,
          }}>
            {rooms.map((room, i) => (
              <div key={i} style={{ marginBottom: i < rooms.length - 1 ? 20 : 0 }}>
                <label style={{ fontSize: 13, color: TEXT_MED, marginBottom: 4, display: "block" }}>Room name</label>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    value={room.name}
                    onChange={e => updateRoom(i, e.target.value)}
                    style={{
                      flex: 1, padding: "10px 12px", border: `1px solid ${GRAY_BORDER}`,
                      borderRadius: 6, fontSize: 14, outline: "none", background: "white",
                      fontFamily: "'Inter', -apple-system, sans-serif",
                    }}
                  />
                  <button onClick={() => removeRoom(i)} style={{
                    width: 36, height: 36, borderRadius: 6, border: `1px solid ${GRAY_BORDER}`,
                    background: "white", cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 16, color: TEXT_LIGHT,
                  }}>🗑</button>
                </div>
                <span style={{ fontSize: 11, color: TEXT_LIGHT, marginTop: 4, display: "block" }}>
                  https://app.covi-exp.io/t/abc-clinic/join/{room.slug || "..."}
                </span>
              </div>
            ))}

            <button onClick={addRoom} style={{
              marginTop: 20, padding: "10px 20px", borderRadius: 8,
              border: `1px solid ${GRAY_BORDER}`, background: "white",
              cursor: "pointer", fontSize: 13, fontWeight: 600, color: TEXT_MED,
              display: "flex", alignItems: "center", gap: 6, width: "100%", justifyContent: "center",
            }}>+ ADD ANOTHER ROOM</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", maxWidth: 500, marginTop: 32 }}>
            <button onClick={onNext} style={{
              padding: "12px 48px", background: TEAL, color: "white", border: "none",
              borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>NEXT</button>
          </div>

          <OnboardingHelpBar />
        </div>
      </div>
      <WaitingRoomPanel />
    </div>
  );
}

/* ─── Screen 7: Onboarding 6 - Invite your team ─── */
function OnboardingInviteScreen({ onNext, onPrev }) {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", overflow: "hidden" }}>
      <div style={{ flex: "1 1 58%", padding: "0", minWidth: 0, overflow: "hidden" }}>
        <OnboardingNav />
        <div style={{ padding: "32px clamp(20px, 4vw, 60px) 100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <button onClick={onPrev} style={{
              background: "none", border: "none", color: TEAL, fontSize: 14, fontWeight: 500,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: 0,
            }}>← Back</button>
            <div style={{ display: "flex", gap: 3, flex: 1 }}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < 6 ? TEAL : "#e5e7eb" }} />
              ))}
            </div>
          </div>

          <h1 style={{ fontSize: 26, fontWeight: 600, color: TEXT_DARK, margin: "0 0 16px", lineHeight: 1.3 }}>
            Invite your team
          </h1>
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 8px", lineHeight: 1.65, maxWidth: 480 }}>
            Coviu is purpose built for healthcare teams. Invite your clinicians, admin staff, and receptionists to seamlessly intake, consult, follow-up patient calls, and explore powerful features like AI Notes and in-call Assessments.
          </p>
          <p style={{ fontSize: 14, color: TEXT_MED, margin: "0 0 32px", lineHeight: 1.65, maxWidth: 480 }}>
            Your Clinic Plan includes <strong style={{ color: TEXT_DARK }}>up to 20 free admin (non-clinician) seats</strong>. To redeem, complete setup and reach out to our Support team.
          </p>

          {members.map((m, i) => (
            <div key={i} style={{
              padding: "10px 16px", border: `1px solid ${GRAY_BORDER}`, borderRadius: 8,
              marginBottom: 8, fontSize: 14, color: TEXT_DARK, maxWidth: 400,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>{m}</span>
              <button onClick={() => setMembers(members.filter((_, idx) => idx !== i))} style={{
                background: "none", border: "none", color: TEXT_LIGHT, cursor: "pointer", fontSize: 16,
              }}>×</button>
            </div>
          ))}

          {showForm && (
            <div style={{ display: "flex", gap: 8, maxWidth: 400, marginBottom: 16 }}>
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="team@example.com"
                style={{
                  flex: 1, padding: "10px 12px", border: `1px solid ${GRAY_BORDER}`,
                  borderRadius: 6, fontSize: 14, outline: "none",
                  fontFamily: "'Inter', -apple-system, sans-serif",
                }}
              />
              <button onClick={() => { if (email) { setMembers([...members, email]); setEmail(""); setShowForm(false); } }} style={{
                padding: "10px 16px", background: TEAL, color: "white", border: "none",
                borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Add</button>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "center", maxWidth: 400 }}>
            <button onClick={() => setShowForm(true)} style={{
              padding: "12px 28px", borderRadius: 8,
              border: `1px solid ${GRAY_BORDER}`, background: "white",
              cursor: "pointer", fontSize: 13, fontWeight: 600, color: TEXT_MED,
              display: "flex", alignItems: "center", gap: 6, letterSpacing: 1,
            }}>+ ADD TEAM MEMBER</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, maxWidth: 500, marginTop: 32 }}>
            <button onClick={onNext} style={{
              background: "none", border: "none", color: TEXT_MED, fontSize: 13,
              fontWeight: 600, cursor: "pointer", letterSpacing: 1, textTransform: "uppercase",
            }}>SKIP THIS STEP</button>
            <button onClick={onNext} style={{
              padding: "12px 48px", background: TEAL, color: "white", border: "none",
              borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 1.5, textTransform: "uppercase",
            }}>NEXT</button>
          </div>

          <OnboardingHelpBar />
        </div>
      </div>
      <OnboardingRightPanel />
    </div>
  );
}

/* ─── Coviu Dashboard Shell (sidebar + topbar) ─── */
const SIDEBAR_W = 220;
const TOPBAR_H = 56;
const SIDEBAR_BG = "#2d3748";

const AI_NOTES_SUB_ITEMS = [
  { key: "templates", label: "Templates" },
  { key: "notes", label: "AI notes" },
];

function CoviuSidebar({ activeItem, aiNotesExpanded, aiNotesSubTab, onItemClick, onAiNotesSubClick, topOffset = 36, bottomOffset = 48 }) {
  const items = [
    { icon: "👥", label: "Clinic" },
    { icon: "📁", label: "Data collections" },
    { icon: "📊", label: "Reports" },
    { icon: "📦", label: "Apps" },
    { icon: "📝", label: "Customisable forms" },
    { icon: "🤖", label: "AI Notes" },
    { icon: "⚙️", label: "Configure" },
  ];
  return (
    <div style={{
      width: SIDEBAR_W, background: SIDEBAR_BG, position: "fixed", top: topOffset, left: 0, bottom: bottomOffset,
      display: "flex", flexDirection: "column", padding: "16px 0", zIndex: 50, overflowY: "auto",
    }}>
      <div style={{
        margin: "0 16px 16px", padding: "8px 14px", borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.15)", textAlign: "center",
        fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)",
        letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
      }}>CREATE A NEW ROOM</div>
      {items.map((item, i) => (
        <div key={i}>
          <div
            onClick={() => onItemClick && onItemClick(item.label)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 20px", cursor: "pointer",
              background: activeItem === item.label ? "rgba(255,255,255,0.08)" : "transparent",
              color: activeItem === item.label ? "white" : "rgba(255,255,255,0.5)",
              fontSize: 14, fontWeight: activeItem === item.label ? 600 : 400,
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            {item.label}
            {item.label === "AI Notes" && (
              <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.6 }}>
                {aiNotesExpanded ? "▾" : "›"}
              </span>
            )}
          </div>
          {item.label === "AI Notes" && aiNotesExpanded && (
            <div style={{ overflow: "hidden" }}>
              {AI_NOTES_SUB_ITEMS.map((sub) => (
                <div
                  key={sub.key}
                  onClick={() => onAiNotesSubClick && onAiNotesSubClick(sub.key)}
                  style={{
                    padding: "7px 20px 7px 48px", cursor: "pointer",
                    fontSize: 12, transition: "all 0.15s",
                    color: aiNotesSubTab === sub.key ? "white" : "rgba(255,255,255,0.4)",
                    fontWeight: aiNotesSubTab === sub.key ? 600 : 400,
                    background: aiNotesSubTab === sub.key ? "rgba(255,255,255,0.06)" : "transparent",
                    borderLeft: aiNotesSubTab === sub.key ? `2px solid ${TEAL}` : "2px solid transparent",
                  }}
                >
                  {sub.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CoviuTopbar({ topOffset = 36, firstName }) {
  const displayName = firstName?.trim() || "Doreen";
  const initials = displayName.charAt(0).toUpperCase();
  return (
    <div style={{
      position: "fixed", top: topOffset, left: 0, right: 0, height: TOPBAR_H, zIndex: 60,
      background: "white", borderBottom: "1px solid #e5e7eb",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 24px 0 24px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: SIDEBAR_W }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: TEXT_MED }}>Product</span>
        <div style={{
          padding: "4px 12px", borderRadius: 6, border: `1px solid ${GRAY_BORDER}`,
          fontSize: 12, fontWeight: 600, color: TEXT_MED, display: "flex", alignItems: "center", gap: 4,
        }}>
          ABC Clinic <span style={{ fontSize: 10 }}>▾</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ fontSize: 16 }}>🔔</div>
          <div style={{ fontSize: 9, color: TEXT_LIGHT, fontWeight: 600, letterSpacing: 0.5 }}>MESSAGES</div>
        </div>
        <div style={{ textAlign: "center", cursor: "pointer" }}>
          <div style={{ fontSize: 16 }}>❓</div>
          <div style={{ fontSize: 9, color: TEXT_LIGHT, fontWeight: 600, letterSpacing: 0.5 }}>HELP</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 16, background: TEAL,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "white",
          }}>{initials}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK }}>{displayName} ▾</div>
            <div style={{ fontSize: 11, color: TEXT_LIGHT }}>Platform Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoviuDashboardShell({ children, activeItem, aiNotesExpanded, aiNotesSubTab, onItemClick, onAiNotesSubClick, standalone, firstName }) {
  const topOffset = standalone ? 0 : 36;
  const bottomOffset = standalone ? 0 : 48;
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <CoviuTopbar topOffset={topOffset} firstName={firstName} />
      <CoviuSidebar
        activeItem={activeItem}
        aiNotesExpanded={aiNotesExpanded}
        aiNotesSubTab={aiNotesSubTab}
        onItemClick={onItemClick}
        onAiNotesSubClick={onAiNotesSubClick}
        topOffset={topOffset}
        bottomOffset={bottomOffset}
      />
      <div style={{ marginLeft: SIDEBAR_W, marginTop: TOPBAR_H + topOffset, minHeight: `calc(100vh - ${TOPBAR_H + topOffset}px)`, overflowX: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Screen 8: Onboarding 7 - Setup Checklist (final onboarding) ─── */
function OnboardingChecklistScreen({ onNext, selectedScribe, selectedPms, userEmail, onStartTestCall, firstName }) {
  const scribeInfo = SCRIBE_OPTIONS[selectedScribe] || SCRIBE_OPTIONS.heidi;
  const pmsInfo = PMS_OPTIONS[selectedPms];

  const [completed, setCompleted] = useState({ account: true, scribe: false, pms: false, team: false, call: false });
  const [activeModule, setActiveModule] = useState(null);
  const [teamEmail, setTeamEmail] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [scribeJustConnected, setScribeJustConnected] = useState(false);
  const [testCallEmail, setTestCallEmail] = useState(userEmail || "");

  /* Heidi OAuth flow state: null | "login" | "authorise" | "connecting" | "success" */
  const [heidiOAuth, setHeidiOAuth] = useState(null);
  const [heidiEmail, setHeidiEmail] = useState(userEmail || "");
  const [heidiPassword, setHeidiPassword] = useState("");
  const [heidiError, setHeidiError] = useState("");

  const markDone = (key) => {
    setCompleted(prev => ({ ...prev, [key]: true }));
    setActiveModule(null);
  };

  const handleHeidiLogin = () => {
    if (!heidiEmail || !heidiPassword) { setHeidiError("Please enter your email and password"); return; }
    setHeidiError("");
    setHeidiOAuth("authorise");
  };

  const handleHeidiAuthorise = () => {
    setHeidiOAuth("connecting");
    setTimeout(() => {
      setHeidiOAuth("success");
      setTimeout(() => {
        markDone("scribe");
        setHeidiOAuth(null);
        setScribeJustConnected(true);
        setActiveModule("scribe");
      }, 1500);
    }, 1800);
  };

  const baseItems = [
    { key: "account", label: "Account created", desc: "Your Coviu account is ready to go", icon: "✓", iconBg: TEAL },
    { key: "scribe", label: `Connect ${scribeInfo.name}`, desc: "Set up your AI scribe integration for automatic notes", icon: scribeInfo.icon, iconBg: scribeInfo.iconBg },
  ];
  if (pmsInfo) {
    baseItems.push({ key: "pms", label: `Connect ${pmsInfo.name}`, desc: "Link your practice management system", icon: pmsInfo.icon, iconBg: pmsInfo.iconBg });
  }
  baseItems.push(
    { key: "team", label: "Invite your team", desc: "Add clinicians and admin staff to your clinic", icon: "👥", iconBg: "#8b5cf6" },
    { key: "call", label: "Start your first call", desc: "Test a video or phone consultation", icon: "📹", iconBg: "#f59e0b" },
  );
  const items = baseItems;

  const completedCount = Object.values(completed).filter(Boolean).length;

  /* ─── Heidi OAuth Popup ─── */
  const renderHeidiOAuth = () => {
    if (!heidiOAuth) return null;
    return (
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          background: "white", borderRadius: 16, width: 420,
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          overflow: "hidden",
          animation: "fadeSlideIn 0.2s ease-out",
        }}>
          {/* Popup header - Heidi branded */}
          <div style={{
            background: "#1B3B8A", padding: "20px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 800, color: "white",
              }}>H</div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>Heidi Health</span>
            </div>
            <button onClick={() => setHeidiOAuth(null)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.5)",
              fontSize: 18, cursor: "pointer", padding: 0,
            }}>✕</button>
          </div>

          <div style={{ padding: "28px" }}>
            {/* Step: Login */}
            {heidiOAuth === "login" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_LIGHT, letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>
                    Sign in to connect
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK, margin: "0 0 4px" }}>Log in to Heidi Health</h2>
                  <p style={{ fontSize: 13, color: TEXT_MED, margin: 0 }}>
                    Coviu needs permission to connect to your Heidi account.
                  </p>
                </div>

                {heidiError && (
                  <div style={{
                    padding: "8px 12px", background: "#fef2f2", border: "1px solid #fecaca",
                    borderRadius: 8, fontSize: 12, color: "#dc2626", marginBottom: 12,
                  }}>{heidiError}</div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MED, display: "block", marginBottom: 4 }}>Email address</label>
                  <input value={heidiEmail} onChange={e => setHeidiEmail(e.target.value)}
                    placeholder="you@clinic.com" type="email"
                    style={{
                      width: "100%", padding: "11px 14px", border: `1.5px solid ${GRAY_BORDER}`,
                      borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box",
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#1B3B8A"}
                    onBlur={e => e.target.style.borderColor = GRAY_BORDER}
                  />
                </div>
                <div style={{ marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MED, display: "block", marginBottom: 4 }}>Password</label>
                  <input value={heidiPassword} onChange={e => setHeidiPassword(e.target.value)}
                    placeholder="••••••••" type="password"
                    style={{
                      width: "100%", padding: "11px 14px", border: `1.5px solid ${GRAY_BORDER}`,
                      borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box",
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={e => e.target.style.borderColor = "#1B3B8A"}
                    onBlur={e => e.target.style.borderColor = GRAY_BORDER}
                  />
                </div>
                <div style={{ textAlign: "right", marginBottom: 20 }}>
                  <a href="#" style={{ fontSize: 12, color: "#1B3B8A", textDecoration: "none" }}>Forgot password?</a>
                </div>

                <button onClick={handleHeidiLogin} style={{
                  width: "100%", padding: "12px", borderRadius: 8,
                  background: "#1B3B8A", color: "white", border: "none",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  transition: "opacity 0.15s",
                }}
                  onMouseEnter={e => e.target.style.opacity = "0.9"}
                  onMouseLeave={e => e.target.style.opacity = "1"}
                >Sign in to Heidi</button>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <span style={{ fontSize: 12, color: TEXT_LIGHT }}>
                    Don't have a Heidi account?{" "}
                    <a href="#" style={{ color: "#1B3B8A", textDecoration: "none", fontWeight: 600 }}>Sign up free</a>
                  </span>
                </div>
              </>
            )}

            {/* Step: Authorise */}
            {heidiOAuth === "authorise" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16,
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${TEAL}, #0099FF)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 800 }}>C</div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GRAY_BORDER} strokeWidth="2"><path d="M8 7h12M8 12h12M8 17h12" strokeLinecap="round"/></svg>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#1B3B8A", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 800 }}>H</div>
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>Authorise Coviu</h2>
                  <p style={{ fontSize: 13, color: TEXT_MED, margin: 0 }}>
                    Coviu is requesting access to your Heidi Health account
                  </p>
                  <p style={{ fontSize: 12, color: TEXT_LIGHT, margin: "4px 0 0" }}>{heidiEmail || "you@clinic.com"}</p>
                </div>

                <div style={{
                  background: "#f9fafb", borderRadius: 10, padding: "16px 18px",
                  border: `1px solid #eee`, marginBottom: 20,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_DARK, marginBottom: 10 }}>Coviu will be able to:</div>
                  {[
                    "Stream audio from your Coviu consults to Heidi",
                    "Generate clinical notes using your Heidi templates",
                    "Access your specialty and note settings",
                  ].map((perm, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13, color: TEXT_MED }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                      {perm}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handleHeidiAuthorise} style={{
                    flex: 1, padding: "12px", borderRadius: 8,
                    background: "#1B3B8A", color: "white", border: "none",
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                  }}>Authorise</button>
                  <button onClick={() => setHeidiOAuth(null)} style={{
                    flex: 1, padding: "12px", borderRadius: 8,
                    background: "transparent", color: TEXT_MED,
                    border: `1.5px solid ${GRAY_BORDER}`,
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                  }}>Cancel</button>
                </div>

                <div style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: TEXT_LIGHT }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle", marginRight: 4 }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  Secure connection · Your credentials are not shared with Coviu
                </div>
              </>
            )}

            {/* Step: Connecting */}
            {heidiOAuth === "connecting" && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  border: `3px solid #e5e7eb`, borderTopColor: "#1B3B8A",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 20px",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>Connecting to Heidi...</h2>
                <p style={{ fontSize: 13, color: TEXT_MED, margin: 0 }}>Setting up your integration. This only takes a moment.</p>
              </div>
            )}

            {/* Step: Success */}
            {heidiOAuth === "success" && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "#f0fdf4",
                  border: "2px solid #bbf7d0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>Heidi connected!</h2>
                <p style={{ fontSize: 13, color: TEXT_MED, margin: "0 0 4px" }}>Your AI scribe is ready to go. Notes will be generated automatically during your Coviu consults.</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${TEAL}, #0099FF)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 800 }}>C</div>
                  <span style={{ fontSize: 16, color: "#16a34a" }}>⟷</span>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: "#1B3B8A", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 800 }}>H</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* Module content for each item */
  const renderModule = () => {
    if (!activeModule) return null;
    const moduleStyle = {
      marginTop: 12, padding: "20px", background: "white", borderRadius: 12,
      border: `1.5px solid ${TEAL}33`, animation: "fadeSlideIn 0.2s ease-out",
    };
    switch (activeModule) {
      case "scribe":
        if (scribeJustConnected) {
          return (
            <div style={moduleStyle}>
              <style>{`@keyframes pulseChecklistRing { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.06); } }`}</style>
              {/* Connected header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_DARK }}>{scribeInfo.name} connected!</div>
                  <div style={{ fontSize: 12, color: TEXT_LIGHT }}>Your AI scribe is ready — here's how to use it in a call</div>
                </div>
              </div>

              {/* Mini toolbar preview */}
              <div style={{
                background: "#f9fafb", borderRadius: 10, border: `1px solid #e5e7eb`,
                padding: "14px 16px", marginBottom: 16,
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_LIGHT, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  During a call, look for this in the toolbar:
                </div>
                <div style={{
                  background: "white", borderRadius: 8, border: `1px solid #e5e7eb`,
                  padding: "10px 14px",
                  display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6,
                }}>
                  {["⚙️", "💬", "📝", "👥"].map((icon, i) => (
                    <button key={i} style={{
                      width: 34, height: 34, borderRadius: 8,
                      border: `1px solid ${GRAY_BORDER}`, background: "white",
                      cursor: "default", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, color: TEXT_LIGHT, opacity: 0.5,
                    }}>{icon}</button>
                  ))}
                  <button style={{
                    width: 36, height: 34, borderRadius: 8,
                    border: `1px solid ${GRAY_BORDER}`, background: "white",
                    cursor: "default", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700, color: TEXT_LIGHT, opacity: 0.5,
                  }}>REC</button>
                  {/* Heidi button with pulse */}
                  <div style={{ position: "relative" }}>
                    <div style={{
                      position: "absolute", inset: -5, borderRadius: 12,
                      border: `2px solid ${scribeInfo.iconBg}`,
                      animation: "pulseChecklistRing 2s ease-in-out infinite",
                    }} />
                    <button style={{
                      width: 36, height: 34, borderRadius: 8, border: "none",
                      background: scribeInfo.iconBg, cursor: "default",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                    }}>
                      <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
                        <path d="M20 8c-3.5 0-6 2-6 5 0 2.5 1.5 4 4 5-2.5 1-4 2.5-4 5 0 3 2.5 5 6 5s6-2 6-5c0-2.5-1.5-4-4-5 2.5-1 4-2.5 4-5 0-3-2.5-5-6-5z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 20c0-3.5 2-6 5-6 2.5 0 4 1.5 5 4-1-2.5-2.5-4-5-4-3 0-5 2.5-5 6s2 6 5 6c2.5 0 4-1.5 5-4 1 2.5 2.5 4 5 4 3 0 5-2.5 5-6s-2-6-5-6c-2.5 0-4 1.5-5 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <div style={{
                      position: "absolute", top: -3, right: -3, width: 8, height: 8,
                      borderRadius: "50%", background: "#16a34a", border: "2px solid white",
                    }} />
                  </div>
                </div>
                <p style={{ fontSize: 12, color: TEXT_MED, margin: "10px 0 0", lineHeight: 1.5 }}>
                  Click the <strong style={{ color: scribeInfo.iconBg }}>{scribeInfo.name}</strong> button during any call to start your AI scribe. It'll listen, transcribe, and generate notes automatically.
                </p>
              </div>

              {/* Test call CTA */}
              <div style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK, marginBottom: 6 }}>
                  Try it now — send a test call invite
                </div>
                <div style={{ display: "flex", gap: 8, maxWidth: 440 }}>
                  <input
                    type="email"
                    placeholder="colleague@clinic.com"
                    value={testCallEmail}
                    onChange={e => setTestCallEmail(e.target.value)}
                    style={{
                      flex: 1, padding: "10px 12px", border: `1.5px solid ${GRAY_BORDER}`,
                      borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box",
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={e => e.target.style.borderColor = TEAL}
                    onBlur={e => e.target.style.borderColor = GRAY_BORDER}
                  />
                  <button
                    onClick={() => { setActiveModule(null); if (onStartTestCall) onStartTestCall("notes"); }}
                    style={{
                      padding: "10px 20px", borderRadius: 8, border: "none",
                      background: TEAL, color: "white",
                      fontSize: 13, fontWeight: 600, cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Send invite →
                  </button>
                </div>
                <button onClick={() => setActiveModule(null)} style={{
                  background: "none", border: "none", color: TEXT_LIGHT,
                  fontSize: 12, cursor: "pointer", padding: 0, marginTop: 10,
                }}>Skip for now</button>
              </div>
            </div>
          );
        }
        return (
          <div style={moduleStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: scribeInfo.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 16, fontWeight: 800 }}>{scribeInfo.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_DARK }}>Connect {scribeInfo.name}</div>
                <div style={{ fontSize: 12, color: TEXT_LIGHT }}>{scribeInfo.desc}</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: TEXT_MED, lineHeight: 1.6, marginBottom: 16 }}>
              Coviu will stream high-fidelity audio directly to {scribeInfo.name} during your consults. Your templates, specialty settings, and PMS routing stay exactly as they are.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setHeidiOAuth("login")} style={{
                padding: "10px 24px", borderRadius: 8, background: scribeInfo.iconBg, color: "white",
                border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{scribeInfo.icon}</div>
                Sign in with {scribeInfo.name} →
              </button>
              <button onClick={() => setActiveModule(null)} style={{
                padding: "10px 20px", borderRadius: 8, background: "transparent",
                border: `1px solid ${GRAY_BORDER}`, color: TEXT_MED,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>Later</button>
            </div>
          </div>
        );

      case "pms":
        return pmsInfo ? (
          <div style={moduleStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: pmsInfo.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 16, fontWeight: 800 }}>{pmsInfo.icon}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_DARK }}>Connect {pmsInfo.name}</div>
                <div style={{ fontSize: 12, color: TEXT_LIGHT }}>{pmsInfo.desc}</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: TEXT_MED, lineHeight: 1.6, marginBottom: 12 }}>
              Link {pmsInfo.name} to sync patient information and streamline your booking workflow.
            </p>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: TEXT_MED, display: "block", marginBottom: 4 }}>{pmsInfo.name} API key</label>
              <input placeholder={`Paste your ${pmsInfo.name} API key`} style={{
                width: "100%", padding: "10px 12px", border: `1px solid ${GRAY_BORDER}`,
                borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box",
                fontFamily: "'Inter', -apple-system, sans-serif",
              }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => markDone("pms")} style={{
                padding: "10px 24px", borderRadius: 8, background: TEAL, color: "white",
                border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Connect {pmsInfo.name}</button>
              <button onClick={() => setActiveModule(null)} style={{
                padding: "10px 20px", borderRadius: 8, background: "transparent",
                border: `1px solid ${GRAY_BORDER}`, color: TEXT_MED,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>Later</button>
            </div>
          </div>
        ) : null;

      case "team":
        return (
          <div style={moduleStyle}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_DARK, marginBottom: 4 }}>Invite team members</div>
            <p style={{ fontSize: 13, color: TEXT_MED, lineHeight: 1.6, marginBottom: 12 }}>
              Add email addresses to send invitations. Your plan includes up to 20 free admin seats.
            </p>
            {teamMembers.map((m, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", background: "#f0fdf4", borderRadius: 6, marginBottom: 6,
                fontSize: 13, color: TEXT_DARK, border: "1px solid #bbf7d0",
              }}>
                <span>{m}</span>
                <span style={{ color: "#16a34a", fontSize: 12, fontWeight: 600 }}>✓ Invited</span>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input value={teamEmail} onChange={e => setTeamEmail(e.target.value)}
                placeholder="colleague@clinic.com" style={{
                  flex: 1, padding: "10px 12px", border: `1px solid ${GRAY_BORDER}`,
                  borderRadius: 6, fontSize: 13, outline: "none",
                  fontFamily: "'Inter', -apple-system, sans-serif",
                }} />
              <button onClick={() => { if (teamEmail) { setTeamMembers([...teamMembers, teamEmail]); setTeamEmail(""); } }} style={{
                padding: "10px 16px", borderRadius: 6, background: TEAL, color: "white",
                border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Send invite</button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => markDone("team")} style={{
                padding: "10px 20px", borderRadius: 8, background: "transparent",
                border: `1px solid ${GRAY_BORDER}`, color: TEXT_MED,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>Done</button>
            </div>
          </div>
        );

      case "call":
        return (
          <div style={moduleStyle}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TEXT_DARK, marginBottom: 4 }}>Start a test call</div>
            <p style={{ fontSize: 13, color: TEXT_MED, lineHeight: 1.6, marginBottom: 16 }}>
              Try a quick test consultation to see how Coviu works. You can call yourself or invite a colleague.
            </p>
            <div style={{
              padding: "14px 16px", background: "#f9fafb", borderRadius: 10, border: `1px solid #eee`,
              display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
            }}>
              <span style={{ fontSize: 11, color: TEXT_LIGHT, flex: 1 }}>https://app.coviu.com/t/abc-clinic/join/reception</span>
              <button onClick={() => {}} style={{
                padding: "6px 14px", borderRadius: 6, background: "#f3f4f6",
                border: `1px solid ${GRAY_BORDER}`, color: TEXT_MED,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>Copy link</button>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => markDone("call")} style={{
                padding: "10px 24px", borderRadius: 8, background: TEAL, color: "white",
                border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Start test call →</button>
              <button onClick={() => setActiveModule(null)} style={{
                padding: "10px 20px", borderRadius: 8, background: "transparent",
                border: `1px solid ${GRAY_BORDER}`, color: TEXT_MED,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}>Later</button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <CoviuDashboardShell activeItem="Clinic" firstName={firstName}>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {/* Heidi OAuth popup */}
      {renderHeidiOAuth()}
      {/* Overlay */}
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          background: "white", borderRadius: 16, width: 580, maxHeight: "85vh",
          overflow: "auto", padding: "44px 40px", boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%", background: TEAL,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 16,
            }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>Almost there!</h1>
            <p style={{ fontSize: 15, color: TEXT_MED, margin: "0 0 4px" }}>Complete your setup to get the most out of Coviu.</p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 12, fontWeight: 600, color: TEAL, marginTop: 8,
            }}>
              <div style={{ width: 120, height: 5, borderRadius: 3, background: "#e5e7eb", overflow: "hidden" }}>
                <div style={{ width: `${(completedCount / items.length) * 100}%`, height: "100%", borderRadius: 3, background: TEAL, transition: "width 0.3s" }} />
              </div>
              {completedCount}/{items.length} complete
            </div>
          </div>

          {/* Checklist */}
          <div style={{ marginBottom: 24 }}>
            {items.map((item, i) => {
              const isDone = completed[item.key];
              const isActive = activeModule === item.key;
              return (
                <div key={item.key}>
                  <div
                    onClick={() => {
                      if (!isDone) setActiveModule(isActive ? null : item.key);
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 16px", borderRadius: 10,
                      border: isActive ? `1.5px solid ${TEAL}44` : "1.5px solid transparent",
                      background: isActive ? `${TEAL}06` : isDone ? "#fafafa" : "transparent",
                      cursor: isDone ? "default" : "pointer",
                      transition: "all 0.15s", marginBottom: 4,
                    }}
                    onMouseEnter={e => { if (!isDone && !isActive) e.currentTarget.style.background = "#f9fafb"; }}
                    onMouseLeave={e => { if (!isDone && !isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: isDone ? TEAL : item.iconBg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: isDone ? 15 : 14, fontWeight: 800, color: "white",
                      transition: "all 0.2s",
                    }}>
                      {isDone ? "✓" : item.icon}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 14, fontWeight: 600,
                        color: isDone ? TEXT_LIGHT : TEXT_DARK,
                        textDecoration: isDone ? "line-through" : "none",
                      }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: TEXT_LIGHT, marginTop: 1 }}>{item.desc}</div>
                    </div>

                    {/* CTA */}
                    {!isDone && (
                      <div style={{
                        padding: "6px 14px", borderRadius: 6,
                        background: isActive ? `${TEAL}15` : TEAL,
                        color: isActive ? TEAL : "white",
                        fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
                        border: isActive ? `1px solid ${TEAL}33` : "none",
                      }}>{isActive ? "Setting up..." : "Connect →"}</div>
                    )}
                    {isDone && item.key !== "account" && (
                      <div style={{
                        padding: "6px 14px", borderRadius: 6,
                        background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0",
                        fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
                      }}>Connected ✓</div>
                    )}
                  </div>

                  {/* Inline module */}
                  {isActive && (
                    <div style={{ marginLeft: 46, marginBottom: 8 }}>
                      {renderModule()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* What's next info */}
          <div style={{
            background: "#f9fafb", borderRadius: 10, padding: "16px 20px",
            border: `1px solid #eee`, marginBottom: 24,
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: TEXT_DARK, marginBottom: 8 }}>What's next:</div>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: TEXT_MED, lineHeight: 1.7 }}>
              <li>Invited team members will receive email instructions to join</li>
              <li>Contact Support to redeem your free admin staff seats</li>
              <li>You're now trialling the Clinic plan – enjoy full Clinic visibility, phone and video in one place, instant notes with AI scribe, assessments delivered in-platform, and more!</li>
            </ul>
          </div>

          {/* Continue button */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onNext} style={{
              padding: "14px 36px", background: TEAL, color: "white", border: "none",
              borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
              letterSpacing: 1, textTransform: "uppercase",
            }}>CONTINUE TO YOUR CLINIC</button>
          </div>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <span style={{ fontSize: 12, color: TEXT_LIGHT }}>You can complete these steps later from your dashboard</span>
          </div>
        </div>
      </div>
    </CoviuDashboardShell>
  );
}

/* ─── Screen 9: Integration 1 - Integrations Hub ─── */
function IntegrationsHubScreen({ onNext, selectedScribe, selectedPms, userEmail, onStartTestCall, firstName }) {
  const scribeInfo = SCRIBE_OPTIONS[selectedScribe];
  const pmsInfo = PMS_OPTIONS[selectedPms];

  /* OAuth flow state: null | "login" | "authorise" | "connecting" | "success" | "preview" */
  const [oauthState, setOauthState] = useState(null);
  const [oauthEmail, setOauthEmail] = useState(userEmail || "");
  const [oauthPassword, setOauthPassword] = useState("");
  const [oauthError, setOauthError] = useState("");
  const [scribeConnected, setScribeConnected] = useState(false);
  const [testCallEmail, setTestCallEmail] = useState(userEmail || "");

  const activeScribe = scribeInfo || SCRIBE_OPTIONS.heidi;

  const handleLogin = () => {
    if (!oauthEmail || !oauthPassword) { setOauthError("Please enter your email and password"); return; }
    setOauthError("");
    setOauthState("authorise");
  };

  const handleAuthorise = () => {
    setOauthState("connecting");
    setTimeout(() => {
      setOauthState("success");
      setTimeout(() => {
        setScribeConnected(true);
        setOauthState("preview");
      }, 1500);
    }, 1800);
  };

  // Only show the selected scribe as recommended (+ Coviu Assist as included), hide others
  const scribeIntegrations = [];
  if (scribeInfo && selectedScribe !== "coviu") {
    scribeIntegrations.push({ ...scribeInfo, status: scribeConnected ? "connected" : "recommended", clickable: !scribeConnected });
  }
  // Only show Coviu Assist if no scribe was selected
  if (!scribeInfo) {
    scribeIntegrations.unshift(
      { ...SCRIBE_OPTIONS.heidi, status: scribeConnected ? "connected" : "available", clickable: !scribeConnected },
      { ...SCRIBE_OPTIONS.lyrebird, status: "available", clickable: false },
    );
    scribeIntegrations.push({ name: "Coviu Assist", icon: "C", iconBg: TEAL, desc: "Built-in AI notes — zero setup, included free", status: "included", clickable: false });
  }

  // Only show the selected PMS as recommended, hide others
  const pmsIntegrations = [];
  if (pmsInfo) {
    pmsIntegrations.push({ ...pmsInfo, status: "recommended", clickable: false });
  } else {
    // No PMS selected — show all
    Object.values(PMS_OPTIONS).forEach(p => {
      pmsIntegrations.push({ ...p, status: "available", clickable: false });
    });
  }

  const otherIntegrations = [
    { name: "Coviu Phone", icon: "📞", iconBg: "#34495e", desc: "Dedicated clinic number for phone consultations", status: "available", clickable: false },
    { name: "Stripe Payments", icon: "💳", iconBg: "#635bff", desc: "Take payments during or after consultations", status: "available", clickable: false },
  ];

  const bannerText = [scribeInfo?.name, pmsInfo?.name].filter(Boolean).join(" and ");
  const bannerSuffix = bannerText ? `You selected ${bannerText} during onboarding. Connect ${bannerText.includes(" and ") ? "them" : "it"} now to get started.` : "Connect your tools to get started.";

  /* ─── OAuth Popup ─── */
  const renderOAuthPopup = () => {
    if (!oauthState) return null;
    return (
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          background: "white", borderRadius: 16, width: 420,
          boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
          overflow: "hidden",
          animation: "fadeSlideIn 0.2s ease-out",
        }}>
          {/* Popup header */}
          <div style={{
            background: activeScribe.iconBg, padding: "20px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 800, color: "white",
              }}>{activeScribe.icon}</div>
              <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>{activeScribe.name}</span>
            </div>
            <button onClick={() => setOauthState(null)} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.5)",
              fontSize: 18, cursor: "pointer", padding: 0,
            }}>✕</button>
          </div>

          <div style={{ padding: "28px" }}>
            {/* Step: Login */}
            {oauthState === "login" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: TEXT_LIGHT, letterSpacing: 0.5, marginBottom: 6, textTransform: "uppercase" }}>
                    Sign in to connect
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: TEXT_DARK, margin: "0 0 4px" }}>Log in to {activeScribe.name}</h2>
                  <p style={{ fontSize: 13, color: TEXT_MED, margin: 0 }}>
                    Coviu needs permission to connect to your {activeScribe.name} account.
                  </p>
                </div>

                {oauthError && (
                  <div style={{
                    padding: "8px 12px", background: "#fef2f2", border: "1px solid #fecaca",
                    borderRadius: 8, fontSize: 12, color: "#dc2626", marginBottom: 12,
                  }}>{oauthError}</div>
                )}

                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MED, display: "block", marginBottom: 4 }}>Email address</label>
                  <input value={oauthEmail} onChange={e => setOauthEmail(e.target.value)}
                    placeholder="you@clinic.com" type="email"
                    style={{
                      width: "100%", padding: "11px 14px", border: `1.5px solid ${GRAY_BORDER}`,
                      borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box",
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={e => e.target.style.borderColor = activeScribe.iconBg}
                    onBlur={e => e.target.style.borderColor = GRAY_BORDER}
                  />
                </div>
                <div style={{ marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: TEXT_MED, display: "block", marginBottom: 4 }}>Password</label>
                  <input value={oauthPassword} onChange={e => setOauthPassword(e.target.value)}
                    placeholder="••••••••" type="password"
                    style={{
                      width: "100%", padding: "11px 14px", border: `1.5px solid ${GRAY_BORDER}`,
                      borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box",
                      fontFamily: "'Inter', -apple-system, sans-serif",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={e => e.target.style.borderColor = activeScribe.iconBg}
                    onBlur={e => e.target.style.borderColor = GRAY_BORDER}
                  />
                </div>
                <div style={{ textAlign: "right", marginBottom: 20 }}>
                  <a href="#" style={{ fontSize: 12, color: activeScribe.iconBg, textDecoration: "none" }}>Forgot password?</a>
                </div>

                <button onClick={handleLogin} style={{
                  width: "100%", padding: "12px", borderRadius: 8,
                  background: activeScribe.iconBg, color: "white", border: "none",
                  fontSize: 14, fontWeight: 700, cursor: "pointer",
                  transition: "opacity 0.15s",
                }}
                  onMouseEnter={e => e.target.style.opacity = "0.9"}
                  onMouseLeave={e => e.target.style.opacity = "1"}
                >Sign in to {activeScribe.name}</button>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <span style={{ fontSize: 12, color: TEXT_LIGHT }}>
                    Don't have a {activeScribe.name} account?{" "}
                    <a href="#" style={{ color: activeScribe.iconBg, textDecoration: "none", fontWeight: 600 }}>Sign up free</a>
                  </span>
                </div>
              </>
            )}

            {/* Step: Authorise */}
            {oauthState === "authorise" && (
              <>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16,
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${TEAL}, #0099FF)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 800 }}>C</div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GRAY_BORDER} strokeWidth="2"><path d="M8 7h12M8 12h12M8 17h12" strokeLinecap="round"/></svg>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: activeScribe.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontWeight: 800 }}>{activeScribe.icon}</div>
                  </div>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>Authorise Coviu</h2>
                  <p style={{ fontSize: 13, color: TEXT_MED, margin: 0 }}>
                    Coviu is requesting access to your {activeScribe.name} account
                  </p>
                  <p style={{ fontSize: 12, color: TEXT_LIGHT, margin: "4px 0 0" }}>{oauthEmail || "you@clinic.com"}</p>
                </div>

                <div style={{
                  background: "#f9fafb", borderRadius: 10, padding: "16px 18px",
                  border: "1px solid #eee", marginBottom: 20,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEXT_DARK, marginBottom: 10 }}>Coviu will be able to:</div>
                  {[
                    `Stream audio from your Coviu consults to ${activeScribe.name}`,
                    `Generate clinical notes using your ${activeScribe.name} templates`,
                    "Access your specialty and note settings",
                  ].map((perm, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, fontSize: 13, color: TEXT_MED }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                      {perm}
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handleAuthorise} style={{
                    flex: 1, padding: "12px", borderRadius: 8,
                    background: activeScribe.iconBg, color: "white", border: "none",
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                  }}>Authorise</button>
                  <button onClick={() => setOauthState(null)} style={{
                    flex: 1, padding: "12px", borderRadius: 8,
                    background: "transparent", color: TEXT_MED,
                    border: `1.5px solid ${GRAY_BORDER}`,
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                  }}>Cancel</button>
                </div>

                <div style={{ textAlign: "center", marginTop: 14, fontSize: 11, color: TEXT_LIGHT }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: "middle", marginRight: 4 }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  Secure connection · Your credentials are not shared with Coviu
                </div>
              </>
            )}

            {/* Step: Connecting */}
            {oauthState === "connecting" && (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  border: "3px solid #e5e7eb", borderTopColor: activeScribe.iconBg,
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 20px",
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>Connecting to {activeScribe.name}...</h2>
                <p style={{ fontSize: 13, color: TEXT_MED, margin: 0 }}>Setting up your integration. This only takes a moment.</p>
              </div>
            )}

            {/* Step: Success */}
            {oauthState === "success" && (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "#f0fdf4",
                  border: "2px solid #bbf7d0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>{activeScribe.name} connected!</h2>
                <p style={{ fontSize: 13, color: TEXT_MED, margin: "0 0 4px" }}>Your AI scribe is ready to go. Notes will be generated automatically during your Coviu consults.</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${TEAL}, #0099FF)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 800 }}>C</div>
                  <span style={{ fontSize: 16, color: "#16a34a" }}>⟷</span>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: activeScribe.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 10, fontWeight: 800 }}>{activeScribe.icon}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ─── In-Call Preview Overlay ─── */
  const renderPreviewOverlay = () => {
    if (oauthState !== "preview") return null;
    return (
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}>
        <div style={{
          background: "white", borderRadius: 20, width: 720, maxWidth: "95%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
          overflow: "hidden",
          animation: "fadeSlideIn 0.3s ease-out",
        }}>
          {/* Header */}
          <div style={{
            padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between",
            borderBottom: "1px solid #e5e7eb",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: 0 }}>{activeScribe.name} is ready to go</h2>
              </div>
              <p style={{ fontSize: 13, color: TEXT_MED, margin: 0 }}>Here's what it looks like during a Coviu consultation</p>
            </div>
            <button onClick={() => setOauthState(null)} style={{
              background: "none", border: "none", color: TEXT_LIGHT,
              fontSize: 20, cursor: "pointer", padding: "4px 8px",
            }}>✕</button>
          </div>

          {/* In-call mockup */}
          <div style={{ padding: "0", position: "relative" }}>
            {/* Video area */}
            <div style={{ background: "#2d3748", position: "relative", minHeight: 340 }}>
              {/* Timer */}
              <div style={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
                <span style={{ background: "rgba(0,0,0,0.6)", color: "white", fontSize: 12, padding: "4px 10px", borderRadius: 6, fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>00:00</span>
              </div>

              {/* Avatar center */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 280, paddingTop: 20 }}>
                {/* Concentric circles */}
                <div style={{ position: "relative", width: 180, height: 180 }}>
                  <div style={{ position: "absolute", inset: -30, borderRadius: "50%", border: `1.5px dashed ${TEAL}33` }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2.5px solid ${TEAL}` }} />
                  {/* Person silhouette */}
                  <div style={{
                    width: 180, height: 180, borderRadius: "50%", background: "#4a5568",
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                  }}>
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="38" r="22" fill="#9ca3af" />
                      <ellipse cx="50" cy="90" rx="35" ry="28" fill="#9ca3af" />
                    </svg>
                  </div>
                  {/* Camera off badge */}
                  <div style={{
                    position: "absolute", bottom: 8, right: 8, width: 36, height: 36,
                    borderRadius: "50%", background: TEAL,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.5 9.4l-2-2-7.1-7.1M2 2l20 20" /><path d="M15 11v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h1" /><path d="M23 7l-4 2.5v5L23 17V7z" />
                    </svg>
                  </div>
                </div>
                <div style={{
                  marginTop: 12, background: "rgba(0,0,0,0.5)", padding: "6px 16px",
                  borderRadius: 6, fontSize: 13, color: "rgba(255,255,255,0.8)",
                }}>
                  You have turned off your camera & microphone
                </div>
              </div>

              {/* Name badge */}
              <div style={{
                position: "absolute", bottom: 14, left: 14,
                background: TEAL, padding: "6px 14px", borderRadius: 6,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "white", letterSpacing: 0.3 }}>{(firstName || "DOREEN").toUpperCase()}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/>
                  <path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .76-.13 1.49-.35 2.17"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </div>
            </div>

            {/* Toolbar */}
            <div style={{
              background: "white", padding: "12px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderTop: "1px solid #e5e7eb",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Settings */}
                <button style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${GRAY_BORDER}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18 }}>⚙️</span>
                </button>
                {/* End call */}
                <button style={{ width: 40, height: 40, borderRadius: 10, border: "none", background: "#e74c3c", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 16, color: "white" }}>📴</span>
                </button>
                {/* Mic */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button style={{ width: 40, height: 40, borderRadius: "10px 0 0 10px", border: `1px solid #e74c3c`, borderRight: "none", background: "#fef2f2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 16 }}>🎙️</span>
                  </button>
                  <button style={{ width: 24, height: 40, borderRadius: "0 10px 10px 0", border: `1px solid #e74c3c`, background: "#fef2f2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#e74c3c" }}>▾</button>
                </div>
                {/* Camera */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button style={{ width: 40, height: 40, borderRadius: "10px 0 0 10px", border: `1px solid #e74c3c`, borderRight: "none", background: "#fef2f2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 16 }}>📷</span>
                  </button>
                  <button style={{ width: 24, height: 40, borderRadius: "0 10px 10px 0", border: `1px solid #e74c3c`, background: "#fef2f2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#e74c3c" }}>▾</button>
                </div>
                {/* Raise hand */}
                <button style={{ width: 40, height: 40, borderRadius: 10, border: `1px solid ${GRAY_BORDER}`, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 18 }}>✋</span>
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {/* Right side toolbar icons */}
                {["HELP ❓", "◆", "💬", "📝", "📊", "👥"].map((icon, i) => (
                  <button key={i} style={{
                    width: i === 4 ? 42 : 38, height: 38, borderRadius: 10,
                    border: i === 4 ? "none" : `1px solid ${GRAY_BORDER}`,
                    background: i === 4 ? "#7c3aed" : "white",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: i === 0 ? 10 : 14, color: i === 4 ? "white" : TEXT_MED,
                    fontWeight: i === 0 ? 600 : 400,
                  }}>{icon}</button>
                ))}
                {/* REC button */}
                <button style={{
                  width: 42, height: 38, borderRadius: 10,
                  border: `1px solid ${GRAY_BORDER}`, background: "white",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: TEXT_MED, letterSpacing: 0.3,
                }}>REC</button>
                {/* Heidi AI Scribe button */}
                <div style={{ position: "relative" }}>
                  {/* Pulse ring */}
                  <div style={{
                    position: "absolute", inset: -6, borderRadius: 14,
                    border: `2.5px solid ${activeScribe.iconBg}`,
                    animation: "pulseRing 2s ease-in-out infinite",
                  }} />
                  <button style={{
                    width: 42, height: 38, borderRadius: 10, border: "none",
                    background: activeScribe.iconBg, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    {/* Heidi logo — stylised knot/clover */}
                    <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                      <path d="M20 8c-3.5 0-6 2-6 5 0 2.5 1.5 4 4 5-2.5 1-4 2.5-4 5 0 3 2.5 5 6 5s6-2 6-5c0-2.5-1.5-4-4-5 2.5-1 4-2.5 4-5 0-3-2.5-5-6-5z" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 20c0-3.5 2-6 5-6 2.5 0 4 1.5 5 4-1-2.5-2.5-4-5-4-3 0-5 2.5-5 6s2 6 5 6c2.5 0 4-1.5 5-4 1 2.5 2.5 4 5 4 3 0 5-2.5 5-6s-2-6-5-6c-2.5 0-4 1.5-5 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {/* Green active dot */}
                  <div style={{
                    position: "absolute", top: -3, right: -3, width: 10, height: 10,
                    borderRadius: "50%", background: "#16a34a", border: "2px solid white",
                  }} />
                </div>
              </div>
            </div>

            {/* Annotation callout pointing to Heidi button */}
            <div style={{
              position: "absolute", bottom: 70, right: 20,
              background: activeScribe.iconBg, color: "white",
              padding: "12px 18px", borderRadius: 12,
              fontSize: 13, fontWeight: 600, lineHeight: 1.5,
              maxWidth: 260, boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              animation: "fadeSlideIn 0.4s ease-out 0.2s both",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 6, background: "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800,
                }}>{activeScribe.icon}</div>
                <span>{activeScribe.name} lives here</span>
              </div>
              <p style={{ fontSize: 11, fontWeight: 400, margin: 0, opacity: 0.85 }}>
                Click the <strong>{activeScribe.name}</strong> button during any call to start your AI scribe. It'll listen, transcribe, and generate notes automatically.
              </p>
              {/* Arrow */}
              <div style={{
                position: "absolute", bottom: -8, right: 30,
                width: 0, height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: `8px solid ${activeScribe.iconBg}`,
              }} />
            </div>
          </div>

          {/* CTA section */}
          <div style={{
            padding: "24px 28px", background: "#f9fafb",
            borderTop: "1px solid #e5e7eb",
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>
              Try it now — start a test call with {activeScribe.name}
            </h3>
            <p style={{ fontSize: 13, color: TEXT_MED, margin: "0 0 16px", lineHeight: 1.5 }}>
              Enter an email below and we'll send a link to join a test video call. You'll see {activeScribe.name} in action.
            </p>
            <div style={{ display: "flex", gap: 10, maxWidth: 460 }}>
              <input
                type="email"
                placeholder="colleague@clinic.com"
                value={testCallEmail}
                onChange={e => setTestCallEmail(e.target.value)}
                style={{
                  flex: 1, padding: "11px 14px", border: `1.5px solid ${GRAY_BORDER}`,
                  borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box",
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => e.target.style.borderColor = TEAL}
                onBlur={e => e.target.style.borderColor = GRAY_BORDER}
              />
              <button
                onClick={() => { setOauthState(null); if (onStartTestCall) onStartTestCall("notes"); }}
                style={{
                  padding: "11px 24px", borderRadius: 8, border: "none",
                  background: TEAL, color: "white",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                Send invite & start call →
              </button>
            </div>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setOauthState(null)} style={{
                background: "none", border: "none", color: TEXT_LIGHT,
                fontSize: 13, cursor: "pointer", padding: 0,
              }}>Skip for now</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      recommended: { bg: `${TEAL}15`, color: TEAL, border: `1px solid ${TEAL}33`, text: "Recommended for you" },
      available: { bg: "#f3f4f6", color: TEXT_LIGHT, border: `1px solid ${GRAY_BORDER}`, text: "Available" },
      included: { bg: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", text: "Included" },
      connected: { bg: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", text: "Connected ✓" },
    };
    const s = styles[status] || styles.available;
    return (
      <span style={{
        padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 700,
        background: s.bg, color: s.color, border: s.border, whiteSpace: "nowrap",
      }}>{s.text}</span>
    );
  };

  const IntegrationCard = ({ item, onConnect }) => (
    <div
      onClick={item.clickable ? onConnect : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "16px 20px", background: "white", borderRadius: 12,
        border: item.status === "recommended" ? `1.5px solid ${TEAL}44` : `1px solid ${GRAY_BORDER}`,
        cursor: item.clickable ? "pointer" : "default",
        transition: "all 0.15s",
      }}
      onMouseEnter={e => { if (item.clickable) { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.boxShadow = `0 4px 16px ${TEAL}18`; }}}
      onMouseLeave={e => { if (item.clickable) { e.currentTarget.style.borderColor = item.status === "recommended" ? `${TEAL}44` : GRAY_BORDER; e.currentTarget.style.boxShadow = "none"; }}}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10, background: item.iconBg || "#e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: item.icon.length > 1 ? 18 : 16, fontWeight: 800, color: "white", flexShrink: 0,
      }}>{item.icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK, marginBottom: 2 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: TEXT_LIGHT, lineHeight: 1.4 }}>{item.desc}</div>
      </div>
      <StatusBadge status={item.status} />
      {item.clickable && (
        <div style={{
          padding: "6px 16px", borderRadius: 8, background: TEAL, color: "white",
          fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", marginLeft: 8,
        }}>Connect →</div>
      )}
    </div>
  );

  return (
    <CoviuDashboardShell activeItem="Apps" firstName={firstName}>
      <style>{`@keyframes fadeSlideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulseRing { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.06); } }`}</style>
      {renderOAuthPopup()}
      {renderPreviewOverlay()}
      <div style={{ padding: "32px clamp(16px, 3vw, 40px) 100px", background: "#f9fafb", minHeight: "100vh" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: TEXT_DARK, margin: "0 0 6px" }}>Integrations</h1>
            <p style={{ fontSize: 14, color: TEXT_MED, margin: 0, lineHeight: 1.5 }}>
              Connect your tools to Coviu. Plug in your AI scribe, PMS, and more — everything works together.
            </p>
          </div>
          <div style={{
            padding: "8px 20px", borderRadius: 8, background: TEAL, color: "white",
            fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
          }}>🔍 FIND MORE APPS</div>
        </div>

        {/* Setup prompt banner */}
        <div style={{
          background: `linear-gradient(135deg, ${TEAL}10, #e0f2fe44)`,
          border: `1.5px solid ${TEAL}30`, borderRadius: 14,
          padding: "18px 24px", marginBottom: 32,
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: TEAL,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>Complete your setup</div>
            <div style={{ fontSize: 13, color: TEXT_MED }}>{bannerSuffix}</div>
          </div>
          <div style={{ fontSize: 12, color: TEXT_LIGHT, cursor: "pointer" }}>Dismiss ×</div>
        </div>

        {/* AI Scribes section */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: TEXT_DARK, margin: 0 }}>AI Scribes</h2>
            <span style={{
              padding: "2px 10px", borderRadius: 100, background: "#f3f4f6",
              fontSize: 11, fontWeight: 600, color: TEXT_LIGHT,
            }}>Bring your own or use Coviu Assist</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {scribeIntegrations.map((item, i) => (
              <IntegrationCard key={i} item={item} onConnect={() => setOauthState("login")} />
            ))}
          </div>
        </div>

        {/* PMS section */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: TEXT_DARK, margin: 0 }}>Practice Management Systems</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {pmsIntegrations.map((item, i) => (
              <IntegrationCard key={i} item={item} onConnect={() => {}} />
            ))}
          </div>
        </div>

        {/* Other section */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: TEXT_DARK, margin: 0 }}>Other Tools</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {otherIntegrations.map((item, i) => (
              <IntegrationCard key={i} item={item} onConnect={() => {}} />
            ))}
          </div>
        </div>

        {/* Neutral platform note */}
      </div>
    </CoviuDashboardShell>
  );
}

/* ─── Placeholder screen for yet-to-be-built screens ─── */
function PlaceholderScreen({ label, index }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif",
      background: "white", padding: "80px 40px",
    }}>
      <div style={{
        width: 400, padding: 40, borderRadius: 16,
        border: `2px dashed ${TEAL}66`, background: `${TEAL}08`,
        textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📷</div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: TEXT_DARK, margin: "0 0 8px" }}>
          Screen {index + 1}: {label}
        </h2>
        <p style={{ fontSize: 14, color: TEXT_MED, margin: 0, lineHeight: 1.5 }}>
          Send a screenshot and instructions to build this screen
        </p>
      </div>
    </div>
  );
}

/* ─── Heidi Integration — Shared Styles ─── */
const HEIDI_PURPLE = "#6B4FA8";
const HEIDI_PURPLE_LIGHT = "#EDE8F5";
const HEIDI_PURPLE_DARK = "#4a3475";
const HEIDI_GREEN = "#1D9E75";
const HEIDI_GREEN_LIGHT = "#E1F5EE";
const HEIDI_GREEN_DARK = "#0F6E56";
const MOCK_SB_BG = "#1c2836";
const MOCK_SB_TEXT = "#8fa8b8";
const HEIDI_BORDER = "rgba(0,0,0,0.12)";
const HEIDI_BORDER_MED = "rgba(0,0,0,0.22)";
const HEIDI_BORDER_STRONG = "rgba(0,0,0,0.35)";
const HEIDI_BG_SEC = "#f8f9fa";
const HEIDI_BG_TER = "#f0f2f5";
const HEIDI_TEXT_PRI = "#111827";
const HEIDI_TEXT_SEC = "#6b7280";
const HEIDI_TEXT_TER = "#9ca3af";

/* ─── Heidi Tab 1: Scribe Selection ─── */
function HeidiScribeSelectionTab() {
  return (
    <div>
      <div style={{ fontSize: 10, color: HEIDI_TEXT_TER, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 500, margin: "0 0 10px" }}>
        Touchpoint 1 — Scribe provider selection (dialog over dashboard)
      </div>
      <div style={{ position: "relative", borderRadius: 12, border: `0.5px solid ${HEIDI_BORDER}`, overflow: "hidden", minHeight: 520, display: "flex", flexDirection: "column" }}>
        {/* Mock browser top bar */}
        <div style={{ height: 44, background: "white", borderBottom: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "center", padding: "0 13px", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 18, height: 18, background: "#e74c3c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 8, color: "white" }}>♥</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 500, color: HEIDI_TEXT_SEC }}>Via Health</span>
            </div>
            <span style={{ fontSize: 11, padding: "2px 7px", border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 4, color: HEIDI_TEXT_TER }}>enterprisedemo ▾</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 9, color: MOCK_SB_TEXT, gap: 1, cursor: "pointer" }}>
              <span style={{ fontSize: 15 }}>❓</span>
              <span>HELP</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 9, color: MOCK_SB_TEXT, gap: 1, cursor: "pointer", position: "relative" }}>
              <span style={{ fontSize: 15 }}>📞</span>
              <span>PHONE</span>
              <span style={{ position: "absolute", top: -3, right: -8, background: "#a855f7", color: "white", fontSize: 8, padding: "1px 3px", borderRadius: 3, lineHeight: 1.2 }}>NEW</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 9, gap: 1, cursor: "pointer" }}>
              <span style={{ fontSize: 15, color: HEIDI_PURPLE }}>✨</span>
              <span style={{ color: HEIDI_PURPLE, fontWeight: 500 }}>AI SCRIBE</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}>
              <span style={{ fontSize: 20, color: HEIDI_TEXT_TER }}>👤</span>
              <span style={{ fontSize: 11, color: HEIDI_TEXT_SEC }}>Developer ▾</span>
            </div>
          </div>
        </div>
        {/* Mock sidebar + dashboard content */}
        <div style={{ display: "flex", flex: 1 }}>
          <div style={{ width: 162, background: MOCK_SB_BG, flexShrink: 0, display: "flex", flexDirection: "column", minHeight: 476 }}>
            <div style={{ padding: "12px 13px 8px", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 15, height: 15, background: "#e74c3c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 6, color: "white" }}>♥</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, color: "white" }}>Via Health</span>
              </div>
            </div>
            <div style={{ padding: "5px 0" }}>
              {["Dashboard", "Waiting area", "User rooms", "Meeting rooms", "Group rooms", "Contacts", "Reports", "Apps"].map((label, i) => (
                <div key={i} style={{ padding: "7px 13px", fontSize: 12, color: i === 0 ? "white" : MOCK_SB_TEXT, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, lineHeight: 1, borderLeft: i === 0 ? `2px solid ${HEIDI_GREEN}` : "2px solid transparent", paddingLeft: i === 0 ? 11 : 13, background: i === 0 ? "rgba(255,255,255,0.06)" : "transparent" }}>
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, background: HEIDI_BG_SEC, padding: 18, filter: "blur(0.5px)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 400, margin: "0 0 12px", color: HEIDI_TEXT_PRI }}>Welcome</h2>
            <div style={{ background: HEIDI_GREEN, borderRadius: 12, padding: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 12, cursor: "pointer" }}>
              <span style={{ fontSize: 15, color: "white" }}>📹</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "white" }}>Start a Session</span>
            </div>
            <div style={{ background: "white", borderRadius: 12, height: 90, border: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: HEIDI_TEXT_TER, fontSize: 11, gap: 6 }}>
              🖼 User room preview
            </div>
          </div>
        </div>
        {/* Modal overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.44)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
          <div style={{ background: "white", borderRadius: 12, border: `0.5px solid ${HEIDI_BORDER}`, padding: 26, width: 430, maxWidth: "92%" }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 15, fontWeight: 500, margin: "0 0 5px" }}>Choose your AI scribe</h3>
              <p style={{ fontSize: 12, color: HEIDI_TEXT_SEC, margin: 0 }}>Select which AI engine powers transcription and note generation for your sessions.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11, marginBottom: 14 }}>
              {/* Coviu Assist card (unselected) */}
              <div style={{ border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 12, padding: 14, cursor: "pointer", position: "relative", opacity: 0.7 }}>
                <div style={{ width: 30, height: 30, background: HEIDI_GREEN_LIGHT, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: HEIDI_GREEN_DARK }}>🎙</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>Coviu Assist</p>
                <p style={{ fontSize: 10, color: HEIDI_GREEN_DARK, fontWeight: 500, margin: "0 0 8px" }}>by Coviu</p>
                <ul style={{ fontSize: 11, color: HEIDI_TEXT_SEC, margin: 0, paddingLeft: 12, lineHeight: 2 }}>
                  <li>Native integration</li><li>5 free sessions/month</li><li>Coviu-managed templates</li>
                </ul>
              </div>
              {/* Heidi card (selected) */}
              <div style={{ border: `2px solid ${HEIDI_PURPLE}`, borderRadius: 12, padding: 14, cursor: "pointer", position: "relative" }}>
                <div style={{ position: "absolute", top: 9, right: 9, width: 17, height: 17, borderRadius: "50%", background: HEIDI_PURPLE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 9, color: "white" }}>✓</span>
                </div>
                <div style={{ width: 30, height: 30, background: HEIDI_PURPLE_LIGHT, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: HEIDI_PURPLE_DARK }}>✨</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 2px" }}>Heidi Health</p>
                <p style={{ fontSize: 10, color: HEIDI_PURPLE_DARK, fontWeight: 500, margin: "0 0 8px" }}>by Heidi</p>
                <ul style={{ fontSize: 11, color: HEIDI_TEXT_SEC, margin: 0, paddingLeft: 12, lineHeight: 2 }}>
                  <li>Heidi AI engine</li><li>Heidi subscription</li><li>Heidi-curated templates</li>
                </ul>
              </div>
            </div>
            <div style={{ background: HEIDI_PURPLE_LIGHT, borderRadius: 8, padding: "8px 11px", marginBottom: 12, fontSize: 11, color: HEIDI_PURPLE_DARK, lineHeight: 1.6 }}>
              🔗 Connect your Heidi account to continue. <span style={{ textDecoration: "underline", cursor: "pointer" }}>Connect Heidi account →</span>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 7 }}>
              <button style={{ padding: "7px 12px", fontSize: 12, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 8, background: "transparent", cursor: "pointer", color: HEIDI_TEXT_SEC }}>Cancel</button>
              <button style={{ padding: "7px 17px", fontSize: 12, border: "none", borderRadius: 8, background: HEIDI_PURPLE, color: "white", cursor: "pointer", fontWeight: 500 }}>Continue with Heidi Health</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Heidi Tab 2: Live Panel ─── */
function HeidiLivePanelTab() {
  const [sub, setSub] = useState("ip");

  const SubButton = ({ id, label }) => (
    <button onClick={() => setSub(id)} style={{
      padding: "4px 10px", fontSize: 11, border: `0.5px solid ${sub === id ? HEIDI_BORDER_MED : HEIDI_BORDER}`, borderRadius: 5, background: sub === id ? HEIDI_BG_SEC : "transparent", cursor: "pointer", color: sub === id ? HEIDI_TEXT_PRI : HEIDI_TEXT_SEC, fontWeight: sub === id ? 500 : 400,
    }}>{label}</button>
  );

  return (
    <div>
      <div style={{ fontSize: 10, color: HEIDI_TEXT_TER, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 500, margin: "0 0 10px" }}>
        Touchpoint 2 — Live scribe panel
      </div>
      <div style={{ display: "flex", gap: 5, marginBottom: 11 }}>
        <SubButton id="ip" label="In-person (dashboard)" />
        <SubButton id="ic" label="In-call (video)" />
        <SubButton id="ph" label="Coviu phone" />
      </div>

      {/* In-person sub-tab */}
      {sub === "ip" && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 264px", border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 12, overflow: "hidden", minHeight: 450 }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: 162, background: MOCK_SB_BG, flexShrink: 0, minHeight: 450, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "11px 13px", borderBottom: "0.5px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 15, height: 15, background: "#e74c3c", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 6, color: "white" }}>♥</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "white" }}>Via Health</span>
                </div>
              </div>
              <div style={{ padding: "4px 0" }}>
                {["Dashboard", "Waiting area", "User rooms", "Meeting rooms", "Contacts", "Reports"].map((label, i) => (
                  <div key={i} style={{ padding: "7px 13px", fontSize: 12, color: i === 0 ? "white" : MOCK_SB_TEXT, cursor: "pointer", display: "flex", alignItems: "center", gap: 7, lineHeight: 1, borderLeft: i === 0 ? `2px solid ${HEIDI_GREEN}` : "2px solid transparent", paddingLeft: i === 0 ? 11 : 13, background: i === 0 ? "rgba(255,255,255,0.06)" : "transparent" }}>
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, background: HEIDI_BG_SEC, padding: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 400, margin: "0 0 11px", color: HEIDI_TEXT_PRI }}>Welcome</h2>
              <div style={{ background: HEIDI_GREEN, borderRadius: 12, padding: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 10, cursor: "pointer" }}>
                <span style={{ fontSize: 14, color: "white" }}>📹</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "white" }}>Start a Session</span>
              </div>
              <div style={{ background: "white", borderRadius: 12, height: 70, border: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", color: HEIDI_TEXT_TER, fontSize: 11 }}>User room preview</div>
              <p style={{ margin: "10px 0 0", fontSize: 12, color: HEIDI_TEXT_SEC }}>Enter patient name to sort notes.</p>
            </div>
          </div>
          {/* Right panel - transcription */}
          <div style={{ background: "white", borderLeft: `0.5px solid ${HEIDI_BORDER}`, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "11px 13px", borderBottom: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 500, margin: 0 }}>Live Session Transcription</p>
                <span style={{ display: "inline-block", fontSize: 10, padding: "2px 7px", borderRadius: 10, background: HEIDI_PURPLE_LIGHT, color: HEIDI_PURPLE_DARK, fontWeight: 500, marginTop: 3 }}>Heidi Health</span>
              </div>
              <span style={{ fontSize: 13, color: HEIDI_TEXT_TER, cursor: "pointer", marginTop: 2 }}>✕</span>
            </div>
            <div style={{ padding: "11px 13px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <label style={{ fontSize: 10, color: HEIDI_TEXT_SEC, display: "block", marginBottom: 3 }}>Patient name (optional)</label>
                <input type="text" style={{ width: "100%", fontSize: 11, padding: "5px 8px", borderRadius: 8, border: `0.5px solid ${HEIDI_BORDER_MED}`, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 10, color: HEIDI_TEXT_SEC, display: "block", marginBottom: 3 }}>Patient surname (optional)</label>
                <input type="text" style={{ width: "100%", fontSize: 11, padding: "5px 8px", borderRadius: 8, border: `0.5px solid ${HEIDI_BORDER_MED}`, boxSizing: "border-box" }} />
              </div>
              <select style={{ width: "100%", fontSize: 11, padding: "5px 8px", borderRadius: 8, border: `0.5px solid ${HEIDI_BORDER_MED}`, color: HEIDI_TEXT_SEC, boxSizing: "border-box" }}>
                <option>Default - MacBook Pro Microphone (Built-in)</option>
              </select>
              <div style={{ background: "#FFF8EC", border: "0.5px solid #FAC775", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#633806", lineHeight: 1.6 }}>
                ⓘ <strong>Heidi Health</strong> provides helpful insights. Practitioners must verify outputs and apply clinical judgement.
              </div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11, color: HEIDI_TEXT_SEC, cursor: "pointer", lineHeight: 1.5 }}>
                <input type="checkbox" style={{ marginTop: 1, flexShrink: 0 }} />
                <span>I understand Heidi's role and confirm privacy consent from all in the room</span>
              </label>
              <div style={{ background: HEIDI_BG_SEC, borderRadius: 8, padding: "8px 10px", fontSize: 11, color: HEIDI_TEXT_SEC, lineHeight: 1.6 }}>
                ⓘ Connected via Heidi<br />
                <span style={{ color: HEIDI_PURPLE_DARK, textDecoration: "underline", cursor: "pointer" }}>Manage your Heidi plan.</span>
              </div>
            </div>
            <div style={{ padding: "9px 13px", borderTop: `0.5px solid ${HEIDI_BORDER}` }}>
              <button style={{ width: "100%", padding: 7, fontSize: 12, border: "none", borderRadius: 8, background: HEIDI_PURPLE, color: "white", cursor: "pointer", fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>🎙 Start transcription</button>
            </div>
          </div>
        </div>
      )}

      {/* In-call video sub-tab */}
      {sub === "ic" && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 252px", borderRadius: 12, overflow: "hidden", minHeight: 450, border: `0.5px solid ${HEIDI_BORDER}` }}>
          {/* Video area */}
          <div style={{ background: "#111", display: "flex", flexDirection: "column", position: "relative" }}>
            <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 7, zIndex: 2 }}>
              <span style={{ background: "rgba(0,0,0,0.65)", color: "white", fontSize: 11, padding: "3px 7px", borderRadius: 4, fontVariantNumeric: "tabular-nums" }}>00:09</span>
              <span style={{ background: "rgba(200,40,40,0.88)", color: "white", fontSize: 10, padding: "2px 7px", borderRadius: 4, display: "flex", alignItems: "center", gap: 3 }}>● 1 of 1 consented</span>
            </div>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 7 }}>
              <div style={{ width: 78, height: 78, borderRadius: "50%", background: HEIDI_GREEN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>DA</div>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Camera & microphone off</span>
            </div>
            <div style={{ padding: "9px 13px", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
              <button style={{ padding: "6px 7px", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 5, background: "transparent", cursor: "pointer", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>⚙</button>
              <button style={{ padding: "6px 16px", border: "none", borderRadius: 5, background: "#e74c3c", cursor: "pointer", color: "white", fontSize: 13 }}>📴</button>
              <button style={{ padding: "6px 7px", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: 5, background: "transparent", cursor: "pointer", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>🎙</button>
              <button style={{ padding: "5px 10px", border: "none", borderRadius: 5, background: HEIDI_PURPLE, cursor: "pointer", fontSize: 11, color: "white", fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>📦 Apps & Tools</button>
            </div>
          </div>
          {/* Right panel */}
          <div style={{ background: "white", borderLeft: "0.5px solid rgba(255,255,255,0.12)", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "11px 13px", borderBottom: `0.5px solid ${HEIDI_BORDER}` }}>
              <p style={{ fontSize: 13, fontWeight: 500, margin: 0, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: HEIDI_PURPLE }}>✨</span> AI Scribe
              </p>
              <p style={{ fontSize: 11, color: HEIDI_PURPLE, margin: "2px 0 0", fontWeight: 500 }}>Powered by Heidi Health</p>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "9px 11px", display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ background: HEIDI_PURPLE_LIGHT, border: "0.5px solid #AFA9EC", borderRadius: 8, padding: "8px 10px", fontSize: 11, color: HEIDI_PURPLE_DARK, lineHeight: 1.6 }}>
                ⓘ Connected via Heidi subscription<br />
                <span style={{ textDecoration: "underline", cursor: "pointer", color: HEIDI_PURPLE_DARK }}>Manage your Heidi plan.</span>
              </div>
              {/* Transcription status */}
              <div style={{ background: HEIDI_BG_SEC, border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 8, padding: "8px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#e74c3c" }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: HEIDI_TEXT_PRI }}>Transcribing — 00:09</span>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    <button style={{ width: 22, height: 22, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 4, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: HEIDI_TEXT_SEC }}>⏸</button>
                    <button style={{ width: 22, height: 22, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 4, background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#e74c3c" }}>⏹</button>
                  </div>
                </div>
                <p style={{ fontSize: 9, color: HEIDI_TEXT_TER, margin: "3px 0 0" }}>1 of 1 consented</p>
              </div>
              {/* Participant */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 9px", border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 500 }}>Developer Account</span>
                <span style={{ fontSize: 9, padding: "2px 6px", background: HEIDI_GREEN_LIGHT, color: HEIDI_GREEN_DARK, borderRadius: 8, fontWeight: 500 }}>Consented</span>
              </div>
              {/* Mute warning */}
              <div style={{ background: "#FFF8EC", border: "0.5px solid #FAC775", borderRadius: 8, padding: "7px 9px", fontSize: 11, color: "#633806" }}>
                ⓘ You are currently muted.
              </div>
              {/* Context */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, margin: "0 0 4px", color: HEIDI_TEXT_PRI }}>Context</p>
                <textarea style={{ width: "100%", height: 64, fontSize: 11, padding: "5px 7px", borderRadius: 8, border: `0.5px solid ${HEIDI_BORDER_MED}`, color: HEIDI_TEXT_SEC, resize: "none", background: "white", boxSizing: "border-box", fontFamily: "inherit" }} placeholder="Add extra details. The AI will use this with the transcript." />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coviu phone sub-tab */}
      {sub === "ph" && (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 272px", border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 12, overflow: "hidden", minHeight: 420 }}>
          <div>
            <div style={{ padding: "10px 15px", borderBottom: `0.5px solid ${HEIDI_BORDER}`, background: "white" }}>
              <h3 style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>Waiting Area</h3>
            </div>
            <div style={{ padding: "11px 15px", background: HEIDI_BG_SEC }}>
              <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: `0.5px solid ${HEIDI_BORDER}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 90px 130px", padding: "6px 13px", background: HEIDI_BG_SEC, borderBottom: `0.5px solid ${HEIDI_BORDER}` }}>
                  {["Status", "Caller", "Participants", "Phone number"].map((h, i) => (
                    <span key={i} style={{ fontSize: 9, color: HEIDI_TEXT_SEC, fontWeight: 500, textTransform: "uppercase", letterSpacing: 0.3 }}>{h}</span>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 90px 130px", padding: "9px 13px", alignItems: "center", borderLeft: `3px solid ${HEIDI_GREEN}` }}>
                  <div>
                    <span style={{ display: "block", fontSize: 10, padding: "2px 6px", background: HEIDI_GREEN_LIGHT, color: HEIDI_GREEN_DARK, borderRadius: 3, fontWeight: 500, width: "fit-content" }}>DIALING</span>
                    <span style={{ display: "block", fontSize: 10, color: HEIDI_TEXT_SEC, marginTop: 2 }}>00:13</span>
                  </div>
                  <span style={{ fontSize: 11 }}>Phone Only</span>
                  <span style={{ fontSize: 11 }}>1</span>
                  <span style={{ fontSize: 11, color: HEIDI_TEXT_SEC }}>+61468600283</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right panel */}
          <div style={{ background: "white", borderLeft: `0.5px solid ${HEIDI_BORDER}`, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "9px 12px", borderBottom: `0.5px solid ${HEIDI_BORDER}` }}>
              <p style={{ fontSize: 11, fontWeight: 500, margin: 0, color: HEIDI_TEXT_SEC }}>In Call</p>
            </div>
            <div style={{ padding: 12, borderBottom: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: HEIDI_BG_SEC, border: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 16, color: HEIDI_TEXT_TER }}>📱</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>+61 468 600 283</p>
                <p style={{ fontSize: 11, color: HEIDI_TEXT_TER, margin: "1px 0 0" }}>00:12</p>
              </div>
            </div>
            <div style={{ padding: 12, flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
              <p style={{ fontSize: 11, fontWeight: 500, margin: 0, color: HEIDI_TEXT_SEC }}>AI Scribe — <span style={{ color: HEIDI_PURPLE }}>Heidi Health</span></p>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11, color: HEIDI_TEXT_SEC, cursor: "pointer", lineHeight: 1.6 }}>
                <input type="radio" name="ph-r" style={{ marginTop: 2, flexShrink: 0 }} defaultChecked />
                <span>I understand Heidi's role and confirm privacy consent from all in the room</span>
              </label>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 6, fontSize: 11, color: HEIDI_TEXT_SEC, cursor: "pointer", lineHeight: 1.6 }}>
                <input type="radio" name="ph-r" style={{ marginTop: 2, flexShrink: 0 }} />
                <span>Record me only. Patient audio won't be captured</span>
              </label>
              <div style={{ background: HEIDI_BG_SEC, borderRadius: 8, padding: "7px 9px", fontSize: 11, color: HEIDI_TEXT_SEC, lineHeight: 1.6 }}>
                ⓘ Connected via Heidi
              </div>
            </div>
            <div style={{ padding: "9px 12px", borderTop: `0.5px solid ${HEIDI_BORDER}`, display: "flex", justifyContent: "center", gap: 9 }}>
              <button style={{ width: 38, height: 38, border: "none", borderRadius: "50%", background: "#e74c3c", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "white" }}>📴</button>
              <button style={{ width: 38, height: 38, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: "50%", background: HEIDI_BG_SEC, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: HEIDI_TEXT_SEC }}>🎙</button>
              <button style={{ width: 38, height: 38, border: "none", borderRadius: "50%", background: HEIDI_PURPLE, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "white" }}>✨</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Heidi Tab 3: Templates ─── */
const HEIDI_TEMPLATES = [
  { name: "Mental Health Referral Letter - Follow Up", modified: "1st Aug 2025 09:00", isDefault: true,
    preview: ["History of Presenting Complaints", "Mental State Examination", "Risk Assessment", "Current Medications", "Management Plan"] },
  { name: "Allied Health Progress Note", modified: "12th Mar 2026 09:00", isDefault: false,
    preview: ["Subjective", "Objective", "Progress since last session", "Goals update", "Plan for next session"] },
  { name: "SOAP Note", modified: "1st Aug 2025 09:00", isDefault: false,
    preview: ["S — Subjective", "O — Objective", "A — Assessment", "P — Plan"] },
  { name: "Chronic Disease Management", modified: "5th Jan 2026 14:30", isDefault: false,
    preview: ["Current Metrics", "Current Medications", "Complications Screening", "Management Plan"] },
];

function HeidiTemplatesTab() {
  const [modalIdx, setModalIdx] = useState(null);

  return (
    <div>
      <div style={{ fontSize: 10, color: HEIDI_TEXT_TER, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 500, margin: "0 0 10px" }}>
        Touchpoint 3 — Templates
      </div>
      <div style={{ background: HEIDI_BG_SEC, borderRadius: 12, border: `0.5px solid ${HEIDI_BORDER}`, padding: "24px 28px", display: "flex", flexDirection: "column", minHeight: 400 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
            <h2 style={{ fontSize: 22, fontWeight: 400, margin: 0, color: HEIDI_TEXT_PRI }}>My Templates</h2>
            <button style={{ padding: "9px 20px", fontSize: 12, border: "none", borderRadius: 20, background: HEIDI_PURPLE, color: "white", cursor: "pointer", fontWeight: 500, display: "flex", alignItems: "center", gap: 5, letterSpacing: 0.3 }}>+ CREATE TEMPLATE</button>
          </div>
          {/* Templates table */}
          <div style={{ background: "white", borderRadius: 12, border: `0.5px solid ${HEIDI_BORDER}`, overflow: "hidden", flex: 1 }}>
            {/* Filter bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: `0.5px solid ${HEIDI_BORDER}` }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: HEIDI_PURPLE_LIGHT, color: HEIDI_PURPLE_DARK, border: "0.5px solid #AFA9EC", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4 }}>✨ By Heidi</span>
              <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 8, background: "transparent", cursor: "pointer", fontSize: 11, color: HEIDI_TEXT_SEC, letterSpacing: 0.3 }}>⚙ FILTER</button>
            </div>
            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 170px 44px", padding: "10px 20px 8px", borderBottom: `0.5px solid ${HEIDI_BORDER}` }}>
              <span style={{ fontSize: 13, fontWeight: 400, color: HEIDI_TEXT_PRI }}>Template Name</span>
              <span style={{ fontSize: 13, fontWeight: 400, color: HEIDI_TEXT_PRI }}>Modified</span>
              <span />
            </div>
            {/* Rows */}
            {HEIDI_TEMPLATES.map((t, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 170px 44px", padding: "12px 20px", borderBottom: `0.5px solid ${HEIDI_BORDER}`, alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, minWidth: 0 }}>
                  <span style={{ fontSize: 13, color: HEIDI_PURPLE, cursor: "pointer" }}>{t.name}</span>
                  <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: HEIDI_PURPLE, color: "white", fontWeight: 500, whiteSpace: "nowrap" }}>MANAGED BY HEIDI</span>
                  {t.isDefault && <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, border: `0.5px solid ${HEIDI_BORDER_MED}`, color: HEIDI_TEXT_SEC, whiteSpace: "nowrap", marginLeft: 4 }}>DEFAULT</span>}
                </div>
                <span style={{ fontSize: 13, color: HEIDI_TEXT_SEC }}>{t.modified}</span>
                <button onClick={() => setModalIdx(i)} style={{ fontSize: 15, color: HEIDI_TEXT_TER, cursor: "pointer", textAlign: "center", letterSpacing: 1, background: "transparent", border: "none", padding: "4px 8px", borderRadius: 4 }}>···</button>
              </div>
            ))}
          </div>
      </div>

      {/* Template preview modal */}
      {modalIdx !== null && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setModalIdx(null); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.48)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 12, border: `0.5px solid ${HEIDI_BORDER}`, width: 520, maxWidth: "100%", maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: HEIDI_TEXT_PRI }}>{HEIDI_TEMPLATES[modalIdx].name}</span>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: HEIDI_PURPLE, color: "white", fontWeight: 500, whiteSpace: "nowrap" }}>MANAGED BY HEIDI</span>
                </div>
                <p style={{ fontSize: 11, color: HEIDI_TEXT_TER, margin: 0, display: "flex", alignItems: "center", gap: 4 }}>✨ Heidi Health template</p>
              </div>
              <button onClick={() => setModalIdx(null)} style={{ width: 28, height: 28, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 6, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: HEIDI_TEXT_SEC }}>✕</button>
            </div>
            <div style={{ padding: 20, overflowY: "auto", flex: 1, lineHeight: 1.8 }}>
              {HEIDI_TEMPLATES[modalIdx].preview.map((section, si) => (
                <div key={si}>
                  <p style={{ margin: "0 0 3px", fontSize: 12, fontWeight: 600, color: HEIDI_TEXT_PRI }}>{section}</p>
                  <div style={{ height: 0.5, background: "#e0e0e0", margin: "4px 0 10px" }} />
                </div>
              ))}
            </div>
            <div style={{ padding: "12px 20px", borderTop: `0.5px solid ${HEIDI_BORDER}`, display: "flex", justifyContent: "flex-end", gap: 8, flexShrink: 0 }}>
              <button onClick={() => setModalIdx(null)} style={{ padding: "7px 14px", fontSize: 12, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 8, background: "transparent", cursor: "pointer", color: HEIDI_TEXT_SEC }}>Close</button>
              <button style={{ padding: "7px 16px", fontSize: 12, border: "none", borderRadius: 8, background: HEIDI_PURPLE, color: "white", cursor: "pointer", fontWeight: 500 }}>Set as default</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Heidi Tab 4: AI Notes ─── */
function HeidiAINotesTab({ firstName }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: HEIDI_TEXT_TER, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 500, margin: "0 0 10px" }}>
        Touchpoint 4 — AI notes (template source badge on generated note)
      </div>
      <div style={{ background: "white", border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 12, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "13px 18px 11px", borderBottom: `0.5px solid ${HEIDI_BORDER}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 3 }}>
            <h2 style={{ fontSize: 17, fontWeight: 500, margin: 0 }}>AI notes</h2>
            <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 20, background: HEIDI_PURPLE_LIGHT, color: HEIDI_PURPLE_DARK, fontWeight: 500 }}>✨ Powered by Heidi Health</span>
          </div>
          <p style={{ fontSize: 11, color: HEIDI_TEXT_TER, margin: 0 }}>Scribed by Heidi Health</p>
        </div>
        {/* Meta */}
        <div style={{ padding: "8px 18px", borderBottom: `0.5px solid ${HEIDI_BORDER}`, display: "flex", gap: 14, flexWrap: "wrap", fontSize: 11, color: HEIDI_TEXT_SEC }}>
          <span>📅 Today · 10:00 AM</span>
          <span>🕐 13 min</span>
          <span>👤 Jeremy Le</span>
        </div>
        {/* Tabs */}
        <div style={{ padding: "0 18px", borderBottom: `0.5px solid ${HEIDI_BORDER}`, display: "flex" }}>
          <div style={{ padding: "8px 12px", fontSize: 12, fontWeight: 500, borderBottom: `2px solid ${HEIDI_PURPLE}`, color: HEIDI_PURPLE, cursor: "pointer" }}>AI notes</div>
          <div style={{ padding: "8px 12px", fontSize: 12, color: HEIDI_TEXT_SEC, cursor: "pointer" }}>Transcript</div>
          <div style={{ padding: "8px 12px", fontSize: 12, color: HEIDI_TEXT_SEC, cursor: "pointer" }}>Context</div>
          <div style={{ padding: "8px 12px", fontSize: 12, color: HEIDI_TEXT_SEC, cursor: "pointer" }}>Consent</div>
        </div>
        {/* Warning */}
        <div style={{ margin: "12px 18px 0", background: "#FFF8EC", border: "0.5px solid #FAC775", borderRadius: 8, padding: "8px 11px", fontSize: 11, color: "#633806" }}>
          ⓘ Always review the generated note to ensure it accurately reflects the details of the visit.
        </div>
        {/* Template selector */}
        <div style={{ padding: "10px 18px", display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", borderBottom: `0.5px solid ${HEIDI_BORDER}` }}>
          <select style={{ minWidth: 220, fontSize: 12, padding: "6px 8px", borderRadius: 8, border: `0.5px solid ${HEIDI_BORDER_MED}`, color: HEIDI_TEXT_PRI }}>
            {HEIDI_TEMPLATES.map((t, i) => (
              <option key={i} value={i} defaultValue={t.isDefault}>{t.name} — by Heidi</option>
            ))}
          </select>
          <button style={{ padding: "5px 9px", fontSize: 11, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 8, background: "transparent", cursor: "pointer", color: HEIDI_TEXT_SEC }}>✨ Smart edits</button>
          <button style={{ padding: "5px 9px", fontSize: 11, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 8, background: "transparent", cursor: "pointer", color: HEIDI_TEXT_SEC }}>🔄 Find & replace</button>
        </div>
        {/* Note content */}
        <div style={{ margin: "13px 18px 18px", border: `0.5px solid ${HEIDI_BORDER}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "10px 13px", borderBottom: `0.5px solid ${HEIDI_BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 7 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
              <h3 style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>Consultation summary</h3>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 10, background: HEIDI_PURPLE_LIGHT, color: HEIDI_PURPLE_DARK, display: "inline-flex", alignItems: "center", gap: 3, fontWeight: 500 }}>✨ Generated by Heidi Health</span>
            </div>
            <div style={{ display: "flex", gap: 5 }}>
              <button style={{ padding: "4px 8px", fontSize: 11, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 8, background: "transparent", cursor: "pointer", color: HEIDI_TEXT_SEC }}>Copy</button>
              <button style={{ padding: "4px 8px", fontSize: 11, border: `0.5px solid ${HEIDI_BORDER_MED}`, borderRadius: 8, background: "transparent", cursor: "pointer", color: HEIDI_TEXT_SEC }}>Regenerate</button>
              <button style={{ padding: "4px 12px", fontSize: 11, border: "none", borderRadius: 8, background: HEIDI_PURPLE, color: "white", cursor: "pointer", fontWeight: 500 }}>Edit</button>
            </div>
          </div>
          <div style={{ padding: "12px 13px", fontSize: 12, color: HEIDI_TEXT_SEC, lineHeight: 1.9 }}>
            <div>Date:<div style={{ height: 0.5, background: HEIDI_BORDER, margin: "4px 0 6px" }} /></div>
            <div>Referring clinician:<div style={{ height: 0.5, background: HEIDI_BORDER, margin: "4px 0 6px" }} /></div>
            <div>Dear<div style={{ height: 0.5, background: HEIDI_BORDER, margin: "4px 0 6px" }} /></div>
            <p style={{ margin: "0 0 5px", fontSize: 12 }}>Thank you for referring , a ( )-year-old , seen today via with .</p>
            <div style={{ fontSize: 12, fontWeight: 500, color: HEIDI_TEXT_PRI, marginTop: 7 }}>History of presenting complaints</div>
            <div style={{ height: 0.5, background: HEIDI_BORDER, margin: "5px 0" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AI Notes Container (renders inside CoviuDashboardShell) ─── */
function AINotesContent({ subTab, showToast, onToastDismiss, firstName }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastFading, setToastFading] = useState(false);

  useEffect(() => {
    if (showToast) {
      setToastVisible(true);
      setToastFading(false);
      const fadeTimer = setTimeout(() => setToastFading(true), 4000);
      const removeTimer = setTimeout(() => {
        setToastVisible(false);
        if (onToastDismiss) onToastDismiss();
      }, 4600);
      return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
    }
  }, [showToast]);

  return (
    <div style={{ padding: "24px clamp(16px, 3vw, 32px) 100px", background: "#f9fafb", minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif", fontSize: 13, position: "relative" }}>
      {/* Success toast */}
      {toastVisible && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
          zIndex: 300, maxWidth: 520,
          animation: toastFading ? "toastFadeOut 0.6s ease-out forwards" : "toastSlideIn 0.4s ease-out",
        }}>
          <style>{`
            @keyframes toastSlideIn { from { opacity: 0; transform: translateX(-50%) translateY(-16px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
            @keyframes toastFadeOut { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-12px); } }
          `}</style>
          <div style={{
            background: "#065f46", color: "white",
            padding: "14px 20px", borderRadius: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
            display: "flex", alignItems: "center", gap: 12,
            fontSize: 13, fontWeight: 500, lineHeight: 1.4,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <div>AI note successfully generated from session</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>Patient: Jeremy Le · Today at 10:00 AM · 13 min consultation</div>
            </div>
            <button onClick={() => { setToastFading(true); setTimeout(() => { setToastVisible(false); if (onToastDismiss) onToastDismiss(); }, 400); }} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.5)",
              fontSize: 16, cursor: "pointer", padding: "0 0 0 8px", flexShrink: 0,
            }}>✕</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 760 }}>
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 4px", color: HEIDI_TEXT_PRI }}>Coviu × Heidi Health — Integration Prototype</h1>
          <p style={{ fontSize: 12, color: HEIDI_TEXT_SEC, margin: 0 }}>Interactive mockup · Heidi Health integration across all touchpoints</p>
        </div>
        {subTab === "templates" && <HeidiTemplatesTab />}
        {subTab === "notes" && <HeidiAINotesTab firstName={firstName} />}
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function CoviuHeidiPrototype() {
  const [screen, setScreen] = useState(0);
  const [aiNotesView, setAiNotesView] = useState(null);
  const [aiNotesExpanded, setAiNotesExpanded] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [selectedScribe, setSelectedScribe] = useState(null);
  const [selectedPms, setSelectedPms] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showAiNotesToast, setShowAiNotesToast] = useState(false);

  const next = () => setScreen(s => Math.min(s + 1, TOTAL_SCREENS - 1));
  const prev = () => setScreen(s => Math.max(s - 1, 0));

  const goToAiNotes = (subTab) => {
    setAiNotesExpanded(true);
    setAiNotesView(subTab || "notes");
    setShowAiNotesToast(true);
  };

  const handleSidebarItemClick = (label) => {
    if (label === "AI Notes") {
      if (!aiNotesExpanded) {
        setAiNotesExpanded(true);
        setAiNotesView("notes");
      } else {
        setAiNotesExpanded(false);
        setAiNotesView(null);
      }
    } else {
      setAiNotesExpanded(false);
      setAiNotesView(null);
    }
  };

  const handleAiNotesSubClick = (subKey) => {
    setAiNotesView(subKey);
  };

  const renderScreen = () => {
    switch (screen) {
      case 0: return <SignUpScreen onNext={next} onFirstNameChange={setFirstName} onPmsChange={setSelectedPms} onEmailChange={setUserEmail} />;
      case 1: return <OnboardingRoleScreen onNext={next} firstName={firstName} />;
      case 2: return <OnboardingGoalsScreen onNext={next} onPrev={prev} onScribeChange={setSelectedScribe} />;
      case 3: return <OnboardingClinicSetupScreen onNext={next} onPrev={prev} />;
      case 4: return <OnboardingRoomsScreen onNext={next} onPrev={prev} />;
      case 5: return <OnboardingInviteScreen onNext={next} onPrev={prev} />;
      case 6: return <OnboardingChecklistScreen onNext={next} selectedScribe={selectedScribe} selectedPms={selectedPms} userEmail={userEmail} onStartTestCall={goToAiNotes} firstName={firstName} />;
      case 7: return <IntegrationsHubScreen onNext={next} selectedScribe={selectedScribe} selectedPms={selectedPms} userEmail={userEmail} onStartTestCall={goToAiNotes} firstName={firstName} />;
      default: return <PlaceholderScreen label={SCREEN_LABELS[screen]} index={screen} />;
    }
  };

  // AI Notes view — uses dashboard shell, hides progress/nav
  if (aiNotesView) {
    return (
      <div>
        <CoviuDashboardShell
          activeItem="AI Notes"
          aiNotesExpanded={aiNotesExpanded}
          aiNotesSubTab={aiNotesView}
          onItemClick={handleSidebarItemClick}
          onAiNotesSubClick={handleAiNotesSubClick}
          standalone
          firstName={firstName}
        >
          <AINotesContent subTab={aiNotesView} showToast={showAiNotesToast} onToastDismiss={() => setShowAiNotesToast(false)} firstName={firstName} />
        </CoviuDashboardShell>
      </div>
    );
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div style={{ paddingBottom: 48, overflowX: "hidden", maxWidth: "100vw" }}>
      {renderScreen()}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 48,
        background: "white", borderTop: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 24,
        zIndex: 100,
      }}>
        <button onClick={() => { setScreen(0); setAiNotesView(null); setAiNotesExpanded(false); }} style={{
          background: "none", border: "none", color: TEXT_LIGHT,
          fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}>
          ↺ Restart demo
        </button>
        <span style={{ color: "#e5e7eb" }}>|</span>
        <button onClick={toggleFullscreen} style={{
          background: "none", border: "none", color: TEXT_LIGHT,
          fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
        }}>
          ⛶ Fullscreen
        </button>
      </div>
    </div>
  );
}