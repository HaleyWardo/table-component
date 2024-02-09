import "./Table.css";

interface TableProps extends React.ComponentPropsWithoutRef<"table"> {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children, ...restProps }) => (
  <table {...restProps}>{children}</table>
);
