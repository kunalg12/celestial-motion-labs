import svsImage from '@/assets/svs-nursing.png';
import chaitanyaImage from '@/assets/chaitanya-nursing.png';
import santEknathImage from '@/assets/sant-eknath.png';

export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    color: string;
    glow: string;
    link: string;
}

export const projectsData: Project[] = [
    {
        id: 1,
        title: 'Chaitanya Nursing School',
        category: 'Institutional Portal',
        description: 'Empowering future healthcare leaders with excellence in nursing education and modern facilities.',
        image: chaitanyaImage,
        color: 'from-emerald-600/40 to-teal-400/40',
        glow: 'hsla(168, 80%, 40%, 0.3)',
        link: 'https://www.cnsgnmnursing.org/',
    },
    {
        id: 2,
        title: 'Sant Eknath Institute',
        category: 'Nursing Education',
        description: 'Excellence in nursing education with INC approval and industry-leading clinical training.',
        image: santEknathImage,
        color: 'from-orange-600/40 to-rose-400/40',
        glow: 'hsla(12, 80%, 40%, 0.3)',
        link: 'https://www.seinursing.org/',
    },
    {
        id: 3,
        title: 'Swami Vivekanand Nursing',
        category: 'Nursing Education Platform',
        description: 'A premier institute for GNM nursing education, shaping the future of healthcare professionals.',
        image: svsImage,
        color: 'from-blue-600/40 to-indigo-400/40',
        glow: 'hsla(199, 89%, 48%, 0.3)',
        link: 'https://svsnursing.org/',
    },
];

export const fetchProjects = (): Promise<Project[]> => {
    return new Promise((resolve) => {
        // Simulate network delay between 800ms and 1500ms for realism
        const delay = 800 + Math.random() * 700;
        setTimeout(() => {
            resolve(projectsData);
        }, delay);
    });
};
