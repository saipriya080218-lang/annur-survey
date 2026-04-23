import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    text: {
      en: "What is your age group?",
      ta: "உங்கள் வயது என்ன?",
      te: "మీ వయస్సు ఎంత?"
    },
    options: ["<18", "18-30", "31-50", ">50"]
  },
  {
    id: 2,
    text: {
      en: "Gender",
      ta: "பாலினம்",
      te: "లింగం"
    },
    options: ["Male", "Female", "Other"]
  },
  // ... Add all 29 questions here in this format
  {
    id: 29,
    text: {
      en: "Overall satisfaction with the visit?",
      ta: "வருகையில் ஒட்டுமொத்த திருப்தி?",
      te: "మొత్తం సంతృప్తి?"
    },
    options: ["Very Happy", "Happy", "Neutral", "Unhappy"]
  }
];

function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [questions[step].id]: option });

    // NAVIGATION LOGIC: Move to next question automatically or click button
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      alert("Survey Completed! Thank you.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '500px', margin: 'auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Annur Vision Centre</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button onClick={() => setCurrentLang('en')}>English</button>
          <button onClick={() => setCurrentLang('ta')}>தமிழ்</button>
          <button onClick={() => setCurrentLang('te')}>తెలుగు</button>
        </div>
      </header>

      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
        <p><strong>Q{step + 1} of {questions.length}</strong></p>
        <h3>{questions[step].text[currentLang]}</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {questions[step].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              style={{ padding: '15px', cursor: 'pointer', backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)}>Previous</button>
        )}
      </div>
    </div>
  );
}

export default App;
