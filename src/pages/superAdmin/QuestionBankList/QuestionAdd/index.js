import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import "./style.css";
import { SUPER_ADMIN_QUESTION,SUPER_ADMIN_QUESTION_LIST } from "../../../../config/constants/routePathConstants";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
export default function QuestionAdd() {
    const navigate = useNavigate();
    return (
        <div className="main-container">
            <div className="create-question-heading">
                <div className="create-question-text">
                    <div className="back-arrow">
                        <ArrowBackOutlinedIcon
                            sx={{ fontSize: "20px", mr: 1 ,cursor:"pointer"}}
                            onClick={() => navigate(SUPER_ADMIN_QUESTION_LIST)}
                        />
                    </div>
                    <div className="question-heading-text">
                        <h1>Create Question Bank</h1>
                    </div>
                </div>
                <div className="view-list-btn">
                    <button
                        className="view-list-btn-text"
                        onClick={() => navigate(SUPER_ADMIN_QUESTION_LIST)}
                    >
                        <ListOutlinedIcon
                            sx={{ fontSize: "20px", color: "#FFFFFF", mr: 1 }}
                        />
                        View List
                    </button>
                </div>
            </div>
            <div
                className="create-question-form-wrapper"
                style={{ backgroundColor: "white" }}
            >
                <h1>Question Bank Details</h1>
                <div className="form-wrapper">
                    <div className="create-question-form">
                        <label className="question-bank-label" for="bank-id">
                            Question Bank ID <span className="label-star">*</span>
                        </label>
                        <input
                            type="text"
                            name="bank-id"
                            id="bank-id"
                            placeholder="Select Question Bank"
                        />
                    </div>
                    <div className="create-question-form">
                        <label className="question-bank-label" for="question-type">
                            Question Type <span className="label-star">*</span>
                        </label>
                        <select id="question-type" name="question-type">
                            <option value="">Select Question Type</option>
                            <option value="MCQ">MCQ</option>
                            <option value="MCQ">Objective</option>
                            <option value="MCQ">Short Question</option>
                            <option value="MCQ">Long Question</option>
                        </select>
                    </div>
                </div>
                <div className="create-question-form">
                    <label className="question-bank-label" for="job-role">
                        Job Role <span className="label-star">*</span>
                    </label>
                    <select id="job-role" name="job-role" style={{ width: "68%" }}>
                        <option value="">Select Job Type</option>
                        <option value="COVID frontline worker">
                            COVID frontline worker (Basic Care Support)
                        </option>
                        <option value="General Duty Assistant">
                            General Duty Assistant
                        </option>
                        <option value="Assistant Electrician">Assistant Electrician</option>
                        <option value="Civil Manager">Civil Manager</option>
                    </select>
                </div>
                <div className="form-wrapper">
                    <div className="create-question-form">
                        <label className="question-bank-label" for="nos">
                            NOS <span className="label-star">*</span>
                        </label>
                        <input type="text" name="nos" id="nos" placeholder="Select NOS" />
                    </div>
                    <div className="create-question-form">
                        <label className="question-bank-label" for="sector-section">
                            Section <span className="label-star">*</span>
                        </label>
                        <select id="sector-section" name="sector-section">
                            <option value="">Select Section</option>
                            <option value="MCQ">MCQ</option>
                            <option value="MCQ">Objective</option>
                            <option value="MCQ">Short Question</option>
                            <option value="MCQ">Long Question</option>
                        </select>
                    </div>
                </div>
                <div className="form-wrapper">
                    <div className="create-question-form">
                        <label className="question-bank-label" for="performance-criteria">
                            Performance Criteria <span className="label-star">*</span>
                        </label>
                        <input
                            type="text"
                            name="performance-criteria"
                            id="performance-criteria"
                            placeholder="Select PC"
                        />
                    </div>
                    <div className="create-question-form">
                        <label className="question-bank-label" for="language">
                            Language <span className="label-star">*</span>
                        </label>
                        <select id="language" name="language">
                            <option value="">Select Language</option>
                            <option value="hindi">Hindi</option>
                            <option value="english">English</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="next-step-btn">
                <button onClick={() => { navigate(SUPER_ADMIN_QUESTION) }}>
                    Next Step
                    <EastOutlinedIcon sx={{ marginLeft: "10px", fontSize: "17px" }} />
                </button>
            </div>
        </div>
    );
}
