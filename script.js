        // Quiz questions pool
        const questionsPool = [
            {
                question: "Which of the following is NOT a primitive data type in Java?",
                options: ["int", "boolean", "String", "char"],
                correct: 2
            },
            {
                question: "What does JVM stand for?",
                options: ["Java Virtual Machine", "Java Variable Method", "Java Verified Module", "Java Version Manager"],
                correct: 0
            },
            {
                question: "Which keyword is used to inherit a class in Java?",
                options: ["implements", "extends", "inherits", "super"],
                correct: 1
            },
            {
                question: "What is the default value of a boolean variable in Java?",
                options: ["true", "false", "null", "0"],
                correct: 1
            },
            {
                question: "Which method is called when an object is created in Java?",
                options: ["init()", "constructor", "create()", "new()"],
                correct: 1
            },
            {
                question: "What does MERN stack stand for?",
                options: ["MySQL, Express, React, Node", "MongoDB, Express, React, Node", "MongoDB, Express, Redux, Node", "MySQL, Express, Redux, Node"],
                correct: 1
            },
            {
                question: "Which of the following is a NoSQL database?",
                options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
                correct: 2
            },
            {
                question: "What is React primarily used for?",
                options: ["Backend development", "Database management", "Building user interfaces", "Server configuration"],
                correct: 2
            },
            {
                question: "Which of the following is used to manage state in React?",
                options: ["useState", "setState", "state", "All of the above"],
                correct: 3
            },
            {
                question: "What is Express.js?",
                options: ["A React library", "A web framework for Node.js", "A database", "A testing tool"],
                correct: 1
            },
            {
                question: "Which HTTP method is used to retrieve data?",
                options: ["POST", "PUT", "GET", "DELETE"],
                correct: 2
            },
            {
                question: "What is the purpose of package.json in Node.js?",
                options: ["To store images", "To manage dependencies", "To write CSS", "To create databases"],
                correct: 1
            },
            {
                question: "Which of the following is used for styling in React?",
                options: ["CSS modules", "Styled-components", "Regular CSS", "All of the above"],
                correct: 3
            },
            {
                question: "What is the virtual DOM in React?",
                options: ["A copy of the real DOM in memory", "A new HTML standard", "A database schema", "A server framework"],
                correct: 0
            },
            {
                question: "Which keyword is used to create a constant in JavaScript?",
                options: ["var", "let", "const", "final"],
                correct: 2
            },
            {
                question: "What is encapsulation in Java?",
                options: ["Hiding implementation details", "Creating objects", "Inheriting properties", "Method overloading"],
                correct: 0
            },
            {
                question: "Which operator is used to compare values and types in JavaScript?",
                options: ["==", "===", "!=", "!=="],
                correct: 1
            },
            {
                question: "What is middleware in Express.js?",
                options: ["A database connector", "Functions that execute during request-response cycle", "A React component", "A CSS framework"],
                correct: 1
            },
            {
                question: "Which method is used to add elements to the end of an array in JavaScript?",
                options: ["push()", "pop()", "shift()", "unshift()"],
                correct: 0
            },
            {
                question: "What is JSX in React?",
                options: ["A new JavaScript version", "JavaScript XML syntax extension", "A database query language", "A CSS preprocessor"],
                correct: 1
            }
        ];

        let currentQuestions = [];
        let currentQuestionIndex = 0;
        let selectedAnswers = [];
        let timer;
        let timeLeft = 600; // 10 minutes
        let quizStarted = false;

        // Initialize quiz
        function initQuiz() {
            // Select 15 random questions
            currentQuestions = getRandomQuestions(15);
            currentQuestionIndex = 0;
            selectedAnswers = new Array(15).fill(null);
            timeLeft = 600;
            quizStarted = true;
            
            document.getElementById('totalQuestions').textContent = currentQuestions.length;
            displayQuestion();
            startTimer();
            updateProgress();
        }

        // Get random questions from the pool
        function getRandomQuestions(count) {
            const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }

        // Display current question
        function displayQuestion() {
            const question = currentQuestions[currentQuestionIndex];
            const questionElement = document.getElementById('questionText');
            const optionsElement = document.getElementById('optionsContainer');
            
            questionElement.textContent = question.question;
            questionElement.classList.add('fade-in');
            
            optionsElement.innerHTML = '';
            question.options.forEach((option, index) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option;
                optionElement.onclick = () => selectOption(index);
                
                if (selectedAnswers[currentQuestionIndex] === index) {
                    optionElement.classList.add('selected');
                }
                
                optionsElement.appendChild(optionElement);
            });
            
            document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
            updateNavigationButtons();
            updateProgress();
        }

        // Select an option
        function selectOption(index) {
            if (!quizStarted) return;
            
            selectedAnswers[currentQuestionIndex] = index;
            
            // Remove previous selection
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selection to clicked option
            document.querySelectorAll('.option')[index].classList.add('selected');
        }

        // Next question
        function nextQuestion() {
            if (currentQuestionIndex < currentQuestions.length - 1) {
                currentQuestionIndex++;
                displayQuestion();
            }
        }

        // Previous question
        function previousQuestion() {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                displayQuestion();
            }
        }

        // Update navigation buttons
        function updateNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const finishBtn = document.getElementById('finishBtn');
            
            prevBtn.disabled = currentQuestionIndex === 0;
            
            if (currentQuestionIndex === currentQuestions.length - 1) {
                nextBtn.style.display = 'none';
                finishBtn.style.display = 'inline-block';
            } else {
                nextBtn.style.display = 'inline-block';
                finishBtn.style.display = 'none';
            }
        }

        // Update progress bar
        function updateProgress() {
            const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        // Start timer
        function startTimer() {
            timer = setInterval(() => {
                timeLeft--;
                
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                
                document.getElementById('timeLeft').textContent = 
                    `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    finishQuiz();
                }
            }, 1000);
        }

        // Finish quiz
        function finishQuiz() {
            clearInterval(timer);
            quizStarted = false;
            
            // Show correct answers with animation
            showAnswerReview(() => {
                setTimeout(() => {
                    calculateScore();
                    showResults();
                }, 2000);
            });
        }

        // Show answer review with animations
        function showAnswerReview(callback) {
            let reviewIndex = 0;
            
            function reviewNext() {
                if (reviewIndex >= currentQuestions.length) {
                    callback();
                    return;
                }
                
                currentQuestionIndex = reviewIndex;
                displayQuestion();
                
                setTimeout(() => {
                    const options = document.querySelectorAll('.option');
                    const question = currentQuestions[reviewIndex];
                    const userAnswer = selectedAnswers[reviewIndex];
                    
                    options.forEach((option, index) => {
                        if (index === question.correct) {
                            option.classList.add('correct');
                        } else if (index === userAnswer && index !== question.correct) {
                            option.classList.add('wrong');
                        }
                    });
                    
                    reviewIndex++;
                    setTimeout(reviewNext, 800);
                }, 500);
            }
            
            reviewNext();
        }

        // Calculate score
        function calculateScore() {
            let correct = 0;
            selectedAnswers.forEach((answer, index) => {
                if (answer === currentQuestions[index].correct) {
                    correct++;
                }
            });
            return correct;
        }

        
        function showResults() {
            const correct = calculateScore();
            const total = currentQuestions.length;
            const percentage = Math.round((correct / total) * 100);
            
            document.getElementById('quizContent').style.display = 'none';
            document.getElementById('resultContainer').style.display = 'block';
            
            document.getElementById('scoreText').textContent = `${percentage}%`;
            document.getElementById('correctAnswers').textContent = correct;
            document.getElementById('totalAnswered').textContent = total;
            
            const scoreCircle = document.getElementById('scoreCircle');
            const feedbackText = document.getElementById('feedbackText');
            
            
            if (percentage >= 80) {
                scoreCircle.className = 'score-circle score-excellent';
                feedbackText.className = 'feedback feedback-excellent';
                feedbackText.textContent = 'Excellent! You have a strong understanding of Java and MERN stack!';
            } else if (percentage >= 60) {
                scoreCircle.className = 'score-circle score-good';
                feedbackText.className = 'feedback feedback-good';
                feedbackText.textContent = 'Good job! You have a solid foundation, but there\'s room for improvement.';
            } else if (percentage >= 40) {
                scoreCircle.className = 'score-circle score-average';
                feedbackText.className = 'feedback feedback-average';
                feedbackText.textContent = 'Average performance. Consider reviewing the concepts and practicing more.';
            } else {
                scoreCircle.className = 'score-circle score-poor';
                feedbackText.className = 'feedback feedback-poor';
                feedbackText.textContent = 'Keep studying! Focus on understanding the fundamentals better.';
            }
        }

        // Retake quiz
        function retakeQuiz() {
            document.getElementById('resultContainer').style.display = 'none';
            document.getElementById('quizContent').style.display = 'block';
            initQuiz();
        }

        // Start the quiz when page loads
        window.onload = function() {
            initQuiz();
        };