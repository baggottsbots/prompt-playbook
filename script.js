document.addEventListener('DOMContentLoaded', () => {
            const buyBtn = document.getElementById('buy-btn');
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');

            const validateEmail = (email) => {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email.toLowerCase());
            };

            const triggerError = () => {
                emailInput.classList.add('shake');
                emailInput.style.borderColor = '#ef4444';
                emailError.style.display = 'block';
                
                setTimeout(() => {
                    emailInput.classList.remove('shake');
                }, 400);
            };

            const resetError = () => {
                emailInput.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                emailError.style.display = 'none';
            };

            emailInput.addEventListener('input', resetError);

            buyBtn.addEventListener('click', () => {
                const email = emailInput.value.trim();

                if (!email || !validateEmail(email)) {
                    triggerError();
                    return;
                }

                const paymentData = {
                    amountCents: 1900,
                    productName: "The Prompt Engineering Playbook",
                    productDescription: "50 AI prompt templates PDF eBook",
                    email: email
                };

                if (typeof window.__processPayment === 'function') {
                    window.__processPayment(paymentData);
                } else {
                    console.warn("window.__processPayment is not defined. Simulating call with data:", paymentData);
                }
            });
        });