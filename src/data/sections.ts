export interface Section {
    title: string
    planet: string    // must match one of PlanetInfo.name
    items: string[]   // your CV content
}

const sections: Section[] = [
    {
        title: 'Skills',
        planet: 'Skills',
        items: [
            'React',
            'React Native',
            'TypeScript',
            'Redux',
            'Jest',
            'Java / Spring',
            'Node.js',
            'HTML / SCSS / JS',
            'AEM'
        ]
    },
    {
        title: 'Education',
        planet: 'Education',
        items: [
            'Integrated Master in Information and Communication Systems Engineering',
            'University of the Aegean (2014 – 2019)'
        ]
    },
    {
        title: 'Experience',
        planet: 'Experience',
        items: [
            'React Developer — MSC Cruises (Dec 2024 – Present): Engineered responsive, modular UI components using React, TypeScript, Redux, Java & AEM',
            'React Native Developer — E.ON Energy (Jan 2024 – Dec 2024): Overhauled mobile app, integrated AEM & Google Analytics 4',
            'React Developer — Swinkels Family Brewery (Oct 2022 – Jan 2024): Developed reusable AEM modules and SAP integrations',
            'React Developer — illy (Dec 2020 – Oct 2022): Built interactive React components within AEM workflows'
        ]
    },
    {
        title: 'Certifications',
        planet: 'Certifications',
        items: [
            'Adobe Certified Expert – AEM Sites Business Practitioner',
            'Basic Life Support (BLS)'
        ]
    },
    {
        title: 'Contact',
        planet: 'Contact',
        items: [
            'Jodenstraat 62, 6211ER Maastricht',
            '+30 697 683 9931',
            'Dzaf96@gmail.com',
            'linkedin.com/in/dimitris-zafeiropoulos'
        ]
    },
    {
        title: 'Languages',
        planet: 'Language',
        items: [
            'Greek (Native)',
            'English (C2)'
        ]
    },
    {
        title: 'Soft Skills',
        planet: 'Soft Skills',
        items: [
            'Highly adaptable',
            'Fast learner',
            'Effective communicator',
            'Team-oriented',
            'Mentoring & onboarding',
            'Problem-solving mindset'
        ]
    }
]

export default sections
