import "./TableHead.css";

interface TableHeaderProps extends React.ComponentPropsWithoutRef<"th"> {
  children?: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  ...restProps
}) => <th {...restProps}>{children}</th>;
