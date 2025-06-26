
        // Page Navigation
        document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const welcomePage = document.getElementById('welcomePage');
            const loginPage = document.getElementById('loginPage');
            const signupPage = document.getElementById('signupPage');
            const mainPage = document.getElementById('mainPage');
            const chatbotPage = document.getElementById('chatbotPage');
            
            // Buttons
            const loginBtn = document.getElementById('loginBtn');
            const signupBtn = document.getElementById('signupBtn');
            const homeBtn = document.getElementById('homeBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const goToLogin = document.getElementById('goToLogin');
            const goToSignup = document.getElementById('goToSignup');
            const doLogin = document.getElementById('doLogin');
            const doSignup = document.getElementById('doSignup');
            const scanBtn = document.getElementById('scanBtn');
            const chatbotBtn = document.getElementById('chatbotBtn');
            const sendMessage = document.getElementById('sendMessage');
            const messageInput = document.getElementById('messageInput');
            const chatMessages = document.getElementById('chatMessages');
            
            // Navigation Functions
            function showPage(page) {
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                page.classList.add('active');
            }
            
            // Welcome Page Actions
            loginBtn.addEventListener('click', () => showPage(loginPage));
            signupBtn.addEventListener('click', () => showPage(signupPage));
            
            // Auth Navigation
            goToLogin.addEventListener('click', () => showPage(loginPage));
            goToSignup.addEventListener('click', () => showPage(signupPage));
            
            // Login/Signup Actions
            doLogin.addEventListener('click', function() {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                if(email && password) {
                    showPage(mainPage);
                } else {
                    alert('Please enter both email and password');
                }
            });
            
            doSignup.addEventListener('click', function() {
                const name = document.getElementById('signupName').value;
                const email = document.getElementById('signupEmail').value;
                const password = document.getElementById('signupPassword').value;
                const confirm = document.getElementById('signupConfirm').value;
                
                if(name && email && password && confirm) {
                    if(password === confirm) {
                        showPage(mainPage);
                    } else {
                        alert('Passwords do not match');
                    }
                } else {
                    alert('Please fill all fields');
                }
            });
            
            // Main Page Actions
            scanBtn.addEventListener('click', function() {
                // Simulate scanning process
                scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
                scanBtn.disabled = true;
                
                setTimeout(() => {
                    // Update results with random values
                    const results = document.querySelectorAll('.result-value');
                    const statuses = ['positive', 'neutral', 'negative'];
                    
                    results.forEach(result => {
                        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                        result.textContent = 
                            randomStatus === 'positive' ? 'Low' : 
                            randomStatus === 'neutral' ? 'Moderate' : 'Elevated';
                        result.className = 'result-value ' + randomStatus;
                    });
                    
                    scanBtn.innerHTML = '<i class="fas fa-sync"></i> Scan Again';
                    scanBtn.disabled = false;
                    
                    // Show notification
                    alert('Face scan complete! Analysis results updated.');
                }, 3000);
            });
            
            chatbotBtn.addEventListener('click', () => showPage(chatbotPage));
            
            // Chatbot Functionality
            sendMessage.addEventListener('click', sendChatMessage);
            messageInput.addEventListener('keypress', function(e) {
                if(e.key === 'Enter') {
                    sendChatMessage();
                }
            });
            
            function sendChatMessage() {
                const message = messageInput.value.trim();
                if(message) {
                    // Add user message
                    addMessageToChat(message, 'user');
                    messageInput.value = '';
                    
                    // Simulate bot response after delay
                    setTimeout(() => {
                        const responses = [
                            "I understand. Could you tell me more about what's been on your mind?",
                            "That sounds challenging. Have you tried any relaxation techniques?",
                            "Thank you for sharing. How long have you been feeling this way?",
                            "I'm here to listen. What else would you like to talk about?",
                            "Your feelings are valid. Would you like to explore some coping strategies?"
                        ];
                        
                        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                        addMessageToChat(randomResponse, 'bot');
                    }, 1000);
                }
            }
            
            function addMessageToChat(message, sender) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message', sender);
                
                const now = new Date();
                const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                
                messageElement.innerHTML = `
                    ${message}
                    <div class="message-time">${timeString}</div>
                `;
                
                chatMessages.appendChild(messageElement);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
            
            // Header Navigation
            homeBtn.addEventListener('click', () => showPage(welcomePage));
            logoutBtn.addEventListener('click', function() {
                showPage(welcomePage);
                alert('You have been logged out successfully');
            });
            
            // Initialize with welcome page
            showPage(welcomePage);
        });
    