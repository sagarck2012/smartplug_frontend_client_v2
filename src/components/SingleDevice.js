import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TableComponent from "./TableComponent";
import CsvDownload from "./CSVDownload/CSVDownload";
import {Button} from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import CustomSpinner from "./Spinner/CustomSpinner";


const SingleDevice = () => {
    const [deviceList, setDeviceList] = useState([])
    const {id} = useParams()
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [isLoading, setLoading] = useState(false)
    const {authTokens, checkJWT, setError} = useAuth()
    // checkJWT()
    // console.log(id)

    const getDeviceList = () => {
        setLoading(true)
        fetch(`http://182.163.112.102:8006/api/devices/${id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setDeviceList(data)
            })
    }

    useEffect(()=>{
        checkJWT()
        getDeviceList()
        console.log(deviceList)
    },[])

    const handleSubmit = (e) => {
        setLoading(true)
        // console.log(dateFrom,dateTo)
        fetch(`http://182.163.112.102:8006/api/devices-with-dateRange/${id}`, {
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
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
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
        <div className="w-75 mx-auto">
            <h4 className="text-center font-weight-bold my-5">
                Detail view for device no: {id}
            </h4>
            <h5 className="text-center mb-3">
                Location: {deviceList[0]?.device_detail?.location}
            </h5>

            <div className="d-flex justify-content-between align-items-center my-5">
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-auto">
                        <input className='form-control' type='datetime-local' id='from' value={dateFrom} onChange={(e)=> setDateFrom(e.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <input className='form-control' type='datetime-local' id='to' value={dateTo} onChange={(e)=> setDateTo(e.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <input className='form-control' type='Submit' value='Submit'/>
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
            {!isLoading && deviceList.length > 0 &&<>
                <TableComponent deviceList={deviceList.slice(0, 50)} isDeviceList={false}/>
                <CsvDownload deviceList={deviceList} nameString={`Download ${id} Device Data`}/>
            </>}
        </div>
    );
};

export default SingleDevice;