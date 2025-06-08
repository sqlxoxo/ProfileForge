'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

interface AuthFormProps {
	mode: 'login' | 'register'
}

const loginSchema = z.object({
	email: z.string().email({ message: 'Invalid email address.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters.' }),
})

const registerSchema = z
	.object({
		fullName: z
			.string()
			.min(2, { message: 'Full name must be at least 2 characters.' }),
		email: z.string().email({ message: 'Invalid email address.' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters.' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

export default function AuthForm({ mode }: AuthFormProps) {
	const isLogin = mode === 'login'
	const schema = isLogin ? loginSchema : registerSchema
	const { login, register, loading } = useAuth()

	const form = useForm<LoginFormValues | RegisterFormValues>({
		resolver: zodResolver(schema),
		defaultValues: isLogin
			? { email: '', password: '' }
			: { fullName: '', email: '', password: '', confirmPassword: '' },
	})

	async function onSubmit(values: LoginFormValues | RegisterFormValues) {
		if (isLogin) {
			await login(values.email, (values as LoginFormValues).password)
		} else {
			const regValues = values as RegisterFormValues
			await register(regValues.email, regValues.password, regValues.fullName)
		}
	}

	return (
		<div className='flex justify-center items-center min-h-[calc(100vh-200px)] py-8'>
			<Card className='w-full max-w-md shadow-2xl'>
				<CardHeader>
					<CardTitle className='text-3xl font-headline text-center'>
						{isLogin ? 'Welcome Back' : 'Create Your Account'}
					</CardTitle>
					<CardDescription className='text-center'>
						{isLogin
							? 'Log in to access your ProfileForge.'
							: 'Join ProfileForge today!'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
							{!isLogin && (
								<FormField
									control={form.control}
									name='fullName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input placeholder='John Doe' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type='email'
												placeholder='you@example.com'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type='password'
												placeholder='••••••••'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{!isLogin && (
								<FormField
									control={form.control}
									name='confirmPassword'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<Input
													type='password'
													placeholder='••••••••'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							<Button
								type='submit'
								className='w-full bg-accent hover:bg-accent/90'
								disabled={loading}
							>
								{loading ? (
									<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								) : isLogin ? (
									'Login'
								) : (
									'Register'
								)}
							</Button>
						</form>
					</Form>
					<div className='mt-6 text-center text-sm'>
						{isLogin ? (
							<>
								Don&apos;t have an account?{' '}
								<Link
									href='/register'
									className='font-medium text-accent hover:underline'
								>
									Sign up
								</Link>
							</>
						) : (
							<>
								Already have an account?{' '}
								<Link
									href='/login'
									className='font-medium text-accent hover:underline'
								>
									Log in
								</Link>
							</>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
