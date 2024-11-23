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
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';

interface Parent {
  id: number;
  name: string;
  email: string;
  cell: string;
  phone: string;
  type: string;
}

interface Student {
  id: number;
  name: string;
  dateOfBirth: string;
  classNumber: number;
  grade: number;
  parent: Parent;
}

interface ContentItem {
  id: number;
  questions: string;
  observationForSchool: string;
  provisions: string;
  finalObservations: string;
  dateOfAttendance: string;
  student: Student;
  user: string;
  status: string;
}

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort[];
  pageSize: number;
  paged: boolean;
  pageNumber: number;
  unpaged: boolean;
}

interface Response {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ContentItem[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

export default function HistoryPage() {
  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const token = Cookies.get('token');
  const { data } = useQuery<Response>({
    queryKey: ['history', page],
    queryFn: async () => {
      const response = await fetch(
        `http://192.168.88.53:9090/called/listMy?page=${page}&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.json();
    },
  });

  const totalPages = data?.totalPages ?? 1;

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
                <p className="text-xs text-primary">
                  {data?.totalElements} chamados
                </p>
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
                  {data?.content?.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item?.id}</TableCell>
                      <TableCell>
                        {item.status === 'RESOLVIDO' ? (
                          <Pill variant={'success'}>Resolvido</Pill>
                        ) : (
                          <Pill variant={'error'}>Sem resposta</Pill>
                        )}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell className="">
                        <Button variant="primary_outline">
                          Ver Andamento
                          <ArrowRight />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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
