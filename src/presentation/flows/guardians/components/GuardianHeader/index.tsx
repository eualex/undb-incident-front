'use client';

import { Button } from '@/presentation/components/ui/button';
import { Paths } from '@/presentation/constants/paths';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

import logoWhiteImage from '@/public/images/logo_white.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function GuardianHeader() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    Cookies.remove('token');
    router.push(Paths.LOGIN);
  }

  return (
    <header className="bg-secondary w-full">
      <div className="container py-6 flex justify-between items-center">
        <Image src={logoWhiteImage} alt="" />

        <div>
          <Link href={Paths.HISTORY}>
            <Button data-active={pathname === Paths.HISTORY} variant="link">
              Histórico
            </Button>
          </Link>

          <Link href={Paths.NEW_TICKET}>
            <Button data-active={pathname === Paths.NEW_TICKET} variant="link">
              Novo Chamado
            </Button>
          </Link>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Sair <LogOut size={20} />
        </Button>
      </div>
    </header>
  );
}
