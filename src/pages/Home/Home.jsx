import SidebarMenu from '../../components/SidebarMenu/SidebarMenu';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios/ConfigAxios';

const Home = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simula llamadas a API para obtener datos
    // const fetchStats = async () => {
    //   try {
    //     const usersResponse = await axios.get('/admin/stats/users');
    //     const salesResponse = await axios.get('/admin/stats/sales');
    //     const ordersResponse = await axios.get('/admin/stats/orders');
    //     const productsResponse = await axios.get('/admin/stats/products');

    //     setStats({
    //       totalUsers: usersResponse.data.count,
    //       totalSales: salesResponse.data.total,
    //       totalOrders: ordersResponse.data.count,
    //       totalProducts: productsResponse.data.count,
    //     });
    //   } catch (error) {
    //     console.error("Error fetching stats", error);
    //   }
    // };

    // const fetchRecentActivity = async () => {
    //   try {
    //     const activityResponse = await axios.get('/admin/activity/recent');
    //     setRecentActivity(activityResponse.data);
    //   } catch (error) {
    //     console.error("Error fetching recent activity", error);
    //   }
    // };

    // fetchStats();
    // fetchRecentActivity();
  }, []);

  return (
    <div className='flex h-screen bg-gray-100'>
      <SidebarMenu />
      <div id='main-display' className='flex flex-col w-full h-full p-8 overflow-x-scroll'>
        

        <div className='flex-grow'>
          <Outlet />
          
        </div>
      </div>
    </div>
  )
}

export default Home;
