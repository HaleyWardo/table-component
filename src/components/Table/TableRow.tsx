import "./TableRow.css";

interface TableRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  children?: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  ...restProps
}) => <tr {...restProps}>{children}</tr>;
