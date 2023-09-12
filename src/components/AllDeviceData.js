import React, {useEffect, useState} from 'react';
import TableComponent from "./TableComponent";
import CsvDownload from "./CSVDownload/CSVDownload";
import {Button} from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import CustomSpinner from "./Spinner/CustomSpinner";



// let PageSize = 20;
const AllDeviceData = () => {

    // const itemPerPage = 1;

    const [deviceList, setDeviceList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const {authTokens, checkJWT, setError} = useAuth()

    // const [currentPage, setCurrentPage] = useState(1)


    const getDeviceList = () => {
        setLoading(true)
        fetch('http://182.163.112.102:8006/api/all-devices/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
            .then(res => {
                // console.log(res)
                return res.json()
            })
            .then(data => {
                // console.log(data)
                setDeviceList(data)
                setLoading(false)
            })
    }

    useEffect(()=>{
        checkJWT()
        getDeviceList()
    },[])

    // const indexOfLastItem = currentPage * itemPerPage
    // const indexOfFirstItem = indexOfLastItem - itemPerPage
    // const currentItems = deviceList.slice(indexOfFirstItem,indexOfLastItem)
    // const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleSubmit = (e) => {
        // console.log(dateFrom,dateTo)
        setLoading(true)
        fetch('http://182.163.112.102:8006/api/all-devices-with-dateRange/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({
                fromDate : dateFrom,
                toDate:dateTo
            })
        })
            .then((response) => {
                // console.log(response)
                return response.json()
            })
            .then((data) => {
                setDeviceList(data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error?.message)
                setLoading(false)
                // console.error('Error:', error);
            });

        e.preventDefault()
    }





    return (
        <div>
            <div className='w-75 mx-auto'>
                <h3 className="text-center font-weight-bold my-3">
                    All Device Data
                </h3>


                <div className="d-flex justify-content-between align-items-center my-5">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-auto">
                            <input
                                className='form-control'
                                type='datetime-local'
                                id='from'
                                value={dateFrom}
                                onChange={(e)=> setDateFrom(e.target.value)}/>
                        </div>
                        <div className="col-auto">
                            <input
                                className='form-control'
                                type='datetime-local'
                                id='to'
                                value={dateTo}
                                onChange={(e)=> setDateTo(e.target.value)}/>
                        </div>
                        <div className="col-auto">
                            <input className='form-control' type='Submit' defaultValue='Submit'/>
                        </div>
                    </form>
                    <Button
                        variant='danger'
                        onClick={()=>{
                            getDeviceList();
                            setDateFrom("")
                            setDateTo("")
                        }}>
                        Clear Filter
                    </Button>
                </div>
                {
                    isLoading && <div className="d-flex justify-content-center align-items-center my-5">
                        <CustomSpinner/>
                    </div>
                }
                {!isLoading && deviceList.length > 0 && <>
                    <TableComponent deviceList={deviceList.slice(0, 50)} isDeviceList={false}/>
                    <CsvDownload deviceList={deviceList} nameString='Download All Device Data'/>
                </>}
            </div>
        </div>
    );
};

export default AllDeviceData;