import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: JSX.Element;
}
export const MainLayout = ({ children }: MainLayoutProps) => (
  <div>
    <Navbar />
    {children}
  </div>
);
