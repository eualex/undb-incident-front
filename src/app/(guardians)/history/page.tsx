'use client';

import { parseAsInteger, useQueryState } from 'next-usequerystate';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  generatePaginationLinks,
} from '@/presentation/components/ui/pagination';
import { ArrowRight, Search } from 'lucide-react';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/presentation/components/ui/table';
import { Pill } from '@/presentation/components/base/pill';
import { Button } from '@/presentation/components/ui/button';

export default function HistoryPage() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  const rowsPerPage = 10;
  const totalRows = 100;

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  //TODO: add integration

  return (
    <>
      <title>Chamados - Histórico</title>
      <main className="w-full h-full py-16">
        <div className="container">
          <div className="w-full rounded-[100px] border border-gray-300 bg-white overflow-hidden flex gap-2 items-center px-4 py-2">
            <Search className="text-primary" size={24} />
            <input
              className="border-none w-full h-full outline-none"
              placeholder="Pesquise"
            />
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
                    <TableHead className="w-[550px]">INDENTIFICADOR</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead className="whitespace-nowrap">
                      DATA DE SOLICITAÇÃO
                    </TableHead>
                    <TableHead>AÇÕES</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>
                      <Pill variant={'error'}>Resolvido</Pill>
                    </TableCell>
                    <TableCell className="">
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
        </div>
      </main>
    </>
  );
}
