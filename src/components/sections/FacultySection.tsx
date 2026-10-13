import React from 'react';
import { facultyMembers } from '../../data/facultyData';

export const FacultySection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-[#FAF9F5] hairline-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-subtle-ash block mb-2">
            Qualified Personnel &amp; Supervision
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl uppercase tracking-[0.03em] text-charcoal-ink">
            LABORATORY TECHNICIANS &amp; FACULTY
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-muted-charcoal font-light leading-relaxed">
            Faculty heads, laboratory specialists, and safety certified services managing continuous calibration, filter maintenance, and safe operation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((member) => (
            <div key={member.id} className="hairline-all bg-[#FAF9F5] p-5 flex flex-col justify-between group hover:shadow-xs transition-shadow">
              <div>
                <div className="aspect-[4/3] bg-[#ECE8DF] overflow-hidden hairline-all mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-editorial text-base uppercase tracking-wider text-charcoal-ink">
                  {member.name}
                </h4>
                <span className="text-[10px] uppercase tracking-[0.16em] text-subtle-ash block mt-1">
                  {member.role}
                </span>
                <p className="text-[11px] text-muted-charcoal font-light mt-3 leading-relaxed">
                  {member.department}
                </p>
              </div>

              <div className="mt-6 pt-3 hairline-t text-[9px] uppercase tracking-[0.14em] text-subtle-ash flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs text-emerald-800">verified</span>
                <span>{member.credentials}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
