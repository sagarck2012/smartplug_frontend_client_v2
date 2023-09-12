import React, {useEffect, useState} from 'react';
// import TableComponent from "./TableComponent";
// import CsvDownload from "./CSVDownload/CSVDownload";
import useAuth from "../../hooks/useAuth";
import DeviceListItem from "./DeviceListItem";
// import Pagination from "./Pagination";


const DeviceList = () => {
    // const itemPerPage = 1;

    const [deviceList, setDeviceList] = useState([])
    const {authTokens, error, setError, checkJWT} = useAuth()
    checkJWT()
    // const [currentPage, setCurrentPage] = useState(1)

    // const indexOfLastItem = currentPage * itemPerPage
    // const indexOfFirstItem = indexOfLastItem - itemPerPage
    // const currentItems = deviceList.slice(indexOfFirstItem,indexOfLastItem)
    // const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const getDeviceList = () => {
        fetch('http://182.163.112.102:8006/api/devices/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data?.detail){
                    setError(data?.detail)
                }else {
                    console.log(data)
                    setDeviceList(data)
                }
            })
    }


    // const test = () => {
    //     fetch(` http://127.0.0.1:8000/api/download/`, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             date:"2023-03-12",
    //             device_id:"Arced_AQ1"
    //         })
    //     }).then(res=>)
    //
    // }


    useEffect(()=>{
        getDeviceList()
    },[])




    return (
        <div className='w-75 mx-auto'>
            <h3 className="text-center font-weight-bold my-3">
                Devices
            </h3>
            {
                error && <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            }
            {!error && <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
                {deviceList.map(item=><DeviceListItem key={item.device_id} item={item}/>)}
            </div>}
        </div>
    );
};

export default DeviceList;