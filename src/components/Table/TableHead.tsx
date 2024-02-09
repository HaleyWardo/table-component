interface TableHeadProps extends React.ComponentPropsWithoutRef<'thead'> {
  children?: React.ReactNode;
}

export const TableHead: React.FC<TableHeadProps> = ({ className, children, ...restProps }) => (
    <thead {...restProps}>
      {children}
    </thead>
);
