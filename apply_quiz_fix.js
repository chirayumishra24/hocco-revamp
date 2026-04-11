const fs = require('fs');
const css = fs.readFileSync('hocco-global.css', 'utf8');
const fix = `
/* --- Quiz Option Alignment Fix --- */
body.course-page .quiz-container form,
body.course-page .quiz-container .space-y-3,
body.course-page .activity-section form {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  width: 100% !important;
}

body.course-page .quiz-container label,
body.course-page .activity-section label {
  width: fit-content !important;
  min-width: min(85vw, 400px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  text-align: left !important;
  margin: 0.5rem auto !important;
  padding: 1rem 1.5rem !important;
  border-radius: 16px !important;
  background: rgba(45, 43, 126, 0.03) !important;
  border: 1px solid rgba(45, 43, 126, 0.08) !important;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
  cursor: pointer !important;
}

body.course-page .quiz-container label:hover {
  background: rgba(45, 43, 126, 0.06) !important;
  border-color: rgba(45, 43, 126, 0.2) !important;
  transform: translateX(4px) !important;
}

body.course-page .quiz-container input[type='radio'],
body.course-page .quiz-container input[type='checkbox'] {
  margin: 0 1.25rem 0 0 !important;
  width: 20px !important;
  height: 20px !important;
  flex-shrink: 0 !important;
  accent-color: var(--hocco-red) !important;
}
`;

fs.writeFileSync('hocco-global.css', css + fix);
console.log('Applied quiz alignment fix to hocco-global.css');
