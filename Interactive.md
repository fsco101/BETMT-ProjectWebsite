1.Edit: CENTRALIZED COMPRESSED AIR DISTRIBUTION SYSTEM in the Hero section
Use this to improve: Build a headline entrance where every letter rises out of an invisible mask. Split the heading into one span per character (keep a wrapper per line with overflow: hidden and a little bottom padding so descenders are not clipped). Each character is display: inline-block and starts at transform: translateY(118%); animate it to translateY(0) with a 700ms cubic-bezier(.32,.72,0,1) curve, staggering the start by 40-60ms per character through a CSS variable (animation-delay: calc(var(--i) \* 55ms)). Trigger it when the heading scrolls into view with an IntersectionObserver (threshold 0.4), adding a class once. Only animate transform. Use a large semibold face with tight tracking (-0.04em) and let the last line use your accent color. Under prefers-reduced-motion show the final state with no animation. Keep the real text in the DOM (aria-label on the wrapper, aria-hidden on decorative pieces). Plain HTML, CSS and JS, no libraries.

code: <!doctype html>

<!-- Split headline reveal - BrewedOps Motion Library, https://brewedops.cloud/motionlibrary/?id=hero-split-reveal -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Split headline reveal</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
<style>
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #F2F5FA;
}

.frame {
width: min(92vw,560px);
aspect-ratio: 4/3;
border-radius: 20px;
overflow: hidden;
box-shadow: 0 1px 2px rgba(16,24,40,.06),0 20px 50px rgba(16,24,40,.12);
}

.d {
--ml-bg: #FFFFFF;
--ml-surface: #F4F7FC;
--ml-line: #E3E9F2;
--ml-bar: #DCE4F0;
--ml-bar-2: #EBF0F7;
--ml-ink: #1D1D1F;
--ml-accent: #0A6CFF;
--ml-grad: linear-gradient(135deg,#0A6CFF 0%,#4FA3FF 100%);
--ml-shadow: 0 1px 2px rgba(16,24,40,.06),0 8px 24px rgba(16,24,40,.08);
--ml-ease: cubic-bezier(.32,.72,0,1);
--ml-font: "Geist",-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
background: var(--ml-bg);
color: var(--ml-ink);
font: 500 12px/1.35 var(--ml-font);
-webkit-font-smoothing: antialiased;
}

.d _,
.d _::before,
.d \*::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

.d button,
.d input,
.d select,
.d textarea {
font: inherit;
color: inherit;
}

@media (prefers-reduced-motion: reduce) {
.d _,
.d _::before,
.d \*::after {
animation-duration: .01ms !important;
animation-iteration-count: 1 !important;
transition-duration: .01ms !important;
scroll-behavior: auto !important;
}
}

/_ Split headline reveal _/
.d {
display: grid;
place-items: center;
background: var(--ml-surface);
}

.d .win {
width: 88%;
height: 88%;
display: flex;
flex-direction: column;
background: var(--ml-bg);
border-radius: 12px;
box-shadow: var(--ml-shadow);
overflow: hidden;
}

.d .bar {
display: flex;
align-items: center;
gap: 4px;
padding: 8px 10px;
border-bottom: 1px solid var(--ml-line);
flex: none;
}

.d .bar i {
width: 6px;
height: 6px;
border-radius: 50%;
background: var(--ml-bar);
}

.d .bar .url {
margin-left: 8px;
width: 40%;
height: 6px;
border-radius: 3px;
background: var(--ml-bar-2);
}

.d .pg {
position: relative;
flex: 1;
overflow: hidden;
background: var(--ml-bg);
}

.d .nv {
position: absolute;
top: 0;
left: 0;
right: 0;
z-index: 3;
display: flex;
align-items: center;
gap: 6px;
padding: 8px 10px;
}

.d .nv b {
width: 10px;
height: 10px;
border-radius: 3px;
background: var(--ml-accent);
}

.d .nv span {
width: 14px;
height: 4px;
border-radius: 2px;
background: var(--ml-bar);
}

.d .nv span:first-of-type {
margin-left: auto;
}

.d .cta {
height: 15px;
width: 54px;
border-radius: 999px;
background: var(--ml-grad);
box-shadow: 0 4px 10px rgba(10,108,255,.25);
}

.d .b {
height: 5px;
border-radius: 3px;
background: var(--ml-bar);
}

.d .b.s {
width: 40%;
}

.d .b.m {
width: 66%;
}

.d .ac {
color: var(--ml-accent);
}

.d .c {
position: absolute;
inset: 0;
padding-top: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.d .ln {
overflow: hidden;
padding: 1px 6px 4px;
font: 700 20px/1.08 var(--ml-font);
letter-spacing: -.035em;
}

.d .ln span {
display: block;
animation: rise 5s var(--ml-ease) infinite both;
animation-delay: var(--d);
}

.d .fd {
width: 56%;
display: flex;
justify-content: center;
animation: fd 5s var(--ml-ease) infinite both;
animation-delay: .45s;
}

.d .fd .b {
width: 100%;
}

@keyframes rise {
0%,
3% {
transform: translateY(115%);
}

16%,
80% {
transform: none;
}

93%,
100% {
transform: translateY(-115%);
}
}

@keyframes fd {
0%,
10% {
opacity: 0;
transform: translateY(8px);
}

24%,
80% {
opacity: 1;
transform: none;
}

92%,
100% {
opacity: 0;
}
}
</style>

</head>
<body>
<div class="frame"><div class="d">
<div class="win"><div class="bar"><i></i><i></i><i></i><span class="url"></span></div><div class="pg "><div class="nv"><b></b><span></span><span></span><span></span></div><div class="c">
<div class="ln"><span style="--d:0s">Design that</span></div>
<div class="ln"><span style="--d:.13s">moves people,</span></div>
<div class="ln"><span class="ac" style="--d:.26s">not pixels.</span></div>
<div class="fd" style="margin-top:9px"><div class="b m"></div></div>
<div class="fd" style="margin-top:8px;animation-delay:.6s"><div class="cta"></div></div></div></div></div>
</div></div>
</body>
</html>

2.  Edit: Add a Introducing the team text in between section of meet the team and project objectives
    Use this to improve: Build a seamless horizontal text ticker (marquee) with two rows moving in opposite directions. Make one track per row containing the same group of items repeated four times, each item followed by a small star or dot separator in your accent color. Animate the track with transform: translateX(0) to translateX(-50%), linear, infinite, 14-18 seconds, so the second half lines up exactly with the first (the repeated groups must together be wider than the viewport). Row two uses animation-direction: reverse and outlined text (-webkit-text-stroke with the fill set to the background color and paint-order: stroke fill, so variable-font glyph overlaps never show inner lines). Fade the edges with mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent). Pause on hover with animation-play-state: paused, set aria-hidden on the duplicated groups, and replace the motion with a static wrapped list under prefers-reduced-motion.

        Code: <!doctype html>

    <!-- Kinetic marquee - BrewedOps Motion Library, https://brewedops.cloud/motionlibrary/?id=hero-kinetic-marquee -->
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Kinetic marquee</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
    <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: #F2F5FA;
    }

.frame {
width: min(92vw,560px);
aspect-ratio: 4/3;
border-radius: 20px;
overflow: hidden;
box-shadow: 0 1px 2px rgba(16,24,40,.06),0 20px 50px rgba(16,24,40,.12);
}

.d {
--ml-bg: #FFFFFF;
--ml-surface: #F4F7FC;
--ml-line: #E3E9F2;
--ml-bar: #DCE4F0;
--ml-bar-2: #EBF0F7;
--ml-ink: #1D1D1F;
--ml-accent: #0A6CFF;
--ml-grad: linear-gradient(135deg,#0A6CFF 0%,#4FA3FF 100%);
--ml-shadow: 0 1px 2px rgba(16,24,40,.06),0 8px 24px rgba(16,24,40,.08);
--ml-font: "Geist",-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
background: var(--ml-bg);
color: var(--ml-ink);
font: 500 12px/1.35 var(--ml-font);
-webkit-font-smoothing: antialiased;
}

.d _,
.d _::before,
.d \*::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

.d button,
.d input,
.d select,
.d textarea {
font: inherit;
color: inherit;
}

@media (prefers-reduced-motion: reduce) {
.d _,
.d _::before,
.d \*::after {
animation-duration: .01ms !important;
animation-iteration-count: 1 !important;
transition-duration: .01ms !important;
scroll-behavior: auto !important;
}
}

/_ Kinetic marquee _/
.d {
display: grid;
place-items: center;
background: var(--ml-surface);
}

.d .win {
width: 88%;
height: 88%;
display: flex;
flex-direction: column;
background: var(--ml-bg);
border-radius: 12px;
box-shadow: var(--ml-shadow);
overflow: hidden;
}

.d .bar {
display: flex;
align-items: center;
gap: 4px;
padding: 8px 10px;
border-bottom: 1px solid var(--ml-line);
flex: none;
}

.d .bar i {
width: 6px;
height: 6px;
border-radius: 50%;
background: var(--ml-bar);
}

.d .bar .url {
margin-left: 8px;
width: 40%;
height: 6px;
border-radius: 3px;
background: var(--ml-bar-2);
}

.d .pg {
position: relative;
flex: 1;
overflow: hidden;
background: var(--ml-bg);
}

.d .nv {
position: absolute;
top: 0;
left: 0;
right: 0;
z-index: 3;
display: flex;
align-items: center;
gap: 6px;
padding: 8px 10px;
}

.d .nv b {
width: 10px;
height: 10px;
border-radius: 3px;
background: var(--ml-accent);
}

.d .nv span {
width: 14px;
height: 4px;
border-radius: 2px;
background: var(--ml-bar);
}

.d .nv span:first-of-type {
margin-left: auto;
}

.d .cta {
height: 15px;
width: 54px;
border-radius: 999px;
background: var(--ml-grad);
box-shadow: 0 4px 10px rgba(10,108,255,.25);
}

.d .b {
height: 5px;
border-radius: 3px;
background: var(--ml-bar);
}

.d .b.s {
width: 40%;
}

.d .b.m {
width: 66%;
}

.d .rws {
position: absolute;
left: 0;
right: 0;
top: 22px;
bottom: 26px;
display: flex;
flex-direction: column;
justify-content: center;
gap: 2px;
}

.d .rw {
overflow: hidden;
}

.d .tr {
display: flex;
align-items: center;
width: max-content;
gap: 12px;
padding-right: 12px;
font: 800 38px/1.02 var(--ml-font);
letter-spacing: -.05em;
white-space: nowrap;
animation: l 11s linear infinite;
}

.d .tr svg {
width: 22px;
height: 22px;
flex: none;
color: var(--ml-accent);
}

.d .r1 .tr {
color: var(--ml-ink);
}

.d .r2 .tr {
color: var(--ml-bg);
-webkit-text-stroke: 3px var(--ml-accent);
paint-order: stroke fill;
animation-name: r;
animation-duration: 13s;
}

.d .r2 .tr svg {
color: var(--ml-ink);
}

.d .ft {
position: absolute;
left: 8%;
right: 8%;
bottom: 7px;
display: flex;
align-items: center;
justify-content: space-between;
}

.d .ft .b {
width: 38%;
}

@keyframes l {
to {
transform: translateX(-50%);
}
}

@keyframes r {
from {
transform: translateX(-50%);
}

to {
transform: translateX(0);
}
}
</style>

</head>
<body>
<div class="frame"><div class="d">
<div class="win"><div class="bar"><i></i><i></i><i></i><span class="url"></span></div><div class="pg "><div class="nv"><b></b><span></span><span></span><span></span></div><div class="rws"><div class="rw r1"><div class="tr"><span>BUILD FASTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>SHIP LIGHTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>DESIGN BOLDER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>BUILD FASTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>SHIP LIGHTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>DESIGN BOLDER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg></div></div><div class="rw r2"><div class="tr"><span>BUILD FASTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>SHIP LIGHTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>DESIGN BOLDER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>BUILD FASTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>SHIP LIGHTER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg><span>DESIGN BOLDER</span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg></div></div></div><div class="ft"><div class="b m"></div><div class="cta"></div></div></div></div>
</div></div>
</body>
</html>

4. Edit: For every card in do's and dont's also in STANDARD OPERATING PROCEDURE
   Use this to improve: Build a sticky card stack. Put the cards as siblings inside one container and give each position: sticky with an increasing top offset (top: calc(80px + var(--i) _ 16px)) so every card pins slightly lower than the previous one, with opaque backgrounds, a hairline border and a soft shadow. Add margin-bottom between cards so each one scrolls up into place. Important: a sticky element can only travel inside its parent, so add a real tail element (an empty div of about 40vh) as the last child of the container, otherwise the stack unpins as soon as the last card does. As each next card approaches, scale the covered card down: coverage = clamp(1 - gapToNext / cardHeight, 0, 1), transform: scale(1 - 0.05 _ coverageSum) with transform-origin: 50% 0, computed in a requestAnimationFrame-batched scroll listener (or animation-timeline: view() where supported). Animate only transform. Under prefers-reduced-motion: reduce keep the sticky stacking but skip the scaling. Plain HTML, CSS and JS, no libraries.
   code: <!doctype html>
   <!-- Sticky card stack - BrewedOps Motion Library, https://brewedops.cloud/motionlibrary/?id=scroll-card-stack -->
   <html lang="en">
   <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Sticky card stack</title>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@500&display=swap" rel="stylesheet">
   <style>
   body {
     margin: 0;
     min-height: 100vh;
     display: grid;
     place-items: center;
     background: #F2F5FA;
   }

.frame {
width: min(92vw,560px);
aspect-ratio: 4/3;
border-radius: 20px;
overflow: hidden;
box-shadow: 0 1px 2px rgba(16,24,40,.06),0 20px 50px rgba(16,24,40,.12);
}

.d {
--ml-bg: #FFFFFF;
--ml-surface: #F4F7FC;
--ml-line: #E3E9F2;
--ml-bar: #DCE4F0;
--ml-bar-2: #EBF0F7;
--ml-ink: #1D1D1F;
--ml-muted: #66666B;
--ml-accent: #0A6CFF;
--ml-accent-soft: #E7F0FF;
--ml-grad: linear-gradient(135deg,#0A6CFF 0%,#4FA3FF 100%);
--ml-shadow: 0 1px 2px rgba(16,24,40,.06),0 8px 24px rgba(16,24,40,.08);
--ml-font: "Geist",-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
--ml-mono: "Geist Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace;
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
background: var(--ml-bg);
color: var(--ml-ink);
font: 500 12px/1.35 var(--ml-font);
-webkit-font-smoothing: antialiased;
}

.d _,
.d _::before,
.d \*::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

.d button,
.d input,
.d select,
.d textarea {
font: inherit;
color: inherit;
}

@media (prefers-reduced-motion: reduce) {
.d _,
.d _::before,
.d \*::after {
animation-duration: .01ms !important;
animation-iteration-count: 1 !important;
transition-duration: .01ms !important;
scroll-behavior: auto !important;
}
}

/_ Sticky card stack _/
.d {
display: grid;
place-items: center;
background: var(--ml-surface);
}

.d .win {
position: relative;
width: 84%;
height: 84%;
display: flex;
flex-direction: column;
background: var(--ml-bg);
border-radius: 12px;
box-shadow: var(--ml-shadow);
overflow: hidden;
}

.d .bar {
display: flex;
align-items: center;
gap: 4px;
padding: 8px 10px;
border-bottom: 1px solid var(--ml-line);
}

.d .bar i {
width: 6px;
height: 6px;
border-radius: 50%;
background: var(--ml-bar);
}

.d .bar .url {
margin-left: 8px;
width: 42%;
height: 6px;
border-radius: 3px;
background: var(--ml-bar-2);
}

.d .sc {
position: relative;
flex: 1;
min-height: 0;
overflow-y: auto;
scrollbar-width: none;
container-type: size;
}

.d .sc::-webkit-scrollbar {
display: none;
}

.d .sc:focus-visible {
outline: 2px solid var(--ml-accent);
outline-offset: -2px;
}

.d .r {
height: 6px;
margin: 9px 12px;
border-radius: 3px;
background: var(--ml-bar-2);
}

.d .r.s {
width: 52%;
}

.d .r.m {
width: 74%;
}

.d .stack {
padding: 8px 12px 0;
}

.d .k {
position: sticky;
top: calc(8px + var(--i) \* 11px);
height: 58cqh;
margin-bottom: 12cqh;
padding: 12px 0;
border-radius: 14px;
border: 1px solid var(--ml-line);
box-shadow: var(--ml-shadow);
transform-origin: 50% 0;
will-change: transform;
}

.d .k b {
display: block;
margin: 0 12px 6px;
font: 600 10px/1 var(--ml-mono);
color: var(--ml-muted);
}

.d .k .r {
margin: 9px 12px;
background: var(--ml-bar);
}

.d .k1 {
background: var(--ml-bg);
}

.d .k2 {
background: var(--ml-accent-soft);
}

.d .k3 {
background: var(--ml-surface);
}

.d .k4 {
background: var(--ml-grad);
border-color: transparent;
}

.d .k4 b {
color: rgba(255,255,255,.8);
}

.d .k4 .r {
background: rgba(255,255,255,.55);
}

.d .tail {
height: 30cqh;
}
</style>

</head>
<body>
<div class="frame"><div class="d">
<div class="win"><div class="bar"><i></i><i></i><i></i><span class="url"></span></div>
  <div class="sc" tabindex="0">
    <div class="stack">
      <div class="k k1" style="--i:0"><b>01</b><p class="r m"></p><p class="r s"></p></div>
      <div class="k k2" style="--i:1"><b>02</b><p class="r m"></p><p class="r s"></p></div>
      <div class="k k3" style="--i:2"><b>03</b><p class="r m"></p><p class="r s"></p></div>
      <div class="k k4" style="--i:3"><b>04</b><p class="r m"></p><p class="r s"></p></div>
      <div class="tail"></div>
    </div>
  </div>
</div>
</div></div>
<script>
if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelector('.d').dataset.paused = '1';

((root) => {
const sc = root.querySelector('.sc');
let update = () => {};
const cards = [...root.querySelectorAll('.k')];
update = () => {
const top = sc.getBoundingClientRect().top;
const cov = cards.map((c, i) => {
const nx = cards[i + 1];
if (!nx) return 0;
const ti = 8 + i _ 11;
const gap = nx.getBoundingClientRect().top - top - ti - 11;
return Math.max(0, Math.min(1, 1 - gap / (c.offsetHeight _ 0.9)));
});
let acc = 0;
for (let i = cards.length - 1; i >= 0; i--) {
acc += cov[i];
cards[i].style.transform = 'scale(' + (1 - 0.045 \* acc).toFixed(3) + ')';
}
};
sc.addEventListener('scroll', () => update(), { passive: true });
update();

})(document.querySelector('.d'));
</script>

</body>
</html>

5. Edit: For the meet the team in about page, use this to researcher card
   Use this to improve: Build a coverflow gallery with 3D covers. Put the covers in a container with perspective: 620px. Each cover is absolutely positioned at the horizontal center. Compute its offset d from the active index: the active cover sits at translateZ(40px) facing forward; covers on either side are pushed out with translateX(sign(d) _ (74% + (|d| - 1) _ 28%)), pushed back with translateZ(-120px - |d| _ 40px) and turned toward the middle with rotateY(-sign(d) _ 58deg). Set z-index to 10 - |d| so the center is on top, and fade covers beyond two steps away. Write the transform from JS on every change and transition it over about 800ms with a critically damped spring such as linear(0, 0.094 5.6%, 0.274 11.1%, 0.455 16.7%, 0.608 22.2%, 0.726 27.8%, 0.812 33.3%, 0.873 38.9%, 0.944 50%, 0.976 61.1%, 1 100%). Show the title and artist of the active item below, swapping them as it changes. Clicking a cover, pressing Left/Right, or swiping selects it. Make the covers buttons with aria-pressed on the active one and a visible focus-visible ring, and with prefers-reduced-motion switch without the rotation animation. Animate transform and opacity only. Plain HTML, CSS and JS, no libraries. Give every image meaningful alt text and keep keyboard access with visible focus-visible outlines.

   code: <!doctype html>
   <!-- Coverflow - BrewedOps Motion Library, https://brewedops.cloud/motionlibrary/?id=media-coverflow -->
   <html lang="en">
   <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Coverflow</title>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
   <style>
   body {
     margin: 0;
     min-height: 100vh;
     display: grid;
     place-items: center;
     background: #F2F5FA;
   }

.frame {
width: min(92vw,560px);
aspect-ratio: 4/3;
border-radius: 20px;
overflow: hidden;
box-shadow: 0 1px 2px rgba(16,24,40,.06),0 20px 50px rgba(16,24,40,.12);
}

.d {
--ml-bg: #FFFFFF;
--ml-surface: #F4F7FC;
--ml-ink: #1D1D1F;
--ml-muted: #66666B;
--ml-accent: #0A6CFF;
--ml-shadow-lg: 0 2px 4px rgba(16,24,40,.06),0 18px 40px rgba(16,24,40,.14);
--ml-spring: cubic-bezier(.22,1,.36,1);
--ml-font: "Geist",-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
background: var(--ml-bg);
color: var(--ml-ink);
font: 500 12px/1.35 var(--ml-font);
-webkit-font-smoothing: antialiased;
}

.d _,
.d _::before,
.d \*::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

.d button,
.d input,
.d select,
.d textarea {
font: inherit;
color: inherit;
}

@supports (transition-timing-function:linear(0,1)) {
.d {
--ml-spring: linear(0, 0.0941 5.6%, 0.2736 11.1%, 0.4548 16.7%, 0.6076 22.2%, 0.7255 27.8%, 0.8119 33.3%, 0.8732 38.9%, 0.9156 44.4%, 0.9444 50.0%, 0.9636 55.6%, 0.9764 61.1%, 0.9848 66.7%, 0.9902 72.2%, 0.9938 77.8%, 0.9960 83.3%, 0.9975 88.9%, 0.9984 94.4%, 1 100%);
}
}

@media (prefers-reduced-motion: reduce) {
.d _,
.d _::before,
.d \*::after {
animation-duration: .01ms !important;
animation-iteration-count: 1 !important;
transition-duration: .01ms !important;
scroll-behavior: auto !important;
}
}

/_ Coverflow _/
.d {
background: var(--ml-surface);
}

.d .im {
position: absolute;
inset: 0;
overflow: hidden;
}

.d .im svg {
width: 100%;
height: 100%;
display: block;
}

.d button {
appearance: none;
border: 0;
background: none;
cursor: pointer;
}

.d button:focus-visible,
.d [tabindex]:focus-visible {
outline: 2px solid var(--ml-accent);
outline-offset: 2px;
}

.d .cf {
position: absolute;
left: 0;
right: 0;
top: 8%;
height: 62%;
perspective: 620px;
}

.d .cv {
position: absolute;
left: 50%;
top: 0;
width: 44%;
aspect-ratio: 1;
height: auto;
margin-left: -22%;
border-radius: 12px;
overflow: hidden;
box-shadow: var(--ml-shadow-lg);
transition: transform .8s var(--ml-spring),opacity .6s ease;
}

.d .nm {
position: absolute;
left: 0;
right: 0;
bottom: 7%;
display: grid;
justify-items: center;
gap: 5px;
}

.d .nm b {
font: 600 14px/1 var(--ml-font);
letter-spacing: -.02em;
}

.d .nm span {
font: 500 11px/1 var(--ml-font);
color: var(--ml-muted);
}
</style>

</head>
<body>
<div class="frame"><div class="d">
<div class="cf"><button class="cv" type="button" aria-label="Cover 1" aria-pressed="false"><div class="im"><svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8CBFF"/><stop offset="1" stop-color="#E9F2FF"/></linearGradient></defs><rect width="120" height="90" fill="url(#g2)"/><circle cx="92" cy="40" r="13" fill="#fff" opacity=".35"/><circle cx="92" cy="40" r="7" fill="#fff" opacity=".95"/><path d="M0 60Q26 38 52 56T120 48V90H0Z" fill="#8DB5F0"/><path d="M0 72Q32 52 64 70T120 62V90H0Z" fill="#5F97E6"/><path d="M0 82Q40 68 80 80T120 76V90H0Z" fill="#2F72D6"/><path d="M96 74l5-14 5 14zM106 77l4-10 4 10z" fill="#2F72D6" opacity=".9"/></svg></div></button><button class="cv" type="button" aria-label="Cover 2" aria-pressed="false"><div class="im"><svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CCE2FF"/><stop offset="1" stop-color="#F6F9FF"/></linearGradient></defs><rect width="120" height="90" fill="url(#g5)"/><circle cx="100" cy="24" r="16" fill="#fff" opacity=".35"/><circle cx="100" cy="24" r="10" fill="#fff" opacity=".95"/><path d="M0 60Q26 38 52 56T120 48V90H0Z" fill="#AFCDF5"/><path d="M0 72Q32 52 64 70T120 62V90H0Z" fill="#7FA9E9"/><path d="M0 82Q40 68 80 80T120 76V90H0Z" fill="#3F7BE0"/><path d="M14 76l5-15 5 15zM24 78l4-11 4 11z" fill="#3F7BE0" opacity=".9"/></svg></div></button><button class="cv" type="button" aria-label="Cover 3" aria-pressed="true"><div class="im"><svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#BFD9FF"/><stop offset="1" stop-color="#F3F8FF"/></linearGradient></defs><rect width="120" height="90" fill="url(#g0)"/><circle cx="80" cy="26" r="17" fill="#fff" opacity=".35"/><circle cx="80" cy="26" r="11" fill="#fff" opacity=".95"/><path d="M0 60Q26 38 52 56T120 48V90H0Z" fill="#A9C9F7"/><path d="M0 72Q32 52 64 70T120 62V90H0Z" fill="#7FAEEF"/><path d="M0 82Q40 68 80 80T120 76V90H0Z" fill="#5A92E4"/><path d="M96 74l5-14 5 14zM106 77l4-10 4 10z" fill="#5A92E4" opacity=".9"/></svg></div></button><button class="cv" type="button" aria-label="Cover 4" aria-pressed="false"><div class="im"><svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E1EEFF"/><stop offset="1" stop-color="#F7FAFF"/></linearGradient></defs><rect width="120" height="90" fill="url(#g3)"/><circle cx="56" cy="22" r="18" fill="#fff" opacity=".35"/><circle cx="56" cy="22" r="12" fill="#fff" opacity=".95"/><path d="M0 60Q26 38 52 56T120 48V90H0Z" fill="#C5DAF8"/><path d="M0 72Q32 52 64 70T120 62V90H0Z" fill="#9CC0F2"/><path d="M0 82Q40 68 80 80T120 76V90H0Z" fill="#70A5EC"/><path d="M14 76l5-15 5 15zM24 78l4-11 4 11z" fill="#70A5EC" opacity=".9"/></svg></div></button><button class="cv" type="button" aria-label="Cover 5" aria-pressed="false"><div class="im"><svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="g6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B5D2FF"/><stop offset="1" stop-color="#EEF5FF"/></linearGradient></defs><rect width="120" height="90" fill="url(#g6)"/><circle cx="46" cy="36" r="19" fill="#fff" opacity=".35"/><circle cx="46" cy="36" r="13" fill="#fff" opacity=".95"/><path d="M0 60Q26 38 52 56T120 48V90H0Z" fill="#9BBFF3"/><path d="M0 72Q32 52 64 70T120 62V90H0Z" fill="#6C9EEA"/><path d="M0 82Q40 68 80 80T120 76V90H0Z" fill="#4A86E2"/><path d="M96 74l5-14 5 14zM106 77l4-10 4 10z" fill="#4A86E2" opacity=".9"/></svg></div></button></div><div class="nm"><b>Slow Coast</b><span>Maya R.</span></div>
</div></div>
<script>
if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelector('.d').dataset.paused = '1';

((root) => {
const cv = [...root.querySelectorAll('.cv')];
const nm = root.querySelector('.nm');
const names = [['Slow Coast', 'Maya R.'], ['Paper Hills', 'Tomas K.'], ['Blue Hour', 'Priya N.'], ['Soft Static', 'Leo B.'], ['Open Air', 'Ines C.']];
let a = 2;
const layout = () => {
cv.forEach((c, i) => {
c.setAttribute('aria-pressed', i === a);
const d = i - a;
const side = Math.sign(d);
const abs = Math.abs(d);
c.style.transform = 'translateX(' + (side _ (abs ? 74 + (abs - 1) _ 28 : 0)) + '%) translateZ(' + (abs ? -120 - abs _ 40 : 40) + 'px) rotateY(' + -side _ (abs ? 58 : 0) + 'deg)';
c.style.zIndex = 10 - abs;
c.style.opacity = abs > 2 ? '0' : '1';
});
nm.innerHTML = '<b>' + names[a][0] + '</b><span>' + names[a][1] + '</span>';
};
cv.forEach((c, i) => c.addEventListener('click', () => { a = i; layout(); }));
// Left and Right step through the covers and keep focus on the active one
root.querySelector('.cf').addEventListener('keydown', (e) => {
const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
if (!d) return;
e.preventDefault();
a = Math.max(0, Math.min(cv.length - 1, a + d));
layout();
cv[a].focus();
});
layout();

})(document.querySelector('.d'));
</script>

</body>
</html>

6. Edit: For background
   Use this to improve:
   Build a breathing radial glow behind a hero headline. Use a white container. Center two absolutely positioned circles: an inner one about 86% of the container width with radial-gradient(closest-side, accent-light at 42% alpha, 14% alpha at 55%, transparent), and an outer one about 130% wide with a much fainter radial-gradient of your accent at 12% alpha. Animate both with the same keyframes, transform: scale(0.94) with opacity 0.7 at the ends and scale(1.07) with opacity 1 at 50%, duration 7s, ease-in-out, infinite, with the outer one offset by half a cycle (negative delay of 3.5s). The amplitude must stay low: it should feel like breathing, not pulsing. Animate only transform and opacity, and place the headline above at z-index 1 with enough contrast over the brightest glow. Keep the content in a separate layer above the background (position: relative; z-index: 1) and check text contrast against the lightest and darkest moment of the animation. Under prefers-reduced-motion stop the animation and show a still frame. Plain HTML, CSS and JS, no libraries.

   code: <!doctype html>
   <!-- Radial glow - BrewedOps Motion Library, https://brewedops.cloud/motionlibrary/?id=backgrounds-radial-pulse -->
   <html lang="en">
   <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Radial glow</title>
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
   <style>
   body {
     margin: 0;
     min-height: 100vh;
     display: grid;
     place-items: center;
     background: #F2F5FA;
   }

.frame {
width: min(92vw,560px);
aspect-ratio: 4/3;
border-radius: 20px;
overflow: hidden;
box-shadow: 0 1px 2px rgba(16,24,40,.06),0 20px 50px rgba(16,24,40,.12);
}

.d {
--ml-bg: #FFFFFF;
--ml-ink: #1D1D1F;
--ml-ink-2: #424245;
--ml-font: "Geist",-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
position: relative;
width: 100%;
height: 100%;
overflow: hidden;
background: var(--ml-bg);
color: var(--ml-ink);
font: 500 12px/1.35 var(--ml-font);
-webkit-font-smoothing: antialiased;
}

.d _,
.d _::before,
.d \*::after {
box-sizing: border-box;
margin: 0;
padding: 0;
}

.d button,
.d input,
.d select,
.d textarea {
font: inherit;
color: inherit;
}

@media (prefers-reduced-motion: reduce) {
.d _,
.d _::before,
.d \*::after {
animation-duration: .01ms !important;
animation-iteration-count: 1 !important;
transition-duration: .01ms !important;
scroll-behavior: auto !important;
}
}

/_ Radial glow _/
.d {
display: grid;
place-items: center;
}

.d .fg {
position: relative;
z-index: 2;
display: grid;
gap: 6px;
justify-items: center;
text-align: center;
pointer-events: none;
}

.d .hl {
font: 600 26px/1.05 var(--ml-font);
letter-spacing: -.04em;
color: var(--ml-ink);
}

.d .sb {
font: 500 11.5px/1.3 var(--ml-font);
color: var(--ml-ink-2);
}

.d {
background: #FFFFFF;
}

.d .hl {
font-size: 30px;
}

.d .gw {
position: absolute;
left: 50%;
top: 50%;
border-radius: 50%;
will-change: transform,opacity;
}

.d .w1 {
width: 86%;
aspect-ratio: 1;
margin: -43% 0 0 -43%;
background: radial-gradient(closest-side,rgba(79,163,255,.42),rgba(79,163,255,.14) 55%,transparent);
animation: gb 7s ease-in-out infinite;
}

.d .w2 {
width: 130%;
aspect-ratio: 1;
margin: -65% 0 0 -65%;
background: radial-gradient(closest-side,rgba(10,108,255,.12),transparent);
animation: gb 7s ease-in-out -3.5s infinite;
}

@keyframes gb {
0%,
100% {
transform: scale(.94);
opacity: .7;
}

50% {
transform: scale(1.07);
opacity: 1;
}
}
</style>

</head>
<body>
<div class="frame"><div class="d">
<i class="gw w2"></i><i class="gw w1"></i><div class="fg"><h4 class="hl">Calm by design.</h4><p class="sb">It breathes about once every seven seconds.</p></div>
</div></div>
</body>
</html>
