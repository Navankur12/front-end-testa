import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ReactComponent as PlusIcon } from "../../../assets/images/pages/subAdmin/plus-icon.svg";
import { SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE } from "../../../config/constants/routePathConstants";
import Table from "../../../components/common/table";

import { ReactComponent as Uparrow } from "../../../assets/images/common/up-arrow.svg";
import { ReactComponent as Downarrow } from "../../../assets/images/common/down-arrow.svg";
import { ReactComponent as ActionDots } from "../../../assets/images/common/action-dots.svg";
import { FormSwitch } from "../../../components/common/input";
import { useDispatch, useSelector } from "react-redux";
import {
  getSubAdminProfileListsApi,
  subAdminStatusApi,
} from "../../../api/authApi";
import { authSelector } from "../../../redux/slicers/authSlice";
import { USER_TYPE } from "../../../config/constants/projectConstant";
import { PulseLoader, SyncLoader } from "react-spinners";
import { InputAdornment, TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "./../../../assets/icons/search-icon.svg";
import { getUserType } from "../../../utils/projectHelper";
import TablePagination from "@mui/material/TablePagination";

const SubAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortOrders, setSortOrders] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [id, setId] = useState("");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { subAdminLists = {}, paginate } = useSelector(authSelector);
  const { totalPages = 1, totalCount = 1 } = paginate;
  const [totalPagesUser, setTotalPagesUser] = useState(0);

  useEffect(() => {
    dispatch(getSubAdminProfileListsApi(setLoading, page + 1, rowsPerPage));
  }, [page, rowsPerPage]);

  useEffect(() => {
    setSortedData(subAdminLists);
    setTotalPagesUser(totalPages);
  }, [subAdminLists, totalPages]);

  useEffect(() => {
    const sortData = () => {
      const sortColumn = Object.keys(sortOrders).find(
        (columnName) => sortOrders[columnName] !== null
      );
      if (sortColumn) {
        const sortOrder = sortOrders[sortColumn];
        const sortedData = [...subAdminLists].sort((a, b) => {
          const valueA = a[sortColumn];
          const valueB = b[sortColumn];
          if (typeof valueA === "string" && typeof valueB === "string") {
            return sortOrder === "asc"
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          } else {
            return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
          }
        });
        setSortedData(sortedData);
      }
    };

    sortData();
  }, [subAdminLists, sortOrders]);

  const getformattedData = (data) => {
    const formattedData = columns.reduce((acc, column) => {
      acc[column.name] = data[column.name];
      return acc;
    }, {});
    return formattedData;
  };
  // const datas = subAdminLists?.map((item) => getformattedData(item));

  const handleStatusChange = (e, id) => {
    const { checked } = e.target;
    const value = checked ? "active" : "inactive";
    setId(id);
    const formData = {
      status: value,
    };
    setStatusLoading(true);
    dispatch(subAdminStatusApi(id, formData, setStatusLoading));
  };

  const newData = subAdminLists.map((item, index) => {
    const newItem = [];
    newItem["id"] = {
      value: index + 1,
    };
    newItem["userId"] = {
      value: 50000 + index,
    };
    newItem["organisationName"] = {
      value: item?.organisationName,
    };
    newItem["email"] = {
      value: item?.email,
    };
    newItem["mobile"] = {
      value: item?.mobile,
    };
    newItem["address"] = {
      value: item?.address,
    };
    newItem["state"] = {
      value: item?.state,
    };
    newItem["city"] = {
      value: item?.city,
    };
    newItem["pincode"] = {
      value: item?.pincode,
    };
    newItem["userType"] = {
      value: getUserType(item?.userType),
    };
    newItem["status"] = {
      value:
        statusLoading && id == item._id ? (
          <PulseLoader size="10px" color="#0bbbfe" />
        ) : (
          <FormSwitch
            value={item.status == "active" ? true : false}
            onChange={(e) => handleStatusChange(e, item?._id)}
          />
        ),
    };
    newItem["actions"] = {
      value: (
        <div className="action-btn">
          <ActionDots />
        </div>
      ),
      style: { textAlign: "center" },
    };
    return newItem;
  });

  const handleChangePage = (e, nxtPage) => {
    setPage(nxtPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="main-content">
      <div className="title">
        <h1>Client Management List</h1>
        <button
          onClick={() => navigate(SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE)}>
          <PlusIcon />
          <span>New Role</span>
        </button>
      </div>

      <div className="subadmin-table">
        <div className="subadmin-header" >
          <div className="search-input">
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search by Id, Name etc"
              style={{ background: "#F8F8F8" }}
              // onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="subadmin-btn">
            <button className="filter-btn">Filters</button>
            <button className="export-btn">Export</button>
          </div>
        </div>
        <div className="table-wrapper"> 
          <table>
            <TableHeader
              columns={columns}
              sortOrders={sortOrders}
              setSortOrders={setSortOrders}
            />
            {loading ? (
              <tbody>
                <tr className="table-loading-wrapper">
                  <div className="sync-loader-wrapper">
                    <SyncLoader color="#2ea8db" />
                  </div>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {sortedData.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item?.clientId}</td>
                    <td>{item.organisationName}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{item.pincode}</td>
                    <td>{getUserType(item?.userType)}</td>
                    <td>
                      {statusLoading && id == item._id ? (
                        <PulseLoader size="10px" color="#0bbbfe" />
                      ) : (
                        <FormSwitch
                          value={item.status == "active" ? true : false}
                          onChange={(e) => handleStatusChange(e, item?._id)}
                        />
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className="action-btn">
                        <ActionDots />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>

      <div>
        <TablePagination
          component="div"
          count={totalPagesUser}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          backIconButtonProps={{ disabled: page === 0 }}
          nextIconButtonProps={{
            disabled: (page + 1) * rowsPerPage >= totalCount,
          }}
          rowsPerPageOptions={[2, 3, 10, 15, 20]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            const totalPages = Math.ceil(count / rowsPerPage);
            return `${page + 1} of ${count} pages`;
          }}
        />
      </div>
    </div>
  );
};

export default SubAdmin;

function TableHeader({ columns, sortOrders, setSortOrders }) {
  const handleSortClick = (columnName) => {
    const sortOrder = sortOrders[columnName] === "asc" ? "desc" : "asc";
    setSortOrders({ [columnName]: sortOrder });
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th key={column.name}>
              <div className="subadmin-title">
                <p>{column.label}</p>
                <div
                  className="title-arrow"
                  onClick={() => handleSortClick(column.name)}
                >
                  {sortOrders[column.name] === "asc" && (
                    <button className="up-arrow">
                      <Uparrow />
                    </button>
                  )}
                  {sortOrders[column.name] !== "asc" && (
                    <button className="up-arrow grayed-out">
                      <Uparrow />
                    </button>
                  )}
                  {sortOrders[column.name] === "desc" && (
                    <button className="down-arrow">
                      <Downarrow />
                    </button>
                  )}
                  {sortOrders[column.name] !== "desc" && (
                    <button className="down-arrow grayed-out">
                      <Downarrow />
                    </button>
                  )}
                </div>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

const columns = [
  { name: "id", label: "S.NO" },
  { name: "userId", label: "USER ID" },
  { name: "organisationName", label: "ORGANIZATION NAME" },
  { name: "email", label: "EMAIL ADDRESSS" },
  { name: "mobile", label: "CONTACT NO." },
  { name: "address", label: "ADDRESS" },
  { name: "state", label: "STATE" },
  { name: "city", label: "CITY" },
  { name: "pincode", label: "PINCODE" },
  { name: "userType", label: "USER TYPE" },
  { name: "status", label: "STATUS" },
  { name: "actions", label: "ACTIONS" },
];
