// Select elements
const failureRateInput = document.getElementById('failureRate');
const simulateBtn = document.getElementById('simulateBtn');
const checkpointBtn = document.getElementById('checkpointBtn');
const restoreBtn = document.getElementById('restoreBtn');
const canvas = document.getElementById('gridCanvas');
const resultsDiv = document.getElementById('results');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 600;
canvas.height = 400;

// Simulation state
let nodes = [];
let checkpointState = null;

// Initialize nodes
function initializeNodes() {
    nodes = [];
    for (let i = 0; i < 50; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            status: 'active' // Possible statuses: 'active', 'failed'
        });
    }
}

// Draw nodes on the canvas
function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = node.status === 'active' ? 'green' : 'red';
        ctx.fill();
        ctx.stroke();
    });
}

// Simulate failures based on the failure rate
function runSimulation() {
    const failureRate = parseFloat(failureRateInput.value) / 100;
    nodes.forEach(node => {
        if (Math.random() < failureRate) {
            node.status = 'failed';
        } else {
            node.status = 'active';
        }
    });
    drawNodes();
    displayOptimizationResults();
}

// Save the current checkpoint state
function saveCheckpoint() {
    checkpointState = JSON.parse(JSON.stringify(nodes));
    alert('Checkpoint saved successfully!');
}

// Restore the checkpoint state
function restoreCheckpoint() {
    if (checkpointState) {
        nodes = JSON.parse(JSON.stringify(checkpointState));
        drawNodes();
        alert('Checkpoint restored successfully!');
    } else {
        alert('No checkpoint saved!');
    }
}

// Display optimization results (placeholder logic)
function displayOptimizationResults() {
    const activeNodes = nodes.filter(node => node.status === 'active').length;
    const failedNodes = nodes.length - activeNodes;
    resultsDiv.innerHTML = `
        <p><strong>Optimization Results:</strong></p>
        <p>Active Nodes: ${activeNodes}</p>
        <p>Failed Nodes: ${failedNodes}</p>
    `;
}

// Event listeners
simulateBtn.addEventListener('click', runSimulation);
checkpointBtn.addEventListener('click', saveCheckpoint);
restoreBtn.addEventListener('click', restoreCheckpoint);

// Initialize the simulation on load
initializeNodes();
drawNodes();
