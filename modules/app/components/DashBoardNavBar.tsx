export const DashBoardNavBar = () => (
  <nav className="  w-full   bg-black opacity-90  flex justify-between items-center p-4">
    <div className="flex justify-between items-center">
      <img src="/images/derana-logo.png" alt="Derana logo" className="w-16" />
      <div className="flex flex-col">
        <span className="text-white font-bold text-3xl font-sans block leading-9">ADA</span>
        <span className="text-lava-red font-bold text-3xl leading-6">
          Derana <span className="text-white text-sm">Dashboard</span>
        </span>
      </div>
    </div>

    <div className="flex justify-center items-center  ">
      <img
        src="/images/sachintha.jpeg"
        alt="User Avatar"
        className="w-11 h-11 object-cover m-2 p-0.5 border-2 border-granite-gray rounded-full"
      />
    </div>
  </nav>
);
