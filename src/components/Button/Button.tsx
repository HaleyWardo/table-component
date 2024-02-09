import "./Button.css";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
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
      {!!Icon && <Icon aria-hidden />}
      {children}
    </button>
  );
};
