import React, { useState } from 'react';

// 1. DATA: Paste ALL 29 questions here
const surveyQuestions = [
  { id: 1, en: "Age Group", ta: "வயது பிரிவு", te: "వయస్సు సమూహం", options: ["<18", "18-30", "31-50", ">50"] },
  { id: 2, en: "Gender", ta: "பாலினம்", te: "లింగం", options: ["Male", "Female"] },
  // ... Paste the rest of your 29 questions here in the same format
];

function App() {
  const [language, setLanguage] = useState('en');
  const [answers, setAnswers] = useState({});

  const handleSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#003B7A' }}>Annur Vision Centre</h1>

      {/* Language Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        <button onClick={() => setLanguage('ta')} style={btnStyle}>தமிழ்</button>
        <button onClick={() => setLanguage('te')} style={btnStyle}>తెలుగు</button>
        <button onClick={() => setLanguage('en')} style={btnStyle}>English</button>
      </div>

      {/* 2. LOGIC: This "map" function forces ALL questions to show */}
      {surveyQuestions.map((q) => (
        <div key={q.id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' }}>
          <p style={{ fontWeight: 'bold' }}>Q{q.id}. {q[language]}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => handleSelect(q.id, opt)}
                style={{
                  padding: '10px',
                  backgroundColor: answers[q.id] === opt ? '#003B7A' : '#fff',
                  color: answers[q.id] === opt ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: '5px'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        style={{ width: '100%', padding: '15px', backgroundColor: '#003B7A', color: '#fff', fontSize: '18px', marginTop: '20px', borderRadius: '5px' }}
        onClick={() => console.log("Final Data:", answers)}
      >
        Confirm & Submit
      </button>
    </div>
  );
}

const btnStyle = { padding: '8px 15px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #003B7A' };

export default App;

