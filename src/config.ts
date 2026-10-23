// Site-wide info. Edit this file first — it feeds the nav, footer,
// home page, contact card and social links on every page.

export const site = {
  name: 'Your Name',
  initials: 'YN',
  role: 'Designer & Developer',
  tagline: 'I build calm, considered software.',
  intro: 'I design and engineer digital products with an obsession for detail — from the first sketch to the last pixel.',
  location: 'Your City',
  email: 'hello@example.com',
  openToWork: true,
  githubUser: 'your-username',
  // Used to highlight your name in paper author lists
  authorName: 'Your Name',
};

export const nav = [
  { href: '/projects', label: 'Projects' },
  { href: '/aigc', label: 'AIGC' },
  { href: '/papers', label: 'Papers' },
  { href: '/toolbox', label: 'Toolbox' },
  { href: '/vpn', label: 'VPN' },
];

// Remove any you don't use. `icon` must match a key in SocialIcon.astro.
export const socials = [
  { icon: 'github', label: 'GitHub', href: 'https://github.com/your-username' },
  { icon: 'x', label: 'X', href: 'https://x.com/your-username' },
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-username' },
  { icon: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/your-username' },
  { icon: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@your-username' },
];
