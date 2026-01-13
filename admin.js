// TTSH ID MO SCT Admin Dashboard - Scoring Key Generator
// Generates scoring key from expert panel responses

class AdminApp {
    constructor() {
        this.expertData = [];
        this.scoringKey = {};
        this.itemIds = this.generateItemIds();

        this.init();
    }

    generateItemIds() {
        const ids = [];
        for (let c = 1; c <= 10; c++) {
            for (let i = 1; i <= 3; i++) {
                ids.push(`${c}.${i}`);
            }
        }
        return ids;
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('btn-load-sample').addEventListener('click', () => this.loadSampleData());
        document.getElementById('btn-fetch-sheet').addEventListener('click', () => this.fetchFromSheet());
        document.getElementById('btn-copy-json').addEventListener('click', () => this.exportJSON());
        document.getElementById('btn-download-csv').addEventListener('click', () => this.downloadCSV());
        document.getElementById('btn-copy-datajs').addEventListener('click', () => this.exportDataJS());
    }

    // Load sample data for demonstration
    loadSampleData() {
        // Simulated expert responses (10 experts)
        this.expertData = [
            { name: "Dr. A (Senior ID)", specialty: "General ID", years: 22, responses: { "1.1": "+2", "1.2": "-1", "1.3": "+2", "2.1": "-2", "2.2": "+2", "2.3": "-2", "3.1": "+2", "3.2": "-2", "3.3": "0", "4.1": "-2", "4.2": "+2", "4.3": "0", "5.1": "+2", "5.2": "-2", "5.3": "+2", "6.1": "+2", "6.2": "0", "6.3": "+2", "7.1": "+2", "7.2": "0", "7.3": "+2", "8.1": "+2", "8.2": "+2", "8.3": "-2", "9.1": "+2", "9.2": "-2", "9.3": "+2", "10.1": "+2", "10.2": "-2", "10.3": "+1" } },
            { name: "Dr. B (Tropical Med)", specialty: "Tropical Medicine", years: 20, responses: { "1.1": "+2", "1.2": "-2", "1.3": "+2", "2.1": "-2", "2.2": "+2", "2.3": "-2", "3.1": "+2", "3.2": "-2", "3.3": "+1", "4.1": "-2", "4.2": "+1", "4.3": "+1", "5.1": "+2", "5.2": "-2", "5.3": "+2", "6.1": "+2", "6.2": "-1", "6.3": "+2", "7.1": "+2", "7.2": "+1", "7.3": "+2", "8.1": "+2", "8.2": "+2", "8.3": "-2", "9.1": "+2", "9.2": "-2", "9.3": "+2", "10.1": "+2", "10.2": "-2", "10.3": "0" } },
            { name: "Dr. C (ID Intensivist)", specialty: "ID Intensivist", years: 15, responses: { "1.1": "+2", "1.2": "-1", "1.3": "+1", "2.1": "-2", "2.2": "+2", "2.3": "-2", "3.1": "+2", "3.2": "-2", "3.3": "0", "4.1": "-2", "4.2": "+2", "4.3": "0", "5.1": "+1", "5.2": "-2", "5.3": "+2", "6.1": "+1", "6.2": "+1", "6.3": "+2", "7.1": "+2", "7.2": "0", "7.3": "+2", "8.1": "+2", "8.2": "+2", "8.3": "-1", "9.1": "+2", "9.2": "-2", "9.3": "+2", "10.1": "+1", "10.2": "-1", "10.3": "+1" } },
            { name: "Dr. D (General ID)", specialty: "General ID", years: 12, responses: { "1.1": "+2", "1.2": "-1", "1.3": "+1", "2.1": "-1", "2.2": "+1", "2.3": "-2", "3.1": "+2", "3.2": "-2", "3.3": "-1", "4.1": "-2", "4.2": "+1", "4.3": "-1", "5.1": "+2", "5.2": "-2", "5.3": "+1", "6.1": "+2", "6.2": "0", "6.3": "+2", "7.1": "+2", "7.2": "-1", "7.3": "+1", "8.1": "+1", "8.2": "+2", "8.3": "-2", "9.1": "+2", "9.2": "-1", "9.3": "+2", "10.1": "+2", "10.2": "-2", "10.3": "+1" } },
            { name: "Dr. E (General ID)", specialty: "General ID", years: 10, responses: { "1.1": "+2", "1.2": "0", "1.3": "+2", "2.1": "-2", "2.2": "+2", "2.3": "-1", "3.1": "+2", "3.2": "-2", "3.3": "0", "4.1": "-1", "4.2": "+1", "4.3": "+1", "5.1": "+1", "5.2": "-1", "5.3": "+2", "6.1": "+2", "6.2": "+1", "6.3": "+1", "7.1": "+2", "7.2": "+1", "7.3": "+2", "8.1": "+2", "8.2": "+2", "8.3": "-1", "9.1": "+2", "9.2": "-2", "9.3": "+2", "10.1": "+1", "10.2": "-1", "10.3": "0" } },
            { name: "Dr. F (Research)", specialty: "Research/Academic", years: 8, responses: { "1.1": "+2", "1.2": "-2", "1.3": "+1", "2.1": "-2", "2.2": "+2", "2.3": "-2", "3.1": "+1", "3.2": "-2", "3.3": "+1", "4.1": "-2", "4.2": "+1", "4.3": "0", "5.1": "0", "5.2": "-2", "5.3": "+1", "6.1": "+1", "6.2": "0", "6.3": "+2", "7.1": "+2", "7.2": "+1", "7.3": "+2", "8.1": "+1", "8.2": "+1", "8.3": "0", "9.1": "+2", "9.2": "-2", "9.3": "+2", "10.1": "+2", "10.2": "-2", "10.3": "+1" } },
            { name: "Dr. G (ID Intensivist)", specialty: "ID Intensivist", years: 10, responses: { "1.1": "+1", "1.2": "-1", "1.3": "+1", "2.1": "-2", "2.2": "+1", "2.3": "-2", "3.1": "+2", "3.2": "-2", "3.3": "0", "4.1": "-2", "4.2": "0", "4.3": "+1", "5.1": "+2", "5.2": "-2", "5.3": "+1", "6.1": "+2", "6.2": "+1", "6.3": "+2", "7.1": "+2", "7.2": "0", "7.3": "+2", "8.1": "+2", "8.2": "+2", "8.3": "-2", "9.1": "+2", "9.2": "-1", "9.3": "+2", "10.1": "+1", "10.2": "-2", "10.3": "+2" } },
            { name: "Dr. H (Tropical Med)", specialty: "Tropical Medicine", years: 12, responses: { "1.1": "+2", "1.2": "-2", "1.3": "+2", "2.1": "-1", "2.2": "+2", "2.3": "-2", "3.1": "+2", "3.2": "-2", "3.3": "-1", "4.1": "-2", "4.2": "+2", "4.3": "0", "5.1": "+1", "5.2": "-1", "5.3": "+2", "6.1": "+1", "6.2": "-1", "6.3": "+2", "7.1": "+2", "7.2": "+1", "7.3": "+1", "8.1": "+2", "8.2": "+2", "8.3": "-1", "9.1": "+2", "9.2": "-2", "9.3": "+2", "10.1": "+1", "10.2": "-1", "10.3": "+1" } },
            { name: "Dr. I (Junior ID)", specialty: "General ID", years: 6, responses: { "1.1": "+2", "1.2": "-1", "1.3": "+1", "2.1": "-2", "2.2": "+2", "2.3": "-1", "3.1": "+2", "3.2": "-2", "3.3": "+1", "4.1": "-1", "4.2": "+1", "4.3": "-1", "5.1": "+2", "5.2": "-2", "5.3": "+2", "6.1": "+2", "6.2": "+2", "6.3": "+2", "7.1": "+2", "7.2": "+2", "7.3": "+2", "8.1": "+1", "8.2": "+2", "8.3": "-2", "9.1": "+2", "9.2": "-1", "9.3": "+2", "10.1": "+2", "10.2": "-2", "10.3": "0" } },
            { name: "Dr. J (Junior ID)", specialty: "General ID", years: 5, responses: { "1.1": "+1", "1.2": "0", "1.3": "+1", "2.1": "-1", "2.2": "+1", "2.3": "-2", "3.1": "+2", "3.2": "-2", "3.3": "-1", "4.1": "-2", "4.2": "+2", "4.3": "-1", "5.1": "+2", "5.2": "-2", "5.3": "+2", "6.1": "+2", "6.2": "-1", "6.3": "+2", "7.1": "+2", "7.2": "-1", "7.3": "+2", "8.1": "+2", "8.2": "+2", "8.3": "-2", "9.1": "+2", "9.2": "-2", "9.3": "+2", "10.1": "+2", "10.2": "-2", "10.3": "-1" } }
        ];

        this.processData();
        this.showToast('Sample data loaded (10 experts)', 'success');
    }

    fetchFromSheet() {
        const sheetUrl = document.getElementById('sheet-url').value.trim();
        if (!sheetUrl) {
            this.showToast('Please enter a Google Sheet URL or ID', 'error');
            return;
        }

        // For now, show a message about manual data entry
        this.showToast('Google Sheets API integration requires setup. Use sample data for demo.', 'info');
    }

    processData() {
        if (this.expertData.length === 0) {
            this.showToast('No expert data to process', 'error');
            return;
        }

        // Calculate response distributions and scoring key
        this.calculateScoringKey();

        // Show UI elements
        document.getElementById('stats-container').style.display = 'grid';
        document.getElementById('experts-card').style.display = 'block';
        document.getElementById('scoring-card').style.display = 'block';

        // Render components
        this.renderStats();
        this.renderExpertList();
        this.renderScoringKey();
    }

    calculateScoringKey() {
        const responseValues = ['-2', '-1', '0', '+1', '+2'];

        this.scoringKey = {};

        this.itemIds.forEach(itemId => {
            // Count responses for each value
            const distribution = {};
            responseValues.forEach(val => distribution[val] = 0);

            this.expertData.forEach(expert => {
                const response = expert.responses[itemId];
                if (response && distribution.hasOwnProperty(response)) {
                    distribution[response]++;
                }
            });

            // Find modal response
            let modal = '0';
            let maxCount = 0;
            responseValues.forEach(val => {
                if (distribution[val] > maxCount) {
                    maxCount = distribution[val];
                    modal = val;
                }
            });

            // Calculate partial credit weights
            const weights = {};
            responseValues.forEach(val => {
                weights[val] = maxCount > 0 ? (distribution[val] / maxCount).toFixed(2) : '0.00';
            });

            this.scoringKey[itemId] = {
                distribution,
                modal,
                modalCount: maxCount,
                weights,
                totalResponses: this.expertData.length
            };
        });
    }

    renderStats() {
        document.getElementById('stat-experts').textContent = this.expertData.length;

        // Calculate average consensus (% of experts choosing modal)
        let totalConsensus = 0;
        this.itemIds.forEach(itemId => {
            const key = this.scoringKey[itemId];
            totalConsensus += (key.modalCount / key.totalResponses) * 100;
        });
        const avgConsensus = (totalConsensus / this.itemIds.length).toFixed(1);
        document.getElementById('stat-consensus').textContent = `${avgConsensus}%`;
    }

    renderExpertList() {
        const container = document.getElementById('expert-list');

        container.innerHTML = this.expertData.map(expert => `
      <div class="expert-item">
        <span style="font-weight: 500;">${expert.name}</span>
        <span style="color: var(--text-muted);">${expert.specialty}</span>
        <span style="color: var(--text-muted);">${expert.years} years</span>
      </div>
    `).join('');
    }

    renderScoringKey() {
        const container = document.getElementById('scoring-key-container');

        let html = '';

        // Group by case
        SCT_DATA.cases.forEach(caseData => {
            html += `
        <div class="case-section">
          <h3 class="case-section__title">Case ${caseData.id}: ${caseData.title}</h3>
          <table class="scoring-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>-2</th>
                <th>-1</th>
                <th>0</th>
                <th>+1</th>
                <th>+2</th>
                <th>Modal</th>
                <th>Distribution</th>
              </tr>
            </thead>
            <tbody>
      `;

            caseData.items.forEach(item => {
                const key = this.scoringKey[item.id];
                const dist = key.distribution;
                const total = key.totalResponses;

                html += `
          <tr>
            <td>${item.id}</td>
            <td class="${key.modal === '-2' ? 'modal' : ''}">${key.weights['-2']}</td>
            <td class="${key.modal === '-1' ? 'modal' : ''}">${key.weights['-1']}</td>
            <td class="${key.modal === '0' ? 'modal' : ''}">${key.weights['0']}</td>
            <td class="${key.modal === '+1' ? 'modal' : ''}">${key.weights['+1']}</td>
            <td class="${key.modal === '+2' ? 'modal' : ''}">${key.weights['+2']}</td>
            <td style="font-weight: 700; color: var(--accent);">${key.modal}</td>
            <td>
              <div class="distribution-bar">
                ${['-2', '-1', '0', '+1', '+2'].map(val => {
                    const count = dist[val];
                    const width = (count / total) * 100;
                    return count > 0 ? `<div class="distribution-bar__segment" data-value="${val}" style="width: ${width}%;">${count}</div>` : '';
                }).join('')}
              </div>
            </td>
          </tr>
        `;
            });

            html += `
            </tbody>
          </table>
        </div>
      `;
        });

        container.innerHTML = html;
    }

    exportJSON() {
        const output = {};

        this.itemIds.forEach(itemId => {
            const key = this.scoringKey[itemId];
            output[itemId] = {
                "-2": parseFloat(key.weights['-2']),
                "-1": parseFloat(key.weights['-1']),
                "0": parseFloat(key.weights['0']),
                "+1": parseFloat(key.weights['+1']),
                "+2": parseFloat(key.weights['+2']),
                modal: key.modal
            };
        });

        const json = JSON.stringify(output, null, 2);
        document.getElementById('export-output').value = json;

        navigator.clipboard.writeText(json);
        this.showToast('JSON copied to clipboard!', 'success');
    }

    exportDataJS() {
        let output = `// SCT Scoring Key - Generated from ${this.expertData.length} experts\n`;
        output += `// Generated: ${new Date().toISOString()}\n\n`;
        output += `const scoringKey = {\n`;

        this.itemIds.forEach((itemId, index) => {
            const key = this.scoringKey[itemId];
            output += `  "${itemId}": { "-2": ${key.weights['-2']}, "-1": ${key.weights['-1']}, "0": ${key.weights['0']}, "+1": ${key.weights['+1']}, "+2": ${key.weights['+2']}, modal: "${key.modal}" }`;
            output += index < this.itemIds.length - 1 ? ',\n' : '\n';
        });

        output += `};\n\n`;
        output += `const expertDistribution = {\n`;

        this.itemIds.forEach((itemId, index) => {
            const key = this.scoringKey[itemId];
            const d = key.distribution;
            output += `  "${itemId}": { "-2": ${d['-2']}, "-1": ${d['-1']}, "0": ${d['0']}, "+1": ${d['+1']}, "+2": ${d['+2']} }`;
            output += index < this.itemIds.length - 1 ? ',\n' : '\n';
        });

        output += `};`;

        document.getElementById('export-output').value = output;

        navigator.clipboard.writeText(output);
        this.showToast('data.js format copied to clipboard!', 'success');
    }

    downloadCSV() {
        let csv = 'Item,Response -2,Response -1,Response 0,Response +1,Response +2,Modal Response,Weight -2,Weight -1,Weight 0,Weight +1,Weight +2\n';

        this.itemIds.forEach(itemId => {
            const key = this.scoringKey[itemId];
            const d = key.distribution;
            const w = key.weights;
            csv += `${itemId},${d['-2']},${d['-1']},${d['0']},${d['+1']},${d['+2']},${key.modal},${w['-2']},${w['-1']},${w['0']},${w['+1']},${w['+2']}\n`;
        });

        // Create download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sct_scoring_key_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        document.getElementById('export-output').value = csv;
        this.showToast('CSV downloaded!', 'success');
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
    window.adminApp = new AdminApp();
});
