'use client';

import { Button } from '@/presentation/components/ui/button';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/presentation/components/ui/input';

import logoImg from '@/public/images/logo.png';
import loginBgImg from '@/public/images/login_bg.png';
import { useRouter } from 'next/navigation';
import { Paths } from '@/presentation/constants/paths';
import { jwtDecode } from 'jwt-decode';
import { useToast } from '@/presentation/hooks/use-toast';
import { useState } from 'react';
import { Loader } from 'lucide-react';
import Cookies from 'js-cookie';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
    })
    .email('E-mail inválido'),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(1, { message: 'Senha é obrigatória' }),
});

export default function Home() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    axios
      .post('http://192.168.88.53:9090/auth/login', {
        email: data.email,
        password: data.password,
      })
      .then(res => {
        const response = res.data as { token: string };
        const token = response?.token;
        const data = jwtDecode<{ email: string; role: string }>(token);

        Cookies.set('token', token);

        if (data?.role === 'SUPER_ADMIN') {
          router.push(Paths.TICKET);
        } else {
          router.push(Paths.NEW_TICKET);
        }
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Erro no login',
          description: 'Não foi possivel realizar o login',
        });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex items-center h-screen w-screen">
      <title>Login - Dom Bosco Chamados</title>
      <section className="w-[100vw] md:w-[50vw] h-full flex items-center justify-center">
        <div className="bg-white rounded-2xl w-[min(448px,95%)] h-[588px] p-8 flex-col border border-athens-gray-100">
          <div className="w-full flex flex-col gap-10 items-center justify-center">
            <Image src={logoImg} alt="" />

            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl text-secondary">Faça login</h1>
              <p className="text-sm text-athens-gray-950">
                Preencha seus dados para acessar
              </p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Digite seu email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Senha*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full mt-6"
                type="submit"
                variant="default"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={24} />
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </section>

      <section className="hidden bg-red-50 md:flex w-[50vw] h-full relative rounded-l-[60px] overflow-hidden">
        <Image src={loginBgImg} className="object-cover w-full" alt="" />
      </section>
    </div>
  );
}
