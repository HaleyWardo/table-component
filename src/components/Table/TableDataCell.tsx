import './TableDataCell.css';

interface TableDataCellProps extends React.ComponentPropsWithoutRef<'td'> {
  children?: React.ReactNode;
}

export const TableDataCell: React.FC<TableDataCellProps> = ({ children, ...restProps }) => (
    <td {...restProps}>
      {children}
    </td>
);
