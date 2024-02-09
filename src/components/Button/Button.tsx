interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children?: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  icon: Icon,
  ...restProps
}) => {
  return (
    <button type="button" {...restProps}>
      {!!Icon && <Icon className="mr-2 w-4 h-4" aria-hidden />}
      {children}
    </button>
  );
};