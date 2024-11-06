'use client';

import { Button } from '@/presentation/components/ui/button';
import { Calendar } from '@/presentation/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/presentation/components/ui/radio-group';
import { Textarea } from '@/presentation/components/ui/textarea';
import {
  RegisterTicketSteps,
  StepTypeEnum,
  TICKET_STEP_QUERY_KEY,
} from '@/presentation/constants/ticket';
import { GuardianFooter } from '@/presentation/flows/guardians/components/GuardianFooter';
import { QuardianBreadcrumb } from '@/presentation/flows/guardians/components/QuardianBreadcrumb';
import { cn } from '@/presentation/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon, UserPen, UsersRound } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

function CardInfo({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="p-6 rounded-lg flex flex-col text-left gap-2 bg-secondary/5 w-min(100%,334px)">
      <p className="text-secondary font-bold text-base">{title}</p>
      <p className="text-sm text-[#616161]">{children}</p>
    </div>
  );
}

const formSchema = z.object({
  questions: z.string().optional(),
  observations: z.string().optional(),
  provisions: z
    .string({
      required_error: 'Provisões é obrigatório',
    })
    .min(1, 'Provisões é obrigatório'),
  finalObservations: z.string().optional(),
  student: z.object({
    name: z
      .string({
        required_error: 'Nome do aluno é obrigatório',
      })
      .min(1, 'Nome do aluno é obrigatório'),
    studentClass: z
      .string({
        required_error: 'Turma é obrigatória',
      })
      .min(1, 'Turma é obrigatória'),
    yearOrSerie: z
      .string({
        required_error: 'Ano ou série é obrigatório',
      })
      .min(1, 'Ano ou série é obrigatório'),
    serviceDate: z.date({
      required_error: 'Data de atendimento é obrigatória',
    }),
    birthday: z.date({
      required_error: 'Data de nascimento é obrigatória',
    }),
  }),
  guardians: z.object({
    name: z
      .string({
        required_error: 'Nome obrigatório',
      })
      .min(1, 'Nome obrigatório'),
    degreeOfKinship: z
      .string({
        required_error: 'Grau de parentesco é obrigatório',
      })
      .min(1, 'Grau de parentesco é obrigatório'),
    email: z
      .string({
        required_error: 'E-mail é obrigatório',
      })
      .email('E-mail inválido'),
    phone: z
      .string({
        required_error: 'Telefone é obrigatório',
      })
      .min(1, 'Telefone é obrigatório'),
    cellPhone: z
      .string({
        required_error: 'Celular é obrigatório',
      })
      .min(1, 'Celular é obrigatório'),

    requstedBy: z.enum(['scholl', 'parent'], {
      required_error: 'Solicitado por é obrigatório',
    }),
  }),
});

export default function NewTicket() {
  const searchParams = useSearchParams();
  const step = Number(
    searchParams?.get(TICKET_STEP_QUERY_KEY) ?? RegisterTicketSteps.ON_BOARDING,
  );
  const pathname = usePathname();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student: {
        name: '',
        birthday: undefined,
        studentClass: '',
        yearOrSerie: '',
        serviceDate: undefined,
      },
    },
  });

  function handleStep(type: StepTypeEnum) {
    return () => {
      const params = new URLSearchParams(searchParams);
      params.set(
        TICKET_STEP_QUERY_KEY,
        type === StepTypeEnum.NEXT ? `${step + 1}` : `${step - 1}`,
      );
      push(`${pathname}?${params.toString()}`);
    };
  }

  function handleSubmit() {
    //TODO: add integration
    console.log('Submit');
  }

  return (
    <>
      <title>Chamados - Novo chamado</title>
      <QuardianBreadcrumb />
      <main className="w-full h-full flex items-center justify-center">
        <div className="container my-16">
          <div className=" bg-white shadow-sm rounded-xl py-9 px-8 h-max">
            {step === RegisterTicketSteps.ON_BOARDING && (
              <div className="flex items-start gap-16">
                <section className="w-min(100%,392px) flex flex-col gap-4 items-start">
                  <h1 className="text-2xl text-secondary">
                    Separamos umas dicas para te ajudar no preenchimento dos
                    dados do chamado
                  </h1>

                  <p className="text-base text-[#616161]">
                    Dicas essenciais para você ter
                    <br /> a melhor experiência
                  </p>
                </section>

                <section className="grid grid-cols-2 gap-4">
                  <CardInfo title="1. Processo Simples e Guiado">
                    Concentre-se em cada questão com atenção total. Leia cada
                    pergunta cuidadosamente, compreenda o que está sendo
                    solicitado.
                  </CardInfo>
                  <CardInfo title="2. Suporte a Qualquer Momento">
                    Sabemos que dúvidas podem surgir. Caso precise de ajuda, há
                    sempre um suporte disponível para responder suas perguntas e
                    orientar você durante o preenchimento. Conte conosco!
                  </CardInfo>
                  <CardInfo title="3. Total Segurança e Privacidade">
                    Sua segurança é nossa prioridade. Todas as informações
                    fornecidas serão tratadas com total confidencialidade e
                    apenas para fins internos da instituição. Fique tranquilo ao
                    preencher!
                  </CardInfo>
                  <CardInfo title="4. Experiência Otimizada">
                    O formulário é compatível com celulares e tablets,
                    facilitando o acesso em qualquer lugar. Assim, você pode
                    completar tudo com facilidade, onde quer que esteja!
                  </CardInfo>
                </section>
              </div>
            )}

            <Form {...form}>
              <form
                id="ticket__form"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <div hidden={step !== RegisterTicketSteps.PERSONAL_INFO}>
                  <section className="flex flex-col gap-7">
                    <div className="flex items-center gap-4">
                      <div className="size-[32px] rounded bg-secondary flex items-center justify-center">
                        <UserPen className="text-white" size={24} />
                      </div>

                      <b className="text-xl">Informações do Aluno</b>
                    </div>

                    <div className="grid grid-cols-3 gap-8 items-center">
                      <FormField
                        control={form.control}
                        name="student.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome do aluno</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="student.birthday"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mb-2">
                              Data de nascimento
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    className={cn(
                                      'h-[42px] pl-3 text-left font-normal border rounded-md bg-transparent shadow-none hover:bg-zinc-400/30 text-zinc-700',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'dd/MM/yyyy')
                                    ) : (
                                      <span>Selecione uma data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  lang="pt-BR"
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={date =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="student.studentClass"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Turma</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="student.yearOrSerie"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ano/Série</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="student.serviceDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mb-2">
                              Data do atendimento
                            </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    className={cn(
                                      'h-[42px] pl-3 text-left font-normal border rounded-md bg-transparent shadow-none hover:bg-zinc-400/30 text-zinc-700',
                                      !field.value && 'text-muted-foreground',
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, 'dd/MM/yyyy')
                                    ) : (
                                      <p>Selecione uma data</p>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  lang="pt-BR"
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={date =>
                                    date > new Date() ||
                                    date < new Date('1900-01-01')
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  <section className="flex flex-col gap-7 mt-8">
                    <div className="flex items-center gap-4">
                      <div className="size-[32px] rounded bg-secondary flex items-center justify-center">
                        <UsersRound className="text-white" size={24} />
                      </div>

                      <b className="text-xl">
                        Informações de Pais ou Responsáveis
                      </b>
                    </div>

                    <div className="grid grid-cols-3 gap-8 items-center">
                      <FormField
                        control={form.control}
                        name="guardians.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guardians.degreeOfKinship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Grau de Parentesco com o Aluno
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guardians.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ano/Série</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guardians.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guardians.cellPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Celular</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Digite aqui"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="guardians.requstedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Solicitado por:</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-2"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="all" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Pela Escola
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="mentions" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Pelos pais
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>
                </div>

                <div hidden={step !== RegisterTicketSteps.QUESTIONS}>
                  <section className="flex flex-col gap-7">
                    <div className="flex items-center gap-4">
                      <div className="size-[32px] rounded bg-secondary flex items-center justify-center">
                        <UserPen className="text-white" size={24} />
                      </div>

                      <b className="text-xl">Questões</b>
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="questions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Espaço de escrita</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Escreva aqui..."
                                className="resize-none h-[104px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  <section className="flex flex-col gap-7 mt-8">
                    <div className="flex items-center gap-4">
                      <div className="size-[32px] rounded bg-secondary flex items-center justify-center">
                        <UserPen className="text-white" size={24} />
                      </div>

                      <b className="text-xl">
                        Aconselhamento/Observações para a escola
                      </b>
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="observations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Espaço de escrita</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Escreva aqui..."
                                className="resize-none h-[104px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>
                </div>

                <div hidden={step !== RegisterTicketSteps.FINAL_CONSIDERATIONS}>
                  <section className="flex flex-col gap-7">
                    <div className="flex items-center gap-4">
                      <div className="size-[32px] rounded bg-secondary flex items-center justify-center">
                        <UserPen className="text-white" size={24} />
                      </div>

                      <b className="text-xl">Providências</b>
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="provisions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Um espaço para que você mencione quais
                              providências devem ser tomadas.
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Escreva aqui..."
                                className="resize-none h-[104px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  <section className="flex flex-col gap-7 mt-8">
                    <div className="flex items-center gap-4">
                      <div className="size-[32px] rounded bg-secondary flex items-center justify-center">
                        <UserPen className="text-white" size={24} />
                      </div>

                      <b className="text-xl">Observações finais</b>
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="finalObservations"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Espaço de escrita</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Escreva aqui..."
                                className="resize-none h-[104px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <GuardianFooter handleStep={handleStep} formId="ticket__form" />
    </>
  );
}
