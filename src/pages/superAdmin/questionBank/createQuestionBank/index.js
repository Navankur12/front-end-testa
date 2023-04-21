import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./module.createQuestionBank.css";
import { ReactComponent as PlusIcon } from "../../../../assets/images/pages/subAdmin/plus-icon.svg";
import {
  SUPER_ADMIN_CREATE_QUESTION_BANK_FORM_PAGE,
  SUPER_ADMIN_QUESTION_BANK_PAGE,
} from "../../../../config/constants/routePathConstants";
import Table from "../../../../components/common/table";

import { ReactComponent as Uparrow } from "../../../../assets/images/common/up-arrow.svg";
import { ReactComponent as Downarrow } from "../../../../assets/images/common/down-arrow.svg";
import { ReactComponent as ActionDots } from "../../../../assets/images/common/action-dots.svg";
import { ReactComponent as ApproveIcon } from "../../../../assets/images/pages/userManagement/approve-icon.svg";
import { ReactComponent as DeclineIcon } from "../../../../assets/images/pages/userManagement/decline-icon.svg";
import { FormSwitch } from "../../../../components/common/input";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrRejectApi, getQuestionBankListApi,changeQuestionBankListStatus } from "../../../../api/authApi";
import { authSelector } from "../../../../redux/slicers/authSlice";
import { USER_TYPE } from "../../../../config/constants/projectConstant";
import Input from "../../../../components/common/input";
import { InputAdornment, TextField } from "@mui/material";
import { ReactComponent as SearchIcon } from "./../../../../assets/icons/search-icon.svg";
import { SyncLoader, PulseLoader } from "react-spinners";
import { getUserType } from "../../../../utils/projectHelper";
import TablePagination from "@mui/material/TablePagination";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Details } from "@mui/icons-material";

const CreateQuestionBank = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortOrders, setSortOrders] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);
  const [id, setId] = useState("");

  // const { userLists = {}, paginate } = useSelector(authSelector);
  const { getQuestionBankList = {}, paginate } = useSelector(authSelector);
  const { totalPages = 1, totalCount = 1 } = paginate;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPagesUser, setTotalPagesUser] = useState(0);


  const getQuestionList = () => {

    dispatch(getQuestionBankListApi(setLoading, page + 1, rowsPerPage));
  }

  useEffect(() => {
    getQuestionList()
  }, [page, rowsPerPage]);

  useEffect(() => {
    setSortedData(getQuestionBankList);
    console.log("createquestion List", getQuestionBankList);
    setTotalPagesUser(totalPages);
  }, [getQuestionBankList, totalPages]);

  const handleChangePage = (e, nxtPage) => {
    setPage(nxtPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleStatusChange = (e, id) => {
    const { checked } = e.target;
    console.log("checked", checked);
    const value = checked ? "active" : "inactive";
    console.log("value", value);
    setId(id);
    console.log("id", id);
    const formData = {
      status: value,
      question_bank_id:id

    };
    setStatusLoading(true)
    dispatch(changeQuestionBankListStatus(formData,getQuestionList,setStatusLoading));
  };

  useEffect(() => {
    const sortData = () => {
      const sortColumn = Object.keys(sortOrders).find(
        (columnName) => sortOrders[columnName] !== null
      );
      if (sortColumn) {
        const sortOrder = sortOrders[sortColumn];
        const sortedData = [...getQuestionBankList]?.sort((a, b) => {
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
  }, [getQuestionBankList, sortOrders]);

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

  const newData = getQuestionBankList.map((item, index) => {
    const newItem = [];
    newItem["id"] = {
      value: index + 1,
    };
    newItem["userId"] = {
      value: 30100 + index,
    };
    newItem["questionBankId"] = {
      value: item?.questionBankId,
    };
    // newItem["userType"] = {
    //   value: getUserType(item?.userType),
    // };
    newItem["jobRole"] = {
      value: item?.jobRole,
    };
    newItem["jobLevel"] = {
      value: item?.jobLevel,
    };
    newItem["code"] = {
      value: item?.code,
    };
    newItem["sector"] = {
      value: item?.sector,
    };
    newItem["subSector"] = {
      value: item?.subSector,
    };
    newItem["schemeName"] = {
      value: item?.schemeName,
    };
    newItem["schemeCode"] = {
      value: item.schemeCode,
    };
    newItem["nos"] = {
      value: item.nos,

    };
    newItem["nosCode"] = {
      value: item.nosCode,
    };
    newItem["theoryMarks"] = {
      value: item.theoryMarks,
    };
    newItem["practicalMarks"] = {
      value: item.practicalMarks,
    };
    newItem["status"] = {
      value: "",
      // statusLoading && id == item._id ? (
      //   <PulseLoader size="10px" color="#0bbbfe" />
      // ) : (
      //   <FormSwitch
      //     value={item.status == "active" ? true : false}
      //     onChange={(e) => handleStatusChange(e, item?._id)}
      //   />
      // ),
    };
    return newItem;
  });

  return (
    <div className="main-content">
      <div className="title">
        <div className="title-text">
          <KeyboardBackspaceOutlinedIcon
            sx={{ marginRight: "10px", cursor: "pointer", fontSize: "20px" }}
            onClick={() => {
              navigate(SUPER_ADMIN_QUESTION_BANK_PAGE);
            }}
          />
          <h1>Question Bank Management</h1>
        </div>
        <div className="title-btn">
          <button
            onClick={() => navigate(SUPER_ADMIN_CREATE_QUESTION_BANK_FORM_PAGE)}
          >
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
                    <td>{item?.questionBankId}</td>
                    <td>{item.jobRole}</td>
                    <td>{item.jobLevel}</td>
                    <td>{item.code}</td>
                    <td>{item.sector}</td>
                    <td>{item.subSector}</td>
                    <td>{item.schemeName}</td>
                    <td>{item.questionType}</td>
                    <td>{item.nos}</td>
                    <td>{item.nosCode}</td>
                    <td>{item.theoryMarks}</td>
                    <td>{item.practicalMarks}</td>
                    {/* <td className={`user-status ${item.isAdminApproved}`}>
                      {item.isAdminApproved?.toUpperCase() ?? "PENDING"}
                    </td> */}
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
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={"Items per page:"}
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

export default CreateQuestionBank;

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
  { name: "QuestionId", label: "QUESTION ID" },
  { name: "jobRole", label: "JOB ROLE" },
  { name: "jobLevel", label: "JOB LEVEL" },
  { name: "jobCode", label: "JOB CODE" },
  { name: "sector", label: "SECTOR" },
  { name: "subSector", label: "SUB-SECTOR" },
  { name: "scheme", label: "SCHEME" },
  { name: "questionType", label: "QUESTION TYPE" },
  { name: "nosName", label: "NOS NAME" },
  { name: "nosCode", label: "NOS CODE" },
  { name: "theoryMarks", label: "THEORY MARKS" },
  { name: "practicalMarks", label: "PRACTICAL MARKS" },
  { name: "status", label: "STATUS" },
  { name: "actions", label: "ACTIONS" },
];
