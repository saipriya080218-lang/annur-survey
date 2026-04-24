import React, { useState, useRef } from "react";

const NAVY = "#003B7A";
const ORANGE = "#E8711A";
const CENTRE = "Annur Vision Centre";

export default function App() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("en");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [signatureData, setSignatureData] = useState(null);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const questions = [
    "What is your age group?", "What is your gender?", "What is your highest level of education?", "What is your occupation?",
    "How far is your residence from this vision centre?", "How much time did it take to reach here today?",
    "What was your primary mode of transport today?", "How did you first hear about this vision centre?",
    "How frequently do you get your eyes checked?", "What was the main reason for choosing this vision centre?",
    "How was the registration process?", "How was the staff courtesy?", "How was the waiting area cleanliness?",
    "How was the doctor consultation?", "How clear was the doctor's explanation?", "How much time did the doctor spend with you?",
    "How was the optical / pharmacy service?", "How efficient was the overall process?", "How was the hygiene of the centre?",
    "How friendly was the staff?", "Was the treatment as expected?", "Did you notice improvement in your vision?",
    "How affordable were the services?", "Would you recommend this centre to others?", "Overall satisfaction with the treatment?",
    "Did you face any difficulty following the instructions?", "Any additional comments or suggestions?",
    "Overall satisfaction with the vision centre?", "How likely are you to recommend this vision centre?"
  ];

  const ratingOptions = ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"];

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = NAVY;
    ctx.lineWidth = 4;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    ctx.moveTo(x - rect.left, y - rect.top);
  };

  const draw = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    ctx.lineTo(x - rect.left, y - rect.top);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (canvasRef.current) setSignatureData(canvasRef.current.toDataURL("image/png"));
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSignatureData(null);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSignatureData(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const currentQuestion = questions[step];

  const handleAnswer = (val) => setAnswers(p => ({ ...p, [step]: val }));

  const next = () => step < questions.length - 1 ? setStep(step + 1) : setSubmitted(true);

  const prev = () => step > 0 && setStep(step - 1);

  const progress = Math.round(((step + 1) / questions.length) * 100);

  if (submitted) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center", minHeight: "100vh", background: "#f8f9fa" }}>
        <h1 style={{ color: NAVY }}>Thank You!</h1>
        <p style={{ fontSize: "22px", margin: "30px 0" }}>Your feedback has been recorded successfully.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui", maxWidth: "720px", margin: "0 auto", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1 style={{ color: NAVY, textAlign: "center" }}>{CENTRE}</h1>

      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "25px", flexWrap: "wrap" }}>
        {["en", "ta", "te"].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{ padding: "10px 18px", borderRadius: "25px", border: lang === l ? `2px solid ${NAVY}` : "1px solid #ddd", background: lang === l ? "#e6f0ff" : "white" }}>
            {l === "en" ? "English" : l === "ta" ? "தமிழ்" : "తెలుగు"}
          </button>
        ))}
      </div>

      <div style={{ height: "10px", background: "#ddd", borderRadius: "5px", margin: "20px 0" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: ORANGE }} />
      </div>

      <p style={{ textAlign: "center", fontWeight: "bold" }}>Question {step + 1} of 29</p>

      <div style={{ border: `3px solid ${ORANGE}`, padding: "25px", borderRadius: "16px", background: "white" }}>
        <h3>{currentQuestion}</h3>

        <div style={{ marginTop: "30px" }}>
          {ratingOptions.map((label, i) => (
            <button key={i} onClick={() => handleAnswer(i + 1)}
              style={{ display: "block", width: "100%", padding: "18px", margin: "10px 0", fontSize: "18px", border: answers[step] === (i + 1) ? `3px solid ${NAVY}` : "2px solid #ccc", background: answers[step] === (i + 1) ? "#e6f0ff" : "white", borderRadius: "12px" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
        <button onClick={prev} disabled={step === 0} style={{ flex: 1, padding: "16px", background: step === 0 ? "#ccc" : NAVY, color: "white", border: "none", borderRadius: "12px" }}>← Previous</button>
        <button onClick={next} style={{ flex: 1, padding: "16px", background: NAVY, color: "white", border: "none", borderRadius: "12px", fontWeight: "bold" }}>{step < 28 ? "Next →" : "Consent & Submit"}</button>
      </div>

      {step === questions.length - 1 && (
        <div style={{ marginTop: "40px", border: `2px solid ${ORANGE}`, padding: "25px", borderRadius: "12px", background: "white" }}>
          <h3>Consent</h3>
          <p style={{ fontSize: "15px", lineHeight: "1.6" }}>
            I consent to the use of my photo, video and medical data for research and educational purposes.
          </p>

          <p style={{ marginTop: "20px", fontWeight: "bold" }}>Signature / Photo</p>
          <canvas ref={canvasRef} width="320" height="180" style={{ border: "2px dashed #ccc", borderRadius: "8px", display: "block", margin: "10px auto" }}
            onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseLeave={endDrawing}
            onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={endDrawing} />

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "15px" }}>
            <button onClick={clearSignature} style={{ padding: "10px 20px", background: "#ddd", borderRadius: "8px" }}>Clear</button>
            <button onClick={() => fileInputRef.current.click()} style={{ padding: "10px 20px", background: "#e6f0ff", borderRadius: "8px" }}>📷 Camera / Upload</button>
          </div>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFile} />

          {signatureData && <img src={signatureData} alt="Signature" style={{ maxWidth: "100%", marginTop: "15px", border: "1px solid #ccc", borderRadius: "8px" }} />}

          <button onClick={() => setSubmitted(true)} disabled={!signatureData} style={{ marginTop: "25px", width: "100%", padding: "18px", background: signatureData ? NAVY : "#ccc", color: "white", border: "none", borderRadius: "12px", fontSize: "18px" }}>
            Submit Survey
          </button>
        </div>
      )}
    </div>
  );
}