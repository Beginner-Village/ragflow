import { Outlet } from 'umi';
import { Header } from './next-header';

export default function NextLayout() {
  return (
    <section className="h-full flex flex-col pl-[80px] bg-[#f9fafd]">
      <Header></Header>
      <Outlet />
    </section>
  );
}
