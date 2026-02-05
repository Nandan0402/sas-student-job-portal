document.addEventListener('DOMContentLoaded', () => {

    // Login Modal
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const loginCloseBtn = document.querySelector('.login-close');

    // Application Modal
    const appModal = document.getElementById('applicationModal');
    const appCloseBtn = document.querySelector('.app-close');
    const appCancelBtn = document.querySelector('.app-cancel');
    const applyBtns = document.querySelectorAll('.apply-btn');
    const appModalTitle = document.getElementById('appModalTitle');

    // Helper: Open Modal
    const openModal = (modal) => {
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Helper: Close Modal
    const closeModal = (modal) => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    // ----------------------------------------
    // Login Modal Logic
    // ----------------------------------------
    loginBtn.addEventListener('click', () => openModal(loginModal));
    loginCloseBtn.addEventListener('click', () => closeModal(loginModal));

    // ----------------------------------------
    // Application Modal Logic
    // ----------------------------------------
    applyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const role = btn.getAttribute('data-role');
            appModalTitle.textContent = `Apply for ${role}`;
            openModal(appModal);
        });
    });

    appCloseBtn.addEventListener('click', () => closeModal(appModal));
    appCancelBtn.addEventListener('click', () => closeModal(appModal));

    // ----------------------------------------
    // Global Modal Logic (Click Outside / Escape)
    // ----------------------------------------
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === appModal) closeModal(appModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (loginModal.style.display === 'block') closeModal(loginModal);
            if (appModal.style.display === 'block') closeModal(appModal);
        }
    });

    // ----------------------------------------
    // Form Submissions
    // ----------------------------------------
    // Login Form
    const loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        simulateSubmission(submitBtn, 'Logging in...', 'Logged in successfully!', () => closeModal(loginModal));
    });

    // Application Form
    const appForm = document.querySelector('.application-form');
    appForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = appForm.querySelector('button[type="submit"]');
        simulateSubmission(submitBtn, 'Submitting...', 'Application Sent!', () => {
            closeModal(appModal);
            appForm.reset(); // Reset form after submission
        });
    });

    // Helper: Simulate API Call
    function simulateSubmission(btn, loadingText, successAlert, callback) {
        const originalText = btn.textContent;
        btn.textContent = loadingText;
        btn.disabled = true;

        setTimeout(() => {
            alert(successAlert);
            btn.textContent = originalText;
            btn.disabled = false;
            if (callback) callback();
        }, 1500);
    }
});
