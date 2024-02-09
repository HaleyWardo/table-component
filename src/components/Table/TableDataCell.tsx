interface TableCellProps extends React.ComponentPropsWithoutRef<'td'> {
  children?: React.ReactNode;
}

export const TableDataCell: React.FC<TableCellProps> = ({ children, ...restProps }) => (
    <td {...restProps}>
      {children}
    </td>
);
