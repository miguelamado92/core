import { type VariantProps, tv } from 'tailwind-variants';
export { default as Badge } from './badge.svelte';

export const badgeVariants = tv({
	base: 'inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
	variants: {
		size: {
			md: 'px-2.5 py-0.5',
			lg: 'text-md px-4 py-0.5'
		},
		variant: {
			default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
			secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
			destructive:
				'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
			outline: 'text-foreground',
			success: 'bg-success-100 border-success-200 text-success-800',
			danger: 'bg-danger-100 border-danger-800 text-danger-800',
			info: 'bg-info-100 border-info-200 text-info-800',
			primary: 'bg-primary-100 border-primary-200 text-primary-800',
			warning: 'bg-warning-50 border-warning-400 text-warning-600'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type Variant = VariantProps<typeof badgeVariants>['variant'];
export type Size = VariantProps<typeof badgeVariants>['size'];
