interface TableBodyProps extends React.ComponentPropsWithoutRef<'tbody'> {
  children?: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ className, children, ...restProps }) => (
    <tbody {...restProps}>
        {children}
    </tbody>
);
