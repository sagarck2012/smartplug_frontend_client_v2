import React from 'react';
import {CSVLink} from "react-csv";
import {headers, device_list_headers} from "./headers";

// onClick={()=>alert(`Download ${dName()}`)} filename={`${dName()}`}
const CsvDownload = ({deviceList, nameString, isDeviceList=false}) => {

    const modDeviceList = deviceList?.map(device => {

        const newDev = {...device}
        const mod = device?.created_at?.replace('T', " ").slice(0, -1)
        const modT = mod?.slice(0, 16)
        newDev.created_at = modT
        newDev.is_powered = newDev?.is_powered ? 'Connected' : 'Disconnected'
        return newDev
    })

    const dName =()=>{
        const newArr = nameString?.split(" ")
        // const newStr = newArr.shift()
        // print(newStr)
        return `${newArr?.toString()?.replaceAll(',','_')}_${Date(Date.now()).toString()}`
    }
    // console.log(dName())
    // console.log(modDeviceList)

    return (
        <div className="d-flex justify-content-end">
            <div className="">
                <CSVLink filename={`${dName()}`} data={modDeviceList} headers={isDeviceList?device_list_headers:headers} className="btn btn-primary my-3">
                    {nameString}
                </CSVLink>
            </div>
        </div>
    );
};

export default CsvDownload;