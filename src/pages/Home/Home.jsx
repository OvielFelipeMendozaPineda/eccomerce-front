import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex'>
      <SidebarMenu />
      <div id='main-display' className=' flex flex-col w-full h-screen p-5 overflow-x-scroll'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home;


