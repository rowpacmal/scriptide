interface IAccordionItemBaseProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  isTop?: boolean;
  isBottom?: boolean;
}
interface IAccordionItemBaseAltProps {
  children: React.ReactNode;
  title: string;
  isTop?: boolean;
  isBottom?: boolean;
}
interface IAppLogoProps {
  size?: string | number;
  color?: string;
}
interface IOverviewItemProps {
  children: React.ReactNode;
  title: string;
  h?: string | number;
  className?: string;
}

export type {
  IAccordionItemBaseProps,
  IAccordionItemBaseAltProps,
  IAppLogoProps,
  IOverviewItemProps,
};
