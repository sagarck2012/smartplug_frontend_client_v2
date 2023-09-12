import React, {useEffect, useState} from 'react';
import TableComponent from "./TableComponent";
import CsvDownload from "./CSVDownload/CSVDownload";
import useAuth from "../hooks/useAuth";
import CustomSpinner from "./Spinner/CustomSpinner";
// import Pagination from "./Pagination";


const DeviceList = () => {
    // const itemPerPage = 1;

    const [deviceList, setDeviceList] = useState([])
    const [isLoading, seIsLoading] = useState(false)
    const {authTokens, error, setError, checkJWT} = useAuth()
    checkJWT()
    // const [currentPage, setCurrentPage] = useState(1)

    // const indexOfLastItem = currentPage * itemPerPage
    // const indexOfFirstItem = indexOfLastItem - itemPerPage
    // const currentItems = deviceList.slice(indexOfFirstItem,indexOfLastItem)
    // const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const getDeviceList = () => {
        seIsLoading(true)
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
                    seIsLoading(false)
                }else {
                    // console.log(data)
                    setDeviceList(data)
                    seIsLoading(false)
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
            {
                !error && isLoading && <div className="d-flex justify-content-center align-items-center my-5">
                    <CustomSpinner/>
                </div>
            }
            {!error && !isLoading && <div>
                <TableComponent deviceList={deviceList} isDeviceList={true}/>
                {/*<Pagination itemPerPage={itemPerPage} totalItem={deviceList ?.length} paginate={paginate}/>*/}
                <CsvDownload deviceList={deviceList} nameString='Download Device List' isDeviceList={true}/>
                {/*<button onClick={test}>test</button>*/}
            </div>}
        </div>
    );
};

export default DeviceList;