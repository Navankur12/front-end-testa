import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { ReactComponent as PlusIcon } from "../../../assets/images/pages/subAdmin/plus-icon.svg";
import { SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE } from "../../../config/constants/routePathConstants";
import Table from "../../../components/common/table";

import { ReactComponent as Uparrow } from "../../../assets/images/common/up-arrow.svg";
import { ReactComponent as Downarrow } from "../../../assets/images/common/down-arrow.svg";
import { ReactComponent as ActionDots } from "../../../assets/images/common/action-dots.svg";
import { ReactComponent as ApproveIcon } from "../../../assets/images/pages/userManagement/approve-icon.svg";
import { ReactComponent as DeclineIcon } from "../../../assets/images/pages/userManagement/decline-icon.svg";
import { FormSwitch } from "../../../components/common/input";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrRejectApi, getUserListApi } from "../../../api/authApi";
import { authSelector } from "../../../redux/slicers/authSlice";
import { USER_TYPE } from "../../../config/constants/projectConstant";
import Input from "./../../../components/common/input";
import { InputAdornment, TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "./../../../assets/icons/search-icon.svg";
import { SyncLoader, PulseLoader } from "react-spinners";
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

  const { userLists = {}, paginate } = useSelector(authSelector);
  const { totalPages = 1, totalCount = 1 } = paginate;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPagesUser, setTotalPagesUser] = useState(0);

  useEffect(() => {
    dispatch(getUserListApi(setLoading, page + 1, rowsPerPage));
  }, [page, rowsPerPage]);

  useEffect(() => {
    setSortedData(userLists);
    setTotalPagesUser(totalPages);

  }, [userLists, totalPages]);

  const handleChangePage = (e, nxtPage) => {
    setPage(nxtPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const sortData = () => {
      const sortColumn = Object.keys(sortOrders).find(
        (columnName) => sortOrders[columnName] !== null
      );
      if (sortColumn) {
        const sortOrder = sortOrders[sortColumn];
        const sortedData = [...userLists].sort((a, b) => {
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
  }, [userLists, sortOrders]);

  const getformattedData = (data) => {
    const formattedData = columns.reduce((acc, column) => {
      acc[column.name] = data[column.name];
      return acc;
    }, {});
    return formattedData;
  };

  const handleAcceptOrRejct = (id, status) => {
    setStatusLoading(true);
    setId(id);
    const formData = {
      id,
      status,
    };
    dispatch(acceptOrRejectApi(formData, setStatusLoading));
  };

  const getId = (item) => {
    console.log("item", item);
  };

  const newData = userLists.map((item, index) => {
    const newItem = [];
    newItem["id"] = {
      value: index + 1,
    };
    newItem["userId"] = {
      value: 30100 + index,
    };
    newItem["name"] = {
      value: item?.firstName + " " + item?.lastName,
    };
    newItem["userType"] = {
      value: getUserType(item?.userType),
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
    newItem["status"] = {
      value: item.isAdminApproved?.toUpperCase() ?? "PENDING",
      className: `user-status ${item.isAdminApproved}`,
    };
    newItem["permission"] = {
      value:
        statusLoading && item?._id == id ? (
          <PulseLoader size="10px" color="#0bbbfe" />
        ) : (
          <div className="permission">
            <div
              className={`approved accept_or_reject ${item.isAdminApproved == "accepted" ? "disabled" : ""
                }`}
              onClick={() =>
                item.isAdminApproved !== "accepted"
                  ? handleAcceptOrRejct(item?._id, "accepted")
                  : undefined
              }
            >
              <ApproveIcon />
            </div>
            <div
              className={`decline accept_or_reject ${item.isAdminApproved == "rejected" ? "disabled" : ""
                }`}
              onClick={() =>
                item.isAdminApproved !== "rejected"
                  ? handleAcceptOrRejct(item?._id, "rejected")
                  : undefined
              }
            >
              <DeclineIcon />
            </div>
          </div>
        ),
    };
    newItem["actions"] = {
      value: (
        <div className="action-btn">
          <ActionDots />
        </div>
      ),
      style: { textAlign: "center" },
      action: () => getId(item?.isAdminApproved),
    };
    return newItem;
  });

  return (
    <div className="main-content">
      <div className="title">
        <h1>User Management</h1>
        <button
        // onClick={() => navigate(SUPER_ADMIN_CLIENT_MANAGEMENT_PROFILE_PAGE)}
        >
          <PlusIcon />
          <span>New Role</span>
        </button>
      </div>

      <div className="subadmin-table">
        <div className="subadmin-header">
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
                    <td>{item?.usersId}</td>
                    <td>{item.firstName + " " + item.lastName}</td>
                    <td>{getUserType(item?.userType)}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.state}</td>
                    <td>{item.city}</td>
                    <td>{item.pincode}</td>
                    <td className={`user-status ${item.isAdminApproved}`}>
                      {item.isAdminApproved?.toUpperCase() ?? "PENDING"}
                    </td>
                    <td>
                      {statusLoading && item?._id == id ? (
                        <PulseLoader size="10px" color="#0bbbfe" />
                      ) : (
                        <div className="permission">
                          <div
                            className={`approved accept_or_reject ${item.isAdminApproved == "accepted"
                                ? "disabled"
                                : ""
                              }`}
                            onClick={() =>
                              item.isAdminApproved !== "accepted"
                                ? handleAcceptOrRejct(item?._id, "accepted")
                                : undefined
                            }
                          >
                            <ApproveIcon />
                          </div>
                          <div
                            className={`decline accept_or_reject ${item.isAdminApproved == "rejected"
                                ? "disabled"
                                : ""
                              }`}
                            onClick={() =>
                              item.isAdminApproved !== "rejected"
                                ? handleAcceptOrRejct(item?._id, "rejected")
                                : undefined
                            }
                          >
                            <DeclineIcon />
                          </div>
                        </div>
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
  { name: "name", label: "USER NAME" },
  { name: "userType", label: "ROLE TYPE" },
  { name: "email", label: "EMAIL ADDRESSS" },
  { name: "mobile", label: "CONTACT NO." },
  { name: "address", label: "ADDRESS" },
  { name: "state", label: "STATE" },
  { name: "city", label: "CITY" },
  { name: "pincode", label: "PINCODE" },
  { name: "status", label: "STATUS" },
  { name: "permission", label: "PERMISSION" },
  { name: "actions", label: "ACTIONS" },
];
