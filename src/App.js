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
  { n: 3, section:“Demographics”, en:“Education”, ta:“கல்வி தகுதி”, te:“విద్యా అర్హత”, hint_en:“Highest level completed”, hint_ta:“முடித்த உயர்ந்த கல்வி நிலை”, hint_te:“పూర్తి చేసిన అత్యధిక స్థాయి”, choices: [{ en:“No formal education / Illiterate”, ta:“முறையான கல்வி இல்லை”, te:“అక్షరజ్ఞానం లేదు”}, { en:“Primary(up to Class 5)”, ta:“ஆரம்ப கல்வி(வகுப்பு 5 வரை)”, te:“ప్రాథమిక(5వ తరగతి వరకు)” }, { en:“Secondary(Classes 6–10)”, ta:“இடைநிலை(வகுப்பு 6–10)”, te:“మాధ్యమిక(6–10 తరగతి)” }, { en:“Higher Secondary / Diploma”, ta:“மேல்நிலை / டிப்லோமா”, te:“హయ్యర్ సెకండరీ / డిప్లొమా” }, { en:“Graduate & above”, ta:“பட்டதாரி மற்றும் அதற்கு மேல்”, te:“పట్టభద్రుడు & అంతకు పైగా” }]},
{ n: 4, section:“Demographics”, en:“Occupation”, ta:“தொழில்”, te:“వృత్తి”, hint_en:“Most applicable category”, hint_ta:“பொருந்தும் வகை”, hint_te:“అత్యంత వర్తించే వర్గం”, choices: [{ en:“Housewife”, ta:“இல்லத்தரசி”, te:“గృహిణి”}, { en:“Student”, ta:“மாணவர்”, te:“విద్యార్థి” }, { en:“Dependent / Retired / Pensioner”, ta:“ஓய்வுபெற்றவர்”, te:“రిటైర్డ్ / పెన్షనర్” }, { en:“Skilled Labour”, ta:“திறன் தொழிலாளர்”, te:“నిపుణ కార్మికుడు” }, { en:“Unskilled Labour”, ta:“திறனற்ற தொழிலாளர்”, te:“అనిపుణ కార్మికుడు” }, { en:“Government Employee”, ta:“அரசு ஊழியர்”, te:“ప్రభుత్వ ఉద్యోగి” }, { en:“Private Sector Employee”, ta:“தனியார் துறை ஊழியர்”, te:“ప్రైవేట్ ఉద్యోగి” }, { en:“Community Health Worker / ASHA”, ta:“சமூக சுகாதார செயலர்”, te:“ASHA వర్కర్” }, { en:“Self - Employed”, ta:“சுயதொழில்”, te:“స్వయం ఉపాధి” }, { en:“Others”, ta:“மற்றவை”, te:“ఇతరులు” }]},
{ n: 5, section:“Accessibility”, en:“Distance from your residence to this vision centre”, ta:“வீட்டிலிருந்து மையம் வரையிலான தூரம்”, te:“నివాసం నుండి విజన్ సెంటర్ దూరం”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:”< 2 km”, ta:“2 கி.மீ.க்கு குறைவு”, te:“2 కి.మీ.కంటే తక్కువ”}, { en:“2–5 km”, ta:“2–5 கி.மீ.”, te:“2–5 కి.మీ.” }, { en:“6–10 km”, ta:“6–10 கி.மீ.”, te:“6–10 కి.మీ.” }, { en:”> 10 km”, ta:“10 கி.மீ.க்கு மேல்”, te:“10 కి.మీ.కంటే ఎక్కువ” }]},
{ n: 6, section:“Accessibility”, en:“Total travel time to reach this vision centre”, ta:“மையத்தை அடைய மொத்த பயண நேரம்”, te:“కేంద్రానికి మొత్తం ప్రయాణ సమయం”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:”< 15 minutes”, ta:“15 நிமிடங்களுக்கு குறைவு”, te:“15 నిమిషాల కంటే తక్కువ”}, { en:“15–30 minutes”, ta:“15–30 நிமிடங்கள்”, te:“15–30 నిమిషాలు” }, { en:“31–60 minutes”, ta:“31–60 நிமிடங்கள்”, te:“31–60 నిమిషాలు” }, { en:”> 60 minutes”, ta:“60 நிமிடங்களுக்கு மேல்”, te:“60 నిమిషాలకు పైగా” }]},
{ n: 7, section:“Accessibility”, en:“Primary mode of transport used today”, ta:“இன்று பயன்படுத்திய முக்கிய போக்குவரத்து”, te:“ఈరోజు ఉపయోగించిన ప్రధాన రవాణా”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Walking”, ta:“நடைபயணம்”, te:“నడక”}, { en:“Two - wheeler”, ta:“இரு சக்கர வாகனம்”, te:“రెండు చక్రాల వాహనం” }, { en:“Auto(shared / private)”, ta:“ஆட்டோ”, te:“ఆటో” }, { en:“Bus / Public Transport”, ta:“பேருந்து”, te:“బస్సు” }, { en:“Other”, ta:“மற்றவை”, te:“ఇతర” }]},
{ n: 8, section:“Awareness”, en:“How did you first hear about this vision centre ?”, ta:“இந்த மையத்தைப் பற்றி முதலில் எவ்வாறு அறிந்தீர்கள் ?”, te:“ఈ విజన్ సెంటర్ గురించి మొదట ఎలా తెలుసుకున్నారు ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Family/ Friends / Word of mouth”, ta:“குடும்பம் / நண்பர்கள் / வாய்மொழி”, te:“కుటుంబం / స్నేహితులు”}, { en:“Digital media(WhatsApp / Social media)”, ta:“டிஜிட்டல் ஊடகம்”, te:“డిజిటల్ మీడియా” }, { en:“Eye camp / Outreach services”, ta:“கண் முகாம்”, te:“కంటి శిబిరం” }, { en:“Auto publicity / Pamphlets / Posters”, ta:“துண்டு பிரசுரம்”, te:“పాంప్లెట్లు” }, { en:“Vision Health Visitor(VHC)”, ta:“விஷன் ஹெல்த் விசிட்டர்”, te:“VHC విజిటర్” }, { en:“Other”, ta:“மற்றவை”, te:“ఇతర” }]},
{ n: 9, section:“Awareness”, en:“How frequently do you attend eye check - ups ?”, ta:“எவ்வளவு அடிக்கடி கண் பரிசோதனைக்கு வருகிறீர்கள் ?”, te:“కంటి పరీక్షలకు ఎంత తరచుగా హాజరవుతారు ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“First time eye check- up”, ta:“முதல் முறை கண் பரிசோதனை”, te:“మొదటిసారి కంటి పరీక్ష”}, { en:“Only when there is a problem”, ta:“சிக்கல் இருக்கும்போது மட்டும்”, te:“సమస్య ఉన్నప్పుడు మాత్రమే” }, { en:“Once a year(routine)”, ta:“வருடம் ஒரு முறை”, te:“సంవత్సరానికి ఒకసారి” }, { en:“More than once a year”, ta:“வருடம் ஒரு முறைக்கு மேல்”, te:“సంవత్సరానికి ఒకటి కంటే ఎక్కువ” }]},
{ n: 10, section:“Reasons”, en:“What is the main reason for choosing this vision centre ?”, ta:“இந்த மையத்தை தேர்ந்தெடுக்கும் முக்கிய காரணம் என்ன ?”, te:“ఈ విజన్ సెంటర్‌ను ఎంచుకోవడానికి ముఖ్య కారణం ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Near to home / Easy access”, ta:“வீட்டிற்கு அருகில்”, te:“ఇంటికి దగ్గర”}, { en:“Affordable cost of services”, ta:“சேவைகளின் மலிவான விலை”, te:“సేవల సరసమైన వ్యయం” }, { en:“Trust in Sankara Eye Hospital”, ta:“சங்கர மருத்துவமனையின் நம்பிக்கை”, te:“సంకర హాస్పిటల్‌పై విశ్వాసం” }, { en:“Complete eye check - up at one place”, ta:“ஒரே இடத்தில் முழு பரிசோதனை”, te:“ఒకే చోట పూర్తి కంటి పరీక్ష” }, { en:“Teleconsultation with expert doctor”, ta:“நிபுணர் மருத்துவர் தொலைத் தொடர்பு”, te:“నిపుణ వైద్యుడితో టెలికన్సల్టేషన్” }, { en:“Recommendation by others”, ta:“பிறரின் பரிந்துரை”, te:“ఇతరుల సిఫారసు” }]},
{ n: 11, section:“Previous Healthcare”, en:“Have you visited any other eye care clinic before coming here ?”, ta:“இங்கு வருவதற்கு முன்பு வேறு கண் சிகிச்சை மையத்தை பார்வையிட்டீர்களா ?”, te:“ఇక్కడికి రాకముందు మరే ఇతర క్లినిక్‌కు వెళ్ళారా ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Yes”, ta:“ஆம்”, te:“అవును”}, { en:“No”, ta:“இல்லை”, te:“లేదు” }]},
{ n: 12, section:“Previous Healthcare”, en:“What was the main problem you faced at the previous clinic ?”, ta:“முந்தைய மையத்தில் என்ன சிக்கலை எதிர்கொண்டீர்கள் ?”, te:“మీరు మునుపటి క్లినిక్‌లో ఎదుర్కున్న ముఖ్య సమస్య ?”, hint_en:“Answer if visited another clinic”, hint_ta:“வேறு மையம் சென்றால் மட்டும்”, hint_te:“మరో క్లినిక్‌కు వెళ్ళినట్లైతే మాత్రమే”, choices: [{ en:“High cost of services”, ta:“சேவைகளின் அதிக விலை”, te:“సేవల అధిక వ్యయం”}, { en:“Long waiting time”, ta:“நீண்ட காத்திருப்பு நேரம்”, te:“ఎక్కువ వేచి ఉండే సమయం” }, { en:“Limited services available”, ta:“குறைந்த சேவைகள்”, te:“పరిమిత సేవలు” }, { en:“Not satisfied with treatment / outcome”, ta:“சிகிச்சை / முடிவில் திருப்தியில்லை”, te:“చికిత్స ఫలితంతో సంతృప్తి లేదు” }, { en:“Distance / Poor accessibility”, ta:“தொலைவு / போதுமான வசதி இல்லை”, te:“దూరం / పేద అందుబాటు” }, { en:“Other”, ta:“மற்றவை”, te:“ఇతర” }]},
{ n: 13, section:“Economic”, en:“Nature of household income”, ta:“குடும்ப வருமானத்தின் தன்மை”, te:“గృహ ఆదాయ స్వభావం”, hint_en:“Select income type and applicable range”, hint_ta:“வருமான வகை மற்றும் அளவை தேர்ந்தெடுக்கவும்”, hint_te:“ఆదాయ రకం మరియు పరిధిని ఎంచుకోండి”, choices: [{ en:“Daily wages: <₹500”, ta:“தினக் கூலி: ₹500க்கு குறைவு”, te:“రోజువారీ: ₹500 కంటే తక్కువ”}, { en:“Daily wages: ₹500–₹1,000”, ta:“தினக் கூலி: ₹500–₹1,000”, te:“రోజువారీ: ₹500–₹1,000” }, { en:“Daily wages: >₹1,000”, ta:“தினக் கூலி: ₹1,000க்கு மேல்”, te:“రోజువారీ: ₹1,000కు పైగా” }, { en:“Weekly income: <₹2,000”, ta:“வாராந்திர: ₹2,000க்கு குறைவு”, te:“వారపు: ₹2,000 కంటే తక్కువ” }, { en:“Weekly income: ₹2,000–₹5,000”, ta:“வாராந்திர: ₹2,000–₹5,000”, te:“వారపు: ₹2,000–₹5,000” }, { en:“Weekly income: >₹5,000”, ta:“வாராந்திர: ₹5,000க்கு மேல்”, te:“వారపు: ₹5,000కు పైగా” }, { en:“Monthly salary: <₹10,000”, ta:“மாதாந்திர: ₹10,000க்கு குறைவு”, te:“నెలవారీ: ₹10,000 కంటే తక్కువ” }, { en:“Monthly salary: ₹10,000–₹15,000”, ta:“மாதாந்திர: ₹10,000–₹15,000”, te:“నెలవారీ: ₹10,000–₹15,000” }, { en:“Monthly salary: >₹15,000”, ta:“மாதாந்திர: ₹15,000க்கு மேல்”, te:“నెలవారీ: ₹15,000కు పైగా” }]},
{ n: 14, section:“Economic”, en:“Approximate travel cost to reach the vision centre(one way)”, ta:“மையத்திற்கு வர ஆகும் தோராயமான பயண செலவு(ஒரு வழி)”, te:“విజన్ సెంటర్‌కు అంచనా ప్రయాణ వ్యయం(ఒకటేవైపు)”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:”<₹100”, ta:“₹100க்கு குறைவு”, te:“₹100 కంటే తక్కువ”}, { en:“₹100–₹250”, ta:“₹100–₹250”, te:“₹100–₹250” }, { en:”>₹250”, ta:“₹250க்கு மேல்”, te:“₹250కు పైగా” }]},
{ n: 15, section:“Economic”, en:“Did you lose income / wages due to this visit ?”, ta:“இந்த வருகையினால் வருமானம் இழந்தீர்களா ?”, te:“ఈ సందర్శన కారణంగా ఆదాయం కోల్పోయారా ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“No loss”, ta:“இழப்பில்லை”, te:“నష్టం లేదు”}, { en:”<₹500”, ta:“₹500க்கு குறைவு”, te:“₹500 కంటే తక్కువ” }, { en:“₹500–₹1,000”, ta:“₹500–₹1,000”, te:“₹500–₹1,000” }, { en:”>₹1,000”, ta:“₹1,000க்கு மேல்”, te:“₹1,000కు పైగా” }]},
{ n: 16, section:“Economic”, en:“Did someone accompany you today ?”, ta:“இன்று யாரேனும் உங்களுடன் வந்தனரா ?”, te:“ఈరోజు మీతో ఎవరైనా వచ్చారా ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“No, visited alone”, ta:“இல்லை, தனியாக வந்தேன்”, te:“లేదు, ఒంటరిగా వచ్చాను”}, { en:“Yes, Family member”, ta:“ஆம், குடும்ப உறுப்பினர்”, te:“అవును, కుటుంబ సభ్యుడు” }, { en:“Yes, Friend / Neighbour”, ta:“ஆம், நண்பர்”, te:“అవును, స్నేహితుడు” }, { en:“Yes, Other”, ta:“ஆம், மற்றவர்கள்”, te:“అవును, ఇతరులు” }]},
{ n: 17, section:“Economic”, en:“Travel cost for the accompanying person(one way)”, ta:“உடன் வந்தவரின் பயண செலவு(ஒரு வழி)”, te:“తోడుగా వచ్చిన వ్యక్తి ప్రయాణ వ్యయం”, hint_en:“Answer if accompanied”, hint_ta:“உடன் வந்தால் மட்டும்”, hint_te:“తోడు వచ్చినట్లైతే మాత్రమే”, choices: [{ en:”<₹100”, ta:“₹100க்கு குறைவு”, te:“₹100 కంటే తక్కువ”}, { en:“₹101–₹500”, ta:“₹101–₹500”, te:“₹101–₹500” }, { en:”>₹500”, ta:“₹500க்கு மேல்”, te:“₹500కు పైగా” }]},
{ n: 18, section:“Economic”, en:“Did the accompanying person lose any income because of this visit ?”, ta:“உடன் வந்தவருக்கு வருமான இழப்பு ஏற்பட்டதா ?”, te:“తోడుగా వచ్చిన వ్యక్తికి ఆదాయ నష్టం కలిగిందా ?”, hint_en:“Answer if accompanied”, hint_ta:“உடன் வந்தால் மட்டும்”, hint_te:“తోడు వచ్చినట్లైతే మాత్రమే”, choices: [{ en:“No loss”, ta:“இழப்பில்லை”, te:“నష్టం లేదు”}, { en:”<₹500”, ta:“₹500க்கு குறைவు”, te:“₹500 కంటే తక్కువ” }, { en:“₹500–₹1,000”, ta:“₹500–₹1,000”, te:“₹500–₹1,000” }, { en:”>₹1,000”, ta:“₹1,000க்கு மேல்”, te:“₹1,000కు పైగా” }]},
{ n: 19, section:“Clinical”, en:“What was the clinical advice given after your eye examination today ?”, ta:“இன்று கண் பரிசோதனைக்கு பிறகு மருத்துவர் ஆலோசனை என்ன ?”, te:“ఈరోజు కంటి పరీక్ష తర్వాత వైద్య సలహా ఏమిటి ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“First time spectacles prescribed”, ta:“முதல் முறை கண்ணாடி பரிந்துரை”, te:“మొదటిసారి కళ్ళద్దాలు సూచించారు”}, { en:“Continue with current spectacles(no change)”, ta:“தற்போதைய கண்ணாடியை தொடரவும்”, te:“ప్రస్తుత కళ్ళద్దాలను కొనసాగించండి” }, { en:“Advised to change spectacles(revised prescription)”, ta:“கண்ணாடி மாற்ற ஆலோசனை”, te:“కళ్ళద్దాలు మార్చమని సలహా” }]},
{ n: 20, section:“Current Spectacles”, en:“How satisfied are you with your current spectacles ?”, ta:“தற்போதைய கண்ணாடியில் எவ்வளவு திருப்தி உள்ளது ?”, te:“ప్రస్తుత కళ్ళద్దాలతో ఎంత సంతృప్తి ?”, hint_en:“Answer if advised to continue current spectacles”, hint_ta:“தற்போதைய கண்ணாடியை தொடர ஆலோசனை வழங்கப்பட்டால் மட்டும்”, hint_te:“ప్రస్తుత కళ్ళద్దాలను కొనసాగించమని సలహా ఇచ్చినట్లైతే”, choices: [{ en:“Very satisfied”, ta:“மிகவும் திருப்தி”, te:“చాలా సంతృప్తి”}, { en:“Satisfied”, ta:“திருப்தி”, te:“సంతృప్తి” }, { en:“Dissatisfied”, ta:“திருப்தியில்லை”, te:“అసంతృప్తి” }, { en:“Very dissatisfied”, ta:“மிகவும் திருப்தியில்லை”, te:“చాలా అసంతృప్తి” }]},
{ n: 21, section:“Current Spectacles”, en:“Where did you purchase your current spectacles ?”, ta:“தற்போதைய கண்ணாடியை எங்கு வாங்கினீர்கள் ?”, te:“ప్రస్తుత కళ్ళద్దాలను ఎక్కడ కొన్నారు ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Sankara Vision Centre”, ta:“சங்கர விஷன் சென்டர்”, te:“సంకర విజన్ సెంటర్”}, { en:“Local optical shop”, ta:“உள்ளூர் கண்ணாடி கடை”, te:“స్థానిక ఆప్టికల్ షాప్” }, { en:“Other”, ta:“மற்றவை”, te:“ఇతర” }]},
{ n: 22, section:“Current Spectacles”, en:“What was the primary reason for purchasing elsewhere ?”, ta:“வேறு இடத்தில் வாங்குவதற்கான முக்கிய காரணம் என்ன ?”, te:“వేరే చోట కొనుగోలు చేయడానికి ముఖ్య కారణం ?”, hint_en:“Answer if purchased elsewhere”, hint_ta:“வேறு இடத்தில் வாங்கியிருந்தால் மட்டும்”, hint_te:“వేరే చోట కొన్నట్లైతే మాత్రమే”, choices: [{ en:“Lower cost available elsewhere”, ta:“வேறு இடத்தில் குறைவான விலை”, te:“వేరే చోట తక్కువ ధర”}, { en:“Better quality / brand preference”, ta:“சிறந்த தரம் / பிராண்ட் விருப்பம்”, te:“మెరుగైన నాణ్యత / బ్రాండ్” }, { en:“More variety of frames or lenses”, ta:“அதிக வகை ஃப்ரேம் அல்லது லென்ஸ்”, te:“అధిక ఫ్రేమ్ వైవిధ్యం” }, { en:“Closer or more convenient location”, ta:“அருகிலுள்ள / வசதியான இடம்”, te:“దగ్గర లేదా సౌకర్యవంతమైన స్థానం” }, { en:“Other”, ta:“மற்றவை”, te:“ఇతర” }]},
{ n: 23, section:“New Spectacles”, en:“What action did you take after receiving the spectacle advice today ?”, ta:“இன்று கண்ணாடி ஆலோசனை பெற்ற பிறகு என்ன நடவடிக்கை எடுத்தீர்கள் ?”, te:“ఈరోజు కళ్ళద్దాల సలహా తర్వాత ఏ చర్య తీసుకున్నారు ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Purchased spectacles at this vision centre”, ta:“இந்த மையத்தில் கண்ணாடி வாங்கினேன்”, te:“ఈ విజన్ సెంటర్‌లో కళ్ళద్దాలు కొన్నాను”}, { en:“Took the prescription only”, ta:“ப்ரிஸ்கிரிப்ஷன் மட்டும் வாங்கினேன்”, te:“ప్రిస్క్రిప్షన్ మాత్రమే తీసుకున్నాను” }, { en:“Postponed decision — will decide later”, ta:“முடிவை ஒத்திவைத்தேன்”, te:“నిర్ణయాన్ని వాయిదా వేశాను” }, { en:“Do not plan to purchase spectacles”, ta:“கண்ணாடி வாங்க திட்டமில்லை”, te:“కళ్ళద్దాలు కొనాలని అనుకోవడం లేదు” }]},
{ n: 24, section:“New Spectacles”, en:“Who mainly decides and pays for purchasing spectacles in your case?”, ta:“கண்ணாடி வாங்குவதை யார் முடிவு செய்கிறார்கள் ?”, te:“కళ్ళద్దాలు కొనుగోలు చేయడానికి ఎవరు నిర్ణయిస్తారు ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Self”, ta:“நான் மட்டும்”, te:“స్వయంగా”}, { en:“Family member”, ta:“குடும்ப உறுப்பினர்”, te:“కుటుంబ సభ్యుడు” }, { en:“Joint decision(self & family)”, ta:“கூட்டு முடிவு”, te:“సంయుక్త నిర్ణయం” }, { en:“Other”, ta:“மற்றவர்கள்”, te:“ఇతరులు” }]},
{ n: 25, section:“New Spectacles”, en:“What is the main reason for not purchasing here ?”, ta:“இங்கு வாங்காததற்கான முக்கிய காரணம் என்ன ?”, te:“ఇక్కడ కొనుగోలు చేయకపోవడానికి ముఖ్య కారణం ?”, hint_en:“Answer if did not purchase here”, hint_ta:“இங்கு வாங்காவிட்டால் மட்டும்”, hint_te:“ఇక్కడ కొనుగోలు చేయనట్లైతే మాత్రమే”, choices: [{ en:“Lower cost available at another shop”, ta:“வேறு கடையில் குறைவான விலை”, te:“మరో షాప్‌లో తక్కువ ధర”}, { en:“Preference for familiar / trusted shop”, ta:“நம்பகமான கடையை விரும்புகிறேன்”, te:“విశ్వసనీయ షాప్ ప్రాధాన్యత” }, { en:“More frame options available elsewhere”, ta:“வேறு இடத்தில் அதிக ஃப்ரேம் தேர்வுகள்”, te:“వేరే చోట అధిక ఫ్రేమ్ ఎంపికలు” }, { en:“Intend to purchase at a later date”, ta:“பிற்காலத்தில் வாங்க திட்டமிட்டுள்ளேன்”, te:“తర్వాత కొనాలని ఉద్దేశిస్తున్నాను” }, { en:“Not enough money at present”, ta:“தற்போது போதுமான பணம் இல்லை”, te:“ప్రస్తుతం తగినంత డబ్బు లేదు” }, { en:“More branded / costlier frames elsewhere”, ta:“வேறு இடத்தில் பிராண்ட் ஃப்ரேம்கள்”, te:“వేరే చోట బ్రాండెడ్ ఫ్రేమ్లు” }, { en:“Others”, ta:“மற்றவை”, te:“ఇతరులు” }]},
{ n: 26, section:“Purchase Experience”, en:“How satisfied are you with the spectacles purchased at this vision centre ?”, ta:“இந்த மையத்தில் வாங்கிய கண்ணாடியில் எவ்வளவு திருப்தி உள்ளது ?”, te:“ఈ విజన్ సెంటర్‌లో కొన్న కళ్ళద్దాలతో ఎంత సంతృప్తి ?”, hint_en:“Answer if purchased here”, hint_ta:“இங்கு வாங்கினால் மட்டும்”, hint_te:“ఇక్కడ కొన్నట్లైతే మాత్రమే”, choices: [{ en:“Very satisfied”, ta:“மிகவும் திருப்தி”, te:“చాలా సంతృప్తి”}, { en:“Satisfied”, ta:“திருப்தி”, te:“సంతృప్తి” }, { en:“Dissatisfied”, ta:“திருப்தியில்லை”, te:“అసంతృప్తి” }, { en:“Very dissatisfied”, ta:“மிகவும் திருப்தியில்லை”, te:“చాలా అసంతృప్తి” }]},
{ n: 27, section:“Purchase Experience”, en:“How would you rate the cost of spectacles purchased here ?”, ta:“இங்கு வாங்கிய கண்ணாடியின் விலையை எவ்வாறு மதிப்பிடுவீர்கள் ?”, te:“ఇక్కడ కొన్న కళ్ళద్దాల వ్యయాన్ని ఎలా రేటింగ్ ఇస్తారు ?”, hint_en:“Answer if purchased here”, hint_ta:“இங்கு வாங்கினால் மட்டும்”, hint_te:“ఇక్కడ కొన్నట్లైతే మాత్రమే”, choices: [{ en:“Very affordable”, ta:“மிகவும் மலிவான விலை”, te:“చాలా సరసంగా ఉంది”}, { en:“Affordable”, ta:“மலிவான விலை”, te:“సరసంగా ఉంది” }, { en:“Slightly expensive”, ta:“சற்று விலை அதிகம்”, te:“కొంచెం ఖరీదైనది” }, { en:“Expensive”, ta:“விலை அதிகம்”, te:“ఖరీదైనది” }]},
{ n: 28, section:“Overall Feedback”, en:“Overall, how satisfied are you with the services at this vision centre ?”, ta:“மொத்தத்தில், இந்த மையத்தின் சேவைகளில் எவ்வளவு திருப்தி உள்ளது ?”, te:“మొత్తంగా, ఈ విజన్ సెంటర్ సేవలతో ఎంత సంతృప్తి ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Very satisfied”, ta:“மிகவும் திருப்தி”, te:“చాలా సంతృప్తి”}, { en:“Satisfied”, ta:“திருப்தி”, te:“సంతృప్తి” }, { en:“Dissatisfied”, ta:“திருப்தியில்லை”, te:“అసంతృప్తి” }, { en:“Very dissatisfied”, ta:“மிகவும் திருப்தியில்லை”, te:“చాలా అసంతృప్తి” }]},
{ n: 29, section:“Overall Feedback”, en:“How likely are you to recommend this vision centre to family or friends ?”, ta:“இந்த மையத்தை குடும்பத்தினர் அல்லது நண்பர்களுக்கு பரிந்துரைக்கும் வாய்ப்பு எவ்வளவு ?”, te:“ఈ విజన్ సెంటర్‌ను కుటుంబం లేదా స్నేహితులకు సిఫారసు చేసే అవకాశం ?”, hint_en:””, hint_ta:””, hint_te:””, choices: [{ en:“Very likely”, ta:“மிகவும் சாத்தியம்”, te:“చాలా అవకాశం ఉంది”}, { en:“Likely”, ta:“சாத்தியம்”, te:“అవకాశం ఉంది” }, { en:“Unlikely”, ta:“சாத்தியமில்லை”, te:“అవకాశం లేదు” }, { en:“Very unlikely”, ta:“மிகவும் சாத்தியமில்லை”, te:“అవకాశం చాలా తక్కువ” }]}

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

