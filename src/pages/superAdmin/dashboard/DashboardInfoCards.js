import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminDashboardBasicDetailsApi } from "../../../api/superAdminApi";
import { superAdminSelector } from "../../../redux/slicers/superAdminSlice";
import OnlineTestStreaming from "../../../assets/images/pages/dashboard/online-test-streaming.png";
import TotalAssessment from "../../../assets/images/pages/dashboard/total-assessment.png";
import ActiveClients from "../../../assets/images/pages/dashboard/active-clients.png";
import ScheduledAssessment from "../../../assets/images/pages/dashboard/scheduled-assessment.png";

const DashboardInfoCards = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { basicDetail = {} } = useSelector(superAdminSelector);

  useEffect(() => {
    dispatch(getAdminDashboardBasicDetailsApi(setLoading));
  }, []);

  const ListItems = [
    {
      title: "Online Test Streaming",
      value: basicDetail?.onlineTestStreaming,
      imgSrc: OnlineTestStreaming,
      className: "listitem1",
    },
    {
      title: "Total Assessment",
      value: basicDetail?.totalAssessment,
      imgSrc: TotalAssessment,
      className: "listitem2",
    },
    {
      title: "Active Clients",
      value: basicDetail?.activeClients,
      imgSrc: ActiveClients,
      className: "listitem3",
    },
    {
      title: "Scheduled Assessment",
      value: basicDetail?.scheduledAssessement,
      imgSrc: ScheduledAssessment,
      className: "listitem4",
    },
  ];
  return (
    <div className="dashboard-totalview">
      {ListItems?.map((item) => (
        <div className={`total-listitem ${item?.className}`} key={item?.title}>
          <div className="listitem-content">
            <p className="total-title">{item?.title}</p>
            <p className="total-count">{item?.value}</p>
          </div>
          <div className="listitem-image">
            <img src={item?.imgSrc} alt="user-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardInfoCards;