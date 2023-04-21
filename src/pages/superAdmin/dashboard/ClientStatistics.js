import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Sector, Tooltip, Cell } from "recharts";
import { ReactComponent as MoreIcon } from "../../../assets/icons/more-icon.svg";
import BoyIcon from "../../../assets/images/pages/dashboard/boy-icon.png";
import GirlIcon from "../../../assets/images/pages/dashboard/girl-icon.png";
import { ActionComp, DropDown } from ".";
import { getActiveClientStatisticsApi } from "../../../api/superAdminApi";
import { superAdminSelector } from "../../../redux/slicers/superAdminSlice";

const ClientStatistics = () => {
  const dispatch = useDispatch();
  const { activeClientStatistics = {} } = useSelector(superAdminSelector);

  const [dropDown, setDropDown] = useState({ open: false, text: "year" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRemove = () => {
    setOpen(false);
  };
  const handleRefresh = () => {
    const type = "year";
    setDropDown({ open: false, text: "year" });
    dispatch(getActiveClientStatisticsApi(setLoading, type));
    setOpen(false);
  };

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
    setHovered(true);
  };
  const onPieLeave = () => setHovered(false);

  const type = dropDown.text;

  useEffect(() => {
    dispatch(getActiveClientStatisticsApi(setLoading, type));
  }, [dropDown.text]);

  const dataImg = [
    { name: "male", img: BoyIcon },
    { name: "female", img: GirlIcon },
    { name: "other" },
  ];

  const data =
    activeClientStatistics &&
    activeClientStatistics?.data?.map((item, i) => ({
      ...item,
      name: item?.name,
      value: Number(item?.per.slice(0, -1)),
      img: dataImg.find((imgItem) => imgItem.name === item?.name)?.img || null,
    }));

  return (
    <div className="list-card client-statistics">
      <div className="card-title">
        <h2>Active Client Statistics</h2>
        <div className="select-and-more-wrapper">
          <DropDown dropDown={dropDown} setDropDown={setDropDown} />
          <ActionComp
            open={open}
            setOpen={setOpen}
            handleRefresh={handleRefresh}
            handleRemove={handleRemove}
          />
        </div>
      </div>
      <div className="card-lists">
        <PieChart width={200} height={200}>
          <Pie
            // key={Math.random()}
            activeIndex={isHovered ? activeIndex : null}
            activeShape={renderActiveShape}
            dataKey="value"
            data={data}
            cx={100}
            cy={100}
            innerRadius={51}
            outerRadius={80}
            fill="#82ca9d"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            stroke={0.1}
          >
            {data?.map((entry, index) => (
              <Cell
                onClick={() => console.log(entry)}
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} cursor={false} />
        </PieChart>
        <div className="card-total">
          <p>
            <span>{activeClientStatistics?.total}</span> Total Users
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientStatistics;

const COLORS = ["#00B2FF", "#0953A9", "#8A3CAC1A"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="donut-tooltip">
        {payload[0]?.payload?.img && <img src={payload[0]?.payload?.img} />}
        <p>{`${payload && payload[0]?.value}%`}</p>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props) => {
  const { cx, cy, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={40}
        outerRadius={90}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={10}
      />
    </g>
  );
};
