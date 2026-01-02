// script.js
document.addEventListener('DOMContentLoaded', function() {

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#3b82f6" },
                shape: { type: "circle" },
                opacity: { value: 0.1, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: false },
                move: { enable: true, speed: 1, direction: "none", random: true }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" } }
            }
        });
    }

    // Enhanced Typewriter effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const texts = [
            "Software Engineer",
            "React.js Developer",
            "Next.js Developer",
            "Problem Solver",
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function type() {
            if (isPaused) return;

            const currentText = texts[textIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 120;

            if (isDeleting) {
                typeSpeed /= 3;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Start typewriter after a delay
        setTimeout(type, 1500);

        // Pause typewriter on hover
        const typewriterContainer = document.querySelector('.typewriter-container');
        if (typewriterContainer) {
            typewriterContainer.addEventListener('mouseenter', () => {
                isPaused = true;
            });

            typewriterContainer.addEventListener('mouseleave', () => {
                isPaused = false;
                if (typewriterElement.textContent === '') {
                    setTimeout(type, 100);
                }
            });
        }
    }

    // Scroll to top button
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) {
        window.addEventListener("scroll", () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 300) {
                scrollBtn.classList.add('active');
                if (navbar) navbar.classList.add('scrolled');
            } else {
                scrollBtn.classList.remove('active');
                if (navbar) navbar.classList.remove('scrolled');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars
                if (entry.target.id === 'skills') {
                    document.querySelectorAll('.skill-progress').forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width + '%';
                    });
                }

                // Animate about numbers
                if (entry.target.id === 'about') {
                    document.querySelectorAll('.number').forEach(num => {
                        const target = parseInt(num.getAttribute('data-count'));
                        let count = 0;
                        const increment = target / 50;

                        const timer = setInterval(() => {
                            count += increment;
                            if (count >= target) {
                                num.textContent = target;
                                clearInterval(timer);
                            } else {
                                num.textContent = Math.ceil(count);
                            }
                        }, 20);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks) navLinks.classList.remove('show');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
            });
        });
    }

    // Enhanced scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add scroll indicator visibility
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (hero && scrollIndicator) {
            const heroBottom = hero.offsetTop + hero.offsetHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > heroBottom - 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        }
    });


    const codeOutput = document.getElementById('codeOutput');
    if (codeOutput) {
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const resetBtn = document.getElementById('resetBtn');
        const speedSlider = document.getElementById('speedSlider');
        const speedValue = document.getElementById('speedValue');

        const originalCode = `public class ExpectMinMax {
    Game game;
    final static int DEPTH = 3;

    public ExpectMinMax(Game game) {
        this.game = game;
    }


    public int bestOption(ArrayList<Integer> possibleMoves) {
        double bestScore = Double.NEGATIVE_INFINITY;
        int bestMove = -1;

        for (int move : possibleMoves) {
            double totalScore = 0.0;


            for (int dice = 1; dice <= 6; dice++) {
                Game simulatedGame = simulateGame(move, dice, game);
                double minMax = expectiminimax(simulatedGame, dice, DEPTH, true, move);
                double score = (1.0 / 6) * minMax;
                totalScore += score;
                System.out.println(minMax);
            }

            if (totalScore > bestScore) {
                bestScore = totalScore;
                bestMove = move;
            }
            System.out.println("totalScore: " + totalScore);
        }
        System.out.println("bestMove: " + bestScore);

        return bestMove;
    }


    private double expectiminimax(Game game, int resultDice, int depth, boolean isChance, int option) {
        if (depth == 0 || game.board.checkWinning()) {
            return heuristic(game);
        }

        if (isChance) {
            double expectedValue = 0.0;

            for (int diceRoll = 1; diceRoll <= 6; diceRoll++) {
                double probability = 1.0 / 6;
                Game childGame = simulateGame(option, diceRoll, game);

                    String nextNodeType = (game.board.players[game.currentPlayerIndex].getRole() == Role.Player) ? "Min" : "Max";
                expectedValue += probability * expectiminimax(childGame, resultDice, depth - 1, false, option);
            }

            return expectedValue;
        } else {
            if (game.board.players[game.currentPlayerIndex].getRole() == Role.Player) {
                double worstValue = Double.POSITIVE_INFINITY;

                for (int move : game.possibleMoves(resultDice)) {
                    Game childNode = simulateGame(move, resultDice, game);
                    worstValue = Math.min(worstValue, expectiminimax(childNode, resultDice, depth - 1, true, move));
                }

                return worstValue;
            } else {
                double bestValue = Double.NEGATIVE_INFINITY;

                for (int move : game.possibleMoves(resultDice)) {
                    Game childGame = simulateGame(move, resultDice, game);
                    bestValue = Math.max(bestValue, expectiminimax(childGame, resultDice, depth - 1, true, move));
                }

                return bestValue;
            }
        }
    }


    public double heuristic(Game game) {
        double score = 0;

        Player currentPlayer = game.board.players[game.currentPlayerIndex];
        score += scorePlayer(currentPlayer);

        Player opponuntPlayer = game.board.players[(game.currentPlayerIndex + 1) % 2];
        score -= scorePlayer(opponuntPlayer);

        return score;
    }

    private double scorePlayer(Player player) {
        double score = 0;

        if (player.emptyWiningBlocks() == 0)
            score += 100000;


        if (player.getRole() == Role.Player) {

            for (int token : player.getTokens()) {
                if (token > 0) score += 100;

                if (token>=23 - (4-player.emptyWiningBlocks()) && token<=25)
                    score +=90;

                if (isSave(token))
                    score += 10;

            }
        } else
        if (player.getRole() == Role.CPU) {
            for (int token : player.getTokens()) {

                if (token > 0) score += 1000;

                if (token>=10 - (4-player.emptyWiningBlocks()) && token<=12)
                    score +=399;
                if (token > 8 && token < 13)
                    score += token * 100;

                if (token >= 13)
                    score -= 5000;


                if (isSave(token))
                    score += 10;

                score += (4 - player.emptyWiningBlocks()) * 5000;


            }

        }

        return score;
    }

    boolean isWall(int[] tokens) {
        Set<Integer> set = new HashSet<>();
        for (int token : tokens) {
            if (set.contains(token))
                return true;
            set.add(token);
        }
        return false;
    }

    boolean isSave(int token) {
        return token == 22 || token == 9;
    }

    public Game simulateGame(int option, int diceResult, Game game) {
        Game newGame = game.clone();
        newGame.playMove(option, diceResult);
        return newGame;
    }


}`;

        let currentCode = '';
        let typingInterval;
        let index = 0;
        let isTyping = false;
        let speed = 100;

        // Update speed display
        function updateSpeedDisplay() {
            if (!speedSlider || !speedValue) return;

            const speedLevel = speedSlider.value;
            if (speedLevel < 5) {
                speedValue.textContent = 'slow';
            } else if (speedLevel < 15) {
                speedValue.textContent = 'normal';
            } else {
                speedValue.textContent = 'fast';
            }
        }

        function highlightCode(code) {
            return code
                .replace(/public class/g, '<span class="keyword">public class</span>')
                .replace(/public/g, '<span class="keyword">public</span>')
                .replace(/private/g, '<span class="keyword">private</span>')
                .replace(/static/g, '<span class="keyword">static</span>')
                .replace(/final/g, '<span class="keyword">final</span>')
                .replace(/int|double|boolean|void/g, '<span class="type">$&</span>')
                .replace(/if|else|for|return/g, '<span class="control">$&</span>')
                .replace(/true|false/g, '<span class="literal">$&</span>')
                .replace(/(\d+)/g, '<span class="number">$1</span>')
                .replace(/"(.*?)"/g, '<span class="string">"$1"</span>');
        }

        // Type the code character by character
        function typeCode() {
            if (index < originalCode.length) {
                currentCode += originalCode.charAt(index);
                const highlightedCode = highlightCode(currentCode);

                codeOutput.innerHTML = highlightedCode + '<span class="cursor"></span>';

                // Auto-scroll
                codeOutput.parentElement.scrollTop = codeOutput.parentElement.scrollHeight;

                index++;
            } else {
                clearInterval(typingInterval);
                isTyping = false;
                codeOutput.innerHTML = highlightCode(currentCode);

                setTimeout(() => {
                    resetCode();
                    startTyping();
                }, 3000);
            }
        }

        // Start typing
        function startTyping() {
            if (isTyping) return;

            if (index >= originalCode.length) {
                resetCode();
            }

            isTyping = true;
            speed = 200 - (speedSlider.value * 9);
            typingInterval = setInterval(typeCode, speed);
        }

        // Stop typing
        function stopTyping() {
            if (!isTyping) return;
            clearInterval(typingInterval);
            isTyping = false;
            // Remove cursor
            codeOutput.innerHTML = highlightCode(currentCode);
        }

        // Reset code
        function resetCode() {
            stopTyping();
            currentCode = '';
            index = 0;
            codeOutput.innerHTML = '<span class="cursor"></span>';
        }

        // Add event listeners if elements exist
        if (startBtn) startBtn.addEventListener('click', startTyping);
        if (stopBtn) stopBtn.addEventListener('click', stopTyping);
        if (resetBtn) resetBtn.addEventListener('click', resetCode);

        if (speedSlider) {
            speedSlider.addEventListener('input', function() {
                updateSpeedDisplay();
                if (isTyping) {
                    stopTyping();
                    startTyping();
                }
            });
        }

        resetCode();
        updateSpeedDisplay();
    }

    // Visit Counter
    const visitCountElement = document.getElementById('visitCount');
    if (visitCountElement) {
        async function updateVisitCount() {
            const binId = '68e3ffcf43b1c97be95ca1c8';
            const apiKey = '$2a$10$LYjVM.Pvo.EMR/aZ4khgouC4RAZEddX6mOb5TPtj7T2MIY7H77MUW';
            const url = `https://api.jsonbin.io/v3/b/${binId}`;

            try {

                const getResponse = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'X-Master-Key': apiKey,
                    },
                });

                if (!getResponse.ok) throw new Error('Failed to fetch visit count');
                const getData = await getResponse.json();
                let visits = getData.record.visits || 0;


                visits += 1;


                const updateResponse = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': apiKey,
                    },
                    body: JSON.stringify({ visits }),
                });

                if (!updateResponse.ok) throw new Error('Failed to update visit count');

                // عرض العدد
                visitCountElement.textContent = `👀 visits: ${visits.toLocaleString()}`;
                visitCountElement.classList.add('animate-visit');
                setTimeout(() => visitCountElement.classList.remove('animate-visit'), 600);
            } catch (error) {
                console.error('Error:', error);
                visitCountElement.textContent = '👀 visits: —';
            }
        }

        updateVisitCount();
    }
});