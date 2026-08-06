import type { SVGProps } from "react";
import type { IconName } from "@/lib/types";

type Props = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Svg({ children, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  );
}

/* ---------------------------------- research area marks --------------------------------- */

export const NetworkIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="12" cy="4.6" r="2" />
      <circle cx="4.6" cy="16.4" r="2" />
      <circle cx="19.4" cy="16.4" r="2" />
      <circle cx="12" cy="12.6" r="1.6" />
      <path d="M12 6.6v4.4M10.7 13.6 6 15.6M13.3 13.6 18 15.6M6.6 16.4h10.8" />
    </g>
  </Svg>
);

export const LayersIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M12 3 3.5 7.3 12 11.6l8.5-4.3z" />
      <path d="M3.5 12.1 12 16.4l8.5-4.3" />
      <path d="M3.5 16.6 12 20.9l8.5-4.3" />
    </g>
  </Svg>
);

export const CubeIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7z" />
      <path d="M3.5 7 12 11.2 20.5 7M12 11.2v10" />
    </g>
  </Svg>
);

export const EyeIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M2.4 12S5.9 5.8 12 5.8 21.6 12 21.6 12 18.1 18.2 12 18.2 2.4 12 2.4 12z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  </Svg>
);

export const TwinIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <rect x="2.8" y="3.4" width="8.4" height="8.4" rx="1.6" />
      <rect x="12.8" y="12.2" width="8.4" height="8.4" rx="1.6" />
      <path d="M14.6 7.6h5.2m0 0-1.9-1.9m1.9 1.9-1.9 1.9" />
      <path d="M9.4 16.4H4.2m0 0 1.9-1.9m-1.9 1.9 1.9 1.9" />
    </g>
  </Svg>
);

export const ShieldIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M12 2.9 19.6 5.6v6.1c0 4.4-3.2 7.8-7.6 9.4-4.4-1.6-7.6-5-7.6-9.4V5.6z" />
      <path d="m8.9 11.9 2.3 2.3 4-4.4" />
    </g>
  </Svg>
);

export const RadarIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.4" />
      <circle cx="12" cy="12" r="1.7" />
      <path d="M12 12l6.4-6.4" />
      <circle cx="16.4" cy="8.6" r="1.2" fill="currentColor" stroke="none" />
    </g>
  </Svg>
);

export const ChipIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <rect x="6.4" y="6.4" width="11.2" height="11.2" rx="1.8" />
      <rect x="10" y="10" width="4" height="4" rx="0.8" />
      <path d="M9.2 6.4V3.2M14.8 6.4V3.2M9.2 20.8v-3.2M14.8 20.8v-3.2M6.4 9.2H3.2M6.4 14.8H3.2M20.8 9.2h-3.2M20.8 14.8h-3.2" />
    </g>
  </Svg>
);

export const PulseIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M2.8 12h3.6l1.9-5.2 3 10.4 2.4-7 1.6 3.6h5.9" />
    </g>
  </Svg>
);

export const LensIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="10.6" cy="10.6" r="6.6" />
      <path d="m15.6 15.6 4.6 4.6" />
      <path d="M7.6 10.6h6M10.6 7.6v6" />
    </g>
  </Svg>
);

export const LanguageIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M3.2 5.6h8.4M7.4 3.6v2M9.9 5.6c0 3.6-2.4 6.6-6.7 8.2M5.4 9.9c1 1.9 2.7 3.3 4.9 4.1" />
      <path d="m12.6 20.4 4.2-10 4.2 10M14.4 17.1h4.8" />
    </g>
  </Svg>
);

export const ChartIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M3.4 3.6v16.8h17.2" />
      <path d="M6.8 16.6v-3.4M11 16.6V9.4M15.2 16.6v-5.6M19.4 16.6V6.6" />
    </g>
  </Svg>
);

export const areaIcons: Record<IconName, (p: Props) => React.JSX.Element> = {
  network: NetworkIcon,
  layers: LayersIcon,
  cube: CubeIcon,
  eye: EyeIcon,
  twin: TwinIcon,
  shield: ShieldIcon,
  radar: RadarIcon,
  chip: ChipIcon,
  pulse: PulseIcon,
  lens: LensIcon,
  language: LanguageIcon,
  chart: ChartIcon,
};

/* ------------------------------------- ui marks ----------------------------------------- */

export const ArrowRightIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </g>
  </Svg>
);

export const ArrowUpRightIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M7 17 17 7M9 7h8v8" />
    </g>
  </Svg>
);

export const SearchIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.2 16.2 3.8 3.8" />
    </g>
  </Svg>
);

export const CloseIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M6 6l12 12M18 6 6 18" />
    </g>
  </Svg>
);

export const MenuIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </g>
  </Svg>
);

export const SunIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </g>
  </Svg>
);

export const MoonIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M20 14.4A8.4 8.4 0 1 1 9.6 4a6.9 6.9 0 0 0 10.4 10.4z" />
    </g>
  </Svg>
);

export const MailIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <rect x="2.8" y="5" width="18.4" height="14" rx="2" />
      <path d="m3.6 6.6 8.4 6.2 8.4-6.2" />
    </g>
  </Svg>
);

export const PhoneIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M6.4 3.6h3l1.6 4-2 1.4a10.8 10.8 0 0 0 6 6l1.4-2 4 1.6v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3.4 5.8a2 2 0 0 1 2-2.2z" />
    </g>
  </Svg>
);

export const MapPinIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M12 21.4c4.4-4.6 6.6-8 6.6-11a6.6 6.6 0 1 0-13.2 0c0 3 2.2 6.4 6.6 11z" />
      <circle cx="12" cy="10.2" r="2.4" />
    </g>
  </Svg>
);

export const CalendarIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <rect x="3.4" y="5" width="17.2" height="15.4" rx="2" />
      <path d="M3.4 9.6h17.2M8.4 3.4v3.2M15.6 3.4v3.2" />
    </g>
  </Svg>
);

export const FileIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M6 2.8h7.4L19 8.4v12.8H6z" />
      <path d="M13.2 3v5.6H19" />
    </g>
  </Svg>
);

export const DatabaseIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <ellipse cx="12" cy="5.8" rx="7.4" ry="2.8" />
      <path d="M4.6 5.8v12.4c0 1.6 3.3 2.8 7.4 2.8s7.4-1.2 7.4-2.8V5.8" />
      <path d="M4.6 12c0 1.6 3.3 2.8 7.4 2.8s7.4-1.2 7.4-2.8" />
    </g>
  </Svg>
);

export const CodeIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="m8.6 8.4-4 3.6 4 3.6M15.4 8.4l4 3.6-4 3.6M13.4 5.4l-2.8 13.2" />
    </g>
  </Svg>
);

export const QuoteIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="M9.4 6.2C6.6 7.6 5 9.9 5 12.8c0 2.3 1.3 3.9 3.2 3.9 1.7 0 2.9-1.2 2.9-2.8 0-1.5-1-2.6-2.5-2.6h-.4c.2-1.4 1.1-2.6 2.6-3.4zM19.4 6.2c-2.8 1.4-4.4 3.7-4.4 6.6 0 2.3 1.3 3.9 3.2 3.9 1.7 0 2.9-1.2 2.9-2.8 0-1.5-1-2.6-2.5-2.6h-.4c.2-1.4 1.1-2.6 2.6-3.4z" />
    </g>
  </Svg>
);

export const CopyIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <rect x="9" y="9" width="11.4" height="11.4" rx="2" />
      <path d="M15 6.4V5.6a2 2 0 0 0-2-2H5.6a2 2 0 0 0-2 2V13a2 2 0 0 0 2 2h.8" />
    </g>
  </Svg>
);

export const CheckIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="m4.8 12.6 4.6 4.6L19.2 7.4" />
    </g>
  </Svg>
);

export const GlobeIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.2 12h17.6M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </g>
  </Svg>
);

export const ChevronDownIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <path d="m6 9.5 6 6 6-6" />
    </g>
  </Svg>
);

export const UsersIcon = (p: Props) => (
  <Svg {...p}>
    <g {...line}>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20c0-3.4 2.8-6.2 6.2-6.2s6.2 2.8 6.2 6.2" />
      <path d="M16.2 5.2a3.4 3.4 0 0 1 0 6.6M17.4 13.8c2.2.7 3.8 2.8 3.8 5.2" />
    </g>
  </Svg>
);

/* ------------------------------------ brand marks --------------------------------------- */

export const LinkedInIcon = (p: Props) => (
  <Svg {...p} fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </Svg>
);

export const GitHubIcon = (p: Props) => (
  <Svg {...p} fill="currentColor">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.9 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.2 4.9 18.2 5.2 18.2 5.2c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
  </Svg>
);

export const ScholarIcon = (p: Props) => (
  <Svg {...p} fill="currentColor">
    <path d="M5.24 13.77 0 9.5 12 0l12 9.5-5.24 4.27C17.55 11.25 14.98 9.5 12 9.5s-5.55 1.75-6.76 4.27zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
  </Svg>
);

export const OrcidIcon = (p: Props) => (
  <Svg {...p} fill="currentColor">
    <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM7.37 4.38a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9zm-.72 3.04h1.44v10.04H6.65zm3.56 0h3.9c3.71 0 5.34 2.65 5.34 5.02 0 2.58-2.02 5.02-5.32 5.02h-3.92zm1.44 1.3v7.45h2.3c3.27 0 4.02-2.49 4.02-3.73 0-2.01-1.28-3.72-4.1-3.72z" />
  </Svg>
);

export const ResearchGateIcon = (p: Props) => (
  <Svg {...p} fill="currentColor">
    <path d="M4.4 2.4h15.2a2 2 0 0 1 2 2v15.2a2 2 0 0 1-2 2H4.4a2 2 0 0 1-2-2V4.4a2 2 0 0 1 2-2zm2.1 4.2v10.8h2.1v-4.2h1.6l2.3 4.2h2.4l-2.6-4.6a3.05 3.05 0 0 0 2-2.9c0-2-1.5-3.3-3.7-3.3zm2.1 1.8h1.9c1.1 0 1.8.6 1.8 1.6s-.7 1.6-1.8 1.6H8.6zm8.4-1.9c-1.9 0-3.2 1.4-3.2 3.4v.5h2v-.6c0-.9.5-1.5 1.2-1.5.8 0 1.2.5 1.2 1.3v.4h-1.5v1.7h1.5v.6c0 .9-.4 1.4-1.2 1.4-.7 0-1.2-.5-1.2-1.4v-.6h-2v.7c0 2 1.3 3.3 3.2 3.3s3.2-1.3 3.2-3.3v-2.7c0-2-1.3-3.2-3.2-3.2z" />
  </Svg>
);
