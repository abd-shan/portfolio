
document.addEventListener('DOMContentLoaded', function() {
    // Architecture groups:
    // i18n, helpers, hero effects, observers, navigation/theme, interactions, fun section, visit counter
    document.body.classList.add('motion-ready');
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const langToggle = document.getElementById('langToggle');
    let currentLanguage = localStorage.getItem('lang') || 'en';
    let refreshTypewriterTexts = null;
    let refreshSpeedLabel = null;
    if (!['en', 'ar'].includes(currentLanguage)) currentLanguage = 'en';

    // ===== i18n dictionary =====
    const translations = {
        en: {
            nav_home: 'Home',
            nav_about: 'About',
            nav_projects: 'Projects',
            nav_skills: 'Skills',
            nav_experience: 'Experience',
            nav_contact: 'Contact',
            visit_label: 'visitors',
            visit_counter_prefix: '👀 visits:',
            visit_counter_empty: '👀 visits: —',
            hero_greeting: "Hello, I'm",
            hero_subtitle: 'Frontend Developer & Software Engineer',
            hero_type_prefix: "I'm a",
            hero_description: 'Passionate about creating exceptional digital experiences through clean code, innovative solutions, and cutting-edge technologies.',
            hero_cta_work: 'View My Work',
            hero_cta_contact: 'Get In Touch',
            hero_cta_cv: 'Download CV',
            about_title: 'About Me',
            about_p1: 'I am a <strong>Software Engineer</strong> specializing in frontend and full-stack development. I create high-performance, interactive applications using <strong>React.js</strong>, <strong>Next.js</strong>, and backend technologies like <strong>Node.js</strong>, <strong>Express.js</strong>, and <strong>Nest.js</strong>.',
            about_p2: 'I implement advanced algorithms and data structures, including <strong>Dijkstra</strong>, <strong>BST</strong>, <strong>AVL</strong>, and AI techniques like <strong>ExpectiMinMax</strong> for games such as Minesweeper and Ludo. I focus on bridging elegant UI with robust, scalable logic.',
            about_stat_projects: 'Projects',
            about_stat_years: 'Years Experience',
            about_stat_tech: 'Technologies',
            project_easy_apply_title: 'Easy Apply System',
            project_easy_apply_desc: 'A secure, dynamic portal for high-volume applications. Implemented a data-driven UI where all content is dynamically fetched and rendered based on admin configurations. <br><strong>No VPN, Syrian IP only</strong>',
            project_services_dashboard_title: 'CloudTech IT Platform',
            project_services_dashboard_desc: 'Full enterprise website with an advanced management dashboard covering RBAC, CMS, ticketing, backups, and application workflows.',
            project_selfcare_title: 'ISP Self-Care System',
            project_selfcare_desc: 'Customer portal for billing, session tracking, transactions, and subscription management. Built for real ISP operations.',
            project_hr_title: 'HR Management System',
            project_hr_desc: 'Enterprise HR system for a government hospital (<strong>~900 employees</strong>), deployed on-premise. Built <strong>role-based, KPI-driven dashboards</strong> and refactored UI routing into a <strong>domain-driven, Facade-based architecture</strong> for scalability and maintainability.',
            project_submarine_title: 'Submarine Simulation',
            project_submarine_desc: 'Advanced physics-based submarine motion simulation using real-world physics models.',
            project_career_title: 'Career Dashboard',
            project_career_desc: 'Comprehensive dashboard for managing job listings, companies, and employee data.',
            project_ludo_title: 'Ludo AI with ExpectiMinMax',
            project_ludo_desc: 'Advanced Ludo game implementation with AI using ExpectiMinMax algorithm.',
            project_aoun_title: 'Aoun Platform (Prototype)',
            project_aoun_desc: 'Early-stage mental health support platform focused on scalable UI architecture and modular design for future feature expansion.',
            project_dashnet_title: 'DashNet ISP Website',
            project_dashnet_desc: 'Corporate ISP website integrated with service packages, WhatsApp automation, and a linked self-care system for customers.',
            project_omni_title: 'Omni Smart Star ISP',
            project_omni_desc: 'ISP business website with customer onboarding, service plans, and an integrated self-care ecosystem.',
            project_alfateh_title: 'Alfateh Services Platform (In Progress)',
            project_alfateh_desc: 'Multi-service platform for Internet and TV with an integrated CMS and complaint management system, designed for extensibility.',
            project_modarnet_title: 'ModarNet Platform',
            project_modarnet_desc: 'Integrated company website combining ISP services and solar energy solutions with a unified service presentation.',
            project_management_dashboard_title: 'Management Dashboard',
            project_management_dashboard_desc: 'Internal admin dashboard for managing employees, services, permissions, and operational workflows.',
            exp_work_role_next: 'Next.js Developer',
            exp_work_desc_next: 'Built performant and SEO-optimized web applications using Next.js, leveraging both Server-Side Rendering (SSR) and Client-Side Rendering (CSR) techniques. Developed advanced dashboards with real-time interactivity, modular architecture, and dynamic routing using Next.js app directory structure.',
            exp_basic_role_se: 'Software Engineer',
            exp_basic_org_uni: 'My university',
            exp_basic_desc_se: 'Created game mechanics and AI systems for various projects. Implemented pathfinding algorithms and optimized game performance for different platforms.',
            exp_basic_role_fe: 'Frontend Developer',
            exp_basic_org_own: 'My Own Project',
            exp_basic_desc_fe: 'Developed and maintained responsive web applications using React.js and modern frontend technologies. Implemented complex UI components and optimized application performance.',
            projects_title: 'Featured Projects',
            projects_filter_all: 'All',
            projects_filter_web: 'Web Development',
            projects_filter_game: 'Game Development',
            projects_filter_ai: 'AI & Algorithms',
            skills_title: 'Skills & Expertise',
            experience_title: 'Work Experience',
            basic_experience_title: 'Basic Experience',
            contact_title: "Let's Connect",
            contact_email: 'Email',
            contact_phone: 'Phone',
            contact_location: 'Location',
            contact_ph_name: 'Your Name',
            contact_ph_email: 'Your Email',
            contact_ph_subject: 'Subject',
            contact_ph_message: 'Your Message',
            contact_send: 'Send Message',
            code_title: 'algorithm Minimax & Alpha-Beta',
            code_start: 'start',
            code_pause: 'Pause',
            code_resume: 'resume',
            code_speed: 'speed',
            speed_slow: 'slow',
            speed_normal: 'normal',
            speed_fast: 'fast',
            footer_subtitle: 'Frontend Developer & Software Engineer',
            footer_copyright: '© 2024 Abdulkader Shanbour. All Rights Reserved.',
            lang_toggle_label: 'Switch language',
            typewriter_roles: ['Software Engineer', 'React.js Developer', 'Next.js Developer', 'Problem Solver']
        },
        ar: {
            nav_home: 'الرئيسية',
            nav_about: 'من أنا',
            nav_projects: 'المشاريع',
            nav_skills: 'المهارات',
            nav_experience: 'الخبرة',
            nav_contact: 'التواصل',
            visit_label: 'زائر',
            visit_counter_prefix: '👀 الزيارات:',
            visit_counter_empty: '👀 الزيارات: —',
            hero_greeting: 'مرحباً، أنا',
            hero_subtitle: 'مطور واجهات أمامية ومهندس برمجيات',
            hero_type_prefix: 'أنا',
            hero_description: 'شغوف ببناء تجارب رقمية مميزة عبر كود نظيف وحلول مبتكرة وتقنيات حديثة.',
            hero_cta_work: 'استعرض أعمالي',
            hero_cta_contact: 'تواصل معي',
            hero_cta_cv: 'تحميل السيرة الذاتية',
            about_title: 'نبذة عني',
            about_p1: 'أنا <strong>Software Engineer</strong> متخصص في تطوير الواجهات والتطوير Full-stack. أقوم ببناء تطبيقات عالية الأداء وتفاعلية باستخدام <strong>React.js</strong> و <strong>Next.js</strong> وتقنيات Backend مثل <strong>Node.js</strong> و <strong>Express.js</strong> و <strong>Nest.js</strong>.',
            about_p2: 'أطوّر خوارزميات وهياكل بيانات متقدمة مثل <strong>Dijkstra</strong> و <strong>BST</strong> و <strong>AVL</strong> وتقنيات AI مثل <strong>ExpectiMinMax</strong> لألعاب مثل Minesweeper و Ludo. أركّز على الدمج بين واجهات أنيقة ومنطق قوي قابل للتوسع.',
            about_stat_projects: 'المشاريع',
            about_stat_years: 'سنوات الخبرة',
            about_stat_tech: 'التقنيات',
            project_easy_apply_title: 'نظام التقديم السريع',
            project_easy_apply_desc: 'بوابة آمنة وديناميكية لاستقبال أعداد كبيرة من الطلبات. تم تنفيذ واجهة تعتمد على البيانات بحيث يتم جلب كل المحتوى وعرضه ديناميكياً بناءً على إعدادات المسؤول. <br><strong>بدون VPN، متاح فقط عبر IP سوري</strong>',
            project_services_dashboard_title: 'منصة CloudTech IT',
            project_services_dashboard_desc: 'موقع مؤسسي متكامل مع لوحة إدارة متقدمة تشمل RBAC وCMS ونظام التذاكر وإدارة النسخ الاحتياطي وسير العمل.',
            project_selfcare_title: 'نظام ISP Self-Care',
            project_selfcare_desc: 'بوابة عملاء للفوترة وتتبع الجلسات والمعاملات وإدارة الاشتراكات، ومصممة لعمليات ISP الواقعية.',
            project_hr_title: 'نظام إدارة الموارد البشرية',
            project_hr_desc: 'نظام موارد بشرية لمشفى حكومي (<strong>~900 موظف</strong>) يعمل On-Premise. تم بناء <strong>لوحات تحكم تعتمد على الأدوار وKPI</strong> وإعادة هيكلة مسارات الواجهة ضمن <strong>domain-driven, Facade-based architecture</strong> لضمان القابلية للتوسع وسهولة الصيانة.',
            project_submarine_title: 'محاكاة الغواصة',
            project_submarine_desc: 'محاكاة متقدمة لحركة الغواصة اعتماداً على نماذج فيزيائية واقعية.',
            project_career_title: 'لوحة Career Dashboard',
            project_career_desc: 'لوحة شاملة لإدارة الوظائف والشركات وبيانات الموظفين.',
            project_ludo_title: 'لعبة Ludo مع ExpectiMinMax',
            project_ludo_desc: 'تنفيذ متقدم للعبة Ludo مع AI باستخدام خوارزمية ExpectiMinMax.',
            project_aoun_title: 'منصة Aoun (Prototype)',
            project_aoun_desc: 'منصة دعم للصحة النفسية في مرحلة مبكرة، تركز على بنية واجهة قابلة للتوسع وتصميم معياري للتوسع المستقبلي.',
            project_dashnet_title: 'موقع DashNet ISP',
            project_dashnet_desc: 'موقع شركة ISP مدمج مع باقات الخدمات وأتمتة واتساب ونظام Self-Care مرتبط للعملاء.',
            project_omni_title: 'Omni Smart Star ISP',
            project_omni_desc: 'موقع أعمال ISP مع تسجيل العملاء وخطط الخدمات ونظام Self-Care متكامل.',
            project_alfateh_title: 'منصة Alfateh Services (قيد العمل)',
            project_alfateh_desc: 'منصة متعددة الخدمات للإنترنت والتلفاز مع CMS مدمج ونظام شكاوى، ومصممة لتكون قابلة للتوسّع.',
            project_modarnet_title: 'منصة ModarNet',
            project_modarnet_desc: 'موقع شركة موحد يجمع بين خدمات ISP وحلول الطاقة الشمسية ضمن عرض خدمات واحد.',
            project_management_dashboard_title: 'لوحة الإدارة',
            project_management_dashboard_desc: 'لوحة إدارية داخلية لإدارة الموظفين والخدمات والصلاحيات وسير العمل التشغيلي.',
            exp_work_role_next: 'مطور Next.js',
            exp_work_desc_next: 'بناء تطبيقات ويب عالية الأداء ومحسّنة لمحركات البحث باستخدام Next.js مع توظيف Server-Side Rendering (SSR) وClient-Side Rendering (CSR). تطوير لوحات تحكم متقدمة بتفاعلية لحظية وبنية Modular ومسارات ديناميكية باستخدام Next.js app directory.',
            exp_basic_role_se: 'مهندس برمجيات',
            exp_basic_org_uni: 'جامعتي',
            exp_basic_desc_se: 'تطوير آليات اللعب وأنظمة AI لمشاريع متعددة، وتنفيذ خوارزميات pathfinding وتحسين أداء الألعاب على منصات مختلفة.',
            exp_basic_role_fe: 'Frontend Developer',
            exp_basic_org_own: 'مشروعي الخاص',
            exp_basic_desc_fe: 'تطوير وصيانة تطبيقات ويب متجاوبة باستخدام React.js وتقنيات Frontend الحديثة، مع تنفيذ مكونات UI معقدة وتحسين أداء التطبيق.',
            projects_title: 'مشاريع مميزة',
            projects_filter_all: 'الكل',
            projects_filter_web: 'تطوير الويب',
            projects_filter_game: 'تطوير الألعاب',
            projects_filter_ai: 'الذكاء الاصطناعي والخوارزميات',
            skills_title: 'المهارات والخبرة',
            experience_title: 'الخبرة العملية',
            basic_experience_title: 'خبرات أساسية',
            contact_title: 'لنتواصل',
            contact_email: 'البريد الإلكتروني',
            contact_phone: 'الهاتف',
            contact_location: 'الموقع',
            contact_ph_name: 'الاسم',
            contact_ph_email: 'البريد الإلكتروني',
            contact_ph_subject: 'الموضوع',
            contact_ph_message: 'رسالتك',
            contact_send: 'إرسال الرسالة',
            code_title: 'خوارزمية Minimax و Alpha-Beta',
            code_start: 'ابدأ',
            code_pause: 'إيقاف',
            code_resume: 'استئناف',
            code_speed: 'السرعة',
            speed_slow: 'بطيء',
            speed_normal: 'عادي',
            speed_fast: 'سريع',
            footer_subtitle: 'مطور واجهات أمامية ومهندس برمجيات',
            footer_copyright: '© 2024 عبدالقادر الشنبور. جميع الحقوق محفوظة.',
            lang_toggle_label: 'تبديل اللغة',
            typewriter_roles: ['مهندس برمجيات', 'مطور React.js', 'مطور Next.js', 'محلل مشكلات']
        }
    };

    function t(key) {
        return translations[currentLanguage][key] ?? translations.en[key] ?? key;
    }

    function applyTranslations() {
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            element.textContent = t(key);
        });

        document.querySelectorAll('[data-i18n-html]').forEach((element) => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.setAttribute('placeholder', t(key));
        });

        if (langToggle) {
            langToggle.textContent = currentLanguage === 'ar' ? 'EN' : 'AR';
            langToggle.setAttribute('aria-label', t('lang_toggle_label'));
        }
    }

    function setLanguage(lang) {
        currentLanguage = lang === 'ar' ? 'ar' : 'en';
        localStorage.setItem('lang', currentLanguage);
        applyTranslations();
        if (typeof refreshTypewriterTexts === 'function') {
            refreshTypewriterTexts();
        }
        if (typeof refreshSpeedLabel === 'function') {
            refreshSpeedLabel();
        }
    }

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLanguage === 'en' ? 'ar' : 'en');
        });
    }

    applyTranslations();

    // ===== shared helpers =====
    function closeMobileMenu(navLinks, hamburger) {
        if (!navLinks || !hamburger) return;
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }

    function syncThemeIcon(themeIcon, isLightMode) {
        if (!themeIcon) return;
        if (isLightMode) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // ===== hero effects =====
    function initHeroMouseLight() {
        if (!heroSection) return;
        if (!window.matchMedia('(pointer: fine)').matches) return;

        let rafId = null;
        let targetX = 50;
        let targetY = 50;

        heroSection.style.setProperty('--hero-light-x', '50%');
        heroSection.style.setProperty('--hero-light-y', '50%');
        heroSection.style.setProperty('--hero-light-opacity', '0');

        function applyLightPosition() {
            rafId = null;
            heroSection.style.setProperty('--hero-light-x', `${targetX}%`);
            heroSection.style.setProperty('--hero-light-y', `${targetY}%`);
        }

        heroSection.addEventListener('mouseenter', () => {
            heroSection.style.setProperty('--hero-light-opacity', 'var(--hero-light-opacity-active)');
        });

        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.setProperty('--hero-light-opacity', '0');
        });

        heroSection.addEventListener('mousemove', (event) => {
            const rect = heroSection.getBoundingClientRect();
            if (!rect.width || !rect.height) return;

            targetX = ((event.clientX - rect.left) / rect.width) * 100;
            targetY = ((event.clientY - rect.top) / rect.height) * 100;

            if (rafId === null) {
                rafId = requestAnimationFrame(applyLightPosition);
            }
        });
    }

    function initHeroScrollDepth() {
        if (!heroSection) return;
        const aboutSection = document.getElementById('about');
        if (!aboutSection) return;
        if (window.matchMedia('(max-width: 768px)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let rafId = null;
        let heroRange = Math.max(heroSection.offsetHeight, 1);

        function updateDepth() {
            rafId = null;
            const scrollY = window.scrollY || window.pageYOffset || 0;
            const progress = Math.min(Math.max(scrollY / heroRange, 0), 1);

            heroSection.style.setProperty('--hero-depth-bg-y', `${(progress * 16).toFixed(2)}px`);
            heroSection.style.setProperty('--hero-depth-fg-y', `${(-progress * 10).toFixed(2)}px`);
            heroSection.style.setProperty('--hero-depth-about-y', `${((1 - progress) * 14).toFixed(2)}px`);
        }

        function onScroll() {
            if (rafId === null) {
                rafId = requestAnimationFrame(updateDepth);
            }
        }

        function onResize() {
            heroRange = Math.max(heroSection.offsetHeight, 1);
            onScroll();
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        updateDepth();
    }

    initHeroMouseLight();
    initHeroScrollDepth();

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

    // ===== hero typewriter =====
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        let texts = translations[currentLanguage].typewriter_roles;

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        refreshTypewriterTexts = function() {
            texts = translations[currentLanguage].typewriter_roles;
            textIndex = 0;
            charIndex = 0;
            isDeleting = false;
            typewriterElement.textContent = '';
        };

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

    // ===== scroll interactions =====
    const scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) {
        window.addEventListener("scroll", () => {
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

    // ===== section observers =====
    function animateSkillBars() {
        document.querySelectorAll('.skill-progress').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    function animateAboutNumbers() {
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

    function handleSectionIntersection(entry, observer) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');

        if (entry.target.id === 'skills') {
            animateSkillBars();
        }

        if (entry.target.id === 'about') {
            animateAboutNumbers();
        }

        if (observer) {
            observer.unobserve(entry.target);
        }
    }

    const sectionNodes = document.querySelectorAll('.section');
    sectionNodes.forEach((section, index) => {
        const delay = Math.min(index * 70, 280);
        section.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => handleSectionIntersection(entry, observer));
        }, { threshold: 0.1 });

        sectionNodes.forEach(section => {
            observer.observe(section);
        });
    } else {
        sectionNodes.forEach((section) => section.classList.add('visible'));
    }

    // ===== project filtering =====
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

    // ========== إ  Navbar ==========
    // ===== navigation + theme =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle i');

    // Apply saved theme from previous sessions.
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        syncThemeIcon(themeIcon, true);
    }

    window.toggleMenu = function() {
        if (!navLinks || !hamburger) return;
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    };

    window.toggleTheme = function() {
        const isLightMode = document.body.classList.toggle('light-mode');
        syncThemeIcon(themeIcon, isLightMode);
        if (isLightMode) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    };

    if (hamburger) {
        hamburger.addEventListener('click', window.toggleMenu);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', window.toggleTheme);
    }


    document.addEventListener('click', function(e) {
        if (!navLinks || !hamburger) return;

        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !hamburger.contains(e.target)) {
            closeMobileMenu(navLinks, hamburger);
        }
    });


    window.addEventListener('resize', function() {
        if (!navLinks || !hamburger) return;
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMobileMenu(navLinks, hamburger);
        }
    });


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


                if (navLinks && navLinks.classList.contains('active')) {
                    closeMobileMenu(navLinks, hamburger);
                }
            }
        });
    });

    // Enhanced scroll indicator functionality
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
        if (heroSection && scrollIndicator) {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
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

    // ===== fun section code typing =====
    const codeOutput = document.getElementById('codeOutput');
    if (codeOutput) {
        const codeContainer = codeOutput.closest('.code-container');
        const codeSnippet = codeOutput.parentElement;
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
                speedValue.textContent = t('speed_slow');
            } else if (speedLevel < 15) {
                speedValue.textContent = t('speed_normal');
            } else {
                speedValue.textContent = t('speed_fast');
            }
        }

        refreshSpeedLabel = updateSpeedDisplay;

        function renderCode(code, withCursor) {
            codeOutput.textContent = code;

            if (withCursor) {
                const cursorElement = document.createElement('span');
                cursorElement.className = 'cursor';
                codeOutput.appendChild(cursorElement);
            }
        }

        // Type the code character by character
        function typeCode() {
            if (index < originalCode.length) {
                currentCode += originalCode.charAt(index);
                renderCode(currentCode, true);

                // Auto-scroll
                codeOutput.parentElement.scrollTop = codeOutput.parentElement.scrollHeight;

                index++;
            } else {
                clearInterval(typingInterval);
                isTyping = false;
                if (codeContainer) codeContainer.classList.remove('is-typing');
                if (codeSnippet) codeSnippet.classList.remove('is-active');
                renderCode(currentCode, false);

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
            if (codeContainer) codeContainer.classList.add('is-typing');
            if (codeSnippet) codeSnippet.classList.add('is-active');
            speed = 200 - (speedSlider.value * 9);
            typingInterval = setInterval(typeCode, speed);
        }

        // Stop typing
        function stopTyping() {
            if (!isTyping) return;
            clearInterval(typingInterval);
            isTyping = false;
            if (codeContainer) codeContainer.classList.remove('is-typing');
            if (codeSnippet) codeSnippet.classList.remove('is-active');
            // Remove cursor
            renderCode(currentCode, false);
        }

        // Reset code
        function resetCode() {
            stopTyping();
            currentCode = '';
            index = 0;
            renderCode('', true);
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

    // ===== visit counter =====
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


                const visitNumberNode = visitCountElement.querySelector('.visit-number');
                const visitLabelNode = visitCountElement.querySelector('.visit-text');
                if (visitNumberNode && visitLabelNode) {
                    visitNumberNode.textContent = visits.toLocaleString();
                    visitLabelNode.textContent = t('visit_label');
                } else {
                    visitCountElement.textContent = `${t('visit_counter_prefix')} ${visits.toLocaleString()}`;
                }
                visitCountElement.classList.add('animate-visit');
                setTimeout(() => visitCountElement.classList.remove('animate-visit'), 600);
            } catch (error) {
                console.error('Error:', error);
                const visitNumberNode = visitCountElement.querySelector('.visit-number');
                const visitLabelNode = visitCountElement.querySelector('.visit-text');
                if (visitNumberNode && visitLabelNode) {
                    visitNumberNode.textContent = '—';
                    visitLabelNode.textContent = t('visit_label');
                } else {
                    visitCountElement.textContent = t('visit_counter_empty');
                }
            }
        }

        updateVisitCount();
    }
});

