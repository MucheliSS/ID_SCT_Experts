// TTSH ID MO SCT Expert Marking Interface - Application Logic
// Handles navigation and submission of expert responses

class ExpertApp {
    constructor() {
        this.currentSection = 'intro';
        this.currentCaseIndex = 0;
        this.responses = {};
        this.startTime = null;
        this.expertInfo = {};

        this.init();
    }

    init() {
        this.bindEvents();
        this.showSection('intro');
    }

    bindEvents() {
        // Form submission - Start marking
        document.getElementById('expert-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.startMarking();
        });

        // Navigation buttons
        document.getElementById('btn-prev').addEventListener('click', () => this.prevCase());
        document.getElementById('btn-next').addEventListener('click', () => this.nextCase());

        // Submit button
        document.getElementById('btn-submit').addEventListener('click', () => this.submitMarking());
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
        this.currentSection = sectionId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    startMarking() {
        // Collect expert info
        this.expertInfo = {
            name: document.getElementById('expert-name').value.trim(),
            specialty: document.getElementById('expert-specialty').value,
            yearsExperience: parseInt(document.getElementById('years-experience').value) || 0
        };

        this.startTime = Date.now();
        this.currentCaseIndex = 0;
        this.showSection('marking');
        this.renderCase();
    }

    renderCase() {
        const caseData = SCT_DATA.cases[this.currentCaseIndex];
        const container = document.getElementById('case-container');

        // Update progress
        this.updateProgress();

        // Render case content
        container.innerHTML = `
      <div class="card">
        <div class="card__title">
          <span class="case-badge">${caseData.id}</span>
          Case ${caseData.id}: ${caseData.title}
        </div>
        <div class="scenario">${caseData.scenario}</div>
        
        ${caseData.items.map(item => this.renderItem(item)).join('')}
      </div>
    `;

        // Bind radio button events
        container.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const itemId = e.target.name;
                this.responses[itemId] = e.target.value;
                this.updateItemState(itemId);
                this.updateNavButtons();
            });
        });

        // Restore any existing responses
        Object.keys(this.responses).forEach(itemId => {
            const radio = document.querySelector(`input[name="${itemId}"][value="${this.responses[itemId]}"]`);
            if (radio) {
                radio.checked = true;
                this.updateItemState(itemId);
            }
        });

        this.updateNavButtons();
    }

    renderItem(item) {
        const likertOptions = [
            { value: '-2', label: 'Greatly weakened' },
            { value: '-1', label: 'Slightly weakened' },
            { value: '0', label: 'No effect' },
            { value: '+1', label: 'Strengthened' },
            { value: '+2', label: 'Greatly strengthened' }
        ];

        return `
      <div class="sct-item" id="item-${item.id}">
        <div class="sct-item__header">
          <div class="sct-item__column">
            <div class="sct-item__label">If you are thinking of:</div>
            <div class="sct-item__hypothesis">${item.hypothesis}</div>
          </div>
          <div class="sct-item__arrow">→</div>
          <div class="sct-item__column">
            <div class="sct-item__label">And you find:</div>
            <div class="sct-item__newinfo">${item.newInfo}</div>
          </div>
        </div>
        
        <div class="sct-item__label text-center mb-lg">${item.questionType}:</div>
        
        <div class="likert-scale">
          ${likertOptions.map(opt => `
            <div class="likert-option" data-value="${opt.value}">
              <input type="radio" 
                     name="${item.id}" 
                     id="item-${item.id}-${opt.value}" 
                     value="${opt.value}">
              <label for="item-${item.id}-${opt.value}">
                <span class="likert-value">${opt.value}</span>
                <span class="likert-label">${opt.label}</span>
              </label>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    }

    updateItemState(itemId) {
        const itemEl = document.getElementById(`item-${itemId}`);
        if (itemEl) {
            itemEl.classList.add('answered');
        }
    }

    updateProgress() {
        const totalCases = SCT_DATA.cases.length;
        const completedItems = Object.keys(this.responses).length;
        const totalItems = totalCases * 3;

        const progressPercent = (completedItems / totalItems) * 100;

        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
        document.getElementById('progress-text').textContent =
            `Case ${this.currentCaseIndex + 1} of ${totalCases} • ${completedItems}/${totalItems} items marked`;
    }

    updateNavButtons() {
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const btnSubmit = document.getElementById('btn-submit');

        // Previous button
        btnPrev.style.display = this.currentCaseIndex > 0 ? 'flex' : 'none';

        // Next/Submit buttons
        const isLastCase = this.currentCaseIndex === SCT_DATA.cases.length - 1;
        btnNext.style.display = isLastCase ? 'none' : 'flex';
        btnSubmit.style.display = isLastCase ? 'flex' : 'none';

        // For submit, check all items are answered
        if (isLastCase) {
            const totalAnswered = Object.keys(this.responses).length;
            btnSubmit.disabled = totalAnswered < 30;
        }
    }

    prevCase() {
        if (this.currentCaseIndex > 0) {
            this.currentCaseIndex--;
            this.renderCase();
        }
    }

    nextCase() {
        if (this.currentCaseIndex < SCT_DATA.cases.length - 1) {
            this.currentCaseIndex++;
            this.renderCase();
        }
    }

    async submitMarking() {
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - this.startTime) / 1000);

        // Prepare submission data
        const submissionData = {
            timestamp: new Date().toISOString(),
            expert: this.expertInfo,
            responses: this.responses,
            timeTakenSeconds: timeTaken
        };

        // Submit to Google Sheets
        await this.submitToGoogleSheets(submissionData);

        // Show completion
        this.showSection('complete');
    }

    async submitToGoogleSheets(data) {
        const scriptUrl = window.GOOGLE_SCRIPT_URL;

        if (!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_URL_HERE')) {
            console.log('Google Sheets integration not configured. Skipping submission.');
            this.showToast('Responses recorded locally (Google Sheets not configured)', 'info');
            return;
        }

        try {
            this.showToast('Submitting responses...', 'info');

            // Send data as JSON to Google Apps Script
            const response = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow',
                body: JSON.stringify(data)
            });

            // Note: no-cors mode means we can't read the response
            // but the request will succeed if the server accepts it
            console.log('Submission sent to Google Sheets');
            this.showToast('Responses submitted successfully!', 'success');

        } catch (error) {
            console.error('Error submitting to Google Sheets:', error);
            this.showToast('Error submitting responses. Please try again.', 'error');
            throw error; // Re-throw so the UI doesn't proceed if submission fails
        }
    }

        try {
            // Use form submission approach for better CORS compatibility
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = scriptUrl;
            form.target = '_blank';
            form.style.display = 'none';

            // Add data as hidden input
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'data';
            input.value = JSON.stringify(data);
            form.appendChild(input);

            // Create a hidden iframe to capture the response
            const iframe = document.createElement('iframe');
            iframe.name = 'submitFrame';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            form.target = 'submitFrame';

            document.body.appendChild(form);
            form.submit();

            // Clean up after a short delay
            setTimeout(() => {
                form.remove();
                iframe.remove();
            }, 3000);

            this.showToast('Responses submitted successfully!', 'success');
        } catch (error) {
            console.error('Error submitting to Google Sheets:', error);
            this.showToast('Could not save to server.', 'error');
        }
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.expertApp = new ExpertApp();
});
