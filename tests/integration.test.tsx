import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { AboutPage } from '../src/components/pages/AboutPage';
import { circuitStages } from '../src/data/circuitStages';
import { dropStations } from '../src/data/dropStations';
import { researchTeamMembers, studyOverviewData } from '../src/data/aboutData';

describe('Centralized Air Distribution System Integration', () => {
  it('renders the complete updated application layout without throwing', () => {
    const html = renderToString(<App />);
    expect(html).toContain('CENTRALIZED COMPRESSED AIR DISTRIBUTION SYSTEM');
    expect(html).toContain('TUP TAGUIG');
    expect(html).toContain('Mechanical And Allied Department');
    expect(html).toContain('OPERATIONAL MANUAL');
    expect(html).toContain('SYSTEM OVERVIEW');
    expect(html).toContain('HOW THE SYSTEM WORKS');
    expect(html).toContain('SYSTEM COMPONENTS');
    expect(html).toContain('Safety Standards');
    expect(html).toContain('STANDARD OPERATING PROCEDURE');
    expect(html).toContain('STEP BY STEP');
    expect(html).toContain('AIR OUTLETS');
    expect(html).toContain('WORKSHOP VIDEO DEMONSTRATION');
    
    // Calculator and old Faculty should be removed
    expect(html).not.toContain('PNEUMATIC LAB SIZING CALCULATOR');
    expect(html).not.toContain('LABORATORY TECHNICIANS & FACULTY');

    // Homepage contains navigation links to the About page, but NOT the full about page details
    expect(html).toContain('About Study &amp; Team');
    expect(html).not.toContain('Giving proper attribution and recognition to the student engineering group');
  });

  it('renders all 7 circuit stages in HTML', () => {
    const html = renderToString(<App />);
    circuitStages.forEach((stage) => {
      const searchName = stage.name.replace(/&/g, '&amp;');
      expect(html).toContain(searchName);
    });
  });

  it('renders all 6 machining air drop outlets in HTML', () => {
    const html = renderToString(<App />);
    dropStations.forEach((station) => {
      const searchName = station.name.replace(/&/g, '&amp;');
      expect(html).toContain(searchName);
    });
  });

  it('renders the standalone AboutPage with research team credits and study sections', () => {
    const html = renderToString(<AboutPage onBackToManual={() => {}} />);
    expect(html).toContain('Academic Study &amp; System Credits');
    expect(html).toContain(studyOverviewData.title);
    expect(html).toContain('Specific Study Objectives');
    expect(html).toContain('Project Methodology &amp; Development Stages');
    expect(html).toContain('Project Researchers &amp; Engineering Team');
    expect(html).toContain('Return to Operational Manual');

    // All 5 research team members must be present
    researchTeamMembers.forEach((member) => {
      const searchName = member.name.replace(/&/g, '&amp;');
      expect(html).toContain(searchName);
      expect(html).toContain(member.role.replace(/&/g, '&amp;'));
    });

    // Advisers must be credited
    studyOverviewData.advisers.forEach((adv) => {
      expect(html).toContain(adv.name);
      expect(html).toContain(adv.role.replace(/&/g, '&amp;'));
    });
  });

  it('renders standardized industrial sans title typography and professional SVG dark mode theme toggle', () => {
    const html = renderToString(<App />);
    // Check that dark mode toggle is present in header
    expect(html).toContain('Switch to dark mode');
    // Ensure no emojis are used in the theme button
    expect(html).not.toContain('☀️');
    expect(html).not.toContain('🌙');
    // Check for standardized sans headings
    expect(html).toContain('font-sans font-extrabold');
  });

  it('renders clickable images with zoom cursor across system overview, circuits, and drop outlets', () => {
    const html = renderToString(<App />);
    expect(html).toContain('cursor-zoom-in');
    expect(html).toContain('Click to view full image');
    expect(html).toContain('Click to view full uncropped lab photo');
  });
});

