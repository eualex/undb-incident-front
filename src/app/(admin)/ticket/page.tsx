'use client';

import {
  ArrowRight,
  Home,
  Instagram,
  LogOut,
  MessageSquareQuote,
  Search,
  Youtube,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/presentation/components/ui/sidebar';

import logoWhiteImg from '@/public/images/logo_white.png';
import logoImg from '@/public/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/presentation/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  generatePaginationLinks,
  PaginationNext,
} from '@/presentation/components/ui/pagination';
import { Pill } from '@/presentation/components/base/pill';
import { parseAsInteger, useQueryState } from 'next-usequerystate';
import { Switch } from '@/presentation/components/ui/switch';

const items = [
  {
    title: 'Chamados',
    url: '/ticket',
    icon: Home,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="ml-6 mt-6">
          <Image src={logoWhiteImg} alt="" />
        </div>
        <hr className="w-full h-[1px] border-0 bg-white mt-4" />
        <SidebarGroup>
          <SidebarGroupLabel>Gestão</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    data-active={pathname === item.url}
                  >
                    <Link href={item.url} className="text-white">
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Button className="mt-auto mx-3 mb-4" variant="outline">
          Sair
          <LogOut size={24} />
        </Button>
      </SidebarContent>
    </Sidebar>
  );
}

export default function Tickets() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const rowsPerPage = 10;
  const totalRows = 100;

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <>
      <title>Chamados - Dom Bosco Chamados</title>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full flex flex-col">
          <header className="h-[60px] bg-white w-full border-b border-b-gray-300">
            <div className="container h-full flex items-center justify-end gap-4">
              <div className="w-[min(90%,280px)] rounded-[100px] border border-gray-300 bg-white overflow-hidden flex gap-2 items-center px-4 py-2">
                <Search className="text-primary" size={24} />
                <input
                  className="border-none w-full h-full outline-none"
                  placeholder="Pesquise"
                />
              </div>

              <div className="flex items-center gap-3">
                <Image src={logoImg} alt="" width={60} />

                <div className="flex flex-col text-center">
                  <p className="text-secondary text-base font-bold">
                    Dom Bosco ADMIN
                  </p>
                  <p className="text-gray-500 text-sm">dombosco@exemplo.io</p>
                </div>
              </div>
            </div>
          </header>

          <section className="container">
            <div className="flex items-center gap-6 my-8">
              <div className="p-4 rounded-lg border border-gray-300 bg-[#74489D1C]">
                <MessageSquareQuote size={24} className="text-secondary" />
              </div>

              <div className="space-y-1">
                <h1 className="font-bold text-secondary text-3xl">
                  Gestão de Chamados
                </h1>
                <p className="text-base text-zinc-400">
                  Faça a gestão dos chamados dos pais/responsáveis facilmente.
                </p>
              </div>
            </div>

            <div className="bg-white mt-6 rounded-lg border border-gray-300">
              <div className="px-6 py-5 flex items-center justify-start gap-2">
                <p className="text-lg text-gray-900">Histórico de chamados</p>
                <span className="text-center px-2 h-[22px] rounded-2xl bg-gray-100 flex items-center justify-center">
                  <p className="text-xs text-primary">25 chamados</p>
                </span>
              </div>

              <div className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">
                        NOME DO USUÁRIO
                      </TableHead>
                      <TableHead>INDENTIFICADOR</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead className="whitespace-nowrap">
                        DATA DE SOLICITAÇÃO
                      </TableHead>
                      <TableHead>AÇÕES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Jhon doe</TableCell>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>
                        <Pill variant={'error'}>Resolvido</Pill>
                      </TableCell>
                      <TableCell className="flex items-center space-x-2">
                        <Switch />
                        <Button variant="primary_outline">
                          Ver Andamento
                          <ArrowRight />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="px-6 py-4">
                <Pagination className="w-full">
                  <PaginationContent className="w-full">
                    <PaginationItem>
                      <PaginationPrevious
                        href={`?page=${Math.max(1, Number(page) - 1)}`}
                      />
                    </PaginationItem>

                    <div className="mx-auto flex gap-2 items-center">
                      {generatePaginationLinks(Number(page), totalPages)}
                    </div>

                    <PaginationItem>
                      <PaginationNext
                        href={`?page=${Math.min(totalPages, Number(page) + 1)}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </section>

          <footer className="container mt-auto mb-6">
            <div className="h-[84px] rounded-lg bg-secondary w-full px-6 py-4 flex items-center justify-between">
              <Image src={logoWhiteImg} alt="" />

              <div className="flex items-center space-x-4">
                <p className="text-sm text-white">Acompanhe nas redes:</p>
                <div className="flex items-center gap-2">
                  <Instagram size={24} className="text-white" />
                  <Youtube size={32} className="text-white" />
                </div>
              </div>
            </div>
          </footer>
        </main>
      </SidebarProvider>
    </>
  );
}
