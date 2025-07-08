import { Outlet } from 'umi';

export default function NextLayout() {
  return (
    <section className="h-full flex flex-col text-colors-text-neutral-strong">
      <Outlet />
    </section>
  );
}
