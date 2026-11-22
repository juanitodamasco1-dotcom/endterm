interface SystemSwitchProps {
  href: string;
  question: string;
  label: string;
}

/** Link card pointing to the other, separately-hosted system. */
export function SystemSwitch({ href, question, label }: SystemSwitchProps) {
  return (
    <a
      className="system-switch"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="system-switch-q">{question}</span>
      <span className="system-switch-cta">
        {label} <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
