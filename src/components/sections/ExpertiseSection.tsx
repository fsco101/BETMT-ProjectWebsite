import React, { useState } from 'react';

export const ExpertiseSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Station 00 · Primary Service Bay',
      desc: 'TUP Taguig Mechanical Machining Facility. Lubricated dual-stage compressor assembly, cyclonic separator, refrigerated air dryer, and nominal-pressure balancing receiver.',
      tag: 'Central Supply',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkp_tWB02De15s5jEWLTAQ7Gfwy8r2ViWEFkrOp1qfwytOhW1cPzJHMvVMEu16xmF9aMGEQAD0Fb_z0de0sK1Kjfxex6gNdwIC2-UY8SwafPcbb2i3CDq-rtnZ-w-ymNTCStMmSxGMdHs4CFXa34h7ObZOJVmHfcaFkeU_TfM84TkS99OZX5dMeh-H50iNQ8iFZyQyRjUUWFv0kw2y6Mb1wafvU4yqLTqZLsGg2paR4vrYwiooug6_g'
    },
    {
      title: 'Station 00 · ASME Receiver Vessel',
      desc: '500-liter vertical buffer vessel certified under ASME Section VIII. Dampens pulsation cycles from dual pistons and stores pressurized reserve.',
      tag: 'Buffer Storage',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvmsEnCue6Pw3MdH5lwPbyLz-JrA856qbAo5F1lAokqxsWctBJ_cZNOzAnluJPLhg9s1rPs7X9OjkxWZK75AX4O7N4r2ckBzR5odf6T5Ns8YDs9Bd-NkUAhLWXzGCPIvT-ECKwlBewNt5EokFBiZ4rIbTEvoclusgF7YyYK3bOETBJtH51p35My2M4J6WCh-gCW-3wbaKVpLmQKQFe0Fm_fuZkxlhwymOaqriia4ygriZcH7Cyr4C0xQ'
    },
    {
      title: 'Station 00 · Overhead ISO Blue Header Loop',
      desc: 'Anodized 1.0-inch seamless ring manifold pitched at 1:100 slope to ensure balanced flow velocity and eliminate stagnant water pockets.',
      tag: 'Distribution Header',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVtSg7VIRo9xczlgjZ9e6VOmfexqntrLiYRDDclgMXdADYGKa45XVtkYRHogtoqHZNUGNqmmal_ZECZl_4STILLQuvFizaeiIdl1A2yDzdjJBketPmVc89qllGQ_9Vo1AEzuouy8bw5ksOzC0tn2Lmn5sdw901T1VpIdgBm-Jmc-NFUiGZ_AR4Xs2lDIPqaChxro4TaiZ_jTTfrnb3FC2pIPmYv_Q5c1rQWUXnXUCclMq7v2yTqZVgJw'
    }
  ];

  return (
    <section id="savoir-faire" className="py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="mb-10 sm:mb-14">
        <h2 className="font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.03em] leading-tight text-charcoal-ink">
          OUR EXPERTISE:<br />
          FLUID DISTRIBUTION
        </h2>
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-muted-charcoal max-w-xl font-light leading-relaxed">
          We operate a pneumatic infrastructure certified to ISO 8573-1 industrial purity standards. Our central manifold supplies conventional lathes, CNC machining centers, precision grinders, and metrology labs with stabilized continuous flow and regulated clean air.
        </p>
      </div>

      <div className="hairline-all bg-[#FAF9F5] p-2.5 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          
          {/* Main Visual */}
          <div className="lg:col-span-9 relative overflow-hidden bg-[#ECE8DF] aspect-[16/10]">
            <img
              src={slides[activeSlide].img}
              alt={slides[activeSlide].title}
              className="w-full h-full object-cover transition-all duration-700 hover:scale-[1.01]"
            />
            {/* Slide Indicator Dots */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex gap-2 bg-charcoal-ink/50 p-1.5 backdrop-blur-xs">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 sm:w-2 sm:h-2 transition-all ${activeSlide === idx ? 'bg-[#F7F5F0] scale-125' : 'bg-[#F7F5F0]/40'}`}
                  aria-label={`Show slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Sidebar Metadata */}
          <div className="lg:col-span-3 flex flex-col justify-between py-2 sm:py-4 px-2 sm:px-3 sm:pl-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-subtle-ash block mb-1.5 sm:mb-2">
                {slides[activeSlide].title}
              </span>
              <p className="text-xs text-muted-charcoal leading-relaxed font-light">
                {slides[activeSlide].desc}
              </p>
            </div>
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-8 hairline-t flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.18em]">
              <span className="text-subtle-ash">{slides[activeSlide].tag}</span>
              <span className="material-symbols-outlined text-base text-emerald-800">check_circle</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
