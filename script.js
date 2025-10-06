// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles
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

  // Enhanced Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
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
    
    let typeSpeed = 80;
    
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
  

  
  // Scroll to top button
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('active');
      document.querySelector('.navbar').classList.add('scrolled');
    } else {
      scrollBtn.classList.remove('active');
      document.querySelector('.navbar').classList.remove('scrolled');
    }
  });
  
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
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('show');
      }
    });
  });
  
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
      const scrollTop = window.pageYOffset;
      
      if (scrollTop > heroBottom - 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
      } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
      }
    }
  });
});


   document.addEventListener('DOMContentLoaded', function() {
            const codeOutput = document.getElementById('codeOutput');
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


}
`;
            
            let currentCode = '';
            let typingInterval;
            let index = 0;
            let isTyping = false;
            let speed = 100; 
            
            // Update speed display
            function updateSpeedDisplay() {
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
            }

            // Type the code character by character
            function typeCode() {
                if (index < originalCode.length) {
                    currentCode += originalCode.charAt(index);
                    const highlightedCode = highlightCode(currentCode);
                    

                    codeOutput.innerHTML = highlightedCode + '<span class="cursor"></span>';
                    

                    codeOutput.parentElement.scrollTop = codeOutput.parentElement.scrollHeight;
                    
                    index++;
                } else {
                    clearInterval(typingInterval);
                    isTyping = false;
                    codeOutput.innerHTML = highlightCode(currentCode);


                    setTimeout(() => {
                        resetCode();
                        startTyping();
                    }, 2000); 
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
            

            function stopTyping() {
                if (!isTyping) return;
                clearInterval(typingInterval);
                isTyping = false;
                // Remove cursor
                codeOutput.innerHTML = highlightCode(currentCode);
            }
            

            function resetCode() {
                stopTyping();
                currentCode = '';
                index = 0;
                codeOutput.innerHTML = '<span class="cursor"></span>';
            }
            

            startBtn.addEventListener('click', startTyping);
            stopBtn.addEventListener('click', stopTyping);
            resetBtn.addEventListener('click', resetCode);
            
            speedSlider.addEventListener('input', function() {
                updateSpeedDisplay();
                if (isTyping) {
                    stopTyping();
                    startTyping();
                }
            });
            

            resetCode();
            updateSpeedDisplay();
        });



  document.addEventListener('DOMContentLoaded', async () => {
    const el = document.getElementById('visitCount');
    // استعمل namespace/key فريدين لمشروعك
    const namespace = 'abd-shan';
    const key = 'portfolio_visits';
    const url = `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network response not ok');
      const json = await res.json();
      const visits = json?.value ?? 0;
      if (el) el.textContent = `👀 Visits: ${visits.toLocaleString()}`;
    } catch (err) {
      if (el) el.textContent = `👀 Visits: —`;
      console.error('CountAPI error:', err);
    }
  });