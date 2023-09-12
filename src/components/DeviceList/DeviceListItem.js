import React from 'react';
import {BsCircleFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

const DeviceListItem = ({item}) => {
    const navigate = useNavigate()
    // console.log(item)
    return (
        <div className={`col mb-2 mb-lg-3`}>
            <div className={`card ${item?.status === 'Connected' ? 'border-success' : 'border-danger'}`}
                 style={{width: "10rem", cursor: 'pointer'}}
                 onClick={() => navigate(`/${item.device_id}`)}
            >
                <div className="card-body">
                    <h5 className="card-title">{item?.device_id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item?.device_detail}</h6>
                    <div className={`mt-3`}>
                        {/*<p className={`rounded text-center text-white ${item?.status === 'Connected' ? 'bg-success' : 'bg-danger'}`}>Internet</p>*/}
                        {/*<BsCircleFill color={item.status === 'Connected' ? 'green' : 'red'} />*/}
                        <p className={`d-flex align-items-center justify-content-between`}><span>Internet</span>
                            <BsCircleFill color={item.status === 'Connected' ? 'green' : 'red'}/></p>
                        <p className={`d-flex align-items-center justify-content-between`}><span>Electricity</span>
                            <BsCircleFill color={item.status === 'Connected' ? 'green' : 'red'}/></p>
                        {/*<p className={`rounded text-center text-white ${item?.status === 'Connected' ? 'bg-success' : 'bg-danger'}`}>Electricity</p>*/}
                        {/*<BsCircleFill color={item.status  === 'Connected' ? 'green' : 'red'} />*/}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DeviceListItem;