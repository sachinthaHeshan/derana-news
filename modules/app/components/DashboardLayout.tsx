import { DashBoardNavBar } from './DashBoardNavBar';

interface MainLayoutProps {
  children: JSX.Element;
}
export const DashboardLayout = ({ children }: MainLayoutProps) => (
  <div className="flex flex-col h-screen">
    <DashBoardNavBar />
    {children}
  </div>
);
