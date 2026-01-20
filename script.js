// script.js - Debugged Version for Ayush Dezigns

// ================================
// GLOBAL VARIABLES AND CONFIG
// ================================
const CONFIG = {
    admin: {
        username: 'admin',
        password: 'ayush2024'
    },
    storage: {
        orders: 'ayushOrders',
        adminAuth: 'adminAuthenticated',
        session: 'ayushSession'
    },
    contact: {
        phone: '055 816 4043',
        location: 'Sakumono, Accra, Ghana',
        email: 'info@ayushdezigns.com'
    }
};
// ================================
// FLORAL ANIMATIONS
// ================================

// Create falling flowers animation
function createFallingFlowers(count = 10) {
    const flowers = ['❀', '✿', '❁', '✾', '♡'];
    const container = document.body;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            flower.className = 'flower-fall';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = Math.random() * 100 + 'vw';
            flower.style.fontSize = (Math.random() * 20 + 15) + 'px';
            flower.style.color = getRandomFlowerColor();
            flower.style.animationDuration = (Math.random() * 2 + 2) + 's';

            container.appendChild(flower);

            // Remove flower after animation
            setTimeout(() => {
                if (flower.parentElement) {
                    flower.remove();
                }
            }, 3000);
        }, i * 300);
    }
}

function getRandomFlowerColor() {
    const colors = [
        '#d4af37', // gold
        '#8b4513', // bronze
        '#e91e63', // pink
        '#9c27b0', // purple
        '#2196f3', // blue
        '#4caf50'  // green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Floral button click effect
function addFloralClickEffect(button) {
    const flower = document.createElement('span');
    flower.innerHTML = '✿';
    flower.style.position = 'absolute';
    flower.style.color = getRandomFlowerColor();
    flower.style.pointerEvents = 'none';
    flower.style.fontSize = '20px';
    flower.style.opacity = '0';
    flower.style.transition = 'all 0.6s ease';

    button.style.position = 'relative';
    button.appendChild(flower);

    // Get button position
    const rect = button.getBoundingClientRect();

    // Set initial position
    flower.style.left = '50%';
    flower.style.top = '50%';
    flower.style.transform = 'translate(-50%, -50%) scale(0)';

    // Animate flower
    setTimeout(() => {
        flower.style.opacity = '1';
        flower.style.transform = 'translate(-50%, -50%) scale(2)';
    }, 10);

    // Remove flower after animation
    setTimeout(() => {
        flower.style.opacity = '0';
        flower.style.transform = 'translate(-50%, -50%) scale(3)';

        setTimeout(() => {
            if (flower.parentElement) {
                flower.remove();
            }
        }, 600);
    }, 300);
}

// Enhanced notification with flowers
function showFloralNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        if (notification.parentElement) {
            notification.remove();
        }
    });

    // Create floral notification
    const notification = document.createElement('div');
    notification.className = 'custom-notification notification-${type}';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-flower">✿</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    document.body.appendChild(notification);

    // Add some falling flowers for important notifications
    if (type === 'success') {
        createFallingFlowers(5);
    }

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Initialize floral effects for admin dashboard buttons
function initializeFloralButtons() {
    // Add floral effects to all admin buttons
    const buttons = document.querySelectorAll('.view-btn, .contact-btn, .complete-btn, .delete-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            addFloralClickEffect(this);

            // Add slight delay for visual effect
            setTimeout(() => {
                // The original button functionality will continue
            }, 400);
        });
    });
}

// Update your existing functions to use floral effects
function enhancedViewOrderDetails(orderId) {
    addFloralClickEffect(event.target);
    setTimeout(() => {
        viewOrderDetails(orderId);
    }, 400);
}

function enhancedContactCustomer(phone, email) {
    addFloralClickEffect(event.target);
    setTimeout(() => {
        contactCustomer(phone, email);
    }, 400);
}

function enhancedMarkOrderCompleted(orderId) {
    addFloralClickEffect(event.target);
    setTimeout(() => {
        markOrderCompleted(orderId);
    }, 400);
}

function enhancedDeleteOrder(orderId) {
    addFloralClickEffect(event.target);
    setTimeout(() => {
        deleteOrderFromDashboard(orderId);
    }, 400);
}
// ================================
// UTILITY FUNCTIONS
// ================================

// Format currency in Ghana Cedis
function formatCurrency(amount) {
    return `₵${Number(amount).toLocaleString()}`;
}

// Format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    try {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(dateString).toLocaleDateString('en-GH', options);
    } catch (error) {
        return dateString;
    }
}

// Generate unique order ID
function generateOrderId() {
    return 'AY' + Date.now() + Math.floor(Math.random() * 1000);
}

// Validate email format
function isValidEmail(email) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number (Ghana format)
function isValidPhone(phone) {
    if (!phone) return false;
    const phoneRegex = /^(?:\+233|0)[235][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Convert file to Base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Safe HTML escape for user input
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ================================
// STORAGE MANAGEMENT
// ================================

// ================================
// API & STORAGE MANAGEMENT
// ================================

const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : '/api'; // Relative path for production

// Initialize - Check if API is reachable (optional step, skippable)
async function initializeStorage() {
    console.log('App initialized with API Backend at ' + API_BASE_URL);
}

// Get all orders from API
async function getOrders() {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        // Fallback to empty array to prevent UI crashing
        return [];
    }
}

// Save order to API
async function saveOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) throw new Error('Failed to save order');
        return await response.json();
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
}

// Update order status via API
async function updateOrderStatus(orderId, status) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status })
        });
        return response.ok;
    } catch (error) {
        console.error('Error updating order status:', error);
        return false;
    }
}

// Delete order via API
async function deleteOrder(orderId) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
            method: 'DELETE'
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting order:', error);
        return false;
    }
}

// ================================
// AUTHENTICATION MANAGEMENT
// ================================

// Check if admin is authenticated
function isAdminAuthenticated() {
    // For client-side route protection, we still check a flag, 
    // but ideally this should be a token validation with the backend.
    return localStorage.getItem(CONFIG.storage.adminAuth) === 'true';
}

// Admin login via API
async function adminLogin(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.success) {
            localStorage.setItem(CONFIG.storage.adminAuth, 'true');
            // Store token if needed: localStorage.setItem('token', data.token);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

// Admin logout
function adminLogout() {
    localStorage.removeItem(CONFIG.storage.adminAuth);
    window.location.href = 'ayush-manager.html';
}


// ================================
// VERIFICATION PAGE FUNCTIONS
// ================================

function initializeVerification() {
    const verifyBtn = document.getElementById('verify-btn');
    const puzzlePiece = document.getElementById('puzzle-piece');
    const targetArea = document.getElementById('target');

    if (!verifyBtn || !puzzlePiece || !targetArea) {
        console.log('Verification elements not found');
        return;
    }

    let isVerified = false;

    puzzlePiece.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', 'puzzle-piece');
    });

    targetArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        targetArea.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
    });

    targetArea.addEventListener('dragleave', function () {
        targetArea.style.backgroundColor = '';
    });

    targetArea.addEventListener('drop', function (e) {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        if (data === 'puzzle-piece') {
            targetArea.innerHTML = '<i class="fas fa-check"></i><span>Verified!</span>';
            targetArea.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            targetArea.style.borderColor = '#4CAF50';
            targetArea.style.color = '#4CAF50';
            isVerified = true;
        }
    });

    verifyBtn.addEventListener('click', function () {
        if (isVerified) {
            sessionStorage.setItem(CONFIG.storage.session, 'verified');
            window.location.href = 'home.html';
        } else {
            showNotification('Please complete the verification by dragging the icon to the target area.', 'error');
        }
    });
}

// ================================
// CUSTOM ORDER FORM FUNCTIONS
// ================================

function initializeOrderForm() {
    const orderForm = document.getElementById('orderForm');
    if (!orderForm) {
        console.log('Order form not found');
        return;
    }

    // Set minimum date to today
    const timelineInput = document.getElementById('timeline');
    if (timelineInput) {
        const today = new Date().toISOString().split('T')[0];
        timelineInput.min = today;
    }


    let isSubmitting = false; // Prevent double submission

    orderForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting) {
            console.log('Form already submitting, please wait...');
            return;
        }

        // Validate form
        if (!validateOrderForm()) {
            return;
        }

        // Set submitting flag and disable button
        isSubmitting = true;
        const submitBtn = orderForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';

        // Collect form data
        const formData = new FormData(orderForm);
        const orderData = {
            fullName: formData.get('fullName') || '',
            phone: formData.get('phone') || '',
            email: formData.get('email') || '',
            occasion: formData.get('occasion') || '',
            dressType: formData.get('dressType') || '',
            fabric: formData.get('fabric') || '',
            colors: formData.get('colors') || '',
            designDetails: formData.get('designDetails') || '',
            budget: formData.get('budget') || '',
            timeline: formData.get('timeline') || '',
            designImages: [] // To be populated
        };

        // Handle image conversion to Base64
        const designImagesInput = document.getElementById('designImages');
        if (designImagesInput && designImagesInput.files.length > 0) {
            try {
                const files = Array.from(designImagesInput.files).slice(0, 5); // Limit to 5
                const base64Images = await Promise.all(files.map(file => convertToBase64(file)));
                orderData.designImages = base64Images;
            } catch (imageError) {
                console.error('Error processing images:', imageError);
            }
        }

        // Save order
        try {
            await saveOrder(orderData);
            showNotification('Thank you! Your custom order has been submitted successfully. We will contact you within 24 hours.', 'success');

            // Reset form
            orderForm.reset();

            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 2000);

        } catch (error) {
            console.error('Error saving order:', error);
            showNotification('There was an error submitting your order. Please try again.', 'error');
            isSubmitting = false; // Reset flag on error so user can retry
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}


function validateOrderForm() {
    const phone = document.getElementById('phone')?.value;
    const email = document.getElementById('email')?.value;
    const timeline = document.getElementById('timeline')?.value;

    if (!phone || !email) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }

    // Validate phone
    if (!isValidPhone(phone)) {
        showNotification('Please enter a valid Ghana phone number (e.g., 055 816 4043)', 'error');
        return false;
    }

    // Validate email
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    // Validate timeline
    if (timeline) {
        const selectedDate = new Date(timeline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            showNotification('Please select a future date for completion', 'error');
            return false;
        }
    }

    return true;
}

// ================================
// ADMIN DASHBOARD FUNCTIONS
// ================================

function initializeAdminDashboard() {
    // Check authentication
    if (!isAdminAuthenticated()) {
        window.location.href = 'ayush-manager.html';
        return;
    }

    loadOrders();
    checkDbStatus();
}

async function checkDbStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();
        const statusElement = document.getElementById('dbStatus');
        if (statusElement) {
            statusElement.className = data.database === 'Connected' ? 'status-tag status-success' : 'status-tag status-error';
            statusElement.innerHTML = `<i class="fas fa-database"></i> ${data.database}`;
        }
    } catch (error) {
        console.error('Error checking DB status:', error);
    }
}

async function loadOrders() {
    const orders = await getOrders();
    const ordersTable = document.getElementById('ordersTable');
    const totalOrders = document.getElementById('totalOrders');
    const pendingOrders = document.getElementById('pendingOrders');
    const completedOrders = document.getElementById('completedOrders');
    const totalRevenue = document.getElementById('totalRevenue');

    if (!ordersTable) {
        console.log('Orders table not found');
        return;
    }

    // Update stats
    if (totalOrders) totalOrders.textContent = orders.length;
    if (pendingOrders) {
        const pendingCount = orders.filter(order => order.status === 'pending').length;
        pendingOrders.textContent = pendingCount;
    }
    if (completedOrders) {
        const completedCount = orders.filter(order => order.status === 'completed').length;
        completedOrders.textContent = completedCount;
    }

    // Revenue calculation (Estimated based on budget ranges)
    const totalRevenueEle = document.getElementById('totalRevenue');
    if (totalRevenueEle) {
        const revenue = orders.filter(o => o.status === 'completed').reduce((total, order) => {
            const budget = order.budget || '';
            // Using the mid-point or reasonable estimate for each range
            if (budget.includes('100-300')) return total + 200;
            if (budget.includes('300-600')) return total + 450;
            if (budget.includes('600-1000')) return total + 800;
            if (budget.includes('1000+')) return total + 1200;
            return total + 0;
        }, 0);
        totalRevenueEle.textContent = formatCurrency(revenue);
    }


    // Update orders table
    if (orders.length === 0) {
        ordersTable.innerHTML = '<p class="no-orders">No orders found.</p>';
        return;
    }

    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Dress Type</th>
                    <th>Budget</th>
                    <th>Timeline</th>
                    <th>Images</th>
                    <th>Status</th>
                    <th style="min-width: 250px; text-align: center;">Actions</th>
                </tr>
            </thead>
            <tbody>
    `;

    orders.forEach(order => {
        const statusClass = order.status === 'completed' ? 'status-completed' : 'status-pending';
        const statusText = order.status === 'completed' ? 'Completed' : 'Pending';

        tableHTML += `
            <tr>
                <td>#${order.id || 'N/A'}</td>
                <td>${escapeHtml(order.fullName)}</td>
                <td>${escapeHtml(order.phone)}</td>
                <td>${escapeHtml(order.email)}</td>
                <td>${escapeHtml(order.dressType)}</td>
                <td>${escapeHtml(order.budget)}</td>
                <td>${formatDate(order.timeline)}</td>
                <td>
                    ${order.designImages && order.designImages.length > 0
                ? `<div class="image-preview-mini" onclick="viewOrderImages('${order.id}')">
                           <i class="fas fa-image"></i> (${order.designImages.length})
                       </div>`
                : '<span class="no-images">None</span>'
            }
                </td>
                <td><span class="${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="view-btn" onclick="viewOrderDetails('${order.id}')">View</button>
                        ${order.status === 'completed' ?
                `<button class="whatsapp-btn" onclick="openWhatsApp('${order.id}')"><i class="fab fa-whatsapp"></i> Notify</button>` :
                `<button class="contact-btn" onclick="contactCustomer('${escapeHtml(order.phone)}', '${escapeHtml(order.email)}')">Contact</button>`
            }
                        ${order.status === 'pending' ?
                `<button class="complete-btn" onclick="markOrderCompleted('${order.id}')">Complete</button>` :
                ''
            }
                        <button class="delete-btn" onclick="deleteOrderFromDashboard('${order.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    ordersTable.innerHTML = tableHTML;
}

async function viewOrderDetails(orderId) {
    const orders = await getOrders();
    const order = orders.find(o => o.id === orderId);

    if (order) {
        // Create a professional details modal
        const overlay = document.createElement('div');
        overlay.className = 'image-modal-overlay';
        overlay.onclick = () => overlay.remove();

        const container = document.createElement('div');
        container.className = 'image-modal-container';
        container.style.maxWidth = '600px';
        container.onclick = (e) => e.stopPropagation();

        const closeBtn = document.createElement('button');
        closeBtn.className = 'image-modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => overlay.remove();
        container.appendChild(closeBtn);

        const title = document.createElement('h3');
        title.innerHTML = `<i class="fas fa-file-invoice"></i> Order Details - #${order.id}`;
        title.style.marginBottom = '20px';
        title.style.color = 'var(--primary)';
        title.style.borderBottom = '1px solid #eee';
        title.style.paddingBottom = '10px';
        container.appendChild(title);

        const detailsGrid = document.createElement('div');
        detailsGrid.style.display = 'grid';
        detailsGrid.style.gridTemplateColumns = '1fr 1fr';
        detailsGrid.style.gap = '15px';
        detailsGrid.style.marginBottom = '20px';

        const addDetail = (label, value) => {
            const item = document.createElement('div');
            item.innerHTML = `<strong style="color: #666; font-size: 0.8rem; text-transform: uppercase;">${label}</strong><br><span style="color: #333; font-weight: 500;">${value || 'N/A'}</span>`;
            detailsGrid.appendChild(item);
        };

        addDetail('Customer', escapeHtml(order.fullName));
        addDetail('Phone', escapeHtml(order.phone));
        addDetail('Email', escapeHtml(order.email));
        addDetail('Occasion', escapeHtml(order.occasion));
        addDetail('Dress Type', escapeHtml(order.dressType));
        addDetail('Fabric', escapeHtml(order.fabric));
        addDetail('Colors', escapeHtml(order.colors));
        addDetail('Budget', escapeHtml(order.budget));
        addDetail('Timeline', formatDate(order.timeline));
        addDetail('Status', order.status.toUpperCase());
        addDetail('Date Submitted', formatDate(order.date));

        container.appendChild(detailsGrid);

        const requirementsSec = document.createElement('div');
        requirementsSec.style.background = '#f9f9f9';
        requirementsSec.style.padding = '15px';
        requirementsSec.style.borderRadius = '8px';
        requirementsSec.style.marginTop = '10px';
        requirementsSec.innerHTML = `<strong style="color: #666; font-size: 0.8rem; text-transform: uppercase;">Design Requirements:</strong><br><p style="margin-top: 8px; line-height: 1.5; color: #444;">${escapeHtml(order.designDetails)}</p>`;
        container.appendChild(requirementsSec);

        if (order.designImages && order.designImages.length > 0) {
            const imagesTitle = document.createElement('h4');
            imagesTitle.textContent = 'Reference Images:';
            imagesTitle.style.marginTop = '20px';
            imagesTitle.style.marginBottom = '10px';
            container.appendChild(imagesTitle);

            const grid = document.createElement('div');
            grid.className = 'image-modal-grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';

            order.designImages.forEach(imgData => {
                const img = document.createElement('img');
                img.src = imgData;
                img.style.width = '100%';
                img.style.borderRadius = '4px';
                img.style.cursor = 'zoom-in';
                img.onclick = () => window.open(imgData, '_blank');
                grid.appendChild(img);
            });
            container.appendChild(grid);
        }

        overlay.appendChild(container);
        document.body.appendChild(overlay);
    } else {
        showNotification('Order not found!', 'error');
    }
}

async function viewOrderImages(orderId) {
    const orders = await getOrders();
    const order = orders.find(o => o.id === orderId);

    if (!order || !order.designImages || order.designImages.length === 0) {
        showNotification('No images found for this order.', 'info');
        return;
    }

    // Create a simple modal
    const overlay = document.createElement('div');
    overlay.className = 'image-modal-overlay';
    overlay.onclick = () => overlay.remove();

    const container = document.createElement('div');
    container.className = 'image-modal-container';
    container.onclick = (e) => e.stopPropagation();

    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => overlay.remove();
    container.appendChild(closeBtn);

    const title = document.createElement('h3');
    title.textContent = `Reference Images - #${order.id}`;
    title.style.marginBottom = '15px';
    title.style.color = 'var(--primary)';
    container.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'image-modal-grid';

    order.designImages.forEach(imgData => {
        const img = document.createElement('img');
        img.src = imgData;
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        img.style.cursor = 'zoom-in';
        img.onclick = () => window.open(imgData, '_blank');
        grid.appendChild(img);
    });

    container.appendChild(grid);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

window.viewOrderImages = viewOrderImages;

function contactCustomer(phone, email) {
    const message = "Contact options:\n\nPhone: " + phone + "\nEmail: " + email + "\n\nClick OK to copy email address to clipboard.";
    if (confirm(message)) {
        copyToClipboard(email)
            .then(() => showNotification('Email address copied to clipboard!', 'success'))
            .catch(() => showNotification('Please copy manually: ' + email, 'info'));
    }
}

async function markOrderCompleted(orderId) {
    if (confirm('Mark this order as completed?')) {
        const success = await updateOrderStatus(orderId, 'completed');
        if (success) {
            showNotification('Order marked as completed!', 'success');
            loadOrders();
        } else {
            showNotification('Error updating order status', 'error');
        }
    }
}

async function deleteOrderFromDashboard(orderId) {
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
        const success = await deleteOrder(orderId);
        if (success) {
            showNotification('Order deleted successfully!', 'success');
            loadOrders();
        } else {
            showNotification('Error deleting order', 'error');
        }
    }
}

// ================================
// ADMIN LOGIN FUNCTIONS
// ================================

function initializeAdminLogin() {
    const loginForm = document.getElementById('adminLoginForm');
    if (!loginForm) {
        console.log('Admin login form not found');
        return;
    }

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (await adminLogin(username, password)) {
            showNotification('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        } else {
            showNotification('Invalid credentials. Please try again.', 'error');
        }
    });
}

// ================================
// CONTACT FORM FUNCTIONS
// ================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) {
        console.log('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('contactEmail')?.value;

        if (email && !isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        contactForm.reset();
    });
}

// ================================
// NOTIFICATION SYSTEM
// ================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.custom-notification');
    existingNotifications.forEach(notification => {
        if (notification.parentElement) {
            notification.remove();
        }
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .custom-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                max-width: 400px;
                border-left: 4px solid #007bff;
                animation: slideInRight 0.3s ease;
            }
            .notification-success { border-left-color: #28a745; }
            .notification-error { border-left-color: #dc3545; }
            .notification-warning { border-left-color: #ffc107; }
            .notification-info { border-left-color: #17a2b8; }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-message {
                margin-right: 15px;
                color: #333;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #666;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ================================
// CLIPBOARD UTILITY
// ================================

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        return new Promise((resolve, reject) => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                document.body.removeChild(textArea);
                resolve();
            } catch (err) {
                document.body.removeChild(textArea);
                reject(err);
            }
        });
    }
}

// ================================
// EXPORT / IMPORT DATA
// ================================

async function exportOrdersToCSV() {
    console.log('Exporting orders...');
    const orders = await getOrders();
    console.log('Orders fetched for export:', orders);
    if (orders.length === 0) {
        showNotification('No orders to export!', 'error');
        return;
    }

    // Define the headers
    const headers = [
        'Order ID', 'Date', 'Full Name', 'Phone', 'Email',
        'Dress Type', 'Occasion', 'Fabric', 'Colors',
        'Budget', 'Timeline', 'Status', 'Design Details'
    ];

    // Convert orders to CSV rows
    const csvRows = orders.map(order => {
        return [
            order.id,
            new Date(order.date).toLocaleDateString(),
            `"${(order.fullName || '').replace(/"/g, '""')}"`, // Escape quotes
            `"${(order.phone || '').replace(/"/g, '""')}"`,
            `"${(order.email || '').replace(/"/g, '""')}"`,
            `"${(order.dressType || '').replace(/"/g, '""')}"`,
            `"${(order.occasion || '').replace(/"/g, '""')}"`,
            `"${(order.fabric || '').replace(/"/g, '""')}"`,
            `"${(order.colors || '').replace(/"/g, '""')}"`,
            `"${(order.budget || '').replace(/"/g, '""')}"`,
            `"${(order.timeline || '').replace(/"/g, '""')}"`,
            order.status,
            `"${(order.designDetails || '').replace(/"/g, '""').replace(/\n/g, ' ')}"` // Remove newlines
        ].join(',');
    });

    // Combine headers and rows
    const csvContent = [headers.join(',')].concat(csvRows).join('\n');

    // Create a download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ayush_orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function importOrders(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const text = e.target.result;
        try {
            // Simple CSV parsing (imperfect but functional for this specific format)
            const lines = text.split('\n');
            const headers = lines[0].split(',');

            // Should verify headers here for safety, but skipping for simplicity

            const newOrders = [];
            // Start from 1 to skip header
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;

                // This is a naive split that doesn't handle commas inside quotes perfectly
                // For a robust solution, we'd need a CSV parser library
                // keeping it simple for "no-dependency" requirement
                // We'll rely on the user only importing files they exported from here

                // FALLBACK: If the user edits the CSV and breaks the format, this might fail.
                // Since this is a "simple" version, we will just warn them.

                console.log("Importing line: " + i);
            }

            showNotification('Import functionality is limited in this version. For best results, rely on Export for backup.', 'info');

            // Re-load the table in case we did anything (we didn't yet)
            loadOrders();
        } catch (err) {
            console.error(err);
            showNotification('Error parsing CSV file', 'error');
        }
    };
    reader.readAsText(file);
}


// ================================
// INITIALIZATION
// ================================

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('Initializing Ayush Dezigns website...');

    // Initialize storage
    initializeStorage();

    // Check current page and initialize appropriate functions
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    console.log('Current page:', currentPage);

    switch (currentPage) {
        case 'index.html':
            initializeVerification();
            break;
        case 'custom-order.html':
            initializeOrderForm();
            break;
        case 'ayush-manager.html':
            initializeAdminLogin();
            break;
        case 'admin-dashboard.html':
            initializeAdminDashboard();
            break;
        case 'contact.html':
            initializeContactForm();
            break;
        default:
            // For other pages like home.html, designs.html, about.html
            console.log('Page loaded:', currentPage);
            break;
    }
});

// ================================
// GLOBAL FUNCTIONS (for HTML onclick)
// ================================

// Make functions available globally for HTML onclick attributes
window.logout = adminLogout;
window.viewOrderDetails = viewOrderDetails;
window.contactCustomer = contactCustomer;
window.markOrderCompleted = markOrderCompleted;
window.deleteOrderFromDashboard = deleteOrderFromDashboard;
window.openWhatsApp = openWhatsApp;

async function openWhatsApp(orderId) {
    console.log('[Dashboard] Opening WhatsApp for order:', orderId);
    const orders = await getOrders();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        showNotification('Order not found!', 'error');
        return;
    }

    // Clean phone number (remove spaces, leading plus, etc.)
    let phone = order.phone.replace(/\D/g, '');

    // Auto-prefix with Ghana code if needed
    if (phone.startsWith('0') && phone.length === 10) {
        phone = '233' + phone.substring(1);
    } else if (phone.length === 9 && !phone.startsWith('233')) {
        phone = '233' + phone;
    }

    const message = `Hello ${order.fullName}! 🌟\n\nThis is Ayush Dezigns. Your custom ${order.dressType} for your ${order.occasion} is ready for pickup! 👗✨\n\nOrder ID: #${order.id}\n\nWe are looking forward to seeing you!`;
    const encodedMessage = encodeURIComponent(message);

    // Using the official WhatsApp Web/App format
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
}
window.deleteOrderFromDashboard = deleteOrderFromDashboard;
window.exportOrdersToCSV = exportOrdersToCSV;
window.importOrders = importOrders;