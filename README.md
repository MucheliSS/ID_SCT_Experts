# TTSH ID MO SCT Expert Marking Interface

A blinded expert marking interface for generating the SCT scoring rubric, with admin dashboard for viewing responses and exporting the scoring key.

## Features

- **Expert Panel Marking** – Collects responses from ID experts
- **Blinded Responses** – Experts cannot see others' answers
- **Auto-Generated Scoring Key** – Calculates modal responses and partial credit weights
- **Admin Dashboard** – View expert responses and export rubric
- **Export Options** – JSON, CSV, and data.js format

## Files Overview

| File | Purpose |
|------|---------|
| `index.html` | Expert marking interface |
| `admin.html` | Admin dashboard to view/export scoring key |
| `styles.css` | Purple theme styling (distinct from MO interface) |
| `app.js` | Expert marking logic |
| `admin.js` | Scoring key generation and export |
| `data.js` | Clinical cases (same as MO version) |
| `google-apps-script.gs` | Backend with auto-calculations |

## Quick Start

### For Experts
1. Open `index.html` in browser
2. Enter name, specialty, years of experience
3. Mark all 30 items across 10 cases
4. Submit responses

### For Admins
1. Open `admin.html` in browser
2. Click "Load Sample Data" for demo, or connect to Google Sheet
3. View generated scoring key
4. Export as JSON, CSV, or data.js format

## Google Sheets Setup

### Step 1: Create Sheet
1. Create new Google Sheet named "SCT Expert Responses"

### Step 2: Add Apps Script
1. Extensions → Apps Script
2. Paste contents of `google-apps-script.gs`
3. Save

### Step 3: Deploy
1. Deploy → New deployment → Web app
2. Execute as: Me
3. Who has access: Anyone
4. Copy Web App URL

### Step 4: Configure
1. Update `window.GOOGLE_SCRIPT_URL` in `index.html`

## Generated Output

The scoring key includes:

| Field | Description |
|-------|-------------|
| Modal Response | Most common expert answer |
| Distribution | Count per response option |
| Partial Credit Weights | Score = count / modal count |

### Example Output (JSON)
```json
{
  "1.1": { "-2": 0, "-1": 0, "0": 0, "+1": 0.25, "+2": 1.00, "modal": "+2" },
  "1.2": { "-2": 0.60, "-1": 1.00, "0": 0.40, "+1": 0, "+2": 0, "modal": "-1" }
}
```

## Literature Notes

**Expert Panel Size Recommendations:**
- High-stakes: 15-20 experts
- Low-stakes/Formative: 10-15 experts
- Pragmatic minimum: 5+ (with known increased error)

## Workflow

1. **Recruit experts** – Aim for 10+, accept 5+ pragmatically
2. **Send link** – Each expert completes `index.html`
3. **Review responses** – Use `admin.html` to view submissions
4. **Generate rubric** – Export scoring key when ready
5. **Update MO test** – Copy scoring key to `ID SCT Web/data.js`

---

**Version:** 1.0.0  
**Created:** January 2026
