import "./TableRow.css";

interface TableRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  children?: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  onClick,
  ...restProps
}) => (
  <tr
    className={onClick ? "tableRow-interactive" : undefined}
    onClick={onClick}
    {...restProps}
  >
    {children}
  </tr>
);
