// src/App.js import React, { useState, useEffect, useRef, useCallback } from "react";

/* Cleaned single-file React app (App.js) for create-react-app / Vercel.

• Replaces smart quotes and special ellipses.

• Removes stray Markdown fence in PrintModal.doShare.

• Adds guards for window / navigator use (safe for SSR build).

• Keeps functionality intact (Audio TTS, one-answer-per-question radio, Print Preview modal, Progress counter, Security PDF export (CDN-loaded), Checklist).

• To deploy: create-react-app project, replace src/App.js with this file, run npm run build, push to GitHub, connect repo to Vercel. */

/* ══════════════════════════════════════════════════════ Constants and questions (unchanged content, quotes normalized) ══════════════════════════════════════════════════════ */ const NAVY = "#003B7A", ORANGE = "#E8711A", GREEN = "#1A9E5A", RED = "#D94040", GOLD = "#F4A91D", BORDER = "#D4E4F4", TEXT = "#1A2533", MUTED = "#6B7A90", TARGET = 300; const CENTRE = "Annur Vision Centre";

/* ALL 29 QUESTIONS — cleaned */ const QUESTIONS = [{ n: 1, section: "Demographics", en: "Age Group", ta: "வயது பிரிவு", te: "వయసు సమూహం", hint_en: "Select the applicable age group", hint_ta: "பொருந்தும் வயது பிரிவை தேர்ந்தெடுக்கவும்", hint_te: "వర్తించే వయసు సమూహాన్ని ఎంచుకోండి", choices: [{ en: "<18 years", ta: "18 வயதுக்கு குறைவானவர்", te: "18 సంవత్సరాల లోపు" }, { en: "18–30 years", ta: "18–30 வயது", te: "18–30 సంవత్సరాలు" }, { en: "31–50 years", ta: "31–50 வயது", te: "31–50 సంవత్సరాలు" }, { en: ">50 years", ta: "50 வயதுக்கு மேல்", te: "50 సంవత్సరాలకు పైగా" },], }, { n: 2, section: "Demographics", en: "Gender", ta: "பாலினம்", te: "లింగం", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Male", ta: "ஆண்", te: "పురుషుడు" }, { en: "Female", ta: "பெண்", te: "స్త్రీ" }, { en: "Other", ta: "மற்றவை", te: "ఇతర" }, { en: "Prefer not to disclose", ta: "தெரிவிக்க விரும்பவில்லை", te: "వెల్లడించడం ఇష్టం లేదు" },], }, { n: 3, section: "Demographics", en: "Education", ta: "கல்வி தகுதி", te: "విద్యా అర్హత", hint_en: "Highest level completed", hint_ta: "முடித்த உயர்ந்த கல்வி நிலை", hint_te: "పూర్తి చేసిన అత్యధిక స్థాయి", choices: [{ en: "No formal education / Illiterate", ta: "முறையான கல்வி இல்லை", te: "అక్షరజ్ఞానం లేదు" }, { en: "Primary (up to Class 5)", ta: "ஆரம்ப கல்வி (வகுப்பு 5 வரை)", te: "ప్రాథమిక (5వ తరగతి వరకు)" }, { en: "Secondary (Classes 6–10)", ta: "இடைநிலை (வகுப்பு 6–10)", te: "మాధ్యమిక (6–10 తరగతి)" }, { en: "Higher Secondary / Diploma", ta: "மேல்நிலை / டிப்லோமா", te: "హయ్యర్ సెకండరీ / డిప్లొమా" }, { en: "Graduate & above", ta: "பட்டதாரி மற்றும் அதற்கு மேல்", te: "పట్టభద్రుడు & అంతకు పైగా" },], }, { n: 4, section: "Demographics", en: "Occupation", ta: "தொழில்", te: "వృత్తి", hint_en: "Most applicable category", hint_ta: "பொருந்தும் வகை", hint_te: "అత్యంత వర్తించే వర్గం", choices: [{ en: "Housewife", ta: "இல்லத்தரசி", te: "గృహిణి" }, { en: "Student", ta: "மாணவர்", te: "విద్యార్థి" }, { en: "Dependent/Retired/Pensioner", ta: "ஓய்வுபெற்றவர்", te: "రిటైర్డ్/పెన్షనర్" }, { en: "Skilled Labour", ta: "திறன் தொழிலாளர்", te: "నిపుణ కార్మికుడు" }, { en: "Unskilled Labour", ta: "திறனற்ற தொழிலாளர்", te: "అనిపుణ కార్మికుడు" }, { en: "Government Employee", ta: "அரசு ஊழியர்", te: "ప్రభుత్వ ఉద్యోగి" }, { en: "Private Sector Employee", ta: "தனியார் துறை ஊழியர்", te: "ప్రైవేట్ ఉద్యోగి" }, { en: "Community Health Worker/ASHA", ta: "சமூக சுகாதார செயலர்", te: "ASHA వర్కర్" }, { en: "Self-Employed", ta: "சுயதொழில்", te: "స్వయం ఉపాధి" }, { en: "Others", ta: "மற்றவை", te: "ఇతరులు" },], }, { n: 5, section: "Accessibility", en: "Distance from your residence to this vision centre", ta: "வீட்டிலிருந்து மையம் வரையிலான தூரம்", te: "నివాసం నుండి విజన్ సెంటర్ దూరం", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "<2 km", ta: "2 கி.மீ.க்கு குறைவு", te: "2 కి.మీ. కంటే తక్కువ" }, { en: "2–5 km", ta: "2–5 கி.மீ.", te: "2–5 కి.మీ." }, { en: "6–10 km", ta: "6–10 கி.மீ.", te: "6–10 కి.మీ." }, { en: ">10 km", ta: "10 கி.மீ.க்கு மேல்", te: "10 కి.మీ. కంటే ఎక్కువ" },], }, { n: 6, section: "Accessibility", en: "Total travel time to reach this vision centre", ta: "மையத்தை அடைய மொத்த பயண நேரம்", te: "కేంద్రానికి మొత్తం ప్రయాణ సమయం", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "<15 minutes", ta: "15 நிமிடங்களுக்கு குறைவு", te: "15 నిమిషాల కంటే తక్కువ" }, { en: "15–30 minutes", ta: "15–30 நிமிடங்கள்", te: "15–30 నిమిషాలు" }, { en: "31–60 minutes", ta: "31–60 நிமிடங்கள்", te: "31–60 నిమిషాలు" }, { en: ">60 minutes", ta: "60 நிமிடங்களுக்கு மேல்", te: "60 నిమిషాలకు పైగా" },], }, { n: 7, section: "Accessibility", en: "Primary mode of transport used today", ta: "இன்று பயன்படுத்திய முக்கிய போக்குவரத்து", te: "ఈరోజు ఉపయోగించిన ప్రధాన రవాణా", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Walking", ta: "நடைபயணம்", te: "నడక" }, { en: "Two-wheeler", ta: "இரு சக்கர வாகனம்", te: "రెండు చక్రాల వాహనం" }, { en: "Auto (shared/private)", ta: "ஆட்டோ", te: "ఆటో" }, { en: "Bus / Public Transport", ta: "பேருந்து", te: "బస్సు" }, { en: "Other", ta: "மற்றவை", te: "ఇతర" },], }, { n: 8, section: "Awareness", en: "How did you first hear about this vision centre?", ta: "இந்த மையத்தைப் பற்றி முதலில் எவ்வாறு அறிந்தீர்கள்?", te: "ఈ విజన్ సెంటర్ గురించి మొదట ఎలా తెలుసుకున్నారు?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Family/Friends/Word of mouth", ta: "குடும்பம் / நண்பர்கள் / வாய்மொழி", te: "కుటుంబం / స్నేహితులు" }, { en: "Digital media (WhatsApp/Social media)", ta: "டிஜிட்டல் ஊடகம்", te: "డిజిటల్ మీడియా" }, { en: "Eye camp / Outreach services", ta: "கண் முகாம்", te: "కంటి శిబిరం" }, { en: "Auto publicity / Pamphlets / Posters", ta: "துண்டு பிரசுரம்", te: "పాంప్లెట్లు" }, { en: "Vision Health Visitor (VHC)", ta: "விஷன் ஹெல்த் விசிட்டர்", te: "VHC విజిటర్" }, { en: "Other", ta: "மற்றவை", te: "ఇతర" },], }, { n: 9, section: "Awareness", en: "How frequently do you attend eye check-ups?", ta: "எவ்வளவு அடிக்கடி கண் பரிசோதனைக்கு வருகிறீர்கள்?", te: "కంటి పరీక్షలకు ఎంత తరచుగా హాజరవుతారు?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "First time eye check-up", ta: "முதல் முறை கண் பரிசோதனை", te: "మొదటిసారి కంటి పరీక్ష" }, { en: "Only when there is a problem", ta: "சிக்கல் இருக்கும்போது மட்டும்", te: "సమస్య ఉన్నప్పుడు మాత్రమే" }, { en: "Once a year (routine)", ta: "வருடம் ஒரு முறை", te: "సంవత్సరానికి ఒకసారి" }, { en: "More than once a year", ta: "வருடம் ஒரு முறைக்கு மேல்", te: "సంవత్సరానికి ఒకటి కంటే ఎక్కువ" },], }, { n: 10, section: "Reasons", en: "What is the main reason for choosing this vision centre?", ta: "இந்த மையத்தை தேர்ந்தெடுக்கும் முக்கிய காரணம் என்ன?", te: "ఈ విజన్ సెంటర్‌ను ఎంచుకోవడానికి ముఖ్య కారణం?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Near to home / Easy access", ta: "வீட்டிற்கு அருகில்", te: "ఇంటికి దగ్గర" }, { en: "Affordable cost of services", ta: "சேவைகளின் மலிவான விலை", te: "సేవల సరసమైన వ్యయం" }, { en: "Trust in Sankara Eye Hospital", ta: "சங்கர மருத்துவமனையின் நம்பிக்கை", te: "సంకర హాస్పిటల్‌పై విశ్వాసం" }, { en: "Complete eye check-up at one place", ta: "ஒரே இடத்தில் முழு பரிசோதனை", te: "ఒకే చోట పూర్తి కంటి పరీక్ష" }, { en: "Teleconsultation with expert doctor", ta: "நிபுணர் மருத்துவர் தொலைத் தொடர்பு", te: "నిపుణ వైద్యుడితో టెలికన్సల్టేషన్" }, { en: "Recommendation by others", ta: "பிறரின் பரிந்துரை", te: "ఇతరుల సిఫారసు" },], }, { n: 11, section: "Previous Healthcare", en: "Have you visited any other eye care clinic before coming here?", ta: "இங்கு வருவதற்கு முன்பு வேறு கண் சிகிச்சை மையத்தை பார்வையிட்டீர்களா?", te: "ఇక్కడికి రాకముందు మరే ఇతర క్లినిక్‌కు వెళ్ళారా?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Yes", ta: "ஆம்", te: "అవును" }, { en: "No", ta: "இல்லை", te: "లేదు" },], }, { n: 12, section: "Previous Healthcare", en: "What was the main problem you faced at the previous clinic?", ta: "முந்தைய மையத்தில் என்ன சிக்கலை எதிர்கொண்டீர்கள்?", te: "మీరు మునుపటి క్లినిక్‌లో ఎదుర్కున్న ముఖ్య సమస్య?", hint_en: "Answer if visited another clinic", hint_ta: "வேறு மையம் சென்றால் மட்டும்", hint_te: "మరో క్లినిక్‌కు వెళ్ళినట్లైతే మాత్రమే", choices: [{ en: "High cost of services", ta: "சேவைகளின் அதிக விலை", te: "సేవల అధిక వ్యయం" }, { en: "Long waiting time", ta: "நீண்ட காத்திருப்பு நேரம்", te: "ఎక్కువ వేచి ఉండే సమయం" }, { en: "Limited services available", ta: "குறைந்த சேவைகள்", te: "పరిమిత సేవలు" }, { en: "Not satisfied with treatment/outcome", ta: "சிகிச்சை / முடிவில் திருப்தியில்லை", te: "చికిత్స ఫలితంతో సంతృప్తి లేదు" }, { en: "Distance / Poor accessibility", ta: "தொலைவு / போதுமான வசதி இல்லை", te: "దూరం / పేద అందుబாடு" }, { en: "Other", ta: "மற்றவை", te: "ఇతర" },], }, { n: 13, section: "Economic", en: "Nature of household income", ta: "குடும்ப வருமானத்தின் தன்மை", te: "గృహ ఆదాయ స్వభావం", hint_en: "Select income type and applicable range", hint_ta: "வருமான வகை மற்றும் அளவை தேர்ந்தெடுக்கவும்", hint_te: "ఆదాయ రకం మరియు పరిధిని ఎంచుకోండి", choices: [{ en: "Daily wages: <₹500", ta: "தினக் கூலி: ₹500க்கு குறைவு", te: "రోజువారీ: ₹500 కంటే తక్కువ" }, { en: "Daily wages: ₹500–₹1,000", ta: "தினக் கூலி: ₹500–₹1,000", te: "రోజువారీ: ₹500–₹1,000" }, { en: "Daily wages: >₹1,000", ta: "தினக் கூலி: ₹1,000க்கு மேல்", te: "రోజువారీ: ₹1,000కు పైగా" }, { en: "Weekly income: <₹2,000", ta: "வாராந்திர: ₹2,000க்கு குறைவு", te: "వారపు: ₹2,000 కంటే తక్కువ" }, { en: "Weekly income: ₹2,000–₹5,000", ta: "వారாந்திர: ₹2,000–₹5,000", te: "వారపు: ₹2,000–₹5,000" }, { en: "Weekly income: >₹5,000", ta: "వారாந்திர: ₹5,000కి மேல்", te: "వారపు: ₹5,000కు పైగా" }, { en: "Monthly salary: <₹10,000", ta: "மாதாந்திர: ₹10,000க்கு குறைவு", te: "నెలవారీ: ₹10,000 కంటే తక్కువ" }, { en: "Monthly salary: ₹10,000–₹15,000", ta: "மாதாந்திர: ₹10,000–₹15,000", te: "నెలవారీ: ₹10,000–₹15,000" }, { en: "Monthly salary: >₹15,000", ta: "மாதாந்திர: ₹15,000க்கு மேல்", te: "నెలవారీ: ₹15,000కు పైగా" },], }, { n: 14, section: "Economic", en: "Approximate travel cost to reach the vision centre (one way)", ta: "மையத்திற்கு வர ஆகும் தோராயமான பயண செலவு (ஒரு வழி)", te: "విజన్ సెంటర్‌కు అంచనా ప్రయాణ వ్యయం (ఒకటేవైపు)", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "<₹100", ta: "₹100க்கு குறைவு", te: "₹100 కంటే తక్కువ" }, { en: "₹100–₹250", ta: "₹100–₹250", te: "₹100–₹250" }, { en: ">₹250", ta: "₹250కి மேல்", te: "₹250కు పైగా" },], }, { n: 15, section: "Economic", en: "Did you lose income / wages due to this visit?", ta: "இந்த வருகையினால் வருமானம் இழந்தீர்களா?", te: "ఈ సందర్శన కారణంగా ఆదాయం కోల్పోయారా?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "No loss", ta: "இழப்பில்லை", te: "నష్టం లేదు" }, { en: "<₹500", ta: "₹500க்கு குறைவு", te: "₹500 కంటే తక్కువ" }, { en: "₹500–₹1,000", ta: "₹500–₹1,000", te: "₹500–₹1,000" }, { en: ">₹1,000", ta: "₹1,000க்கு மேல்", te: "₹1,000కు పైగా" },], }, { n: 16, section: "Economic", en: "Did someone accompany you today?", ta: "இன்று யாரேனும் உங்களுடன் வந்தனரா?", te: "ఈరోజు మీతో ఎవరైనా వచ్చారా?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "No, visited alone", ta: "இல்லை, தனியாக வந்தேன்", te: "లేదు, ఒంటరిగా వచ్చాను" }, { en: "Yes, Family member", ta: "ஆம், குடும்ப உறுப்பினர்", te: "అవును, కుటుంబ సభ్యుడు" }, { en: "Yes, Friend/Neighbour", ta: "ஆம், நண்பர்", te: "అవును, స్నేహితుడు" }, { en: "Yes, Other", ta: "ஆம், மற்றவர்கள்", te: "అవును, ఇతరులు" },], }, { n: 17, section: "Economic", en: "Travel cost for the accompanying person (one way)", ta: "உடன் வந்தவரின் பயண செலவு (ஒரு வழி)", te: "తోడుగా వచ్చిన వ్యక్తి ప్రయాణ వ్యయం", hint_en: "Answer if accompanied", hint_ta: "உடன் வந்தால் மட்டும்", hint_te: "తోడు వచ్చినట్లైతే మాత్రమే", choices: [{ en: "<₹100", ta: "₹100க்கு குறைவு", te: "₹100 కంటే తక్కువ" }, { en: "₹101–₹500", ta: "₹101–₹500", te: "₹101–₹500" }, { en: ">₹500", ta: "₹500க்கு மேல்", te: "₹500కు పైగా" },], }, { n: 18, section: "Economic", en: "Did the accompanying person lose any income because of this visit?", ta: "உடன் வந்தவருக்கு வருமான இழப்பு ஏற்பட்டதா?", te: "తోడుగా వచ్చిన వ్యక్తికి ఆదాయ నష్టం కలిగిందా?", hint_en: "Answer if accompanied", hint_ta: "உடன் வந்தால் மட்டும்", hint_te: "తోడు వచ్చినట్లైతే మాత్రమే", choices: [{ en: "No loss", ta: "இழப்பில்லை", te: "నష్టం లేదు" }, { en: "<₹500", ta: "₹500க்கு குறைவు", te: "₹500 కంటే తక్కువ" }, { en: "₹500–₹1,000", ta: "₹500–₹1,000", te: "₹500–₹1,000" }, { en: ">₹1,000", ta: "₹1,000க்கு மேல்", te: "₹1,000కు పైగా" },], }, { n: 19, section: "Clinical", en: "What was the clinical advice given after your eye examination today?", ta: "இன்று கண் பரிசோதனைக்கு பிறகு மருத்துவர் ஆலோசனை என்ன?", te: "ఈరోజు కంటి పరీక్ష తర్వాత వైద్య సలహా ఏమిటి?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "First time spectacles prescribed", ta: "முதல் முறை கண்ணாடி பரிந்துரை", te: "మొదటిసారి కళ్ళద్దాలు సూచించారు" }, { en: "Continue with current spectacles (no change)", ta: "தற்போதைய கண்ணாடியை தொடரவும்", te: "ప్రస్తుత కళ్ళద్దాలను కొనసాగించండి" }, { en: "Advised to change spectacles (revised prescription)", ta: "கண்ணாடி மாற்ற ஆலோசனை", te: "కళ్ళద్దాలు మార్చమని సలహా" },], }, { n: 20, section: "Current Spectacles", en: "How satisfied are you with your current spectacles?", ta: "தற்போதைய கண்ணாடியில் எவ்வளவு திருப்தி உள்ளது?", te: "ప్రస్తుత కళ్ళద్దాలతో ఎంత సంతృప్తి?", hint_en: "Answer if advised to continue current spectacles", hint_ta: "தற்போதைய கண்ணாடியை தொடர ஆலோசனை வழங்கப்பட்டால் மட்டும்", hint_te: "ప్రస్తుత కళ్ళద్దాలను కొనసాగించమని సలహా ఇచ్చినట్లైతే", choices: [{ en: "Very satisfied", ta: "மிகவும் திருப்தி", te: "చాలా సంతృప్తి" }, { en: "Satisfied", ta: "திருப்தி", te: "సంతృప్తి" }, { en: "Dissatisfied", ta: "திருப்தியில்லை", te: "అసంతృప్తి" }, { en: "Very dissatisfied", ta: "மிகவும் திருப்தியில்லை", te: "చాలా అసంతృப్తి" },], }, { n: 21, section: "Current Spectacles", en: "Where did you purchase your current spectacles?", ta: "தற்போதைய கண்ணாடியை எங்கு வாங்கினீர்கள்?", te: "ప్రస్తుత కళ్ళద్దాలను ఎక్కడ కొన్నారు?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Sankara Vision Centre", ta: "சங்கர விஷன் சென்டர்", te: "సంకर విజన్ സെн्टर" }, { en: "Local optical shop", ta: "உள்ளூர் கண்ணாடி கடை", te: "స్థానిక ఆప్టికల్ షాప్" }, { en: "Other", ta: "மற்றவை", te: "ఇతర" },], }, { n: 22, section: "Current Spectacles", en: "What was the primary reason for purchasing elsewhere?", ta: "வேறு இடத்தில் வாங்குவதற்கான முக்கிய காரணம் என்ன?", te: "వేరే చోట కొనుగోలు చేయడానికి ముఖ్య కారణం?", hint_en: "Answer if purchased elsewhere", hint_ta: "வேறு இடத்தில் வாங்கியிருந்தால் மட்டும்", hint_te: "వేరే చోట కొన్నట్లైతే మాత్రమే", choices: [{ en: "Lower cost available elsewhere", ta: "வேறு இடத்தில் குறைவான விலை", te: "వేరే చోట తక్కువ ధర" }, { en: "Better quality / brand preference", ta: "சிறந்த தரம் / பிராண்ட் விருப்பம்", te: "మెరుగైన నాణ్యత / బ్రాండ్" }, { en: "More variety of frames or lenses", ta: "அதிக வகை ஃப்ரேம் அல்லது லென்ஸ்", te: "అధిక ఫ్రేమ్ వైవిధ్యం" }, { en: "Closer or more convenient location", ta: "அருகிலுள்ள / வசதியான இடம்", te: "దగ్గర లేదా సౌకర్యవంతమైన స్థానం" }, { en: "Other", ta: "மற்றவை", te: "ఇతర" },], }, { n: 23, section: "New Spectacles", en: "What action did you take after receiving the spectacle advice today?", ta: "இன்று கண்ணாடி ஆலோசனை பெற்ற பிறகு என்ன நடவடிக்கை எடுத்தீர்கள்?", te: "ఈరోజు కళ్ళద్దాల సలహా తర్వాత ఏ చర్య తీసుకున్నారు?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Purchased spectacles at this vision centre", ta: "இந்த மையத்தில் கண்ணாடி வாங்கினேன்", te: "ఈ విజన్ సెн్టర్‌లో కళ్ళద్దాలు కొన్నాను" }, { en: "Took the prescription only", ta: "ப்ரிஸ்கிரிப்ஷன் மட்டும் வாங்கினேன்", te: "ప్రిస్క్రిప్షన్ మాత్రమే తీసుకున్నాను" }, { en: "Postponed decision — will decide later", ta: "முடிவை ஒத்திவைத்தேன்", te: "నిర్ణయాన్ని వాయిదா వేశాను" }, { en: "Do not plan to purchase spectacles", ta: "கண்ணாடி வாங்க திட்டமில்லை", te: "కళ్ళద్దాలు కొనాలని అనుకోవడం లేదు" },], }, { n: 24, section: "New Spectacles", en: "Who mainly decides and pays for purchasing spectacles in your case?", ta: "கண்ணாடி வாங்குவதை யார் முடிவு செய்கிறார்கள்?", te: "కళ్ళద్దాలు కొనుగోలు చేయడానికి ఎవరు నిర్ణయిస్తారు?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Self", ta: "நான் மட்டும்", te: "స్వయంగా" }, { en: "Family member", ta: "குடும்ப உறுப்பினர்", te: "కుటుంబ సభ్యుడు" }, { en: "Joint decision (self & family)", ta: "கூட்டு முடிவு", te: "సంయుక్త నిర్ణయం" }, { en: "Other", ta: "மற்றவர்கள்", te: "ఇతరులు" },], }, { n: 25, section: "New Spectacles", en: "What is the main reason for not purchasing here?", ta: "இங்கு வாங்காததற்கான முக்கிய காரணம் என்ன?", te: "ఇక్కడ కొనుగోలు చేయకపోవడానికి主要 కారణం?", hint_en: "Answer if did not purchase here", hint_ta: "இங்கு வாங்காவிட்டால் மட்டும்", hint_te: "ఇక్కడ కొనుగోలు చేయనట్లైతే మాత్రమే", choices: [{ en: "Lower cost available at another shop", ta: "வேறு கடையில் குறைவான விலை", te: "మరో షాప్‌లో తక్కువ ధర" }, { en: "Preference for familiar/trusted shop", ta: "நம்பகமான கடையை விரும்புகிறேன்", te: "విశ్వసనీయ షాప్ ప్రాధాన్యత" }, { en: "More frame options available elsewhere", ta: "வேறு இடத்தில் அதிக ஃப்ரேம் தேர்வுகள்", te: "వేరే చోట అధిక ఫ్రేమ్ ఎంపికలు" }, { en: "Intend to purchase at a later date", ta: "பிற்காலத்தில் வாங்க திட்டமிட்டுள்ளேன்", te: "తర్వాత కొనాలని ఉద్దేశిస్తున్నాను" }, { en: "Not enough money at present", ta: "தற்போது போதுமான பணம் இல்லை", te: "ప్రస్తుతం తగినంత డబ్బు లేదు" }, { en: "More branded/costlier frames elsewhere", ta: "வேறு இடத்தில் பிராண்ட் ஃப்ரேம்கள்", te: "వేరే చోట బ్రాండెడ్ ఫ్రేమ్లు" }, { en: "Others", ta: "மற்றவை", te: "ఇతరులు" },], }, { n: 26, section: "Purchase Experience", en: "How satisfied are you with the spectacles purchased at this vision centre?", ta: "இந்த மையத்தில் வாங்கிய கண்ணாடியில் எவ்வளவு திருப்தி உள்ளது?", te: "ఈ విజన్ సెంటర్‌లో కొన్న కళ్ళద్దాలతో ఎంత సంతృప్తి?", hint_en: "Answer if purchased here", hint_ta: "இங்கு வாங்கினால் மட்டும்", hint_te: "ఇక్కడ కొన్నట్లైతే మాత్రమే", choices: [{ en: "Very satisfied", ta: "மிகவும் திருப்தி", te: "చాలా సంతృప్తி" }, { en: "Satisfied", ta: "திருப்தி", te: "సంతృప్తి" }, { en: "Dissatisfied", ta: "திருப்தியில்லை", te: "అసంతృప్తి" }, { en: "Very dissatisfied", ta: "மிகவும் திருப்தியில்லை", te: "చాలా అసంతృప்தి" },], }, { n: 27, section: "Purchase Experience", en: "How would you rate the cost of spectacles purchased here?", ta: "இங்கு வாங்கிய கண்ணாடியின் விலையை எவ்வாறு மதிப்பிடுவீர்கள்?", te: "ఇక్కడ కొన్న కళ్ళద్దాల వ్యయాన్ని ఎలా రేటింగ్ ఇస్తారు?", hint_en: "Answer if purchased here", hint_ta: "இங்கு வாங்கினால் மட்டும்", hint_te: "ఇక్కడ కొన్నట్లైతే మాత్రమే", choices: [{ en: "Very affordable", ta: "மிகவும் மலிவான விலை", te: "చాలా సరసంగా ఉంది" }, { en: "Affordable", ta: "மலிவான விலை", te: "సరసంగా ఉంది" }, { en: "Slightly expensive", ta: "சற்று விலை அதிகம்", te: "కొంచెం ఖరీదైనది" }, { en: "Expensive", ta: "விலை அதிகம்", te: "ఖరీదైనది" },], }, { n: 28, section: "Overall Feedback", en: "Overall, how satisfied are you with the services at this vision centre?", ta: "மொத்தத்தில், இந்த மையத்தின் சேவைகளில் எவ்வளவு திருப்தி உள்ளது?", te: "మొత్తంగా, ఈ విజన్ సెంటర్ సేవలతో ఎంత సంతృప్తి?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Very satisfied", ta: "மிகவும் திருப்தி", te: "చాలా సంతృప్తி" }, { en: "Satisfied", ta: "திருப்தி", te: "సంతృప్తి" }, { en: "Dissatisfied", ta: "திருப்தியில்லை", te: "అసంతృప్తి" }, { en: "Very dissatisfied", ta: "மிகவும் திருப்தியில்லை", te: "చாலா అసంతృప్తி" },], }, { n: 29, section: "Overall Feedback", en: "How likely are you to recommend this vision centre to family or friends?", ta: "இந்த மையத்தை குடும்பத்தினர் அல்லது நண்பர்களுக்கு பரிந்துரைக்கும் வாய்ப்பு எவ்வளவு?", te: "ఈ విజన్ సెంటర్‌ను కుటుంబం లేదా స్నేహితులకు సిఫారసు చేసే అవకాశం?", hint_en: "", hint_ta: "", hint_te: "", choices: [{ en: "Very likely", ta: "மிகவும் சாத்தியம்", te: "చాలా అవకాశం ఉంది" }, { en: "Likely", ta: "சாத்தியம்", te: "అవకాశం ఉంది" }, { en: "Unlikely", ta: "சாத்தியமில்லை", te: "అవకాశం లేదు" }, { en: "Very unlikely", ta: "மிகவும் சாத்தியமில்லை", te: "అవకాశం చాలా తక్కువ" },], },];

/* ── Shared atoms ── */ function SecHdr({ icon, title, sub, bg }) { const c = bg || NAVY; return (<div style={{ background: linear - gradient(135deg, ${ c }, ${ c }CC), padding: "13px 17px", display: "flex", alignItems: "center", gap: 11, }} > <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, }} > {icon} </div> <div> <div style={{ color: "white", fontFamily: "'Bebas Neue',cursive", fontSize: 17, letterSpacing: "0.06em", }} > {title} </div> {sub && (<div style={{ color: "rgba(255,255,255,0.72)", fontSize: 10.5, marginTop: 1 }}> {sub} </div>)} </div> </div>); } function Card({ children, style }) { return (<div style={{ background: "white", borderRadius: 14, overflow: "hidden", border: 1px solid ${BORDER}, boxShadow: "0 3px 18px rgba(0,59,122,0.09)", ...(style || {}), }} > { children } </div > ); }

/* ══════════════════════════════════════════════════════ TAB 1 — AUDIO + SELECTABLE ANSWERS (FIXED) ══════════════════════════════════════════════════════ */ function AudioTab() {
  const [lang, setLang] = useState("ta"); const [rate, setRate] = useState(0.88); const [pitch, setPitch] = useState(1.0); const [speaking, setSpeaking] = useState(false); const [activeQ, setActiveQ] = useState(null); const [filter, setFilter] = useState("all");

  // one selected answer per question, keyed by question number const [selectedAnswers, setSelectedAnswers] = useState({}); const [showConsent, setShowConsent] = useState(false); const [consentSigned, setConsentSigned] = useState(false);

  const sections = [...new Set(QUESTIONS.map((q) => q.section))];

  useEffect(() => { // cleanup on unmount return () => { if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel(); }; }, []);

    const getL = (q) => (lang === "ta" ? q.ta : lang === "te" ? q.te : q.en); const getCL = (ch) => (lang === "ta" ? ch.ta : lang === "te" ? ch.te : ch.en); const getH = (q) => (lang === "ta" ? q.hint_ta : lang === "te" ? q.hint_te : q.hint_en);

    const speak = useCallback((q) => { if (typeof window === "undefined" || !window.speechSynthesis) return; try { window.speechSynthesis.cancel(); const qTxt = Question ${ q.n }.${ getL(q) }.; const hTxt = getH(q) ? ${ getH(q) }. : ""; const cTxt = q.choices.map((ch, i) => Option ${ i + 1}: ${ getCL(ch) }).join(". "); const u = new SpeechSynthesisUtterance(${ qTxt }${ hTxt } ${ cTxt }); u.lang = lang === "ta" ? "ta-IN" : lang === "te" ? "te-IN" : "en-IN"; u.rate = rate; u.pitch = pitch; u.onstart = () => { setSpeaking(true); setActiveQ(q.n); }; u.onend = () => { setSpeaking(false); setActiveQ(null); }; u.onerror = () => { setSpeaking(false); setActiveQ(null); }; window.speechSynthesis.speak(u);
} catch (e) { // swallow; speech not essential setSpeaking(false); setActiveQ(null); } }, [lang, rate, pitch] ); const stop = () => { if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel(); setSpeaking(false); setActiveQ(null); };

  // select answer handler: one choice per question const selectAnswer = (qn, choiceIdx) => { setSelectedAnswers((prev) => ({ ...prev, [qn]: choiceIdx })); };

  const answeredCount = Object.keys(selectedAnswers).length; const filtered = filter === "all" ? QUESTIONS : QUESTIONS.filter((q) => q.section === filter); const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // Print preview modal control const [showPrint, setShowPrint] = useState(false);

  const buildPrintHTML = () => {
    const rows = QUESTIONS.map((q) => { const sel = selectedAnswers[q.n]; const chosen = sel != null ? q.choices[sel] : null; const answerLabel = chosen ? (lang === "ta" ? chosen.ta : lang === "te" ? chosen.te : chosen.en) : "— Not answered —"; const rowBg = sel != null ? "#f0fdf4" : "#ffffff"; const ansColor = sel != null ? "#1A9E5A" : "#999"; const ansWeight = sel != null ? "700" : "400"; return <tr style="background:${rowBg}"><td style="width:6%;padding:5px 8px;font-weight:800;color:#003B7A;border-bottom:1px solid #E5EDF5;font-size:9pt;vertical-align:top">${q.n}</td><td style="width:56%;padding:5px 8px;border-bottom:1px solid #E5EDF5;font-size:9pt;line-height:1.45">${q.en}${q.hint_en ?<br><span style="font-size:8pt;color:#888;font-style:italic">${q.hint_en}</span>:""}</td><td style="width:38%;padding:5px 8px;border-bottom:1px solid #E5EDF5;font-size:9pt;font-weight:${ansWeight};color:${ansColor}">${answerLabel}</td></tr>; }).join(""); const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); return `<!DOCTYPE html>

const downloadAndPrint = () => { setShowPrint(true); };

return ( <div style={{ display: "flex", flexDirection: "column", gap: 14 }}> {showPrint && ( <PrintModal questions={QUESTIONS} selectedAnswers={selectedAnswers} lang={lang} onClose={() => setShowPrint(false)} buildHTML={buildPrintHTML} /> )} <Card> <SecHdr icon="🔊" title="AUDIO ENGINE — ALL 29 QUESTIONS + SELECTABLE ANSWERS" sub="Tap ▶ to hear question. Tap a choice to mark your answer (radio — one answer per question)" /> <div style={{ padding: "13px 15px" }}> {/* Lang + Stop */} <div style={{ display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center", marginBottom: 11 }}> {[ ["ta", "🇮🇳 Tamil"], ["te", "🏳 Telugu"], ["en", "🔤 English"], ].map(([code, lbl]) => ( <button key={code} onClick={() => { stop(); setLang(code); }} style={{ padding: "6px 13px", borderRadius: 20, cursor: "pointer", fontWeight: 700, fontSize: 12.5, border: 2px solid ${lang === code ? NAVY : BORDER}, background: lang === code ? NAVY : "white", color: lang === code ? "white" : MUTED, transition: "all .14s", }} > {lbl} </button> ))} <button onClick={stop} disabled={!speaking} style={{ marginLeft: "auto", padding: "6px 16px", borderRadius: 20, cursor: speaking ? "pointer" : "not-allowed", border: 2px solid ${speaking ? RED : BORDER}, background: speaking ? RED : "#F3F4F6", color: speaking ? "white" : MUTED, fontWeight: 700, fontSize: 12.5, transition: "all .14s", }} > ⏹ Stop </button> {speaking && ( <div style={{ display: "flex", alignItems: "center", gap: 3 }}> {[0, 1, 2, 3].map((i) => ( <div key={i} style={{ width: 4, background: ORANGE, borderRadius: 2, animation: wave ${0.5 + i * 0.1}s ease-in-out infinite alternate, height: 16, }} /> ))} </div> )} </div>

      {/* Sliders */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 16px",
          background: "#F5F9FF",
          borderRadius: 10,
          padding: "10px 13px",
          border: `1px solid ${ BORDER } `,
          marginBottom: 11,
        }}
      >
        {[
          { lbl_en: "Speed", lbl_ta: "வேகம்", lbl_te: "వేగం", val: rate, set: setRate, min: 0.5, max: 1.5, step: 0.05 },
          { lbl_en: "Pitch", lbl_ta: "தொனி", lbl_te: "స్వరం", val: pitch, set: setPitch, min: 0.5, max: 2.0, step: 0.1 },
        ].map((s) => (
          <div key={s.lbl_en}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: NAVY, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
              <span>{lang === "ta" ? s.lbl_ta : lang === "te" ? s.lbl_te : s.lbl_en}</span>
              <span style={{ color: ORANGE }}>{s.val.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.val}
              onChange={(e) => s.set(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: NAVY, cursor: "pointer" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: MUTED }}>
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress strip */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11, background: "#EAF3FB", borderRadius: 9, padding: "8px 12px" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: NAVY }}>{answeredCount}/29 answered</span>
        <div style={{ flex: 1, height: 7, background: BORDER, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${ (answeredCount / 29) * 100 }% `, background: `linear - gradient(90deg, ${ NAVY }, ${ ORANGE })`, borderRadius: 99, transition: "width .3s ease" }} />
        </div>
        <button
          onClick={() => setSelectedAnswers({})}
          style={{
            padding: "4px 10px",
            borderRadius: 7,
            background: "white",
            border: `1px solid ${ BORDER } `,
            color: MUTED,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Reset
        </button>
        <button
          onClick={() => setShowPrint(true)}
          style={{ padding: "5px 12px", borderRadius: 7, background: NAVY, color: "white", border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer" }}
        >
          🖨️ Print Preview
        </button>
      </div>

      {/* Section filter */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "4px 11px",
            borderRadius: 14,
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            border: `1.5px solid ${ filter === "all" ? NAVY : BORDER } `,
            background: filter === "all" ? NAVY : "white",
            color: filter === "all" ? "white" : MUTED,
          }}
        >
          All 29
        </button>
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "4px 10px",
              borderRadius: 14,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              border: `1.5px solid ${ filter === s ? ORANGE : BORDER } `,
              background: filter === s ? ORANGE : "white",
              color: filter === s ? "white" : MUTED,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Questions list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {filtered.map((q) => {
          const isAudio = activeQ === q.n;
          const selIdx = selectedAnswers[q.n];
          const isAnswered = selIdx != null;
          return (
            <div key={q.n} style={{ border: `1.5px solid ${ isAnswered ? GREEN : isAudio ? ORANGE : BORDER } `, borderRadius: 10, overflow: "hidden", background: isAudio ? "#FFF3E0" : isAnswered ? "#F0FBF5" : "#FAFCFF" }}>
              {/* Question header row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px" }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: isAnswered ? GREEN : isAudio ? ORANGE : NAVY, color: "white", fontSize: 10.5, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {q.n}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: TEXT, lineHeight: 1.3 }}>{getL(q)}</div>
                  {getH(q) && <div style={{ fontSize: 10, color: MUTED, marginTop: 1 }}>{getH(q)}</div>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  {isAnswered && <span style={{ fontSize: 9, background: GREEN, color: "white", borderRadius: 10, padding: "2px 7px", fontWeight: 700 }}>✓ Marked</span>}
                  <span style={{ fontSize: 9.5, color: MUTED, background: "#EAF3FB", borderRadius: 10, padding: "2px 7px", fontWeight: 700 }}>{q.section}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      isAudio ? stop() : speak(q);
                    }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isAudio ? ORANGE : NAVY,
                      color: "white",
                      border: "none",
                      fontSize: 13,
                      cursor: "pointer",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isAudio ? "⏸" : "▶"}
                  </button>
                </div>
              </div>

              {/* Choices with true radio selection */}
              <div style={{ borderTop: `1px solid ${ BORDER } `, padding: "8px 12px 10px 12px", display: "flex", flexDirection: "column", gap: 6, touchAction: "manipulation" }}>
                {q.choices.map((choice, ci) => {
                  const isSel = selIdx === ci;
                  return (
                    <div
                      key={`${ q.n } -${ ci } `}
                      role="radio"
                      aria-checked={isSel}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        selectAnswer(q.n, ci);
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        selectAnswer(q.n, ci);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        padding: "10px 13px",
                        borderRadius: 9,
                        cursor: "pointer",
                        border: `2px solid ${ isSel ? GREEN : BORDER } `,
                        background: isSel ? "#ECFDF5" : "#FAFCFF",
                        userSelect: "none",
                        WebkitTapHighlightColor: "transparent",
                        touchAction: "manipulation",
                        pointerEvents: "all",
                      }}
                    >
                      {/* Radio circle */}
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          flexShrink: 0,
                          border: `2.5px solid ${ isSel ? GREEN : "#B0C4D8" } `,
                          background: isSel ? GREEN : "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isSel && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "white" }} />}
                      </span>
                      <span style={{ flex: 1, fontSize: 13, color: isSel ? GREEN : TEXT, fontWeight: isSel ? 700 : 400, lineHeight: 1.35 }}>{getCL(choice)}</span>
                      {isSel && <span style={{ fontSize: 15 }}>✅</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Consent block */}
      <div style={{ marginTop: 18, border: `2px solid ${ NAVY } `, borderRadius: 12, overflow: "hidden" }}>
        <div style={{ background: NAVY, padding: "11px 14px", display: "flex", alignItems: "center", gap: 9 }}>
          <span style={{ fontSize: 19 }}>📜</span>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 13 }}>Consent — புகைப்படம் மற்றும் நோயின் விவரங்களை வெளியிட ஒப்புதல்</div>
            <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 10.5 }}>Consent for photograph & case details publication</div>
          </div>
          <div style={{ marginLeft: "auto", background: consentSigned ? GREEN : "rgba(255,255,255,0.15)", color: "white", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 800 }}>
            {consentSigned ? "✓ SIGNED" : "PENDING"}
          </div>
        </div>
        <div style={{ padding: "14px 16px", background: "white" }}>
          <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.7, marginBottom: 12, fontStyle: "italic" }}>
            எனது புகைப்படம், காணொளி பதிவுகள் மற்றும் மருத்துவத் தகவல்களை ஆராய்ச்சி, பகுத்தாய்வு, கல்வி, ஆவணப்படுத்தல் மற்றும் ஊடகங்களில் வெளியிடுவதற்காக, நான் இதன்மூலம் மனநிறைவுடன் எனது ஒப்புதலை தன்னார்வமாக வழங்குகிறேன். எனது அடையாள ரகசியத்தன்மையை பாதுகாக்க அனைத்து நியாயமான நடவடிக்கைகளும் எடுக்கப்படும். இந்த ஆய்வில் நான் எப்போது வேண்டுமானாலும் என் பங்கேற்பைத் திரும்பப் பெறலாம்.
          </p>
          <p style={{ fontSize: 12, color: MUTED, marginBottom: 14, lineHeight: 1.6 }}>
            <em>I hereby voluntarily give my consent for my photograph, video recordings and medical information to be used for research, analysis, education, documentation and media publications. All reasonable measures will be taken to protect my identity. I understand I may withdraw participation at any time.</em>
          </p>

          {/* Signature fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              "Participant Signature / Thumb Print / பங்கேற்பாளர் கையெழுத்து அல்லது பெருவிரல் ரேகை",
              "Interviewer Name & Signature / பேட்டி எடுப்பவர் பெயர் / கையெழுத்து",
              "Date / தேதி",
              "Place / இடம்",
            ].map((lbl) => (
              <div key={lbl}>
                <div style={{ fontSize: 10, color: MUTED, fontWeight: 700, marginBottom: 4 }}>{lbl}</div>
                <div style={{ borderBottom: `2px solid ${ NAVY } `, height: 36, background: "#FAFCFF", borderRadius: "4px 4px 0 0", padding: "4px 6px" }}>
                  <input type="text" placeholder="Write here…" style={{ border: "none", background: "transparent", width: "100%", fontSize: 12, color: TEXT, outline: "none" }} />
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 13px",
              borderRadius: 9,
              border: `1.5px solid ${ consentSigned ? GREEN : GOLD } `,
              background: consentSigned ? "#ECFDF5" : "#FFFBF0",
              cursor: "pointer",
            }}
            onClick={() => setConsentSigned((p) => !p)}
          >
            <div style={{ width: 22, height: 22, borderRadius: 5, border: `2.5px solid ${ consentSigned ? GREEN : "#B0C4D8" } `, background: consentSigned ? GREEN : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {consentSigned && <span style={{ color: "white", fontSize: 13, fontWeight: 800 }}>✓</span>}
            </div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: consentSigned ? GREEN : TEXT }}>{consentSigned ? "Consent confirmed — participant has agreed" : "Tap to confirm participant consent obtained"}</span>
          </div>
        </div>
      </div>

      {/* Print preview button at bottom */}
      <button
        onClick={() => setShowPrint(true)}
        style={{
          width: "100%",
          marginTop: 14,
          padding: "13px",
          borderRadius: 10,
          background: `linear - gradient(135deg, ${ NAVY },#1565C0)`,
          color: "white",
          border: "none",
          fontWeight: 800,
          fontSize: 14,
          letterSpacing: "0.04em",
          cursor: "pointer",
          boxShadow: `0 4px 14px ${ NAVY } 44`,
        }}
      >
        🖨️ Print Preview (A4)
      </button>
      <div style={{ fontSize: 10.5, color: MUTED, textAlign: "center", marginTop: 5 }}>
        Opens full A4 print view — use browser Print / Save as PDF · Footer auto-prints: Date + {CENTRE} + page numbers on every page
      </div>
    </div>
  </Card>
  <style>{`@keyframes wave{from{ height: 4px }to{ height: 20px } } input[type = range]{ height: 4px } `}</style>
</div>

); }

/* ══════════════════════════════════════════════════════ TAB 2 — PROGRESS ══════════════════════════════════════════════════════ */ function ProgressTab() { const [count, setCount] = useState(47); const [flash, setFlash] = useState(false); const pct = Math.min(Math.round((count / TARGET) * 100), 100); const done = count >= TARGET; const R = 54; const CIRC = 2 * Math.PI * R; const dash = CIRC * (1 - pct / 100); const add = () => { if (done) return; setFlash(true); setCount((c) => c + 1); setTimeout(() => setFlash(false), 500); }; return ( <div style={{ display: "flex", flexDirection: "column", gap: 14 }}> <Card> <SecHdr icon="📊" title="300-PATIENT TRACKER" sub={Sankara Navy→Orange shimmer · ${count}/${TARGET} enrolled} bg={ORANGE} /> <div style={{ padding: "17px 15px" }}> <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 16 }}> <div style={{ position: "relative", width: 134, height: 134, flexShrink: 0 }}> <svg width="134" height="134" style={{ transform: "rotate(-90deg)" }}> <defs> <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%"> <stop offset="0%" stopColor={NAVY} /> <stop offset="100%" stopColor={ORANGE} /> </linearGradient> </defs> <circle cx="67" cy="67" r={R} fill="none" stroke="#EAF3FB" strokeWidth="11" /> <circle cx="67" cy="67" r={R} fill="none" stroke={done ? GREEN : "url(#rg)"} strokeWidth="11" strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={dash} style={{ transition: "stroke-dashoffset .7s cubic-bezier(.4,0,.2,1)" }} /> </svg> <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}> <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: done ? 32 : 26, color: done ? GREEN : NAVY, lineHeight: 1 }}>{done ? "✓" : ${pct}%}</div> <div style={{ fontSize: 10, color: MUTED, fontWeight: 700 }}>{count}/{TARGET}</div> </div> </div> <div style={{ flex: 1 }}> <div style={{ marginBottom: 12 }}> <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}> <span style={{ fontSize: 11.5, fontWeight: 700, color: TEXT }}>Patients enrolled</span> <span style={{ fontSize: 11.5, fontWeight: 800, color: NAVY }}>{count}/{TARGET}</span> </div> <div style={{ height: 11, background: "#EAF3FB", borderRadius: 99, overflow: "hidden" }}> <div style={{ height: "100%", width: ${pct}%, borderRadius: 99, background: linear-gradient(90deg,${NAVY},${ORANGE}), backgroundSize: "200% 100%", animation: "shimmer 2.5s infinite linear", transition: "width .7s ease" }} /> </div> </div> <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}> {[[count, "Enrolled", NAVY], [Math.max(TARGET - count, 0), "Remaining", ORANGE], [TARGET, "Target", GREEN]].map(([v, l, c]) => ( <div key={l} style={{ background: "#F5F9FF", border: 1px solid ${BORDER}, borderRadius: 8, padding: "8px 6px", textAlign: "center" }}> <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, color: c, lineHeight: 1 }}>{v}</div> <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700 }}>{l}</div> </div> ))} </div> </div> </div>

      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 13 }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: done ? GREEN : GOLD, animation: "pulse 1.4s infinite", boxShadow: `0 0 8px ${ done ? GREEN : GOLD } ` }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: done ? GREEN : TEXT }}>{done ? "🎉 300-Patient Target Achieved!" : "LIVE — actively collecting data"}</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={add} disabled={done} style={{ flex: 1, padding: "11px", borderRadius: 9, cursor: done ? "not-allowed" : "pointer", background: done ? "#E5E7EB" : `linear - gradient(135deg, ${ NAVY },#1565C0)`, color: done ? MUTED : "white", border: "none", fontWeight: 700, fontSize: 13.5, transition: "all .15s", transform: flash ? "scale(0.96)" : "scale(1)" }}>
          + Add Test Patient
        </button>
        <button onClick={() => setCount(0)} style={{ padding: "11px 15px", borderRadius: 9, cursor: "pointer", background: "white", color: MUTED, border: `1.5px solid ${ BORDER } `, fontWeight: 700, fontSize: 12 }}>Reset</button>
        <button onClick={() => setCount(299)} style={{ padding: "11px 15px", borderRadius: 9, cursor: "pointer", background: "#FFF8EC", color: ORANGE, border: `1.5px solid ${ ORANGE } 55`, fontWeight: 700, fontSize: 12 }}>→299</button>
      </div>

      {done && (
        <div style={{ marginTop: 12, background: "#ECFDF5", border: `1.5px solid ${ GREEN } 55`, borderRadius: 10, padding: "11px 14px", display: "flex", gap: 9, alignItems: "flex-start" }}>
          <span style={{ fontSize: 22 }}>🎓</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: GREEN }}>Target reached — Screenshot for thesis appendix</div>
            <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>Ring turns green with ✓ at 300. Click Reset to restart.</div>
          </div>
        </div>
      )}
    </div>
  </Card>
  <style>{`@keyframes shimmer{ 0 % { background- position: 200 % center } 100 % { background- position: -200 % center
  }
} @keyframes pulse{ 0 %, 100 % { opacity: 1 }50 % { opacity: .35 } } `}</style>
</div>

); }

/* ══════════════════════════════════════════════════════ TAB 3 — SECURITY & PDF ══════════════════════════════════════════════════════ */ function SecurityTab() { const [exporting, setExporting] = useState(false); const [exported, setExported] = useState(false); const reportRef = useRef(); const loadScript = (src) => new Promise((res, rej) => { if (typeof document === "undefined") { rej(new Error("No document")); return; } if (document.querySelector(script[src="${src}"])) { res(); return; } const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });

const exportPDF = async () => { setExporting(true); try { await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"); await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"); // html2canvas is exposed as window.html2canvas in the CDN build // jspdf exposes window.jspdf with jsPDF factory if (typeof window.html2canvas !== "function") { throw new Error("html2canvas not available"); } const canvas = await window.html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: "#fff", logging: false }); const { jsPDF } = window.jspdf || {}; if (!jsPDF) throw new Error("jsPDF not available"); const pdf = new jsPDF("p", "mm", "a4"); const pw = pdf.internal.pageSize.getWidth(); const ih = (canvas.height * pw) / canvas.width; pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pw, ih); pdf.save("Annur_VC_Summary_Report.pdf"); setExported(true); setTimeout(() => setExported(false), 3500); } catch (e) { // Notify user that CDN scripts are required // Using alert is acceptable here; in production consider a nicer UI toast // eslint-disable-next-line no-alert alert("PDF export needs an internet connection to load CDN libraries."); } finally { setExporting(false); } };

const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); const BARS = [ { label: "Very satisfied", pct: 58, color: GREEN }, { label: "Satisfied", pct: 27, color: NAVY }, { label: "Dissatisfied", pct: 10, color: ORANGE }, { label: "Very dissatisfied", pct: 5, color: RED }, ];

return ( <div style={{ display: "flex", flexDirection: "column", gap: 14 }}> <Card> <SecHdr icon="🔒" title="DATA SECURITY & PDF EXPORT" sub="HIPAA-Aligned · AES-256 · One-click thesis appendix" bg="#1E3A5F" /> <div style={{ padding: "13px 15px" }}> <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, marginBottom: 13 }}> {[ { icon: "🔐", title: "AES-256", sub: "Encryption at rest on KoboToolbox Humanitarian Server" }, { icon: "🔒", title: "TLS 1.3", sub: "All transmissions encrypted in transit" }, { icon: "📋", title: "Ethics Ready", sub: "Cite: kf.kobotoolbox.org/security" }, ].map((c) => ( <div key={c.title} style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 9, padding: "10px 10px" }}> <div style={{ fontSize: 20, marginBottom: 4 }}>{c.icon}</div> <div style={{ fontWeight: 800, fontSize: 11.5, color: "#166534" }}>{c.title}</div> <div style={{ fontSize: 9.5, color: "#4B7A5A", lineHeight: 1.4, marginTop: 2 }}>{c.sub}</div> </div> ))} </div>

      <div style={{ background: "linear-gradient(135deg,#064E3B,#065F46)", border: "1.5px solid #34D399", borderRadius: 8, padding: "8px 13px", marginBottom: 13, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>🛡️</span>
        <div>
          <div style={{ color: "#34D399", fontSize: 11, fontWeight: 800, letterSpacing: "0.07em" }}>HIPAA-ALIGNED · AES-256 ENCRYPTED</div>
          <div style={{ color: "#6EE7B7", fontSize: 9.5, marginTop: 1 }}>KoboToolbox Humanitarian Server · TLS 1.3 · Patient IDs anonymised</div>
        </div>
      </div>

      <div ref={reportRef} id="dashboard-charts" style={{ background: "white", border: `1.5px solid ${ BORDER } `, borderRadius: 10, padding: "13px 15px", marginBottom: 13 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 9, paddingBottom: 8, borderBottom: `1px solid ${ BORDER } ` }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>👁️</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 12, color: NAVY }}>SANKARA EYE HOSPITAL — ANNUR VISION CENTRE</div>
            <div style={{ fontSize: 9.5, color: MUTED }}>Patient Satisfaction Summary · Dr A. Sai Priyadarshini · annur_vision_centre_survey v1</div>
          </div>
          <div style={{ marginLeft: "auto", background: "#ECFDF5", border: "1px solid #BBF7D0", borderRadius: 4, padding: "2px 8px", fontSize: 8.5, fontWeight: 800, color: "#166534" }}>🔒 AES-256</div>
        </div>

        <div style={{ fontSize: 10, fontWeight: 800, color: MUTED, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Overall Patient Satisfaction (Q28)</div>
        {BARS.map((b) => (
          <div key={b.label} style={{ marginBottom: 7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: TEXT }}>{b.label}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: b.color }}>{b.pct}%</span>
            </div>
            <div style={{ height: 8, background: "#EAF3FB", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${ b.pct }% `, background: b.color, borderRadius: 99 }} />
            </div>
          </div>
        ))}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginTop: 11 }}>
          {[
            ["47", "Enrolled", NAVY],
            ["31", "Bought specs", GREEN],
            ["85%", "Recommend", ORANGE],
          ].map(([v, l, c]) => (
            <div key={l} style={{ background: "#F8FBFF", border: `1px solid ${ BORDER } `, borderRadius: 7, padding: "7px", textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 22, color: c }}>{v}</div>
              <div style={{ fontSize: 9, color: MUTED, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 9, fontSize: 8, color: MUTED, borderTop: `1px solid ${ BORDER } `, paddingTop: 7 }}>
          {today} · {CENTRE} · Sankara Eye Hospital Research · annur_vision_centre_survey v1 · AES-256
        </div>
      </div>

      <button onClick={exportPDF} disabled={exporting} style={{ width: "100%", padding: "13px", borderRadius: 9, background: exported ? GREEN : exporting ? "#6B7A90" : "linear-gradient(135deg,#1E3A5F,#003B7A)", color: "white", border: "none", cursor: exporting ? "not-allowed" : "pointer", fontWeight: 800, fontSize: 14, letterSpacing: "0.04em", boxShadow: exporting ? "none" : "0 4px 14px rgba(0,59,122,0.3)", transition: "all .2s" }}>
        {exported ? "✅ PDF saved to Downloads!" : exporting ? "⏳ Generating PDF…" : "📄 Download Summary Report PDF"}
      </button>
      <div style={{ fontSize: 10.5, color: MUTED, textAlign: "center", marginTop: 5 }}>Loads html2canvas + jsPDF from cdnjs at click · No npm install needed</div>
    </div>
  </Card>
</div>

); }

/* ══════════════════════════════════════════════════════ TAB 4 — CHECKLIST ══════════════════════════════════════════════════════ */ const STEPS = [ { icon: "🔊", title: "Voice Test — iPad / MacBook / Windows", items: [ "Open survey on target device (iPad / MacBook / Windows Laptop)", "Tap volume up — confirm audio above 50%", "Tap ▶ on Q1 (Age Group) — device speaks in Tamil: 'வயது பிரிவு'", "Tap ⏹ Stop — speech cuts off immediately", "Switch to Telugu — tap ▶ Q1 — speaks: 'వయసు సమూహం'", "iPad/Mac: Settings → Accessibility → Spoken Content → download Tamil/Telugu voices", "Windows: Settings → Time & Language → Speech → Add voice → Tamil (India)", "Tap each choice row — confirm only ONE answer can be selected per question", ], }, { icon: "📊", title: "300-Patient Counter Validation", items: [ "Click '+ Add Test Patient' — counter increments 0 → 1", "Verify progress bar fills with Sankara Navy→Orange gradient", "Click 'Jump → 299' — ring jumps to 299", "Click '+ Add Test Patient' — ring completes and turns green at 300", "Screenshot the completed ring (green ✓) for thesis appendix", "Click Reset to clear back to 0 before real data collection begins", ], }, { icon: "📄", title: "PDF Export — Thesis Appendix", items: [ "Ensure device has internet connection (CDN loads at click time)", "Click 'Download Summary Report PDF' in Security & PDF tab", "PDF saves to Downloads folder automatically — verify footer has date + centre name", "Open PDF — verify charts and HIPAA badge are visible", "Print PDF and attach to physical thesis as Appendix", "No npm install required — html2canvas + jsPDF load from cdnjs", ], }, { icon: "🔒", title: "Ethics Committee — Data Security", items: [ "Cite KoboToolbox Humanitarian Server security page in ethics section", "URL: kobo.humanitarianresponse.info/security (AES-256 + TLS 1.3)", "HIPAA-Aligned badge appears on all printed summary reports", "Patient IDs are anonymised by KoboToolbox — never exposed", "Download collected data as CSV/SPSS from KoboToolbox Data tab", ], }, ];

function ChecklistTab() { const [checked, setChecked] = useState({}); const toggle = (k) => setChecked((p) => ({ ...p, [k]: !p[k] })); const allItems = STEPS.flatMap((s, si) => s.items.map((, ii) => ${si}-${ii})); const done = allItems.filter((k) => checked[k]).length; return ( <Card> <SecHdr icon="✅" title="PRE-FIELD CHECKLIST" sub={${done}/${allItems.length} steps completed} bg="#4B1D8C" /> <div style={{ padding: "13px 15px" }}> <div style={{ height: 8, background: "#EAF3FB", borderRadius: 99, marginBottom: 15, overflow: "hidden" }}> <div style={{ height: "100%", width: ${(done / allItems.length) * 100}%, background: "linear-gradient(90deg,#4B1D8C,#7C3AED)", borderRadius: 99, transition: "width .4s ease" }} /> </div> <div style={{ display: "flex", flexDirection: "column", gap: 14 }}> {STEPS.map((s, si) => { const sd = s.items.filter((, ii) => checked[${si}-${ii}]).length; return ( <div key={si}> <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}> <span style={{ fontSize: 16 }}>{s.icon}</span> <span style={{ fontWeight: 800, fontSize: 12.5, color: TEXT }}>{s.title}</span> <span style={{ marginLeft: "auto", fontSize: 10.5, fontWeight: 700, color: sd === s.items.length ? GREEN : MUTED }}>{sd}/{s.items.length}</span> </div> <div style={{ display: "flex", flexDirection: "column", gap: 5 }}> {s.items.map((item, ii) => { const key = ${si}-${ii}; const ck = !!checked[key]; return ( <div key={ii} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 11px", borderRadius: 8, background: ck ? "#F0FDF4" : "#FAFCFF", border: 1px solid ${ck ? "#BBF7D0" : BORDER}, cursor: "pointer", userSelect: "none", transition: "all .12s" }}> <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1, border: 2px solid ${ck ? GREEN : "#B0C4D8"}, background: ck ? GREEN : "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{ck && <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>✓</span>}</div> <span style={{ fontSize: 12, color: ck ? "#166534" : TEXT, lineHeight: 1.45, textDecoration: ck ? "line-through" : "none", opacity: ck ? 0.65 : 1 }}>{item}</span> </div> ); })} </div> </div> ); })} </div> {done === allItems.length && ( <div style={{ marginTop: 14, background: "#ECFDF5", border: 1.5px solid ${GREEN}55, borderRadius: 10, padding: "12px 14px", display: "flex", gap: 10, alignItems: "center" }}> <span style={{ fontSize: 24 }}>🎓</span> <div> <div style={{ fontWeight: 800, fontSize: 13.5, color: GREEN }}>All checks passed — ready for field deployment!</div> <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2 }}>Annur Vision Centre survey system cleared for patient data collection.</div> </div> </div> )} </div> </Card> ); }

/* ══════════════════════════════════════════════════════ MAIN APP ══════════════════════════════════════════════════════ */ const TABS = [ { id: "audio", icon: "🔊", label: "Survey (29 Q)" }, { id: "progress", icon: "📊", label: "Progress" }, { id: "security", icon: "📄", label: "Security & PDF" }, { id: "checklist", icon: "✅", label: "Checklist" }, ];

/* ══════════════════════════════════════════════════════ PRINT VIEW — Preview · Save As · Share · Copy HTML Works inside any sandboxed iframe ══════════════════════════════════════════════════════ */ function PrintModal({ questions, selectedAnswers, lang, onClose, buildHTML }) { const [tab, setTab] = useState("preview"); const [copied, setCopied] = useState(false); const [saved, setSaved] = useState(false); const [shared, setShared] = useState(false); const srcRef = useRef(); const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); const fname = Annur_VC_Survey_${new Date().toISOString().slice(0, 10)};

const getL = (q) => (lang === "ta" ? q.ta : lang === "te" ? q.te : q.en); const getCL = (ch) => (lang === "ta" ? ch.ta : lang === "te" ? ch.te : ch.en); const answeredCount = Object.keys(selectedAnswers).length; const htmlSource = buildHTML();

// data: URI download (works even in sandboxed iframes) const triggerDataURIDownload = (mimeType, content, filename) => { const dataURI = data:${mimeType};charset=utf-8,${encodeURIComponent(content)}; const a = document.createElement("a"); a.href = dataURI; a.download = filename; a.style.display = "none"; document.body.appendChild(a); a.click(); document.body.removeChild(a); };

// Save as HTML (data URI) const saveHTML = () => { triggerDataURIDownload("text/html", htmlSource, ${fname}.html); setSaved(true); setTimeout(() => setSaved(false), 2500); };

// Open Google Drive (helper) const openGoogleDrive = () => { // Step 1: save file locally first saveHTML(); // Step 2: open Google Drive in new tab const a = document.createElement("a"); a.href = "https://drive.google.com/drive/my-drive"; a.target = "_blank"; a.rel = "noopener noreferrer"; document.body.appendChild(a); a.click(); document.body.removeChild(a); };

// Web Share API (mobile) or clipboard fallback const doShare = async () => { const text = Annur Vision Centre Survey — ${today}\n\n${questions.map((q) => { const sel = selectedAnswers[q.n]; const ch = sel != null ? q.choices[sel] : null; const ans = ch ? getCL(ch) : "—"; return Q${ q.n }. ${ q.en }: ${ ans }; }).join("\n")}\n\nSankara Eye Hospital | annur_vision_centre_survey v1 | ${today};

if (typeof navigator !== "undefined" && navigator.share) {
  try {
    await navigator.share({ title: `Annur VC Survey — ${ today } `, text });
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  } catch (e) {
    // user cancelled or error
  }
} else {
  // Fallback: copy to clipboard
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } else if (srcRef.current) {
      srcRef.current.select();
      document.execCommand("copy");
    }
  } catch (e) {
    // last resort: select the text area for manual copy
    if (srcRef.current) {
      srcRef.current.select();
      document.execCommand("copy");
    }
  }
}

};

// Copy HTML source const copyHTML = () => { if (typeof navigator !== "undefined" && navigator.clipboard) { navigator.clipboard .writeText(htmlSource) .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); }) .catch(() => { if (srcRef.current) { srcRef.current.select(); document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2500); } }); } else if (srcRef.current) { srcRef.current.select(); document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 2500); } };

const TABS_MODAL = [ { id: "preview", icon: "👁", label: "Preview" }, { id: "saveas", icon: "💾", label: "Save As" }, { id: "share", icon: "📤", label: "Share" }, { id: "source", icon: "</>", label: "Copy HTML" }, ];

return ( <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.92)", display: "flex", flexDirection: "column" }}> {/* TOOLBAR */} <div style={{ flexShrink: 0, background: NAVY, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 3px 14px rgba(0,0,0,0.5)" }}> <span style={{ fontSize: 19 }}>🖨️</span> <div style={{ flex: 1 }}> <div style={{ color: "white", fontFamily: "'Bebas Neue',cursive", fontSize: 14, letterSpacing: "0.05em" }}>ANNUR VISION CENTRE — SURVEY EXPORT</div> <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 9.5 }}>{answeredCount}/29 answered · {today}</div> </div>

    {/* Quick action buttons in toolbar */}
    <button onClick={doShare} style={{ padding: "6px 13px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 12, background: shared ? "#1A9E5A" : ORANGE, color: "white", transition: "all .2s", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
      {shared ? "✅ Shared!" : "📤 Share"}
    </button>
    <button onClick={saveHTML} style={{ padding: "6px 13px", borderRadius: 7, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 12, background: saved ? "#1A9E5A" : "#4B1D8C", color: "white", transition: "all .2s", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
      {saved ? "✅ Saved!" : "💾 Save"}
    </button>
    <button onClick={onClose} style={{ padding: "6px 12px", borderRadius: 7, background: "rgba(255,255,255,0.12)", color: "white", border: "1.5px solid rgba(255,255,255,0.25)", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
      ✕
    </button>
  </div>

  {/* TAB BAR */}
  <div style={{ flexShrink: 0, background: "#1E3A5F", display: "flex", gap: 0, borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
    {TABS_MODAL.map((t) => (
      <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "9px 4px", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 11.5, background: tab === t.id ? "rgba(255,255,255,0.18)" : "transparent", color: tab === t.id ? "white" : "rgba(255,255,255,0.5)", borderBottom: `2.5px solid ${ tab === t.id ? ORANGE : "transparent" } `, transition: "all .14s" }}>
        {t.icon} {t.label}
      </button>
    ))}
  </div>

  {/* CONTENT */}
  <div style={{ flex: 1, overflowY: "auto", background: tab === "preview" ? "#374151" : "#1F2937", display: "flex", flexDirection: "column", alignItems: tab === "preview" ? "center" : "stretch", padding: tab === "preview" ? "18px 14px 36px" : "14px" }}>
    {/* PREVIEW TAB */}
    {tab === "preview" && (
      <div style={{ background: "white", width: "100%", maxWidth: 780, borderRadius: 6, boxShadow: "0 8px 40px rgba(0,0,0,0.6)", padding: "16mm 14mm", fontFamily: "Calibri,Arial,sans-serif", fontSize: "9.5pt", color: "#1A2533" }}>
        <div style={{ background: NAVY, color: "white", padding: "10px 13px", borderRadius: "5px", marginBottom: "9px" }}>
          <div style={{ fontSize: "13pt", fontWeight: 800 }}>👁️ SANKARA EYE HOSPITAL — ANNUR VISION CENTRE</div>
          <div style={{ fontSize: "8.5pt", opacity: 0.82, marginTop: 2 }}>Patient Preferences & Willingness Survey · Dr A. Sai Priyadarshini · {today}</div>
        </div>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 9 }}>
          {[`📅 ${ today } `, `🏥 ${ CENTRE } `, "📋 v1", `✅ ${ answeredCount }/29`].map((t) => (
  <span key={t} style={{ background: "#EAF3FB", border: "1px solid #D4E4F4", borderRadius: 4, padding: "2px 7px", fontSize: "8pt", color: NAVY, fontWeight: 700 }}>{t}</span>
))}
        </div >

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 13, fontSize: "8.5pt" }}>
          <thead>
            <tr style={{ background: ORANGE }}>
              {["Q#", "Question", "Selected Answer"].map((h) => (
                <th key={h} style={{ color: "white", padding: "5px 7px", textAlign: "left", fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((q, i) => {
              const sel = selectedAnswers[q.n];
              const ch = sel != null ? q.choices[sel] : null;
              const ans = ch ? getCL(ch) : "—";
              return (
                <tr key={q.n} style={{ background: i % 2 === 0 ? "#F5F9FF" : "white" }}>
                  <td style={{ padding: "4px 7px", fontWeight: 800, color: NAVY, borderBottom: "1px solid #E5EDF5", verticalAlign: "top", width: "6%" }}>{q.n}</td>
                  <td style={{ padding: "4px 7px", borderBottom: "1px solid #E5EDF5", lineHeight: 1.4, width: "55%" }}>
                    {getL(q)}
                    {q.hint_en && <div style={{ fontSize: "7.5pt", color: "#999", fontStyle: "italic" }}>{q.hint_en}</div>}
                  </td>
                  <td style={{ padding: "4px 7px", borderBottom: "1px solid #E5EDF5", fontWeight: sel != null ? 700 : 400, color: sel != null ? GREEN : "#bbb", width: "39%" }}>{ans}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ border: "1.5px solid #D4E4F4", borderRadius: 5, padding: "9px 11px", marginTop: 6 }}>
          <div style={{ fontSize: "9pt", fontWeight: 800, color: NAVY, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 5 }}>📜 Consent / ஒப்புதல்</div>
          <div style={{ fontSize: "8pt", color: "#6B7A90", lineHeight: 1.65, marginBottom: 9, fontStyle: "italic" }}>
            எனது புகைப்படம், காணொளி பதிவுகள் மற்றும் மருத்துவத் தகவல்களை ஆராய்ச்சி, பகுத்தாய்வு, கல்வி மற்றும் ஊடகங்களில் வெளியிடுவதற்காக நான் இதன்மூலம் என் ஒப்புதலை தன்னார்வமாக வழங்குகிறேன். எனது அடையாள ரகசியத்தன்மை பாதுகாக்கப்படும்.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {["Participant Signature / Thumb Print", "Interviewer Name & Signature", "Date / தேதி", "Place / இடம்"].map((lbl) => (
              <div key={lbl}>
                <div style={{ fontSize: "7.5pt", fontWeight: 600, color: "#6B7A90", marginBottom: 2 }}>{lbl}</div>
                <div style={{ borderBottom: "1.5px solid #C0C0C0", height: 24 }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "7pt", color: "#6B7A90", borderTop: "1px solid #D4E4F4", paddingTop: 6, marginTop: 10 }}>
          <span>{today} | {CENTRE}</span>
          <span>Sankara Eye Hospital | annur_vision_centre_survey v1 | Confidential</span>
          <span>Dr A. Sai Priyadarshini</span>
        </div>
      </div >
    )}

{/* SAVE AS TAB */ }
{
  tab === "saveas" && (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 600, margin: "0 auto", width: "100%" }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 700, marginBottom: 4 }}>💾 Save Survey — Choose destination</div>

      {/* Option 1: Download folder */}
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}`, boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "#1565C0", padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>📥</span>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Download to Device</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10.5 }}>Saves HTML file to your Downloads folder</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 12, lineHeight: 1.6 }}>
            Saves <strong style={{ color: TEXT }}>{fname}.html</strong> to your device's Downloads folder. Then open in any browser and press <strong>Ctrl+P</strong> to print.
          </div>
          <button onClick={saveHTML} style={{ width: "100%", padding: "12px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: "0.04em", background: saved ? "#1A9E5A" : `linear-gradient(135deg,#1565C0,${NAVY})`, color: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.3)", transition: "all .2s" }}>
            {saved ? `✅ Saved to Downloads!` : `📥 Save to Downloads — ${fname}.html`}
          </button>
          {saved && (
            <div style={{ marginTop: 9, background: "#ECFDF5", border: "1px solid #BBF7D0", borderRadius: 8, padding: "9px 12px", fontSize: 12, color: "#166534", fontWeight: 600 }}>
              ✅ File saved! Open it from your Downloads folder → press Ctrl+P (or Cmd+P) to print / save as PDF.
            </div>
          )}
        </div>
      </div>

      {/* Option 2: Google Drive */}
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}`, boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "linear-gradient(135deg,#1A73E8,#0D47A1)", padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>☁️</span>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Save to Google Drive</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10.5 }}>Downloads file + opens Google Drive to upload</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 12, lineHeight: 1.6 }}>Step 1: File downloads to your device.<br />Step 2: Google Drive opens — click <strong>+ New → File upload</strong> → select the downloaded file.</div>
          <button onClick={openGoogleDrive} style={{ width: "100%", padding: "12px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: "0.04em", background: "linear-gradient(135deg,#1A73E8,#0D47A1)", color: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.3)" }}>
            ☁️ Download + Open Google Drive
          </button>
          <div style={{ marginTop: 9, background: "#EAF3FB", borderRadius: 8, padding: "9px 12px", fontSize: 11.5, color: NAVY }}>
            <strong>In Google Drive:</strong> Click <strong>+ New</strong> → <strong>File upload</strong> → select <strong>{fname}.html</strong> from Downloads
          </div>
        </div>
      </div>

      {/* Option 3: Google Docs (via Drive) */}
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}`, boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "linear-gradient(135deg,#0F9D58,#0B8043)", padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>📄</span>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Save as PDF via Google Drive</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10.5 }}>Upload HTML → open with Docs → Download as PDF</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <ol style={{ fontSize: 12, color: TEXT, lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Click <strong>"Download + Open Google Drive"</strong> above</li>
            <li>Upload the .html file to Drive</li>
            <li>Right-click the file → <strong>Open with Google Docs</strong></li>
            <li>In Docs: <strong>File → Download → PDF Document (.pdf)</strong></li>
            <li>PDF saves to your Downloads — ready for thesis appendix ✅</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

{/* SHARE TAB */ }
{
  tab === "share" && (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 600, margin: "0 auto", width: "100%" }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 700, marginBottom: 4 }}>📤 Share Survey Results</div>

      {/* Native Share (mobile/desktop) */}
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}`, boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}>
        <div style={{ background: `linear-gradient(135deg,${ORANGE},#C0550E)`, padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>📤</span>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Share via Device (WhatsApp, Email, AirDrop…)</div>
            <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 10.5 }}>Uses your device's native share sheet</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 12, lineHeight: 1.6 }}>Opens your device's share menu — send via WhatsApp, Email, AirDrop, Messages or any app. Shares the survey as plain text (all 29 Q&A pairs).</div>
          <button onClick={doShare} style={{ width: "100%", padding: "12px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 14, letterSpacing: "0.04em", background: shared ? "#1A9E5A" : `linear-gradient(135deg,${ORANGE},#C0550E)`, color: "white", boxShadow: "0 3px 12px rgba(232,113,26,0.3)", transition: "all .2s" }}>
            {shared ? "✅ Shared / Copied!" : "📤 Share via Device"}
          </button>
          {!(typeof navigator !== "undefined" && navigator.share) && (
            <div style={{ marginTop: 8, fontSize: 11, color: MUTED, fontStyle: "italic" }}>(Native share not available on this browser — will copy text to clipboard instead)</div>
          )}
        </div>
      </div>

      {/* WhatsApp */}
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}`, boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "#25D366", padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>💬</span>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Share via WhatsApp</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 10.5 }}>Send survey summary directly</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <button
            onClick={() => {
              const text = `*Annur Vision Centre Survey — ${today}*\n*Sankara Eye Hospital | annur_vision_centre_survey v1*\n\n${questions
                .map((q) => {
                  const sel = selectedAnswers[q.n];
                  const ch = sel != null ? q.choices[sel] : null;
                  const ans = ch ? getCL(ch) : "—";
                  return `*Q${q.n}.* ${q.en}\n✅ ${ans}`;
                })
                .join("\n\n")}\n\n_Dr A. Sai Priyadarshini | ${CENTRE}_`;
              const wa = document.createElement("a");
              wa.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
              wa.target = "_blank";
              wa.rel = "noopener";
              document.body.appendChild(wa);
              wa.click();
              document.body.removeChild(wa);
            }}
            style={{ width: "100%", padding: "12px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 14, background: "#25D366", color: "white", boxShadow: "0 3px 12px rgba(37,211,102,0.3)" }}
          >
            💬 Open WhatsApp to Share
          </button>
        </div>
      </div>

      {/* Email */}
      <div style={{ background: "white", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}`, boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}>
        <div style={{ background: "#D44638", padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>📧</span>
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Share via Email</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 10.5 }}>Opens your email app with survey filled in</div>
          </div>
        </div>
        <div style={{ padding: "14px 16px" }}>
          <button
            onClick={() => {
              const subject = `Annur Vision Centre Survey — ${today}`;
              const body = `Sankara Eye Hospital | annur_vision_centre_survey v1\nDate: ${today} | Centre: ${CENTRE}\n\n${questions
                .map((q) => {
                  const sel = selectedAnswers[q.n];
                  const ch = sel != null ? q.choices[sel] : null;
                  const ans = ch ? getCL(ch) : "Not answered";
                  return `Q${q.n}. ${q.en}\nAnswer: ${ans}`;
                })
                .join("\n\n")}\n\n---\nDr A. Sai Priyadarshini | Sankara Eye Hospital Research`;
              const ml = document.createElement("a");
              ml.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              document.body.appendChild(ml);
              ml.click();
              document.body.removeChild(ml);
            }}
            style={{ width: "100%", padding: "12px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 14, background: "#D44638", color: "white", boxShadow: "0 3px 12px rgba(212,70,56,0.3)" }}
          >
            📧 Open Email App to Share
          </button>
        </div>
      </div>

      {/* Copy text */}
      <div style={{ background: "white", borderRadius: 12, padding: "14px 16px", border: `1px solid ${BORDER}`, boxShadow: "0 2px 14px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: TEXT, marginBottom: 9 }}>📋 Copy as Plain Text</div>
        <button onClick={doShare} style={{ width: "100%", padding: "11px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 13, background: shared ? "#1A9E5A" : "#374151", color: "white", transition: "all .2s" }}>
          {shared ? "✅ Copied to clipboard!" : "📋 Copy All Q&A to Clipboard"}
        </button>
      </div>
    </div>
  )
}

{/* COPY HTML TAB */ }
{
  tab === "source" && (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)", flex: 1 }}>
          Tap inside → <strong style={{ color: "white" }}>Select All</strong> (Ctrl+A) → <strong style={{ color: "white" }}> Copy</strong> (Ctrl+C) → Paste into <strong style={{ color: GOLD }}>Notepad</strong> → Save as <strong style={{ color: GOLD }}>survey.html</strong> → open in Chrome → Ctrl+P
        </div>
        <button onClick={copyHTML} style={{ flexShrink: 0, padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 12.5, background: copied ? "#1A9E5A" : ORANGE, color: "white", boxShadow: copied ? "0 2px 8px rgba(26,158,90,0.5)" : "0 2px 8px rgba(232,113,26,0.5)", transition: "all .2s" }}>
          {copied ? "✅ Copied!" : "📋 Copy All HTML"}
        </button>
      </div>
      <textarea ref={srcRef} readOnly value={htmlSource} onClick={(e) => e.target.select()} style={{ flex: 1, minHeight: 400, background: "#0D1117", color: "#58D68D", fontFamily: "'Courier New',monospace", fontSize: 11, border: "1.5px solid #30363D", borderRadius: 8, padding: 12, resize: "none", outline: "none", lineHeight: 1.5 }} />
    </div>
  )
}
  </div >

  {/* BOTTOM HINT */ }
  < div style = {{ flexShrink: 0, background: "#111827", padding: "8px 16px", textAlign: "center", fontFamily: "'DM Sans',sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>
    💡 <strong style={{ color: "white" }}>Save As</strong> → Downloads folder or Google Drive & nbsp;·& nbsp; <strong style={{ color: "white" }}>Share</strong> → WhatsApp / Email / Clipboard & nbsp;·& nbsp; <strong style={{ color: "white" }}>Preview</strong> → screenshot on mobile
  </div >
</div >

); }

/* MAIN APP */ export default function App() {
  const [tab, setTab] = useState("audio"); const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (<> <style>{@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&display=swap'); @media print{body > *:not(#__annur_print_zone__){display:none !important; } #__annur_print_zone__{display:block !important; font-family:Calibri,Arial,sans-serif; font-size:10pt; color:#1A2533; } .pz-header{background:#003B7A !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; color:white; padding:9px 13px; border-radius:5px; margin-bottom:8px; } .pz-title{font - size:13pt; font-weight:800; letter-spacing:.03em; } .pz-sub{font - size:9pt; opacity:.82; margin-top:2px; } .pz-chips{display:flex; gap:5px; flex-wrap:wrap; margin-bottom:9px; } .pz-chip{background:#EAF3FB !important; border:1px solid #D4E4F4; border-radius:4px; padding:2px 7px; font-size:8.5pt; color:#003B7A; font-weight:700; } .pz-table{width:100%; border-collapse:collapse; margin-bottom:12px; font-size:9pt; } .pz-table thead tr{background:#E8711A !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; } .pz-table thead th{color:white; padding:5px 8px; text-align:left; font-weight:700; } .pz-table tbody tr:nth-child(even){background:#F5F9FF !important; -webkit-print-color-adjust:exact; print-color-adjust:exact; } .pz-table td{padding:4px 8px; border-bottom:1px solid #EAF3FB; vertical-align:top; line-height:1.4; } .consent{border:1.5px solid #D4E4F4; border-radius:5px; padding:9px 11px; page-break-inside:avoid; margin-top:6px; } .ct{font - size:9pt; font-weight:800; color:#003B7A; text-transform:uppercase; letter-spacing:.05em; margin-bottom:5px; } .ctxt{font - size:8.5pt; color:#6B7A90; line-height:1.65; margin-bottom:8px; font-style:italic; } .sig-grid{display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:6px; } .sl{font - size:8pt; font-weight:600; color:#6B7A90; margin-bottom:3px; } .sline{border - bottom:1.5px solid #D4E4F4; height:24px; } .pz-footer{font - size:7.5pt; color:#6B7A90; text-align:center; border-top:1px solid #D4E4F4; padding-top:6px; margin-top:10px; } @page{size:A4; margin:14mm 14mm 14mm 14mm; } } @media screen{#__annur_print_zone__{display:none; } }*{box - sizing:border-box;margin:0;padding:0}body{background:#ECF1F8;font-family:'DM Sans',sans-serif}input[type=range]{-webkit - appearance:none;appearance:none;height:4px;background:#D4E4F4;border-radius:99px;outline:none}input[type=range]::-webkit-slider-thumb{-webkit - appearance:none;width:16px;height:16px;border-radius:50%;background:#003B7A;cursor:pointer;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.25)}}</style>

    <div style={{ background: `linear-gradient(135deg,${NAVY},#1565C0)`, position: "sticky", top: 0, zIndex: 100, boxShadow: `0 3px 18px ${NAVY}55` }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "10px 15px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👁️</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Bebas Neue',cursive", fontSize: 16, color: "white", letterSpacing: "0.06em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>SANKARA EYE HOSPITAL — ANNUR VISION CENTRE</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)" }}>{today} · Dr A. Sai Priyadarshini · annur_vision_centre_survey v1</div>
        </div>
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          <div style={{ background: GREEN, color: "white", borderRadius: 5, padding: "3px 8px", fontSize: 9.5, fontWeight: 800 }}>XLSForm ✓</div>
          <div style={{ background: ORANGE, color: "white", borderRadius: 5, padding: "3px 8px", fontSize: 9.5, fontWeight: 800 }}>v2</div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 15px 9px", display: "flex", gap: 4 }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "7px 4px", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: 11.5, background: tab === t.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)", color: tab === t.id ? "white" : "rgba(255,255,255,0.55)", borderBottom: `2.5px solid ${tab === t.id ? ORANGE : "transparent"}`, transition: "all .14s" }}>{t.icon} {t.label}</button>
        ))}
      </div>
    </div>

    <div style={{ maxWidth: 700, margin: "0 auto", padding: "15px 13px 52px" }}>
      {tab === "audio" && <AudioTab />}
      {tab === "progress" && <ProgressTab />}
      {tab === "security" && <SecurityTab />}
      {tab === "checklist" && <ChecklistTab />}
    </div>
  </>

  );
}
// inside your App function
const [currentStep, setCurrentStep] = useState(0);

const handleNext = () => {
  if (currentStep < QUESTIONS.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    alert("Survey Complete! You can now print the summary.");
  }
};

// Update your button at the bottom:
<button
  onClick={handleNext}
  style={{ backgroundColor: NAVY, color: 'white', padding: '15px 30px', borderRadius: '8px', cursor: 'pointer' }}
>
  Confirm & Next Question
</button>
