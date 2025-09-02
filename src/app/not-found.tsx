import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { HeaderDesktop } from '@/widgets/header-desktop';

export default function NotFound() {
  return (
    <>
      <div className={'error-page'}>
        <h1 className="error-title">404</h1>
        <div>
          <h2 className="h2">Что-то пошло не так...</h2>
          <p className="body_1">
            К сожалению, страница не найдена. Возможно, она была удалена или Вы ввели некорректный
            адрес (ошибка 404).
          </p>
          <Button as={Link} href={paths.home}>
            Вернуться на главную
          </Button>
        </div>
      </div>
    </>
  );
}
