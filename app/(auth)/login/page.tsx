'use client'
import {
    User,
    Key,
} from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthButton, AuthInput } from '@/components/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { comparePassword } from '@/utils/hashPassword';
import { login } from '@/utils/auth';
import { useState } from 'react';

const loginSchema = z.object({
    username: z.string().min(3, 'Codename must be at least 3 characters long').max(10, 'Codename must be at most 10 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const { users } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: LoginSchema) => {
        setIsLoading(true);
        try {
            const user = users.find((user) => user.codename === data.username);
            if (user && comparePassword(data.password, user.password)) {
                await login(user.id, user.codename);
                toast.success('Login successful');
                router.push('/dashboard');
            } else {
                toast.error('Invalid Codename or Password');
            }
        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Mascot / Visual */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start order-2 lg:order-1 animate-float">
                <div className="relative w-full max-w-[600px] aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                    <Image
                        src="/img/heroLogin.webp"
                        alt="Cyberpunk anime style visual"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder='blur'
                        blurDataURL="/img/heroLogin.webp"
                    />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 bg-linear-to-t from-background-dark/90 via-transparent to-transparent flex flex-col justify-end p-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-bold w-fit mb-4 uppercase tracking-wider shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            Season 4 Live
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg mb-2">
                            Prove Your <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">Otaku Level</span>
                        </h2>
                        <p className="text-slate-300 text-sm lg:text-base max-w-md">
                            Join over 10,000 challengers in the ultimate anime trivia showdown.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Glass Login Card */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto order-1 lg:order-2">

                {/* Glass Card */}
                <section className="bg-glass backdrop-blur-xl border border-glass-border p-8 rounded-[2rem] shadow-2xl">
                    <div className="flex flex-col gap-6">
                        <div className="space-y-2 text-center lg:text-left">
                            <h1 className="text-4xl font-black tracking-tighter text-white">
                                Ready, Challenger?
                            </h1>
                            <p className="text-slate-400 text-sm font-medium">
                                Enter your codename to initialize the mission.
                            </p>
                        </div>
                        <form className="space-y-4 pt-2" onSubmit={handleSubmit(onSubmit)}>
                            <AuthInput
                                icon={User}
                                type="text"
                                placeholder="Codename"
                                register={register('username')}
                                error={errors.username?.message}
                            />
                            <AuthInput
                                icon={Key}
                                type="password"
                                placeholder="Access Key"
                                register={register('password')}
                                error={errors.password?.message}
                            />
                            <AuthButton text="Start Mission" type="submit" isLoading={isLoading} />
                        </form>
                    </div>
                    <div className="text-center mt-6">
                        <p className="text-slate-400 text-sm">
                            Don't have an account?{" "}
                            <Link href="/register" className="hover:underline font-bold transition-colors">
                                Register here
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}