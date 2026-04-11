const fs = require('fs');
const css = fs.readFileSync('hocco-global.css', 'utf8');
const newStyles = `
/* --- Premium Submit Button Upgrade --- */
body.course-page .hocco-submit-btn,
body.course-page #submit-quiz,
body.course-page #submitJournal,
body.course-page #quiz-submit-btn,
body.course-page button[type='submit'] {
  display: block !important;
  width: fit-content !important;
  min-width: 200px !important;
  margin: 2rem auto !important;
  padding: 1rem 2.5rem !important;
  font-size: 1.15rem !important;
  font-weight: 800 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
  border: none !important;
  border-radius: 999px !important;
  background: linear-gradient(135deg, #2d2b7e 0%, #c71545 100%) !important;
  color: white !important;
  cursor: pointer !important;
  box-shadow: 0 12px 30px rgba(199, 21, 69, 0.25) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative !important;
  overflow: hidden !important;
}

body.course-page .hocco-submit-btn:hover,
body.course-page #submit-quiz:hover,
body.course-page #submitJournal:hover,
body.course-page #quiz-submit-btn:hover,
body.course-page button[type='submit']:hover {
  transform: translateY(-3px) scale(1.04) !important;
  box-shadow: 0 18px 40px rgba(199, 21, 69, 0.35) !important;
  filter: brightness(1.1) !important;
}

body.course-page .hocco-submit-btn:active,
body.course-page #submit-quiz:active {
  transform: translateY(-1px) scale(1.02) !important;
}

/* Secondary Actions (Clear, Reset) - Less prominent but clean */
body.course-page #clearNotes,
body.course-page #reset-activity,
body.course-page #reset-order,
body.course-page #downloadNotes {
  background: white !important;
  color: #2d2b7e !important;
  border: 2px solid rgba(45, 43, 126, 0.2) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
  text-transform: none !important;
  padding: 0.6rem 1.2rem !important;
  font-weight: 600 !important;
}

body.course-page #clearNotes:hover,
body.course-page #reset-activity:hover,
body.course-page #downloadNotes:hover {
  background: #f8fafc !important;
  border-color: #2d2b7e !important;
  transform: translateY(-1px) !important;
}
`;

fs.writeFileSync('hocco-global.css', css + newStyles);
console.log('Appended premium button styles to hocco-global.css');
