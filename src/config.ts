// Site-wide info. Edit this file first — it feeds the nav, footer,
// home page and social links on every page.

export const site = {
  name: 'ZDZ',
  githubUser: 'awwbugbug',
  // Highlighted in paper author lists — use the name as printed on your papers
  authorName: 'ZDZ',
};

// The first address is used by the Mail icon in the Dock
export const emails = [
  { label: 'Gmail', address: 'zdz1342979524@gmail.com' },
  { label: 'Gmail', address: 'zdz13438552050@gmail.com' },
  { label: 'QQ Mail', address: '1342979524@qq.com' },
];

export const nav = [
  { href: '/projects', label: 'Projects' },
  { href: '/aigc', label: 'AIGC' },
  { href: '/papers', label: 'Papers' },
  { href: '/toolbox', label: 'Toolbox' },
  { href: '/vpn', label: 'VPN' },
];

// `icon` must match a key in SocialIcon.astro: github, x, linkedin, instagram, youtube.
// To add one: { icon: 'x', label: 'X', href: 'https://x.com/your-handle' },
export const socials = [
  { icon: 'github', label: 'GitHub', href: `https://github.com/${site.githubUser}` },
];
