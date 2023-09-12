import React, {useState} from 'react';
import {json} from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DeviceReg = () => {

    const [deviceId, setDeviceId] = useState('')
    const [location, setLocation] = useState('')
    const {authTokens, checkJWT} = useAuth()
    const [status, setStatus] = useState({})
    checkJWT()
    const handleSubmit = e => {

        console.log(deviceId, location)

        fetch(`http://182.163.112.102:8006/api/device-reg/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify({
                device_id: deviceId,
                location: location
            })
        }).then(res=>res.json())
            .then(data=>{
                // console.log(data)
                setStatus(data)
                setLocation('')
                setDeviceId('')
            })
        // console.log(JSON.parse(status))
        e.preventDefault()
    }



    return (
        <div className='d-flex justify-content-center align-content-center'>
            <div className='border border-2 p-3 mt-5 rounded w-md-25'>
                <h3>Update/Register Device</h3>
                <form >
                    <div className="mb-3">
                        <label htmlFor="device_id" className="form-label" >Device ID</label>
                        <input type="text" className="form-control" id="device_id" aria-describedby="emailHelp" onChange={e=>setDeviceId(e.target.value)}  value={deviceId}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Location" className="form-label">Location</label>
                        <input type="text" className="form-control" id="location" onChange={e=>setLocation(e.target.value)} value={location}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={e=>handleSubmit(e)}>Submit</button>
                </form>
                <div className={`${status.device_id ? 'd-block' : 'd-none'} ${status.device_id ? 'alert alert-success' : 'alert alert-danger'} mt-3`} role="alert">
                    {
                        status.status ? 'Device Registered' : 'Device Updated'
                    }
                </div>
            </div>
        </div>
    );
};

export default DeviceReg;