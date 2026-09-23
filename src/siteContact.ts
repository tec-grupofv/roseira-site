import type { ComponentType, ReactNode } from "react";

export type SocialLink = {
  label: string;
  title: string;
  href: string;
  Icon?: ComponentType<any>;
  icon?: ReactNode;
  handle: string;
};

export const CONTACT_INFO = {
  address: "Praça Sant'Ana, 201, Centro",
  cityState: "Roseira/SP",
  cep: "12580-017",
  phone: "(12) 3646-9900",
  email: "contato@roseira.sp.gov.br",
  webmailUrl: "https://mail.hostinger.com/auth/login",
  transparencyPortalUrl: "https://pmroseira.geosiap.net.br:8443/portal-transparencia/home",
  businessHours: "De segunda a sexta, das 8h às 17h",
  businessHoursShort: "Seg. a Sex. das 8h às 17h",
  cnpj: "45.212.008/0001-50",
  get fullAddress() {
    return `${this.address} - ${this.cityState} - CEP ${this.cep}`;
  },
  get addressWithCep() {
    return `${this.address} - CEP: ${this.cep}`;
  },
  get phoneHref() {
    return `tel:${this.phone.replace(/\D/g, "")}`;
  },
  get emailHref() {
    return `mailto:${this.email}`;
  },
  get mapUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${this.address}, ${this.cityState}, ${this.cep}`)}`;
  },
};

export function createSocialLinks(icons: {
  FacebookIcon: SocialLink["Icon"];
  YouTubeIcon: SocialLink["Icon"];
  InstagramIcon: SocialLink["Icon"];
  facebookSvg: ReactNode;
  youtubeSvg: ReactNode;
  instagramSvg: ReactNode;
}) {
  const socialLinks = {
    facebook: {
      label: "Facebook",
      title: "Facebook",
      href: "https://www.facebook.com/prefeituramunicipalderoseira",
      Icon: icons.FacebookIcon,
      icon: icons.facebookSvg,
      handle: "Prefeitura Municipal de Roseira",
    },
    youtube: {
      label: "YouTube",
      title: "YouTube",
      href: "https://www.youtube.com/channel/UCaZrqBkG9W3SWsXeFP34xxQ",
      Icon: icons.YouTubeIcon,
      icon: icons.youtubeSvg,
      handle: "TV Prefeitura",
    },
    instagram: {
      label: "Instagram",
      title: "Instagram",
      href: "https://www.instagram.com/prefeituraroseira/",
      Icon: icons.InstagramIcon,
      icon: icons.instagramSvg,
      handle: "@prefeituraroseira",
    },
  } satisfies Record<string, SocialLink>;

  return {
    socialLinks,
    headerSocialLinks: [socialLinks.facebook, socialLinks.youtube, socialLinks.instagram],
  };
}
