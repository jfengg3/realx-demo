gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {

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
  const logo = document.querySelector(".logo");
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

  // company section animation


  // who we are animation
  // Animation

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#who-we-are",
      start: "top top",
      end: "bottom top",
      scrub: true,
      pin: true
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
                  });
                }, 300);
              }, charsToRemove.length * 80 + 400);
            }, 500); // optional delay before animation starts
            document.body.classList.remove("no-scroll");
          }, 1000);
        }, 750);
      }, 2000);
    }, 2000);
  }, 1000);

  

  // Scroll event handler
  window.addEventListener("scroll", () => {
    if (!preloaderDone) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate hero height based on scroll position
    // Start at 100vh, reduce to 50vh by 50% scroll, then to 0 by 100% scroll
    let heroHeight;
    let videoHeight;
    let headerPosition;
    let opacity;

    if (scrollY < windowHeight * 0.5) {
      // First half of scroll: 100vh to 50vh
      const progress = scrollY / (windowHeight * 0.5);
      heroHeight = 100 - progress * 50;
      videoHeight = 100 - progress * 50;
      headerPosition = 50 - progress * 25;
      opacity = 1;
    } else if (scrollY < windowHeight) {
      // Second half of scroll: 50vh to 0
      const progress = (scrollY - windowHeight * 0.5) / (windowHeight * 0.5);
      heroHeight = 50 - progress * 50;
      videoHeight = 50 - progress * 50;
      headerPosition = 25 - progress * 25;
      opacity = 1 - progress;
    } else {
      // Beyond full scroll
      heroHeight = 0;
      videoHeight = 0;
      headerPosition = 0;
      opacity = 0;
    }

    // Apply calculated values
    hero.style.height = `${heroHeight}vh`;
    videoContainer.style.height = `${videoHeight}vh`;
    videoContainer.style.top = `${headerPosition}vh`;
    header.style.top = `${headerPosition}vh`;

    // Fade out elements as they shrink
    coordinates.style.opacity = opacity;

    // Hide hero completely when at 0 height
    if (heroHeight <= 0) {
      hero.style.display = "none";
    } else {
      hero.style.display = "flex";
    }
  });

  

});

gsap.set(window, { scrollTo: 0 });
  

