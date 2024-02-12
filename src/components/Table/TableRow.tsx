import { clsx } from "clsx";
import "./TableRow.css";

interface TableRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  children?: React.ReactNode;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  onClick,
  ...restProps
}) => (
  <tr
    className={clsx(className, "tableRow", !!onClick && "tableRow-interactive")}
    onClick={onClick}
    {...restProps}
  >
    {children}
  </tr>
);
