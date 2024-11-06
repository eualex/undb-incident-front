import { Button } from '@/presentation/components/ui/button';
import {
  RegisterTicketSteps,
  StepTypeEnum,
  TICKET_STEP_QUERY_KEY,
} from '@/presentation/constants/ticket';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function GuardianFooter({
  handleStep,
  formId,
}: {
  handleStep: (type: StepTypeEnum) => () => void;
  formId: string;
}) {
  const searchParams = useSearchParams();

  const step = Number(
    searchParams.get(TICKET_STEP_QUERY_KEY) ?? RegisterTicketSteps.ON_BOARDING,
  );

  return (
    <footer className="h-[96px] w-full fixed bottom-0 bg-white border border-zinc-300">
      <div className="container flex h-full">
        <div className="ml-auto w-max flex items-center gap-6">
          {step === RegisterTicketSteps.ON_BOARDING && (
            <Button onClick={handleStep(StepTypeEnum.NEXT)}>
              Começar <ArrowRight size={24} />
            </Button>
          )}

          {step !== RegisterTicketSteps.ON_BOARDING && (
            <>
              <Button
                variant="secondary"
                onClick={handleStep(StepTypeEnum.BACK)}
              >
                <ArrowLeft size={24} /> Anterior
              </Button>

              {step !== RegisterTicketSteps.FINAL_CONSIDERATIONS && (
                <Button
                  variant="primary_outline"
                  onClick={handleStep(StepTypeEnum.NEXT)}
                >
                  Próximo
                  <ArrowRight
                    name="local:arrow-right-primary"
                    size={24}
                    className="text-primary"
                  />
                </Button>
              )}

              {step === RegisterTicketSteps.FINAL_CONSIDERATIONS && (
                <Button type="submit" form={formId}>
                  Enviar <ArrowRight name="local:arrow-right" size={24} />
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
