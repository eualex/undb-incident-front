import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/presentation/lib/utils';

const pillVariant = cva(
  'flex items-center justify-center px-[10px] rounded-[10px] text-center w-max',
  {
    variants: {
      variant: {
        success: 'text-[#065F46] bg-[#D1FAE5]',
        error: 'text-[#991B1B] bg-[#FEE4E2]',
      },
    },
    defaultVariants: {
      variant: 'success',
    },
  },
);

export function Pill({
  variant,
  children,
}: VariantProps<typeof pillVariant> & React.PropsWithChildren) {
  return <span className={cn(pillVariant({ variant }))}>{children}</span>;
}
