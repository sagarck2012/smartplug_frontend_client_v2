import React, {useMemo, useState} from 'react';
import {Table} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Pagination from "./Pagination/Pagination";
import {BsCircleFill} from "react-icons/bs"
import wifi_green from "../assets/images/wifi.png"
import plug from "../assets/images/Pluge_green.png"
import {TbPlugOff} from "react-icons/tb"

// const ITEM_PER_PAGE = 50;
const PageSize = 50;

const TableComponent = ({deviceList, isDeviceList}) => {
    const [currentPages, setCurrentPages] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPages - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return deviceList?.slice(firstPageIndex, lastPageIndex);
    }, [currentPages,deviceList]);

    // console.log(deviceList)

    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location.pathname)
    // const [currentPage, setCurrentPage] = useState(1)

    // const checkConnectivity = isConnected => {
    //     return isConnected ? "Connected" : "Disconnected"
    // }

    const dateTimeParse = st => {
        // console.log(st)
        const modst = st?.replace('T', " ").slice(0, -1)
        return modst?.slice(0, 16)
    }

    const internet_connectivity = stat => {
        return stat === "Disconnected" ? "Off" : "On"
    }
    // const indexOfLastItem = currentPage * ITEM_PER_PAGE
    // const indexOfFirstItem = indexOfLastItem - ITEM_PER_PAGE

    // const currentItems = deviceList.slice(indexOfFirstItem,indexOfLastItem)
    //
    // const paginate = (pageNumber) => setCurrentPages(pageNumber)

    return (
        <div>
            <Table className='text-center' striped bordered hover size="sm" responsive >
                <thead className="thead-dark">
                <tr>
                    <th className={location?.pathname === '/home' ? 'd-none' : ''}>Created At</th>
                    <th>Device ID</th>
                    <th className={location?.pathname === '/home' ? 'd-none' : ''}>Energy Usage(w/h)</th>
                    {/*<th>Today Total</th>*/}
                    <th >Internet</th>
                    <th >Power Connectivity</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentTableData.map((device,index) => (
                        <tr key={index} onClick={()=>navigate(`/${device.device_id}`)} style={{cursor:'pointer'}}>
                            <td className={location?.pathname === '/home' ? 'd-none' : ''}>{dateTimeParse(device?.created_at)}</td>
                            <td>{device.device_id}</td>
                            <td className={location?.pathname === '/home' ? 'd-none' : ''}>{device.energy_consumption}</td>
                            {/*<td>{location?.pathname === '/home' ? device.today_total : device.total_consumption}</td>*/}

                            <td className={location?.pathname === '/home' ? '' : 'd-none'}>
                                <BsCircleFill color={device?.status === 'Connected' ? 'green' : 'red'}/>
                            </td>
                            <td className={location?.pathname === '/home' ? '' : 'd-none'}>
                                <BsCircleFill color={device?.status === 'Connected' ? 'green' : 'red'} />
                            </td>
                            <td className={location?.pathname === '/home' ? 'd-none' : ''}>
                                <BsCircleFill color={device.is_connected === 'Connected' ? 'green' : 'red'}/>

                            </td>
                            <td className={location?.pathname === '/home' ? 'd-none' : ''}>
                                {!device.is_powered && <span title={device.is_powered ? 'Connected' : 'Disconnected'} className='border border-1'><BsCircleFill color={device.is_powered ? 'green' : 'red'} /></span>}
                                {device.is_powered && device.energy_consumption>0 && device.is_connected === 'Connected' && <BsCircleFill color={device.is_powered ? 'green' : 'red'} title={device.is_powered ? 'Connected' : 'Disconnected'}/>}
                                {device.is_powered && device.is_connected === 'Disconnected' && <img src={wifi_green} alt='icon' style={{height:'16px', width:'16px'}} title="Wifi not connected"/>}
                                {device.is_powered && !device.energy_consumption>0 && device.is_connected === 'Connected' && <img src={plug} alt='icon' style={{height:'16px', width:'16px'}} title="Plug not connected"/>}
                            </td>


                            <td>{location.pathname === '/home' ? device?.location : device?.device_detail?.location}</td>
                        </tr>
                    ))
                }

                </tbody>
            </Table>
            {/*<Pagination itemPerPage={ITEM_PER_PAGE} totalItem={deviceList?.length} paginate={paginate}/>*/}
            <div className="d-flex justify-content-center">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPages}
                    totalCount={deviceList.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPages(page)}
                />
            </div>

        </div>
    );
};

export default TableComponent;