import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ComponentProps<'button'> {
  asChild?: boolean;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'button button-primary',
  secondary: 'button button-secondary',
  ghost: 'button button-ghost',
};

export function Button({
  asChild = false,
  className = '',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (asChild) {
    return <Slot className={classes} {...props} />;
  }

  return <button className={classes} type={type} {...props} />;
}
