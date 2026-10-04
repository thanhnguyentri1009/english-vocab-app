import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  backLabel?: ReactNode;
  onBack?: () => void;
}

export default function PageHeader({ title, eyebrow, subtitle, backLabel, onBack }: PageHeaderProps) {
  return (
    <header className="page-header">
      {onBack && (
        <Button type="text" icon={<LeftOutlined />} onClick={onBack} className="back-link">
          {backLabel}
        </Button>
      )}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </header>
  );
}
