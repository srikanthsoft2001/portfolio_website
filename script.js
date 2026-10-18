/**
 * Portfolio Website Logic - Rangari Mahenderkar Srikanth
 * Pure Vanilla JavaScript (No frameworks or external libraries)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.querySelector('.navbar-wrapper');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const currentYearSpan = document.getElementById('current-year');
  const resumeButtons = [
    document.getElementById('download-resume-btn-nav'),
    document.getElementById('download-resume-btn-hero'),
    document.getElementById('download-resume-btn-footer')
  ].filter(Boolean);

  // Set Current Year in Footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     1. Scroll Progress Bar & Navbar Scroll State
     -------------------------------------------------------------------------- */
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Scroll progress width
    if (scrollHeight > 0 && scrollProgressBar) {
      const progress = (scrollTop / scrollHeight) * 100;
      scrollProgressBar.style.width = `${progress}%`;
    }

    // Navbar background enhancement
    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top button visibility
    if (backToTopBtn) {
      if (scrollTop > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* --------------------------------------------------------------------------
     2. Back to Top Button
     -------------------------------------------------------------------------- */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const toggleMobileMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close when clicking outside of menu
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Active Navigation Link on Scroll (Intersection Observer)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window) {
    const navObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, navObserverOptions);

    sections.forEach((section) => navObserver.observe(section));
  }

  /* --------------------------------------------------------------------------
     5. Scroll Reveal Animations (Intersection Observer)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserverOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Reveal only once for performance
        }
      });
    }, revealObserverOptions);

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* --------------------------------------------------------------------------
     6. Toast Notification Helper
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  const showToast = (message, duration = 3500) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  };

  /* --------------------------------------------------------------------------
     7. Working Download Resume Button
     - Provides formatted print/save as PDF trigger (window.print())
     - Generates and downloads official resume text copy
     -------------------------------------------------------------------------- */
  const resumeFullText = `RANGARI MAHENDERKAR SRIKANTH
Presales Executive – Software Development – Agile
Hyderabad, Telangana, India | +91-9705079862 | rmsrikanth25@gmail.com | LinkedIn | GitHub

PROFESSIONAL SUMMARY
Software Developer and Presales/Project Delivery professional currently at Cloudbox99 (Dec 2025–Present), operating across the full project lifecycle — from ideation and GTM strategy to hands-on implementation. Experienced in building full-stack web applications using React JS, TypeScript, Nest JS, and MongoDB, along with ERP customization on Odoo, REST API design, and cloud deployment across AWS and Azure. Also drives Scrum delivery (sprint planning, BRD, WBS, ceremonies) and cross-functional ISO 27001/ISMS and SOC compliance implementation, coordinating with HR, Admin, IT, Finance, and Sales & Marketing. OCI, AWS, and Azure certified, with a strong foundation in software architecture, version control, and Agile practices.

TECHNICAL SKILLS
• Front-End: React JS, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Material UI, Shadcn UI
• Back-End: NestJS, Fast API, Spring Framework (MVC, JPA), Spring Boot (Basics), J2SE, J2EE
• Databases & BaaS: MongoDB, MySQL, Oracle DB, Supabase
• Scrum Tools: Miro, Azure DevOps
• ORM Tools: TypeORM, Mongoose, Hibernate
• Cloud & DevOps: Azure, AWS, Oracle, Docker, Git, GitHub, CI/CD
• Tools & Testing: Postman, Swagger, ESLint, Husky, Maven
• IDEs: VS Code, IntelliJ IDEA, Eclipse
• ERP: Odoo Functional Programming (Sales, CRM, Invoicing, Website, Messaging modules), ERPNext (Frappe), XML, Python
• Learning: Rust, Go

PROFESSIONAL EXPERIENCE
Presales Executive — Cloudbox99 (Dec 2025 – Present)
• Working as Presales, owning project ideation, solutioning, and GTM strategy while driving delivery from planning through implementation across cross-functional teams.
• Served as Scrum Master and project manager on Arogya360, driving sprint planning, BRD, WBS, and Scrum ceremonies while coordinating delivery across testing, UI/UX, development, and deployment with TDD practices.
• Part of the cross-functional team implementing ISO 27001 controls and ISMS procedures across HR, Admin, IT, Finance, and Sales & Marketing, supporting internal and external audits.
• Led ideation and project management for EyeCloud, a video storage and surveillance platform (Proxmox, DVR/NVR, motion detection with metadata storage), and served as technical implementer using Docker, PostgreSQL, and Redis.
• Part of Cloud Sales in technical calls, quickly formulating public cloud solutions (VPS, Managed Cloud); as an AWS-partnered company, worked with networking, IT, and AWS teams to deliver effective, cost-optimized solutions for customer workloads.

Software Developer — Brahmatics Pvt Ltd (T-HUB) (Nov 2024 – Dec 2025)
• Developed and maintained “Beliveus,” an in-house product, using React (TypeScript), Tailwind CSS, and Shadcn UI for the front end and Nest JS with MongoDB for the back end.
• Built and maintained ERP functionality on Odoo for client Cybernous (a CISSP training institute), implementing the website, Sales, CRM, Invoicing, and Messaging modules.
• Followed code-quality practices using ESLint and Husky to ensure consistent, maintainable code across the team.

Software Developer Intern — Vider.in (3 Months)
• Customized the UI for “Atom” and “Atom Pro,” in-house applications, using React JS, TypeScript, and Material UI.
• Collaborated with the product team to translate design requirements into responsive, reusable front-end components.

KEY PROJECTS
ISO / ISMS Implementation, SOC 2 TYPE 2 Implementation
• Part of the cross-functional team implementing ISO 27001 controls, coordinating with HR, Admin, IT, Finance, and Sales & Marketing to roll out ISMS procedures and policies.
• Contributed to control implementation across a 2-month cycle, supporting internal and external audits with the ISMS team, including evidence collection for the ISMS audit.
• SOC 2 TYPE 2 Implementation for Webzion.

Arogya360 — Scrum Master / Project Management
• Serving as Scrum Master and project manager(Azure Devops), driving Scrum processes end-to-end including sprint planning, BRD, WBS, and Scrum ceremonies (daily stand-ups, sprint review, retrospective).
• Coordinating cross-functional delivery across testing, UI/UX, development, and deployment, with TDD implementation to strengthen code quality and delivery discipline.
• Part of the M1, M2 and M3 implementation of ABDM; conducted numerous doctor visits and prepared implementation-related material.

EyeCloud — Cloudbox99
• Led ideation and project management for EyeCloud, a video storage and surveillance platform (Proxmox, DVR/NVR, motion detection with metadata storage), and served as technical implementer using Docker, PostgreSQL, and Redis.

Beliveus — Brahmatics Pvt Ltd (T-HUB)
• Full-stack in-house platform built with React (TypeScript), Tailwind CSS, Shadcn UI, Nest JS, and MongoDB; integrated AWS cloud services for hosting and monitoring.

Odoo ERP Implementation — Cybernous
• Implemented and customized Website, Sales, CRM, Invoicing, and Messaging modules on Odoo ERP for a CISSP training institute client.

Atom & Atom Pro — Vider.in
• Customized application UI using React JS, TypeScript, and Material UI.

CERTIFICATIONS
• Claude Certified Architect Foundations
• AWS Certified Cloud Practitioner CLF-002
• Microsoft Certified: Azure Fundamentals – AZ-900
• Microsoft Certified: AI Transformation Leader – AB-731
• Planning to write DP-800, AI – 200, AWS SAA-003 and CAPM certification

EDUCATION
Master of Computer Applications (MCA) (2022 – 2024)
Raja Bahadur Venkata Rama Reddy Institute of Technology (affiliated to Osmania University) — CGPA: 8.19

Bachelor of Science (MPC) (2018 – 2021)
Tara Govt Degree and PG College, Sangareddy (affiliated to Osmania University) — CGPA: 8.49

Intermediate (M.P.C) (2016 – 2021)
Telangana State Residential Junior College, Sarvail — 933/1000

SSC (2016)
St. Joseph's High School, Sangareddy — GPA: 9.8

ACHIEVEMENTS & ACTIVITIES
• Multiple events in Hyderabad at venues such as Microsoft, Cokarma, T-Hub, etc.
• NHCX Hackathon with the team at IIT Hyderabad
• Attended NRCE, Pune, on Arogya360 — ABDM orientation and implementation
• Participated in Hackathon Devnote (AI project) with team at Microsoft Hyderabad
• Attended Odoo Community Days in Gujarat and multiple T-Hub events and seminars as a company member
• Secured First Place in SSC Board Exams
• Winner, National Chess Tournament, School Games Federation of India (SGFI), Under-19 Boys, 2018
• Runner-up, Eenadu Chess Tournament
• Selected for Nalgonda State Yoga Team, Under-19 category, 2017

LANGUAGES & LOCATION
Languages: English, Telugu, Hindi, Marathi, Lambadi
Location: Indresham, Hyderabad, Telangana 502319`;

  const downloadResumeFile = () => {
    try {
      const blob = new Blob([resumeFullText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Rangari_Mahenderkar_Srikanth_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('File download error:', err);
    }
  };

  resumeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Opening print dialog to Save as PDF & downloading document...');
      
      // Trigger document download
      downloadResumeFile();

      // Launch window print dialog formatted for resume
      setTimeout(() => {
        window.print();
      }, 700);
    });
  });
});
