import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./style.css";
import "../questionBank/createQuestionBank/module.createQuestionBank.css";
import { ReactComponent as PlusIcon } from "../../../assets/images/pages/subAdmin/plus-icon.svg";
import { SUPER_ADMIN_QUESTION_ADD, SUPER_ADMIN_QUESTION_BANK_PAGE } from "../../../config/constants/routePathConstants";
import Table from "../../../components/common/table";

import { ReactComponent as Uparrow } from "../../../assets/images/common/up-arrow.svg";
import { ReactComponent as Downarrow } from "../../../assets/images/common/down-arrow.svg";
import { ReactComponent as ActionDots } from "../../../assets/images/common/action-dots.svg";
import { ReactComponent as ApproveIcon } from "../../../assets/images/pages/userManagement/approve-icon.svg";
import { ReactComponent as DeclineIcon } from "../../../assets/images/pages/userManagement/decline-icon.svg";
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload-cloud.svg";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { FormSwitch } from "../../../components/common/input";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrRejectApi, getQuestionListApi } from "../../../api/authApi";
import { authSelector } from "../../../redux/slicers/authSlice";
import { USER_TYPE } from "../../../config/constants/projectConstant";
import Input from "./../../../components/common/input";
import { InputAdornment, TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "./../../../assets/icons/search-icon.svg";
import { SyncLoader, PulseLoader } from "react-spinners";
import { getUserType } from "../../../utils/projectHelper";
import TablePagination from "@mui/material/TablePagination";

const QuestionBankList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortOrders, setSortOrders] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [id, setId] = useState("");

  const { getQuestionList = {}, paginate } = useSelector(authSelector);
  const { totalPages = 1, totalCount = 1 } = paginate;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPagesUser, setTotalPagesUser] = useState(0);


  useEffect(() => {
    dispatch(getQuestionListApi(setLoading, page + 1, rowsPerPage));
  }, [page, rowsPerPage]);

  useEffect(() => {
    setSortedData(getQuestionList);
    console.log(getQuestionList);
    setTotalPagesUser(totalPages);
  }, [getQuestionList, totalPages]);

  const handleChangePage = (e, nxtPage) => {
    setPage(nxtPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (e, id) => {
    setStatusLoading(true);
    const { checked } = e.target;
    const value = checked ? "active" : "inactive";
    setId(id);
    const formData = {
      status: value,
    };
    // setStatusLoading(false);
    dispatch(getQuestionListApi(id, formData, setStatusLoading));
  };

  useEffect(() => {
    const sortData = () => {
      const sortColumn = Object.keys(sortOrders).find(
        (columnName) => sortOrders[columnName] !== null
      );
      if (sortColumn) {
        const sortOrder = sortOrders[sortColumn];
        const sortedData = [...getQuestionList].sort((a, b) => {
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
  }, [getQuestionList, sortOrders]);

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

  const newData = getQuestionList.map((item, index) => {
    console.log("Item", item);
    const newItem = [];
    newItem["id"] = {
      value: index + 1,
    };
    newItem["questionId"] = {
      value: 30100 + index,
    };
    newItem["jobRole"] = {
      value: item?.jobRole,
    };
    // newItem["userType"] = {
    //   value: getUserType(item?.userType),
    // };
    newItem["questionType"] = {
      value: item?.questionType,
    };
    newItem["nos"] = {
      value: item?.nos,
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
    // newItem["status"] = {
    //   value: item.isAdminApproved?.toUpperCase() ?? "PENDING",
    //   className: `user-status ${item.isAdminApproved}`,
    // };
    // newItem["permission"] = {
    //   value:
    //     statusLoading && item?._id == id ? (
    //       <PulseLoader size="10px" color="#0bbbfe" />
    //     ) : (
    //       <div className="permission">
    //         <div
    //           className={`approved accept_or_reject ${item.isAdminApproved == "accepted" ? "disabled" : ""
    //             }`}
    //           onClick={() =>
    //             item.isAdminApproved !== "accepted"
    //               ? handleAcceptOrRejct(item?._id, "accepted")
    //               : undefined
    //           }
    //         >
    //           <ApproveIcon />
    //         </div>
    //         <div
    //           className={`decline accept_or_reject ${item.isAdminApproved == "rejected" ? "disabled" : ""
    //             }`}
    //           onClick={() =>
    //             item.isAdminApproved !== "rejected"
    //               ? handleAcceptOrRejct(item?._id, "rejected")
    //               : undefined
    //           }
    //         >
    //           <DeclineIcon />
    //         </div>
    //       </div>
    //     ),
    // };
    // newItem["actions"] = {
    //   value: (
    //     <div className="action-btn">
    //       <ActionDots />
    //     </div>
    //   ),
    //   style: { textAlign: "center" },
    //   action: () => getId(item?.isAdminApproved),
    // };
    return newItem;
  });

  return (
    <div className="main-content">
      <div className="title">
        <div className="title-text">
          <KeyboardBackspaceOutlinedIcon
            sx={{ marginRight: "10px", cursor: "pointer", fontSize: "20px" }}
            onClick={() => { navigate(SUPER_ADMIN_QUESTION_BANK_PAGE) }}
          />
          <h1>Question List</h1>
        </div>
        <div className="title-btn">
          <button
            // onClick={() => navigate("/")}
            style={{ marginRight: "15px" }}
          >
            <UploadIcon />
            <span>Upload Bulk Questions</span>
          </button>
          <button onClick={() => navigate(SUPER_ADMIN_QUESTION_ADD)}>
            <PlusIcon />
            <span>Add New</span>
          </button>
        </div>
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
                    <td>{30100 + index}</td>
                    <td>{item.jobRole}</td>
                    <td>{item.questionType}</td>
                    {/* <td>{getUserType(item?.userType)}</td> */}
                    <td>{item.nos}</td>
                    <td>{item.section}</td>
                    <td>{item.language}</td>
                    <td>Dummy Medium</td>
                    <td><div style={{
                      backgroundColor: "#2ea8db26",
                      display: "inline-flex",
                      textAlign: "center ",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "2px 10px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontFamily: "DM sans",
                      fontWeight: 400,
                      gap: 3,
                      cursor: "pointer",
                      color: "skyblue"
                    }}
                      onClick={() => { alert("Preview the question") }}>
                      <VisibilityOutlinedIcon sx={{ fontSize: "14px", verticalAlign: "middle" }} />
                      Priview
                    </div></td>
                    <td>Dummy Mark</td>
                    <td>
                      {statusLoading && id === item._id ? (
                        <PulseLoader size="10px" color="#0bbbfe" />
                      ) : (
                        <FormSwitch
                          value={item.status === "active" ? true : false}
                          onChange={(e) => handleStatusChange(e, item?._id)}
                        />
                      )}
                    </td>
                    {/* <td>
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
                    </td> */}
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
      <TablePagination
        component="div"
        count={totalPagesUser}
        page={page}
        labelRowsPerPage={"Items per page:"}
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
  );
};

export default QuestionBankList;

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
  { name: "id", label: "SERIAL NO." },
  { name: "questionId", label: "QUESTION ID" },
  { name: "jobRole", label: "JOB ROLE" },
  { name: "questionType", label: "QUESTION TYPE" },
  { name: "nos", label: "NOS" },
  { name: "section", label: "SECTION" },
  { name: "languageAvailability", label: "LANGUAGE AVAILABILITY" },
  { name: "difficultyLevel", label: "DIFFICULTY LEVEL" },
  { name: "question", label: "QUESTION" },
  { name: "marksPerQuestion", label: "MARK PER QUESTION" },
  { name: "status", label: "STATUS" },
  { name: "actions", label: "ACTIONS" },
];
