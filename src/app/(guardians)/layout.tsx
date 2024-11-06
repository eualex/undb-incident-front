import { GuardianHeader } from '@/presentation/flows/guardians/components/GuardianHeader';

export default function GuardianLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <GuardianHeader />
      {children}
    </>
  );
}
