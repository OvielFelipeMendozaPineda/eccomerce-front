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
          <div className='bg-white shadow-md rounded-lg p-6 mb-8'>
          <h1 className='text-3xl font-bold text-gray-800 mb-6'>Dashboard de Administración</h1>

          {/* Estadísticas generales */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='bg-blue-500 text-white p-5 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold'>Usuarios Totales</h2>
              <p className='text-3xl font-bold'>{stats.totalUsers}</p>
            </div>
            <div className='bg-green-500 text-white p-5 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold'>Ventas Totales</h2>
              <p className='text-3xl font-bold'>${stats.totalSales}</p>
            </div>
            <div className='bg-yellow-500 text-white p-5 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold'>Órdenes Totales</h2>
              <p className='text-3xl font-bold'>{stats.totalOrders}</p>
            </div>
            <div className='bg-red-500 text-white p-5 rounded-lg shadow-md'>
              <h2 className='text-xl font-semibold'>Productos Totales</h2>
              <p className='text-3xl font-bold'>{stats.totalProducts}</p>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className='mt-10'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Actividad Reciente</h2>
            <div className='bg-gray-50 p-5 rounded-lg shadow-md'>
              {recentActivity.length > 0 ? (
                <ul className='divide-y divide-gray-200'>
                  {recentActivity.map((activity, index) => (
                    <li key={index} className='py-4'>
                      <p className='text-gray-600'>{activity.message}</p>
                      <p className='text-sm text-gray-400'>{activity.timestamp}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-gray-500'>No hay actividad reciente.</p>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
