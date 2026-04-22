import React, { useState } from "react";

// Section: Demographics
const QUESTIONS = [
  { n: 1, en: "Age Group", ta: "வயது பிரிவு", te: "వయసు సమూహం", choices: ["<18", "18-30", "31-50", ">50"] },
  { n: 2, en: "Gender", ta: "பாலினம்", te: "లింగం", choices: ["Male", "Female"] }
];

export default function App() {
  const [answers, setAnswers] = useState({});
  const [lang, setLang] = useState("en");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ color: "#003B7A", textAlign: "center" }}>Annur Vision Centre</h1>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setLang("ta")} style={{ padding: "10px", borderRadius: "8px" }}>தமிழ்</button>
        <button onClick={() => setLang("te")} style={{ padding: "10px", borderRadius: "8px" }}>తెలుగు</button>
        <button onClick={() => setLang("en")} style={{ padding: "10px", borderRadius: "8px" }}>English</button>
      </div>

      {QUESTIONS.map((q) => (
        <div key={q.n} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "10px" }}>
          <p><strong>Q{q.n}. {q[lang]}</strong></p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {q.choices.map((choice, i) => (
              <button 
                key={i} 
                onClick={() => setAnswers({...answers, [q.n]: choice})}
                style={{ 
                  padding: "10px", 
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  background: answers[q.n] === choice ? "#E8711A" : "#fff",
                  color: answers[q.n] === choice ? "#fff" : "#000"
                }}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: "30px", padding: "20px", background: "#f0f4f8", borderRadius: "10px" }}>
        <h3>Patient Record Summary:</h3>
        <pre style={{ background: "#fff", padding: "10px", borderRadius: "5px" }}>
          {JSON.stringify(answers, null, 2)}
        </pre>
        <button 
          onClick={() => window.print()} 
          style={{ width: "100%", padding: "15px", background: "#003B7A", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold" }}
        >
          Confirm & Print Preview
        </button>
      </div>
    </div>
  );
}
