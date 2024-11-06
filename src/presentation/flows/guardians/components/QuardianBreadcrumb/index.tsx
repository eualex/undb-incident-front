'use client';

import {
  RegisterTicketSteps,
  TICKET_STEP_QUERY_KEY,
} from '@/presentation/constants/ticket';
import { Check, ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function Step({
  step,
  children,
  number,
  last,
}: {
  number: number;
  step: number;
  last?: boolean;
  children: React.ReactNode;
}) {
  const completed = step > number;
  const disabled = step < number;
  const active = step === number;

  return (
    <div className="h-max flex items-center">
      {completed && (
        <div className="flex items-center gap-2">
          <div className="bg-[#ECFDF3] border border-[#079455] rounded-full p-1">
            <Check size={16} className="text-[#079455]" />
          </div>
        </div>
      )}

      {active && (
        <div className="flex items-center gap-2">
          <div className="bg-secondary p-1 text-center rounded size-[25px] flex items-center justify-center">
            <p className="text-white text-sm">{number}</p>
          </div>

          <p className="text-secondary text-lg">{children}</p>
        </div>
      )}

      {disabled && (
        <div className="bg-[#EEE] p-1 text-center rounded size-[25px] flex items-center justify-center">
          <p className="text-[#9F9F9F] text-sm">{number}</p>
        </div>
      )}

      {(active || completed) && !last && (
        <hr className="border-0 w-[1px] h-[24px] bg-[#DCDCDC] ml-2" />
      )}
    </div>
  );
}

export function QuardianBreadcrumb() {
  const searchParams = useSearchParams();
  const step = Number(
    searchParams?.get(TICKET_STEP_QUERY_KEY) ?? RegisterTicketSteps.ON_BOARDING,
  );

  return (
    <div className="h-[70px] w-full bg-white relative after:content-none after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-10 after:bg-secondary after:block">
      <div className="container flex items-center h-full">
        <div className="flex items-center gap-2 h-full justify-center mr-auto">
          <p className="text-sm text-gray-400">Histórico</p>
          <ChevronRight
            size={20}
            className="text-sm text-secondary font-bold"
          />
          <p className="text-sm text-secondary font-bold">Novo chamado</p>
        </div>

        <div className="flex items-center gap-3 ml-auto h-full">
          <Step number={1} step={step}>
            Vamos começar?
          </Step>
          <Step number={2} step={step}>
            Informações gerais
          </Step>
          <Step number={3} step={step}>
            Questões
          </Step>
          <Step number={4} step={step} last>
            Providências
          </Step>
        </div>
      </div>
    </div>
  );
}
