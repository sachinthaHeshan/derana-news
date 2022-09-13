import { DashBoardNavBar } from './DashBoardNavBar';

interface MainLayoutProps {
  children: JSX.Element;
}
export const DashboardLayout = ({ children }: MainLayoutProps) => (
  <div>
    <DashBoardNavBar />
    {children}
  </div>
);
