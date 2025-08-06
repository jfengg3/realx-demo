gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
});

// Integrate Lenis with GSAP ScrollTrigger
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Set up GSAP ticker with Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

document.addEventListener("DOMContentLoaded", function () {
  // Initialize smooth scroll trigger for hero section
  let isScrolling = false;
  let lastScrollTime = 0;
  let lastScrollTop = 0;

  // Function to animate to content
  function smoothScrollToContent() {
    if (isScrolling) return;
    isScrolling = true;

    // Create a timeline for smooth coordinated animations
    const tl = gsap.timeline({
      onComplete: () => { isScrolling = false }
    });

    // Animate hero elements
    tl.to(header, {
      y: -30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0)
    .to(coordinates, {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0.1)
    .to(videoContainer, {
      scale: 0.95,
      opacity: 0.8,
      duration: 0.8,
      ease: "power2.inOut"
    }, 0)
    // Scroll to content
    .to(window, {
      duration: 1.4,
      scrollTo: { y: ".company-section", autoKill: false },
      ease: "power4.inOut"
    }, 0)
    // Fade in grid content
    .from(".company-section", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, 0.4);
  }

  // Function to animate back to hero
  function smoothScrollToHero() {
    if (isScrolling) return;
    isScrolling = true;

    const tl = gsap.timeline({
      onComplete: () => { isScrolling = false }
    });

    tl.to(window, {
      duration: 1.2,
      scrollTo: { y: 0, autoKill: false },
      ease: "power2.inOut"
    }, 0)
    .to([header, coordinates], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.1
    }, 0.3)
    .to(videoContainer, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, 0.3);
  }

  // Create markers for scroll positions
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom -100%",
    onUpdate: (self) => {
      const now = Date.now();
      const currentScroll = window.pageYOffset;
      const scrollVelocity = Math.abs(currentScroll - lastScrollTop) / Math.max(1, now - lastScrollTime);
      
      // Only trigger if we're not already scrolling
      if (!isScrolling) {
        // Scrolling down from hero
        if (currentScroll < window.innerHeight && currentScroll > lastScrollTop) {
          smoothScrollToContent();
        }
        // Scrolling up to hero
        else if (currentScroll < window.innerHeight * 1.2 && currentScroll < lastScrollTop && scrollVelocity > 0.5) {
          smoothScrollToHero();
        }
      }
      
      lastScrollTop = currentScroll;
      lastScrollTime = now;
    }
  });

  // Additional wheel event listener for precise scrolling
  window.addEventListener('wheel', (e) => {
    const currentScroll = window.pageYOffset;
    const isAtHero = currentScroll < window.innerHeight;
    const isNearContent = Math.abs(currentScroll - window.innerHeight) < 200;
    
    if (!isScrolling && ((isAtHero && e.deltaY > 0) || (isNearContent && e.deltaY < 0))) {
      e.preventDefault();
      if (e.deltaY > 0) {
        smoothScrollToContent();
      } else {
        smoothScrollToHero();
      }
    }
  }, { passive: false });

  const hero = document.querySelector(".hero");
  const counter = document.getElementById("counter");
  const progressBar = document.querySelector(".progress-bar");
  const progressLine = document.querySelector(".progress-line");
  const videoContainer = document.querySelector(".video-container");
  const headerSpans = document.querySelectorAll(".header span");
  const coordinatesSpans = document.querySelectorAll(".coordinates span");
  const header = document.querySelector(".header");
  const coordinates = document.querySelector(".coordinates");
  const content = document.querySelector(".content");
  const mainFooter = document.querySelector(".main-footer");
  const contactButton = document.querySelector(".contact");
  const whoWeAreSection = document.querySelector(".who-we-are-section");
  const gridContainer = document.querySelector(".grid-container");
  const logoChars = document.querySelectorAll("#logo-text .char");

  // scroll-wrap animation
  gsap.to(".scroll-wrap", {
    x: () => {
      const container = document.querySelector(".scroll-wrap");
      const scrollAmount = container.scrollWidth - window.innerWidth;
      return -scrollAmount;
    },
    ease: "none",
    scrollTrigger: {
      trigger: "#sectionPin",
      start: "top top",
      end: () => {
        const container = document.querySelector(".scroll-wrap");
        const scrollAmount = container.scrollWidth - window.innerWidth;
        return "+=" + scrollAmount;
      },
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  });

  // Company section animations
  const companyTL = gsap.timeline({
    scrollTrigger: {
      trigger: ".company-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });

  // Animate title
  companyTL.to(".company-title", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate text lines
  gsap.utils.toArray(".text-line").forEach((line, i) => {
    companyTL.to(line, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");
  });

  // Animate stats with counting effect
  gsap.utils.toArray(".stat-item").forEach((stat, i) => {
    const targetValue = parseInt(stat.getAttribute("data-value"));
    const statNumber = stat.querySelector(".stat-number");
    
    companyTL.to(stat, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");

    companyTL.to(statNumber, {
      duration: 2,
      snap: { textContent: 1 },
      textContent: targetValue,
      ease: "power1.inOut"
    }, "-=0.4");
  });

  // Add hover effect on stats
  gsap.utils.toArray(".stat-item").forEach(stat => {
    stat.addEventListener("mouseenter", () => {
      gsap.to(stat, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    stat.addEventListener("mouseleave", () => {
      gsap.to(stat, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // who we are animation
  // Animation
  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    if (scroll > window.innerHeight * 2) { // Adjust this threshold as needed
      lenis.setConfig({ lerp: 0.05 }); // Slower, smoother scroll
    } else {
      lenis.setConfig({ lerp: 0.1 }); // Default scroll speed
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#who-we-are",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: true,
      onEnter: () => {
        lenis.setConfig({ lerp: 0.05 }); // Slower scroll on section enter
      },
      onLeave: () => {
        lenis.setConfig({ lerp: 0.1 }); // Normal scroll on section leave
      },
      onUpdate: (self) => {
        // Smooth out the parallax effect
        const velocity = Math.abs(self.getVelocity()) / 2000;
        lenis.setConfig({ lerp: Math.min(0.1, 0.05 + velocity) });
      }
    }
  });

  // Fade out header
  tl.to(".who-header", {
    opacity: 0,
    y: -100,
    ease: "none"
  });

  // Scale REAL X text
  tl.to(".realx-text", {
    fontSize: "25vw", // Scales sharply
    ease: "none"
  }, "<");

  // TEXT 1: Fade in from bottom, then fade out by 50%
  tl.fromTo(".text-1", {
    opacity: 0,
    y: 100
  }, {
    opacity: 1,
    y: -350,
    ease: "power2.out",
    duration: 0.5
  }, "<");

  tl.to(".text-1", {
    opacity: 0,
    y: -500,
    ease: "power2.in",
    duration: 0.5
  }, "+=0.2");

  // TEXT 2: Fade in from bottom at 50%, then fade out by 100%
  tl.fromTo(".text-2", {
    opacity: 0,
    y: 100
  }, {
    opacity: 1,
    y: -350,
    ease: "power2.out",
    duration: 0.5
  }, "+=0.1");

  tl.to(".text-2", {
    opacity: 0,
    y: -500,
    ease: "power2.in",
    duration: 0.5
  });


 
  // Set initial states
  videoContainer.style.transform =
    "translate(-50%, -50%) scale(0) rotate(-20deg)";
  content.style.opacity = "0";
  // lock scrolling
  document.body.classList.add("no-scroll");

  // Animate to full screen after delay
  setTimeout(() => {
    videoContainer.style.clipPath =
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
  }, 1000);


  // Set initial state for logo characters
  logoChars.forEach((char, index) => {
    char.style.opacity = "1";
    char.style.transform = "translateY(0)";
  });

  let preloaderDone = false;

  // First animation after 1s
  setTimeout(() => {
    hero.style.clipPath = "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)";
    hero.style.transition = "clip-path 1.5s cubic-bezier(.87,0,.13,1)";

    // Animate progress line
    progressLine.style.width = "25%";
    progressLine.style.transition = "width 1.5s cubic-bezier(.87,0,.13,1)";

    // Second animation after 2s
    setTimeout(() => {
      hero.style.clipPath = "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)";
      progressBar.style.width = "100vw";
      progressBar.style.transition = "width 2s cubic-bezier(.87,0,.13,1)";

      // Animate progress line to full width
      progressLine.style.width = "100%";
      progressLine.style.transition = "width 2s cubic-bezier(.87,0,.13,1)";

      // Count up to 100
      let count = 0;
      const interval = setInterval(() => {
        count++;
        counter.textContent = count;
        if (count >= 100) clearInterval(interval);
      }, 20);

      // Final animation after 2s
      setTimeout(() => {
        hero.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        hero.style.transition = "clip-path 1s cubic-bezier(.87,0,.13,1)";

        // Video container
        videoContainer.style.clipPath =
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        videoContainer.style.transform =
          "translate(-50%, -50%) scale(1) rotate(0deg)";
        videoContainer.style.transition =
          "transform 1.25s cubic-bezier(.87,0,.13,1), clip-path 1.25s cubic-bezier(.87,0,.13,1)";

        // Hide progress bar and line
        progressBar.style.opacity = "0";
        progressLine.style.opacity = "0";
        progressBar.style.transition = "opacity 0.3s ease";
        progressLine.style.transition = "opacity 0.3s ease";

        // Reveal texts after 750ms
        setTimeout(() => {
          headerSpans.forEach((span, i) => {
            span.style.transform = "translateY(0%)";
            span.style.transition = `transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${
              0.125 * i
            }s`;
          });

          coordinatesSpans.forEach((span, i) => {
            span.style.transform = "translateY(0%)";
            span.style.transition = `transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${
              0.125 * i
            }s`;
          });

          // Show content after text reveal
          setTimeout(() => {
            content.style.opacity = "1";
            whoWeAreSection.style.opacity = "1";
            gridContainer.style.opacity = "1";
            preloaderDone = true;

            // Get references
            const logo = document.getElementById("logo");
            const logoText = document.getElementById("logo-text");
            const logoIcon = document.getElementById("logo-icon");
            const logoChars = Array.from(logoText.textContent).map((char, i) => {
              const span = document.createElement("span");
              span.textContent = char;
              logoText.appendChild(span);
              return span;
            });

            logoText.style.opacity = "1";
            logoText.style.transition = "opacity 0.5s ease";

            // Remove original text and append spans
            logoText.textContent = "";
            logoChars.forEach((span) => logoText.appendChild(span));

            // Wait a short time before starting animation
            setTimeout(() => {
              // Get all characters except the first
              const charsToRemove = logoChars.slice(1);

              charsToRemove.forEach((char, i) => {
                setTimeout(() => {
                  char.style.opacity = "0";
                  setTimeout(() => {
                    char.style.display = "none";
                  }, 300);
                }, i * 80);
              });

              // After all characters are removed
              setTimeout(() => {
                // Move logo to bottom-left (use GSAP or simple CSS/JS)
                logo.style.position = "fixed";
                logo.style.left = "20px";
                logo.style.top = "auto";
                logo.style.transform = "translateX(0)";
                logo.style.transition = "all 0.5s ease";

                // Hide remaining first letter and show icon
                logoText.style.display = "none";
                logoIcon.style.display = "inline-block";

                // Then animate footer after a delay
                setTimeout(() => {
                  mainFooter.style.opacity = "1";
                  mainFooter.style.transform = "translateY(0)";

                  contactButton.style.opacity = "1";
                  contactButton.style.transform = "translateY(0)";

                  // Animate footer links with staggered delay
                  const footerLinks = document.querySelectorAll(".main-footer a");
                  footerLinks.forEach((link, i) => {
                    link.style.opacity = "0";
                    link.style.transform = "translateY(10px)";

                    setTimeout(() => {
                      link.style.opacity = "1";
                      link.style.transform = "translateY(0)";
                      link.style.transition =
                        "opacity 0.4s ease, transform 0.4s ease";
                    }, i * 150);
                    document.body.classList.remove("no-scroll");
                  });
                }, 300);
              }, charsToRemove.length * 80 + 400);
            }, 500); // optional delay before animation starts
          }, 1000);
        }, 750);
        
      }, 2000);
    }, 2000);
  }, 1000);

  

  

  // Create scroll-triggered animations
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    onUpdate: (self) => {
      if (!preloaderDone) return;

      const progress = self.progress;
      
      // Transform hero section based on scroll progress
      gsap.to(hero, {
        height: `${Math.max(0, 100 - (progress * 100))}vh`,
        duration: 0.1,
        overwrite: true
      });
      
      gsap.to(videoContainer, {
        height: `${Math.max(0, 100 - (progress * 100))}vh`,
        top: `${Math.max(0, 50 - (progress * 50))}vh`,
        duration: 0.1,
        overwrite: true
      });
      
      gsap.to(header, {
        top: `${Math.max(0, 50 - (progress * 50))}vh`,
        duration: 0.1,
        overwrite: true
      });
      
      gsap.to([coordinates, header], {
        opacity: 1 - progress,
        duration: 0.1,
        overwrite: true
      });
    }
  });

  

});

gsap.set(window, { scrollTo: 0 });
  

